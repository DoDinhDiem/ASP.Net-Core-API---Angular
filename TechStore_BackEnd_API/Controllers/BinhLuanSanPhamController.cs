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
    public class BinhLuanSanPhamController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public BinhLuanSanPhamController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_BinhLuanSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinhLuanSanPham>>> GetAll(int id)
        {
            try
            {
                var query = await (from x in _context.BinhLuanSanPhams
                                   where x.SanPhamId == id
                                   select new
                                   {
                                       sanPhamId = _context.SanPhams.Where(sp => sp.Id == x.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
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

        [Route("GetById_BinhLuanSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<BinhLuanSanPham>> GetById(int id, int userId)
        {
            try
            {
                var query = await (from x in _context.BinhLuanSanPhams
                                   where x.Id == id && x.UserId == userId
                                   select new
                                   {
                                       id = x.Id,
                                       sanPhamId = x.SanPhamId,
                                       userId = x.UserId,
                                       noiDung=x.NoiDung
                                   }).FirstOrDefaultAsync();
                if(query == null)
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

        [Route("Create_BinhLuanSanPham")]
        [HttpPost]
        public async Task<ActionResult<BinhLuanSanPham>> Create([FromBody] BinhLuanSanPham model)
        {
            try
            {
                _context.BinhLuanSanPhams.Add(model);
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

        [Route("Update_BinhLuanSanPham")]
        [HttpPut]
        public async Task<ActionResult<BinhLuanSanPham>> Update([FromBody] BinhLuanSanPham model)
        {
            try
            {
                var query = await (from x in _context.BinhLuanSanPhams
                                   where x.Id == model.Id && x.UserId == model.UserId
                                   select x).FirstOrDefaultAsync();
                if(query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu"
                    });
                }
                query.NoiDung = model.NoiDung;
                query.UpdateTime = DateTime.Now;

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

        [Route("Delete_BinhLuanSanPham/{id}/{userId}")]
        [HttpPut]
        public async Task<ActionResult<BinhLuanSanPham>> Delete(int id, int userId)
        {
            try
            {
                var query = await (from x in _context.BinhLuanSanPhams
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
