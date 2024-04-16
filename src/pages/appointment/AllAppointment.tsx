import {
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import { styled, alpha } from '@mui/material/styles';
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
import { formatDate } from 'devextreme/localization';
import assets from '../../assets';
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
console.log('newDatesdasdsasadsa', newDate);

const appointments = [
  {
    title: 'Website Re-Design Plan',
    priorityId: 1,
    startDate: new Date(2018, 4, 28, 9, 30),
    endDate: new Date(2018, 4, 28, 11, 30),
    id: 0,
  },
  {
    title: 'Website Re-Design Plan',
    priorityId: 1,
    startDate: new Date(2018, 4, 28, 11, 35),
    endDate: new Date(2018, 4, 28, 12, 0),
    id: 0,
  },
];

const users = [
  { id: 1, name: 'John', profileUrl: assets.images.avatarUser },
  { id: 2, name: 'Jane Smith', profileUrl: assets.images.avatarUser },
  { id: 3, name: 'John Martin', profileUrl: assets.images.avatarUser },
  { id: 4, name: 'Michael H. Tilley', profileUrl: assets.images.avatarUser },
  { id: 5, name: 'Thomas', profileUrl: assets.images.avatarUser },
  { id: 6, name: 'Michael', profileUrl: assets.images.avatarUser },
  { id: 7, name: 'John Johnson', profileUrl: assets.images.avatarUser },
  { id: 8, name: 'Smith Johnson', profileUrl: assets.images.avatarUser },
  { id: 9, name: 'Alice Doe', profileUrl: assets.images.avatarUser },
];

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
  const [data, setData] = useState<any>(appointments);
  const [appointmentData, setAppointmentData] = useState();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [appointmentTooltipData, setAppointmentTooltipData] =
    useState<any>(null);
  const [isActiveUser, setIsActiveUser] = useState('all');
  const currentWeek = dayjs().format('YYYY-MM-DD');
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(true);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const groupOrientation = (viewName: any) => viewName.split(' ')[0];
  const grouping = [
    {
      resourceName: 'priorityId',
    },
  ];

  useEffect(() => {
    setIsLoader(true);
    StoreAppointmentService.getAllAppointments(currentWeek)
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
            const title = `${item.appointmentNumber}. ${item.name}`;
            console.log(
              'date',
              dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)')
            );
            console.log(
              'date',
              dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)')
            );

            return {
              // paid: true,
              title: item.name,
              priorityId: item.storeEmployee,
              startDate: formattedDateWithHour1
                ? formattedDateWithHour1
                : dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'),
              endDate: formattedDateWithHour2
                ? formattedDateWithHour2
                : dayjs().format('ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'),
              id: item.id,
            };
          });
          // const startEndTime = res.data.data.map((el:any)=>{
          //   const date = dayjs(el.appointmentTime).tz('Asia/Karachi');
          //   const hour = date.hour();
          // })
          setData(structuredData);
          setIsLoader(false);
        }
      })
      .catch((err: any) => {
        setIsLoader(false);
      });
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

  // useEffect(() => {
  //   if (appointmentType === "Individual Appointment") {
  //     setIsActiveUser('');
  //   }
  // }, [appointmentType])

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

  const AppointmentContent = ({ style, ...restProps }: any) => {
    if (!restProps.data) {
      return null; // or handle the case where data is undefined
    }
    const startDate = restProps?.data?.startDate;
    const endDate = restProps?.data?.endDate;
    const sdformat = dayjs(startDate);
    const edformat = dayjs(endDate);
    return (
      <Appointments.AppointmentContent className="custom-appo" {...restProps}>
        q
        <div className="w-full">
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="w-[50%] truncate">{restProps?.data?.title}</div>
            <div className="rounded-full">unpaid</div>
          </div>
          <div className="">{`${sdformat.format('HH:mm A')} - ${edformat.format(
            'HH:mm A'
          )}`}</div>
        </div>
      </Appointments.AppointmentContent>
    );
  };

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

  const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
    ({ theme: { palette } }) => ({
      [`&.${classes.weekendCell}`]: {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        '&:hover': {
          backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
          backgroundColor: alpha(palette.action.disabledBackground, 0.04),
        },
      },
    })
  );
  // #FOLD_BLOCK
  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
    ({ theme: { palette } }) => ({
      [`&.${classes.weekEnd}`]: {
        backgroundColor: alpha(palette.action.disabledBackground, 0.06),
      },
    })
  );

  // const isRestTime = (date: any) =>
  //   date.getDay() === 0 ||
  //   date.getDay() === 6 ||
  //   date.getHours() < 9 ||
  //   date.getHours() >= 18;

  // const TimeTableCell = ({ ...restProps }) => {
  //   const { startDate } = restProps;
  //   if (isRestTime(startDate)) {
  //     return (
  //       <StyledWeekViewTimeTableCell
  //         {...restProps}
  //         className={classes.weekendCell}
  //       />
  //     );
  //   }
  //   return <StyledWeekViewTimeTableCell {...restProps} />;
  // };

  // const DayScaleCell = (({ ...restProps }) => {
  //   return <MonthView.TimeTableCell
  //     // startDate={dayjs(dateString)}
  //   />
  // });

  return isLoader ? (
    <Loader />
  ) : (
    <Paper>
      <div className="h-16 p-[15px]">
        <SwiperComponent
          isActiveUser={isActiveUser}
          selectedUser={selectedUser}
          data={priorityData}
        />
      </div>
      <hr />
      <Scheduler data={data} height={580}>
        <ViewState defaultCurrentDate={dayjs().toDate()} />
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
          startDayHour={10}
          endDayHour={22}
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
        <DateNavigator />
        {/* <AppointmentForm /> */}
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
