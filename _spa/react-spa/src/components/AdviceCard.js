import axios from "axios";
import {Card, CardContent, Divider, Typography} from "@mui/material"
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export default function LoadAdviceCard({title, text, sub}) {

    // const dummySub = [
    //     { sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true },
    //     { sTitle: "emissions", sText: "£100,000", percent: "40", arrowUp:false, good:false },
    //     { sTitle: "lorem ipsum", sText: "£100,000", percent: "40", arrowUp:true, good:true }
    // ];

    const Sub = ({ sTitle, sText, percent, arrowUp, good }) => (
        <div style={{display: "flex", borderBottomWidth: "1px", borderBottomColor: "grey", borderBottomStyle: "solid"}}>
            <div style={{width: "120px"}}>
                <Typography variant="h6"  sx ={{ fontWeight:'bold'}} >
                    {sTitle}
                </Typography>
                <div>
                    {sText}
                </div>
            </div>
            <div style={{background: good ? "hsl(140,40%,55%)" : "hsl(0,100%,65%)", marginLeft:"20px", margin:"20px", width:"50px", height:"20px"}}>
                {arrowUp
                    ? <AiOutlineArrowUp/>
                    : <AiOutlineArrowDown/>
                }
                {percent}%
            </div>
        </div>
    );

    const shadows = {
        boxShadow: '1px 2px 9px #BFAFB2'
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                <div style={shadows}>
                    <Card sx={{ padding:1}}>
                        <CardContent sx={{}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {/*Left-hand box*/}
                                <div style={{paddingRight: "10px", maxWidth:"50%", flexGrow: "2"}}>
                                    <Typography variant="h4"  sx ={{ fontWeight:'bold'}} >
                                        {title}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1">
                                        {text}
                                    </Typography>
                                </div>
                                {/*Divider*/}
                                <Divider orientation="vertical" flexItem />
                                {/*Right-hand box*/}
                                <div style={{paddingLeft: "10px"}}>
                                    <div>
                                        {sub.map((p, i) => (
                                            <Sub {...p} key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
        </div>
    )
}

// example of calling this component
//<AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} sub={[{ sTitle: "Gas", sText: "£100,000", percent: "40", arrowUp:true, good:true }]}></AdviceCard>