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
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import Loader from '../../components/common/Loader';
import SwiperComponent from '../../components/common/Swiper';
// import { useAppSelector } from '../../redux/redux-hooks';
import Notify from '../../components/common/Notify';
import { useAppSelector } from '../../redux/redux-hooks';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import AppointmentViewCard from './AppointmentViewCard';
import UpdateAppointmentPopup from './UpdateAppointmentPopup';

dayjs.extend(weekOfYear);
// dayjs.extend(timezone);

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
  const [appointmentData, setAppointmentData] = useState();
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
  const [, /* appointmentTooltipData */ setAppointmentTooltipData] =
    useState<any>(null);
  const [isActiveUser, setIsActiveUser] = useState('all');
  const currentWeek = dayjs().week();
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(true);
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
    if (view === 'week') setIsLoader(true);
    await storeAppointmentService
      .getAllAppointments(appointmentDate, view)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          const structuredData = res.data.data.map((item: any) => {
            // const date = moment(item.appointmentTime);
            const date = dayjs(item.appointmentTime)
              .toISOString()
              .split('.')[0];

            console.log('🚀 DATE:', date);
            const formattedDateTime = dayjs(date).format(
              'ddd MMM DD YYYY h:mm:ss A'
            );

            // moment(date.toString().split('.')[0]).format(
            //   'ddd MMM DD YYYY h:mm:ss A'
            // );

            const parsedDate = dayjs(date);
            const date2 = parsedDate.add(item.serviceTime, 'minute');
            const formattedDate2 = date2.format('ddd MMM DD YYYY h:mm:ss A');

            console.log('🚀 ADD DATE2:', date2);
            // const d1 = formattedDateTime;
            // const d2 = formattedDate2;

            // console.log(
            //   '🚀 ~ structuredData ~ formattedDateTime:',
            //   formattedDateTime
            // );
            // console.log(
            //   '🚀 ~ structuredData ~ formattedDate2:',
            //   formattedDate2
            // );
            // console.log(
            //   '🚀 ~ structuredData ~ date:',
            //   date.format('ddd MMM DD YYYY h:mm:ss A')
            // );
            // const d1split = date.split('.')[0];
            // console.log('🚀 ~ structuredData ~ date one:', d1);
            // console.log('🚀 ~ structuredData ~ date two:', d2);
            // const formattedDateWithHour1 = d1split.format(
            //   'ddd MMM DD YYYY h:mm:ss A'
            // );

            // const newDate2 = date.add(item.serviceTime, 'minute');
            // const formattedDateWithHour2 = newDate2.format(
            //   'ddd MMM DD YYYY h:mm:ss A'
            // );
            return {
              // paid: true,
              title: item.name,
              priorityId: item.storeEmployee,
              startDate:
                formattedDateTime ||
                moment().format('ddd MMM DD YYYY h:mm:ss A'),
              endDate:
                formattedDate2 || moment().format('ddd MMM DD YYYY h:mm:ss A'),
              id: item.id,
              status: item.status,
            };
          });
          // console.log('structuredData', structuredData);
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
  }, []);

  // console.log('selectedPriorityData', selectedPriorityData);
  // [{ startDate: new Date() }]
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

  // console.log('🚀 ~ AllAppointment ~ selectedUser:', priorityData);

  // const CustomAppointmentContent = ({ appointmentData, ...restProps }: any) => {
  //   console.log(
  //     '🚀 ~ CustomAppointmentContent ~ appointmentData:',
  //     appointmentData,
  //     restProps
  //   );
  //   // Customize the appearance of the appointment based on the appointmentData
  //   return (
  //     <div style={{ padding: '5px' }}>
  //       <div>
  //         <span>{appointmentData?.title}</span>
  //       </div>
  //     </div>
  //   );
  // };

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

  const handleVisibilityChange = (visible: any) => {
    if (!visible) {
      setIsTooltipOpen(false);
    } else {
      setIsTooltipOpen(true);
    }
  };

  const getUpdatePopupData = async (updateData: any) => {
    setAppointmentData(updateData);
    //   .then((res: any) => {
    //     if (res.data.success) {
    //       setAppointmentData(res.data.data);
    //     } else {
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: res.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((err: Error) => {
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: err.message,
    //       type: 'error',
    //     });
    //   });
  };

  const deleteAppointmentHandler = async (id: string) => {
    try {
      setIsLoader(true);
      const [deleteStatusResponse] = await Promise.all([
        storeAppointmentService.appointmentCancelled(id),
      ]);
      if (deleteStatusResponse.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: deleteStatusResponse.data.message,
          type: 'success',
        });
        setData((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === deleteStatusResponse.data.data.id) {
              item.status = deleteStatusResponse.data.data.status;
            }
            return { ...item };
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

  const updateAppointmentHandler = async (updateAppointmentData: any) => {
    setIsLoader(true);
    const appId = updateAppointmentData.id;
    delete updateAppointmentData.id;
    await storeAppointmentService
      .appointmentUpdate(appId, updateAppointmentData)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          setData((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === res.data.data.id) {
                item.title = res.data.data.name;
              }
              return { ...item };
            });
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

  // const AppointmentContent = ({ style, ...restProps }: any) => {
  //   if (!restProps.data) {
  //     return null; // or handle the case where data is undefined
  //   }
  //   const startDate = restProps?.data?.startDate;
  //   const endDate = restProps?.data?.endDate;
  //   const sdformat = dayjs(startDate);
  //   const edformat = dayjs(endDate);
  //   return (
  //     <Appointments.AppointmentContent className="custom-appo" {...restProps}>
  //       q
  //       <div className="w-full">
  //         <div className="flex w-full flex-wrap items-center justify-between">
  //           <div className="w-[50%] truncate">{restProps?.data?.title}</div>
  //           <div className="rounded-full">unpaid</div>
  //         </div>
  //         <div className="">{`${sdformat.format('HH:mm A')} - ${edformat.format(
  //           'HH:mm A'
  //         )}`}</div>
  //       </div>
  //     </Appointments.AppointmentContent>
  //   );
  // };

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
      const weekNumber = startDate.week();
      // console.log('🚀 ~ getRange ~ Week Number:', weekNumber);
      getAllAppointments(weekNumber, 'week');
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
  };

  const currentDateChange = (newCurrentDate: any) => {
    const range: any = getRange(newCurrentDate, currentView);
    setCurrentDate(newCurrentDate);
    setRange(range);
  };

  const isStatusProcessing = async (id: string) => {
    try {
      setIsLoader(true);
      const [processingStatusResponse] = await Promise.all([
        storeAppointmentService.appointmentProcessing(id),
      ]);
      if (processingStatusResponse.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: processingStatusResponse.data.message,
          type: 'success',
        });
        setData((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === processingStatusResponse.data.data.id) {
              item.status = processingStatusResponse.data.data.status;
            }
            return { ...item };
          });
        });
      } else {
        // throw new Error(paidStatusResponse.data.message);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: processingStatusResponse.data.message,
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

  const isStatusDone = async (id: string) => {
    try {
      setIsLoader(true);
      const [statusResponse] = await Promise.all([
        storeAppointmentService.appointmentPaid(id),
      ]);
      if (statusResponse.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: statusResponse.data.message,
          type: 'success',
        });
        setData((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === statusResponse.data.data.id) {
              item.status = statusResponse.data.data.status;
            }
            return { ...item };
          });
        });
      } else {
        // throw new Error(paidStatusResponse.data.message);
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
        {/* <WeekView
          name="Vertical Orientation"
          startDayHour={0}
          endDayHour={16}
          displayName="Week"  
          // excludedDays={[0, 6]}
        /> */}
        <WeekView
          name="Vertical Orientation"
          // startDayHour={23}
          // endDayHour={24}
          startDayHour={shopStartTime < shopEndTime ? shopStartTime : 0}
          endDayHour={shopStartTime > shopEndTime ? 24 : shopEndTime}
          // excludedDays={[0, 6]}
          displayName="Week"
        />
        <MonthView
        // timeTableLayoutComponent={CustomTimeTableLayout}
        // timeTableRowComponent={CustomTimeTableLayout}
        // timeTableCellComponent={CustomTimeTableCell}
        // dayScaleCellComponent={CustomDayScaleCell}
        />
        <Appointments
        // appointmentContentComponent={AppointmentContent}
        />
        <Resources data={resources} mainResourceName="priorityId" />
        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip
          headerComponent={(props) => <AppointmentTooltip.Header {...props} />}
          contentComponent={(props) => (
            // <div>
            <AppointmentViewCard
              {...(isTooltipOpen ? props : null)}
              setAppointmentTooltipData={setAppointmentTooltipData}
              setIsTooltipOpen={setIsTooltipOpen}
              isTooltipOpen={isTooltipOpen}
              setOpenFormDialog={setOpenEditFormDialog}
              getUpdatePopupData={getUpdatePopupData}
              isStatusDone={isStatusDone}
              isStatusProcessing={isStatusProcessing}
              deleteAppointmentHandler={deleteAppointmentHandler}
            />
            // </div>
          )}
          onVisibilityChange={handleVisibilityChange}
          visible={isTooltipOpen}
        />
        <GroupingPanel />
        <Toolbar />
        <ViewSwitcher />
        {/* <AppointmentForm /> */}
        <DateNavigator />
        {/* <DragDropProvider /> */}
        {/* <DateNavigator /> */}
      </Scheduler>
      {openEditFormDialog && (
        <UpdateAppointmentPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={appointmentData}
          callback={updateAppointmentHandler}
        />
      )}
    </Paper>
  );
};

export default AllAppointment;
