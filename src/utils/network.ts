import axios from 'axios';
import {BASE_URL, token} from "../utils/constants"

const post = (endPoint:string, data:any) => {
    
    return axios.post(BASE_URL+'/'+endPoint, data, {
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

export default {
    post
}