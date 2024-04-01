import {
  EMPLOYEE_PREFIX,
  SERVICE_PREFIX,
  STORE_PREFIX,
} from '../../utils/constants';
import network from '../../utils/network';

const StoreEmployeeList = (search: string, page: number, size: number) => {
  return network.getWithQueryParam(`${STORE_PREFIX}/${EMPLOYEE_PREFIX}/list`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const StoreEmployeeCreate = (data: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/create`,
    data
  );
};

const StoreEmployeeFind = (empId: any) => {
  return network.get(`${STORE_PREFIX}/${EMPLOYEE_PREFIX}/find/${empId}`);
};

const StoreEmployeeUpdate = (data: any, empId: any) => {
  return network.postMultipart(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/update/${empId}`,
    data
  );
};

const StoreEmployeeUpdateStatus = (empId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/update/status/${empId}`,
    data
  );
};

// Store Employee Services

const StoreEmployeeServiceList = (empId: any) => {
  return network.get(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/list/${empId}`
  );
};

const StoreEmployeeServiceCreate = (empId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/create/${empId}`,
    data
  );
};

const StoreEmployeeServiceUpdate = (serviceId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/update/${serviceId}`,
    data
  );
};

const StoreEmployeeServiceUpdateStatus = (serviceId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/update/status/${serviceId}`,
    data
  );
};

const StoreEmployeeServiceDelete = (serviceId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/delete/${serviceId}`,
    data
  );
};

export default {
  StoreEmployeeList,
  StoreEmployeeCreate,
  StoreEmployeeFind,
  StoreEmployeeUpdate,
  StoreEmployeeUpdateStatus,
  StoreEmployeeServiceList,
  StoreEmployeeServiceCreate,
  StoreEmployeeServiceUpdate,
  StoreEmployeeServiceUpdateStatus,
  StoreEmployeeServiceDelete,
};
