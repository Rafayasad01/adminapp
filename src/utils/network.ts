import axios from 'axios';
import { setLogo, setRemoveItemState } from '../redux/features/appStateSlice';
import { logout } from '../redux/features/authStateSlice';
import { setRolePermissions } from '../redux/features/permissionsStateSlice';
import { store } from '../redux/store';
import { BASE_SYSTEM_URL, BASE_URL } from './constants';
import { getItem, setItem } from './storage';

const token = () => getItem<string>('AUTH_TOKEN');
const refreshToken = () => getItem<string>('REFRESH_TOKEN');

const setLogout = () => {
  store.dispatch(logout());
  store.dispatch(setRemoveItemState());
  store.dispatch(setLogo(null));
  store.dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
};

const networkInstance = axios.create();
const refreshInstance = axios.create();

networkInstance.interceptors.response.use(
  function onResponse(response) {
    return response;
  },
  function onError(error) {
    const originalRequest = { ...error.config };
    if (error.response.status === 401) {
      return refreshInstance
        .get(`${BASE_URL}backofficeUser/refresh/token`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: refreshToken(),
          },
        })
        .then(
          (response: any) => {
            if (response.data.success) {
              setItem('AUTH_TOKEN', response.data.data.accessToken);
              setItem('REFRESH_TOKEN', response.data.data.refreshToken);

              const newRequest = {
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: response.data.data.accessToken,
                },
              };
              return networkInstance(newRequest);
            }
            setLogout();
            return Promise.reject(new Error(response.data.message));
          },
          (error) => {
            setLogout();
            return Promise.reject(error);
          }
        );
    } else if (error.response.status === 403) {
      setLogout();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const post = <T = any>(endPoint: string, data: T) => {
  return networkInstance.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const get = (endPoint: string) => {
  return networkInstance.get(`${BASE_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postMultipart = <T = any>(endPoint: string, data: T) => {
  return networkInstance.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token(),
    },
  });
};

const getSystemConfig = (endPoint: string) => {
  return networkInstance.get(`${BASE_SYSTEM_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postSystemConfig = <T = any>(endPoint: string, data: T) => {
  return networkInstance.post(`${BASE_SYSTEM_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const postMultipartSystemConfig = <T = any>(endPoint: string, data: T) => {
  return networkInstance.post(`${BASE_SYSTEM_URL}${endPoint}`, data, {
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
  return networkInstance.get(url.toString(), {
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
