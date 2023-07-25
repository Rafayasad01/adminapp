import network from '../../utils/network';
import { DRIVER_PREFIX } from '../../utils/constants';

const getListService = (tenant: string, page: number, size: number) => {
    return network.get(`${DRIVER_PREFIX}/list/${tenant}/${page}/${size}`);
}
const searchService = (tenant: string, search: string, page: number, size: number) => {
    return network.get(`${DRIVER_PREFIX}/list/${tenant}/${search}/${page}/${size}`);
}

// const viewService = (id: string) => {
//     return network.get(`${ORDER_PREFIX}/view/${id}`);
// }

// const createStatusesService = (data: any) => {
//     return network.post(`${ORDER_PREFIX}/statuses/create`, data);
// }


export default {
    getListService,
    searchService,
}