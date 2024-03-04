using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using TechStore.Dto;
using TechStore.Helper;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin, Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private TechStoreContext _context;
        private string _path;
        public KhachHangController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
        }

        [Route("GetAll_KhachHang")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetAll()
        {
            try
            {
                var query = await (from x in _context.KhachHangs
                                   select new
                                   {
                                       id = x.Id,
                                       userId = _context.Users.Where(us => us.Id == x.UserId).Select(us => us.UserName).FirstOrDefault(),
                                       firstName = x.FirstName,
                                       lastName = x.LastName,
                                       email = x.Email,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi,
                                       ngaySinh = x.NgaySinh,
                                       gioiTinh = x.GioiTinh,
                                       avatar = x.Avatar,
                                       trangThai = x.TrangThai
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [Route("GetById_KhachHang/{id}")]
        [HttpGet]
        public async Task<ActionResult<KhachHang>> GetById(int id)
        {
            try
            {
                var query = await (from x in _context.KhachHangs
                                   where x.Id == id
                                   select new
                                   {
                                       id = x.Id,
                                       firstName = x.FirstName,
                                       lastName = x.LastName,
                                       email = x.Email,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi,
                                       ngaySinh = x.NgaySinh,
                                       gioiTinh = x.GioiTinh,
                                       avatar = x.Avatar,
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

        [AllowAnonymous]
        [Route("Create_KhachHang")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] KhachHangDto model)
        {
            try
            {
                if (_context.Users.Any(u => u.UserName == model.UserName))
                {
                    return BadRequest(new
                    {
                        message = "UserName đã tồn tại! Vui lòng nhập UserName khác."
                    });
                }
                if (_context.Users.Any(u => u.Email == model.Email))
                {
                    return BadRequest(new
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

                var khachhang = new KhachHang
                {
                    UserId = user.Id,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    SoDienThoai = model.SoDienThoai,
                    DiaChi = model.DiaChi,
                    NgaySinh = model.NgaySinh,
                    GioiTinh = model.GioiTinh,
                    Avatar = model.Avatar,
                    TrangThai = model.TrangThai
                };
                _context.KhachHangs.Add(khachhang);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Tạo tài khoản thành công thành công!"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [Route("Update_KhachHang")]
        [HttpPut]
        public async Task<ActionResult<KhachHang>> Update([FromBody] KhachHang model)
        {
            try
            {
                var query = await (from x in _context.KhachHangs
                                   where x.Id == model.Id
                                   select x).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                //if (query.Avatar != null)
                //{
                //    string fileName = query.Avatar;
                //    string filePath = Path.Combine(_path, "custummers", fileName);
                //    string filePathClient = Path.Combine(_pathClient, "custummers", fileName);

                //    if (System.IO.File.Exists(filePath))
                //    {
                //        System.IO.File.Delete(filePath);
                //    }
                //}
               
                query.FirstName = model.FirstName;
                query.LastName = model.LastName;
                query.Email = model.Email;
                query.SoDienThoai = model.SoDienThoai;
                query.DiaChi = model.DiaChi;
                query.NgaySinh = model.NgaySinh;
                query.GioiTinh = model.GioiTinh;
                query.Avatar = model.Avatar;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Sửa thông tin thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Route("Update_KhachHang_TrangThai/{id}")]
        //[HttpPut]
        //public async Task<ActionResult<KhachHang>> UpdateTrangThai(int id)
        //{
        //    try
        //    {
        //        var khachhang = await (from ns in _context.KhachHangs
        //                            where ns.Id == id
        //                            select ns).FirstOrDefaultAsync();
        //        if (khachhang == null)
        //        {
        //            return NotFound();
        //        }

        //        khachhang.TrangThai = !khachhang.TrangThai;
        //        khachhang.UpdateDate = DateTime.Now;
        //        await _context.SaveChangesAsync();

        //        return Ok(new
        //        {
        //            message = "Sửa trạng thái thành công!"
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        
        [Route("Search_KhachHang")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KhachHang>>> Search(
           [FromQuery] string? Keywork,
           [FromQuery] string? Email,
           [FromQuery] string? DiaChi)
        {
            var query = _context.KhachHangs
                .Select(x => new
                {
                    id = x.Id,
                    userName = _context.Users.Where(u => u.Id == x.UserId).Select(u => u.UserName).FirstOrDefault(),
                    firstName = x.FirstName,
                    lastName = x.LastName,
                    email = x.Email,
                    soDienThoai = x.SoDienThoai,
                    diaChi = x.DiaChi,
                    ngaySinh = x.NgaySinh,
                    gioiTinh = x.GioiTinh,
                    avartar = x.Avatar,
                    trangThai = x.TrangThai,
                    createDate = x.CreateDate
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
                    string filePath = $"custumer/{file.FileName}";
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
