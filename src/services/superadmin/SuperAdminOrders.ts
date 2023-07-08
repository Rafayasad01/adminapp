import network from '../../utils/network';
import { ORDER_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(`${ORDER_PREFIX}/list/${page}/${size}`);
}
const searchService = (search: string, page: number, size: number) => {
    return network.get(`${ORDER_PREFIX}/list/${search}/${page}/${size}`);
}

const viewService = (id: string) => {
    return network.get(`${ORDER_PREFIX}/view/${id}`);
}

const createStatusesService = (data: any) => {
    return network.post(`${ORDER_PREFIX}/statuses/create`, data);
}


export default {
    getListService,
    searchService,
    viewService,
    createStatusesService
}