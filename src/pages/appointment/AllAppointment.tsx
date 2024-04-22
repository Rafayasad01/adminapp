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
  // AppointmentContent,
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
import timezone from 'dayjs/plugin/timezone';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useCallback, useEffect, useState } from 'react';
import AppointmentViewCard from '../../components/common/AppointmentViewCard';
import Loader from '../../components/common/Loader';
import SwiperComponent from '../../components/common/Swiper';
import StoreAppointmentService from '../../services/adminapp/adminStoreAppointment';
import UpdateAppointmentPopup from './UpdateAppointmentPopup';

dayjs.extend(weekOfYear);
dayjs.extend(timezone);

// const dateString = '2024-04-02T09:10:00.000Z';
// const dateStrings = '2024-04-02T09:15:00.000Z';
// const date = dayjs(dateString);
// const dates = dayjs(dateStrings);

const newDate = new Date(2018, 4, 28, 9, 30);
// console.log('newDatesdasdsasadsa', newDate);

// const appointments = [
//   {
//     title: 'Website Re-Design Plan',
//     priorityId: 1,
//     startDate: new Date(2018, 4, 28, 9, 30),
//     endDate: new Date(2018, 4, 28, 11, 30),
//     id: 0,
//   },
//   {
//     title: 'Website Re-Design Plan',
//     priorityId: 1,
//     startDate: new Date(2018, 4, 28, 11, 35),
//     endDate: new Date(2018, 4, 28, 12, 0),
//     id: 0,
//   },
// ];

// const users = [
//   { id: 1, name: 'John', profileUrl: assets.images.avatarUser },
//   { id: 2, name: 'Jane Smith', profileUrl: assets.images.avatarUser },
//   { id: 3, name: 'John Martin', profileUrl: assets.images.avatarUser },
//   { id: 4, name: 'Michael H. Tilley', profileUrl: assets.images.avatarUser },
//   { id: 5, name: 'Thomas', profileUrl: assets.images.avatarUser },
//   { id: 6, name: 'Michael', profileUrl: assets.images.avatarUser },
//   { id: 7, name: 'John Johnson', profileUrl: assets.images.avatarUser },
//   { id: 8, name: 'Smith Johnson', profileUrl: assets.images.avatarUser },
//   { id: 9, name: 'Alice Doe', profileUrl: assets.images.avatarUser },
// ];

type Props = {
  priorityData?: any;
  setAppointmentType?: any;
  selectedPriorityData?: any;
  setSelectedPriorityData?: any;
  appointmentType?: any;
};

const AllAppointment = ({
  appointmentType,
  priorityData,
  setAppointmentType,
  setSelectedPriorityData,
  selectedPriorityData,
}: Props) => {
  const [data, setData] = useState<any>([]);
  const [appointmentData, setAppointmentData] = useState();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [appointmentTooltipData, setAppointmentTooltipData] =
    useState<any>(null);
  const [isActiveUser, setIsActiveUser] = useState('all');
  const currentWeek = dayjs().week();
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(true);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const [currentView, setCurrentView] = useState('Week');
  const [ranges, setRange] = useState();

  // console.log('🚀 ~ currentWeek:', currentWeek);
  const groupOrientation = (viewName: any) => viewName.split(' ')[0];
  const grouping = [
    {
      resourceName: 'priorityId',
    },
  ];

  useEffect(() => {
    setIsActiveUser(selectedPriorityData[0]?.text);
  }, [selectedPriorityData]);

  const getAllAppoinments = async (appoDate: any, view: any) => {
    setIsLoader(true);
    StoreAppointmentService.getAllAppointments(appoDate, view)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          const structuredData = res.data.data.map((item: any) => {
            const date = dayjs(item.appointmentTime).tz('Asia/Karachi');
            const year = date.year();
            const month = date.month();
            const day = date.date();
            const hour = date.hour();
            const minute = date.minute();
            const newDate1 = new Date(year, month, day, hour, minute);
            const newDate2 = new Date(year, month, day, hour, minute);
            newDate2.setMinutes(
              newDate2.getMinutes() + Number(item.serviceTime)
            );
            const dateF1 = dayjs(newDate1).tz('Asia/Karachi');
            const dateF2 = dayjs(newDate2).tz('Asia/Karachi');
            const formattedDateWithHour1 = dateF1.format(
              'ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'
            );
            const formattedDateWithHour2 = dateF2.format(
              'ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'
            );

            return {
              // paid: true,
              title: item.name,
              priorityId: item.storeEmployee,
              startDate:
                formattedDateWithHour1 ||
                dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'),
              endDate:
                formattedDateWithHour2 ||
                dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'),
              id: item.id,
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
      .catch((err: any) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    getAllAppoinments(currentWeek, 'week');
  }, [currentWeek]);

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

  // useEffect(() => {
  //   if (appointmentType === "Individual Appointment") {
  //     setIsActiveUser('');
  //   }
  // }, [appointmentType])

  useEffect(() => {
    if (appointmentType === 'All Appointments') {
      setIsActiveUser('all');
    }
  }, [appointmentType]);

  const selectedUser = (name: string) => {
    setIsActiveUser(name);
    setAppointmentType({
      text: 'Individual Appointment',
      icon: PersonOutlinedIcon,
    });
    const res = priorityData?.find((el: any) => el.text === name);
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
          data?.length > 0 ? data[data.length - 1].id + 1 : 0;
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

  const updateAppointmentHandler = async (updateAppointmentData: any) => {
    setIsLoader(true);
    const appId = updateAppointmentData.id;
    delete updateAppointmentData.id;
    await StoreAppointmentService.appointmentUpdate(
      appId,
      updateAppointmentData
    )
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setData((newArr: any) => {
            return newArr.map((item: any) => {
              console.log(item);
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
      .catch((err) => {
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

  const PREFIX = 'Demo';
  // #FOLD_BLOCK
  const classes = {
    flexibleSpace: `${PREFIX}-flexibleSpace`,
    textField: `${PREFIX}-textField`,
    locationSelector: `${PREFIX}-locationSelector`,
    button: `${PREFIX}-button`,
    selectedButton: `${PREFIX}-selectedButton`,
    longButtonText: `${PREFIX}-longButtonText`,
    shortButtonText: `${PREFIX}-shortButtonText`,
    title: `${PREFIX}-title`,
    textContainer: `${PREFIX}-textContainer`,
    time: `${PREFIX}-time`,
    text: `${PREFIX}-text`,
    container: `${PREFIX}-container`,
    weekendCell: `${PREFIX}-weekendCell`,
    weekEnd: `${PREFIX}-weekEnd`,
  };

  const getRange = (date: any, view: any) => {
    // console.log('VIEW', view);
    if (view === 'Month') {
      // const monthNumber = dayjs(date).month() + 1;
      const monthDate = dayjs(date).format('YYYY-MM-DD');
      getAllAppoinments(monthDate, 'month');
      return { startDate: date, endDate: date };
    }
    if (view === 'Week') {
      const firstDay = date.getDate() - date.getDay();
      const lastDay = firstDay + 6;
      const startDate = dayjs(new Date(date.setDate(firstDay)));
      const weekNumber = startDate.week();
      getAllAppoinments(weekNumber, 'week');
      return {
        startDate: new Date(date.setDate(firstDay)),
        endDate: new Date(date.setDate(lastDay)),
      };
    }
    return null;
  };

  const currentViewChange = (newView: any) => {
    const range: any = getRange(currentDate, newView);
    setCurrentView(newView);
    setRange(range);
  };

  const currentDateChange = (newCurrentDate: any) => {
    const range: any = getRange(newCurrentDate, currentView);
    setCurrentDate(newCurrentDate);
    setRange(range);
  };

  return isLoader ? (
    <Loader />
  ) : (
    <Paper>
      <div className="h-16 p-[15px]">
        {priorityData.length ? (
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
          defaultCurrentDate={dayjs().toDate()}
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
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
          startDayHour={0}
          endDayHour={24}
          // excludedDays={[0, 6]}
          displayName="Week"
        />
        <MonthView
        // timeTableCellComponent={DayScaleCell}
        // dayScaleCellComponent={DayScaleCell}
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
        {/* <div>
                    {priorityData?.map((resource: any) => (
                        <ListItem key={resource.id}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={resource.text}
                                    src={resource.imageUrl}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={resource.text} />
                        </ListItem>
                    ))}
                </div> */}
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
