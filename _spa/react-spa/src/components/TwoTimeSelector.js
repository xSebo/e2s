import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {TextField} from "@mui/material";

//props.handleChange1, 2 are the parent methods for how you want to handle the new dates.
const TwoTimeSelector = (props) =>{

    const [time1, setTime1] = React.useState(props.initTime1);
    const [time2, setTime2] = React.useState(props.initTime2);


    const handleChange1 = (newValue) => {
        setTime1(newValue);
        props.handleChange1(newValue);
    };
    const handleChange2 = (newValue) => {
        setTime2(newValue);
        props.handleChange2(newValue);
    }


    return(
        <div style={{display:"flex", flexDirection:"row", gap:"100px", justifyContent:"space-between"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start date & time"
                    value={time1}
                    ampm={false}
                    views={["month", "day", "hours", "minutes"]}
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    onChange={(value) => {
                        handleChange1(value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                    label="End date & time"
                    value={time2}
                    ampm={false}
                    views={["month", "day", "hours", "minutes"]}
                    inputFormat="DD/MM/YYYY HH:mm:ss"
                    onChange={(value) => {
                        handleChange2(value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    )
}
export default TwoTimeSelector;