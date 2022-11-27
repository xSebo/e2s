import React, {useEffect, useState} from 'react';
import background from '../background.png';
import Center from "./Center";
import {
    Card,
    CardContent
} from "@mui/material";

const sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${background})`
};

const shadows = {
    boxShadow: '1px 2px 9px #BFAFB2'
};

const Reports = () => {
    return (
        <div style={sectionStyle}>
            <Center>
                <div style={shadows}>
                <Card style={{flex:1, backgroundColor:'#d7d7d7'}}>
                    <CardContent sx={{textAlign:'center'}}>
                        <h1>Email preferences</h1>
                    </CardContent>
                </Card>
                </div>
            </Center>
        </div>
    )
};

export default Reports;