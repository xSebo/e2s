import axios from 'axios'
import {redirect, useNavigate} from "react-router-dom";

export const BASE_URL = process.env.REACT_APP_API_URL

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    return {
        fetch: () => axios.get(url)
    }
}

axios.interceptors.response.use(response => {
    return response;
},error => {
    if (error.response.status === 401) {
        return redirect("/error");
    }
    return error;
});