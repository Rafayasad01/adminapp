import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PLANS_PREFIX = 'plans';
const PROJECTS_PREFIX = 'projects';

// projects
const getListProjectService = (tenant: string) => {
  return network.get(`${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/list/${tenant}`);
};

const addProjectService = (data: any, tenant: string) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/list/${tenant}`,
    data
  );
};

// plans
const getListPlanService = (tenant: string) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${PLANS_PREFIX}/list/55c08a0d-071d-4293-a892-7c976de80563/${tenant}`
  );
};

const fileUploadService = (tenant: string, data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PLANS_PREFIX}/uploadFile/${tenant}`,
    data
  );
};

/**
 * Update project plan by reading excel file
 * @param tenant Tenant Id
 * @param data request body
 * @returns promise
 */
const updatePlanService = (tenant: string, data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PLANS_PREFIX}/update/${tenant}`,
    data
  );
};

/**
 * Get all project plans for a given tenant and project
 * @param data anything
 * @param tenant tenant id
 * @returns promise
 */
const addProjectPlansService = (
  data: any,
  tenant: string,
  projectId: string
) => {
  return network.getWithQueryParam(
    `${NEW_EARTH_PREFIX}/${PLANS_PREFIX}/list/${projectId}/${tenant}`,
    data
  );
};

export default {
  getListProjectService,
  addProjectService,
  getListPlanService,
  fileUploadService,
  addProjectPlansService,
  updatePlanService,
};
