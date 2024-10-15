import { CATEGORY_PREFIX } from '../../utils/constants';
import network from '../../utils/network';
import { getItem } from '../../utils/storage';

const SERVICE_PREFIX = 'service';
const SERVICE_FAQ_PREFIX = 'faq';
const BRANCH_ID = getItem('BRANCH_ID');

const getListService = (quaryParams: any) => {
  return network.get(`${CATEGORY_PREFIX}/list/${BRANCH_ID}`, {
    ...quaryParams,
  });
};

const create = (data: any) => {
  return network.postMultipart(`${CATEGORY_PREFIX}/create/${BRANCH_ID}`, data);
};

const getCategory = (id: string) => {
  return network.get(`${CATEGORY_PREFIX}/details/${BRANCH_ID}/${id}`);
};

const updateCategory = (productId: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/update/${BRANCH_ID}/${productId}`,
    data
  );
};

const updateStatus = (productId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/update/${BRANCH_ID}/${productId}/status`,
    data
  );
};

const deleteCategory = (productId: string) => {
  return network.post(
    `${CATEGORY_PREFIX}/delete/${BRANCH_ID}/${productId}`,
    {}
  );
};

// services

const getCategoryServiceList = (productId: string, quaryParams: any) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/list/${BRANCH_ID}/${productId}`,
    {
      ...quaryParams,
    }
  );
};

const categoryServiceCreate = (productId: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/create/${BRANCH_ID}/${productId}`,
    data
  );
};

const getCategoryService = (id: string) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/details/${BRANCH_ID}/${id}`
  );
};

const updateCategoryService = (catId: any, id: string, data: any) => {
  return network.postMultipart(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/${BRANCH_ID}/${catId}/${id}`,
    data
  );
};

const updateCategoryServiceStatus = (
  catId: any,
  categoryServiceId: string,
  data: any
) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/update/${BRANCH_ID}/${catId}/${categoryServiceId}/status`,
    data
  );
};

const deleteCategoryService = (categoryServiceId: string) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/delete/${BRANCH_ID}/${categoryServiceId}`,
    {}
  );
};

// service faqs

const getCategoryServiceFaqList = (
  categoryServiceId: string,
  quaryParams: any
) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/list/${BRANCH_ID}/${categoryServiceId}`,
    { ...quaryParams }
  );
};

const categoryServiceCreateFaq = (categoryServiceId: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/create/${BRANCH_ID}/${categoryServiceId}`,
    data
  );
};

const getCategoryServiceFaq = (id: string) => {
  return network.get(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/details/${BRANCH_ID}/${id}`
  );
};

const updateCategoryServiceFaq = (id: string, data: any) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/update/${BRANCH_ID}/${id}`,
    data
  );
};

const updateCategoryServiceFaqStatus = (
  categoryServiceFaqId: string,
  data: any
) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/update/${BRANCH_ID}/${categoryServiceFaqId}/status`,
    data
  );
};

const deleteCategoryServiceFaq = (categoryServiceFaqId: string) => {
  return network.post(
    `${CATEGORY_PREFIX}/${SERVICE_PREFIX}/${SERVICE_FAQ_PREFIX}/delete/${BRANCH_ID}/${categoryServiceFaqId}`,
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
