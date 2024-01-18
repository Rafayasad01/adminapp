import axios from 'axios';
import { BASE_URL } from './constants';
import { getItem } from './storage';

const token = getItem<string>('AUTH_TOKEN');

const post = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

const get = (endPoint: string) => {
  return axios.get(`${BASE_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

const postMultipart = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  });
};

export default {
  post,
  get,
  postMultipart,
};
