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
    public class HoaDonBanController : ControllerBase
    {
        private TechStoreContext _context;
        public HoaDonBanController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_HoaDonBan")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var query = await (from x in _context.HoaDonBans
                                   select new
                                   {
                                       id = x.Id,
                                       userId = x.UserId,
                                       hoTen = x.HoTen,
                                       soDienThoai = x.SoDienThoai,
                                       email = x.Email,
                                       diaChi = x.DiaChi,
                                       ghiChu = x.GhiChu,
                                       trangThai = x.TrangThai,
                                       tongTien = x.TongTien,
                                       giamGia = x.GiamGia,
                                       trangThaiThanhToans = x.TrangThaiThanhToan
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_HoaDonBan/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.HoaDonBans
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       userId = x.UserId,
                                       hoTen = x.HoTen,
                                       soDienThoai = x.SoDienThoai,
                                       email = x.Email,
                                       diaChi = x.DiaChi,
                                       ghiChu = x.GhiChu,
                                       trangThai = x.TrangThai,
                                       tongTien = x.TongTien,
                                       giamGia = x.GiamGia,
                                       trangThaiThanhToan = x.TrangThaiThanhToan,
                                       chiTietHoaDon = _context.ChiTietHoaDonBans.Where(u => u.HoaDonBanId == id).Select(s => new
                                       {
                                           sanPhamId = _context.SanPhams.Where(sp => sp.Id == s.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
                                           soLuong = s.SoLuong,
                                           giaBan = s.GiaBan,
                                           thanhTien = s.ThanhTien
                                       }).ToList(),

                                   }).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu!"
                    });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [Route("Create_HoaDonBan")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HoaDonBan model)
        {
            try
            {
                _context.HoaDonBans.Add(model);

                var newHoaDon = new List<ChiTietHoaDonBan>();

                foreach (var cthd in model.ChiTietHoaDonBans)
                {
                   
                    var ct = new ChiTietHoaDonBan
                    {
                        HoaDonBanId = model.Id,
                        SanPhamId = cthd.SanPhamId,
                        TenSanPham = _context.SanPhams.Where(x => x.Id == cthd.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
                        SoLuong = cthd.SoLuong,
                        GiaBan = cthd.GiaBan,
                        ThanhTien = cthd.ThanhTien
                    };
                    newHoaDon.Add(ct);

                }
                decimal? totalAmount = newHoaDon.Sum(ct => ct.ThanhTien);
                decimal? giamGia = model.GiamGia ?? 0;
                model.TongTien = totalAmount - giamGia;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Đặt mua sản phẩm thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HoaDonBan")]
        [HttpPut]
        public async Task<ActionResult<HoaDonBan>> Update([FromBody] HoaDonBan model)
        {
            try
            {
                var query = await (from x in _context.HoaDonBans
                                                     where x.Id == model.Id
                                                     select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu!"
                    });
                }

                query.TrangThaiThanhToan = model.TrangThaiThanhToan;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Cập nhập hóa đơn thành công!"
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_HoaDonBan")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoaDonBan>>> Search()
        {
            var query = _context.HoaDonBans
                .Select(x => new
                {
                    id = x.Id,
                    hoTen = x.HoTen,
                    soDienThoai = x.SoDienThoai,
                    email = x.Email,
                    diaChi = x.DiaChi,
                    ghiChu = x.GhiChu,
                    trangThai = x.TrangThai,
                    tongTien = x.TongTien,
                    giamGia = x.GiamGia,
                    trangThaiThanhToan = x.TrangThaiThanhToan,
                    createDate = x.CreateDate
                });

            query = query.OrderByDescending(dc => dc.createDate);
            var result = await query.ToListAsync();
            return Ok(result);
        }


    }
}
