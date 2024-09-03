import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PRODUCTS_PREFIX = 'products';
const VENDORS_PREFIX = 'vendors';

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
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/create`,
    data
  );
};

const update = (id: string, data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/update/${id}`,
    data
  );
};

// vendor
const getVendorLov = () => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDORS_PREFIX}/list/lov`);
};

export default {
  getVendorLov,
  getListProductService,
  create,
  update,
};
