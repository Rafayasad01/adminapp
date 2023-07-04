import network from '../../utils/network';
import { CART_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(CART_PREFIX + '/list', page, size);
}
const searchService = (search: string, page: number, size: number) => {
    return network.getSearch(CART_PREFIX + '/list', search, page, size);
}

const viewService = (id: string) => {
    return network.getView(CART_PREFIX + '/view', id);
}


export default {
    getListService,
    searchService,
    viewService
}