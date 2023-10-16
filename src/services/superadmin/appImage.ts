import network from '../../utils/network';
import { APP_IMAGE_PREFIX } from '../../utils/constants';

const create = (data: any) => {
  return network.postMultipart(`${APP_IMAGE_PREFIX}/create`, data);
};

const get = (id: string) => {
  return network.get(`${APP_IMAGE_PREFIX}/get/${id}`);
};

const listService = (page: number, size: number) => {
  return network.get(`${APP_IMAGE_PREFIX}/list/${page}/${size}`);
};

const searchService = (search: string, page: number, size: number) => {
  return network.get(`${APP_IMAGE_PREFIX}/list/${search}/${page}/${size}`);
};

const update = (id: any, data: any) => {
  return network.postMultipart(`${APP_IMAGE_PREFIX}/update/${id}`, data);
};

const updateStatus = (id: string, data: any) => {
  return network.post(`${APP_IMAGE_PREFIX}/update/status/${id}`, data);
};

export default {
  create,
  update,
  get,
  searchService,
  updateStatus,
  listService,
};
