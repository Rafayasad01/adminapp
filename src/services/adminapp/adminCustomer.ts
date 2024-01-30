import { CUSTOMER_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const CUSTOMER_ADDRESS_PREFIX = 'address';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${CUSTOMER_PREFIX}/list/${tenant}/${page}/${size}`);
};

const getDetailService = (id: string) => {
  return network.get(`${CUSTOMER_PREFIX}/detail/${id}`);
};

const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CUSTOMER_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const create = (data: any) => {
  return network.postMultipart(`${CUSTOMER_PREFIX}/create`, data);
};

const getService = (id: string) => {
  return network.get(`${CUSTOMER_PREFIX}/get/${id}`);
};

const updateService = (id: string, data: any) => {
  return network.postMultipart(`${CUSTOMER_PREFIX}/update/${id}`, data);
};

const updateStatus = (id: string, data: any) => {
  return network.post(`${CUSTOMER_PREFIX}/update/status/${id}`, data);
};

const deleteService = (id: string, data: any) => {
  return network.post(`${CUSTOMER_PREFIX}/delete/${id}`, data);
};

const getAddressService = (id: string) => {
  return network.get(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/detail/${id}`
  );
};

const createAddress = (id: string, data: any) => {
  return network.post(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/create/${id}`,
    data
  );
};

const getAddress = (id: string) => {
  return network.get(`${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/get/${id}`);
};
const updateAddress = (id: string, data: any) => {
  return network.post(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/update/${id}`,
    data
  );
};

const getListAddressService = (id: string, page: number, size: number) => {
  return network.get(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/list/${id}/${page}/${size}`
  );
};
const searchAddressService = (
  id: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/list/${id}/${search}/${page}/${size}`
  );
};

const deleteAddressService = (id: string, data: any) => {
  return network.post(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/delete/${id}`,
    data
  );
};
const updateStatusAddressService = (id: string) => {
  return network.get(
    `${CUSTOMER_PREFIX}/${CUSTOMER_ADDRESS_PREFIX}/update/status/${id}`
  );
};

export default {
  getListService,
  searchService,
  create,
  getService,
  updateService,
  updateStatus,
  deleteService,
  getAddressService,
  createAddress,
  getAddress,
  updateAddress,
  getListAddressService,
  searchAddressService,
  deleteAddressService,
  getDetailService,
  updateStatusAddressService,
};
