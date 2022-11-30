import React, {useEffect, useState} from 'react'

import axios from "axios";
import {Area, CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Legend, Line} from "recharts";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {TextField} from "@mui/material";
import dayjs from 'dayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function LoadLineGraph(dataType, date1, date2) {
    const [data, setData] = useState([]);

    function getList() {
        dataType = "windSpeed"
        date1 = encodeURIComponent(time1.format())
        date2 = encodeURIComponent(time2.format())
        return api.get("/data/byDate?dataType=" + dataType + "&date1=" + date1 + "&date2=" + date2) //2020-12-31T17%3A00%3A00
            .then(data => data.data);
    }

    function loadList(){
        let mounted = true;
        getList()
            .then(items => {
                if (mounted) {
                    setData(items)
                }
            })
        return () => mounted = false;
    }

    useEffect(() => {
        loadList()
    }, [])

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));


    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"row", gap:"100px", justifyContent:"space-between"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start date & time"
                    value={time1}
                    ampm={false}
                    views={["month", "day", "hours", "minutes"]}
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    onChange={(value) => {
                        handleChange1(value);
                        loadList();
                }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                    label="End date & time"
                    value={time2}
                    ampm={false}
                    views={["month", "day", "hours", "minutes"]}
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    onChange={(value) => {
                        handleChange2(value);
                        loadList();
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
            <LineChart width={1000} height={250} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="xAxis"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="yAxis" stroke="#8884d8" dot={false}/>
            </LineChart>
        </div>
    )
}