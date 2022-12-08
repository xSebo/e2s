import React, {useEffect, useState} from 'react';
import Multidropdown from "../../components/Multidropdown";
import dayjs from "dayjs";
import TwoTimeSelector from "../../components/TwoTimeSelector";
import {Button, Card, CardContent, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import Graph from "../../components/Graph";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

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
    const submit = () => {
        let date1 = encodeURIComponent(time1.format())
        let date2 = encodeURIComponent(time2.format())
        return api.get("/data/byDate?dataTypes=" + selected + "&date1=" + date1 + "&date2=" + date2) //2020-12-31T17%3A00%3A00
            .then(data => data.data);
    }

    function formatData(data) {
        let finalData = [];
        for (let i = 0; i < data.length; i++) {
            let tempJson = {};
            tempJson["date"] = data[i].xAxis
            for (const [k, v] of Object.entries(data[i].yAxis)) {
                tempJson[k] = v;
            }
            finalData.push(tempJson)
        }
        return finalData;
    }

    async function loadData() {
        var json = formatData(await submit());
        var fields = Object.keys(json[0])
        var replacer = function (key, value) {
            return value === null ? '' : value
        }
        var csv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })
        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');
        console.log(csv)

        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "results.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));

    const [selected, setSelected] = useState([]);

    const [fileType, setFileType] = useState(".csv");

    const onDropdownChange = (value) => {
        setSelected(value)
    }

    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        margin:"auto"
    };

    const handleFileType = (newValue) => {
        setFileType(newValue)
    }

    return (
        <div style={shadows}>
            <Card style={{display:"flex", width:"90%", height:"90%",alignItems: "center", justifyContent: "center"}} sx={{padding: 1}}>
                <CardContent sx={{}} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1%", height: "100%", width: "100%"}}>
                    <h1>Export</h1>
                        <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1}
                                         initTime2={time2}/>
                        <Multidropdown options={dropDownOptions} handleChange={onDropdownChange}/>
                        <div id="preview" style={{width:"100%", height:"100%"}}>
                            <Graph time1={time1} time2={time2} dataTypes={selected} xTitle={""} yTitle={""}
                                   graphType={"line"}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Button variant="contained" onClick={() => loadData()}>Download</Button>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fileType}
                                label="File Type"
                                onChange={handleFileType}
                            >
                                <MenuItem value={".csv"}>.csv</MenuItem>
                            </Select>
                        </div>
                </CardContent>
            </Card>
        </div>
)
}
export default Export;