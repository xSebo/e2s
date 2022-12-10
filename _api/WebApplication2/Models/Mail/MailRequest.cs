namespace WebApplication2.Models; 

public class MailRequest {
    public MailRequest(string toEmail, string subject, string body) {
        ToEmail = toEmail;
        Subject = subject;
        Body = body;
    }

    public string ToEmail { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}