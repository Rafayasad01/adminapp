import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const QUOTATION_PREFIX = 'quotations';

// Quotation
const getQuotationService = (data: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${QUOTATION_PREFIX}/list`, data);
};

const getQuotationLovService = (data?: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${QUOTATION_PREFIX}/list/lov`, data);
};

const createQuotationService = (data: any) => {
  return network.post(`${NEW_EARTH_PREFIX}/${QUOTATION_PREFIX}/create`, data);
};

const updateQuotationService = (id: string, data: any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${QUOTATION_PREFIX}/update/${id}`,
    data
  );
};

const deleteStatusQuotationService = (data: { id: string }) => {
  return network.post(`${NEW_EARTH_PREFIX}/${QUOTATION_PREFIX}/delete`, data);
};

export default {
  getQuotationService,
  getQuotationLovService,
  createQuotationService,
  updateQuotationService,
  deleteStatusQuotationService,
};
