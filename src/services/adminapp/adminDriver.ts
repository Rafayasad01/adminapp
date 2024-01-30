import { DRIVER_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const DRIVER_SCHEDULE_PREFIX = 'schedule';
const DRIVER_ADDRESS_PREFIX = 'address';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${DRIVER_PREFIX}/list/${tenant}/${page}/${size}`);
};
const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${DRIVER_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const create = (data: any) => {
  return network.postMultipart(`${DRIVER_PREFIX}/create`, data);
};

const getService = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/get/${id}`);
};

const updateService = (id: string, data: any) => {
  return network.postMultipart(`${DRIVER_PREFIX}/update/${id}`, data);
};

const updateStatus = (id: string, data: any) => {
  return network.post(`${DRIVER_PREFIX}/update/status/${id}`, data);
};

const deleteService = (id: string, data: any) => {
  return network.post(`${DRIVER_PREFIX}/delete/${id}`, data);
};

const getDetailService = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/detail/${id}`);
};

const getDeliveryListService = (
  orderId: string,
  page: number,
  size: number
) => {
  return network.get(
    `${DRIVER_PREFIX}/delivery/list/${orderId}/${page}/${size}`
  );
};

const getScheduleService = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/detail/${id}`);
};

const createSchedule = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/create/${id}`,
    data
  );
};

const getSchedule = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/get/${id}`);
};
const updateSchedule = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/update/${id}`,
    data
  );
};

const getListScheduleService = (id: string, page: number, size: number) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/list/${id}/${page}/${size}`
  );
};
const searchScheduleService = (
  id: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/list/${id}/${search}/${page}/${size}`
  );
};

const deleteScheduleService = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/delete/${id}`,
    data
  );
};

const updateStatusScheduleService = (id: string) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_SCHEDULE_PREFIX}/update/status/${id}`
  );
};

const getAddressService = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/detail/${id}`);
};

const createAddress = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/create/${id}`,
    data
  );
};

const getAddress = (id: string) => {
  return network.get(`${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/get/${id}`);
};
const updateAddress = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/update/${id}`,
    data
  );
};

const getListAddressService = (id: string, page: number, size: number) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/list/${id}/${page}/${size}`
  );
};
const searchAddressService = (
  id: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/list/${id}/${search}/${page}/${size}`
  );
};

const deleteAddressService = (id: string, data: any) => {
  return network.post(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/delete/${id}`,
    data
  );
};

const updateStatusAddressService = (id: string) => {
  return network.get(
    `${DRIVER_PREFIX}/${DRIVER_ADDRESS_PREFIX}/update/status/${id}`
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
  getScheduleService,
  createSchedule,
  getSchedule,
  updateSchedule,
  getListScheduleService,
  searchScheduleService,
  deleteScheduleService,
  getAddressService,
  createAddress,
  getAddress,
  updateAddress,
  getListAddressService,
  searchAddressService,
  deleteAddressService,
  getDetailService,
  getDeliveryListService,
  updateStatusAddressService,
  updateStatusScheduleService,
};
