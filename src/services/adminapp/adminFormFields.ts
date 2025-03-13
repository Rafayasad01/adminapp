import network from '../../utils/network';

const PREFIX = 'form-field';

const getList = (qp: any) => {
  return network.get(`${PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.post(`${PREFIX}/create`, data);
};

const update = (data: any, id: any) => {
  return network.post(`${PREFIX}/update/${id}`, data);
};

const deleteField = (id: any) => {
  return network.post(`${PREFIX}/delete/${id}`, {});
};

export default {
  getList,
  create,
  update,
  deleteField,
};
