import React from 'react';
import Graph from '../../components/Graph';
import AdviceCard from '../../components/AdviceCard';
import {FormControl, InputLabel, MenuItem, Select, Card, CardContent, Typography} from "@mui/material";
import {ResponsiveContainer} from "recharts";

const Advice = () => {
    const [dataType, setDataType] = React.useState('chp1ElectricityGen');

    const handleChange = (event) => {
        setDataType(event.target.value);
    };

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };
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