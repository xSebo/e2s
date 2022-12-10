using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using WebApplication2.DTOs;
using WebApplication2.Models;

namespace WebApplication2.Services; 

public class MailService :IMailService {

    private readonly MailSettings _mailSettings;
    private readonly IDataService _dataService;
    private readonly IUserService _userService;

    public MailService(IOptions<MailSettings> mailSettings, IDataService dataService, IUserService userService) {
        _mailSettings = mailSettings.Value;
        _dataService = dataService;
        _userService = userService;
    }

    // To send an e-mail from the given mailRequest
    public async Task SendEmailAsync(MailRequest mailRequest) {
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
        email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
        email.Subject = mailRequest.Subject;
        var builder = new BodyBuilder();
     
        builder.HtmlBody = mailRequest.Body;
        email.Body = builder.ToMessageBody();
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

    private string getEmailTemplate(string fileName) {
        string filePath = Directory.GetCurrentDirectory() + "\\static\\templates\\"+fileName;
        StreamReader str = new StreamReader(filePath);
        string mailText = str.ReadToEnd();
        str.Close();
        return mailText;
    }
    
    // To send e-mails containing insights to each user
    public void SendInsights() {
        string emailInsightTemplate = getEmailTemplate("emailInsightTextTemplate.html");
        string emailBodyTemplate = getEmailTemplate("emailTemplate.html");
        
        Dictionary<int, List<InsightDTO>> listOrganisationDTOs = _dataService.GetAllInsights();
        List<UserEmailDTO> usersToEmail = _userService.GetAllUsersToEmail();
        
        usersToEmail.ForEach(user => {
            string emailBodyInsights = "";
            List<InsightDTO> usersInsightList = listOrganisationDTOs[user.OrganisationId];
            
            usersInsightList.ForEach(insight => {
                emailBodyInsights += emailInsightTemplate.Replace("{{INSIGHT_TEXT}}", insight.Text);
            });
            string emailBody = emailBodyTemplate.Replace("{{INSIGHTS_LIST}}", emailBodyInsights);
            
            SendEmailAsync(new MailRequest(
                user.Email,
                "E2S Energy Insights",
                emailBody
            ));
        });
    }
}