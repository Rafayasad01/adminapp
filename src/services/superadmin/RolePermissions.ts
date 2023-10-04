import network from '../../utils/network';
import { ROLE_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(`${ROLE_PREFIX}/list/${page}/${size}`);
};

const getRolePermissionService = () => {
    return network.get(`${ROLE_PREFIX}/permissions`);
};

const create = (data: any) => {
    return network.post(`${ROLE_PREFIX}/create`, data);
};

const getPermissionById = (id: any) => {
    return network.get(`${ROLE_PREFIX}/permission/${id}`);
};

const update = (id: any, data: any) => {
    return network.post(`${ROLE_PREFIX}/update/${id}`, data);
};

const updateStatus = (id: string, data: any) => {
    return network.post(`${ROLE_PREFIX}/update/status/${id}`, data);
};

// http://127.0.0.1:3200/api/v1/admin/role/permissions

export default {
    getListService,
    getRolePermissionService,
    create,
    update,
    updateStatus,
    getPermissionById
};
