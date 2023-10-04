import network from '../../utils/network';
import { SHOP_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
  return network.get(`${SHOP_PREFIX}/list/${page}/${size}`);
};

const get = (id: any) => {
  return network.get(`${SHOP_PREFIX}/edit/${id}`);
};

const searchService = (searchText: string, page: number, size: number) => {
  return network.get(`${SHOP_PREFIX}/list/${searchText}/${page}/${size}`);
};

const updateStatus = (id: string, data: any) => {
  return network.post(`${SHOP_PREFIX}/update/status/${id}`, data);
};

const update = (id: string, data: any) => {
  return network.post(`${SHOP_PREFIX}/update/${id}`, data);
};

export default {
  getListService,
  get,
  searchService,
  updateStatus,
  update,
};
