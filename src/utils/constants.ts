export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
export const BACKOFFICE_PREFIX = 'backofficeUser';
export const PERMISSION_PREFIX = 'permission'
export let token = "";
export const setToken = (data: string) => {
    token = data;
}



