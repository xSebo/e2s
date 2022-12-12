using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebApplication2.DTOs;
using WebApplication2.Models;
using WebApplication2.Repos;
using WebApplication2.Services;
using Assert = Xunit.Assert;

namespace Tests.services; 

[TestClass]
public class DataServiceTest {

    private readonly Mock<IPowerDatas> MockPowerDatas = new Mock<IPowerDatas>();
    private readonly Mock<IInsights> MockInsights = new Mock<IInsights>();
    private readonly Mock<IOrganisations> MockOrganisations = new Mock<IOrganisations>();

    [DataTestMethod]
    [DataRow(1,1,1,1)]  // Exact Match
    [DataRow(1,1,1,2)]  // Exact Former, Over Latter
    [DataRow(1,1,2,1)]  // Under Former, Exact Latter
    [DataRow(1,1,2,2)]  // Under Former, Over Latter
    public void DataService_GetDataByDates_ValidDates(int powerDate1Hour, int powerDate2Hour, 
        int searchDateFormerHour, int searchDateLatterHour) {
        
        DateTime dateTimeBase = DateTime.Today;

        DateTime powerDate1 = dateTimeBase.Subtract(TimeSpan.FromHours(powerDate1Hour));
        DateTime powerDate2 = dateTimeBase.Add(TimeSpan.FromHours(powerDate2Hour));
        DateTime searchDateFormer = dateTimeBase.Subtract(TimeSpan.FromHours(searchDateFormerHour));
        DateTime searchDateLatter = dateTimeBase.Add(TimeSpan.FromHours(searchDateLatterHour));
            
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        List<PowerData> powerDataListMock = new List<PowerData>() {
            new PowerData() {
                Id = 1, Date = powerDate1, Organisation = organisationMock1,
                CHP1ElectricityGen = 10, CHP2ElectricityGen = 10, CHP1HeatGen = 10, CHP2HeatGen = 10,
                BoilerHeat = 10, FeelsLike = 10, WindSpeed = 10, SiteElectricityDemand = 10, DayPowerPrice = 10,
                SiteHeatDemand = 10, ImportElectricity = 10, ExportElectricity = 10
            },
            new PowerData() {
                Id = 2, Date = powerDate2, Organisation = organisationMock1,
                CHP1ElectricityGen = 20, CHP2ElectricityGen = 20, CHP1HeatGen = 20, CHP2HeatGen = 20,
                BoilerHeat = 20, FeelsLike = 20, WindSpeed = 20, SiteElectricityDemand = 20, DayPowerPrice = 20,
                SiteHeatDemand = 20, ImportElectricity = 20, ExportElectricity = 20
            }
        };
        
        this.MockPowerDatas.Setup(p => p.ByDates(searchDateFormer, searchDateLatter, 1)).Returns(powerDataListMock);
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);
        
        List<GraphDataDTO>? returnedGraphDataDtos = dataService.GetDataByDates(new string[]{"boilerHeat"},
            searchDateFormer,
            searchDateLatter,
            1);
        
        // Assert
        Assert.True(returnedGraphDataDtos != null);
        Assert.True(returnedGraphDataDtos.Count == 2);
        Assert.True(returnedGraphDataDtos[0].XAxis == powerDate1.ToString("dd/M/yyy HH:mm:ss"));
        Assert.True(returnedGraphDataDtos[1].XAxis == powerDate2.ToString("dd/M/yyy HH:mm:ss"));
    }
    
    [DataTestMethod]
    [DataRow(new string[]{"boilerHeat"})] 
    [DataRow(new string[]{"boilerHeat", "feelsLike"})] 
    [DataRow(new string[]{"boilerHeat", "boilerHeat"})] 
    public void DataService_GetDataByDates_ValidTypes(string[] dataTypes) {
        
        DateTime dateTimeBase = DateTime.Today;
        DateTime powerDate1 = dateTimeBase.Subtract(TimeSpan.FromHours(1));
        DateTime powerDate2 = dateTimeBase.Add(TimeSpan.FromHours(1));
        DateTime searchDateFormer = dateTimeBase.Subtract(TimeSpan.FromHours(1));
        DateTime searchDateLatter = dateTimeBase.Add(TimeSpan.FromHours(1));
            
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        List<PowerData> powerDataListMock = new List<PowerData>() {
            new PowerData() {
                Id = 1, Date = powerDate1, Organisation = organisationMock1,
                CHP1ElectricityGen = 10, CHP2ElectricityGen = 10, CHP1HeatGen = 10, CHP2HeatGen = 10,
                BoilerHeat = 10, FeelsLike = 10, WindSpeed = 10, SiteElectricityDemand = 10, DayPowerPrice = 10,
                SiteHeatDemand = 10, ImportElectricity = 10, ExportElectricity = 10
            },
            new PowerData() {
                Id = 2, Date = powerDate2, Organisation = organisationMock1,
                CHP1ElectricityGen = 20, CHP2ElectricityGen = 20, CHP1HeatGen = 20, CHP2HeatGen = 20,
                BoilerHeat = 20, FeelsLike = 20, WindSpeed = 20, SiteElectricityDemand = 20, DayPowerPrice = 20,
                SiteHeatDemand = 20, ImportElectricity = 20, ExportElectricity = 20
            }
        };
        
        this.MockPowerDatas.Setup(p => p.ByDates(searchDateFormer, searchDateLatter, 1)).Returns(powerDataListMock);
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);
        
        List<GraphDataDTO>? returnedGraphDataDtos = dataService.GetDataByDates(dataTypes,
            searchDateFormer,
            searchDateLatter,
            1);
        
        // Assert
        Assert.True(returnedGraphDataDtos != null);
        Assert.True(returnedGraphDataDtos.Count == 2);
        
        foreach (string dataType in dataTypes) {
            Assert.True(returnedGraphDataDtos[0].YAxis[dataType] == 10);
            Assert.True(returnedGraphDataDtos[1].YAxis[dataType] == 20);
        }
    }
    
        
    [DataTestMethod]
    [DataRow(new string[]{"BadType"})] 
    [DataRow(new string[]{"BadType", "feelsLike"})] 
    [DataRow(new string[]{"BadType", "BadType2"})] 
    public void DataService_GetDataByDates_InvalidTypes(string[] dataTypes) {
        
        DateTime dateTimeBase = DateTime.Today;
        DateTime powerDate1 = dateTimeBase.Subtract(TimeSpan.FromHours(1));
        DateTime powerDate2 = dateTimeBase.Add(TimeSpan.FromHours(1));
        DateTime searchDateFormer = dateTimeBase.Subtract(TimeSpan.FromHours(1));
        DateTime searchDateLatter = dateTimeBase.Add(TimeSpan.FromHours(1));
            
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        List<PowerData> powerDataListMock = new List<PowerData>() {
            new PowerData() {
                Id = 1, Date = powerDate1, Organisation = organisationMock1,
                CHP1ElectricityGen = 10, CHP2ElectricityGen = 10, CHP1HeatGen = 10, CHP2HeatGen = 10,
                BoilerHeat = 10, FeelsLike = 10, WindSpeed = 10, SiteElectricityDemand = 10, DayPowerPrice = 10,
                SiteHeatDemand = 10, ImportElectricity = 10, ExportElectricity = 10
            },
            new PowerData() {
                Id = 2, Date = powerDate2, Organisation = organisationMock1,
                CHP1ElectricityGen = 20, CHP2ElectricityGen = 20, CHP1HeatGen = 20, CHP2HeatGen = 20,
                BoilerHeat = 20, FeelsLike = 20, WindSpeed = 20, SiteElectricityDemand = 20, DayPowerPrice = 20,
                SiteHeatDemand = 20, ImportElectricity = 20, ExportElectricity = 20
            }
        };
        
        this.MockPowerDatas.Setup(p => p.ByDates(searchDateFormer, searchDateLatter, 1)).Returns(powerDataListMock);
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);
        
        List<GraphDataDTO>? returnedGraphDataDtos = dataService.GetDataByDates(dataTypes,
            searchDateFormer,
            searchDateLatter,
            1);
        
        // Assert
        Assert.True(returnedGraphDataDtos == null);
    }
    
    [Fact]
    public void DataService_GetAllOrganisationInsights() {
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co", FacilityName = "Workshop", Logo = "img.png"};
        Organisation organisationMock2 = new Organisation() {Id = 2, Name = "Smith&Co", FacilityName = "Workshop", Logo = "img.png"};
        List<Insight> insightListMock1 = new List<Insight>() {
            new Insight() { Id = 1, Organisation = organisationMock1, Type = "type_1", Text = "insight_text_1" },
            new Insight() { Id = 2, Organisation = organisationMock1, Type = "type_2", Text = "insight_text_2" },
            new Insight() { Id = 3, Organisation = organisationMock1, Type = "type_3", Text = "insight_text_3" },
        };
        List<Insight> insightListMock2 = new List<Insight>() {
            new Insight() { Id = 4, Organisation = organisationMock2, Type = "type_4", Text = "insight_text_4" },
            new Insight() { Id = 5, Organisation = organisationMock2, Type = "type_5", Text = "insight_text_5" }
        };

        this.MockInsights.Setup(p => p.All(1)).Returns(insightListMock1);
        this.MockInsights.Setup(p => p.All(2)).Returns(insightListMock2);
        this.MockInsights.Setup(p => p.All(3)).Returns(new List<Insight>());
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);

        List<InsightDTO> returnedInsightsOrg1 = dataService.GetAllOrganisationInsights(1);
        List<InsightDTO>  returnedInsightsOrg2 = dataService.GetAllOrganisationInsights(2);
        List<InsightDTO>  returnedInsightsOrg3 = dataService.GetAllOrganisationInsights(3);
        
        // Assert Organisation 1
        Assert.True(returnedInsightsOrg1.Count == 3);
        Assert.True(returnedInsightsOrg1[1].Text == "insight_text_2" & returnedInsightsOrg1[1].Type == "type_2");
  
        // Assert Organisation 2
        Assert.True(returnedInsightsOrg2.Count == 2);
        Assert.True(returnedInsightsOrg2[1].Text == "insight_text_5" & returnedInsightsOrg2[1].Type == "type_5");

        // Assert Organisation 3
        Assert.True(returnedInsightsOrg3.Count == 0);
    }
    
    [Fact]
    public void DataService_GetAllInsights() {
        
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        Organisation organisationMock2 = new Organisation() {Id = 2, Name = "Smith&Co_2", FacilityName = "Workshop_2", Logo = "img.png"};
        Organisation organisationMock3 = new Organisation() {Id = 3, Name = "Smith&Co_3", FacilityName = "Workshop_3", Logo = "img.png"};
        List<Insight> insightListMock1 = new List<Insight>() {
            new Insight() { Id = 1, Organisation = organisationMock1, Type = "type_1", Text = "insight_text_1" },
            new Insight() { Id = 2, Organisation = organisationMock1, Type = "type_2", Text = "insight_text_2" },
            new Insight() { Id = 3, Organisation = organisationMock1, Type = "type_3", Text = "insight_text_3" },
        };
        List<Insight> insightListMock2 = new List<Insight>() {
            new Insight() { Id = 4, Organisation = organisationMock2, Type = "type_4", Text = "insight_text_4" },
            new Insight() { Id = 5, Organisation = organisationMock2, Type = "type_5", Text = "insight_text_5" }
        };

        this.MockInsights.Setup(p => p.All(1)).Returns(insightListMock1);
        this.MockInsights.Setup(p => p.All(2)).Returns(insightListMock2);
        this.MockInsights.Setup(p => p.All(3)).Returns(new List<Insight>());

        this.MockOrganisations.Setup(p => p.ToList()).Returns(new List<Organisation>
            { organisationMock1, organisationMock2, organisationMock3 });
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);

        Dictionary<int, List<InsightDTO>> returnedInsights = dataService.GetAllInsights();
        
        // Assert
        Assert.True(returnedInsights.Count == 3);
        
        // Assert Organisation 1
        Assert.True(returnedInsights.ContainsKey(1));
        Assert.True(returnedInsights[1].Count == 3);
        Assert.True(returnedInsights[1][1].Text == "insight_text_2" & returnedInsights[1][1].Type == "type_2");
  
        // Assert Organisation 2
        Assert.True(returnedInsights.ContainsKey(2));
        Assert.True(returnedInsights[2].Count == 2);
        Assert.True(returnedInsights[2][1].Text == "insight_text_5" & returnedInsights[2][1].Type == "type_5");

        // Assert Organisation 3
        Assert.True(returnedInsights.ContainsKey(3));
        Assert.True(returnedInsights[3].Count == 0);
        
        // Assert Invalid Organisation 4
        Assert.False(returnedInsights.ContainsKey(4));
    }

    [Fact]
    public void DataService_GetTopInsight() {
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        Organisation organisationMock2 = new Organisation() {Id = 2, Name = "Smith&Co_2", FacilityName = "Workshop_2", Logo = "img.png"};

        List<Insight> insightListMock1 = new List<Insight>() {
            new Insight() { Id = 1, Organisation = organisationMock1, Type = "type_1", Text = "insight_text_1" },
            new Insight() { Id = 2, Organisation = organisationMock1, Type = "type_1", Text = "insight_text_2" },
            new Insight() { Id = 3, Organisation = organisationMock1, Type = "type_1", Text = "insight_text_3" },
        };
        List<Insight> insightListMock2 = new List<Insight>() {
            new Insight() { Id = 4, Organisation = organisationMock2, Type = "type_2", Text = "insight_text_4" },
        };

        this.MockInsights.Setup(p => p.ByType("type_1", 1)).Returns(insightListMock1);
        this.MockInsights.Setup(p => p.ByType("type_1", 2)).Returns(insightListMock2);
        this.MockInsights.Setup(p => p.ByType("type_1", 3)).Returns(new List<Insight>());

        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);
        
        InsightDTO? returnedInsights1 = dataService.GetTopInsight("type_1", 1);
        InsightDTO? returnedInsights2 = dataService.GetTopInsight("type_1", 2);
        InsightDTO? returnedInsights3 = dataService.GetTopInsight("type_1", 3);
        InsightDTO? returnedInsights4 = dataService.GetTopInsight("type_1", 4);
        
        // Assert Organisation 1
        Assert.True(returnedInsights1 != null);
        Assert.True(returnedInsights1.Type == "type_1");
        Assert.True(returnedInsights1.Text == "insight_text_1");
        
        // Assert Organisation 2
        Assert.True(returnedInsights2 != null);
        Assert.True(returnedInsights2.Type == "type_2");
        Assert.True(returnedInsights2.Text == "insight_text_4");
        
        // Assert Organisation 3
        Assert.True(returnedInsights3 == null);
        
        // Assert Invalid Organisation 4
        Assert.True(returnedInsights4 == null);
    }

    [Fact]
    public void DataService_GetTopFlow() {
        
        // Mock Set Up
        Organisation organisationMock1 = new Organisation() {Id = 1, Name = "Smith&Co_1", FacilityName = "Workshop_1", Logo = "img.png"};
        List<PowerData> powerDataListMock = new List<PowerData>() {
            new PowerData() {
                Id = 1, Date = DateTime.Now.Subtract(TimeSpan.FromHours(1)), Organisation = organisationMock1,
                CHP1ElectricityGen = 10, CHP2ElectricityGen = 10, CHP1HeatGen = 10, CHP2HeatGen = 10,
                BoilerHeat = 10, FeelsLike = 10, WindSpeed = 10, SiteElectricityDemand = 10, DayPowerPrice = 10,
                SiteHeatDemand = 10, ImportElectricity = 10, ExportElectricity = 10
            },
            new PowerData() {
                Id = 2, Date = DateTime.Now.Subtract(TimeSpan.FromHours(2)), Organisation = organisationMock1,
                CHP1ElectricityGen = 20, CHP2ElectricityGen = 20, CHP1HeatGen = 20, CHP2HeatGen = 20,
                BoilerHeat = 20, FeelsLike = 20, WindSpeed = 20, SiteElectricityDemand = 20, DayPowerPrice = 20,
                SiteHeatDemand = 20, ImportElectricity = 20, ExportElectricity = 20
            }
        };

        this.MockPowerDatas.Setup(p => p.All(1)).Returns(powerDataListMock);
        this.MockPowerDatas.Setup(p => p.All(2)).Returns(new List<PowerData>());
        
        // Action
        DataService dataService = new DataService(MockPowerDatas.Object, MockInsights.Object, MockOrganisations.Object);

        FlowDTO? returnedFlowDto1 = dataService.GetTopFlow(1);
        FlowDTO? returnedFlowDto2 = dataService.GetTopFlow(2);
        
        // Assert Organisation 1
        Assert.True(returnedFlowDto1 != null);
        Assert.True(returnedFlowDto1.Demand == 10);
        
        // Assert Invalid Organisation 2
        Assert.True(returnedFlowDto2 == null);
    }
}