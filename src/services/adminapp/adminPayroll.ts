import {
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
  EXPENSE_TYPES,
  USER_TYPES,
} from '../../utils/constants';
import network from '../../utils/network';

const STORE_DEDUCTION = 'expense';

const storeEmployeePayrollList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/list/${empId}`,
    {
      ...quaryParams,
      expenseType: EXPENSE_TYPES.payroll,
      userType: USER_TYPES.employee,
    }
  );
};

export default {
  storeEmployeePayrollList,
};
