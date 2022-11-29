import React, {useEffect, useState} from 'react'

import axios from "axios";
import {Area, CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Legend, Line} from "recharts";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function LoadGraph() {
    const [data, setData] = useState([]);

    function getList(){
        return api.get("/").then(data => data.data);
    }

    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                if(mounted) {
                    setData(items)
                }
            })
        return () => mounted = false;
    }, [])

    console.log(data);

    return(
        <LineChart width={1000} height={250} data={data}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xAxis" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="yAxis" stroke="#8884d8" dot={false}/>
        </LineChart>
    )
}