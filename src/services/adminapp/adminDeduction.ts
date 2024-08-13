import {
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
  EXPENSE_TYPES,
  USER_TYPES,
} from '../../utils/constants';
import network from '../../utils/network';

const STORE_DEDUCTION = 'expense';

const storeEmployeeDedutionList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/list/${empId}`,
    {
      ...quaryParams,
      expenseType: EXPENSE_TYPES.deduction,
      userType: USER_TYPES.employee,
    }
  );
};
const commissionCreate = (data: any, orderId: string | undefined) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/commission/create/${orderId}`,
    data
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

const deleteDeduction = (id: string, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/delete/${id}`,
    data
  );
};

export default {
  storeEmployeeDedutionList,
  create,
  commissionCreate,
  update,
  deleteDeduction,
};
