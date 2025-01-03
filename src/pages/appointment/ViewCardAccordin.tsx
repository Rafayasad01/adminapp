import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
// import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { CircularProgress } from '@mui/material';
import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import { ALL_PERMISSIONS, APPOINTMENT_STATUS } from '../../utils/constants';
import ViewCardAccordinReschedule from './ViewCardAccordinReschedule';
import PermissionPopup from '../../utils/PermissionPopup';
import UpdateAppointmentPopup from './UpdateAppointmentPopup';
import Notify from '../../components/common/Notify';
import { listingRolePermission } from '../../utils/helper';
import { useAppSelector } from '../../redux/redux-hooks';

type AccordionsProps = {
  data: Array<object> | any;
  setData?: any;
  setAllAppointments?: any;
  // setIsRescheduled?: any;
};

function ViewCardAccordin({
  data,
  setData,
  setAllAppointments,
}: // setIsRescheduled,
AccordionsProps) {
  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [serviceId, setServiceId] = React.useState<string>('');
  const handleClickPop = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setServiceId(id);
    setAnchorEl(event.currentTarget);
  };
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [appointmentDataById, setAppointmentDataById] = React.useState();
  const [expanded, setExpanded] = React.useState<string | false>(`panel0`);
  const [cancelDialogOpen, setCancelDialogOpen] =
    React.useState<boolean>(false);
  const [dialogText] = React.useState<any>(
    'Are you sure you want to delete this Appointment ?'
  );
  const [openEditFormDialog, setOpenEditFormDialog] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [statusLoader, setStatusLoader] = React.useState(false);
  // const [doneStatusLoader, setDoneStatusLoader] = React.useState(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const onRescheduleSubmit = (payload: any) => {
    // console.log('🚀 ~ onWalletSubmit ~ data:', payload);
    setIsLoader(true);
    const reScheduleData = {
      appointmentTime: payload,
    };
    storeAppointmentService
      .appointmentRescheduleById(serviceId, reScheduleData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          handleClosePop();
          setIsNotify(true);
          // setIsRescheduled(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setData((newArr: any) => {
            return {
              ...newArr,
              services: newArr.services.map((el: any) => {
                let status = el.status;
                if (el.id === item.data.data.id) {
                  status = item.data.data.status;
                }
                return { ...el, status };
              }),
            };
          });
        } else {
          const timePattern = /\b\d{2}:\d{2}\b/g;
          const times = item.data.message.match(timePattern);
          if (times) {
            let updatedText = item.data.message;
            times.forEach((time: any) => {
              const newTime = dayjs(`2024-07-23T${time}:00`)
                .add(5, 'hour')
                .format('hh:mm A');

              updatedText = updatedText.replace(time, newTime);
            });
            setIsNotify(true);
            setNotifyMessage({
              text: updatedText,
              type: 'error',
            });
          } else {
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
          setIsLoader(false);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const onDeleteAppointment = async (appointmentId: string) => {
    // console.log('🚀 ~ onDeleteAppointment ~ appointmentId:', appointmentId);
    try {
      setIsLoader(true);
      const [deleteStatusResponse] = await Promise.all([
        storeAppointmentService.appointmentCancelled(appointmentId),
      ]);
      if (deleteStatusResponse.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: deleteStatusResponse.data.message,
          type: 'success',
        });
        setData((newObj: any) => {
          return {
            ...newObj,
            services: newObj.services.map((el: any) => {
              if (el.id === deleteStatusResponse.data.data.id) {
                el.status = deleteStatusResponse.data.data.status;
              }
              return el;
            }),
          };
        });
      } else {
        // throw new Error(paidStatusResponse.data.message);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: deleteStatusResponse.data.message,
          type: 'error',
        });
      }
    } catch (error: Error | any) {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: error.message,
        type: 'error',
      });
    }
  };

  const updateAppointment = async (updateAppointmentData: any) => {
    setIsLoader(true);
    const appId = updateAppointmentData.id;
    delete updateAppointmentData.id;
    await storeAppointmentService
      .appointmentUpdate(appId, updateAppointmentData)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          setData((newObj: any) => {
            return {
              ...newObj,
              services: newObj.services.map((el: any) => {
                if (el.id === res.data.data.id) {
                  el.name = res.data.data.name;
                  el.phone = res.data.data.phone;
                  el.email = res.data.data.email;
                  el.gender = res.data.data.gender;
                  el.note = res.data.data.note;
                }
                return el;
              }),
            };
          });
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: any) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const getDataById = (updateAppointmentId: string) => {
    const appointmentData = data?.services?.find(
      (item: any) => item.id === updateAppointmentId
    );
    // console.log('🚀 ~ getDataById ~ appointmentData:', appointmentData);
    setAppointmentDataById(appointmentData);
  };

  const isStatusProcess = async (appointmentId: string) => {
    try {
      setStatusLoader(true);
      const [statusResponse] = await Promise.all([
        storeAppointmentService.appointmentProcessing(appointmentId),
      ]);
      if (statusResponse.data.success) {
        setStatusLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: statusResponse.data.message,
          type: 'success',
        });
        setAllAppointments((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === appointmentId) {
              item.status = statusResponse.data.data.status;
            }
            return item;
          });
        });
        setData((newObj: any) => {
          return {
            ...newObj,
            services: newObj.services.map((el: any) => {
              if (el.id === statusResponse.data.data.id) {
                el.status = statusResponse.data.data.status;
              }
              return el;
            }),
          };
        });
      } else {
        setStatusLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: statusResponse.data.message,
          type: 'error',
        });
      }
    } catch (error: Error | any) {
      setStatusLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: error.message,
        type: 'error',
      });
    }
  };

  // const isStatusDone = async (appointmentId: string) => {
  //   try {
  //     setDoneStatusLoader(true);
  //     const [statusResponse] = await Promise.all([
  //       storeAppointmentService.appointmentPaid(appointmentId),
  //     ]);
  //     if (statusResponse.data.success) {
  //       setDoneStatusLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: statusResponse.data.message,
  //         type: 'success',
  //       });
  //       setData((newObj: any) => {
  //         return {
  //           ...newObj,
  //           status: statusResponse.data.data.status,
  //           services: newObj.services.map((el: any) => {
  //             if (el.id === statusResponse.data.data.id) {
  //               el.status = statusResponse.data.data.status;
  //             }
  //             return el;
  //           }),
  //         };
  //       });
  //     } else {
  //       // throw new Error(paidStatusResponse.data.message);
  //       setDoneStatusLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: statusResponse.data.message,
  //         type: 'error',
  //       });
  //     }
  //   } catch (error: Error | any) {
  //     setDoneStatusLoader(false);
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: error.message,
  //       type: 'error',
  //     });
  //   }
  // };

  const getStatusColor = (status: string) => {
    if (statusLoader) return `bg-white`;
    if (status === APPOINTMENT_STATUS.NEW) return `bg-slate-300`;
    if (status === APPOINTMENT_STATUS.PROCESSING) return `bg-yellow-200`;
    if (status === APPOINTMENT_STATUS.DONE) return `bg-green-400`;
    return false;
  };

  const statusCancelHandler = () => {
    onDeleteAppointment(serviceId);
  };

  return (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="max-h-[250px]">
        {data?.services?.length > 0 ? (
          data?.services?.map((item: any, index: number) => {
            const date = dayjs(item.appointmentTime);
            const formattedDateTime = dayjs(date).format('h:mm A');
            //   const date2 = date.add(item.serviceTime, 'minute');
            //   const formattedDate2 = date2.format('h:mm:ss A');
            return (
              <div key={index}>
                <Accordion
                  key={index}
                  className="boxShadow bg-transparent"
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className="flex w-full items-center justify-between">
                      <Typography
                        className="flex-grow-1 truncate font-semibold"
                        sx={{ width: '50%', flexShrink: 0 }}
                      >
                        <div className="flex items-center">
                          <img
                            className="ml-[-1px] h-[30px] w-[30px] rounded-full object-contain"
                            src={
                              item.storeEmployee?.avatar !== null
                                ? item.storeEmployee?.avatar
                                : assets.images.appProfile
                            }
                            alt="app-head"
                          />
                          <div className="flex items-center px-1">
                            <StarIcon className="text-base text-inherit text-yellow-500" />{' '}
                            <span className="px-[2px] font-semibold">{`${item.rating}`}</span>
                          </div>
                        </div>
                        <div>
                          <span className="capitalize">
                            {item?.storeEmployee?.name}
                          </span>
                        </div>
                        {/* {item.name} */}
                      </Typography>
                      <Typography
                        className="flex-grow-2 flex items-end justify-end text-[12px]"
                        sx={{ width: '50%', flexShrink: 0 }}
                      >
                        {formattedDateTime}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="m-4 rounded border-[1px] border-[#949EAE]">
                    <div className="mb-2 flex items-center justify-between">
                      {item?.status !== APPOINTMENT_STATUS.NEW &&
                      item?.status !== APPOINTMENT_STATUS.PROCESSING &&
                      item?.status !== APPOINTMENT_STATUS.DONE ? (
                        <div className="mt-3">
                          <span
                            className={`${
                              item?.status === APPOINTMENT_STATUS.MISSED ||
                              item?.status === APPOINTMENT_STATUS.CANCELLED
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-200'
                            } rounded px-2 py-1 text-sm`}
                          >
                            {item?.status === APPOINTMENT_STATUS.COMPLETED
                              ? 'Completed'
                              : item?.status === APPOINTMENT_STATUS.MISSED
                              ? 'Missed'
                              : item?.status === APPOINTMENT_STATUS.CANCELLED
                              ? 'Cancelled'
                              : item?.status === APPOINTMENT_STATUS.RESCHEDULE
                              ? 'Rescheduled'
                              : ''}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => {
                              // setIsTooltipOpen(false);
                              if (item?.status === APPOINTMENT_STATUS.NEW) {
                                isStatusProcess(item.id);
                              } else if (
                                item?.status === APPOINTMENT_STATUS.DONE
                              ) {
                                setIsNotify(true);
                                setNotifyMessage({
                                  text: 'This Service has been done',
                                  type: 'success',
                                });
                              }
                            }}
                            className={`mt-3 flex w-[40%] cursor-pointer items-center justify-center rounded p-1 
                            ${getStatusColor(item?.status)} ${
                              item?.status === APPOINTMENT_STATUS.PROCESSING
                                ? 'cursor-default'
                                : 'cursor-pointer'
                            } shadow`}
                          >
                            <IconButton
                              size="small"
                              name="status"
                              disabled={
                                statusLoader ||
                                item?.status === APPOINTMENT_STATUS.DONE ||
                                item?.status === APPOINTMENT_STATUS.PROCESSING
                              }
                              className="icon-btn mx-[0px] p-0"
                              // onClick={() => isStatusDone(appointmentData.id)}
                            >
                              {statusLoader ? (
                                ''
                              ) : item?.status === APPOINTMENT_STATUS.NEW ? (
                                <AccessTimeOutlinedIcon fontSize="small" />
                              ) : (
                                item?.status ===
                                  APPOINTMENT_STATUS.PROCESSING && (
                                  // <InfoOutlinedIcon fontSize="small" />
                                  <UpdateOutlinedIcon fontSize="small" />
                                )
                              )}
                              {/* // : ( */}
                              {/* //   item?.status === APPOINTMENT_STATUS.DONE && ( */}
                              {/* //     // <InfoOutlinedIcon fontSize="small" /> */}
                              {/* //     <CheckCircleOutlineIcon fontSize="small" /> */}
                              {/* //   ) */}
                              {/* )} */}
                            </IconButton>
                            <span className="flex justify-center px-[1px] text-sm">
                              {statusLoader ? (
                                <CircularProgress size={15} color="inherit" />
                              ) : item?.status === APPOINTMENT_STATUS.NEW ? (
                                'Process'
                              ) : item?.status ===
                                APPOINTMENT_STATUS.PROCESSING ? (
                                'Processing'
                              ) : item?.status === APPOINTMENT_STATUS.DONE ? (
                                'Done'
                              ) : (
                                ''
                              )}
                            </span>
                          </div>
                          {/* {item?.status === APPOINTMENT_STATUS.PROCESSING && (
                            <div
                              className={`mt-3 flex w-[19%] cursor-pointer items-center justify-center rounded bg-green-500 
                            p-1 shadow`}
                              onClick={() => {
                                if (
                                  item?.status === APPOINTMENT_STATUS.PROCESSING
                                ) {
                                  isStatusDone(item.id);
                                }
                              }}
                            >
                              <IconButton
                                size="small"
                                name="status"
                                disabled={
                                  doneStatusLoader ||
                                  item?.status === APPOINTMENT_STATUS.PROCESSING
                                }
                                className="icon-btn mx-[0px] p-0"
                              />
                              <span className="flex justify-center text-sm">
                                {doneStatusLoader ? (
                                  <CircularProgress size={15} color="inherit" />
                                ) : (
                                  'Done'
                                )}
                              </span>
                            </div>
                          )} */}
                        </>
                      )}
                      <div>
                        <IconButton
                          disabled={
                            item?.status === APPOINTMENT_STATUS.CANCELLED ||
                            item?.status === APPOINTMENT_STATUS.COMPLETED ||
                            item?.status === APPOINTMENT_STATUS.DONE ||
                            item?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                            item?.status === APPOINTMENT_STATUS.PROCESSING ||
                            item?.status === APPOINTMENT_STATUS.MISSED
                          }
                          className="icon-btn mr-1.5 mt-3 p-0 text-primary"
                          onClick={() => {
                            if (
                              listingRolePermission(
                                dataRole,
                                ALL_PERMISSIONS.storeAppointment.editAppointment
                              )
                            ) {
                              setOpenEditFormDialog(true);
                              getDataById(item.id);
                            } else {
                              setIsNotify(true);
                              setNotifyMessage({
                                text: 'You are not authorized to view this page.',
                                type: 'error',
                              });
                            }
                          }}
                          // onClick={() => {
                          //   setOpenFormDialog(true);
                          //   setIsTooltipOpen(false);
                          //   getUpdatePopupData(data);
                          // }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={
                            item?.status === APPOINTMENT_STATUS.CANCELLED ||
                            item?.status === APPOINTMENT_STATUS.COMPLETED ||
                            item?.status === APPOINTMENT_STATUS.DONE ||
                            item?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                            item?.status === APPOINTMENT_STATUS.PROCESSING ||
                            item?.status === APPOINTMENT_STATUS.MISSED
                          }
                          className="icon-btn mr-1.5 mt-3 p-0 text-primary"
                          onClick={() => {
                            if (
                              listingRolePermission(
                                dataRole,
                                ALL_PERMISSIONS.storeAppointment.editAppointment
                              )
                            ) {
                              setServiceId(item.id);
                              setCancelDialogOpen(true);
                            } else {
                              setIsNotify(true);
                              setNotifyMessage({
                                text: 'You are not authorized to view this page.',
                                type: 'error',
                              });
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          disabled={
                            item?.status === APPOINTMENT_STATUS.CANCELLED ||
                            item?.status === APPOINTMENT_STATUS.COMPLETED ||
                            item?.status === APPOINTMENT_STATUS.DONE ||
                            item?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                            item?.status === APPOINTMENT_STATUS.PROCESSING ||
                            item?.status === APPOINTMENT_STATUS.MISSED
                          }
                          name="Reschedule"
                          className="icon-btn mr-1.5 mt-3 p-0 text-primary"
                          onClick={(e) => {
                            if (
                              listingRolePermission(
                                dataRole,
                                ALL_PERMISSIONS.storeAppointment.editAppointment
                              )
                            ) {
                              handleClickPop(e, item.id);
                            } else {
                              setIsNotify(true);
                              setNotifyMessage({
                                text: 'You are not authorized to view this page.',
                                type: 'error',
                              });
                            }
                          }}
                        >
                          <HistoryIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <img src={assets.images.appHead} alt="app-head" />
                      </div>
                      <div>
                        <span className="mx-2 text-xs text-[#6A6A6A]">
                          {item.storeServiceCategoryItem?.name}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center">
                      <div>
                        <img src={assets.images.appCalender} alt="app-head" />
                      </div>
                      <div>
                        <span className="mx-2 text-xs text-[#6A6A6A]">
                          {moment(item?.appointmentTime)?.format(
                            'MMMM DD, YYYY'
                          ) ?? '--'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center">
                      <div>
                        <LocalPhoneOutlinedIcon
                          className="ml-[-2px]"
                          fontSize="inherit"
                        />
                        {/* <img src={assets.images.appCalender} alt="app-head" /> */}
                      </div>
                      <div>
                        <span className="mx-1 text-xs text-[#6A6A6A]">
                          {item.phone ?? '--'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-[1px] flex items-center">
                      <div>
                        <AccessTimeOutlinedIcon
                          className="ml-[-2px]"
                          fontSize="inherit"
                        />
                        {/* <img
                          className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                          src={
                            item.appointmentType !== 'AnyProfessional'
                              ? item.storeEmployee?.avatar
                              : assets.images.avatarUser2
                          }
                          alt="app-head"
                        /> */}
                      </div>
                      <div>
                        <span className="mx-[5px] text-xs text-[#6A6A6A]">
                          {item?.serviceTime} mints
                        </span>
                      </div>
                    </div>
                    <div className="mt-[1px] flex items-center">
                      <div>
                        <img
                          src={assets.images.salaryPayrollImage}
                          alt="salary-payroll"
                          className="mt-1 w-[15px] object-contain"
                        />
                        {/* <AccessTimeOutlinedIcon
                        className="ml-[-2px]"
                        fontSize="inherit"
                      /> */}
                        {/* <img
                          className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                          src={
                            item.appointmentType !== 'AnyProfessional'
                              ? item.storeEmployee?.avatar
                              : assets.images.avatarUser2
                          }
                          alt="app-head"
                        /> */}
                      </div>
                      <div>
                        <span className="mx-[5px] text-xs text-[#6A6A6A]">
                          {Number(
                            item?.storeServiceCategoryItem?.price
                          ).toLocaleString()}{' '}
                          PKR
                        </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Divider />
              </div>
            );
          })
        ) : (
          <div className="flex h-[350px] flex-col items-center justify-center">
            <span className="text-xl font-semibold">Services</span>
            <span>No Record Found</span>
          </div>
        )}
        <ViewCardAccordinReschedule
          id={id}
          open={open}
          anchorEl={anchorEl}
          onclose={handleClosePop}
          isLoader={isLoader}
          callback={onRescheduleSubmit}
        />
        {openEditFormDialog && (
          <UpdateAppointmentPopup
            setIsNotify={setIsNotify}
            setNotifyMessage={setNotifyMessage}
            openFormDialog={openEditFormDialog}
            setOpenFormDialog={setOpenEditFormDialog}
            formData={appointmentDataById}
            callback={updateAppointment}
          />
        )}
        {cancelDialogOpen && (
          <PermissionPopup
            type="shock"
            open={cancelDialogOpen}
            setOpen={setCancelDialogOpen}
            dialogText={dialogText}
            callback={statusCancelHandler}
          />
        )}
      </div>
    </>
  );
}

export default ViewCardAccordin;
