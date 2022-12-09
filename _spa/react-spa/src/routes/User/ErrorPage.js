import React from 'react'
import {useNavigate} from "react-router-dom";

function ErrorPage(props) {

    // Redirect to previous page
    let navigate = useNavigate();
    const goBack = () => navigate(-1);

    // Message that displays under the error code
    let errorCode = props.errorTitle || "Whoops!"
    let errorMessage = props.errorMessage || "Sorry, we've encountered and error, please return to the home page."

    return(
        <div>
            <h1>{errorCode}</h1>
            <h3>{errorMessage}</h3>

            <div className="flexGrow">
                <button onClick={goBack}>Back</button>
            </div>
        </div>
    );
}

export default ErrorPage;