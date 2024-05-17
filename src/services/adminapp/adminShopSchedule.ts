import { SETTING_PREFIX, SHOP_SCHEDULING_PREFIX } from '../../utils/constants';
// eslint-disable-next-line import/no-cycle
import network from '../../utils/network';

const getShopScheduleService = (tenant: string, date: string) => {
  return network.get(
    `${SETTING_PREFIX}/${SHOP_SCHEDULING_PREFIX}/get/${tenant}/${date}`
  );
};

const setShopScheduleService = (tenant: string, data: object) => {
  return network.post(
    `${SETTING_PREFIX}/${SHOP_SCHEDULING_PREFIX}/setSchedule/${tenant}`,
    data
  );
};

export default {
  getShopScheduleService,
  setShopScheduleService,
};
