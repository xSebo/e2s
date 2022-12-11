﻿import React from 'react';
import AdviceCard from '../../components/AdviceCard';
import {Typography} from "@mui/material";
import {ResponsiveContainer} from "recharts";

const Advice = () => {

    // const handleChange = (event) => {
    // };

    return(
        <ResponsiveContainer >
            <div>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <Typography variant="h1"  sx ={{ fontWeight:400, fontSize:50}} >
                    Advice
                    </Typography>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard ititle={"Costs"}  sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard ititle={"Energy Exported"}  sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard ititle={"Emissions"}  sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
            </div>
        </ResponsiveContainer>
    )
}

export default Advice