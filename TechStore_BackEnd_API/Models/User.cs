using System;
using System.Collections.Generic;

namespace TechStore.Models
{
    public partial class User
    {
        public User()
        {
            NhanSus = new HashSet<NhanSu>();
        }

        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? PassWord { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<NhanSu> NhanSus { get; set; }
    }
}
