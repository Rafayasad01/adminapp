import { NOTIFICATION_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

// const ASSIGN_PREFIX = 'assign';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${NOTIFICATION_PREFIX}/list/${tenant}/${page}/${size}`);
};

const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${NOTIFICATION_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const sentService = (data: any) => {
  return network.post(`${NOTIFICATION_PREFIX}/sent`, data);
};

const batchDetailService = (id: string) => {
  return network.get(`${NOTIFICATION_PREFIX}/batch/detail/${id}`);
};

export default {
  getListService,
  sentService,
  searchService,
  batchDetailService,
};
