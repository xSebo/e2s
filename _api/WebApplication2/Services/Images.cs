using WebApplication2.DTOs;

namespace WebApplication2.Services;

public class Images : IImages{
    private readonly IHostEnvironment _hostEnvironment;

    public Images(IHostEnvironment hostEnvironment){
        _hostEnvironment = hostEnvironment;
    }

    public FileUpload Upload(IFormFile file){
        FileInfo fi = new FileInfo(file.FileName);
        string? fileName = Guid.NewGuid() + fi.Extension;
        var path = _hostEnvironment.ContentRootPath + "/CompanyLogos/" + fileName;
        using (var stream = new FileStream(path, FileMode.Create)){
            file.CopyTo(stream);
        }

        FileUpload fileUpload = new FileUpload{
            Name = fileName,
            IsSuccess = true
        };

        return fileUpload;
    }
}