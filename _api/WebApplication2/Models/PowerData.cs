using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models;

public class PowerData{
    [Key] public DateTime Date{ get; set; }
    public float CHP1ElectricityGen{ get; set; }
    public float CHP2ElectricityGen{ get; set; }
    public float CHP1HeatGen{ get; set; }
    public float CHP2HeatGen{ get; set; }
    public float BoilerHeat{ get; set; }
    public float FeelsLike{ get; set; }
    public float WindSpeed{ get; set; }
    public float SiteElectricityDemand{ get; set; }
    public float DayPowerPrice{ get; set; }
    public float SiteHeatDemand{ get; set; }
    public float ImportElectricity{ get; set; }
    public float ExportElectricity{ get; set; }
}