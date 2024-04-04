import React, { useState, useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import { Avatar, ListItemAvatar, ListItemText, ListItem } from '@mui/material';
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DragDropProvider,
  // AppointmentContent,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import timezone from 'dayjs/plugin/timezone';
import { blue, orange } from '@mui/material/colors';
import assets from '../../assets';
import SwiperComponent from '../../components/common/Swiper';
import AppointmentViewCard from '../../components/common/AppointmentViewCard';
import StoreAppointmentService from '../../services/adminapp/adminStoreAppointment';
import dayjs from 'dayjs';

dayjs.extend(weekOfYear);
dayjs.extend(timezone);

const dateString = '2024-04-02T09:10:00.000Z';
const dateStrings = '2024-04-02T09:15:00.000Z';
const date = dayjs(dateString);
const dates = dayjs(dateStrings);

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
  appointmentType?: string;
};

const AllAppointment = ({
  appointmentType,
  priorityData,
  setAppointmentType,
  setSelectedPriorityData,
  selectedPriorityData,
}: Props) => {
  const [data, setData] = useState(appointments);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [appointmentTooltipData, setAppointmentTooltipData] =
    useState<any>(null);
  const [isActiveUser, setIsActiveUser] = useState('all');
  const currentWeek = dayjs().format('YYYY-MM-DD');

  const groupOrientation = (viewName: any) => viewName.split(' ')[0];
  const grouping = [
    {
      resourceName: 'priorityId',
    },
  ];

  useEffect(() => {
    StoreAppointmentService.getAllAppointments(currentWeek).then((res: any) => {
      if (res.data.success) {
        const structuredData = res.data.data.map((item: any) => {
          const date = dayjs(item.appointmentTime).tz('Asia/Karachi');
          const year = date.year();
          const month = date.month();
          const day = date.date();
          const hour = date.hour();
          const minute = date.minute();
          const newDate1 = new Date(year, month, day, hour, minute);
          const newDate2 = new Date(year, month, day, hour, minute);
          newDate2.setMinutes(newDate2.getMinutes() + Number(item.serviceTime));
          const dateF1 = dayjs(newDate1).tz('Asia/Karachi');
          const dateF2 = dayjs(newDate2).tz('Asia/Karachi');
          const formattedDateWithHour1 = dateF1.format(
            'ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'
          );
          const formattedDateWithHour2 = dateF2.format(
            'ddd MMM DD YYYY h:mm:ss [GMT]ZZ (zz)'
          );
          return {
            title: item.name,
            priorityId: item.storeEmployee,
            startDate: formattedDateWithHour1,
            endDate: formattedDateWithHour2,
            id: item.id,
          };
        });
        // const startEndTime = res.data.data.map((el:any)=>{
        //   const date = dayjs(el.appointmentTime).tz('Asia/Karachi');
        //   const hour = date.hour();
        // })
        setData(structuredData);
        console.log('ALL APPO', structuredData);
      }
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

  const CustomAppointmentContent = ({ appointmentData, ...restProps }: any) => {
    console.log(
      '🚀 ~ CustomAppointmentContent ~ appointmentData:',
      appointmentData,
      restProps
    );
    // Customize the appearance of the appointment based on the appointmentData
    return (
      <div style={{ padding: '5px' }}>
        <div>
          <span>{appointmentData?.title}</span>
        </div>
      </div>
    );
  };

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }: any) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
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

  return (
    <Paper>
      <div className="h-16 p-[15px]">
        <SwiperComponent selectedUser={selectedUser} data={priorityData} />
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
          startDayHour={9}
          endDayHour={16}
          // excludedDays={[0, 6]}
          displayName="Week"
        />
        <MonthView />

        <Appointments />
        <Resources data={resources} mainResourceName="priorityId" />

        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip
          headerComponent={(props) => <AppointmentTooltip.Header {...props} />}
          contentComponent={(props) => (
            <div>
              <AppointmentViewCard
                {...(isTooltipOpen ? props : null)}
                setAppointmentTooltipData={setAppointmentTooltipData}
                setIsTooltipOpen={setIsTooltipOpen}
                isTooltipOpen={isTooltipOpen}
              />
            </div>
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
    </Paper>
  );
};

export default AllAppointment;
