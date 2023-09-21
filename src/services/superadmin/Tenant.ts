import network from '../../utils/network';
import { TENANT_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/list/${page}/${size}`);
};
const searchService = (search: string, page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/list/${search}/${page}/${size}`);
};

const create = (data: any) => {
  return network.post(`${TENANT_PREFIX}/insert`, data);
};

const detail = (id: any) => {
  return network.get(`${TENANT_PREFIX}/detail/${id}`);
};

const detailSetting = (id: any) => {
  return network.get(`${TENANT_PREFIX}/detail/setting/${id}`);
};
const detailUser = (id: any) => {
  return network.get(`${TENANT_PREFIX}/detail/user/${id}`);
};
const detailCategory = (id: any) => {
  return network.get(`${TENANT_PREFIX}/detail/category/${id}`);
};
const get = (id: any) => {
  return network.get(`${TENANT_PREFIX}/get/${id}`);
};

export default {
  getListService,
  create,
  searchService,
  detail,
  detailSetting,
  detailUser,
  detailCategory,
  get,
};
