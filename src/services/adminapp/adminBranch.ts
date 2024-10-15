import network from '../../utils/network';

const BRANCH_PREFIX = 'branch';

const getListService = (tenantID: string, page: number, size: number) => {
  return network.get(`${BRANCH_PREFIX}/list/${tenantID}/${page}/${size}`);
};

const getListServiceSearch = (
  tenantID: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${BRANCH_PREFIX}/list/${tenantID}/${search}/${page}/${size}`
  );
};

const getDetailService = (tenantID: any, branchId: string | any) => {
  return network.get(`${BRANCH_PREFIX}/detail/${tenantID}/${branchId}`);
};

const getSettingService = (tenantID: any) => {
  return network.get(`${BRANCH_PREFIX}/setting/${tenantID}`);
};

const getCategoryService = (tenantID: any) => {
  return network.get(`${BRANCH_PREFIX}/category/${tenantID}`);
};

const insertBranch = (data: any, tenantID: string) => {
  return network.post(`${BRANCH_PREFIX}/insert/${tenantID}`, data);
};

const editBranch = (tenantId: string, branchId: string) => {
  return network.get(`${BRANCH_PREFIX}/detail/${tenantId}/${branchId}`);
};

const updateBranch = (data: any, tenantID: string, branchId: string) => {
  return network.post(`${BRANCH_PREFIX}/update/${tenantID}/${branchId}`, data);
};

const updateBranchStatus = (data: any, tenantID: string, branchId: string) => {
  return network.post(
    `${BRANCH_PREFIX}/update/${tenantID}/${branchId}/status`,
    data
  );
};

export default {
  getListService,
  getDetailService,
  getSettingService,
  getCategoryService,
  getListServiceSearch,
  insertBranch,
  editBranch,
  updateBranch,
  updateBranchStatus,
};
