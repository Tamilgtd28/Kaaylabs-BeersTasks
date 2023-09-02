import axios from "axios";


export const getApiHandler = (url) => {

    return axios.get(url)
        .then(response => response)
        .catch(error => error)
}


export const postApiHandler = (url, params) => {

    return axios.post(url, params)
        .then(response => response)
        .catch(error => error)
}