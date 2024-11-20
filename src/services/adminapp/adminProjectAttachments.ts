import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PROJECT_PREFIX = 'projects';
const PLAN_PREFIX = 'plans';
const ATTACHMENT_PREFIX = 'attachments';

const getListProjectAttachmentService = (
  id: string,
  type: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${ATTACHMENT_PREFIX}/list${id ? `/${id}` : ''}`,
    {
      type,
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
};

const addProjectAttachmentService = (data: any, tenant: string) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${ATTACHMENT_PREFIX}/store/${tenant}`,
    data
  );
};

const updateProjectAttachmentService = (id: string, data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${ATTACHMENT_PREFIX}/update/${id}`,
    data
  );
};

const updateStatusProjectService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${ATTACHMENT_PREFIX}/update/status/${id}`,
    data
  );
};

const deleteStatusProjectService = (id: string) => {
  return network.post(`${NEW_EARTH_PREFIX}/${ATTACHMENT_PREFIX}/delete`, {
    id,
  });
};

// lov
const getListProjectLovService = (tenant: string) => {
  return network.get(`${NEW_EARTH_PREFIX}/${PROJECT_PREFIX}/listLov/${tenant}`);
};

const getListProjectPlanLovService = (projectId: string) => {
  return network.get(`${NEW_EARTH_PREFIX}/${PLAN_PREFIX}/listLov/${projectId}`);
};

export default {
  getListProjectAttachmentService,
  addProjectAttachmentService,
  updateProjectAttachmentService,
  updateStatusProjectService,
  deleteStatusProjectService,
  getListProjectLovService,
  getListProjectPlanLovService,
};
