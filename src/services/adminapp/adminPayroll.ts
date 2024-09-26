import { EMPLOYEE_PREFIX, STORE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const STORE_DEDUCTION = 'expense';
const STORE_EMP_PAYROLL = 'payroll';

const storeEmployeePayrollList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_DEDUCTION}/${STORE_EMP_PAYROLL}/${empId}/${quaryParams.startDate}/${quaryParams.endDate}`
  );
};

export default {
  storeEmployeePayrollList,
};
