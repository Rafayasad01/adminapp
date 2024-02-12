import { RATING } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(`${RATING}/list/${tenant}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatListService = (
  catId: string | any,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(`${RATING}/reviews/${catId}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatStarRating = (homeCatId: string | any) => {
  return network.getWithQueryParam(`${RATING}/distinct/star/list/${homeCatId}`);
};

const getCatStarDetail = (homeCatId: string | any) => {
  return network.getWithQueryParam(`${RATING}/item/detail/${homeCatId}`);
};

export default {
  getListService,
  getCatListService,
  getCatStarRating,
  getCatStarDetail,
};
