using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class FeedBack
    {
        public int Id { get; set; }
        public string? HoTen { get; set; }
        public string? Email { get; set; }
        public string? NoiDung { get; set; }
        public DateTime? NgayGui { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? UserId { get; set; }

        public virtual KhachHang? User { get; set; }
    }
}
