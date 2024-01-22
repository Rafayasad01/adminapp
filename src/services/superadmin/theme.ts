import network from '../../utils/network';
import { THEME_PREFIX } from '../../utils/constants';

const lovList = () => {
    return network.get(`${THEME_PREFIX}/lov/list`);
};

export default {
    lovList
}