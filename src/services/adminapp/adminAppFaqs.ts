import { FAQ } from '../../utils/constants';
import network from '../../utils/network';

const FaqList = (tenantId: any, search: string, page: number, size: number) => {
  return network.getWithQueryParam(`${FAQ}/list/${tenantId}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const FaqCreate = (data: any) => {
  return network.post(`${FAQ}/create`, data);
};

const FaqFindById = (faqId: any) => {
  return network.get(`${FAQ}/find/${faqId}`);
};

const FaqUpdate = (faqId: any, data: any) => {
  return network.post(`${FAQ}/update/${faqId}`, data);
};

const FaqUpdateStatus = (faqId: any, data: any) => {
  return network.post(`${FAQ}/update/status/${faqId}`, data);
};

export default {
  FaqList,
  FaqCreate,
  FaqFindById,
  FaqUpdate,
  FaqUpdateStatus,
};
