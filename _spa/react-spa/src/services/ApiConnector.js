import axios from 'axios'

// A service to handle all requests to and from the API
export default class ApiConnector {
    ////////////////
    // Constructors
    ////////////////
    constructor() {
        // Getting the http address of the API from environment variables
        this.apiAddress = process.env.REACT_APP_API_URL

        this.jwtTokenName = "jwTtoken"

        // Look up dictionary for the API's data types
        this.insightDataTypes = {
            "Costs": "costs",
            "Energy Imported": "energy-imported",
            "Energy Exported": "energy-exported",
            "Emissions": "co2-emissions"
        };
    }

    ////////////////
    // Internal Methods
    ////////////////
    constructUrl(path) {
        return this.apiAddress + "/" + path + "/"
    }

    getCookie(name) {
        // var re = new RegExp(name + "=([^;]+)");
        // var value = re.exec(document.cookie);
        return window.localStorage.getItem(this.jwtTokenName);
        // return (value != null) ? unescape(value[1]) : null;
    }

    getJwtToken() {
        return this.getCookie(this.jwtTokenName)
    }

    saveJwtToken(token) {
        window.localStorage.setItem(this.jwtTokenName, token)
    }


    ////////////////
    // Endpoints
    ////////////////
    // Health Check the API server
    getHealthCheck() {
        const path = "health_check"
        return axios.get(this.constructUrl(path)).then(response => {
            return response.status
        })
    }

    getOrganisations() {
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
        const path = "organisations/listOrganisations"
        const logToken = this.getCookie("jwTtoken",)

        return api.get(this.constructUrl(path),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            })
    }
    getUsers(orgId) {
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
        const path = "organisations/listUsers"
        const logToken = this.getCookie("jwTtoken",)

        return api.get(this.constructUrl(path) + "?orgId=" + orgId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            })
    }

    setOrganisation(row){
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
        console.log(row)
        const path = "organisations/editOrganisation"
        const logToken = this.getCookie("jwTtoken",)
        return api.post(this.constructUrl(path), row,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            })
    }
    setUser(row){
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
        console.log(row)
        const path = "organisations/editUser"
        const logToken = this.getCookie("jwTtoken",)
        return api.post(this.constructUrl(path), row,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            })
    }

    getPowerData(dataType, date1, date2) {
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })

        const path = "data/byDate"
        const logToken = this.getCookie("jwTtoken")
        return api.get(this.constructUrl(path) + "?dataTypes=" + dataType + "&date1=" + date1 + "&date2=" + date2,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            }).then(data => data.data)
    }

    getSankeyData() {
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })

        const path = "data/flow"
        const logToken = this.getCookie("jwTtoken")
        return api.get(this.constructUrl(path),
            {
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken},
                withCredentials: true}).then(data => data.data)
    }

    getInsightData(dataType) {
        const api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })

        const path = "data/insight"
        const logToken = this.getCookie("jwTtoken")
        return api.get(this.constructUrl(path) + "?dataType=" + this.insightDataTypes[dataType],
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + logToken
                },
                withCredentials: true
            }).then(data => data.data)
    }

    getLoggedIn() {
        return this.getJwtToken() != null;
    }

    getUserRole() {
        if (this.getLoggedIn()) {
            return JSON.parse(window.atob(this.getJwtToken().split(".")[1])).role;
        }
        return null;
    }

    getUserDetails() {
        if (this.getLoggedIn()) {
            const tokenDetails = JSON.parse(window.atob(this.getJwtToken().split(".")[1]))
            return {
                "name": tokenDetails.family_name,
                "email": tokenDetails.email
            }
        }
        return null;
    }

    setLoggedOut() {
        // Removes all page cookies
        // https://www.jsdiaries.com/how-to-remove-all-cookies-in-react-js/#:~:text=Using%20native%20DOM%20methods @ 11/12/2022
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.localStorage.removeItem(this.jwtTokenName)
    }
}


////////////////
// Interceptors
////////////////
// HTTP Error Handling
axios.interceptors.response.use(response => {
    let path
    switch (response.status) {
        case 401:
            path = "/unauthorised"
            break
        case 403:
            path = "/forbidden"
            break
        case 408:
            path = "/request-timeout"
            break
        case 418:
            path = "/teapot"
            break
        case 502 || 503 || 504:
            path = "/error"
            break
        default:
            return response
    }
    window.location.href = path

}, error => {
    return error
});


////////////////
// Example Usage
////////////////
const apiConnector = new ApiConnector()

// This performs a health check on the API to see if we can successfully connect to it
apiConnector.getHealthCheck().then(response => {
    // Each API call is ran Asynchronously, therefore we must write code dependent on the API call within the '.then()' method
    // The class will usually only return the data that is relevant and should handle any http errors
    // And since this is JavaScript, you won't easily know what will be returned inside the method >:(
    console.log("API health check finished with response: " + response)
}).catch(error => {
    // We catch any errors Axios may have here, this should be handled by class usually and therefore unnecessary to include
    console.log("API health check failed with error: ")
    console.log(error)
})
