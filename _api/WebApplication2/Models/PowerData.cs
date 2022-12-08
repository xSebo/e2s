using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Models;

public class PowerData{
    
    [Key] 
    public int Id { get; set; }

    public DateTime Date{ get; set; }

    public virtual Organisation Organisation { get; set; } = null!;
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

    public Dictionary<string, float> GetDataTypeStringDict() {
        return new Dictionary<string, float>{
            { "chp1ElectricityGen", this.CHP1ElectricityGen },
            { "chp2ElectricityGen", this.CHP2ElectricityGen },
            { "chp1HeatGen", this.CHP1HeatGen },
            { "chp2HeatGen", this.CHP2HeatGen },
            { "boilerHeat", this.BoilerHeat },
            { "feelsLike", this.FeelsLike },
            { "windSpeed", this.WindSpeed },
            { "siteElectricityDemand", this.SiteElectricityDemand },
            { "dayPowerPrice", this.DayPowerPrice },
            { "siteHeatDemand", this.SiteHeatDemand },
            { "importElectricity", this.ImportElectricity },
            { "exportElectricity", this.ExportElectricity }
        };
    }
    public float? GetDataByString(string dataType) {
        return GetDataTypeStringDict()[dataType];
    }
}