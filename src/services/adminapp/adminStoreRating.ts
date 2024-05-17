// import { AxiosResponse } from 'axios';
import { STORE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const StoreRatingListService = (
  empId: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${STORE_PREFIX}/rating/list/${empId}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

export default {
  StoreRatingListService,
};
