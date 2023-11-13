import network from '../../utils/network';
import { ROLE_PREFIX, TENANT_PREFIX } from '../../utils/constants';

const SHOP_PREFIX = 'shop';
const USER_PREFIX = 'user';

const getShopListService = (page: number, size: number) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/list/${page}/${size}`);
};
const searchShopService = (search: string, page: number, size: number) => {
  return network.get(
    `${TENANT_PREFIX}/${SHOP_PREFIX}/list/${search}/${page}/${size}`
  );
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
const detailShopUser = (tenantId: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/user/${tenantId}`);
};

const detailBranchUser = (tenantId: string) => {
  return network.get(
    `${TENANT_PREFIX}/${SHOP_PREFIX}/branch/detail/user/${tenantId}`
  );
};

const detailShopCategory = (id: string) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/detail/category/${id}`);
};
const getShop = (id: any) => {
  return network.get(`${TENANT_PREFIX}/${SHOP_PREFIX}/edit/${id}`);
};
const updateShop = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${SHOP_PREFIX}/update/${id}`, data);
};
const updateShopStatus = (id: string, data: any) => {
  return network.post(
    `${TENANT_PREFIX}/${SHOP_PREFIX}/update/status/${id}`,
    data
  );
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
  return network.get(
    `${TENANT_PREFIX}/${USER_PREFIX}/list/${searchText}/${page}/${size}`
  );
};

const updateUserStatus = (id: string, data: any) => {
  return network.post(
    `${TENANT_PREFIX}/${USER_PREFIX}/update/status/${id}`,
    data
  );
};

const updateUser = (id: string, data: any) => {
  return network.post(`${TENANT_PREFIX}/${USER_PREFIX}/update/${id}`, data);
};

const getRoleListLOV = () => {
  return network.get(`${ROLE_PREFIX}/list/lov`);
};

const createShopBranch = (data: any, tenantID: string) => {
  return network.post(
    `${TENANT_PREFIX}/${SHOP_PREFIX}/insert/branch/${tenantID}`,
    data
  );
};

const getShopWithBranch = (tenantID: string) => {
  return network.get(
    `${TENANT_PREFIX}/${SHOP_PREFIX}/owner/detail/${tenantID}`
  );
};

const getUserById = (userID: any) => {
  return network.get(`${TENANT_PREFIX}/${USER_PREFIX}/detail/${userID}`);
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
  updateUser,
  getRoleListLOV,
  createShopBranch,
  getShopWithBranch,
  getUserById,
  detailBranchUser,
};
