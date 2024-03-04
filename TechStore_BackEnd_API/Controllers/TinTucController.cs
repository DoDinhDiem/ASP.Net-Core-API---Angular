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
    public class TinTucController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        private string _pathClient;
        public TinTucController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
            _pathClient = configuration["AppSettings:UrlImageClient"];
        }

        [Route("GetAll_TinTuc")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       noiDung = x.NoiDung,
                                       trangThai = x.TrangThai

                                   }).Where(x => x.trangThai == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("GetById_TinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<TinTuc>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.TinTucs

                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       noiDung = x.NoiDung,
                                       trangThai = x.TrangThai,
                                       danhMucId = x.DanhMucId,
                                       anhTinTucList = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id).Select(a => new AnhTinTuc { DuongDan = a.DuongDan }).ToList(),
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

        [Route("Create_TinTuc")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TinTuc model)
        {
            try
            {
                _context.TinTucs.Add(model);

                var newImages = new List<AnhTinTuc>();

                foreach (var postImg in model.AnhTinTucs)
                {
                    var img = new AnhTinTuc
                    {
                        TinTucId = model.Id,
                        DuongDan = postImg.DuongDan,
                        TrangThai = postImg.TrangThai
                    };
                    newImages.Add(img);
                }
                await _context.SaveChangesAsync();


                return Ok(new
                {
                    id = model.Id,
                    message = "Thêm tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_TinTuc")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TinTuc model)
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   where x.Id == model.Id
                                   select x).FirstOrDefaultAsync(); ;
                if (query == null)
                {
                    return NotFound();
                }
                query.TieuDe = model.TieuDe;
                query.NoiDung = model.NoiDung;
                query.TrangThai = model.TrangThai;
                query.DanhMucId = model.DanhMucId;
                query.UpdateDate = DateTime.Now;
                var oldImages = _context.AnhTinTucs.Where(img => img.TinTucId == model.Id).ToList();
                _context.AnhTinTucs.RemoveRange(oldImages);

                // Sau khi xóa ảnh, thêm ảnh mới vào trong cơ sở dữ liệu
                foreach (var productImg in model.AnhTinTucs)
                {
                    var img = new AnhTinTuc
                    {
                        TinTucId = query.Id,
                        DuongDan = productImg.DuongDan,
                        TrangThai = false
                    };
                    _context.AnhTinTucs.Add(img);
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

        [Route("Update_TinTuc_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<TinTuc>> UpdateTinTuc(int id)
        {
            try
            {
                var query = await (from sp in _context.TinTucs
                                   where sp.Id == id
                                   select sp).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TrangThai = !query.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái và UpdateDate của tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_TinTuc/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var query = await (from sp in _context.TinTucs
                                   where sp.Id == id
                                   select sp).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound("Tin tức không tồn tại");
                }

                var newsImages = _context.AnhTinTucs.Where(img => img.TinTucId == query.Id).ToList();
                foreach (var img in newsImages)
                {
                    if (img.DuongDan != null)
                    {
                        string fileName = img.DuongDan;
                        string filePath = Path.Combine(_path, "news", fileName);
                        string filePathClient = Path.Combine(_pathClient, "newsClient", fileName);

                        if (System.IO.File.Exists(filePath))
                        {
                            System.IO.File.Delete(filePath);
                        }

                        _context.AnhTinTucs.Remove(img);
                    }
                    // Xóa ảnh trên server

                }
                _context.TinTucs.Remove(query);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Xóa tin tức thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_TinTuc")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.TinTucs.Where(i => listId.Contains(i.Id)).ToList();
                var newsImages = _context.AnhTinTucs.Where(img => listId.Contains(img.TinTucId)).ToList();
                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }
                _context.AnhTinTucs.RemoveRange(newsImages);
                _context.TinTucs.RemoveRange(query);
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

        [Route("Search_TinTuc")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> Search(
            [FromQuery] string? Keywork)
        {
            var query = _context.TinTucs
                .Select(x => new
                {
                    id = x.Id,
                    tieuDe = x.TieuDe,
                    noiDung = x.NoiDung,
                    trangThai = x.TrangThai,
                    anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault(),
                    danhMucId = _context.DanhMucTinTucs.Where(a => a.Id == x.DanhMucId).Select(a => a.TenDanhMuc).FirstOrDefault(),
                    createDate = x.CreateDate,
                    updateDate = x.UpdateDate
                });

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.tieuDe.Contains(Keywork));
            }

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
                            string filePath = $"news/{file.FileName}";
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
                    return BadRequest("No files were uploaded.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
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
