import {
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
  EXPENSE_TYPES,
  USER_TYPES,
} from '../../utils/constants';
import network from '../../utils/network';

const STORE_DEDUCTION = 'expense';

const storeEmployeeCommissionList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/list/${empId}`,
    {
      ...quaryParams,
      expenseType: EXPENSE_TYPES.commission,
      userType: USER_TYPES.employee,
    }
  );
};

const create = (data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/create`,
    data
  );
};

const update = (id: string, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/update/${id}`,
    data
  );
};

const deleteCommission = (id: string, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/delete/${id}`,
    data
  );
};

const productsLov = () => {
  return network.get(`product/get/lov`);
};

export default {
  storeEmployeeCommissionList,
  create,
  update,
  deleteCommission,
  productsLov,
};
