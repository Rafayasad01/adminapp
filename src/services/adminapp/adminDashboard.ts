import network from '../../utils/network';
import { DASHBOARD_PREFIX } from '../../utils/constants';

const getDashboardCount = (tenant: string) => {
  return network.get(`${DASHBOARD_PREFIX}/order/detail/${tenant}`);
};

export default {
  getDashboardCount,
};
