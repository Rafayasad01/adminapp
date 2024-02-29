import { APPOINTMENT_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

const PROVIDER_PREFIX = 'provider';
const SCHEDULE_PREFIX = 'schedule';
const SERVICE_PREFIX = 'service';
const VISIT_PREFIX = 'visit';

// provider
const ProviderList = (tenantID: string, page: number, size: number) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/list/${tenantID}/${page}/${size}`
  );
};

const ProviderSearchList = (
  tenantID: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/list/${tenantID}/${search}/${page}/${size}`
  );
};

const ProviderCreate = (data: any) => {
  return network.post(`${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/create`, data);
};

const ProviderEdit = (providerId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/edit/${providerId}`
  );
};

const ProviderUpdate = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/update/${providerId}`,
    data
  );
};

const ProviderUpdateStatus = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/update/status/${providerId}`,
    data
  );
};

const ProviderDelete = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/delete/${providerId}`,
    data
  );
};

// provider schedule
const ProviderScheduleList = (providerID: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/list/${providerID}`
  );
};

const ProviderScheduleCreate = (data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/create`,
    data
  );
};

const ProviderScheduleEdit = (providerId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/edit/${providerId}`
  );
};

const ProviderScheduleUpdate = (data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/update`,
    data
  );
};

const ProviderScheduleUpdateStatus = (data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/update/status`,
    data
  );
};

const ProviderScheduleDelete = (data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/${SCHEDULE_PREFIX}/delete`,
    data
  );
};

// services
const ServiceList = (ProviderID: any, page: number, size: number) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/list/${ProviderID}/${page}/${size}`
  );
};

const ServiceSearchList = (
  ProviderID: any,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/list/${ProviderID}/${search}/${page}/${size}`
  );
};

const ServiceCreate = (data: any) => {
  return network.post(`${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/create`, data);
};

const ServiceEdit = (providerId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/edit/${providerId}`
  );
};

const ServiceUpdate = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/update/${providerId}`,
    data
  );
};

const ServiceUpdateStatus = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/update/status/${providerId}`,
    data
  );
};

const ServiceDelete = (providerId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/delete/${providerId}`,
    data
  );
};

// visit

const VisitDetailById = (appointmentId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/detail/${appointmentId}`
  );
};

const VisitProviderById = (providerId: string) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/${PROVIDER_PREFIX}/${providerId}`
  );
};

const VisitList = (tenantID: string, page: number, size: number) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/list/${tenantID}/${page}/${size}`
  );
};

const VisitSearchList = (
  tenantID: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/list/${tenantID}/${search}/${page}/${size}`
  );
};

const VisitCreate = (data: any) => {
  return network.post(`${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/create`, data);
};

const VisitEdit = (appointmentId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/edit/${appointmentId}`
  );
};

const VisitUpdate = (data: any) => {
  return network.post(`${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/update`, data);
};

const VisitCancel = (appointmentId: any) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/cancel/${appointmentId}`
  );
};

const VisitReschedule = (data: any) => {
  return network.post(`${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/reschedule`, data);
};

const VisitUpdateStatus = (visitorId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/update/status/${visitorId}`,
    data
  );
};

const VisitDelete = (visitorId: any, data: any) => {
  return network.post(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/delete/${visitorId}`,
    data
  );
};

// todays-appointment-visit
const ProviderTodaysList = (
  providerID: any,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(
    `${APPOINTMENT_PREFIX}/${PROVIDER_PREFIX}/find/${providerID}`,
    {
      search,
      page: page.toString(),
      size: size.toString(),
    }
  );
};

// LOVs

const ServiceProviderLov = (tenantID: string) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${SERVICE_PREFIX}/lov/${PROVIDER_PREFIX}/${tenantID}`
  );
};

const VisitLov = (tenantID: string) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/lov/${PROVIDER_PREFIX}/${tenantID}`
  );
};

const VisitServiceLovByProviderId = (providerID: string) => {
  return network.get(
    `${APPOINTMENT_PREFIX}/${VISIT_PREFIX}/lov/${SERVICE_PREFIX}/${providerID}`
  );
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
  ProviderScheduleDelete,
  VisitProviderById,
  VisitList,
  VisitCreate,
  VisitDelete,
  VisitSearchList,
  VisitEdit,
  VisitUpdate,
  VisitUpdateStatus,
  VisitDetailById,
  VisitLov,
  ServiceProviderLov,
  VisitServiceLovByProviderId,
  VisitCancel,
  VisitReschedule,
  ProviderTodaysList,
};
