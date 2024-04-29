import { DASHBOARD_PREFIX } from '../../utils/constants';
// eslint-disable-next-line import/no-cycle
import network from '../../utils/network';

const getDashboardCount = (tenant: string) => {
  return network.get(`${DASHBOARD_PREFIX}/order/detail/${tenant}`);
};

export default {
  getDashboardCount,
};
