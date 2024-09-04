import { AxiosResponse } from 'axios';
import {
  EMPLOYEE_PREFIX,
  SERVICE_PREFIX,
  STORE_PREFIX,
} from '../../utils/constants';
import network from '../../utils/network';

export interface GetStoreEmployeeListResponse {
  success: boolean;
  code: number;
  message: string;
  data: GetStoreEmployeeListData;
}

export interface GetStoreEmployeeListData {
  list: GetStoreEmployeeList[];
  total: number;
}

export interface GetStoreEmployeeList {
  id: string;
  name: string;
  address: string;
  phone: string;
  cnic: string;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  email: string;
  avatar?: string;
}

const StoreEmployeeList = (
  search: string,
  page: number,
  size: number
): Promise<AxiosResponse<GetStoreEmployeeListResponse, any>> => {
  return network.getWithQueryParam(`${STORE_PREFIX}/${EMPLOYEE_PREFIX}/list`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const StoreEmployeeAllList = (
  search: string,
  page: number,
  size: number
): Promise<AxiosResponse<GetStoreEmployeeListResponse, any>> => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/list/all`,
    {
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
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

const StoreEmployeeDelete = (empId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/delete/${empId}`,
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

const StoreEmployeeServiceCreateSingle = (empId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/${SERVICE_PREFIX}/create/single/${empId}`,
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

// Attendance Service
const StoreEmployeeAttendanceService = (empId: any, month: any) => {
  return network.get(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/attendance/${empId}/${month}`
  );
};

const StoreEmployeeAttendanceLeaveService = (
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${STORE_PREFIX}/${EMPLOYEE_PREFIX}/leave/management`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

// Employee Rating
const StoreEmployeeRatingDetailService = (empId: string | any) => {
  return network.get(`${STORE_PREFIX}/${EMPLOYEE_PREFIX}/detail/${empId}`);
};

const StoreEmployeeRatingReviewService = (empId: string | any) => {
  return network.get(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/rating/reviews/${empId}`
  );
};

const StoreEmployeeReviewStarListService = (empId: string | any) => {
  return network.get(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/rating/distinct/star/list/${empId}`
  );
};

const StoreEmployeeScheduleService = (empId: string | any, date: any) => {
  return network.get(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/leave/management/${empId}/${date}`
  );
};

const StoreEmployeeLeaveStatusUpdateService = (empId: string, status: any) => {
  return network.post(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/leave/management/status/update/${empId}`,
    {
      status,
    }
  );
};

export default {
  StoreEmployeeList,
  StoreEmployeeAllList,
  StoreEmployeeCreate,
  StoreEmployeeFind,
  StoreEmployeeUpdate,
  StoreEmployeeUpdateStatus,
  StoreEmployeeServiceList,
  StoreEmployeeServiceCreate,
  StoreEmployeeServiceCreateSingle,
  StoreEmployeeServiceUpdate,
  StoreEmployeeServiceUpdateStatus,
  StoreEmployeeServiceDelete,
  StoreEmployeeDelete,
  StoreEmployeeAttendanceService,
  StoreEmployeeAttendanceLeaveService,
  StoreEmployeeRatingDetailService,
  StoreEmployeeRatingReviewService,
  StoreEmployeeReviewStarListService,
  StoreEmployeeScheduleService,
  StoreEmployeeLeaveStatusUpdateService,
};
