using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class MaGiamGium
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public decimal? SoTienGiam { get; set; }
        public string? NoiDungGiam { get; set; }
        public int? SoLuot { get; set; }
        public DateTime? ThoiGianHetHan { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
