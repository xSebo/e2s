using WebApplication2.DTOs;

namespace WebApplication2.Services;

public interface IImages{
    public FileUpload Upload(IFormFile files);
}