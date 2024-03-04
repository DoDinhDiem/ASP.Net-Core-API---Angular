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
    public class ChucVuController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public ChucVuController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_ChucVu")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChucVu>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.ChucVus
                                   select new
                                   {
                                       id = x.Id,
                                       tenChucVu = x.TenChucVu,
                                       trangThai = x.TrangThai
                                   }).Where(c => c.trangThai == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_ChucVu/{id}")]
        [HttpGet]
        public async Task<ActionResult<ChucVu>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.ChucVus
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       tenChucVu = x.TenChucVu,
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

        [Route("Create_ChucVu")]
        [HttpPost]
        public async Task<ActionResult<ChucVu>> Create([FromBody] ChucVu model)
        {
            try
            {
                _context.ChucVus.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm chức vụ thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_ChucVu")]
        [HttpPut]
        public async Task<ActionResult<ChucVu>> Update([FromBody] ChucVu model)
        {
            try
            {
                var query = await (from x in _context.ChucVus
                                   where x.Id == model.Id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TenChucVu = model.TenChucVu;
                query.TrangThai = model.TrangThai;
                query.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa chức vụ thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_TrangThai_ChucVu/{id}")]
        [HttpPut]
        public async Task<ActionResult<ChucVu>> UpdateStatus(int id)
        {
            try
            {
                var query = await (from x in _context.ChucVus
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
                    message = "Sửa trạng thái thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_ChucVu/{id}")]
        [HttpDelete]
        public async Task<ActionResult<ChucVu>> Delete(int id)
        {
            try
            {
                var query = await (from x in _context.ChucVus
                                   where x.Id == id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }
                _context.ChucVus.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa chức vụ thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_ChucVu")]
        [HttpDelete]
        public async Task<ActionResult<string>> DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.ChucVus.Where(i => listId.Contains(i.Id)).ToList();
                if (query.Count == 0)
                {
                    return NotFound("Không tìm thất bất kỳ mục nào!");
                }
                _context.ChucVus.RemoveRange(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Danh sách đã được xóa thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_ChucVu")]
        [HttpGet]
        public async Task<ActionResult<ChucVu>> Select([FromQuery] string? KeyWork)
        {
            IQueryable<ChucVu> query = _context.ChucVus;
            if (!string.IsNullOrEmpty(KeyWork))
            {
                query = query.Where(x => x.TenChucVu.Contains(KeyWork));
            }
            return Ok(query);
        }
    }
}
