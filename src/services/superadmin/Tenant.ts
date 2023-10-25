import network from '../../utils/network';
import { TENANT_PREFIX } from '../../utils/constants';
const SHOP_PREFIX = 'shop';
const USER_PREFIX = 'user';

const getShopListService = (page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/list/${page}/${size}`);
};
const searchShopService = (search: string, page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/list/${search}/${page}/${size}`);
};

const createShop = (data: any) => {
  return network.post(`${TENANT_PREFIX}/${SHOP_PREFIX}/insert`, data);
};

const detailShop = (id: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/${id}`);
};

const detailShopSetting = (id: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/setting/${id}`);
};
const detailShopUser = (id: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/user/${id}`);
};
const detailShopCategory = (id: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/category/${id}`);
};
const getShop = (id: any) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/get/${id}`);
};
const updateShop = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${SHOP_PREFIX}/update/${id}`, data);
};
const updateShopStatus = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${SHOP_PREFIX}/update/status/${id}`, data);
};

const sentToEmailShop = (id: string) => {
  return network.post(`${TENANT_PREFIX}/${SHOP_PREFIX}/email/sent/${id}`, {});
};

const getUserListService = (page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/${USER_PREFIX}/list/${page}/${size}`);
};

const getUser = (id: any) => {
  return network.get(`${TENANT_PREFIX}/${USER_PREFIX}/edit/${id}`);
};

const searchUserService = (searchText: string, page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/${USER_PREFIX}/list/${searchText}/${page}/${size}`);
};

const updateUserStatus = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${USER_PREFIX}/update/status/${id}`, data);
};

const updateUser = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${USER_PREFIX}/update/${id}`, data);
};

export default {
  getShopListService,
  searchShopService,
  createShop,
  detailShop,
  detailShopSetting,
  detailShopUser,
  detailShopCategory,
  getShop,
  updateShop,
  updateShopStatus,
  sentToEmailShop,
  getUserListService,
  getUser,
  searchUserService,
  updateUserStatus,
  updateUser
};
