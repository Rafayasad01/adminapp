import network from '../../utils/network';
import { SETTING_PREFIX, BACKOFFICE_PREFIX } from '../../utils/constants';

import { UserLogin } from '../../interfaces/auth.interface';

const getService = (tenant: string) => {
  return network.get(`${SETTING_PREFIX}/get/${tenant}`);
};

const updateService = <T = any>(tenant: string, data: T) => {
  return network.postMultipart(`${SETTING_PREFIX}/update/${tenant}`, data);
};

const updateMediaService = <T = any>(tenantId: string, data: T) => {
  return network.post(`${SETTING_PREFIX}/update/media/${tenantId}`, data);
};

const loginService = (userData: UserLogin) => {
  return network.post(`${BACKOFFICE_PREFIX}/login`, userData);
};

const getAddressService = (tenant: string) => {
  return network.get(`${SETTING_PREFIX}/address/${tenant}`);
};

const createNewPassword = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/new-password`, data);
};

export default {
  getService,
  updateService,
  getAddressService,
  loginService,
  createNewPassword,
  updateMediaService,
};
