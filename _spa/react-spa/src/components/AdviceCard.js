import axios from "axios";
import {Card, CardContent, Divider, Typography} from "@mui/material"
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai';
import ApiConnector from "../services/ApiConnector";
import React, {useEffect, useState} from "react";
import {props} from "react-csv/lib/metaProps";
import Advice from "../fragments/user/Advice";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function LoadAdviceCard(props) {

    function getInsight() {
        let dataType = props.ititle
        const apiConnector = new ApiConnector();
        return apiConnector.getInsightData(dataType);
    }

    function loadInsight() {
        let mounted = true;
        getInsight()
            .then(result => {
                if (mounted) {
                    // setInsightType(result.type);
                    setInsightText(result.text);
                }
            })
            .catch(error => {
                if (mounted) {
                    setInsightText("We don't have any insights for you at this time");
                }
            })
        return () => mounted = false;
    }
    const [insightType, setInsightType] = useState();
    const [insightText, setInsightText] = useState();

    useEffect(() => {
        loadInsight();
        setInsightType(props.ititle);
    }, [props.ititle, props.text]);
    

    const Sub = ({ sTitle, sText, percent, arrowUp, good }) => (
        <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
            <div style={{width: "120px"}}>
                <Typography variant="h3"  sx={{ fontWeight:'bold', fontSize:20}}>
                    {sTitle}
                </Typography>
                <p style={{marginTop:0, marginBottom:0}}>
                    {sText}
                </p>
            </div>
            <div style={{background: good ? "hsl(140,40%,55%)" : "hsl(0,100%,65%)", marginLeft:"20px", margin:"15px", width:"50px", height:"20px"}}>
                {arrowUp
                    ? <AiOutlineArrowUp/>
                    : <AiOutlineArrowDown/>
                }
                {percent}%
            </div>
        </div>
    );

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };

    return (

            <div style={{display: "flex", flexDirection: "column", alignItems:"center", maxWidth:"80%"}}>
                <div style={shadows}>
                    <Card sx={{ padding:1}}>
                        <CardContent sx={{}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {/*Left-hand box*/}
                                <div style={{paddingRight: "10px", maxWidth:"50%", flexGrow: "2"}}>
                                    <Typography variant="h2"  sx ={{ fontWeight:'bold', fontSize:32}} >
                                        {insightType}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1">
                                        {insightText}
                                    </Typography>
                                </div>
                                {/*Divider*/}
                                <Divider orientation="vertical" flexItem />
                                {/*Right-hand box*/}
                                <div style={{paddingLeft: "10px"}}>
                                    <div>
                                        {props.sub.map((p, i) => (
                                            <Sub {...p} key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


    )
}

// example of calling this component
//<AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>