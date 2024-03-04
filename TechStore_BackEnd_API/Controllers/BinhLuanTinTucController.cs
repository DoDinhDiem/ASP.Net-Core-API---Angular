using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân Viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class BinhLuanTinTucController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public BinhLuanTinTucController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_BinhLuanTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinhLuanTinTuc>>> GetAll(int id)
        {
            try
            {
                var query = await (from x in _context.BinhLuanTinTucs
                                   where x.TinTucId == id
                                   select new
                                   {
                                       TinTucId = _context.TinTucs.Where(sp => sp.Id == x.TinTucId).Select(sp => sp.TieuDe).FirstOrDefault(),
                                       userId = _context.KhachHangs.Where(us => us.Id == x.UserId).Select(us => us.FirstName + " " + us.LastName).FirstOrDefault(),
                                       noiDung = x.NoiDung,
                                       createDate = x.CreateDate
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_BinhLuanTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<BinhLuanTinTuc>> GetById(int id, int userId)
        {
            try
            {
                var query = await (from x in _context.BinhLuanTinTucs
                                   where x.Id == id && x.UserId == userId
                                   select new
                                   {
                                       id = x.Id,
                                       tinTucId = x.TinTucId,
                                       userId = x.UserId,
                                       noiDung = x.NoiDung
                                   }).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu"
                    });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_BinhLuanTinTuc")]
        [HttpPost]
        public async Task<ActionResult<BinhLuanTinTuc>> Create([FromBody] BinhLuanTinTuc model)
        {
            try
            {
                _context.BinhLuanTinTucs.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Bình luận thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_BinhLuanTinTuc")]
        [HttpPut]
        public async Task<ActionResult<BinhLuanTinTuc>> Update([FromBody] BinhLuanTinTuc model)
        {
            try
            {
                var query = await (from x in _context.BinhLuanTinTucs
                                   where x.Id == model.Id && x.UserId == model.UserId
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu"
                    });
                }
                query.NoiDung = model.NoiDung;
                query.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Sửa nội dung bình luận thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_BinhLuanTinTuc")]
        [HttpPut]
        public async Task<ActionResult<BinhLuanTinTuc>> Delete(int id, int userId)
        {
            try
            {
                var query = await (from x in _context.BinhLuanTinTucs
                                   where x.Id == id && x.UserId == userId
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu"
                    });
                }

                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa bình luận thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
