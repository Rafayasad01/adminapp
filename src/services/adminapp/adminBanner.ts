import network from '../../utils/network';
import { BACKOFFICE_PREFIX } from '../../utils/constants';

const BANNER_PREFIX = 'banner';

const createBanner = (data: any) => {
  return network.postMultipart(`${BANNER_PREFIX}/create`, data);
};

const getBanners = (tenantID: string) => {
  return network.get(`${BANNER_PREFIX}/list/${tenantID}`);
};

const editBanners = (bannerID: string) => {
  return network.get(`${BANNER_PREFIX}/find/${bannerID}`);
};

const updateBanners = (data: any) => {
  return network.postMultipart(`${BANNER_PREFIX}/update`, data);
};

const deleteBanner = (data: any) => {
  return network.post(`${BANNER_PREFIX}/delete`, data);
};

const BannerUpdateStatus = (data: any) => {
  return network.post(`${BANNER_PREFIX}/update/status`, data);
};

const BannerDelete = (data: any) => {
  return network.post(`${BANNER_PREFIX}/delete`, data);
};

export default {
  getBanners,
  BannerUpdateStatus,
  BannerDelete,
  createBanner,
  editBanners,
  updateBanners,
  deleteBanner,
};
