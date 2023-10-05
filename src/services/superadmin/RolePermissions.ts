import network from '../../utils/network';
import { ROLE_PREFIX } from '../../utils/constants';

const PERMISSION_PREFIX = "permission";

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

const getPermissionListService = (page: number, size: number) => {
  return network.get(`${PERMISSION_PREFIX}/parent/list/${page}/${size}`);
}

const getPermissionSearchService = (search: string, page: number, size: number) => {
  return network.get(`${PERMISSION_PREFIX}/parent/list/${search}/${page}/${size}`);
}

const updatePermissionStatus = (id: string, data: any) => {
  return network.post(`${PERMISSION_PREFIX}/parent/update/status/${id}`, data);
};

const getChildPermissionListService = (id: string) => {
  return network.get(`${PERMISSION_PREFIX}/child/list/${id}`);
}

// http://127.0.0.1:3200/api/v1/admin/role/permissions

export default {
  getListService,
  getRolePermissionService,
  create,
  update,
  updateStatus,
  getPermissionById,
  getPermissionListService,
  getPermissionSearchService,
  getChildPermissionListService,
  updatePermissionStatus
};
