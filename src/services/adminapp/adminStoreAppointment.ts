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

const appointmentPaid = (storeAppId: any) => {
  return network.patch(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/service/paid/${storeAppId}`,
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

// invoice
const AppointmentInvoiceDetailById = (storeAppId: string) => {
  return network.get(
    `${STORE_PREFIX}/${APPOINTMENT_PREFIX}/invoice/${storeAppId}`
  );
};

export default {
  getBarbersList,
  getBarberBookedTimeSlots,
  appointmentCreate,
  appointmentUpdate,
  getAllAppointments,
  getAppointment,
  getAppointmentById,
  appointmentReschedule,
  fetchAllAppointments,
  appointmentPaid,
  appointmentProcessing,
  appointmentCancelled,
  AppointmentStoreEmployeeList,
  AppointmentInvoiceDetailById,
};
