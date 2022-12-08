import React, {useState} from 'react';
import Graph from '../../components/Graph';
import AdviceCard from '../../components/AdviceCard';
import {FormControl, InputLabel, MenuItem, Select, Card, CardContent} from "@mui/material";
import {ResponsiveContainer} from "recharts";
import dayjs from "dayjs";
import TwoTimeSelector from "../../components/TwoTimeSelector";
import Multidropdown from "../../components/Multidropdown";

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

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));
    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    const [selected, setSelected] = useState([]);

    const onDropdownChange = (value) => {
        setSelected(value)
    }

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2',
    };
    return (
        <ResponsiveContainer>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", minHeight:"100%"}}>
                <AdviceCard title={"Lorem ipsum"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
                            sub={[{
                                sTitle: "Gas",
                                sText: "£100,000",
                                percent: "40",
                                arrowUp: true,
                                good: true
                            }]}></AdviceCard>
                <br/>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        maxWidth: "100%"
                    }}>
                        <div style={shadows}>
                            <Card sx={{padding: 1}}>
                                <CardContent sx={{}} style={{
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    flexDirection:"column",
                                    minHeight:"100%"}}>
                                    <Multidropdown options={dropDownOptions} handleChange={onDropdownChange}/>
                                    <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2}
                                                     initTime1={time1}
                                                     initTime2={time2}/>
                                    <Graph time1={time1} time2={time2} dataTypes={selected} xTitle={""}
                                           yTitle={""}
                                           graphType={"line"}/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveContainer>
    )
}

export default Costs