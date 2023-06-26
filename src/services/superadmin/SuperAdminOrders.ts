import network from '../../utils/network';
import { SuperadminUserLogin } from '../../interfaces/superadmin/auth.interface';
import { ORDER_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(ORDER_PREFIX + '/list', page, size);
}
const searchService = (search: string, page: number, size: number) => {
    return network.getSearch(ORDER_PREFIX + '/list', search, page, size);
}


export default {
    getListService,
    searchService
}