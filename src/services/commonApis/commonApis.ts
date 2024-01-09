import axios from "axios";

export const Countries = () => {
    return axios.get(`https://restcountries.com/v3.1/all?fields=name`);
}