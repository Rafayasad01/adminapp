import network from '../../utils/network';
import { SETTING_PREFIX, BACKOFFICE_PREFIX } from '../../utils/constants';

import { NewPassword, UserLogin } from '../../interfaces/auth.interface';

const getService = (tenantConfig: string) => {
  return network.get(`${SETTING_PREFIX}/get/${tenantConfig}`);
};

const updateService = <T = any>(
  tenant: string,
  tenantConfig: string,
  data: T
) => {
  return network.postMultipart(
    `${SETTING_PREFIX}/update/${tenant}/${tenantConfig}`,
    data
  );
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
  createNewPassword
};
