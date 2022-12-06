import React from 'react'
import AdviceCard from "../../components/AdviceCard"

function EnergyExported(){
    return(
        <div className="EnergyExported">
            <h1>Energy Exported</h1>
            <AdviceCard title={"Lorem ipsum"}
                          text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
                          sub={[
                              { sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true},
                              { sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true},
                              { sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true},
                          ]} />
        </div>
    );
}

export default EnergyExported;