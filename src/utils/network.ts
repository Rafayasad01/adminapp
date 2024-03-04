import axios from 'axios';
import { setLogo, setRemoveItemState } from '../redux/features/appStateSlice';
import { logout } from '../redux/features/authStateSlice';
import { setRolePermissions } from '../redux/features/permissionsStateSlice';
import { store } from '../redux/store';
import { BASE_SYSTEM_URL, BASE_URL } from './constants';
import { getItem, setItem } from './storage';

const setLogout = () => {
  store.dispatch(logout());
  store.dispatch(setRemoveItemState());
  store.dispatch(setLogo(null));
  store.dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
};

axios.interceptors.response.use(
  function onResponse(response) {
    return response;
  },
  function onError(error) {
    if (error.response.status === 401) {
      if (error.response.data.token) {
        setItem('AUTH_TOKEN', error.response.data.token);
        const originalRequest = { ...error.config };
        const newRequest = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: error.response.data.token,
          },
        };
        return axios(newRequest);
      }
      setLogout();
    } else if (error.response.status === 403) {
      setLogout();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

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
