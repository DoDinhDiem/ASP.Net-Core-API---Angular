using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class NhanSu
    {
        public NhanSu()
        {
            HoaDonNhaps = new HashSet<HoaDonNhap>();
            TinTucs = new HashSet<TinTuc>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? NgayVaoLam { get; set; }
        public int? ChucVuId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? Avatar { get; set; }
        public bool? TrangThai { get; set; }

        public virtual ChucVu? ChucVu { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<HoaDonNhap> HoaDonNhaps { get; set; }
        public virtual ICollection<TinTuc> TinTucs { get; set; }
    }
}
