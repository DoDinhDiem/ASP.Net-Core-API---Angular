using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class HoaDonBan
    {
        public HoaDonBan()
        {
            ChiTietHoaDonBans = new HashSet<ChiTietHoaDonBan>();
        }

        public int Id { get; set; }
        public string? HoTen { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? GhiChu { get; set; }
        public string? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UserId { get; set; }
        public decimal? TongTien { get; set; }
        public decimal? GiamGia { get; set; }
        public bool? TrangThaiThanhToan { get; set; }

        public virtual KhachHang? User { get; set; }
        public virtual ICollection<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; }
    }
}
