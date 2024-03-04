using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class ChiTietHoaDonNhap
    {
        public int Id { get; set; }
        public int? SoLuongNhap { get; set; }
        public decimal? GiaNhap { get; set; }
        public decimal? ThanhTien { get; set; }
        public int? HoaDonNhapId { get; set; }
        public int? SanPhamId { get; set; }

        public virtual HoaDonNhap? HoaDonNhap { get; set; }
        public virtual SanPham? SanPham { get; set; }
    }
}
