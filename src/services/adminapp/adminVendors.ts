import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const VENDOR_PREFIX = 'vendors';
const VENDOR_TYPES_PREFIX = 'vendor-types';

// Vendor
const getVendorService = (data: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/list`, data);
};

const getVendorLovService = (data?: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDOR_PREFIX}/list/lov`, data);
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

// Vendor Types
const getVendorTypeService = (data: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/list`, data);
};

const getVendorTypeLovService = (data?: object) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/list/lov`,
    data
  );
};

const createVendorTypeService = (data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/create`,
    data
  );
};

const updateVendorTypeService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/update/${id}`,
    data
  );
};

const updateStatusVendorTypeService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/update/status/${id}`,
    data
  );
};

const deleteStatusVendorTypeService = (data: { id: string }) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${VENDOR_TYPES_PREFIX}/delete`,
    data
  );
};

export default {
  getVendorService,
  getVendorLovService,
  createVendorService,
  updateVendorService,
  updateStatusVendorTypeService,
  deleteStatusVendorService,
  deleteStatusVendorTypeService,
  getVendorTypeService,
  getVendorTypeLovService,
  createVendorTypeService,
  updateVendorTypeService,
};
