using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class ChiTietHoaDonBan
    {
        public int Id { get; set; }
        public int? HoaDonBanId { get; set; }
        public int? SanPhamId { get; set; }
        public string? TenSanPham { get; set; }
        public int? SoLuong { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? ThanhTien { get; set; }

        public virtual HoaDonBan? HoaDonBan { get; set; }
        public virtual SanPham? SanPham { get; set; }
    }
}
