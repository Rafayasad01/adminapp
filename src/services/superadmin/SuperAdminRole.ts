import { PERMISSION_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const createPermission = (permissionData: any) => {
  return network.post(`${PERMISSION_PREFIX}/create`, permissionData);
};

export default {
  createPermission,
};
