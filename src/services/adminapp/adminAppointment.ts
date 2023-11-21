import { APPOINTMENT_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const PROVIDER_PREFIX = 'provider';
const SCHEDULE_PREFIX = 'schedule';
const SERVICE_PREFIX = 'service';
const VISIT_PREFIX = 'visit';


//provider
const ProviderList = (tenantID: string, page: number, size: number) => {
    return network.get(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/list/${tenantID}/${page}/${size}`);
};

const ProviderSearchList = (tenantID: string, search: string, page: number, size: number) => {
    return network.get(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/list/${tenantID}/${search}/${page}/${size}`);
};

const ProviderCreate = (data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/create`, data);
};

const ProviderEdit = (providerId: any) => {
    return network.get(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/edit/${providerId}`);
};

const ProviderUpdate = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/update/${providerId}`, data);
};

const ProviderUpdateStatus = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/update/status/${providerId}`, data);
};

const ProviderDelete = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/delete/${providerId}`, data);
};

//provider schedule
const ProviderScheduleList = (providerID: any, page: number, size: number) => {
    return network.get(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/list/${providerID}`);
};

const ProviderScheduleCreate = (data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/create`, data);
};

const ProviderScheduleEdit = (providerId: any) => {
    return network.get(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/edit/${providerId}`);
};

const ProviderScheduleUpdate = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/update/${providerId}`, data);
};

const ProviderScheduleUpdateStatus = (data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/update/status`, data);
};

const ProviderScheduleDelete = (data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/delete`, data);
};

//services
const ServiceList = (tenantID: string, page: number, size: number) => {
    return network.get(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/list/${tenantID}/${page}/${size}`);
};

const ServiceSearchList = (tenantID: string, search: string, page: number, size: number) => {
    return network.get(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/list/${tenantID}/${search}/${page}/${size}`);
};

const ServiceCreate = (data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/create`, data);
};

const ServiceEdit = (providerId: any) => {
    return network.get(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/edit/${providerId}`);
};

const ServiceUpdate = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/update/${providerId}`, data);
};

const ServiceUpdateStatus = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/update/status/${providerId}`, data);
};

const ServiceDelete = (providerId: any, data: any) => {
    return network.post(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/delete/${providerId}`, data);
};


export default {
    ProviderList,
    ProviderSearchList,
    ProviderCreate,
    ProviderEdit,
    ProviderUpdate,
    ProviderUpdateStatus,
    ProviderDelete,
    ServiceList,
    ServiceSearchList,
    ServiceCreate,
    ServiceEdit,
    ServiceUpdate,
    ServiceUpdateStatus,
    ServiceDelete,
    ProviderScheduleList,
    ProviderScheduleCreate,
    ProviderScheduleEdit,
    ProviderScheduleUpdate,
    ProviderScheduleUpdateStatus,
    ProviderScheduleDelete
}