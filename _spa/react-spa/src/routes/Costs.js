import React, {useState} from 'react';
import Graph from '../components/Graph';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Multidropdown from "../components/Multidropdown";

const Costs = () => {
    const dropDownOptions = [
        "chp1ElectricityGen",
        "chp2ElectricityGen",
        "chp1HeatGen",
        "chp2HeatGen",
        "boilerHeat",
        "feelsLike",
        "windSpeed",
        "siteElectricityDemand",
        "dayPowerPrice",
        "siteHeatDemand",
        "importElectricity",
        "exportElectricity"
    ];
    const [selected, setSelected] = useState([]);

    const onDropdownChange = (value) => {
        setSelected(value)
    }

    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center", gap:"10px", maxWidth:"50%"}}>
            <Multidropdown options={dropDownOptions} handleChange={onDropdownChange}/>
            <Graph dataTypes={selected} xTitle={"TestX"} yTitle={"TestY"} graphType={"line"} />
        </div>
    )
}

export default Costs