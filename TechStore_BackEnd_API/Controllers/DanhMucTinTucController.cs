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
    public class DanhMucTinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public DanhMucTinTucController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_DanhMucTinTuc")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhMucTinTuc>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   select new
                                   {
                                       id = x.Id,
                                       tenDanhMuc = x.TenDanhMuc,
                                       trangThai = x.TrangThai
                                   }).Where(x => x.trangThai == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_DanhMucTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<DanhMucTinTuc>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       tenDanhMuc = x.TenDanhMuc,
                                       trangThai = x.TrangThai
                                   }).FirstOrDefaultAsync();
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


        [Route("Create_DanhMucTinTuc")]
        [HttpPost]
        public async Task<ActionResult<DanhMucTinTuc>> Create([FromBody] DanhMucTinTuc model)
        {
            try
            {
                _context.DanhMucTinTucs.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm danh mục tin tức phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_DanhMucTinTuc")]
        [HttpPut]
        public async Task<ActionResult<DanhMucTinTuc>> Update([FromBody] DanhMucTinTuc model)
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   where x.Id == x.Id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TenDanhMuc = model.TenDanhMuc;
                query.TrangThai = model.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa danh mục tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_DanhMucTinTuc_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<DanhMucTinTuc>> UpdateTrangThai(int id)
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   where x.Id == id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TrangThai = !query.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái và UpdateDate của danh mục tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_DanhMucTinTuc/{id}")]
        [HttpDelete]
        public async Task<ActionResult<DanhMucTinTuc>> Delete(int id)
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   where x.Id == id
                                   select x).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }

                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa danh mục tin tức thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_DanhMucTinTuc")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.DanhMucTinTucs.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }

                _context.DanhMucTinTucs.RemoveRange(query);
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

        [Route("Search_DanhMucTinTuc")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhMucTinTuc>>> Search(
            [FromQuery] string? Keywork)
        {
            IQueryable<DanhMucTinTuc> query = _context.DanhMucTinTucs;

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.TenDanhMuc.Contains(Keywork));
            }

            return Ok(query);
        }

    }
}
