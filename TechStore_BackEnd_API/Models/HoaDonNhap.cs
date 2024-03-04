using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class HoaDonNhap
    {
        public HoaDonNhap()
        {
            ChiTietHoaDonNhaps = new HashSet<ChiTietHoaDonNhap>();
        }

        public int Id { get; set; }
        public int? NhaCungCapId { get; set; }
        public bool? TrangThaiThanhToan { get; set; }
        public decimal? TongTien { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UserId { get; set; }

        public virtual NhaCungCap? NhaCungCap { get; set; }
        public virtual NhanSu? User { get; set; }
        public virtual ICollection<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }
    }
}
