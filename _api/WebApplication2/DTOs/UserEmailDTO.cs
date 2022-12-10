using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class UserEmailDTO {
    public string Email { get; set; }
    public int OrganisationId { get; set; }

    public UserEmailDTO(User user) {
        Email = user.Email;
        OrganisationId = user.Organisation.Id;
    }
}