import network from '../../utils/network';

const NEW_EARTH_PREFIX = 'new-earth';
const FEEDBACK_PREFIX = 'feedback';

// Quotation
const getFeedbackService = (qp: object) => {
  return network.get(`${NEW_EARTH_PREFIX}/${FEEDBACK_PREFIX}/list`, qp);
};

export default {
  getFeedbackService,
};
