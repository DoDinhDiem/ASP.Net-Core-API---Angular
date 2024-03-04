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
    public class LoaiController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public LoaiController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_Loai")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loai>>> GetAll()
        {
            try
            {
                var query = await (from loai in _context.Loais
                                   select new
                                   {
                                       id = loai.Id,
                                       tenLoai = loai.TenLoai,
                                       trangThai = loai.TrangThai
                                   }).Where(x => x.trangThai == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Loai/{id}")]
        [HttpGet]
        public async Task<ActionResult<Loai>> GetById(int id)
        {
            try
            {
                var query = await (from loai in _context.Loais
                                   where loai.Id == id
                                   select new
                                   {
                                       id = loai.Id,
                                       tenLoai = loai.TenLoai,
                                       trangThai = loai.TrangThai,
                                       createDate = loai.CreateDate,
                                       updateDate = loai.UpdateDate
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


        [Route("Create_Loai")]
        [HttpPost]
        public async Task<ActionResult<Loai>> CreateLoai([FromBody] Loai loai)
        {
            try
            {
                _context.Loais.Add(loai);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm loại sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_Loai")]
        [HttpPut]
        public async Task<ActionResult<Loai>> UpdateLoai([FromBody] Loai loais)
        {
            try
            {
                var query = await (from loai in _context.Loais
                                   where loai.Id == loais.Id
                                   select loai).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TenLoai = loais.TenLoai;
                query.TrangThai = loais.TrangThai;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa loại sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Loai_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<Loai>> UpdateLoai(int id)
        {
            try
            {
                var query = await (from loai in _context.Loais
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

        [Route("Delete_Loai/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Loai>> DeleteLoai(int id)
        {
            try
            {
                var query = await (from loai in _context.Loais
                                   where loai.Id == id
                                   select loai).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }

                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa loại sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_Loai")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.Loais.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }

                _context.Loais.RemoveRange(query);
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

        [Route("Search_Loai")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loai>>> Search(
            [FromQuery] string? Keywork)
        {
            IQueryable<Loai> query = _context.Loais;

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.TenLoai.Contains(Keywork));
            }

            return Ok(query);
        }
    }
}
