import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const PROJECT_QUOTATION_PREFIX = 'project-quotations';

// Quotation
const getQuotationService = (data: object) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${PROJECT_QUOTATION_PREFIX}/list`,
    data
  );
};

const getQuotationLovService = (data?: object) => {
  return network.get(
    `${NEW_EARTH_PREFIX}/${PROJECT_QUOTATION_PREFIX}/list/lov`,
    data
  );
};

const createQuotationService = (data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PROJECT_QUOTATION_PREFIX}/create`,
    data
  );
};

const updateQuotationService = (id: string | any, data: any) => {
  return network.postMultipart(
    `${NEW_EARTH_PREFIX}/${PROJECT_QUOTATION_PREFIX}/update/${id}`,
    data
  );
};

const deleteStatusQuotationService = (id: string | any) => {
  return network.post(
    `${NEW_EARTH_PREFIX}/${PROJECT_QUOTATION_PREFIX}/delete`,
    { id }
  );
};

export default {
  getQuotationService,
  getQuotationLovService,
  createQuotationService,
  updateQuotationService,
  deleteStatusQuotationService,
};
