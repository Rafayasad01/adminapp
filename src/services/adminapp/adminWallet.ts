import { AxiosResponse } from 'axios';
import network from '../../utils/network';

const WALLET_PREFIX = 'wallet';

const WalletList = (
  search: string,
  page: number,
  size: number
): Promise<AxiosResponse<any, any>> => {
  return network.getWithQueryParam(`${WALLET_PREFIX}/list`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const WalletCreate = (data: any) => {
  return network.postMultipart(`${WALLET_PREFIX}/create`, data);
};

export default {
  WalletList,
  WalletCreate,
};
