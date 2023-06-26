import axios from 'axios';
import { BASE_URL, token } from "../utils/constants"

const post = (endPoint: string, data: any) => {
    return axios.post(`${BASE_URL}${endPoint}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

const get = (endPoint: string, page: number, size: number) => {
    return axios.get(`${BASE_URL}${endPoint}/${page}/${size}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

const getSearch = (endPoint: string, search: string, page: number, size: number) => {
    return axios.get(`${BASE_URL}${endPoint}/${search}/${page}/${size}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

export default {
    post,
    get,
    getSearch
}