//export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
export const BASE_URL = "https://dev.urapptech.com/api/v1/admin/";
export const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
export const BACKOFFICE_PREFIX = 'backofficeUser';
export const PERMISSION_PREFIX = 'permission'
export const ORDER_PREFIX = 'order'

export let token = "";
export const setToken = (data: string) => {
    token = data;
}



