import React from 'react'
import EnergyFlowGraph from '../../components/EnergyFlowGraph';
import {ResponsiveContainer} from "recharts";
import {Typography} from "@mui/material";

function EnergyFlow(){
    return(


            <ResponsiveContainer>
                <div>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <Typography variant="h1"  sx ={{ fontWeight:400, fontSize:50}} >
                            Energy Flow
                        </Typography>
                    </div>
                    <br/>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <EnergyFlowGraph>
                        </EnergyFlowGraph>
                    </div>
                </div>
            </ResponsiveContainer>
    );
}

export default EnergyFlow;