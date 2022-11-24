import React from 'react'
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
import Center from "./Center";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useForm from "../hooks/useForm";
import {createAPIEndpoint} from "../api";
import logo from '../logo.png';
import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://localhost:7215',
    withCredentials: true
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
        let loginForm = {
            "email":adValues.email,
            "password":adValues.password
        }

        let config = {
            headers: {
                'Access-Control-Allow-Origin': 'https://localhost:7215',
                'Access-Control-Allow-Credentials' : 'true'
            }
        }
        let token = {
            headers: {
                'Access-Control-Allow-Origin': 'https://localhost:7215',
                'Access-Control-Allow-Credentials' : 'true',
                'Authorization' : "bearer "
            }
        }
        function getCookie(name)
        {
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

        api.post('/authenticate/create', loginForm, config
        ).then(res => {
            api.get('/', {headers:{'Authorization' : "bearer " + getCookie("jwTtoken")}}
            ).then(res => {console.log(res.data)}).catch(function (error) {
                console.log(error);
                console.log(getCookie("jwTtoken"))
                console.log("sam")
            });



            }).catch(function (error) {
            console.log(error);
            unauthorised()
        });

        // api.get('/').then(res => {console.log(res.data)})


        e.preventDefault();
        if (validate())
        console.log(adValues);


        // createAPIEndpoint("/api/peeps")
        // console.log(createAPIEndpoint("api/peeps"))
    }

    const validate = ()=> {
        let temp ={}
        temp.email = (/\S+@\S+\.\S+/).test(adValues.email)?"":"Email is not vaild."
        setErrors(temp)
        return Object.values(temp).every(x=> x== "")
    }

    const unauthorised = ()=> {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(adValues.email)?"":"Email is not vaild."
        temp.password = "Password does not match with this email."
        setErrors(temp)
        return Object.values(temp).every(x=> x== "")
    }
//////////////////

    const [adValues, setAdValues] = React.useState({
        amount: '',
        email: '',
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
                                value={adValues.email}
                                onChange={handleChange('email')}
                                variant="outlined"
                                {...(errors.email && {error:true, helperText:errors.email})}
                            />
                            {/*<TextField*/}
                            {/*    label="Password"*/}
                            {/*    name="password"*/}
                            {/*    value={values.password}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*    variant="outlined"*/}
                            {/*    {...(errors.password && {error:true, helperText:errors.password})}*/}
                            {/*/>*/}
                            <div>
                                <FormControl sx={{ m: 1, width: '36ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={adValues.showPassword ? 'text' : 'password'}
                                        value={adValues.password}
                                        onChange={handleChange('password')}
                                        {...(errors.password && {error:true, helperText:errors.password})}
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
                                    <FormHelperText {...(errors.password && {error:true})}>{errors.password}</FormHelperText>
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

