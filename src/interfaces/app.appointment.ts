export interface AppointmentProvider {
  providerName: string;
  address: string;
  phone: string;
  cnic: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  urgentFee: string;
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
