using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApplication2.DTOs;

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

    public float CalcDailyCost() {
        float dailyCost = this.DayPowerPrice * this.ImportElectricity;
        if (this.ExportElectricity > 0){
            dailyCost = this.DayPowerPrice * (-1 * this.ExportElectricity);
        }

        return dailyCost / 48;
    }
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
            { "exportElectricity", this.ExportElectricity },
            { "dailyCost", CalcDailyCost()}
        };
    }
    public float? GetDataByDataType(string dataType) {
        if (!GetDataTypeStringDict().ContainsKey(dataType)) {
            return null;
        }
        return GetDataTypeStringDict()[dataType];
    }
    
    public FlowDTO ToFlowDto() {
        return new FlowDTO(this.CHP1ElectricityGen, this.CHP2ElectricityGen, this.ImportElectricity, this.ExportElectricity, this.SiteElectricityDemand, this.Date);
    }
}