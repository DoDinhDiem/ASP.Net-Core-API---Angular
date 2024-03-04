using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        public SanPhamController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
        }

        [Route("GetAll_SanPham")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       trangThaiHoatDong = x.TrangThaiHoatDong
                                   }).Where(x => x.trangThaiHoatDong == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("GetById_SanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<SanPham>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.SanPhams

                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       soLuonTon = x.SoLuongTon,
                                       baoHanh = x.BaoHanh,
                                       moTa = x.MoTa,
                                       loaiId = _context.Loais.Where(l => l.Id == x.LoaiId).Select(x => x.TenLoai).FirstOrDefault(),
                                       hangSanXuatId = _context.HangSanXuats.Where(h => h.Id == x.HangSanXuatId).Select(x => x.TenHang).FirstOrDefault(),
                                       anhSanPhamList = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id).Select(a => new AnhSanPham { DuongDanAnh = a.DuongDanAnh }).ToList(),
                                       thongSos = _context.ThongSos.Where(a => a.SanPhamId == x.Id).Select(a => new ThongSo { TenThongSo = a.TenThongSo, MoTa = a.MoTa }).ToList(),
                                       trangThaiSanPham = x.TrangThaiSanPham,
                                       trangThaiHoatDong = x.TrangThaiHoatDong,
                                       createDate = x.CreateDate,
                                       updateDate = x.UpdateDate
                                   }).Where(x => x.id == id).FirstOrDefaultAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_SanPham")]
        [HttpPost]
        public async Task<ActionResult<string>> CreateSanPham([FromBody] SanPham model)
        {
            try
            {
                model.SoLuongTon = 0;
                _context.SanPhams.Add(model);

                var newImages = new List<AnhSanPham>();

                foreach (var productImg in model.AnhSanPhams)
                {
                    var img = new AnhSanPham
                    {
                        SanPhamId = model.Id,
                        DuongDanAnh = productImg.DuongDanAnh,
                        TrangThai = productImg.TrangThai
                    };
                    newImages.Add(img);
                }

                var newThongSoList = new List<ThongSo>();
                foreach (var thongSo in model.ThongSos)
                {
                    var newThongSo = new ThongSo
                    {
                        SanPhamId = model.Id,
                        TenThongSo = thongSo.TenThongSo,
                        MoTa = thongSo.MoTa,
                        TrangThai = true
                    };
                    newThongSoList.Add(newThongSo);
                }
                await _context.SaveChangesAsync();


                return Ok(new
                {
                    id = model.Id,
                    message = "Thêm sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_SanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateSanPham([FromBody] SanPham model)
        {
            try
            {
                var query = await (from sanPham in _context.SanPhams
                                   where sanPham.Id == model.Id
                                   select sanPham).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                var oldImages = _context.AnhSanPhams.Where(img => img.SanPhamId == model.Id).ToList();
                //foreach (var oldImg in oldImages)
                //{
                //    string fileName = oldImg.DuongDanAnh;
                //    string filePath = Path.Combine(_path, "products", fileName);


                //    if (System.IO.File.Exists(filePath))
                //    {
                //        System.IO.File.Delete(filePath);
                //    }
                //}
                _context.AnhSanPhams.RemoveRange(oldImages);
            
                foreach (var productImg in model.AnhSanPhams)
                {
                    var img = new AnhSanPham
                    {
                        SanPhamId = query.Id,
                        DuongDanAnh = productImg.DuongDanAnh,
                        TrangThai = false
                    };
                    _context.AnhSanPhams.Add(img);
                }

                query.TenSanPham = model.TenSanPham;
                query.GiaBan = model.GiaBan;
                query.KhuyenMai = model.KhuyenMai;
                query.BaoHanh = model.BaoHanh;
                query.MoTa = model.MoTa;
                query.LoaiId = model.LoaiId;
                query.HangSanXuatId = model.HangSanXuatId;
                query.TrangThaiSanPham = model.TrangThaiSanPham;
                query.TrangThaiHoatDong = model.TrangThaiHoatDong;
                query.UpdateDate = DateTime.Now;

                // Xóa thông số cũ và thêm thông số mới
                _context.ThongSos.RemoveRange(_context.ThongSos.Where(t => t.SanPhamId == model.Id));
                foreach (var thongSo in model.ThongSos)
                {
                    var newThongSo = new ThongSo
                    {
                        SanPhamId = query.Id,
                        TenThongSo = thongSo.TenThongSo,
                        MoTa = thongSo.MoTa,
                        TrangThai = true,
                        UpdateDate = DateTime.Now,
                    };
                    _context.ThongSos.Add(newThongSo);
                }

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Cập nhật sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("Update_SanPham_TrangThaiHoatDong/{id}")]
        [HttpPut]
        public async Task<ActionResult<SanPham>> UpdateSanPham(int id)
        {
            try
            {
                var query = await (from sp in _context.SanPhams
                                   where sp.Id == id
                                   select sp).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TrangThaiHoatDong = !query.TrangThaiHoatDong;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái và UpdateDate của sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_SanPham/{id}")]
        [HttpDelete]
        public async Task<ActionResult<string>> Delete(int id)
        {
            try
            {
                var productToDelete = await _context.SanPhams.FindAsync(id);

                if (productToDelete == null)
                {
                    return NotFound("Sản phẩm không tồn tại");
                }

                var productImages = _context.AnhSanPhams.Where(img => img.SanPhamId == productToDelete.Id).ToList();
                foreach (var img in productImages)
                {
                    // Xóa ảnh trên server
                    string fileName = img.DuongDanAnh; // Giả sử có một trường chứa tên file ảnh
                    string filePath = Path.Combine(_path, "products", fileName);

                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }

                    _context.AnhSanPhams.Remove(img);
                }

                var productInfo = _context.ThongSos.Where(img => img.SanPhamId == productToDelete.Id).ToList();
                foreach (var info in productInfo)
                {
                    _context.ThongSos.Remove(info);
                }
                _context.SanPhams.Remove(productToDelete);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Xóa sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_SanPham")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.SanPhams.Where(i => listId.Contains(i.Id)).ToList();
                var productImages = _context.AnhSanPhams.Where(img => listId.Contains(img.SanPhamId)).ToList();
                var productParameter = _context.ThongSos.Where(para => listId.Contains(para.SanPhamId)).ToList();
                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }
                _context.ThongSos.RemoveRange(productParameter);
                _context.AnhSanPhams.RemoveRange(productImages);
                _context.SanPhams.RemoveRange(query);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Danh sách đã được xóa thành công."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_SanPham")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> Search(
            [FromQuery] string? Keywork,
            [FromQuery] decimal? MinGiaBan,
            [FromQuery] decimal? MaxGiaBan)
        {
            var query = _context.SanPhams
                .Select(x => new
                {
                    id = x.Id,
                    tenSanPham = x.TenSanPham,
                    giaBan = x.GiaBan,
                    khuyenMai = x.KhuyenMai,
                    soLuongTon = x.SoLuongTon,
                    baoHanh = x.BaoHanh,
                    moTa = x.MoTa,
                    loaiId = _context.Loais.Where(l => l.Id == x.LoaiId).Select(x => x.TenLoai).FirstOrDefault(),
                    hangSanXuatId = _context.HangSanXuats.Where(h => h.Id == x.HangSanXuatId).Select(x => x.TenHang).FirstOrDefault(),
                    anhDaiDien = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault(),
                    trangThaiSanPham = x.TrangThaiSanPham,
                    trangThaiHoatDong = x.TrangThaiHoatDong,
                    createDate = x.CreateDate,
                    updateDate = x.UpdateDate
                });

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.tenSanPham.Contains(Keywork));
            }

            if (MinGiaBan.HasValue)
            {
                query = query.Where(dc => dc.giaBan >= MinGiaBan.Value);
            }

            if (MaxGiaBan.HasValue)
            {
                query = query.Where(dc => dc.giaBan <= MaxGiaBan.Value);
            };

            query = query.OrderByDescending(dc => dc.createDate);
            return Ok(query);
        }

        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            try
            {
                if (files != null && files.Count > 0)
                {
                    List<string> filePaths = new List<string>();

                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            string filePath = $"products/{file.FileName}";
                            var fullPath = CreatePathFile(filePath);
                            using (var fileStream = new FileStream(fullPath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }
                            filePaths.Add(filePath);
                        }
                    }

                    return Ok(new { filePaths });
                }
                else
                {
                    return BadRequest("Không có file nào được tải lên.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi Nội Server");
            }
        }


        [NonAction]
        private string CreatePathFile(string RelativePathFileName)
        {
            try
            {
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = System.IO.Path.GetDirectoryName(fullPathFile);
                if (!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                return fullPathFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
       
    }
}