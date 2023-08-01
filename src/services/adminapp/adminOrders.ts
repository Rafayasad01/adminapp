import network from '../../utils/network';
import { ORDER_PREFIX } from '../../utils/constants';

const getListService = (tenant: string, page: number, size: number) => {
    return network.get(`${ORDER_PREFIX}/list/${tenant}/${page}/${size}`);
}
const searchService = (tenant: string, search: string, page: number, size: number) => {
    return network.get(`${ORDER_PREFIX}/list/${tenant}/${search}/${page}/${size}`);
}

const viewService = (id: string) => {
    return network.get(`${ORDER_PREFIX}/view/${id}`);
}

const createStatusesService = (data: any) => {
    return network.post(`${ORDER_PREFIX}/statuses/create`, data);
}
const createAppOrderDelivery = (data: any) => {
    return network.post(`${ORDER_PREFIX}/delivery/create`, data);
}


export default {
    getListService,
    searchService,
    viewService,
    createStatusesService,
    createAppOrderDelivery
}