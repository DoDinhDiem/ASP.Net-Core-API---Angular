using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private TechStoreContext _context;
        public DashboardController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("CountSanPham")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountSanPham()
        {
            try
            {
                var query = _context.SanPhams.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountDonHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountDonHang()
        {
            try
            {
                var query = _context.HoaDonBans.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountKhachHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountKhachHang()
        {
            try
            {
                var query = _context.KhachHangs.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountTinTuc")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountTinTuc()
        {
            try
            {
                var query = _context.TinTucs.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Thống kê năm
        [Route("ThongKeNamHDB/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeNam(int year)
        {
            try
            {
                var query = _context.HoaDonBans.Where(hd => hd.CreateDate.HasValue && hd.CreateDate.Value.Year == year && hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien);
                return Ok(query);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeNamHDX/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeNamHDX(int year)
        {
            try
            {
                var query = _context.HoaDonNhaps.Where(hd => hd.CreateDate.Value.Year == year && hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien);
                return Ok(query);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Thống kê ngày

        [Route("ThongKeNgayHDB/{year}/{month}/{day}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeNgay(int year, int month, int day)
        {
            try
            {
                var query = _context.HoaDonBans
                    .Where(hd => hd.CreateDate.Value.Year == year &&
                                 hd.CreateDate.Value.Month == month &&
                                 hd.CreateDate.Value.Day == day &&
                                 hd.TrangThaiThanhToan == true)
                    .Sum(hd => hd.TongTien);

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeNgayHDX/{year}/{month}/{day}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeNgayHDX(int year, int month, int day)
        {
            try
            {
                var query = _context.HoaDonNhaps
                    .Where(hd => hd.CreateDate.Value.Year == year &&
                                 hd.CreateDate.Value.Month == month &&
                                 hd.CreateDate.Value.Day == day &&
                                 hd.TrangThaiThanhToan == true)
                    .Sum(hd => hd.TongTien);

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Thống kê các tháng trong năm
        [Route("ThongKeTheoThang/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoThang(int year)
        {
            try
            {
                var query = Enumerable.Range(1, 12)
                    .Select(month => new
                    {
                        Thang = month,
                        TongTien = _context.HoaDonBans
                            .Where(hd => hd.CreateDate.HasValue &&
                                         hd.CreateDate.Value.Year == year &&
                                         hd.CreateDate.Value.Month == month &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien)
                    })
                    .ToList();

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeTheoThangHDX/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoThangHDX(int year)
        {
            try
            {
                var query = Enumerable.Range(1, 12)
                    .Select(month => new
                    {
                        Thang = month,
                        TongTien = _context.HoaDonNhaps
                            .Where(hd => hd.CreateDate.HasValue &&
                                         hd.CreateDate.Value.Year == year &&
                                         hd.CreateDate.Value.Month == month &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien)
                    })
                    .ToList();

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Thống kê Tháng

        //[Route("ThongKeThangHDB/{year}/{month}")]
        //[HttpGet]
        //public async Task<IActionResult> GetThongKeThang(int year, int month)
        //{
        //    try
        //    {
        //        var query = _context.HoaDonBans
        //            .Where(hd => hd.CreateDate.Value.Year == year &&
        //                         hd.CreateDate.Value.Month == month &&
        //                         hd.TrangThaiThanhToan == true)
        //            .Sum(hd => hd.TongTien);

        //        return Ok(query);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[Route("ThongKeThangHDX/{year}/{month}")]
        //[HttpGet]
        //public async Task<IActionResult> GetThongKeThangHDX(int year, int month)
        //{
        //    try
        //    {
        //        var query = _context.HoaDonNhaps
        //            .Where(hd => hd.CreateDate.Value.Year == year &&
        //                         hd.CreateDate.Value.Month == month &&
        //                         hd.TrangThaiThanhToan == true)
        //            .Sum(hd => hd.TongTien);

        //        return Ok(query);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}




    }
}
