using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class FlowDTO {
    
    public float? Chp1Gen { get; set; } = null!;
    public float? Chp2Gen { get; set; } = null!;
    public float? Import { get; set; } = null!;
    public float? Export { get; set; } = null!;
    public float? Demand { get; set; } = null!;
    
    public DateTime Date{ get; set; }

    public FlowDTO(float chp1Gen, float chp2Gen, float import, float export, float demand, DateTime date) {
        this.Chp1Gen = chp1Gen;
        this.Chp2Gen = chp2Gen;
        this.Import = import;
        this.Export = export;
        this.Demand = demand;
        this.Date = date;
    }
}