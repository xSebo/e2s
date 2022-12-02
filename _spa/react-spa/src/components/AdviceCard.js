import React, {useEffect, useState} from 'react'

import axios from "axios";
import dayjs from 'dayjs';
import {Card, CardContent, Divider, Typography} from "@mui/material"
import shadows from "@mui/material/styles/shadows";

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
        { firstName: "Jane", lastName: "Smith" },
        { firstName: "Alex", lastName: "Jones" },
        { firstName: "May", lastName: "Wong" }
    ];

    const Person = ({ firstName, lastName }) => (
        <div>
            {firstName} {lastName}
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

            <div>
                {persons.map((p, i) => (
                    <Person {...p} key={i} />
                ))}
            </div>

                <div style={shadows}>
                    <Card sx={{ padding:1}}>
                        <CardContent sx={{}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {/*Left-hand box*/}
                                <div style={{paddingRight: "10px", maxWidth:"50%"}}>
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
                                    <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
                                        <div>
                                            <Typography variant="h6"  sx ={{ fontWeight:'bold'}} >
                                                Lorem Ipsum
                                            </Typography>
                                            <div>
                                                £100,000
                                            </div>
                                        </div>
                                        <div style={{background:"green", marginLeft:"20px", width:"100px"}}>
                                            food
                                        </div>
                                    </div>
                                    <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
                                        <div>
                                            <Typography variant="h6"  sx ={{ fontWeight:'bold'}} >
                                                Lorem Ipsum
                                            </Typography>
                                            <div>
                                                £100,000
                                            </div>
                                        </div>
                                        <div style={{background:"green", marginLeft:"20px", width:"100px"}}>
                                            food
                                        </div>
                                    </div>
                                    <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
                                        <div>
                                            <Typography variant="h6"  sx ={{ fontWeight:'bold'}} >
                                                Lorem Ipsum
                                            </Typography>
                                            <div>
                                                £100,000
                                            </div>
                                        </div>
                                        <div style={{background:"green", marginLeft:"20px", width:"100px"}}>
                                            food
                                        </div>
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