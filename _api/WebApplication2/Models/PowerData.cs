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

    public readonly Dictionary<string, float> dict;
    public PowerData(){
        dict = new Dictionary<string, float>{
            { "chp1ElectricityGen", CHP1ElectricityGen },
            { "chp2ElectricityGen", CHP2ElectricityGen },
            { "chp1HeatGen", CHP1HeatGen },
            { "chp2HeatGen", CHP2HeatGen },
            { "boilerHeat", BoilerHeat },
            { "feelsLike", FeelsLike },
            { "windSpeed", WindSpeed },
            { "siteElectricityDemand", SiteElectricityDemand },
            { "dayPowerPrice", DayPowerPrice },
            { "siteHeatDemand", SiteHeatDemand },
            { "importElectricity", ImportElectricity },
            { "exportElectricity", ExportElectricity }
        };
    }

}