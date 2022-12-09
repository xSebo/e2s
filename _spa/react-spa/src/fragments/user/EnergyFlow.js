import React from 'react'
import EnergyFlowGraph from '../../components/EnergyFlowGraph';
import {ResponsiveContainer} from "recharts";

function EnergyFlow(){
    return(
        <div className="EnergyFlow">
            <h1>Energy Flow</h1>

            <ResponsiveContainer>
                <div>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <EnergyFlowGraph>
                        </EnergyFlowGraph>
                    </div>
                </div>
            </ResponsiveContainer>
        </div>
    );
}

export default EnergyFlow;