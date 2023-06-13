export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL+import.meta.env.VITE_SERVICE_PREFIX;

export let token = "";
export const setToken = (data:string) => {
    token = data;
}



