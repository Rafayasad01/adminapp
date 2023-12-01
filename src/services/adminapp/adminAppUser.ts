import network from '../../utils/network';

const APP_PREFIX = 'app/user';

const appLogin = (data: any) => {
  return network.post(`${APP_PREFIX}/login`, data);
};

export default {
  appLogin,
};
