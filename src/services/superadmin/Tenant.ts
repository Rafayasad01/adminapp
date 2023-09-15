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

export default {
  getListService,
  create,
  searchService,
};
