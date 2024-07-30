import {
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentTooltip,
  Appointments,
  DateNavigator,
  GroupingPanel,
  MonthView,
  Resources,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
// import moment from 'moment';
import Loader from '../../components/common/Loader';
import SwiperComponent from '../../components/common/Swiper';
// import { useAppSelector } from '../../redux/redux-hooks';
import Notify from '../../components/common/Notify';
import { useAppSelector } from '../../redux/redux-hooks';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import AppointmentViewCard from './AppointmentViewCard';
// import UpdateAppointmentPopup from './UpdateAppointmentPopup';
import { APPOINTMENT_STATUS } from '../../utils/constants';

dayjs.extend(weekOfYear);
// dayjs.extend(timezone);

const MemoizedAppointmentTooltip = memo(AppointmentTooltip);

type AllAppointmentProps = {
  appointmentType?: any;
  priorityData?: any;
  selectedPriorityData?: any;
  setAppointmentType?: any;
  setSelectedPriorityData?: any;
};

const AllAppointment = ({
  appointmentType,
  priorityData,
  selectedPriorityData,
  setAppointmentType,
  setSelectedPriorityData,
}: AllAppointmentProps) => {
  const [data, setData] = useState<any>([]);
  // const [appointmentData, setAppointmentData] = useState();
  const officeTimings = useAppSelector(
    (state) => state?.persistedReducer.appState.UserItems
  );

  const tempShopStartTime = dayjs(officeTimings?.tenantConfig?.officeTimeIn);

  const shopStartTimeIsValid = tempShopStartTime.isValid();

  const shopStartTime = shopStartTimeIsValid ? tempShopStartTime.hour() : 9;

  const tempShopEndTime = dayjs(officeTimings?.tenantConfig?.officeTimeOut);

  const shopEndTimeIsValid = tempShopEndTime.isValid();

  let shopEndTime = shopEndTimeIsValid ? tempShopEndTime.hour() : 9;

  shopEndTime = tempShopEndTime.minute() ? shopEndTime + 1 : shopEndTime;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState('all');
  const currentWeekRef = useRef(dayjs().week());
  const currentMonthRef: any = useRef();
  const currentViewRef = useRef('Vertical Orientation');
  const [currentWeek, setCurrentWeek] = useState<any>(dayjs().week());
  // const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const [currentView, setCurrentView] = useState('Vertical Orientation');
  const [, /* ranges */ setRange] = useState();

  // console.log('🚀 ~ currentWeek:', currentWeek);
  const groupOrientation = (viewName: any) => viewName.split(' ')[0];
  const grouping = [
    {
      resourceName: 'priorityId',
    },
  ];

  useEffect(() => {
    setIsActiveUser(selectedPriorityData[0]?.id);
  }, [selectedPriorityData]);

  const getAllAppointments = async (appointmentDate: any, view: any) => {
    // console.log('🚀 ~ getAllAppointments ~ view:', view);
    if (currentViewRef.current === 'week') setIsLoader(true);
    await storeAppointmentService
      .getAllAppointments(appointmentDate, view)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          const structuredData = res.data.data.map((item: any) => {
            console.log('🚀 ~ structuredData ~ item:', item);
            // const date = moment(item.appointmentTime);
            const date = dayjs(item.appointmentTime);
            const formattedDateTime = dayjs(date).format(
              'ddd MMM DD YYYY h:mm:ss A'
            );
            const date2 = date.add(item.serviceTime, 'minute');
            const formattedDate2 = date2.format('ddd MMM DD YYYY h:mm:ss A');
            return {
              // paid: true,
              title: item.name,
              priorityId: item.storeEmployee,
              startDate:
                formattedDateTime ||
                dayjs().format('ddd MMM DD YYYY h:mm:ss A'),
              endDate:
                formattedDate2 || dayjs().format('ddd MMM DD YYYY h:mm:ss A'),
              id: item.id,
              status: item.status,
            };
          });
          setData(structuredData);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((error: any) => {
        // console.error(`useEffect -> error:`, error);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    getAllAppointments(currentWeek, 'week');
    const intervalId = setInterval(() => {
      getAllAppointments(
        currentViewRef.current === 'Month'
          ? currentMonthRef.current
          : currentWeekRef.current,
        currentViewRef.current === 'Month' ? 'Month' : 'week'
      );
    }, 600000);
    return () => clearInterval(intervalId);
  }, []);

  const resources: any = [
    {
      fieldName: 'priorityId',
      title: 'Priority',
      instances:
        appointmentType === 'All Appointments'
          ? priorityData
          : selectedPriorityData,
    },
  ];

  useEffect(() => {
    if (appointmentType === 'All Appointments') {
      setIsActiveUser('all');
      setCurrentView('Vertical Orientation');
    }
  }, [appointmentType]);

  const selectedUser = (name: string) => {
    setIsActiveUser(name);
    setAppointmentType({
      text: 'Individual Appointment',
      icon: PersonOutlinedIcon,
    });
    const res = priorityData?.find((el: any) => el.id === name);
    const tempPriority =
      res === undefined ? [{ startDate: new Date() }] : [res];
    setSelectedPriorityData(tempPriority);
  };

  const onCommitChanges: any = useCallback(
    ({ added, changed, deleted }: any) => {
      if (added) {
        const startingAddedId: any =
          data?.length > 0 ? data[data?.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data?.map((appointment: any) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment: any) => appointment.id !== deleted));
      }
    },
    [setData, data]
  );

  // const getUpdatePopupData = async (updateData: any) => {
  //   // setAppointmentData(updateData);
  // };

  const deleteAppointmentHandler = async (code: string) => {
    // console.log('🚀 ~ deleteAppointmentHandler ~ code:', code);
    setIsLoader(true);
    try {
      const deleteStatusResponse =
        await storeAppointmentService.appointmentAllCancelled(code);
      if (deleteStatusResponse.data.success) {
        console.log(
          '🚀 ~ deleteAppointmentHandler ~ deleteStatusResponse:',
          deleteStatusResponse
        );
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: deleteStatusResponse.data.message,
          type: 'success',
        });
        setData((newArr: any) => {
          return newArr.map((el: any) => {
            const findData = deleteStatusResponse.data.data.find(
              (it: any) => it.id === el.id
            );
            if (findData && findData.id === el.id) {
              el.status = APPOINTMENT_STATUS.CANCELLED;
            }
            return el;
          });
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
      // setIsLoader(false);
    } catch (error: Error | any) {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: error.message,
        type: 'error',
      });
    }
  };

  // const updateAppointmentHandler = async (updateAppointmentData: any) => {
  //   setIsLoader(true);
  //   const appId = updateAppointmentData.id;
  //   delete updateAppointmentData.id;
  //   await storeAppointmentService
  //     .appointmentUpdate(appId, updateAppointmentData)
  //     .then((res: any) => {
  //       if (res.data.success) {
  //         setIsLoader(false);
  //         setData((newArr: any) => {
  //           return newArr.map((item: any) => {
  //             if (item.id === res.data.data.id) {
  //               item.title = res.data.data.name;
  //             }
  //             return { ...item };
  //           });
  //         });
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: res.data.message,
  //           type: 'success',
  //         });
  //       } else {
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: res.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err: any) => {
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  const appColor = (status: any) => {
    if (status === APPOINTMENT_STATUS.NEW) {
      return 'bg-blue-700';
    }
    if (status === APPOINTMENT_STATUS.PROCESSING) {
      return 'bg-gray-600';
    }
    if (status === APPOINTMENT_STATUS.COMPLETED) {
      return 'bg-green-700';
    }
    if (status === APPOINTMENT_STATUS.DONE) {
      return 'bg-yellow-600';
    }
    if (status === APPOINTMENT_STATUS.RESCHEDULE) {
      return 'bg-red-700';
    }
    if (
      status === APPOINTMENT_STATUS.CANCELLED ||
      status === APPOINTMENT_STATUS.MISSED
    ) {
      return 'bg-red-700';
    }
    return null;
  };

  const AppointmentContent = ({ ...restProps }: any) => {
    if (!restProps.data) {
      return null; // or handle the case where data is undefined
    }
    // console.log('🚀 ~ AppointmentContent ~ restProps:', restProps.data);
    const startDate = restProps?.data?.startDate;
    const endDate = restProps?.data?.endDate;
    const sdformat = dayjs(startDate);
    const edformat = dayjs(endDate);
    return (
      <Appointments.AppointmentContent
        className={`custom-appo ${appColor(restProps.data.status)}`}
        {...restProps}
      >
        <div className="w-full">
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="w-[50%] truncate">{restProps?.data?.title}</div>
          </div>
          <div className="">{`${sdformat.format('hh:mm A')} - ${edformat.format(
            'hh:mm A'
          )}`}</div>
        </div>
      </Appointments.AppointmentContent>
    );
  };

  const getRange = (date: any, view: any) => {
    if (view === 'Month') {
      setAppointmentType({
        text: 'Individual Appointment',
        icon: PersonOutlinedIcon,
      });
      setSelectedPriorityData([priorityData[0] ?? {}]);
      // const monthNumber = dayjs(date).month() + 1;
      // console.log('🚀 ~ getRange ~ Month Date:', view, date);
      const monthDate = dayjs(date).format('YYYY-MM-DD');
      getAllAppointments(monthDate, 'month');
      currentMonthRef.current = monthDate;
      // return { startDate: date, endDate: date };
    }
    if (view === 'Week' || view === 'Vertical Orientation') {
      setAppointmentType({
        text: 'All Appointments',
        icon: PersonOutlinedIcon,
      });
      const firstDay = date.getDate() - date.getDay();
      const lastDay = firstDay + 6;
      const startDate = dayjs(new Date(date.setDate(firstDay)));
      const weekNumber: any = startDate.week();
      // console.log('🚀 ~ getRange ~ Week Number:', weekNumber);
      getAllAppointments(weekNumber, 'week');
      setCurrentWeek(weekNumber);
      currentWeekRef.current = weekNumber;
      return {
        startDate: new Date(date.setDate(firstDay)),
        endDate: new Date(date.setDate(lastDay)),
      };
    }
    return null;
  };

  const currentViewChange = (newView: any) => {
    if (newView === 'Vertical Orientation') {
      newView = 'Week';
    }
    const range: any = getRange(currentDate, newView);
    setCurrentView(newView);
    setRange(range);
    currentViewRef.current = newView;
    console.log('🚀 ~ currentViewChange ~ newView:', newView);
  };

  const currentDateChange = (newCurrentDate: any) => {
    console.log('hi');
    setIsLoader(true);
    const range: any = getRange(newCurrentDate, currentView);
    setCurrentDate(newCurrentDate);
    setRange(range);
  };

  // const isStatusProcessing = async (id: string) => {
  //   try {
  //     setIsLoader(true);
  //     const [processingStatusResponse] = await Promise.all([
  //       storeAppointmentService.appointmentProcessing(id),
  //     ]);
  //     if (processingStatusResponse.data.success) {
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: processingStatusResponse.data.message,
  //         type: 'success',
  //       });
  //       setData((newArr: any) => {
  //         return newArr.map((item: any) => {
  //           if (item.id === processingStatusResponse.data.data.id) {
  //             item.status = processingStatusResponse.data.data.status;
  //           }
  //           return { ...item };
  //         });
  //       });
  //     } else {
  //       // throw new Error(paidStatusResponse.data.message);
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: processingStatusResponse.data.message,
  //         type: 'error',
  //       });
  //     }
  //     // setIsLoader(false);
  //   } catch (error: Error | any) {
  //     setIsLoader(false);
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: error.message,
  //       type: 'error',
  //     });
  //   }
  // };

  const isStatusDone = async (code: string) => {
    setIsLoader(true);
    try {
      const [statusResponse] = await Promise.all([
        storeAppointmentService.appointmentPaidAll(code),
      ]);
      if (statusResponse.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: statusResponse.data.message,
          type: 'success',
        });
        setData((newArr: any) => {
          return newArr.map((el: any) => {
            const findData = statusResponse.data.data.find(
              (it: any) => it.id === el.id
            );
            if (findData && findData.id === el.id) {
              el.status = APPOINTMENT_STATUS.DONE;
            }
            return el;
          });
        });
        // setData((newArr: any) => {
        //   return newArr.map((item: any) => {
        //     if (item.id === statusResponse.data.data.id) {
        //       item.status = statusResponse.data.data.status;
        //     }
        //     return { ...item };
        //   });
        // });
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: statusResponse.data.message,
          type: 'error',
        });
      }
      // setIsLoader(false);
    } catch (error: Error | any) {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: error.message,
        type: 'error',
      });
    }
  };

  const CustomNavigationButton = (props: any) => {
    console.log(props);
    return <DateNavigator.NavigationButton className="hidden" {...props} />;
  };

  return isLoader ? (
    <Loader />
  ) : (
    <Paper>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="h-16 p-[15px]">
        {priorityData?.length ? (
          <SwiperComponent
            isActiveUser={isActiveUser}
            selectedUser={selectedUser}
            data={priorityData}
          />
        ) : null}
      </div>
      <hr />
      <Scheduler data={data} height={580}>
        <span className="absolute left-[10px] top-[80px]">
          <CalendarMonthIcon className="text-primary" />
        </span>
        <ViewState
          defaultCurrentViewName={currentView}
          defaultCurrentDate={dayjs().toDate()}
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
          currentViewName={currentView}
          onCurrentViewNameChange={currentViewChange}
        />
        <EditingState onCommitChanges={onCommitChanges} />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
        />
        <WeekView
          name="Vertical Orientation"
          startDayHour={shopStartTime < shopEndTime ? shopStartTime : 0}
          endDayHour={shopStartTime > shopEndTime ? 24 : shopEndTime}
          displayName="Week"
        />
        <MonthView />
        <Appointments appointmentContentComponent={AppointmentContent} />
        <Resources data={resources} mainResourceName="priorityId" />
        <IntegratedGrouping />
        <IntegratedEditing />
        <MemoizedAppointmentTooltip
          showCloseButton
          contentComponent={(props) => (
            <div>
              <AppointmentViewCard
                {...props}
                setIsTooltipOpen={setIsTooltipOpen}
                isTooltipOpen={isTooltipOpen}
                // setOpenFormDialog={setOpenEditFormDialog}
                // getUpdatePopupData={getUpdatePopupData}
                isStatusDone={isStatusDone}
                // isStatusProcessing={isStatusProcessing}
                deleteAppointmentHandler={deleteAppointmentHandler}
              />
              {/* )} */}
            </div>
          )}
        />
        <GroupingPanel />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator navigationButtonComponent={CustomNavigationButton} />
      </Scheduler>
      {/* {openEditFormDialog && (
        <UpdateAppointmentPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={appointmentData}
          callback={updateAppointmentHandler}
        />
      )} */}
    </Paper>
  );
};

export default AllAppointment;
