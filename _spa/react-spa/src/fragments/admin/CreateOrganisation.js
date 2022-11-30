import React, {useState} from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel,
    Link, OutlinedInput,
    TextField,
    Typography
} from '@mui/material'
import Center from "../../components/Center";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import {PhotoCamera} from "@mui/icons-material";

const api = axios.create({
    baseURL: 'https://localhost:7215',
    withCredentials: true
})

export default function CreateOrganisation() {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': 'https://localhost:7215',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'multipart/form-data',
            'Authorization': "bearer " + getCookie("jwTtoken")
        }
    }
    const [changed, setChanged] = useState(false);

    const [emptyField, setEmpty] = useState(false);

    function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }


    function submitForm() {
        if(formData.Name == ""){
            setEmpty(true);
            return;
        }
        console.log(formData.File);
        console.log(formData.Name);
        api.post("/organisations/createOrganisation", formData, config);
    }

    const [formData] = useState({
        Name: "",
        File: null,
    });

    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent sx={{textAlign: 'center'}}>
                    <form noValidate autoComplete="off"
                          style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "100px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
                            <Typography variant="h4" sx={{my: 3, fontWeight: 'bold'}}>
                                Create an organisation
                            </Typography>
                            <TextField
                                error={emptyField ? emptyField : emptyField}
                                id="emailField"
                                style={{width: "100%"}}
                                label="Company name*"
                                name="name"
                                variant={emptyField ? "filled" : "outlined"}
                                color={emptyField ? "error" : "secondary"}
                                helperText={emptyField ? "Company name required" : ""}
                                onChange={(event) => {
                                    formData.Name = event.target.value
                                }}/>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button variant={changed ? "contained" : "outlined"} color={changed ? "success" : "primary"} component="label"
                                        id="submitImageButton">
                                    {changed ? "Success" : "Upload file"}
                                    <input hidden accept="image/png, image/jpeg" type="file"
                                           onChange={(event) => {
                                               console.log(event.target.files[0]);
                                               formData.File = event.target.files[0];
                                               setChanged(true);
                                           }}/>
                                </Button>
                                <IconButton color={changed ? "success" : "primary"} aria-label="upload picture" component="label"
                                            id="submitImageButton">
                                    <input hidden accept="image/png, image/jpeg" type="file"
                                           onChange={(event) => {
                                               console.log(event.target.files[0]);
                                               formData.File = event.target.files[0];
                                           }}/>
                                    <PhotoCamera/>
                                </IconButton>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                submitForm()
                            }}
                            sx={{width: '90%', position: "bottom"}}>Create</Button>
                    </form>
                </CardContent>
            </Card>
        </Center>
    );
}