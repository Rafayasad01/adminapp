import network from '../../utils/network';
import { ORDER_PREFIX } from '../../utils/constants';

const getListService = (page: number, size: number) => {
    return network.get(ORDER_PREFIX + '/list', page, size);
}
const searchService = (search: string, page: number, size: number) => {
    return network.getSearch(ORDER_PREFIX + '/list', search, page, size);
}

const viewService = (id: string) => {
    return network.getView(ORDER_PREFIX + '/view', id);
}


export default {
    getListService,
    searchService,
    viewService
}