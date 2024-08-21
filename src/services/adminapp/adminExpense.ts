import { EXPENSE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const getList = (queryParams: any) => {
  return network.getWithQueryParam(`${EXPENSE_PREFIX}/list`, queryParams);
};

const create = (data: any) => {
  return network.post(`${EXPENSE_PREFIX}/create`, data);
};

export default {
  getList,
  create,
};
