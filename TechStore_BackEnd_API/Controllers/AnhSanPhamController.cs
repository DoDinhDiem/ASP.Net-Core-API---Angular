using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class AnhSanPhamController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        private string _pathClient;
        public AnhSanPhamController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
            _pathClient = configuration["AppSettings:UrlImageClient"];
        }

        [Route("GetAll_AnhSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhSanPham>>> GetAll(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhSanPhams
                                   select new
                                   {
                                       id = anh.Id,
                                       sanPhamName = _context.SanPhams.Where(l => l.Id == anh.SanPhamId).Select(x => x.TenSanPham).FirstOrDefault(),
                                       sanPhamId = anh.SanPhamId,
                                       duongDanAnh = anh.DuongDanAnh,
                                       trangThai = anh.TrangThai
                                   }).Where(x => x.sanPhamId == id).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_AnhSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<AnhSanPham>> GetById(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhSanPhams
                                   select new
                                   {
                                       id = anh.Id,
                                       sanPhamId = anh.SanPhamId,
                                       duongDanAnh = anh.DuongDanAnh,
                                       trangThai = anh.TrangThai
                                   }).Where(x => x.id == id).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_AnhSanPham")]
        [HttpPost]
        public async Task<ActionResult<AnhSanPham>> CreateAnh([FromBody] AnhSanPham model)
        {
            try
            {
                var img = new AnhSanPham
                {
                    SanPhamId = model.SanPhamId,
                    DuongDanAnh = model.DuongDanAnh,
                    TrangThai = false
                };
                _context.AnhSanPhams.Add(img);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm ảnh sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_AnhSanPham")]
        [HttpPut]
        public async Task<ActionResult<AnhSanPham>> UpdateSanPham([FromBody] AnhSanPham anh)
        {
            try
            {
                var query = await (from img in _context.AnhSanPhams
                                   where img.Id == anh.Id
                                   select anh).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                //string fileName = query.DuongDanAnh;
                //string filePath = Path.Combine(_path, "products", fileName);

                //// Xóa ảnh trên server
                //if (System.IO.File.Exists(filePath))
                //{
                //    System.IO.File.Delete(filePath);
                //}

                query.DuongDanAnh = anh.DuongDanAnh;
                query.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    id = query.SanPhamId,
                    message = "Sửa ảnh sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_AnhSanPham_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<AnhSanPham>> UpdateAnhSanPham(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhSanPhams
                                   where anh.Id == id
                                   select anh).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                var SanPhamId = query.SanPhamId;

                query.TrangThai = !query.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    id = SanPhamId,
                    message = "Sửa trạng thái và UpdateDate của ảnh sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_AnhSanPham/{id}")]
        [HttpDelete]
        public async Task<ActionResult<AnhSanPham>> DeleteAnhSanPham(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhSanPhams
                                   where anh.Id == id
                                   select anh).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }
                string fileName = query.DuongDanAnh;
                string filePath = Path.Combine(_path, "products", fileName);

                // Xóa ảnh trên server
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                var sanPhamId = query.SanPhamId;
                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    id = sanPhamId,
                    message = "Xóa ảnh sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_AnhSanPham")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.AnhSanPhams.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }
                var sanPhamId = query.Select(item => item.SanPhamId).ToList();

                _context.AnhSanPhams.RemoveRange(query);
                _context.SaveChanges();

                return Ok(new
                {
                    id = sanPhamId,
                    message = "Danh sách đã được xóa thành công."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
