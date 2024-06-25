/* eslint-disable import/no-cycle */
import axios from 'axios';
import { setLogo, setRemoveItemState } from '../redux/features/appSlice';
import { logout } from '../redux/features/authSlice';
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

const pendingRequests = new Map(); // Map to store pending requests (URL as key, AbortController as value)
// const axiosInstance = axios.create({
//   // ... other Axios configuration options
// });
// Request interceptor to cancel duplicate requests

function isDuplicateRequest(newData: any, oldData: any) {
  // Implement your logic to compare request data objects for equality (e.g., deep comparison)
  // This example assumes simple data types:
  if (newData === oldData) {
    return true;
  }
  return false;
}
networkInstance.interceptors.request.use(
  (config) => {
    const url = config.url; // Extract the URL from the request config
    if (pendingRequests.has(url)) {
      const previousController = pendingRequests.get(url); // Get the AbortController for the pending request
      // Check if the request data is also identical (if applicable)
      if (isDuplicateRequest(config.data, previousController.data)) {
        // Replace `isDuplicateRequest` with your custom logic
        previousController.abort(); // Cancel the previous request
      }
    }
    const controller = new AbortController(); // Create a new AbortController for the current request
    config.signal = controller.signal; // Attach the signal to the request config
    pendingRequests.set(url, controller); // Store the AbortController for the current request

    return config;
  },
  (error) => {
    // Handle errors during request configuration
    return Promise.reject(error);
  }
);

networkInstance.interceptors.response.use(
  function onResponse(response) {
    return response;
  },
  function onError(error) {
    if (error.config.signal.aborted) {
      return Promise.reject(new Error('Aborted'));
    }
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
                  RETRY: 'TRUE',
                },
              };
              return networkInstance(newRequest);
            }
            setLogout();
            return Promise.reject(new Error(response.data.message));
          },
          (err) => {
            setLogout();
            return Promise.reject(err);
          }
        );
    }
    if (error.response.status === 403) {
      setLogout();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // setLogout();
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

const patch = <T = any>(endPoint: string, data: T) => {
  return networkInstance.patch(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });
};

const get = <T = any>(endPoint: string, body?: T) => {
  return networkInstance.get(`${BASE_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
    params: body,
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
  patch,
  get,
  postMultipart,
  getSystemConfig,
  postSystemConfig,
  postMultipartSystemConfig,
  getWithQueryParam,
};
