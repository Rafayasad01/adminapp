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

const getAllAppointments = (date: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/weekly/${date}`);
};

const getAppointment = (storeAppId: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/get/${storeAppId}`);
};

const getAppointmentById = (storeAppId: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/get/${storeAppId}`);
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
};
