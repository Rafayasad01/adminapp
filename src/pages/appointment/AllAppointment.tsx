import React, { useState, useCallback } from 'react';
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
import { blue, orange } from '@mui/material/colors';
import assets from '../../assets';
import SwiperComponent from '../../components/common/Swiper';
import AppointmentViewCard from '../../components/common/AppointmentViewCard';

const appointments = [
  {
    title: 'Website Re-Design Plan',
    priorityId: 2,
    startDate: new Date(2018, 3, 30, 9, 30),
    endDate: new Date(2018, 4, 3, 11, 30),
    id: 0,
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    priorityId: 1,
    startDate: new Date(2018, 4, 10, 10, 0),
    endDate: new Date(2018, 4, 10, 12, 0),
    id: 1,
  },
  {
    title: 'Install New Router in Dev Room',
    priorityId: 3,
    startDate: new Date(2018, 4, 7, 13),
    endDate: new Date(2018, 4, 7, 15, 30),
    id: 2,
  },
  {
    title: 'New Brochures',
    priorityId: 2,
    startDate: new Date(2018, 4, 7, 13, 0),
    endDate: new Date(2018, 4, 7, 15, 15),
    id: 5,
  },
  {
    title: 'Install New Database',
    priorityId: 1,
    startDate: new Date(2018, 4, 8, 9),
    endDate: new Date(2018, 4, 8, 12, 15),
    id: 6,
  },
  {
    title: 'Approve New Online Marketing Strategy',
    priorityId: 3,
    startDate: new Date(2018, 4, 9, 12, 0),
    endDate: new Date(2018, 4, 9, 14, 0),
    id: 7,
  },
  {
    title: 'Upgrade Personal Computers',
    priorityId: 1,
    startDate: new Date(2018, 4, 7, 9),
    endDate: new Date(2018, 4, 7, 11, 30),
    id: 8,
  },
  {
    title: 'Prepare 2018 Marketing Plan',
    priorityId: 2,
    startDate: new Date(2018, 4, 10, 11, 0),
    endDate: new Date(2018, 4, 10, 13, 30),
    id: 9,
  },
  {
    title: 'Brochure Design Review',
    priorityId: 3,
    startDate: new Date(2018, 4, 9, 11, 0),
    endDate: new Date(2018, 4, 9, 13, 30),
    id: 10,
  },
  {
    title: 'Upgrade Server Hardware',
    priorityId: 1,
    startDate: new Date(2018, 4, 11, 9, 0),
    endDate: new Date(2018, 4, 11, 15, 0),
    id: 11,
  },
  {
    title: 'Submit New Website Design',
    priorityId: 2,
    startDate: new Date(2018, 4, 11, 16, 30),
    endDate: new Date(2018, 4, 11, 18, 0),
    id: 12,
  },
  {
    title: 'Launch New Website',
    priorityId: 3,
    startDate: new Date(2018, 4, 11, 12, 20),
    endDate: new Date(2018, 4, 11, 14, 0),
    id: 13,
  },
  {
    title: 'Google AdWords Strategy',
    priorityId: 1,
    startDate: new Date(2018, 4, 14, 9, 0, 0),
    endDate: new Date(2018, 4, 14, 12, 0, 0),
    id: 14,
  },
  {
    title: 'Rollout of New Website and Marketing Brochures',
    priorityId: 1,
    startDate: new Date(2018, 4, 14, 13, 0, 0),
    endDate: new Date(2018, 4, 14, 15, 30, 0),
    id: 15,
  },
  {
    title: 'Non-Compete Agreements',
    priorityId: 3,
    startDate: new Date(2018, 4, 15, 13, 0, 0),
    endDate: new Date(2018, 4, 15, 15, 45, 0),
    id: 16,
  },
  {
    title: 'Approve Hiring of John Jeffers',
    priorityId: 2,
    startDate: new Date(2018, 4, 15, 9, 0, 0),
    endDate: new Date(2018, 4, 15, 12, 0, 0),
    id: 17,
  },
  {
    title: 'Update NDA Agreement',
    priorityId: 1,
    startDate: new Date(2018, 4, 15, 11, 0, 0),
    endDate: new Date(2018, 4, 15, 14, 15, 0),
    id: 18,
  },
  {
    title: 'Submit Signed NDA',
    priorityId: 3,
    startDate: new Date(2018, 4, 16, 13, 0, 0),
    endDate: new Date(2018, 4, 16, 15, 0, 0),
    id: 21,
  },
  {
    title: 'Review Revenue Projections',
    priorityId: 2,
    startDate: new Date(2018, 4, 16, 11, 0, 0),
    endDate: new Date(2018, 4, 16, 14, 0, 0),
    id: 22,
  },
  {
    title: 'Comment on Revenue Projections',
    priorityId: 2,
    startDate: new Date(2018, 4, 14, 10, 0, 0),
    endDate: new Date(2018, 4, 14, 13, 0, 0),
    id: 23,
  },
  {
    title: 'Provide New Health Insurance Docs',
    priorityId: 3,
    startDate: new Date(2018, 4, 18, 12, 0, 0),
    endDate: new Date(2018, 4, 18, 15, 0, 0),
    id: 24,
  },
  {
    title: 'Review Changes to Health Insurance Coverage',
    priorityId: 2,
    startDate: new Date(2018, 4, 17, 9, 0, 0),
    endDate: new Date(2018, 4, 17, 13, 0, 0),
    id: 25,
  },
  {
    title: 'Review Training Course for any Ommissions',
    priorityId: 1,
    startDate: new Date(2018, 4, 17, 11, 0, 0),
    endDate: new Date(2018, 4, 17, 14, 0, 0),
    id: 26,
  },
  {
    title: 'Website Re-Design Plan',
    priorityId: 3,
    startDate: new Date(2018, 4, 21, 9, 30),
    endDate: new Date(2018, 4, 21, 11, 30),
    id: 27,
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    priorityId: 1,
    startDate: new Date(2018, 4, 24, 10, 0),
    endDate: new Date(2018, 4, 24, 12, 0),
    id: 28,
  },
  {
    title: 'Install New Router in Dev Room',
    priorityId: 1,
    startDate: new Date(2018, 4, 21, 13),
    endDate: new Date(2018, 4, 21, 15, 30),
    id: 29,
  },
  {
    title: 'Approve Personal Computer Upgrade Plan',
    priorityId: 3,
    startDate: new Date(2018, 4, 22, 10, 0),
    endDate: new Date(2018, 4, 22, 11, 0),
    id: 30,
  },
  {
    title: 'Final Budget Review',
    priorityId: 2,
    startDate: new Date(2018, 4, 22, 12, 0),
    endDate: new Date(2018, 4, 22, 13, 35),
    id: 31,
  },
  {
    title: 'New Brochures',
    priorityId: 2,
    startDate: new Date(2018, 4, 21, 13, 0),
    endDate: new Date(2018, 4, 21, 15, 15),
    id: 32,
  },
  {
    title: 'Install New Database',
    priorityId: 3,
    startDate: new Date(2018, 4, 22, 9),
    endDate: new Date(2018, 4, 22, 12, 15),
    id: 33,
  },
  {
    title: 'Approve New Online Marketing Strategy',
    priorityId: 2,
    startDate: new Date(2018, 4, 23, 12, 0),
    endDate: new Date(2018, 4, 23, 14, 0),
    id: 34,
  },
  {
    title: 'Upgrade Personal Computers',
    priorityId: 1,
    startDate: new Date(2018, 4, 21, 9),
    endDate: new Date(2018, 4, 21, 11, 30),
    id: 35,
  },
  {
    title: 'Prepare 2018 Marketing Plan',
    priorityId: 3,
    startDate: new Date(2018, 4, 24, 11, 0),
    endDate: new Date(2018, 4, 24, 13, 30),
    id: 36,
  },
  {
    title: 'Brochure Design Review',
    priorityId: 1,
    startDate: new Date(2018, 4, 23, 11, 0),
    endDate: new Date(2018, 4, 23, 13, 30),
    id: 37,
  },
  {
    title: 'Create Icons for Website',
    priorityId: 2,
    startDate: new Date(2018, 4, 25, 10, 0),
    endDate: new Date(2018, 4, 25, 11, 30),
    id: 38,
  },
  {
    title: 'Upgrade Server Hardware',
    priorityId: 1,
    startDate: new Date(2018, 4, 25, 9, 0),
    endDate: new Date(2018, 4, 25, 15, 0),
    id: 39,
  },
  {
    title: 'Submit New Website Design',
    priorityId: 3,
    startDate: new Date(2018, 4, 25, 16, 30),
    endDate: new Date(2018, 4, 25, 18, 0),
    id: 40,
  },
  {
    title: 'Launch New Website',
    priorityId: 2,
    startDate: new Date(2018, 4, 25, 12, 20),
    endDate: new Date(2018, 4, 25, 14, 0),
    id: 41,
  },
  {
    title: 'Google AdWords Strategy',
    priorityId: 1,
    startDate: new Date(2018, 4, 28, 9, 0, 0),
    endDate: new Date(2018, 4, 28, 12, 0, 0),
    id: 42,
  },
  {
    title: 'Rollout of New Website and Marketing Brochures',
    priorityId: 3,
    startDate: new Date(2018, 4, 28, 13, 0, 0),
    endDate: new Date(2018, 4, 28, 15, 30, 0),
    id: 43,
  },
  {
    title: 'Non-Compete Agreements',
    priorityId: 2,
    startDate: new Date(2018, 4, 29, 13, 0, 0),
    endDate: new Date(2018, 4, 29, 15, 45, 0),
    id: 44,
  },
  {
    title: 'Approve Hiring of John Jeffers',
    priorityId: 2,
    startDate: new Date(2018, 4, 29, 9, 0, 0),
    endDate: new Date(2018, 4, 29, 12, 0, 0),
    id: 45,
  },
  {
    title: 'Update NDA Agreement',
    priorityId: 3,
    startDate: new Date(2018, 4, 29, 11, 0, 0),
    endDate: new Date(2018, 4, 29, 14, 15, 0),
    id: 46,
  },
  {
    title: 'Update Employee Files with New NDA',
    priorityId: 1,
    startDate: new Date(2018, 5, 1, 9, 0, 0),
    endDate: new Date(2018, 5, 1, 11, 45, 0),
    id: 47,
  },
  {
    title: 'Submit Questions Regarding New NDA',
    priorityId: 1,
    startDate: new Date(2018, 4, 30, 10, 0, 0),
    endDate: new Date(2018, 4, 30, 11, 30, 0),
    id: 48,
  },
  {
    title: 'Submit Signed NDA',
    priorityId: 3,
    startDate: new Date(2018, 4, 30, 13, 0, 0),
    endDate: new Date(2018, 4, 30, 15, 0, 0),
    id: 49,
  },
  {
    title: 'Review Revenue Projections',
    priorityId: 2,
    startDate: new Date(2018, 4, 30, 11, 0, 0),
    endDate: new Date(2018, 4, 30, 14, 0, 0),
    id: 50,
  },
  {
    title: 'Comment on Revenue Projections',
    priorityId: 2,
    startDate: new Date(2018, 4, 28, 10, 0, 0),
    endDate: new Date(2018, 4, 28, 13, 0, 0),
    id: 51,
  },
  {
    title: 'Provide New Health Insurance Docs',
    priorityId: 3,
    startDate: new Date(2018, 5, 1, 12, 0, 0),
    endDate: new Date(2018, 5, 1, 15, 0, 0),
    id: 52,
  },
  {
    title: 'Review Changes to Health Insurance Coverage',
    priorityId: 2,
    startDate: new Date(2018, 4, 31, 9, 0, 0),
    endDate: new Date(2018, 4, 31, 13, 0, 0),
    id: 53,
  },
  {
    title: 'Review Training Course for any Ommissions',
    priorityId: 1,
    startDate: new Date(2018, 4, 31, 11, 0, 0),
    endDate: new Date(2018, 4, 31, 14, 0, 0),
    id: 54,
  },
  {
    title: 'Approve New Online Marketing Strategy',
    priorityId: 3,
    startDate: new Date(2018, 4, 28, 12, 0),
    endDate: new Date(2018, 4, 28, 14, 0),
    allDay: true,
    id: 55,
  },
  {
    title: 'Install New Router in Dev Room',
    priorityId: 1,
    startDate: new Date(2018, 4, 29, 13),
    endDate: new Date(2018, 4, 29, 15, 30),
    allDay: true,
    id: 56,
  },
  {
    title: 'Google AdWords Strategy',
    priorityId: 1,
    startDate: new Date(2018, 4, 31, 9, 0, 0),
    endDate: new Date(2018, 4, 31, 12, 0, 0),
    allDay: true,
    id: 57,
  },
  {
    title: 'Review Changes to Health Insurance Coverage',
    priorityId: 2,
    startDate: new Date(2018, 5, 1, 9, 0, 0),
    endDate: new Date(2018, 5, 1, 13, 0, 0),
    allDay: true,
    id: 58,
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
  const [appointmentTooltipData, setAppointmentTooltipData] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState('all');

  const groupOrientation = (viewName: any) => viewName.split(' ')[0];
  const grouping = [
    {
      resourceName: 'priorityId',
    },
  ];

  const resources = [
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
    let tempPriority = priorityData;
    let res = priorityData?.find((el: any) => el.text === name);
    setSelectedPriorityData([res]);
  };

  console.log('🚀 ~ AllAppointment ~ selectedUser:', priorityData);

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
        <SwiperComponent selectedUser={selectedUser} data={users} />
      </div>
      <hr />
      <Scheduler data={data} height={580}>
        <ViewState defaultCurrentDate="2018-05-30" />
        <EditingState onCommitChanges={onCommitChanges} />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
        />
        <WeekView
          name="Vertical Orientation"
          startDayHour={9}
          endDayHour={13}
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
