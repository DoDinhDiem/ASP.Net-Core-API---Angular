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
    public class ThongSoController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        public ThongSoController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_ThongSo/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThongSo>>> GetAll(int id)
        {
            try
            {
                var query = await (from thongso in _context.ThongSos
                                   select new
                                   {
                                       id = thongso.Id,
                                       sanPhamName = _context.SanPhams.Where(l => l.Id == thongso.SanPhamId).Select(x => x.TenSanPham).FirstOrDefault(),
                                       sanPhamId = thongso.SanPhamId,
                                       tenThongSo = thongso.TenThongSo,
                                       moTa = thongso.MoTa,
                                       trangThai = thongso.TrangThai
                                   }).Where(x => x.sanPhamId == id).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_ThongSo/{id}")]
        [HttpGet]
        public async Task<ActionResult<ThongSo>> GetById(int id)
        {
            try
            {
                var query = await (from thongso in _context.ThongSos
                                   select new
                                   {
                                       id = thongso.Id,
                                       sanPhamId = thongso.SanPhamId,
                                       tenThongSo = thongso.TenThongSo,
                                       moTa = thongso.MoTa,
                                       trangThai = thongso.TrangThai
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

        [Route("Create_ThongSo")]
        [HttpPost]
        public async Task<ActionResult<ThongSo>> CreateThongSo([FromBody] ThongSo model)
        {
            try
            {
                var parameter = new ThongSo
                {
                    SanPhamId = model.SanPhamId,
                    TenThongSo = model.TenThongSo,
                    MoTa = model.MoTa,
                    TrangThai = model.TrangThai
                };
                _context.ThongSos.Add(parameter);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm thông số sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_ThongSo")]
        [HttpPut]
        public async Task<ActionResult<ThongSo>> UpdateThongSo([FromBody] ThongSo model)
        {
            try
            {
                var query = await (from parameter in _context.ThongSos
                                   where parameter.Id == model.Id
                                   select parameter).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.TenThongSo = model.TenThongSo;
                query.MoTa = model.MoTa;
                query.TrangThai = model.TrangThai;
                query.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    id = query.SanPhamId,
                    message = "Sửa thông số sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_ThongSo_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<ThongSo>> UpdateThongSo(int id)
        {
            try
            {
                var query = await (from thongso in _context.ThongSos
                                   where thongso.Id == id
                                   select thongso).FirstOrDefaultAsync();
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
                    message = "Sửa trạng thái và pdateDate của thông số sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_ThongSo/{id}")]
        [HttpDelete]
        public async Task<ActionResult<ThongSo>> DeleteThongSo(int id)
        {
            try
            {
                var query = await (from thongso in _context.ThongSos
                                   where thongso.Id == id
                                   select thongso).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }
                var sanPhamId = query.SanPhamId;
                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    id = sanPhamId,
                    message = "Xóa thông số sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_ThongSo")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.ThongSos.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }
                var sanPhamId = query.Select(item => item.SanPhamId).ToList();

                _context.ThongSos.RemoveRange(query);
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
