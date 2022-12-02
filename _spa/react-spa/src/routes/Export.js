import React from 'react';
import Multidropdown from "../components/Multidropdown";
import dayjs from "dayjs";
import TwoTimeSelector from "../components/TwoTimeSelector";

const Export = () => {
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

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));

    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    return (
        <div style={{maxWidth:"50%", display:"flex", alignItems:"center", flexDirection:"column"}}>
            <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1} initTime2={time2} />
            <Multidropdown options={dropDownOptions}/>
        </div>
    )
}
export default Export;