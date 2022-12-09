import React, {useEffect, useState} from 'react';
import background from '../../static/images/background.png';
import Center from "../../components/Center";

import {
    Button,
    Card,
    CardContent, Typography
} from "@mui/material";
import {DisabledByDefault} from "@mui/icons-material";

const sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${background})`
};

const shadows = {
    boxShadow: '1px 2px 9px #BFAFB2'
};

const Reports = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const handleChange = () => {
        setIsEnabled(!isEnabled);
    };
    
    function handleClick(event){
        console.log(event)
    }
    
    return (
        <div style={sectionStyle}>
            <Center>
                <div style={shadows}>
                <Card style={{width:"500px", height: "500px", backgroundColor:'#d7d7d7'}}>
                    <CardContent sx={{textAlign:'center'}}>
                        <Typography>
                        <h1>Email preferences</h1>
                        </Typography>
                        
                        <label>
                            <input type="checkbox" checked={isEnabled} onChange={handleChange}/>
                             - I would like to opt-in for emails.<br/>
                        </label><br/>
                        
                        <h3>Emails frequency:</h3><br/>
                        
                        <div onClick={handleClick}>
                        <label>
                            <input type="checkbox" disabled={!isEnabled} id="Weekly"/>
                            Weekly<br/>
                        </label><br/>

                        <label>
                            <input type="checkbox" disabled={!isEnabled} id="Monthly"/>
                            Monthly<br/>
                        </label><br/>

                        <label>
                            <input type="checkbox" disabled={!isEnabled} id="Annually"/>
                            Annually<br/>
                        </label><br/><br/><br/><br/>
                        
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{width: '50%'}}>Save
                        </Button>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </Center>
        </div>
    )
};

export default Reports;