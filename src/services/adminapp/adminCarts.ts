import { CART_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${CART_PREFIX}/list/${tenant}/${page}/${size}`);
};
const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${CART_PREFIX}/list/${tenant}/${search}/${page}/${size}`);
};

const viewService = (id: string) => {
  return network.get(`${CART_PREFIX}/view/${id}`);
};

export default {
  getListService,
  searchService,
  viewService,
};
