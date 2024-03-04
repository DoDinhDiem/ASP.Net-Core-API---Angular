using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TechStore.Dto;
using TechStore.Helper;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private TechStoreContext _context;
        private AppSetting _appSetting;

        public AccountController(TechStoreContext context, IOptions<AppSetting> setting)
        {
            _context = context;
            _appSetting = setting.Value;
        }

        [Route("RegisterClient")]
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
                    Role = "Khách hàng"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var khachhang = new KhachHang
                {
                    UserId = user.Id,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = user.Email,
                    SoDienThoai = model.SoDienThoai,
                    TrangThai = "Đồng"
                };
                _context.KhachHangs.Add(khachhang);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Đăng ký tài khoản thành công thành công!"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var UserName = user.UserName;
            var PassWord = user.PassWord;

            var users = _context.Users
                                .Where(x => x.UserName == UserName)
                                .Join(
                                    _context.KhachHangs,
                                    us => us.Id,
                                    ns => ns.UserId,
                                    (us, ns) => new
                                    {
                                        UserName = us.UserName,
                                        PassWord = us.PassWord,
                                        Role = us.Role,
                                        UserId = ns.Id
                                    }
                                ).SingleOrDefault();
            if (users == null)
            {
                return Ok(new
                {
                    message = "Tài khoản không đúng"
                });
            }
            if (!PasswordHasher.VerifyPassword(user.PassWord, users.PassWord))
            {
                return Ok(new
                {
                    message = "Mật khẩu không đúng"
                });
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, users.UserName.ToString()),
                    new Claim(ClaimTypes.Role, users.Role),
                    new Claim("UserId", users.UserId.ToString()),
                    new Claim(ClaimTypes.DenyOnlyWindowsDeviceGroup, users.PassWord)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var tmp = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(tmp);
            var userRole = users.Role;
            return Ok(new
            {
                AccessToken = token
            });
        }

        [Route("LoginAdmin")]
        [HttpPost]
        public async Task<IActionResult> LoginAdmin([FromBody] User user)
        {
            var UserName = user.UserName;
            var PassWord = user.PassWord;

            var users = _context.Users
                                 .Where(x => x.UserName == UserName)
                                 .Join(
                                     _context.NhanSus,
                                     us => us.Id,
                                     ns => ns.UserId,
                                     (us, ns) => new 
                                     { 
                                         UserName = us.UserName, 
                                         PassWord = us.PassWord,
                                         Role = us.Role,
                                         UserId = ns.Id
                                     }
                                 ).SingleOrDefault();
            if (users == null)
            {
                return Ok(new
                {
                    message = "Tài khoản không đúng"
                });
            }
            if (!PasswordHasher.VerifyPassword(user.PassWord, users.PassWord))
            {
                return Ok(new
                {
                    message = "Mật khẩu không đúng"
                });
            }


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, users.UserName.ToString()),
                    new Claim(ClaimTypes.Role, users.Role),
                    new Claim("UserId", users.UserId.ToString()),
                    new Claim(ClaimTypes.DenyOnlyWindowsDeviceGroup, users.PassWord)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tmp = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(tmp);
            var userRole = users.Role;
            return Ok(new
            {
                AccessToken = token
            });
        }
    }
}
