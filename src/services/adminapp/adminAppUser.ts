import network from '../../utils/network';

const APP_PREFIX = 'app/user';

const appLogin = (data: any) => {
  return network.post(`${APP_PREFIX}/login`, data);
};

const appAnonymousLogin = (data: any) => {
  return network.post(`${APP_PREFIX}/anonymous/login`, data);
};

const appCreateUser = (data: any) => {
  return network.post(`${APP_PREFIX}/create`, data);
};

const appUpdateUser = (data: any) => {
  return network.post(`${APP_PREFIX}/update`, data);
};

const appUpdateStatus = (data: any) => {
  return network.post(`${APP_PREFIX}/update/status`, data);
};

const appUserDelete = (data: any) => {
  return network.post(`${APP_PREFIX}/delete`, data);
};

const appList = (
  tenantId: string,
  userType: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APP_PREFIX}/list/${tenantId}/${userType}/${page}/${size}`
  );
};

const appListSearch = (
  tenantId: string,
  userType: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APP_PREFIX}/list/${tenantId}/${userType}/${search}/${page}/${size}`
  );
};

const appUserDetails = (appUserId: any) => {
  return network.get(`${APP_PREFIX}/detail/${appUserId}`);
};

const appUserEdit = (appUserId: string) => {
  return network.get(`${APP_PREFIX}/edit/${appUserId}`);
};

// address

const appUserAddressCreate = (data: any) => {
  return network.post(`${APP_PREFIX}/address/create`, data);
};

const appUserAddressUpdate = (data: any) => {
  return network.post(`${APP_PREFIX}/address/update`, data);
};

const appUserAddressUpdateStatus = (data: any) => {
  return network.post(`${APP_PREFIX}/address/update/status`, data);
};

const appUserAddressEdit = (addressId: string) => {
  return network.get(`${APP_PREFIX}/address/edit/${addressId}`);
};

// Schedule

const appUserScheduleCreate = (data: any) => {
  return network.post(`${APP_PREFIX}/schedule/create`, data);
};

const appUserScheduleUpdate = (data: any) => {
  return network.post(`${APP_PREFIX}/schedule/update`, data);
};

const appUserScheduleUpdateStatus = (data: any) => {
  return network.post(`${APP_PREFIX}/schedule/update/status`, data);
};

const appUserScheduleEdit = (addressId: string) => {
  return network.get(`${APP_PREFIX}/schedule/edit/${addressId}`);
};

// reward history

const appUserVocuherHistoryList = (
  appUserId: any,
  page: number,
  size: number
) => {
  return network.get(
    `${APP_PREFIX}/voucher/history/list/${appUserId}/${page}/${size}`
  );
};

const appUserSearchVocuherHistoryList = (
  appUserId: any,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APP_PREFIX}/voucher/history/list/${appUserId}/${search}/${page}/${size}`
  );
};

const appUserVocuherHistoryDetails = (voucherHistoryId: any) => {
  return network.get(
    `${APP_PREFIX}/voucher/history/detail/${voucherHistoryId}`
  );
};

const appUserLoyaltyHistoryList = (
  appUserId: any,
  page: number,
  size: number
) => {
  return network.get(
    `${APP_PREFIX}/loyalty/history/list/${appUserId}/${page}/${size}`
  );
};

const appUserLoyaltyHistoryDetails = (loyaltyHistoryId: any) => {
  return network.get(
    `${APP_PREFIX}/loyalty/history/detail/${loyaltyHistoryId}`
  );
};

export default {
  appLogin,
  appAnonymousLogin,
  appList,
  appListSearch,
  appUserDetails,
  appUserEdit,
  appCreateUser,
  appUpdateUser,
  appUpdateStatus,
  appUserDelete,
  appUserAddressCreate,
  appUserAddressUpdate,
  appUserAddressEdit,
  appUserAddressUpdateStatus,
  appUserScheduleCreate,
  appUserScheduleUpdate,
  appUserScheduleUpdateStatus,
  appUserScheduleEdit,
  appUserVocuherHistoryList,
  appUserSearchVocuherHistoryList,
  appUserLoyaltyHistoryList,
  appUserVocuherHistoryDetails,
  appUserLoyaltyHistoryDetails,
};
