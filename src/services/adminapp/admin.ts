import { BACKOFFICE_PREFIX, SETTING_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

import { UserLogin } from '../../interfaces/auth.interface';

const getService = () => {
  return network.get(`${SETTING_PREFIX}/get`);
};

const updateService = (data: any) => {
  return network.postMultipart(`${SETTING_PREFIX}/update`, data);
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

const getOtpService = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/get-otp`, data);
};

const newPasswordService = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/new-password`, data);
};

export default {
  getService,
  updateService,
  getAddressService,
  loginService,
  createNewPassword,
  updateMediaService,
  getOtpService,
  newPasswordService,
};
