import axios from 'axios'

// A service to handle all requests to and from the API
export default class ApiConnector {
    ////////////////
    // Constructors
    ////////////////
    constructor() {
        // Getting the http address of the API from environment variables
        this.apiAddress = process.env.REACT_APP_API_URL
    }

    ////////////////
    // Internal Methods
    ////////////////
    constructUrl(path) {
        return this.apiAddress + "/" + path + "/"
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

},error => {
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
