import React, {useEffect, useState} from 'react'

import TwoTimeSelector from "./TwoTimeSelector";

import axios from "axios";
import {
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    LineChart,
    Legend,
    Line,
    BarChart,
    Bar,
    Label,
    ResponsiveContainer, Sankey
} from "recharts";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Card, CardContent, TextField, Typography} from "@mui/material";
import dayjs from 'dayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ApiConnector from "../services/ApiConnector";
import DemoSankeyNode from "./DemoSankeyNode";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function EnergyFlowGraph(props) {
    function getFlow() {
        const apiConnector = new ApiConnector();
        return apiConnector.getSankeyData();
    }


    function loadFlow() {
        let mounted = true;
        getFlow()
            .then(result => {
                if (mounted) {
                    let dateTimeString = result.date.toString()
                    setDate(dateTimeString.split('T')[0])
                    setTime(dateTimeString.split('T')[1])

                    console.log("sup")
                    console.log(result)
                    let dataTemp
                    if (result.import > 0) {
                        dataTemp = {
                            "nodes": [
                                {
                                    "name": "CHP1ElectricityGen"
                                },
                                {
                                    "name": "CHP2ElectricityGen"
                                },
                                {
                                    "name": "ImportElectricity"
                                },
                                {
                                    "name": "SiteElectricityDemand"
                                }
                            ],
                            "links": [
                                 result.chp1Gen > 0 ?
                                     {"source": 0,
                                    "target": 3,
                                    "value": result.chp1Gen
                                }
                                :
                                     {"source": 0,
                                         "target": 0,
                                         "value": 0
                                     }
                                ,
                                result.chp2Gen > 0 ?
                                    {"source": 1,
                                        "target": 3,
                                        "value": result.chp2Gen
                                    }
                                    :
                                    {"source": 0,
                                        "target": 0,
                                        "value": 0
                                    },
                                result.import > 0 ?
                                    {"source": 2,
                                        "target": 3,
                                        "value": result.import
                                    }
                                    :
                                    {"source": 0,
                                        "target": 0,
                                        "value": 0
                                    }
                            ]
                        };
                        console.log(dataTemp)
                        setData3(dataTemp);
                    }
                    if (result.export > 0) {
                        dataTemp = {
                            "nodes": [
                                {
                                    "name": "CHP1ElectricityGen"
                                },
                                {
                                    "name": "CHP2ElectricityGen"
                                },
                                {
                                    "name": "ExportElectricity"
                                },
                                {
                                    "name": "SiteElectricityDemand"
                                }
                            ],
                            "links": [
                                result.chp1Gen > 0 ?
                                    {"source": 0,
                                        "target": 3,
                                        "value": result.chp1Gen
                                    }
                                    :
                                    {"source": 0,
                                        "target": 0,
                                        "value": 0
                                    }
                                ,
                                result.chp2Gen > 0 ?
                                    {"source": 1,
                                        "target": 3,
                                        "value": result.chp2Gen
                                    }
                                    :
                                    {"source": 0,
                                        "target": 0,
                                        "value": 0
                                    },
                                {"source": 3,
                                    "target": 2,
                                    "value": result.export
                                }
                            ]
                        };
                        console.log(dataTemp)
                        setData3(dataTemp);
                    }
                    // if (props.graphType == "bar") {
                    //     dataTemp = <CustBarChart data={result} xTitle={props.xTitle} yTitle={props.yTitle}/>
                    //     setData3(dataTemp);
                    // }
                }
            })
        console.log("woof")
        console.log(data1)
        return () => mounted = false;
    }

    const [sankey, setSankey] = useState();
    const [data3, setData3] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    useEffect(() => {
        loadFlow();
    }, []);

    const data0 = {
        "nodes": [
            {
                "name": "Visit"
            },
            {
                "name": "Direct-Favourite"
            },
            {
                "name": "Page-Click"
            },
            {
                "name": "Detail-Favourite"
            },
            {
                "name": "Lost"
            }
        ],
        "links": [
            {
                "source": 0,
                "target": 1,
                "value": 3728.3
            },
            {
                "source": 0,
                "target": 2,
                "value": 354170
            },
            {
                "source": 2,
                "target": 3,
                "value": 62429
            },
            {
                "source": 2,
                "target": 4,
                "value": 291741
            }
        ]
    };

    const data1 = {
        "nodes": [
            {
                "name": "CHP1ElectricityGen"
            },
            {
                "name": "CHP2ElectricityGen"
            },
            {
                "name": "ImportElectricity"
            },
            {
                "name": "SiteElectricityDemand"
            }
        ],
        "links": [
            {
                "source": 0,
                "target": 3,
                "value": 79.5312
            },
            {
                "source": 1,
                "target": 3,
                "value": 1490.47
            },
            {
                "source": 2,
                "target": 3,
                "value": 821.893
            }
        ]
    };

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };


    if (data3 == null) {
        return null;
    }
    else {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "80%"}}>
                <div style={shadows}>
                    <Card sx={{padding: 1}}>
                        <CardContent sx={{}}>
                            <div> {date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{time}
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                maxWidth: "80%"
                            }}>
                                {}
                                <Sankey

                                    width={960}
                                    height={500}
                                    data={data3}
                                    node={<DemoSankeyNode containerWidth={960}/>}
                                    nodePadding={50}
                                    margin={{
                                        left: 200,
                                        right: 200,
                                        top: 100,
                                        bottom: 100,
                                    }}
                                    link={{stroke: '#77c878'}}
                                >
                                    <Tooltip/>
                                </Sankey>
                            </div>
                            <div>
                                This graph represents the flow of energy in this facility over the last half-hour. This data was captured on {date} at {time}.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        )
    }
}
// function formatData(data) {
//     let finalData = [];
//     for (let i = 0; i < data.length; i++) {
//         let tempJson = {};
//         tempJson["date"] = data[i].xAxis
//         for (const [k, v] of Object.entries(data[i].yAxis)) {
//             tempJson[k] = v;
//         }
//         finalData.push(tempJson)
//     }
//     return finalData;
// }
