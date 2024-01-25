import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentProviderSchedule } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import PermissionPopup from '../../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppointmentProviderScheduleUpdatePopup from './AppointmentProviderScheduleUpdatePopup';

function AppointmentProviderSchedulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);
  const [weekDays, setWeekDays] = useState<any>([]);
  const [emptyVariable] = useState(null);
  const [list, setList] = useState<any>([]);
  const [editFormDetails, setEditFormDetails] = useState<any>();
  const [actionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this customer ?'
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AppointmentProviderSchedule>();

  const inputScheduleData = [
    {
      fieldName: 'Start Time',
      id: 'startDateTime',
      placeholder: 'Office in time',
      register,
      watch,
      time: startTime,
      setTime: setStartTime,
      error: errors.startDateTime,
      setValue,
      type: 'datepicker',
    },
    {
      fieldName: 'End Time',
      id: 'endDateTime',
      placeholder: 'Office out time',
      register,
      watch,
      time: endTime,
      setTime: setEndTime,
      error: errors.endDateTime,
      setValue,
      type: 'datepicker',
    },
  ];

  const getDate = (date: any) => {
    const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
    const toString = dayjs(date)?.toString().split(' ').pop();
    const timeZone = dayjs(date)?.format('ZZ');
    return `${formatDate} ${toString} ${timeZone}`;
  };

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(dataRole, 'Appointment Provider Schedule Create') &&
      listingRolePermission(dataRole, 'Appointment Provider Schedule List')
    ) {
      // console.log('done1');
      // setOpenFormDialog(true);
      if (list.appointmentProviderSchedule?.length < 7) {
        navigate(`../add-schedule/${id}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Schedule days limit has been completed.',
          type: 'warning',
        });
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  // const deleteHandler = (delId: string) => {
  //   setIsLoader(true);
  //   const data = {
  //     updatedBy: authState.user.id,
  //   };
  //   // console.log(actionMenuItemid);

  //   // Service.deleteService(actionMenuItemid, data)
  //   //   .then((item: any) => {
  //   //     if (item.data.success) {
  //   //       setIsLoader(false);
  //   //       setIsNotify(true);
  //   //       setNotifyMessage({
  //   //         text: item.data.message,
  //   //         type: 'success',
  //   //       });
  //   //       setList((newArr: any) => {
  //   //         return newArr.filter(
  //   //           (newItem: any) => newItem.id !== item.data.data.id
  //   //         );
  //   //       });
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     setIsLoader(false);
  //   //     setIsNotify(true);
  //   //     setNotifyMessage({
  //   //       text: err.message,
  //   //       type: 'error',
  //   //     });
  //   //   });
  // };

  // const statusCancelHandler = () => {
  //   deleteHandler(actionMenuItemid);
  // };

  const editHandler = (editId: string) => {
    if (listingRolePermission(dataRole, 'Appointment Provider Schedule Edit')) {
      setIsLoader(true);
      Service.ProviderScheduleEdit(editId).then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setOpenEditFormDialog(true);
          setEditFormDetails(item.data.data);
        }
      });
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Schedule Edit')
      ) {
        setIsLoader(true);
        Service.ProviderScheduleEdit(actionMenuItemid).then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setOpenEditFormDialog(true);
            setEditFormDetails(item.data.data);
          }
        });
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Delete') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Schedule Delete')
      ) {
        setIsLoader(true);
        const data = {
          id: actionMenuItemid,
          updatedBy: authState.user.id,
        };
        Service.ProviderScheduleDelete(data)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'success',
              });
              setList((prevList: any) => {
                return {
                  ...prevList,
                  appointmentProviderSchedule:
                    prevList.appointmentProviderSchedule?.filter(
                      (items: any) => items.id !== item.data.data.id
                    ),
                };
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
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Appointment Provider Schedule List')) {
      Service.ProviderScheduleList(id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setIsLoader(false);
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
  }, [emptyVariable]);

  const createFormHandler = () => {
    // setIsLoader(true);
    const userData = {
      startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
      workDays: weekDays,
      createdBy: authState.user.id,
    };
    // console.log("final data", userData)
    Service.ProviderScheduleCreate(userData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setStartTime('');
          setEndTime('');
          setWeekDays([]);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
        } else {
          reset();
          setStartTime('');
          setEndTime('');
          setWeekDays([]);
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
        setStartTime('');
        setEndTime('');
        setWeekDays([]);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    // data.updatedBy = authState.user.id
    const details = {
      updatedBy: authState.user.id,
      ...data,
    };
    Service.ProviderScheduleUpdate(details)
      .then((item) => {
        if (item.data.success) {
          // console.log('itemmmm', item.data.data);
          reset();
          setStartTime('');
          setEndTime('');
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((prevList: any) => {
            return {
              ...prevList,
              appointmentProviderSchedule:
                prevList.appointmentProviderSchedule?.map((items: any) => {
                  if (items.id === item.data.data.id) {
                    return {
                      ...items,
                      startTime: item.data.data.startTime,
                      endTime: item.data.data.endTime,
                    };
                  }
                  return items;
                }),
            };
          });
        } else {
          reset();
          setStartTime('');
          setEndTime('');
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
        setStartTime('');
        setEndTime('');
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const onSubmitDialogBox = () => {
    if (openFormDialog && weekDays && startTime && endTime) {
      setOpenFormDialog(false);
      createFormHandler();
    } else if (openEditFormDialog) {
      setOpenEditFormDialog(false);
      // updateFormHandler(data);
    }
  };

  const handleSwitchChange = (event: any, switchId: string) => {
    if (
      listingRolePermission(
        dataRole,
        'Appointment Provider Schedule Update Status'
      )
    ) {
      const data = {
        id: switchId,
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.ProviderScheduleUpdateStatus(data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((prevList: any) => {
            return {
              ...prevList,
              appointmentProviderSchedule:
                prevList.appointmentProviderSchedule?.map((item: any) => {
                  if (item.id === updateItem.data.data.id) {
                    return { ...item, isActive: updateItem.data.data.isActive };
                  }
                  return item;
                }),
            };
          });
        }
      });
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
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
      <TopBar title="Schedule" isNestedRoute />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div>
            <div className="pt-4">
              <span className="p-3 font-open-sans text-xl font-semibold text-[#252733]">
                Provider Details
              </span>
            </div>
            {list?.name ? (
              <div className="grid w-full gap-3 xl:grid-cols-8 2xl:grid-cols-12">
                <div className="col-span-4 flex w-full justify-between py-[2rem]">
                  <div className="flex flex-col px-5">
                    <div className="flex">
                      <div className="flex w-full items-center justify-around">
                        <div className="w-full flex-col items-center">
                          <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                            Provider Name
                          </span>
                          <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                            {list.name}
                          </div>
                        </div>
                        <div className="flex w-full flex-col">
                          <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                            Status
                          </span>
                          <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                            {list.isActive ? (
                              <span className="badge badge-success">
                                Enabled
                              </span>
                            ) : (
                              <span className="badge badge-danger">
                                Disabled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid w-[100%] grid-cols-2 items-center justify-between">
                      <div className="mt-4 flex w-full flex-col">
                        <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                          Created Date
                        </span>
                        <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                          {dayjs(list.createdDate).isValid() ? (
                            <>{getDate(list.createdDate)}</>
                          ) : (
                            '--'
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="mt-4 flex w-full flex-col">
                          <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                            Updated Date
                          </span>
                          <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                            {dayjs(list.updatedDate).isValid() ? (
                              <>{getDate(list.updatedDate)}</>
                            ) : (
                              '--'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mt-4 flex w-full flex-col">
                        <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                          Email
                        </span>
                        <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                          {list.email}
                        </div>
                      </div>
                      <div className="mt-4 flex w-full flex-col">
                        <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                          Phone number
                        </span>
                        <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                          {list.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mt-4 flex w-full flex-col">
                        <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                          Cnic
                        </span>
                        <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                          {list.cnic}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="col-span-12 grid items-center justify-center">
                  <span className="my-4 text-sm font-semibold">
                    No Shop Owner Found!
                  </span>
                </div>
              </div>
            )}
            <hr />
          </div>
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Schedules
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Work Days</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list.appointmentProviderSchedule &&
                  list.appointmentProviderSchedule?.map(
                    (item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="avatar flex flex-row items-center">
                              <div className="flex flex-col items-start justify-start">
                                <span className="text-sm font-semibold">
                                  {`${item.workDay}`}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {dayjs(item.startTime).isValid()
                              ? dayjs(item.startTime).format('hh:mm A')
                              : '--'}
                          </td>
                          <td>
                            {dayjs(item.endTime).isValid()
                              ? dayjs(item.endTime).format('hh:mm A')
                              : '--'}
                          </td>
                          <td>
                            {item.isActive ? (
                              <span className="badge badge-success">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="badge badge-danger">
                                INACTIVE
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex flex-row-reverse">
                              <IconButton
                                className="icon-btn mr-3.5 ml-4 p-0"
                                onClick={() =>
                                  item.isActive ? editHandler(item.id) : null
                                }
                              >
                                <EditIcon />
                              </IconButton>
                              <Switch
                                checked={item.isActive}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => handleSwitchChange(event, item.id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
          {list.appointmentProviderSchedule?.length < 1 ? (
            <CustomText noroundedborders text="No Records Found" />
          ) : null}
        </div>
      </div>
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={() => null}
        />
      )}
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
        <CustomDialog
          DialogHeader="Add Schedule"
          inputScheduleData={inputScheduleData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          addScheduleFormat
          setWeekDays={setWeekDays}
          weekDays={weekDays}
          startTime={startTime}
          endTime={endTime}
        />
      )}
      {openEditFormDialog && (
        <AppointmentProviderScheduleUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormDetails}
          callback={updateFormHandler}
          // setActionMenuItemid={setActionMenuItemid}
        />
      )}
    </>
  );
}

export default AppointmentProviderSchedulePage;
