import React, {useState} from 'react';
import Graph from '../components/Graph';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Multidropdown from "../components/Multidropdown";
import dayjs from "dayjs";
import TwoTimeSelector from "../components/TwoTimeSelector";

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

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));

    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    const onDropdownChange = (value) => {
        setSelected(value)
    }

    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center", gap:"10px", maxWidth:"50%"}}>
            <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1}
                             initTime2={time2}/>
            <Multidropdown options={dropDownOptions} handleChange={onDropdownChange}/>
            <Graph time1={time1} time2={time2} dataTypes={selected} xTitle={"TestX"} yTitle={"TestY"} graphType={"line"} />
        </div>
    )
}

export default Costs