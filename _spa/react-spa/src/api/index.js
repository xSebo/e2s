import axios from 'axios'

export const BASE_URL = process.env.REACT_APP_API_URL

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    return {
        fetch: () => axios.get(url)
    }
}