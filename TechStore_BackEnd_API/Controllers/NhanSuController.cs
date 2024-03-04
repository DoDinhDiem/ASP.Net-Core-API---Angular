using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStore.Models;
using TechStore.Helper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using TechStore.Dto;
using Microsoft.AspNetCore.Authorization;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class NhanSuController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        public NhanSuController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
        }

        [Route("GetAll_NhanSu")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanSu>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.NhanSus
                                   select new
                                   {
                                       id = x.Id,
                                       taikhoan = _context.Users.Where(u => u.Id == x.UserId).Select(u => u.UserName).FirstOrDefault(),
                                       firstName = x.FirstName,
                                       lastName = x.LastName,
                                       email = x.Email,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi,
                                       ngaySinh = x.NgaySinh,
                                       gioiTinh = x.GioiTinh,
                                       ngayVaoLam = x.NgayVaoLam,
                                       chucVu = _context.ChucVus.Where(u => u.Id == x.ChucVuId).Select(u => u.TenChucVu).FirstOrDefault(),
                                       avartar = x.Avatar
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_NhanSu/{id}")]
        [HttpGet]
        public async Task<ActionResult<NhanSu>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.NhanSus
                                   join u in _context.Users on x.UserId equals u.Id
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       userId = x.UserId,
                                       firstName = x.FirstName,
                                       lastName = x.LastName,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi,
                                       ngaySinh = x.NgaySinh,
                                       gioiTinh = x.GioiTinh,
                                       ngayVaoLam = x.NgayVaoLam,
                                       chucVuId = _context.ChucVus.Where(u => u.Id == x.ChucVuId).Select(u => u.TenChucVu).FirstOrDefault(),
                                       role = u.Role,
                                       avartar = x.Avatar,
                                       trangThai = x.TrangThai
                                   }).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_NhanSu")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NhanSuDto model)
        {
            try
            {
                if (_context.Users.Any(u => u.UserName == model.UserName))
                {
                    return NotFound(new
                    {
                        message = "UserName đã tồn tại! Vui lòng nhập UserName khác."
                    });
                }
                if (_context.Users.Any(u => u.Email == model.Email))
                {
                    return NotFound(new
                    {
                        message = "Email đã tồn tại! Vui lòng nhập Email khác."
                    });
                }
                var user = new User
                {
                    UserName = model.UserName,
                    PassWord = PasswordHasher.HashPassword(model.PassWord),
                    Email = model.Email,
                    Role = model.Role
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var nhansu = new NhanSu
                {
                    UserId = user.Id,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    SoDienThoai = model.SoDienThoai,
                    DiaChi = model.DiaChi,
                    NgaySinh = model.NgaySinh,
                    GioiTinh = model.GioiTinh,
                    NgayVaoLam = model.NgayVaoLam,
                    ChucVuId = model.ChucVuId,
                    Avatar = model.Avatar,
                    TrangThai = model.TrangThai
                };
                _context.NhanSus.Add(nhansu);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm nhân sự thành công!"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhanSu")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] NhanSuDto model)
        {
            try
            {
                var nhansu = await (from ns in _context.NhanSus
                                    where ns.Id == model.Id
                                    select ns
                                    ).FirstOrDefaultAsync();
                var user = await (from us in _context.Users
                                  where us.Id == nhansu.UserId
                                  select us
                                   ).FirstOrDefaultAsync();
                if (nhansu == null || user == null)
                {
                    return NotFound();
                }

                //if(nhansu.Avatar != null )
                //{
                //    string fileName = nhansu.Avatar;
                //    string filePath = Path.Combine(_path, "personnel", fileName);

                //    // Xóa ảnh trên server
                //    if (System.IO.File.Exists(filePath))
                //    {
                //        System.IO.File.Delete(filePath);
                //    }
                //}

                user.Role = model.Role;
                user.UpdateDate = DateTime.Now;

                nhansu.FirstName = model.FirstName;
                nhansu.LastName = model.LastName;
                nhansu.SoDienThoai = model.SoDienThoai;
                nhansu.DiaChi = model.DiaChi;
                nhansu.NgaySinh = model.NgaySinh.Value.Kind == DateTimeKind.Utc? model.NgaySinh.Value.ToLocalTime(): model.NgaySinh.Value;
                nhansu.GioiTinh = model.GioiTinh;
                nhansu.NgayVaoLam = model.NgayVaoLam.Value.Kind == DateTimeKind.Utc ? model.NgayVaoLam.Value.ToLocalTime() : model.NgayVaoLam.Value;
                nhansu.Avatar = model.Avatar;
                nhansu.TrangThai = model.TrangThai;
                nhansu.ChucVuId = model.ChucVuId;
                nhansu.UpdateDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa nhân sự thành công!"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhanSu_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<NhanSu>> UpdateTrangThai(int id)
        {
            try
            {
                var nhansu = await (from ns in _context.NhanSus
                                    where ns.Id == id
                                    select ns).FirstOrDefaultAsync();
                if (nhansu == null)
                {
                    return NotFound();
                }

                nhansu.TrangThai = !nhansu.TrangThai;
                nhansu.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_NhanSu")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanSu>>> Search(
           [FromQuery] string? Keywork,
           [FromQuery] string? Email,
           [FromQuery] string? DiaChi)
        {
            var query = _context.NhanSus
                        .Join(_context.Users, ns => ns.UserId, u => u.Id, (ns, u) => new
                        {
                            id = ns.Id,
                            userName = _context.Users.Where(usr => usr.Id == ns.UserId).Select(usr => usr.UserName).FirstOrDefault(),
                            firstName = ns.FirstName,
                            lastName = ns.LastName,
                            email = ns.Email,
                            soDienThoai = ns.SoDienThoai,
                            diaChi = ns.DiaChi,
                            ngaySinh = ns.NgaySinh,
                            gioiTinh = ns.GioiTinh,
                            ngayVaoLam = ns.NgayVaoLam,
                            chucVuId = _context.ChucVus.Where(chucVu => chucVu.Id == ns.ChucVuId).Select(chucVu => chucVu.TenChucVu).FirstOrDefault(),
                            avatar = ns.Avatar,
                            role = u.Role,
                            trangThai = ns.TrangThai,
                            createDate = ns.CreateDate
                        });

            if (!string.IsNullOrEmpty(Keywork))
            {
                query = query.Where(dc => dc.lastName.Contains(Keywork));
            }

            if (!string.IsNullOrEmpty(Email))
            {
                query = query.Where(dc => dc.email.Contains(Email));
            }

            if (!string.IsNullOrEmpty(DiaChi))
            {
                query = query.Where(dc => dc.diaChi.Contains(DiaChi));
            };

            query = query.OrderByDescending(dc => dc.createDate);
            return Ok(query);
        }

        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    string filePath = $"personnel/{file.FileName}";
                    var fullPath = CreatePathFile(filePath);

                    using (var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    return Ok(new { filePath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [NonAction]
        private string CreatePathFile(string RelativePathFileName)
        {
            try
            {
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = System.IO.Path.GetDirectoryName(fullPathFile);
                if (!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                return fullPathFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
