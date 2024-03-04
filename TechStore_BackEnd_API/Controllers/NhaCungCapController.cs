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
    public class NhaCungCapController : ControllerBase
    {
        private TechStoreContext _context;
        public NhaCungCapController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_NhaCungCap")]
        [HttpGet]
        public async Task<ActionResult<NhaCungCap>> GetAll()
        {
            try
            {
                var query = await (from x in _context.NhaCungCaps
                                   select new
                                   {
                                       id = x.Id,
                                       tenNhaCungCap = x.TenNhaCungCap
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_NhaCungCap/{id}")]
        [HttpGet]
        public async Task<ActionResult<NhaCungCap>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.NhaCungCaps
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       tenNhaCungCap = x.TenNhaCungCap,
                                       email = x.Email,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi
                                   }).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm được dữ liệu"
                    });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_NhaCungCap")]
        [HttpPost]
        public async Task<ActionResult<NhaCungCap>> Create([FromBody] NhaCungCap model)
        {
            try
            {
                _context.NhaCungCaps.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm nhà cung cấp thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhaCungCap")]
        [HttpPut]
        public async Task<ActionResult<NhaCungCap>> Update([FromBody] NhaCungCap model)
        {
            try
            {
                var query = await (from x in _context.NhaCungCaps
                                   where x.Id == model.Id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu!"
                    });
                }

                query.TenNhaCungCap = model.TenNhaCungCap;
                query.Email = model.Email;
                query.SoDienThoai = model.SoDienThoai;
                query.DiaChi = model.DiaChi;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Cập nhập nhà cung cấp thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_NhaCungCap/{id}")]
        [HttpDelete]
        public async Task<ActionResult<NhaCungCap>> Delete(int id)
        {
            try
            {
                var query = await (from x in _context.NhaCungCaps
                                   where x.Id == id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu!"
                    });
                }

                _context.NhaCungCaps.Remove(query);
                return Ok(new
                {
                    message = "Xóa nhà cung cấp thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhaCungCap_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<NhaCungCap>> UpdateLoai(int id)
        {
            try
            {
                var query = await (from loai in _context.NhaCungCaps
                                   where loai.Id == id
                                   select loai).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TrangThai = !query.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái và UpdateDate của loại sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_NhaCungCap")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.NhaCungCaps.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }

                _context.NhaCungCaps.RemoveRange(query);
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

        [Route("Search_NhaCungCap")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhaCungCap>>> Search(
            [FromQuery] string? Keywork,
            [FromQuery] string? Email,
            [FromQuery] string? DiaChi)
        {
            IQueryable<NhaCungCap> query = _context.NhaCungCaps;

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.TenNhaCungCap.Contains(Keywork));
            }
            if (!string.IsNullOrEmpty(Email))
            {
                query = query.Where(dc => dc.Email.Contains(Keywork));
            }
            if (!string.IsNullOrEmpty(DiaChi))
            {
                query = query.Where(dc => dc.DiaChi.Contains(Keywork));
            }

            return Ok(query);
        }

    }
}
