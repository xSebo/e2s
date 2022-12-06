import React from 'react';
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
                    <Typography variant="h4"  sx ={{ fontWeight:'bold'}} >
                    Advice
                    </Typography>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
                <br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>
                </div>
            </div>
        </ResponsiveContainer>
    )
}

export default Advice