import {
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
  EXPENSE_TYPES,
  USER_TYPES,
} from '../../utils/constants';
import network from '../../utils/network';

const STORE_EXPENSE = 'expense';

const storeEmployeeBonusList = (
  quaryParams: any,
  empId: string | undefined
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_EXPENSE}/list/${empId}`,
    {
      ...quaryParams,
      expenseType: EXPENSE_TYPES.bonus,
      userType: USER_TYPES.employee,
    }
  );
};

const create = (data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_EXPENSE}/create`,
    data
  );
};

const update = (id: string, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_EXPENSE}/update/${id}`,
    data
  );
};

const deleteBonus = (id: string, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${STORE_EXPENSE}/delete/${id}`,
    data
  );
};

export default {
  storeEmployeeBonusList,
  create,
  update,
  deleteBonus,
};
