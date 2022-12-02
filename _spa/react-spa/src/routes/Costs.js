import React from 'react';
import Graph from '../components/Graph';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Costs = () => {
    const [dataType, setDataType] = React.useState('chp1ElectricityGen');

    const handleChange = (event) => {
        setDataType(event.target.value);
    };

    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center", gap:"10px", maxWidth:"50%"}}>
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
    )
}

export default Costs