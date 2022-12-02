import React, {useEffect, useState} from 'react'

import TwoTimeSelector from "./TwoTimeSelector";

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

    useEffect(() => {
        loadList()
    }, [props.dataType]);

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
/*
    useEffect(() => {
        loadList()
    }, [props.dataType])

 */

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));

    const handleChange1 = (newValue) => {
        if(newValue != null) {
            setTime1(newValue);
            loadList()
        }
    };
    const handleChange2 = (newValue) => {
        if(newValue != null) {
            setTime2(newValue);
            loadList()
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <h1>{props.dataType}</h1>
            <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1} initTime2={time2}/>
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
