using System.Reflection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace Tests;

public class TestHostEnvironment : IHostEnvironment{
    public string ApplicationName{ get; set; }
    public IFileProvider ContentRootFileProvider{ get; set; }
    public string ContentRootPath{ get; set; }
    public string EnvironmentName{ get; set; }
}