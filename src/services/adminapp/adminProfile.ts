import { BACKOFFICE_PREFIX, PROFILE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const getProfile = (userId: string) => {
  return network.get(`${BACKOFFICE_PREFIX}/${PROFILE_PREFIX}/${userId}`);
};

const updateProfile = (data: any) => {
  return network.postMultipart(
    `${BACKOFFICE_PREFIX}/${PROFILE_PREFIX}/update`,
    data
  );
};

const newPassword = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/secret/update`, data);
};

export default {
  getProfile,
  updateProfile,
  newPassword,
};
