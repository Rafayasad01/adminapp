import { ORDER_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const ASSIGN_PREFIX = 'assign';
const PLACE_PREFIX = 'place';
const CATEGORY_PREFIX = 'category';

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

const OrderCatList = (tenantId: any) => {
  return network.get(
    `${ORDER_PREFIX}/${PLACE_PREFIX}/${CATEGORY_PREFIX}/list/${tenantId}`
  );
};

const OrderCatItemList = (catId: any) => {
  return network.get(
    `${ORDER_PREFIX}/${PLACE_PREFIX}/${CATEGORY_PREFIX}/item/list/${catId}`
  );
};

const OrderGetCart = (data: any) => {
  return network.post(`${ORDER_PREFIX}/${PLACE_PREFIX}/getCart/user`, data);
};

const OrderUpdateCart = (data: any) => {
  return network.post(`${ORDER_PREFIX}/${PLACE_PREFIX}/updateCart`, data);
};

const OrderPlace = (data: any) => {
  return network.post(`${ORDER_PREFIX}/${PLACE_PREFIX}/newOrder`, data);
};

export default {
  getListService,
  searchService,
  viewService,
  createStatusesService,
  createAssignService,
  getListAssignService,
  searchAssignService,
  OrderCatList,
  OrderCatItemList,
  OrderGetCart,
  OrderUpdateCart,
  OrderPlace,
};
