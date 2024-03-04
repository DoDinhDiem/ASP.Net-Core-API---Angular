using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class BinhLuanTinTuc
    {
        public int Id { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public int? TinTucId { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual TinTuc? TinTuc { get; set; }
    }
}
