using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class InsightDTO {
    public string Type { get; set; } = null!;
    public string Text { get; set; } = null!;

    public InsightDTO(String type, String text) {
        this.Type = type;
        this.Text = text;
    }
}