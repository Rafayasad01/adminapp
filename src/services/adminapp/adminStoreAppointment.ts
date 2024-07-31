/* eslint-disable import/no-cycle */
import {
  APPOINTMENT_PREFIX,
  EMPLOYEE_PREFIX,
  STORE_PREFIX,
} from '../../utils/constants';
import network from '../../utils/network';

const getBarbersList = (storeServiceCatItemId: any) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/${EMPLOYEE_PREFIX}/${storeServiceCatItemId}`
  );
};

const getBarberBookedTimeSlots = (storeEmp: any, date: any) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/linedUp/${storeEmp}/${date}`
  );
};

const appointmentCreate = (data: any) => {
  return network.post(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/create`, data);
};

const appointmentUpdate = (storeAppId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/update/${storeAppId}`,
    data
  );
};

const appointmentReschedule = (storeAppId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/re-schedule/${storeAppId}`,
    data
  );
};

const appointmentPaidAll = (code: any) => {
  return network.patch(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/paid/${code}`,
    {}
  );
};

const appointmentPaid = (storeAppId: any) => {
  return network.patch(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/done/${storeAppId}`,
    {}
  );
};

const appointmentProcessing = (storeAppId: any) => {
  return network.post(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/processing/${storeAppId}`,
    {}
  );
};

const appointmentCancelled = (storeAppId: any) => {
  return network.patch(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/cancelled/${storeAppId}`,
    {}
  );
};
interface AppointmentAllCancelledResponse {
  success: boolean;
  code: number;
  message: string;
  data: AppointmentAllCancelledData[];
}

interface AppointmentAllCancelledData {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  note: string;
  tenant: string;
  appointmentNumber: string;
  status: string;
  gstPercentage: number;
  gstAmount: string;
  discountAmount: string;
  totalAmount: string;
  grandTotalAmount: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  storeEmployee: string;
  storeServiceCategoryItem: string;
  appointmentTime: string;
  serviceTime: string;
  storeServiceCategory: string;
  paymentStatus: string;
  code: string;
  appUser: string;
  appointmentType: string;
  guestType: string;
}
const appointmentAllCancelled = (code: any) => {
  return network.patch<any, AppointmentAllCancelledResponse>(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/cancelled/all/${code}`,
    {}
  );
};

const getAllAppointments = (date: any, view: string) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/${
      view === 'week' ? 'weekly' : 'monthly'
    }/${date}`
  );
};

const getAppointment = (storeAppId: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/get/${storeAppId}`);
};

const getAppointmentByCode = (code: any) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/get/byCode/${code}`
  );
};

const getAppointmentById = (storeAppId: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/get/${storeAppId}`);
};

const fetchAllAppointments = (tenant: any, body: any) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/list/${tenant}`,
    body
  );
};

const AppointmentStoreEmployeeList = (
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(
    `${STORE_PREFIX}/${EMPLOYEE_PREFIX}/appointment/list`,
    {
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
};

// reschedule individual
const appointmentRescheduleById = (storeAppId: any, data: any) => {
  return network.post(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/re-schedule/individual/${storeAppId}`,
    data
  );
};

// invoice
// const AppointmentInvoiceDetailById = (id: string) => {
//   return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/invoice/${id}`);
// };

const AppointmentInvoiceDetailByCode = (code: string) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/invoice/${code}`);
};

export default {
  getBarbersList,
  getBarberBookedTimeSlots,
  appointmentCreate,
  appointmentUpdate,
  getAllAppointments,
  getAppointment,
  getAppointmentByCode,
  getAppointmentById,
  appointmentReschedule,
  fetchAllAppointments,
  appointmentPaid,
  appointmentPaidAll,
  appointmentProcessing,
  appointmentCancelled,
  appointmentAllCancelled,
  AppointmentStoreEmployeeList,
  appointmentRescheduleById,
  // AppointmentInvoiceDetailById,
  AppointmentInvoiceDetailByCode,
};
