import React, {useState} from 'react';
import Multidropdown from "../components/Multidropdown";
import dayjs from "dayjs";
import TwoTimeSelector from "../components/TwoTimeSelector";
import {Button, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    responseType: "blob"
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
        return api.get("/data/fileByDate?dataTypes=" + selected + "&date1=" + date1 + "&date2=" + date2 + "&fileType=" + fileType)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'result..csv');
                document.body.appendChild(link);
                link.click();
            });
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

    const handleFileType = (newValue) => {
        setFileType(newValue)
    }

    return (
        <div style={{maxWidth: "50%", display: "flex", alignItems: "center", flexDirection: "column", gap:"5px"}}>
            <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1}
                             initTime2={time2}/>
            <Multidropdown options={dropDownOptions} handleChange={onDropdownChange}/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <Button onClick={() => submit()} variant="contained">Download</Button>
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
        </div>
    )
}
export default Export;