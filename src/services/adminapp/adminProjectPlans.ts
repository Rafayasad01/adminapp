import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PLANS_PREFIX = 'plans';
const PROJECTS_PREFIX = 'projects';

// projects
const getListProjectService = (tenant: string) => {
  return network.get(`${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/list/${tenant}`);
};

const addProjectService = (data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/create`, data);
};

const updateProjectService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/update/${id}`,
    data
  );
};

const updateStatusProjectService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/update/status/${id}`,
    data
  );
};

const deleteStatusProjectService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PROJECTS_PREFIX}/delete/${id}`,
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

export default {
  getListProjectService,
  addProjectService,
  updateProjectService,
  updateStatusProjectService,
  deleteStatusProjectService,
  getListPlanService,
  fileUploadService,
};
