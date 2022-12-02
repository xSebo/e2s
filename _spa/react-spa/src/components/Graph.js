import React, {useEffect, useState} from 'react'

import axios from "axios";
import {CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Legend, Line, BarChart, Bar, Label} from "recharts";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {TextField} from "@mui/material";
import dayjs from 'dayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function Graph(props) {
    const [data, setData] = useState([]);

    function getList() {
        let dataType = props.dataType
        let date1 = encodeURIComponent(time1.format())
        let date2 = encodeURIComponent(time2.format())
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
        let graphTemp
        if(props.graphType == "line"){
            graphTemp = <CustLineChart data={data} xTitle={props.xTitle} yTitle={props.yTitle}/>
            setGraph(graphTemp);
        }if(props.graphType == "bar"){
            graphTemp = <CustBarChart data={data} xTitle={props.xTitle} yTitle={props.yTitle}/>
            setGraph(graphTemp);
        }
        return () => mounted = false;
    }

    const [graph,setGraph] = useState();

    useEffect(() => {
        loadList()
    }, [props.dataType])

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
            <h1>{props.dataType}</h1>
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
            {graph}
        </div>
    )
}

function CustLineChart(props) {
    return(
        <LineChart width={1000} height={250} data={props.data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="xAxis" label={{ value: props.xTitle, offset: -5, position: 'insideBottom' }}/>
            <YAxis label={{ value: props.yTitle, angle: -90, offset: 15, position: 'insideLeft' }} />
            <Tooltip/>
            <Line type="monotone" dataKey="yAxis" stroke="#8884d8" dot={false}/>
        </LineChart>
    )
}

function CustBarChart(props){
    return(
        <BarChart width={730} height={250} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xAxis" label={{ value: props.xTitle, offset: -5, position: 'insideBottom' }}/>
            <YAxis label={{ value: props.yTitle, angle: -90, offset: 15, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="yAxis" fill="#8884d8" />
        </BarChart>
    )
}
