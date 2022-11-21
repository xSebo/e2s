import React from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel, IconButton, InputAdornment, InputLabel,
    Link, OutlinedInput,
    TextField,
    Typography
} from '@mui/material'
import Center from "./Center";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useForm from "../hooks/useForm";
import {createAPIEndpoint} from "../api";
import logo from '../logo.png';
import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7215/api/peeps'
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
//////////////////

    const [adValues, setAdValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setAdValues({ ...adValues, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setAdValues({
            ...adValues,
            showPassword: !adValues.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent sx={{textAlign:'center'}}>
                    <div>
                        <img src={logo} alt="E2S logo"/>
                    </div>
                    <Typography variant="h4"  sx ={{my:3, fontWeight:'bold'}} >
                        Sign in
                    </Typography>
                    <Typography  sx ={{my:3}}>
                        Log in to see your organisation's statistics.
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
                            {/*<TextField*/}
                            {/*    label="Password"*/}
                            {/*    name="password"*/}
                            {/*    value={values.password}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*    variant="outlined"/>*/}
                            <div>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={adValues.showPassword ? 'text' : 'password'}
                                        value={adValues.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {adValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControlLabel control={<Checkbox defaultChecked={false} size={"small"} />}
                                                  label={<Typography variant="caption">Remember Me</Typography>} sx={{mr:10}}/>
                                <Link href="#" sx ={{my:3, fontSize:12}}>Forgot your password?</Link>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{width: '90%'}}>Sign In</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>

    )
}

