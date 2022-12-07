import React from 'react'
import dayjs from "dayjs";
import {Card, CardContent} from "@mui/material";
import TwoTimeSelector from "./TwoTimeSelector";
import AdviceCard from "./AdviceCard"
import Graph from "./Graph";
import * as PropTypes from "prop-types";

function DataPage(props){
    const dataTypes = {
        "Daily Power Price":"dayPowerPrice",
        "Energy Imported":"importElectricity",
        "Energy Exported":"exportElectricity"
};

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));
    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }
    const pageFlex = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "3%"
    };

    return (
        <div style={pageFlex}>
            <h1 style={{fontSize:50, margin:0}}>{props.dataType}</h1>
            <AdviceCard title={"Lorem ipsum"}
                        style={{display: "flex", minWidth: "100%"}}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
                        sub={[{
                            sTitle: "Gas",
                            sText: "£100,000",
                            percent: "40",
                            arrowUp: true,
                            good: true
                        }]}></AdviceCard>
            <Card style={{
                display: "flex",
                width: "79%",
                height: "60%",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: '1px 2px 9px #BFAFB2',
            }}
                  sx={{padding: 1}}>
                <CardContent sx={{}} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    height: "100%",
                    width: "100%",
                    marginTop: "1%"
                }}>
                    <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1}
                                     initTime2={time2}/>
                    <div id="preview" style={{width: "100%", height: "100%"}}>
                        <Graph time1={time1} time2={time2} dataTypes={dataTypes[props.dataType]} xTitle={""} yTitle={""}
                               graphType={"line"}/>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default DataPage;