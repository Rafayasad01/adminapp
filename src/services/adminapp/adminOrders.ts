import network from '../../utils/network';
import { ORDER_PREFIX } from '../../utils/constants';
const ASSIGN_PREFIX = 'assign';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${ORDER_PREFIX}/list/${tenant}/${page}/${size}`);
};
const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${ORDER_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const viewService = (id: string) => {
  return network.get(`${ORDER_PREFIX}/view/${id}`);
};

const createStatusesService = (data: any) => {
  return network.post(`${ORDER_PREFIX}/statuses/create`, data);
};
const getListAssignService = (tenant: string, page: number, size: number) => {
  return network.get(
    `${ORDER_PREFIX}/${ASSIGN_PREFIX}/list/${tenant}/${page}/${size}`
  );
};

const searchAssignService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${ORDER_PREFIX}/${ASSIGN_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const createAssignService = (data: any) => {
  return network.post(`${ORDER_PREFIX}/${ASSIGN_PREFIX}/create`, data);
};

export default {
  getListService,
  searchService,
  viewService,
  createStatusesService,
  createAssignService,
  getListAssignService,
  searchAssignService,
};
