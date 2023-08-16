import network from '../../utils/network';
import { SuperadminUserLogin } from '../../interfaces/superadmin/auth.interface';
import { BACKOFFICE_PREFIX } from '../../utils/constants';

const loginService = (userData: SuperadminUserLogin) => {
  return network.post(`${BACKOFFICE_PREFIX}/login`, userData);
};

export default {
  loginService,
};
