using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class SanPham
    {
        public SanPham()
        {
            AnhSanPhams = new HashSet<AnhSanPham>();
            BinhLuanSanPhams = new HashSet<BinhLuanSanPham>();
            ChiTietHoaDonBans = new HashSet<ChiTietHoaDonBan>();
            ChiTietHoaDonNhaps = new HashSet<ChiTietHoaDonNhap>();
            ThongSos = new HashSet<ThongSo>();
        }

        public int Id { get; set; }
        public string? TenSanPham { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? KhuyenMai { get; set; }
        public int? SoLuongTon { get; set; }
        public string? BaoHanh { get; set; }
        public string? MoTa { get; set; }
        public int LoaiId { get; set; }
        public int HangSanXuatId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? TrangThaiSanPham { get; set; }
        public bool? TrangThaiHoatDong { get; set; }

        public virtual HangSanXuat? HangSanXuat { get; set; }
        public virtual Loai? Loai { get; set; }
        public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; }
        public virtual ICollection<BinhLuanSanPham> BinhLuanSanPhams { get; set; }
        public virtual ICollection<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; }
        public virtual ICollection<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }
        public virtual ICollection<ThongSo> ThongSos { get; set; }
    }
}
