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
    public class AnhTinTucController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        private string _pathClient;
        public AnhTinTucController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
            _pathClient = configuration["AppSettings:UrlImageClient"];
        }

        [Route("GetAll_AnhTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhTinTuc>>> GetAll(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhTinTucs
                                   select new
                                   {
                                       id = anh.Id,
                                       tinTucName = _context.TinTucs.Where(l => l.Id == anh.TinTucId).Select(x => x.TieuDe).FirstOrDefault(),
                                       tinTucId = anh.TinTucId,
                                       duongDan = anh.DuongDan,
                                       trangThai = anh.TrangThai
                                   }).Where(x => x.tinTucId == id).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_AnhTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<AnhTinTuc>> GetById(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhTinTucs
                                   select new
                                   {
                                       id = anh.Id,
                                       tinTucId = anh.TinTucId,
                                       duongDan = anh.DuongDan,
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

        [Route("Create_AnhTinTuc")]
        [HttpPost]
        public async Task<ActionResult<AnhTinTuc>> CreateAnh([FromBody] AnhTinTuc model)
        {
            try
            {
                var img = new AnhTinTuc
                {
                    TinTucId = model.TinTucId,
                    DuongDan = model.DuongDan,
                    TrangThai = false
                };
                _context.AnhTinTucs.Add(img);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm ảnh tin tức thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_AnhTinTuc")]
        [HttpPut]
        public async Task<ActionResult<AnhTinTuc>> UpdateSanPham([FromBody] AnhTinTuc anh)
        {
            try
            {
                var query = await (from img in _context.AnhTinTucs
                                   where img.Id == anh.Id
                                   select anh).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                string fileName = query.DuongDan;
                string filePath = Path.Combine(_path, "news", fileName);
                string filePathClient = Path.Combine(_pathClient, "newsClient", fileName);

                // Xóa ảnh trên server
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);

                    if (System.IO.File.Exists(filePathClient))
                    {
                        System.IO.File.Delete(filePathClient);
                    }
                }

                query.DuongDan = anh.DuongDan;
                query.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    id = query.TinTucId,
                    message = "Sửa ảnh tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_AnhTinTuc_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<AnhTinTuc>> UpdateAnhTinTuc(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhTinTucs
                                   where anh.Id == id
                                   select anh).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                var TinTucId = query.TinTucId;

                query.TrangThai = !query.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    id = TinTucId,
                    message = "Sửa trạng thái và UpdateDate của ảnh tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_AnhTinTuc/{id}")]
        [HttpDelete]
        public async Task<ActionResult<AnhTinTuc>> DeleteAnhTinTuc(int id)
        {
            try
            {
                var query = await (from anh in _context.AnhTinTucs
                                   where anh.Id == id
                                   select anh).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }
                string fileName = query.DuongDan;
                string filePath = Path.Combine(_path, "products", fileName);
                string filePathClient = Path.Combine(_pathClient, "productsClient", fileName);

                // Xóa ảnh trên server
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    if (System.IO.File.Exists(filePathClient))
                    {
                        System.IO.File.Delete(filePathClient);
                    }
                }
                var TinTucId = query.TinTucId;
                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    id = TinTucId,
                    message = "Xóa ảnh tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_AnhTinTuc")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.AnhTinTucs.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }
                var sanPhamId = query.Select(item => item.TinTucId).ToList();

                _context.AnhTinTucs.RemoveRange(query);
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
