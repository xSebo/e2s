import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import "../static/css/error.css"

function Unauthorised (props) {
    
    let navigate = useNavigate();
    const goBack = () => navigate(-1);

    let errorCode = props.errorTitle || "Sorry!"
    let errorMessage = props.errorMessage || "Sorry, we've encountered and error, please return to the home page."
    let errorDesc = props.errorDesc
    
    return(
        
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>{errorCode}</h1>
                </div>

                <h2>{errorMessage}</h2>
                <h3>{errorDesc}</h3>
                
                <button onClick={goBack}>Go Back </button>
            </div>
        </div>
    );
}

export default Unauthorised;
