import axios from 'axios';
import { BASE_SYSTEM_URL, BASE_URL } from './constants';
import { getItem } from './storage';

const token = () => getItem<string>('AUTH_TOKEN');

const post = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const get = (endPoint: string) => {
  return axios.get(`${BASE_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postMultipart = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token(),
    },
  });
};

const getSystemConfig = (endPoint: string) => {
  return axios.get(`${BASE_SYSTEM_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postSystemConfig = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_SYSTEM_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postMultipartSystemConfig = <T = any>(endPoint: string, data: T) => {
  return axios.post(`${BASE_SYSTEM_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token(),
    },
  });
};

const getWithQueryParam = (
  endPoint: string,
  queryParams: Record<string, string> = {}
) => {
  const url = new URL(endPoint, BASE_URL);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return axios.get(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

export default {
  post,
  get,
  postMultipart,
  getSystemConfig,
  postSystemConfig,
  postMultipartSystemConfig,
  getWithQueryParam,
};
