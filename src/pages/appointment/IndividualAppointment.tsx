import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    rRule: 'FREQ=DAILY;COUNT=3',
    exDate: '20180628T063500Z,20180626T063500Z',
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20180627T091100Z',
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2018, 5, 25, 13, 30),
    endDate: new Date(2018, 5, 25, 14, 35),
    id: 2,
    rRule: 'FREQ=DAILY;COUNT=5',
  },
];

const IndividualAppointment = () => {
  const [data, setData] = useState(appointments);

  const commitChanges = ({ added, changed, deleted }: any) => {
    let updatedData = [...data];

    if (added) {
      const startingAddedId =
        updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;
      updatedData = [...updatedData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      updatedData = updatedData.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      updatedData = updatedData.filter(
        (appointment) => appointment.id !== deleted
      );
    }

    setData(updatedData);
  };
  return (
    <Paper>
      <Scheduler data={data}>
        {/* <div>hello</div> */}
        <ViewState defaultCurrentDate="2018-06-25" />
        <EditingState onCommitChanges={commitChanges} />
        <WeekView startDayHour={9} endDayHour={15} />
        <MonthView />
        <Appointments />

        <Toolbar />

        <DateNavigator />
        <ViewSwitcher />

        <EditRecurrenceMenu />

        {/* <DragDropProvider /> */}
      </Scheduler>
    </Paper>
  );
};

export default IndividualAppointment;
