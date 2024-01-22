import { SYSTEM_CONFIG_PREFIX, THEME_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const createTheme = (data: any) => {
  return network.post(`${THEME_PREFIX}/create`, data);
};

const getTheme = (id: string) => {
  return network.get(`${THEME_PREFIX}/get/${id}`);
};

const listTheme = (page: number, size: number) => {
  return network.get(`${THEME_PREFIX}/list/${page}/${size}`);
};

const searchTheme = (search: string, page: number, size: number) => {
  return network.get(`${THEME_PREFIX}/list/${search}/${page}/${size}`);
};

const updateTheme = (id: any, data: any) => {
  return network.post(`${THEME_PREFIX}/update/${id}`, data);
};

export default {
  createTheme,
  updateTheme,
  getTheme,
  searchTheme,
  listTheme,
};
