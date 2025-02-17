import { DASHBOARD_PREFIX } from '../../utils/constants';
// eslint-disable-next-line import/no-cycle
import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';

const getDashboardCount = (tenant: string) => {
  return network.get(`${DASHBOARD_PREFIX}/order/detail/${tenant}`);
};

const getDashboardActivity = () => {
  return network.get(`${NEW_EARTH_PREFIX}/${DASHBOARD_PREFIX}/activity`);
};

export default {
  getDashboardCount,
  getDashboardActivity,
};
