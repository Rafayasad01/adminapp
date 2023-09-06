import network from '../../utils/network';
import { UserLogin } from '../../interfaces/superadmin/auth.interface';
import { BACKOFFICE_PREFIX } from '../../utils/constants';

const loginService = (userData: UserLogin) => {
  return network.post(`${BACKOFFICE_PREFIX}/login`, userData);
};

export default {
  loginService,
};
