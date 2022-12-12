import React from 'react'
import dayjs from "dayjs";
import {Card, CardContent, Typography} from "@mui/material";
import TwoTimeSelector from "./TwoTimeSelector";
import AdviceCard from "./AdviceCard"
import Graph from "./Graph";
import * as PropTypes from "prop-types";

function DataPage(props){
    const graphDataTypes = {
        "Costs":"dailyCost",
        "Energy Imported":"importElectricity",
        "Energy Exported":"exportElectricity",
        "Emissions":"co2-emissions",
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
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <Typography variant="h1"  sx ={{ fontWeight:400, fontSize:50}} >
                    {props.dataType}
                </Typography>
            </div>
            <AdviceCard ititle={props.dataType}
                        style={{display: "flex", minWidth: "100%"}}
                        sub={props.dataType == "Energy Imported"
                                ?
                                    [
                                        {
                                            sTitle: "Consumption",
                                            sText: "Monthly",
                                            percent: "20",
                                            arrowUp: true,
                                            good: false
                                        }
                                    ]

                                : props.dataType == "Energy Exported"
                                    ?
                                        [
                                            {
                                                sTitle: "Exported",
                                                sText: "5,000 kWh",
                                                percent: "na",
                                                arrowUp: true,
                                                good: true
                                            },
                                            {
                                                sTitle: "Exported",
                                                sText: "£2,000",
                                                percent: "na",
                                                arrowUp: true,
                                                good: true
                                            }
                                        ]
                                    :
                                        [
                                            {
                                                sTitle: "Daily cost",
                                                sText: "£395",
                                                percent: "8",
                                                arrowUp: false,
                                                good: true
                                            },
                                            {
                                                sTitle: "Gas",
                                                sText: "£200",
                                                percent: "6",
                                                arrowUp: false,
                                                good: true
                                            },
                                            {
                                                sTitle: "Imported",
                                                sText: "£195",
                                                percent: "6",
                                                arrowUp: false,
                                                good: true
                                            }
                                        ]
                                    }>

            </AdviceCard>
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
                        <Graph time1={time1} time2={time2} dataTypes={graphDataTypes[props.dataType]} xTitle={""} yTitle={""}
                               graphType={"line"}/>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default DataPage;