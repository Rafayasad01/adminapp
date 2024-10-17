import network from '../../utils/network';

const BRANCH_PREFIX = 'branch';

const getListService = (page: number, size: number) => {
  return network.get(`${BRANCH_PREFIX}/list/${page}/${size}`);
};

const getListServiceSearch = (search: string, page: number, size: number) => {
  return network.get(`${BRANCH_PREFIX}/list/${search}/${page}/${size}`);
};

const getDetailService = (branchId: string | any) => {
  return network.get(`${BRANCH_PREFIX}/detail/${branchId}`);
};

const getSettingService = (tenantID: any) => {
  return network.get(`${BRANCH_PREFIX}/setting/${tenantID}`);
};

const getCategoryService = (tenantID: any) => {
  return network.get(`${BRANCH_PREFIX}/category/${tenantID}`);
};

const insertBranch = (data: any) => {
  return network.post(`${BRANCH_PREFIX}/insert`, data);
};

const editBranch = (tenantId: string, branchId: string) => {
  return network.get(`${BRANCH_PREFIX}/detail/${tenantId}/${branchId}`);
};

const updateBranch = (data: any, branchId: string) => {
  return network.post(`${BRANCH_PREFIX}/update/${branchId}`, data);
};

const updateBranchStatus = (data: any, branchId: string) => {
  return network.post(`${BRANCH_PREFIX}/update/${branchId}/status`, data);
};

const getBranchesLov = () => network.get(`${BRANCH_PREFIX}/list/lov`);

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
  getBranchesLov,
};
