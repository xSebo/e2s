import axios from 'axios'

export const BASE_URL = 'https://localhost:7215/'

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    return {
        fetch: () => axios.get(url)
    }
}