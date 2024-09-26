import {
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
  EXPENSE_TYPES,
  USER_TYPES,
} from '../../utils/constants';
import network from '../../utils/network';

const STORE_DEDUCTION = 'expense';

const storeEmployeeOvertimeList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/list/${empId}`,
    {
      ...quaryParams,
      expenseType: EXPENSE_TYPES.overtime,
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

export default {
  storeEmployeeOvertimeList,
  create,
  update,
};
