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
    function getList() {
        let dataTypes = ""
        if(props.dataTypes == ""){
            dataTypes = "chp1ElectricityGen"
        }
        else{
            dataTypes = props.dataTypes
        }
        let date1 = encodeURIComponent(time1.format())
        let date2 = encodeURIComponent(time2.format())
        return api.get("/data/byDate?dataTypes=" + dataTypes + "&date1=" + date1 + "&date2=" + date2) //2020-12-31T17%3A00%3A00
            .then(data => data.data);
    }


    useEffect(() => {
        loadList();
    }, [props.dataTypes]);

    function loadList(){
        let mounted = true;
        getList()
            .then(items => {
                if (mounted) {
                    console.log(items)
                    let graphTemp
                    if(props.graphType == "line"){
                        graphTemp = <CustLineChart data={items} xTitle={props.xTitle} yTitle={props.yTitle}/>
                        setGraph(graphTemp);
                    }if(props.graphType == "bar"){
                        graphTemp = <CustBarChart data={items} xTitle={props.xTitle} yTitle={props.yTitle}/>
                        setGraph(graphTemp);
                    }
                }
            })
        return () => mounted = false;
    }

    const [graph,setGraph] = useState();

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
            {props.dataTypes.map((types) => (
                <h3>{types}</h3>
            ))}
            <TwoTimeSelector handleChange1={handleChange1} handleChange2={handleChange2} initTime1={time1} initTime2={time2}/>
            {graph}
        </div>
    )
}

function formatData(data){
    let finalData = [];
    for(let i = 0; i<data.length; i++){
        let tempJson = {};
        console.log(data[i])
        tempJson["date"] = data[i].xAxis
        for(const [k, v] of Object.entries(data[i].yAxis)){
            tempJson[k] = v;
        }
        finalData.push(tempJson)
    }
    return finalData;
}

const genRows = (data) => {
    let lines = [];
    for(let k in data[0]){
        if(k != "date"){
            lines.push(k)
        }
    }
    return lines;
};

function CustLineChart(props) {
    const data = formatData(props.data);
    return(
        <LineChart width={1000} height={250} data={data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" label={{ value: props.xTitle, offset: -5, position: 'insideBottom' }}/>
            <YAxis label={{ value: props.yTitle, angle: -90, offset: 15, position: 'insideLeft' }} />
            <Tooltip/>
            {genRows(data).map((k) => (
                <Line type="monotone" name={k} dataKey={k} stroke="#8884d8" dot={false}/>
            ))}
        </LineChart>
    )
}

function CustBarChart(props){
    const data = formatData(props.data);
    return(
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: props.xTitle, offset: -5, position: 'insideBottom' }}/>
            <YAxis label={{ value: props.yTitle, angle: -90, offset: 15, position: 'insideLeft' }} />
            <Tooltip />
            {genRows(data).map((k) => (
                <Line type="monotone" dataKey={k} stroke="#8884d8" dot={false}/>
            ))}
        </BarChart>
    )
}
