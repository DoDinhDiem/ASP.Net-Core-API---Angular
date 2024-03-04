using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class TinTuc
    {
        public TinTuc()
        {
            AnhTinTucs = new HashSet<AnhTinTuc>();
            BinhLuanTinTucs = new HashSet<BinhLuanTinTuc>();
        }

        public int Id { get; set; }
        public string? TieuDe { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public int? DanhMucId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? NguoiViet { get; set; }

        public virtual DanhMucTinTuc? DanhMuc { get; set; }
        public virtual NhanSu? NguoiVietNavigation { get; set; }
        public virtual ICollection<AnhTinTuc> AnhTinTucs { get; set; }
        public virtual ICollection<BinhLuanTinTuc> BinhLuanTinTucs { get; set; }
    }
}
