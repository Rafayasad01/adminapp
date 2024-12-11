import {
  CATEGORY_PREFIX,
  SERVICE_PREFIX,
  STORE_PREFIX,
} from '../../utils/constants';
import network from '../../utils/network';

// cat

const StoreCatList = (search: string, page: number, size: number) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/list`,
    {
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
};

const StoreCatCreate = (data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/create`,
    data
  );
};

const StoreCatUpdate = (catId: any, data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/update/${catId}`,
    data
  );
};

const StoreCatUpdateStatus = (catId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/update/status/${catId}`,
    data
  );
};

const StoreCatDelete = (catId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/delete/${catId}`,
    data
  );
};

// cat items

const StoreCatItemsList = (
  catId: any,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/list/${catId}`,
    {
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
};

const StoreCatItemsCreate = (data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/create`,
    data
  );
};

const StoreCatItemsUpdate = (catItemId: any, data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/update/${catItemId}`,
    data
  );
};

const StoreCatItemsUpdateStatus = (catItemId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/update/status/${catItemId}`,
    data
  );
};

const StoreCatItemDelete = (catItemId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/delete/${catItemId}`,
    data
  );
};

const StoreOverrideCategoryService = (catId: any, data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/overwrite/${catId}`,
    data
  );
};

// lovs

const StoreCatLov = () => {
  return network.get(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/lov`
  );
};

const StoreCatItemsLov = (catId: any) => {
  return network.get(
    `${STORE_PREFIX}/${SERVICE_PREFIX}/${CATEGORY_PREFIX}/item/lov/${catId}`
  );
};

export default {
  StoreCatList,
  StoreCatCreate,
  StoreCatUpdate,
  StoreCatUpdateStatus,
  StoreCatItemsList,
  StoreCatItemsCreate,
  StoreCatItemsUpdate,
  StoreCatItemsUpdateStatus,
  StoreCatLov,
  StoreCatItemsLov,
  StoreCatDelete,
  StoreCatItemDelete,
  StoreOverrideCategoryService,
};
