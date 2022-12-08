using WebApplication2.Models;

namespace WebApplication2.DTOs;

public class PowerDataMap{
    public readonly Dictionary<string, float> dict;

    public PowerDataMap(PowerData powerData){
        float dailyCost = powerData.DayPowerPrice * powerData.ImportElectricity;
        if (powerData.ExportElectricity > 0){
            dailyCost = powerData.DayPowerPrice * (-1 * powerData.ExportElectricity);
        }

        dailyCost /= 48;
        
        dict = new Dictionary<string, float>{
            { "chp1ElectricityGen", powerData.CHP1ElectricityGen },
            { "chp2ElectricityGen", powerData.CHP2ElectricityGen },
            { "chp1HeatGen", powerData.CHP1HeatGen },
            { "chp2HeatGen", powerData.CHP2HeatGen },
            { "boilerHeat", powerData.BoilerHeat },
            { "feelsLike", powerData.FeelsLike },
            { "windSpeed", powerData.WindSpeed },
            { "siteElectricityDemand", powerData.SiteElectricityDemand },
            { "dayPowerPrice", powerData.DayPowerPrice },
            { "siteHeatDemand", powerData.SiteHeatDemand },
            { "importElectricity", powerData.ImportElectricity },
            { "exportElectricity", powerData.ExportElectricity },
            { "dailyCost", dailyCost}
        };
    }
    
}