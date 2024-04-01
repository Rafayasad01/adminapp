export interface AppointmentProvider {
  name: string;
  address: string;
  phone: string;
  cnic: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  uploadImg: any;
  services: any;
  categoryId: any;
  servicesId: any;
  servicesAmount: any;
  price: any;
  mints: any;
}

export interface AppointmentService {
  serviceName: string;
  providerName: string;
  serviceDesc: string;
  fees: string;
}

export interface AppointmentProviderSchedule {
  weekName: any;
  startDateTime: string;
  endDateTime: string;
}

export interface AppointmentProviderScheduleTime {
  startTime: string;
  endTime: string;
}

export interface AppointmentVisit {
  appointmentType?: any;
  isCheckTimingSlot: boolean;
  isUrgent: boolean;
  visitName: string;
  phone: string;
  appointmentTime: string;
  appointmentDate: string;
  note: string;
  appointmentProvider: string;
  appointmentService: any;
}

export interface AddAppointmentForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  note: string;
  gender: string;
  appointmentService: any;
  appointmentProvider: string;
}
