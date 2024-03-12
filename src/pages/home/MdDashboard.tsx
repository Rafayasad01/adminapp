/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Divider } from '@mui/material';
import Loader from '../../components/common/Loader';
import TopBar from '../../components/common/Md-Alder/TopBar';
import DashboardCard from '../../components/common/Md-Alder/Dashboard/DashboardCard';
import doctorIcon from '../../assets/images/Doctor.png';
import nurseIcon from '../../assets/images/Nurse.png';
import peopleIcon from '../../assets/images/people.png';
import calendarIcon from '../../assets/images/calendar-2.png';
import DashboardChartLine from '../../components/common/Md-Alder/Dashboard/DashboardChartLine';
import DashboardPatientData from '../../components/common/Md-Alder/Dashboard/DashboardPatientData';
import DashboardAppointments from '../../components/common/Md-Alder/Dashboard/DashboardAppointments';

function MdDashboard() {
  const [isLoader, setIsLoader] = useState(false);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Dashboard" />
      <div className="mx-auto mt-3 flex gap-8 max-[1260px]:flex-col">
        <div className=" sm:w-full">
          <div className="grid grid-cols-4 gap-8">
            <DashboardCard
              icon={doctorIcon}
              value="2.414"
              title="Total Doctor"
            />
            <DashboardCard
              icon={nurseIcon}
              value="2.414"
              title="New Patients"
            />
            <DashboardCard
              icon={peopleIcon}
              value="2.414"
              title="Total Patients"
            />
            <DashboardCard
              icon={calendarIcon}
              value="2.414"
              title="New Appointment"
            />
          </div>
          <div className="alder-card-border mt-10 w-full">
            <DashboardChartLine />
          </div>

          <div className="alder-card-border mt-10 w-full">
            <DashboardPatientData />
          </div>
        </div>

        <div className="alder-card-border w-full md:w-1/4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className="w-full" showDaysOutsideCurrentMonth />
          </LocalizationProvider>
          <div className="px-6">
            <Divider className="" />
            <h4 className="mt-10">Upcoming Appointments</h4>
            <DashboardAppointments />
          </div>
        </div>
      </div>
    </>
  );
}

export default MdDashboard;
