import network from '../../utils/network';

const PERMISSION_PREFIX = 'permission';
const ROLES_PREFIX = 'roles';
const NEW_EARTH_PREFIX = 'new-earth';

const getListService = (page: number, size: number) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/list/${page}/${size}`
  );
};

const roleSearchService = (search: string, page: number, size: number) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/list/${search}/${page}/${size}`
  );
};

const getRolePermissionService = (roleId: string) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/permission/${roleId}`
  );
};

const create = (data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/create`, data);
};

const getRolePermissionById = (id: any) => {
  return network.get(`${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/permission/${id}`);
};

const update = (id: any, data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/update/${id}`, data);
};

const updateStatus = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/update/status/${id}`,
    data
  );
};

const createPermissionService = (data: any) => {
  return network.post(`${PERMISSION_PREFIX}/insert`, data);
};

const updatePermissionService = (id: any, data: any) => {
  return network.post(`${PERMISSION_PREFIX}/update/${id}`, data);
};

const getPermissionListService = (page: number, size: number) => {
  return network.get(`${PERMISSION_PREFIX}/list/${page}/${size}`);
};

const getPermissionById = (id: any) => {
  return network.get(`${PERMISSION_PREFIX}/edit/${id}`);
};

const getPermissionSearchService = (
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${PERMISSION_PREFIX}/list/${search}/${page}/${size}`);
};

const updatePermissionStatus = (id: string, data: any) => {
  return network.post(`${PERMISSION_PREFIX}/update/status/${id}`, data);
};

const getChildPermissionListService = (id: any, page: number, size: number) => {
  return network.get(`${PERMISSION_PREFIX}/child/list/${page}/${size}/${id}`);
};

const getChildSearchPermissionListService = (
  id: any,
  page: number,
  size: number,
  search: string
) => {
  return network.get(
    `${PERMISSION_PREFIX}/child/list/${search}/${page}/${size}/${id}`
  );
};

const childUpdateStatus = (id: string, data: any) => {
  return network.post(`${PERMISSION_PREFIX}/child/update/status/${id}`, data);
};

const getRolesLov = () => {
  return network.get(`${NEW_EARTH_PREFIX}/${ROLES_PREFIX}/list/lov`);
};

// http://127.0.0.1:3200/api/v1/admin/role/permissions

export default {
  getListService,
  getRolePermissionService,
  create,
  update,
  updateStatus,
  createPermissionService,
  updatePermissionService,
  getRolePermissionById,
  getPermissionById,
  getPermissionListService,
  getPermissionSearchService,
  roleSearchService,
  getChildPermissionListService,
  updatePermissionStatus,
  childUpdateStatus,
  getChildSearchPermissionListService,
  getRolesLov,
};
