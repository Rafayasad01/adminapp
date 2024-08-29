import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PRODUCTS_PREFIX = 'products';

// projects
const getListProductService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/list/${tenant}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const create = (data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/create`, data);
};

export default {
  getListProductService,
  create,
};
