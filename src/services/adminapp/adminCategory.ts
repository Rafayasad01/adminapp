import { CATEGORY_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const SERVICE_PREFIX = 'service';
const SERVICE_FAQ_PREFIX = 'faq';

const getListService = (tenant: string, page: number, size: number) => {
  return network.get(`${CATEGORY_PREFIX}/list/${tenant}/${page}/${size}`);
};
const searchService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CATEGORY_PREFIX}/list/${tenant}/${search}/${page}/${size}`
  );
};

const create = (data: any) => {
  return network.postMultipart(`${CATEGORY_PREFIX}/create`, data);
};

const getCategory = (id: string) => {
  return network.get(`${CATEGORY_PREFIX}/get/${id}`);
};

const updateCategory = (categoryId: string, data: any) => {
  return network.postMultipart(`${CATEGORY_PREFIX}/update/${categoryId}`, data);
};

const updateStatus = (categoryId: string, data: any) => {
  return network.post(`${CATEGORY_PREFIX}/update/status/${categoryId}`, data);
};

const deleteCategory = (categoryId: string, data: any) => {
  return network.post(`${CATEGORY_PREFIX}/delete/${categoryId}`, data);
};

const getCategoryServiceList = (
  categoryId: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/list/${categoryId}/${page}/${size}`
  );
};
const searchCategoryService = (
  categoryId: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/list/${categoryId}/${search}/${page}/${size}`
  );
};

const categoryServiceCreate = (categoryId: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/create/${categoryId}`,
    data
  );
};

const getCategoryService = (id: string) => {
  return network.get(`${CATEGORY_PREFIX}/${SERVICE_PREFIX}/get/${id}`);
};

const updateCategoryService = (id: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/${id}`,
    data
  );
};

const updateCategoryServiceStatus = (categoryServiceId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/status/${categoryServiceId}`,
    data
  );
};

const deleteCategoryService = (categoryServiceId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/delete/${categoryServiceId}`,
    data
  );
};

const getCategoryServiceFaqList = (
  categoryServiceId: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/list/${categoryServiceId}/${page}/${size}`
  );
};
const searchCategoryServiceFaq = (
  categoryServiceId: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/list/${categoryServiceId}/${search}/${page}/${size}`
  );
};

const categoryServiceCreateFaq = (categoryServiceId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/create/${categoryServiceId}`,
    data
  );
};

const getCategoryServiceFaq = (id: string) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/get/${id}`
  );
};

const updateCategoryServiceFaq = (id: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/update/${id}`,
    data
  );
};

const updateCategoryServiceFaqStatus = (
  categoryServiceFaqId: string,
  data: any
) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/update/status/${categoryServiceFaqId}`,
    data
  );
};

const deleteCategoryServiceFaq = (categoryServiceFaqId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/delete/${categoryServiceFaqId}`,
    data
  );
};

export default {
  getListService,
  searchService,
  create,
  updateStatus,
  getCategoryServiceList,
  searchCategoryService,
  categoryServiceCreate,
  getCategoryServiceFaqList,
  searchCategoryServiceFaq,
  categoryServiceCreateFaq,
  updateCategoryServiceStatus,
  updateCategoryServiceFaqStatus,
  deleteCategory,
  deleteCategoryService,
  deleteCategoryServiceFaq,
  getCategory,
  updateCategory,
  getCategoryService,
  updateCategoryService,
  getCategoryServiceFaq,
  updateCategoryServiceFaq,
};
