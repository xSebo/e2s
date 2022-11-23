using WebApplication2.DTOs;

namespace WebApplication2.Services;

public class Images : IImages{
    private readonly IHostEnvironment _hostEnvironment;

    public Images(IHostEnvironment hostEnvironment){
        _hostEnvironment = hostEnvironment;
    }
    
    public FileUpload Upload(IFormFileCollection files){
        FileUpload fileUpload = new FileUpload{
            IsSuccess = false,
            Name = null
        };
        if (files.Count <= 0) return fileUpload;
        foreach (var file in files){
            FileInfo fi = new FileInfo(file.FileName);
            string? fileName = System.Guid.NewGuid() + fi.Extension;
            var path = _hostEnvironment.ContentRootPath + "/CompanyLogos/" + fileName;
            using (var stream = new FileStream(path, FileMode.Create)){
                file.CopyTo(stream);
            }

            fileUpload.Name = fileName;
            fileUpload.IsSuccess = true;
        }

        return fileUpload;

    }
}