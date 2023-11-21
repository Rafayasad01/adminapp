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
}

export interface AppointmentService {
    serviceName: string;
    serviceDesc: string;
}

export interface AppointmentProviderSchedule {
    weekName: any;
    startDateTime: string;
    endDateTime: string;
}