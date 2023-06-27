import network from '../../utils/network';
import { CART_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(CART_PREFIX + '/list', page, size);
}
const searchService = (search: string, page: number, size: number) => {
    return network.getSearch(CART_PREFIX + '/list', search, page, size);
}


export default {
    getListService,
    searchService
}