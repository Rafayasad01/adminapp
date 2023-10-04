import network from '../../utils/network';
import { SHOP_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
  return network.get(`${SHOP_PREFIX}/list/${page}/${size}`);
};

export default {
  getListService
};
