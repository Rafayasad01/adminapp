import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const VENDOR_PREFIX = 'vendors';

// Vendor
const getVendorService = (data: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/list`, data);
};

const createVendorService = (data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/create`, data);
};

const updateVendorService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/update/${id}`,
    data
  );
};

const deleteStatusVendorService = (data: { id: string }) => {
  return network.post(`${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/delete`, data);
};

export default {
  getVendorService,
  createVendorService,
  updateVendorService,
  deleteStatusVendorService,
};
