using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private TechStoreContext _context;
        private static HashSet<int> extractedBrandIds = new HashSet<int>();
        public ClientController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("SanPhamMoi")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> SanPhamMoi()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   where x.TrangThaiSanPham == "Sản phẩm mới"
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("SanPhamKhuyenMai")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> SanPhamKhuyenMai()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   where x.TrangThaiSanPham == "Sản phẩm Khuyến mại"
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("SanPhamBanChay")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> SanPhamBanChay()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   join ct in _context.ChiTietHoaDonBans on x.Id equals ct.SanPhamId
                                   where x.TrangThaiHoatDong == true
                                   group x by new
                                   {
                                       x.Id,
                                       x.TenSanPham,
                                       x.GiaBan,
                                       x.KhuyenMai
                                   } into g
                                   select new
                                   {
                                       SanPhamId = g.Key.Id,
                                       TenSanPham = g.Key.TenSanPham,
                                       GiaBan = g.Key.GiaBan,
                                       KhuyenMai = g.Key.KhuyenMai,
                                       Avatar = _context.AnhSanPhams
                                           .Where(a => a.SanPhamId == g.Key.Id && a.TrangThai == true)
                                           .Select(a => a.DuongDanAnh)
                                           .FirstOrDefault(),
                                       Total = g.Count()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ChiTietSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<SanPham>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.SanPhams

                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       soLuonTon = x.SoLuongTon,
                                       baoHanh = x.BaoHanh,
                                       moTa = x.MoTa,
                                       loaiId = x.LoaiId,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault(),
                                       trangThaiSanPham = x.TrangThaiSanPham,
                                       trangThaiHoatDong = x.TrangThaiHoatDong,
                                       createDate = x.CreateDate,
                                       updateDate = x.UpdateDate
                                   }).Where(x => x.id == id).FirstOrDefaultAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("SanPhamTuongTu/{id}/{id1}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> SanPhamTuongTu(int id, int id1)
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   where x.LoaiId == id
                                   where x.Id != id1
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("AnhSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhSanPham>>> GetByIdAnh(int id)
        {
            try
            {
                var query = await _context.AnhSanPhams
                                .Where(x => x.SanPhamId == id)
                                 .OrderByDescending(x => x.TrangThai)
                                .Select(x => x.DuongDanAnh)
                                .ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongSo/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThongSo>>> GetByIdThongSo(int id)
        {
            try
            {
                var query = await (from thongso in _context.ThongSos
                                   select new
                                   {
                                       sanPhamId = thongso.SanPhamId,
                                       tenThongSo = thongso.TenThongSo,
                                       moTa = thongso.MoTa,
                                       trangThai = thongso.TrangThai
                                   }).Where(x => x.sanPhamId == id && x.trangThai == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LayHangSanPham/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetAllHang(int id)
        {
            try
            {
                extractedBrandIds.Clear();

                var query = await (from x in _context.SanPhams
                                   where x.LoaiId == id
                                   where x.TrangThaiHoatDong == true
                                   select new
                                   {
                                       hangId = x.HangSanXuatId,
                                       tenHang = _context.HangSanXuats
                                           .Where(hsp => hsp.Id == x.HangSanXuatId)
                                           .Select(hsp => hsp.TenHang)
                                           .FirstOrDefault()
                                   }).ToListAsync();

                List<dynamic> uniqueBrands = new List<dynamic>();

                foreach (var item in query)
                {
                    // Kiểm tra xem hãng đã được lấy chưa
                    if (!extractedBrandIds.Contains(item.hangId))
                    {
                        uniqueBrands.Add(new { Id = item.hangId, TenHang = item.tenHang });
                        extractedBrandIds.Add(item.hangId);
                    }
                }

                uniqueBrands = uniqueBrands.OrderBy(x => x.Id).ToList();

                return Ok(uniqueBrands);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("LayDienThoai")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> LayDienThoai()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   join lsp in _context.Loais on x.LoaiId equals lsp.Id
                                   where lsp.TenLoai == "Điện thoại"
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LayLapTop")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> LayLapTop()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   join lsp in _context.Loais on x.LoaiId equals lsp.Id
                                   where lsp.TenLoai == "Laptop"
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).Take(10).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LoaiSanPham")]
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

        [Route("SanPhamTheoLoai/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetSanPhamByLoaiID(int id)
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   where x.LoaiId == id
                                   where x.TrangThaiHoatDong == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaBan,
                                       khuyenMai = x.KhuyenMai,
                                       avatar = _context.AnhSanPhams.Where(a => a.SanPhamId == x.Id && a.TrangThai == true).Select(a => a.DuongDanAnh).FirstOrDefault()
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAll_Slide")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slider>>> GetAllSlide()
        {
            try
            {
                var query = await (from x in _context.Sliders
                                   where x.Status == true
                                   select new
                                   {
                                       id = x.Id,
                                       anhSlide = x.AnhSlide,
                                       status = x.Status
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Tin Tức
        [Route("DanhMucTinTuc")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhMucTinTuc>>> GetAllDanhMuc()
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

        [Route("TinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> GetTinTucById(int id)
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   where x.DanhMucId == id
                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       noiDung = x.NoiDung,
                                       trangThai = x.TrangThai,
                                       danhMucId = x.DanhMucId,
                                       anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault(),
                                       createDate = x.CreateDate,
                                       updateDate = x.UpdateDate
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ChiTietTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<TinTuc>> GetByIdTinTuc(int id)
        {
            try
            {
                var query = await (from x in _context.TinTucs

                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       noiDung = x.NoiDung,
                                       trangThai = x.TrangThai,
                                       danhMucId = x.DanhMucId,
                                       anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault(),
                                       createDate = x.CreateDate,
                                       updateDate = x.UpdateDate
                                   }).Where(x => x.id == id).FirstOrDefaultAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TinTucCongNghe")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> TinTucCongNghe()
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   join lsp in _context.DanhMucTinTucs on x.DanhMucId equals lsp.Id
                                   where lsp.TenDanhMuc == "Tin công nghệ"
                                   where x.TrangThai == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault()
                                   }).Take(3).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("KhamPha")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> KhamPha()
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   join lsp in _context.DanhMucTinTucs on x.DanhMucId equals lsp.Id
                                   where lsp.TenDanhMuc == "Khám phá"
                                   where x.TrangThai == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault()
                                   }).Take(3).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TGames")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TinTuc>>> TGames()
        {
            try
            {
                var query = await (from x in _context.TinTucs
                                   join lsp in _context.DanhMucTinTucs on x.DanhMucId equals lsp.Id
                                   where lsp.TenDanhMuc == "T-Games"
                                   where x.TrangThai == true
                                   orderby x.CreateDate descending
                                   select new
                                   {
                                       id = x.Id,
                                       tieuDe = x.TieuDe,
                                       anhDaiDien = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id && a.TrangThai == true).Select(a => a.DuongDan).FirstOrDefault()
                                   }).Take(3).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LayTenLoai/{id}")]
        [HttpGet]
        public async Task<ActionResult<Loai>> GetNameLoai(int id)
        {
            try
            {
                var query = await (from x in _context.Loais
                                   where  x.Id == id
                                   select new
                                   {
                                       name = x.TenLoai
                                   }).FirstOrDefaultAsync();
                if(query == null)
                {
                    return BadRequest(new
                    {
                        message = "Không tìm thấy dữ liệu!"
                    });
                }
                return Ok(query);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LayTenTinTuc/{id}")]
        [HttpGet]
        public async Task<ActionResult<DanhMucTinTuc>> GetNameTinTuc(int id)
        {
            try
            {
                var query = await (from x in _context.DanhMucTinTucs
                                   where x.Id == id
                                   select new
                                   {
                                       name = x.TenDanhMuc
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
    }
}
