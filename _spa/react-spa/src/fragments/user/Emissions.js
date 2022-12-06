import React from 'react'
import background from "../static/images/background.png";
import Center from "../../components/Center";
import {Card, CardContent} from "@mui/material";
import graph from "../static/images/graph.png"

function Emissions(){

    const sectionStyle = {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`
    };
    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };
    
    return(
        <div className="home" style={sectionStyle}>
            <h1>CO2 Emissions</h1>
            <Center>
                <div style={shadows}>
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
                    </Card>,
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
                    </Card>,
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
            </Center>
        </div>
    );
}

export default Emissions;
