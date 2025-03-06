import network from '../../utils/network';

const PATIENT_PREFIX = 'patient';

const getList = (qp: any) => {
  return network.get(`${PATIENT_PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.postMultipart(`${PATIENT_PREFIX}/create`, data);
};

export default {
  getList,
  create,
};
