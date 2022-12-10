using WebApplication2.Models;

namespace WebApplication2.Services; 

public interface IMailService {
    Task SendEmailAsync(MailRequest mailRequest);
    void SendInsights();
}