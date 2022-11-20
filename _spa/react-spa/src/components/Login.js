import React from 'react'
import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material'
import Center from "./Center";
import useForm from "../hooks/useForm";
import {createAPIEndpoint} from "../api";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7215'
})
const getFreshModel = ()=>({
    password: '',
    email: ''
})
export default function Login() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = e => {
        api.get('/', (req, res) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.send({ "msg": "This has CORS enabled 🎈" })
        }).then(res => {console.log(res.data)})
        // api.get('/').then(res => {console.log(res.data)})
        e.preventDefault();
        if (validate())
        console.log(values);
        // createAPIEndpoint("/api/peeps")
        // console.log(createAPIEndpoint("api/peeps"))
    }

    const validate = ()=> {
        let temp ={}
        temp.email = (/\S+@\S+\.\S+/).test(values.email)?"":"Email is not vaild."
        temp.name = values.name!=""?"":"This field is required."
        setErrors(temp)
        return Object.values(temp).every(x=> x== "")
    }
    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent sx={{textAlign:'center'}}>
                    <Typography variant="h3" sx ={{my:3}}>
                        Log in
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            margin: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && {error:true, helperText:errors.email})}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"/>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{width: '90%'}}>Start</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>

    )
}

