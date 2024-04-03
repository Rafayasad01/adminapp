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

const getAllAppointmentsWeekly = (week: any) => {
  return network.get(`${STORE_PREFIX}/${APPOINTMENT_PREFIX}/weekly/${week}`);
};

export default {
  getBarbersList,
  getBarberBookedTimeSlots,
  appointmentCreate,
  getAllAppointmentsWeekly,
};
