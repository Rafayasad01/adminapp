import network from '../../utils/network';

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

const updateBanners = (data: any, bannerID: string) => {
  return network.postMultipart(`${BANNER_PREFIX}/update/${bannerID}`, data);
};

const deleteBanner = (data: any, id: any) => {
  return network.post(`${BANNER_PREFIX}/delete/${id}`, data);
};

const BannerUpdateStatus = (data: any, id: any) => {
  return network.post(`${BANNER_PREFIX}/update/status/${id}`, data);
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
