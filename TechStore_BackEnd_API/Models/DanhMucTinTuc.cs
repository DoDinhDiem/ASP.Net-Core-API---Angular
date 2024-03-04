using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class DanhMucTinTuc
    {
        public DanhMucTinTuc()
        {
            TinTucs = new HashSet<TinTuc>();
        }

        public int Id { get; set; }
        public string? TenDanhMuc { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<TinTuc> TinTucs { get; set; }
    }
}
