import React, {useEffect, useState} from 'react'

import axios from "axios";
import dayjs from 'dayjs';
import {Card, CardContent, Divider, Typography} from "@mui/material"
import shadows from "@mui/material/styles/shadows";
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function LoadAdviceCard({title, text, sub}) {
    const [data, setData] = useState([]);

    // function getList() {
    //     dataType = "windSpeed"
    //     date1 = encodeURIComponent(time1.format())
    //     date2 = encodeURIComponent(time2.format())
    //     return api.get("/data/byDate?dataType=" + dataType + "&date1=" + date1 + "&date2=" + date2) //2020-12-31T17%3A00%3A00
    //         .then(data => data.data);
    // }
    //
    // function loadList(){
    //     let mounted = true;
    //     getList()
    //         .then(items => {
    //             if (mounted) {
    //                 setData(items)
    //             }
    //         })
    //     return () => mounted = false;
    // }
    //
    // useEffect(() => {
    //     loadList()
    // }, [])

    const persons = [
        { sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true },
        { sTitle: "emissions", sText: "£100,000", percent: "40", arrowUp:false, good:false },
        { sTitle: "lorem ipsum", sText: "£100,000", percent: "40", arrowUp:true, good:true }
    ];

    const Person = ({ sTitle, sText, percent, arrowUp, good }) => (
        <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
            <div style={{width: "120px"}}>
                <Typography variant="h6"  sx ={{ fontWeight:'bold'}} >
                    {sTitle}
                </Typography>
                <div>
                    {sText}
                </div>
            </div>

            <div style={{background: good ? "hsl(140,40%,55%)" : "hsl(0,100%,65%)", marginLeft:"20px", margin:"20px", width:"50px", height:"20px"}}>
                {arrowUp
                    ? <AiOutlineArrowUp/>
                    : <AiOutlineArrowDown/>
                }
                {percent}%
            </div>
        </div>
    );

    const [time1, setTime1] = React.useState(dayjs('2020-01-01T00:00:00'));
    const [time2, setTime2] = React.useState(dayjs('2020-02-01T00:00:00'));


    const handleChange1 = (newValue) => {
        setTime1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
    }

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };
    return (

        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>

                <div style={shadows}>
                    <Card sx={{ padding:1}}>
                        <CardContent sx={{}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {/*Left-hand box*/}
                                <div style={{paddingRight: "10px", maxWidth:"50%", flexGrow: "2"}}>
                                    <Typography variant="h4"  sx ={{ fontWeight:'bold'}} >
                                        {title}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1">
                                        {text}
                                    </Typography>
                                </div>

                                <Divider orientation="vertical" flexItem />

                                {/*Right-hand box*/}
                                <div style={{paddingLeft: "10px"}}>
                                    <div>
                                        {persons.map((p, i) => (
                                            <Person {...p} key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>

            <div style={{display:"flex", flexDirection:"row", gap:"100px", justifyContent:"space-between"}}>

            </div>

        </div>
    )
}