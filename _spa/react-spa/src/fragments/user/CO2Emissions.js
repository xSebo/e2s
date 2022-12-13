import React from 'react'
import background from "../../static/images/background.png";
import Center from "../../components/Center";
import {Card, CardContent, Typography} from "@mui/material";
import graph from "../../static/images/graph.png"
import DataPage from "../../components/DataPage";

function CO2Emissions(){

    const sectionStyle = {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`
    };
    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };

    return(
        <DataPage dataType="Emissions"/>
        /*<div className="CO2Emissions">
            <div className="home" style={sectionStyle}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <Typography variant="h1"  sx ={{ fontWeight:400, fontSize:50}} >
                        CO2 Emissions
                    </Typography>
                </div>
                <br/>
                <Center>
                    <div style={shadows}>
                        <div style={{display:"flex", justifyContent: "space-around"}}>
                            <Card style={{width:"1000px", height: "300px", backgroundColor:'#ffffff'}}>
                                <CardContent>
                                    <img src={graph} alt = "Graph" style={{float:"right"}} />
                                    <h1>Gas Consumption</h1>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/> 
                                        Scelerisque eu ultrices vitae auctor eu. Nibh ipsum consequat nisl vel<br/>
                                        pretium lectus quam. Dui faucibus in ornare quam viverra orci<br/>
                                        sagittis eu volutpat. Donec enim diam vulputate ut pharetra sit amet aliquam id.<br/>
                                        Porta nibh venenatis cras sed felis eget velit.<br/> 
                                        In nulla posuere sollicitudin aliquam ultrices sagittis.
                                    </span>
                                </CardContent>
                            </Card>
                        </div>,
                        <div style={{display:"flex", justifyContent: "space-around"}}>
                            <Card style={{width:"1000px", height: "300px", backgroundColor:'#ffffff'}}>
                                <CardContent>
                                    <img src={graph} alt = "Graph" style={{float:"right"}} />
                                    <h1>Energy Usage</h1>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/> 
                                        Scelerisque eu ultrices vitae auctor eu. Nibh ipsum consequat nisl vel<br/>
                                        pretium lectus quam. Dui faucibus in ornare quam viverra orci<br/>
                                        sagittis eu volutpat. Donec enim diam vulputate ut pharetra sit amet aliquam id.<br/>
                                        Porta nibh venenatis cras sed felis eget velit.<br/> 
                                        In nulla posuere sollicitudin aliquam ultrices sagittis.
                                    </span>
                                </CardContent>
                            </Card>
                        </div>,
                        <div style={{display:"flex", justifyContent: "space-around"}}>
                            <Card style={{width:"1000px", height: "300px", backgroundColor:'#ffffff'}}>
                                <CardContent>
                                    <img src={graph} alt = "Graph" style={{float:"right"}} />
                                    <h1>Energy Distribution</h1>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/> 
                                        Scelerisque eu ultrices vitae auctor eu. Nibh ipsum consequat nisl vel<br/>
                                        pretium lectus quam. Dui faucibus in ornare quam viverra orci<br/>
                                        sagittis eu volutpat. Donec enim diam vulputate ut pharetra sit amet aliquam id.<br/>
                                        Porta nibh venenatis cras sed felis eget velit.<br/> 
                                        In nulla posuere sollicitudin aliquam ultrices sagittis.
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Center>
            </div>
        </div>*/
    );
}

export default CO2Emissions;
