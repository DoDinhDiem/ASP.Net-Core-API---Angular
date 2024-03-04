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
    public class HangSanXuatController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public HangSanXuatController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_Hang")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HangSanXuat>>> GetAll()
        {
            try
            {
                var query = await (from hangSanXuat in _context.HangSanXuats
                                   select new
                                   {
                                       id = hangSanXuat.Id,
                                       tenHang = hangSanXuat.TenHang
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Hang/{id}")]
        [HttpGet]
        public async Task<ActionResult<HangSanXuat>> GetById(int id)
        {
            try
            {
                var query = await (from hangSanXuat in _context.HangSanXuats
                                   where hangSanXuat.Id == id
                                   select new
                                   {
                                       id = hangSanXuat.Id,
                                       tenHang = hangSanXuat.TenHang
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

        [Route("Create_Hang")]
        [HttpPost]
        public async Task<ActionResult<HangSanXuat>> Create([FromBody] HangSanXuat model)
        {
            try
            {
                _context.HangSanXuats.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm hãng sản xuất thành công!"
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [Route("Update_Hang")]
        [HttpPut]
        public async Task<ActionResult<HangSanXuat>> Update([FromBody] HangSanXuat model)
        {
            try
            {
                var query = await (from hangSanXuat in _context.HangSanXuats
                                   where hangSanXuat.Id == model.Id
                                   select hangSanXuat).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TenHang = model.TenHang;
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Sửa hãng sản xuất thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HangSanXuat_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<HangSanXuat>> UpdateHang(int id)
        {
            try
            {
                var query = await (from hang in _context.HangSanXuats
                                   where hang.Id == id
                                   select hang).FirstOrDefaultAsync();
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

        [Route("Delete_Hang/{id}")]
        [HttpDelete]
        public async Task<ActionResult<HangSanXuat>> Delete(int id)
        {
            try
            {
                var query = await (from hangSanXuat in _context.HangSanXuats
                                   where hangSanXuat.Id == id
                                   select hangSanXuat).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa hãng sản xuất thành công!"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_Hang")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.HangSanXuats.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }

                _context.HangSanXuats.RemoveRange(query);
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

        [Route("Search_Hang")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HangSanXuat>>> Search(
            [FromQuery] string? Keywork)
        {
            IQueryable<HangSanXuat> query = _context.HangSanXuats;

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(x => x.TenHang.Contains(Keywork));
            }
            return Ok(query);
        }
    }
}
