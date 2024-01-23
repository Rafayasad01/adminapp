import network from '../../utils/network';

const getSystemConfig = (domain: string) => {
  return network.getSystemConfig(`get/admin/${domain}`);
};

export default {
  getSystemConfig,
};
