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

const updateStatus = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/update/status/${id}`,
    data
  );
};

const deleteStatus = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/delete/${id}`,
    data
  );
};

// vendor
const getVendorLov = () => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDORS_PREFIX}/list/lov`);
};

/**
 * Get the level of value for products.
 * @param data object containing information
 * @returns Promise
 */
const getByVendorService = (id: string) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${PRODUCTS_PREFIX}/list/vendor/${id}`
  );
};

export default {
  getVendorLov,
  getByVendorService,
  getListProductService,
  create,
  update,
  updateStatus,
  deleteStatus,
};
