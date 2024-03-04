using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using TechStore.Models;

namespace TechStore.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class SlideController : ControllerBase
    {
        private TechStoreContext _context = new TechStoreContext();
        private string _path;
        public SlideController(TechStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _path = configuration["AppSettings:UrlImage"];
        }

        [Route("GetAll_Slide")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slider>>> GetAll()
        {
            try
            {
                var query = await (from Slide in _context.Sliders
                                   select new
                                   {
                                       id = Slide.Id,
                                       anhSlide = Slide.AnhSlide,
                                       link = Slide.Link,
                                       status = Slide.Status
                                   }).Where(x => x.status == true).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Slide/{id}")]
        [HttpGet]
        public async Task<ActionResult<Slider>> GetById(int id)
        {
            try
            {
                var query = await (from Slide in _context.Sliders
                                   where Slide.Id == id
                                   select new
                                   {
                                       id = Slide.Id,
                                       anhSlide = Slide.AnhSlide, 
                                       link = Slide.Link,
                                       status = Slide.Status,
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


        [Route("Create_Slide")]
        [HttpPost]
        public async Task<ActionResult<Slider>> CreateSlide([FromBody] Slider model)
        {
            try
            {
                _context.Sliders.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Thêm ảnh slide thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("Update_Slide")]
        [HttpPut]
        public async Task<ActionResult<Slider>> UpdateSlide([FromBody] Slider model)
        {
            try
            {
                var query = await (from Slide in _context.Sliders
                                   where Slide.Id == model.Id
                                   select Slide).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                if (query.AnhSlide != null)
                {
                    string fileName = query.AnhSlide;
                    string filePath = Path.Combine(_path, "slide", fileName);

                    // Xóa ảnh trên server
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                query.AnhSlide = model.AnhSlide;
                query.Status = model.Status;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa ảnh slide thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Slide_TrangThai/{id}")]
        [HttpPut]
        public async Task<ActionResult<Slider>> UpdateSlide(int id)
        {
            try
            {
                var query = await (from Slide in _context.Sliders
                                   where Slide.Id == id
                                   select Slide).FirstOrDefaultAsync();
                if (query == null)
                {
                    return NotFound();
                }

                query.Status = !query.Status;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Sửa trạng thái slide thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_Slide/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Slider>> DeleteSlide(int id)
        {
            try
            {
                var query = await (from Slide in _context.Sliders
                                   where Slide.Id == id
                                   select Slide).FirstOrDefaultAsync();

                if (query == null)
                {
                    return NotFound();
                }

                _context.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa slide thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteMany_Slide")]
        [HttpDelete]
        public IActionResult DeleteMany([FromBody] List<int> listId)
        {
            try
            {
                var query = _context.Sliders.Where(i => listId.Contains(i.Id)).ToList();

                if (query.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ mục nào để xóa.");
                }

                _context.Sliders.RemoveRange(query);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Danh sách đã được xóa thành công."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_Slide")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slider>>> Search()
        {
            IQueryable<Slider> query = _context.Sliders;

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
                    string filePath = $"slide/{file.FileName}";
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
