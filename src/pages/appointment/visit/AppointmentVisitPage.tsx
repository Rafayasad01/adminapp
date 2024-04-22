/* eslint-disable @typescript-eslint/no-unused-vars */

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomBgDropdown from '../../../components/common/CustomBgDropdown';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import EmloyeeService from '../../../services/adminapp/adminStoreEmployee';
import {
  APPOINTMENT_TYPE,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import promiseHandler, { listingRolePermission } from '../../../utils/helper';
import AllAppointment from '../AllAppointment';
import AppointmentVisitCreatePopup from './AppointmentVisitCreatePopup';
import AppointmentVisitReschedulePopup from './AppointmentVisitReschedulePopup';
import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';
// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

function AppointmentVisitPage() {
  console.log('Appointment Visit Page');
  const navigate = useNavigate();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<any>('');
  const [emptyVariable] = useState(null);
  const [page, setPage] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editDetails, setEditDetails] = useState<any>();
  const [actionMenuItemId, setActionMenuItemId] = useState<any>();
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail', 'Reschedule', 'Edit', 'Cancel'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openRescheduleFormDialog, setOpenRescheduleFormDialog] =
    useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [selectedPriorityData, setSelectedPriorityData] = useState<any>([]);
  const [priorityData, setPriorityData] = useState<any>([]);

  // dropdown
  const [appointmentType, setAppointmentType] = useState({
    text: 'All Appointments',
    icon: GroupsOutlinedIcon,
  });

  const { reset } = useForm<AppointmentVisit>();

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Appointment Create')) {
      navigate('../add-appointment');
      // setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const manuHandler = (option: string) => {
    if (actionMenuItemId?.status === 'Cancelled') {
      if (option === 'Detail') {
        if (listingRolePermission(dataRole, 'Appointment Detail')) {
          navigate(`../detail/${actionMenuItemId?.id}`);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: NOT_AUTHORIZED_MESSAGE,
            type: 'warning',
          });
        }
      }
    } else if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Appointment Edit')) {
        setIsLoader(true);
        Service.VisitEdit(actionMenuItemId?.id)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setOpenEditFormDialog(true);
              setEditDetails(item.data.data);
            } else {
              setIsLoader(false);
              setOpenEditFormDialog(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'error',
              });
            }
          })
          .catch((err) => {
            setIsLoader(false);
            setOpenEditFormDialog(false);
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
          });
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Cancel') {
      if (listingRolePermission(dataRole, 'Appointment Cancel')) {
        setIsLoader(true);
        Service.VisitCancel(actionMenuItemId?.id)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'success',
              });
              // console.log('statat', item.data.data);
              setList((newArr: any) => {
                return newArr.map((items: any) => {
                  if (items.id === item.data.data.appointmentId) {
                    items.status = item.data.data.status;
                  }
                  return { ...items };
                });
              });
            }
          })
          .catch((err: Error) => {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
          });
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Reschedule') {
      if (listingRolePermission(dataRole, 'Appointment Reschedule')) {
        setOpenRescheduleFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Detail') {
      if (listingRolePermission(dataRole, 'Appointment Detail')) {
        navigate(`../detail/${actionMenuItemId?.id}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };

  useEffect(() => {
    if (appointmentType?.text === 'All Appointments') {
      const getStoreEmployeeList = async () => {
        const storeEmployeeListPromise = EmloyeeService.StoreEmployeeList(
          search,
          page,
          2000
        );
        const [
          storeEmployeeListResult,
          storeEmployeeListError,
          storeEmployeeListOk,
        ] = await promiseHandler(storeEmployeeListPromise);
        if (!storeEmployeeListOk) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: storeEmployeeListError.message,
            type: 'error',
          });
          return;
        }
        if (!storeEmployeeListResult.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: storeEmployeeListResult.data.message,
            type: 'error',
          });
          return;
        }
        setIsLoader(false);
        // console.log('item', item);
        const temp = storeEmployeeListResult.data.data.list.map((el) => ({
          text: el.name,
          id: el.id,
          imageUrl: el.avatar,
        }));
        // console.log('🚀 ~ temp ~ temp:', temp);
        setPriorityData(temp);
      };
      getStoreEmployeeList();
    }

    /*  if (appointmentType?.text === 'All Appointments') {

      EmloyeeService.StoreEmployeeList(search, page, 2000)
        .then((item: any) => {
          setIsLoader(false);
          // console.log('item', item);
          const temp = item.data.data.list.map((el: any) => ({
            text: el.name,
            id: el.id,
            imageUrl: el.avatar,
          }));
          setPriorityData(temp);
          // setList(item.data.data);
        })
        .catch((error: Error) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: error.message,
            type: 'error',
          });
        });
    } */
  }, []);

  const createFormHandler = (data: any, type: string) => {
    // console.log('dataaaaCREATE', data, type);
    setIsLoader(true);
    if (type === 'create') {
      Service.VisitCreate(data)
        .then((item) => {
          if (item.data.success) {
            setOpenFormDialog(false);
            reset();
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList([item.data.data, ...list]);
          } else {
            reset();
            setOpenFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setOpenFormDialog(false);
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      data.appointmentId = actionMenuItemId?.id;
      // console.log('daTA', data);
      Service.VisitReschedule(data)
        .then((item: any) => {
          if (item.data.success) {
            setOpenRescheduleFormDialog(false);
            reset();
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList([item.data.data, ...list]);
          } else {
            reset();
            setOpenRescheduleFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err: Error) => {
          setOpenRescheduleFormDialog(false);
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    }
  };

  const updateFormHandler = (data: any) => {
    // console.log('datata', data);
    setIsLoader(true);
    Service.VisitUpdate(data)
      .then((item) => {
        if (item.data.success) {
          // console.log('UPDATED', item.data.data);
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === actionMenuItemId?.id) {
              list[i].name = item.data.data.name;
              list[i].note = item.data.data.note;
              list[i].phone = item.data.data.phone;
              list[i].appointmentTime = item.data.data.appointmentTime;
              list[i].appointmentDate = item.data.data.appointmentDate;
              list[i].appointmentService = item.data.data.appointmentService;
              list[i].appointmentProvider = item.data.data.appointmentProvider;
            }
          }
          reset();
        } else {
          setOpenEditFormDialog(false);
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setOpenEditFormDialog(false);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Appointment" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="flex xl:col-span-7 2xl:col-span-9">
              <div className="mr-6">
                <span className="font-open-sans text-xl font-semibold text-[#252733]">
                  All Appointments
                </span>
              </div>
              <div>
                <CustomBgDropdown
                  appointmentType={appointmentType}
                  setAppointmentType={(event: any) => {
                    if (event.text === 'All Appointments') {
                      setAppointmentType(event);
                      return;
                    }
                    setSelectedPriorityData([priorityData[0] ?? {}]);
                    setAppointmentType(event);
                  }}
                  options={APPOINTMENT_TYPE}
                />
              </div>
            </div>
            <div className="grid justify-end xl:col-span-5 2xl:col-span-3">
              <div className="flex gap-3">
                <div className="flex">
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon"
                    onClick={handleFormClickOpen}
                  >
                    <AddOutlinedIcon /> Add New Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <AllAppointment
              appointmentType={appointmentType?.text}
              priorityData={priorityData.length ? priorityData : [{}]}
              selectedPriorityData={selectedPriorityData}
              setSelectedPriorityData={setSelectedPriorityData}
              setAppointmentType={setAppointmentType}
            />
          </div>
        </div>
      </div>
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <AppointmentVisitCreatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openRescheduleFormDialog && (
        <AppointmentVisitReschedulePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openRescheduleFormDialog}
          setOpenFormDialog={setOpenRescheduleFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <AppointmentVisitUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
          formData={editDetails}
        />
      )}
    </>
  );
}

export default AppointmentVisitPage;
