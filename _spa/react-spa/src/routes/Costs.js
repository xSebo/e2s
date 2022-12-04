import React from 'react';
import Graph from '../components/Graph';
import AdviceCard from '../components/AdviceCard';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {ResponsiveContainer} from "recharts";

const Costs = () => {
    const [dataType, setDataType] = React.useState('chp1ElectricityGen');

    const handleChange = (event) => {
        setDataType(event.target.value);
    };

    return(
        <ResponsiveContainer >
            <div>
                <AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>

                <div style={{display:"flex",justifyContent: "space-around"}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center", gap:"5px", maxWidth:"100%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Data</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataType}
                                label="Select"
                                onChange={handleChange}
                            >
                                <MenuItem value={"chp1ElectricityGen"}>chp1ElectricityGen</MenuItem>
                                <MenuItem value={"chp2ElectricityGen"}>chp2ElectricityGen</MenuItem>
                                <MenuItem value={"chp1HeatGen"}>chp1HeatGen</MenuItem>
                                <MenuItem value={"chp2HeatGen"}>chp2HeatGen</MenuItem>
                                <MenuItem value={"boilerHeat"}>boilerHeat</MenuItem>
                                <MenuItem value={"feelsLike"}>feelsLike</MenuItem>
                                <MenuItem value={"windSpeed"}>windSpeed</MenuItem>
                                <MenuItem value={"siteElectricityDemand"}>siteElectricityDemand</MenuItem>
                                <MenuItem value={"dayPowerPrice"}>dayPowerPrice</MenuItem>
                                <MenuItem value={"siteHeatDemand"}>siteHeatDemand</MenuItem>
                                <MenuItem value={"importElectricity"}>importElectricity</MenuItem>
                                <MenuItem value={"exportElectricity"}>exportElectricity</MenuItem>
                            </Select>
                        </FormControl>
                        <Graph dataType={dataType} xTitle={"TestX"} yTitle={"TestY"} graphType={"line"} />
                    </div>

                    <div style={{display:"flex",flexDirection:"column",alignItems:"center", gap:"5px", maxWidth:"100%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Data</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataType}
                                label="Select"
                                onChange={handleChange}
                            >
                                <MenuItem value={"chp1ElectricityGen"}>chp1ElectricityGen</MenuItem>
                                <MenuItem value={"chp2ElectricityGen"}>chp2ElectricityGen</MenuItem>
                                <MenuItem value={"chp1HeatGen"}>chp1HeatGen</MenuItem>
                                <MenuItem value={"chp2HeatGen"}>chp2HeatGen</MenuItem>
                                <MenuItem value={"boilerHeat"}>boilerHeat</MenuItem>
                                <MenuItem value={"feelsLike"}>feelsLike</MenuItem>
                                <MenuItem value={"windSpeed"}>windSpeed</MenuItem>
                                <MenuItem value={"siteElectricityDemand"}>siteElectricityDemand</MenuItem>
                                <MenuItem value={"dayPowerPrice"}>dayPowerPrice</MenuItem>
                                <MenuItem value={"siteHeatDemand"}>siteHeatDemand</MenuItem>
                                <MenuItem value={"importElectricity"}>importElectricity</MenuItem>
                                <MenuItem value={"exportElectricity"}>exportElectricity</MenuItem>
                            </Select>
                        </FormControl>
                        <Graph dataType={dataType} xTitle={"TestX"} yTitle={"TestY"} graphType={"line"} />
                    </div>
                </div>

            </div>





        </ResponsiveContainer>
    )
}

export default Costs