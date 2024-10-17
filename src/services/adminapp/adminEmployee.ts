import { BACKOFFICE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (page: number, size: number) => {
  return network.get(`${BACKOFFICE_PREFIX}/list/${page}/${size}`);
};

const getListServiceSearch = (search: string, page: number, size: number) => {
  return network.get(`${BACKOFFICE_PREFIX}/list/${search}/${page}/${size}`);
};

const getService = (userID: string) => {
  return network.get(`${BACKOFFICE_PREFIX}/edit/${userID}`);
};

const create = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/insert`, data);
};

const updateService = (userID: string, data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/update/${userID}`, data);
};

const updateStatus = (userID: string, data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/update/status/${userID}`, data);
};

const deleteService = (userID: string, data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/delete/${userID}`, data);
};

export default {
  getListService,
  getListServiceSearch,
  getService,
  create,
  updateService,
  updateStatus,
  deleteService,
};
