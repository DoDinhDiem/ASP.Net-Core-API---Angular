using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class ChucVu
    {
        public ChucVu()
        {
            NhanSus = new HashSet<NhanSu>();
        }

        public int Id { get; set; }
        public string? TenChucVu { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<NhanSu> NhanSus { get; set; }
    }
}
