import { DASHBOARD_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const getDashboardCount = (tenant: string) => {
  return network.get(`${DASHBOARD_PREFIX}/order/detail/${tenant}`);
};

const getDashboardActivity = () => {
  return network.get(`${DASHBOARD_PREFIX}/activity`);
};

export default {
  getDashboardCount,
  getDashboardActivity,
};
