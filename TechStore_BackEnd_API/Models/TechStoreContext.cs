using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TechStore.Models
{
    public partial class TechStoreContext : DbContext
    {
        public TechStoreContext()
        {
        }

        public TechStoreContext(DbContextOptions<TechStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AnhSanPham> AnhSanPhams { get; set; } = null!;
        public virtual DbSet<AnhTinTuc> AnhTinTucs { get; set; } = null!;
        public virtual DbSet<BinhLuanSanPham> BinhLuanSanPhams { get; set; } = null!;
        public virtual DbSet<BinhLuanTinTuc> BinhLuanTinTucs { get; set; } = null!;
        public virtual DbSet<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; } = null!;
        public virtual DbSet<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; } = null!;
        public virtual DbSet<ChucVu> ChucVus { get; set; } = null!;
        public virtual DbSet<DanhMucTinTuc> DanhMucTinTucs { get; set; } = null!;
        public virtual DbSet<FeedBack> FeedBacks { get; set; } = null!;
        public virtual DbSet<HangSanXuat> HangSanXuats { get; set; } = null!;
        public virtual DbSet<HoaDonBan> HoaDonBans { get; set; } = null!;
        public virtual DbSet<HoaDonNhap> HoaDonNhaps { get; set; } = null!;
        public virtual DbSet<KhachHang> KhachHangs { get; set; } = null!;
        public virtual DbSet<Loai> Loais { get; set; } = null!;
        public virtual DbSet<MaGiamGium> MaGiamGia { get; set; } = null!;
        public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; } = null!;
        public virtual DbSet<NhanSu> NhanSus { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;
        public virtual DbSet<Slider> Sliders { get; set; } = null!;
        public virtual DbSet<ThongSo> ThongSos { get; set; } = null!;
        public virtual DbSet<TinTuc> TinTucs { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DINHDIEMIT;Initial Catalog=TechStore;Integrated Security=True;Trust Server Certificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnhSanPham>(entity =>
            {
                entity.ToTable("AnhSanPham");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SanPhamId).HasColumnName("SanPham_Id");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.AnhSanPhams)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_AnhSanPham_SanPham");
            });

            modelBuilder.Entity<AnhTinTuc>(entity =>
            {
                entity.ToTable("AnhTinTuc");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TinTucId).HasColumnName("TinTuc_Id");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.TinTuc)
                    .WithMany(p => p.AnhTinTucs)
                    .HasForeignKey(d => d.TinTucId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_AnhTinTuc_TinTuc");
            });

            modelBuilder.Entity<BinhLuanSanPham>(entity =>
            {
                entity.ToTable("BinhLuanSanPham");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NoiDung).HasColumnType("ntext");

                entity.Property(e => e.SanPhamId).HasColumnName("SanPham_Id");

                entity.Property(e => e.UpdateTime).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.BinhLuanSanPhams)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_BinhLuanSanPham_SanPham");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BinhLuanSanPhams)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_BinhLuanSanPham_KhachHang");
            });

            modelBuilder.Entity<BinhLuanTinTuc>(entity =>
            {
                entity.ToTable("BinhLuanTinTuc");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NoiDung).HasColumnType("ntext");

                entity.Property(e => e.TinTucId).HasColumnName("TinTuc_Id");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.TinTuc)
                    .WithMany(p => p.BinhLuanTinTucs)
                    .HasForeignKey(d => d.TinTucId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_BinhLuanTinTuc_TinTuc");
            });

            modelBuilder.Entity<ChiTietHoaDonBan>(entity =>
            {
                entity.ToTable("ChiTietHoaDonBan");

                entity.Property(e => e.GiaBan).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.HoaDonBanId).HasColumnName("HoaDonBan_Id");

                entity.Property(e => e.SanPhamId).HasColumnName("SanPham_Id");

                entity.Property(e => e.TenSanPham).HasMaxLength(255);

                entity.Property(e => e.ThanhTien).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.HoaDonBan)
                    .WithMany(p => p.ChiTietHoaDonBans)
                    .HasForeignKey(d => d.HoaDonBanId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ChiTietHoaDonBan_HoaDonBan");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ChiTietHoaDonBans)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ChiTietHoaDonBan_SanPham");
            });

            modelBuilder.Entity<ChiTietHoaDonNhap>(entity =>
            {
                entity.ToTable("ChiTietHoaDonNhap");

                entity.Property(e => e.GiaNhap).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.HoaDonNhapId).HasColumnName("HoaDonNhap_Id");

                entity.Property(e => e.SanPhamId).HasColumnName("SanPham_Id");

                entity.Property(e => e.ThanhTien).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.HoaDonNhap)
                    .WithMany(p => p.ChiTietHoaDonNhaps)
                    .HasForeignKey(d => d.HoaDonNhapId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ChiTietHoaDonNhap_HoaDonNhap");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ChiTietHoaDonNhaps)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ChiTietHoaDonNhap_SanPham");
            });

            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.ToTable("ChucVu");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenChucVu).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<DanhMucTinTuc>(entity =>
            {
                entity.ToTable("DanhMucTinTuc");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenDanhMuc).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<FeedBack>(entity =>
            {
                entity.ToTable("FeedBack");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.HoTen).HasMaxLength(255);

                entity.Property(e => e.NgayGui)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NoiDung).HasColumnType("ntext");

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FeedBacks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FeedBack_KhachHang");
            });

            modelBuilder.Entity<HangSanXuat>(entity =>
            {
                entity.ToTable("HangSanXuat");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenHang).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<HoaDonBan>(entity =>
            {
                entity.ToTable("HoaDonBan");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.GhiChu).HasColumnType("ntext");

                entity.Property(e => e.GiamGia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.HoTen).HasMaxLength(255);

                entity.Property(e => e.SoDienThoai).HasMaxLength(20);

                entity.Property(e => e.TongTien).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TrangThai).HasMaxLength(255);

                entity.Property(e => e.UserId).HasColumnName("User_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HoaDonBans)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HoaDonBan_KhachHang");
            });

            modelBuilder.Entity<HoaDonNhap>(entity =>
            {
                entity.ToTable("HoaDonNhap");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NhaCungCapId).HasColumnName("NhaCungCap_Id");

                entity.Property(e => e.TongTien).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.NhaCungCap)
                    .WithMany(p => p.HoaDonNhaps)
                    .HasForeignKey(d => d.NhaCungCapId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HoaDonNhap_NhaCungCap");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HoaDonNhaps)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HoaDonNhap_NhanSu");
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.ToTable("KhachHang");

                entity.Property(e => e.Avatar).HasMaxLength(255);

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.GioiTinh).HasMaxLength(10);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoDienThoai).HasMaxLength(20);

                entity.Property(e => e.TrangThai).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("User_Id");
            });

            modelBuilder.Entity<Loai>(entity =>
            {
                entity.ToTable("Loai");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenLoai).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<MaGiamGium>(entity =>
            {
                entity.Property(e => e.Code).HasMaxLength(255);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.NoiDungGiam).HasMaxLength(255);

                entity.Property(e => e.SoTienGiam).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ThoiGianHetHan).HasColumnType("datetime");

                entity.Property(e => e.UpdateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<NhaCungCap>(entity =>
            {
                entity.ToTable("NhaCungCap");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi).HasColumnType("ntext");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.SoDienThoai).HasMaxLength(20);

                entity.Property(e => e.TenNhaCungCap).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<NhanSu>(entity =>
            {
                entity.ToTable("NhanSu");

                entity.Property(e => e.Avatar).HasMaxLength(255);

                entity.Property(e => e.ChucVuId).HasColumnName("ChucVu_Id");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.GioiTinh).HasMaxLength(10);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.NgayVaoLam).HasColumnType("date");

                entity.Property(e => e.SoDienThoai).HasMaxLength(20);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.ChucVu)
                    .WithMany(p => p.NhanSus)
                    .HasForeignKey(d => d.ChucVuId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhanSu_ChucVu");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.NhanSus)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhanSu_User");
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.ToTable("SanPham");

                entity.Property(e => e.BaoHanh).HasMaxLength(50);

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.GiaBan)
                    .HasColumnType("decimal(18, 0)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.HangSanXuatId).HasColumnName("HangSanXuat_Id");

                entity.Property(e => e.KhuyenMai)
                    .HasColumnType("decimal(18, 0)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.LoaiId).HasColumnName("Loai_Id");

                entity.Property(e => e.MoTa).HasColumnType("ntext");

                entity.Property(e => e.SoLuongTon).HasDefaultValueSql("((0))");

                entity.Property(e => e.TenSanPham).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.HangSanXuat)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.HangSanXuatId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SanPham_HangSanXuat");

                entity.HasOne(d => d.Loai)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.LoaiId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SanPham_Loai");
            });

            modelBuilder.Entity<Slider>(entity =>
            {
                entity.ToTable("Slider");
            });

            modelBuilder.Entity<ThongSo>(entity =>
            {
                entity.ToTable("ThongSo");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.MoTa).HasColumnType("ntext");

                entity.Property(e => e.SanPhamId).HasColumnName("SanPham_id");

                entity.Property(e => e.TenThongSo).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ThongSos)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ThongSo_SanPham1");
            });

            modelBuilder.Entity<TinTuc>(entity =>
            {
                entity.ToTable("TinTuc");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DanhMucId).HasColumnName("DanhMuc_Id");

                entity.Property(e => e.NoiDung).HasColumnType("ntext");

                entity.Property(e => e.TieuDe).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.HasOne(d => d.DanhMuc)
                    .WithMany(p => p.TinTucs)
                    .HasForeignKey(d => d.DanhMucId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TinTuc_DanhMucTinTuc");

                entity.HasOne(d => d.NguoiVietNavigation)
                    .WithMany(p => p.TinTucs)
                    .HasForeignKey(d => d.NguoiViet)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TinTuc_NhanSu");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.PassWord).HasMaxLength(100);

                entity.Property(e => e.Role).HasMaxLength(255);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UserName).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
