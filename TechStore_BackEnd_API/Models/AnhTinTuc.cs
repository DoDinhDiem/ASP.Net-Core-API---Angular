using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class AnhTinTuc
    {
        public int Id { get; set; }
        public int TinTucId { get; set; }
        public string? DuongDan { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool? TrangThai { get; set; }

        public virtual TinTuc? TinTuc { get; set; }
    }
}
