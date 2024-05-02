import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Calendar, momentLocalizer } from 'react-big-calendar';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import YearMonthDatePicker from '../../../../components/common/YearMonthPicker';
import StoreEmployeeService from '../../../../services/adminapp/adminStoreEmployee';
import Loader from '../../../../components/common/Loader';

export default function AppointmentEmployeesAttendancePage() {
  const { empId } = useParams();
  //   const currentMonth = dayjs().month() + 1;
  const [isLoader, setIsLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const localizer = momentLocalizer(moment);
  const [monthDate, setMonthDate] = useState<dayjs.Dayjs | null>();
  const [empAttendanceData, setEmpAttendanceData] = useState<any>();
  const [events, setEvents] = useState<any>([]);

  //   const data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  //   const calendarComponentRef = useRef(null);
  //   const handleDateClick: any = (arg: any) => {
  //     alert(arg.dateStr);
  //   };

  //   const handleSelectedDates: any = (info: any) => {
  //     // alert('selected ' + info.startStr + ' to ' + info.endStr);
  //     const title = prompt("What's the name of the title");
  //     console.log(info);
  //     if (title !== null) {
  //       const newEvent = {
  //         title,
  //         start: info.startStr,
  //         end: info.endStr,
  //       };
  //       const updatedEvents: any = [...events, newEvent];
  //       setEvents(updatedEvents);
  //       console.log('here', updatedEvents);
  //     } else {
  //       console.log('nothing');
  //     }
  //   };

  function EventComp(event: any) {
    console.log('EVENT', event);
    const { title, startTime, leaveType, status } = event.event;
    console.log('🚀 ~ EventComp ~ start:', startTime);
    return (
      <div
        className={`rounded 
      ${
        status === 'Pending'
          ? 'bg-blue-500'
          : status === 'Rejected'
          ? 'bg-red-500'
          : status === 'Approved'
          ? 'bg-green-500'
          : 'bg-gray-500'
      }  p-[1px] px-2`}
      >
        <span className="text-sm uppercase">
          {leaveType ?? ''} {title}
        </span>
        {status && <span className="text-xs"> ({status ?? ''})</span>}
        {!status && <span className="text-xs"> ({startTime})</span>}
        {/* <span className="text-sm">End Time: {endTime}</span> */}
      </div>
    );
  }

  const handleDateChange = (date: any) => {
    // Perform any action you need here
    // console.log('Date changedsss:', date);
    setMonthDate(date);
  };

  const handleViewChange = (date: any) => {
    // Perform any action you need here
    // console.log('View changedsss:', date);
    setMonthDate(date);
  };

  const handleMoreEventsClick = (date: any) => {
    console.log('🚀 ~ handleMoreEventsClick ~ date:', date);
    // Handle click on "+2 more" label
    // setSelectedDate(date); // Store the selected date
    // Fetch additional events for the selected date from your data source
    // const additionalEvents = events.filter((event) =>
    //   moment(event.start).isSame(date.start, 'day')
    // );
    // setAdditionalEvents(additionalEvents);
    // setShowPopup(true); // Show the popup/modal
  };

  const handleEventClick = (event: any, e: any) => {
    // Handle event click
    console.log('Event clicked:', event, e);
  };

  useEffect(() => {
    const empAttendance = async () => {
      // setIsLoader(true);
      const month = monthDate
        ? dayjs(monthDate).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD');
      try {
        // setIsLoader(true);
        const [AttendanceResponse] = await Promise.all([
          StoreEmployeeService.StoreEmployeeAttendanceService(empId, month),
          // StoreEmployeeService.StoreEmployeeAttendanceService(
          //   empId,
          //   '2024-04-25'
          // ),
        ]);
        if (AttendanceResponse.data.success) {
          setIsLoader(false);
          const structuredAttendanceArr =
            AttendanceResponse.data.data.attendance?.map((el: any) => ({
              id: el.id,
              title: el.attendanceType,
              start: dayjs(el.attendanceTime).format('YYYY-MM-DD'),
              startTime: dayjs(el.attendanceTime).format('h:mm A'),
              end: dayjs(el.attendanceTime).format('YYYY-MM-DD'),
              endTime: dayjs(el.attendanceTime).format('h:mm A'),
              allDay: true,
            }));
          const structuredLeaveArr = AttendanceResponse.data.data.leave?.map(
            (el: any) => ({
              id: el.id,
              title: 'leave',
              leaveType: el.leaveType,
              status: el.status,
              start: dayjs(el.fromDate).format('YYYY-MM-DD'),
              startTime: dayjs(el.fromDate).format('h:mm A'),
              end: dayjs(el.toDate).format('YYYY-MM-DD'),
              endTime: dayjs(el.toDate).format('h:mm A'),
              halfDay: el.halfDay,
              allDay: true,
            })
          );
          console.log('AttendanceResponse.data', structuredAttendanceArr);
          console.log('LeaveResponse.data', structuredLeaveArr);
          const temp = [...structuredAttendanceArr, ...structuredLeaveArr];
          setEvents(temp);
          setEmpAttendanceData(AttendanceResponse.data.data);
        } else {
          // throw new Error(paidStatusResponse.data.message);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: AttendanceResponse.data.message,
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
    empAttendance();
  }, [monthDate]);

  // console.log('🚀 ~ empAttendance ~ month:', month);
  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <TopBar isNestedRoute title={`${empAttendanceData?.name} Attendance`} />
      <div className="mt-3 flex w-full justify-end 2xl:px-12">
        <YearMonthDatePicker value={monthDate} setValue={setMonthDate} />
      </div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="container m-auto mt-5">
        <div>
          <Calendar
            onSelectEvent={handleEventClick}
            onShowMore={handleMoreEventsClick}
            showAllEvents
            // onSelectSlot={(slotInfo) => handleMoreEventsClick(slotInfo)}
            components={{
              event: EventComp,
            }}
            localizer={localizer}
            events={events}
            defaultView="month"
            view="month"
            date={
              dayjs(monthDate).isValid()
                ? dayjs(monthDate).toDate()
                : new Date()
            }
            onNavigate={(date) => handleDateChange(date)}
            onView={handleViewChange}
            views={['month']}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            toolbar={false}
            // length={3}
            // to
          />
        </div>
      </div>
    </div>
  );
}
