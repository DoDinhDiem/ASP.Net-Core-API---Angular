using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class HangSanXuat
    {
        public HangSanXuat()
        {
            SanPhams = new HashSet<SanPham>();
        }

        public int Id { get; set; }
        public string? TenHang { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
