using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class ThongSo
    {
        public int Id { get; set; }
        public int SanPhamId { get; set; }
        public string? TenThongSo { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual SanPham? SanPham { get; set; }
    }
}
