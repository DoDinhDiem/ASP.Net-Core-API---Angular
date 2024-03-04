using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class BinhLuanSanPham
    {
        public int Id { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public int? SanPhamId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateTime { get; set; }
        public int? UserId { get; set; }

        public virtual SanPham? SanPham { get; set; }
        public virtual KhachHang? User { get; set; }
    }
}
