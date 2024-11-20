import { CATEGORY_PREFIX } from '../../utils/constants';
import network from '../../utils/network';
// import { getItem } from '../../utils/storage';

const SERVICE_PREFIX = 'service';
const SERVICE_FAQ_PREFIX = 'faq';

const getListService = (quaryParams: any) => {
  return network.get(`${CATEGORY_PREFIX}/list`, {
    ...quaryParams,
  });
};

const create = (data: any) => {
  return network.postMultipart(`${CATEGORY_PREFIX}/create`, data);
};

const getCategory = (id: string) => {
  return network.get(`${CATEGORY_PREFIX}/details/${id}`);
};

const updateCategory = (productId: string, data: any) => {
  return network.postMultipart(`${CATEGORY_PREFIX}/update/${productId}`, data);
};

const updateStatus = (productId: string, data: any) => {
  return network.post(`${CATEGORY_PREFIX}/update/${productId}/status`, data);
};

const deleteCategory = (productId: string) => {
  return network.post(`${CATEGORY_PREFIX}/delete/${productId}`, {});
};

// services

const getCategoryServiceList = (productId: string, quaryParams: any) => {
  return network.get(`${CATEGORY_PREFIX}/${SERVICE_PREFIX}/list/${productId}`, {
    ...quaryParams,
  });
};

const categoryServiceCreate = (productId: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/create/${productId}`,
    data
  );
};

const getCategoryService = (id: string) => {
  return network.get(`${CATEGORY_PREFIX}/${SERVICE_PREFIX}/details/${id}`);
};

const updateCategoryService = (catId: any, id: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/${catId}/${id}`,
    data
  );
};

const updateCategoryServiceStatus = (
  catId: any,
  categoryServiceId: string,
  data: any
) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/${catId}/${categoryServiceId}/status`,
    data
  );
};

const deleteCategoryService = (
  categoryServiceId: string,
  categoryId: string
) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/delete/${categoryId}/${categoryServiceId}`,
    {}
  );
};

// service faqs

const getCategoryServiceFaqList = (
  categoryServiceId: string,
  quaryParams: any
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/list/${categoryServiceId}`,
    { ...quaryParams }
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
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/details/${id}`
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
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/update/${categoryServiceFaqId}/status`,
    data
  );
};

const deleteCategoryServiceFaq = (categoryServiceFaqId: string) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/delete/${categoryServiceFaqId}`,
    {}
  );
};

export default {
  getListService,
  create,
  updateStatus,
  getCategoryServiceList,
  categoryServiceCreate,
  getCategoryServiceFaqList,
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
