import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import "../../static/css/error.css"

function ErrorPage(props) {

    // Redirect to previous page
    let navigate = useNavigate();
    const goBack = () => navigate(-1);

    // Message that displays under the error code
    let errorCode = props.errorTitle || "Whoops!"
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
                
                <NavLink to="/">Go Back Home</NavLink> <br/>
            </div>
        </div>
    );
}

export default ErrorPage;