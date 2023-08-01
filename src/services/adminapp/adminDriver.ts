import network from '../../utils/network';
import { DRIVER_PREFIX } from '../../utils/constants';

const getListService = (tenant: string, page: number, size: number) => {
    return network.get(`${DRIVER_PREFIX}/list/${tenant}/${page}/${size}`);
}
const searchService = (tenant: string, search: string, page: number, size: number) => {
    return network.get(`${DRIVER_PREFIX}/list/${tenant}/${search}/${page}/${size}`);
}

const create = (data: any) => {
    return network.postMultipart(`${DRIVER_PREFIX}/create`, data);
}

const getService = (id: string) => {
    return network.get(`${DRIVER_PREFIX}/get/${id}`);
}

const updateService = (id: string, data: any) => {
    return network.postMultipart(`${DRIVER_PREFIX}/update/${id}`, data);
}

const updateStatus = (id: string, data: any) => {
    return network.post(`${DRIVER_PREFIX}/update/status/${id}`, data);
}

const deleteService = (id: string, data: any) => {
    return network.post(`${DRIVER_PREFIX}/delete/${id}`, data);
}

export default {
    getListService,
    searchService,
    create,
    getService,
    updateService,
    updateStatus,
    deleteService
}