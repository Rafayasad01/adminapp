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

export default function AppointmentEmployeesAttendancePage() {
  const { empId } = useParams();
  //   const currentMonth = dayjs().month() + 1;
  //   const [isLoader, setIsLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const localizer = momentLocalizer(moment);
  const [monthDate, setMonthDate] = useState<dayjs.Dayjs | null>();
  const [events] = useState([
    { id: 1, title: 'leave 2', start: '2024-04-30', end: '2024-04-30' },
    {
      id: 2,
      title: 'Time in',
      start: '2024-04-29',
      end: '2024-04-29',
      allDay: true,
      HostName: 'William',
    },
    {
      id: 3,
      title: 'Time out',
      start: '2024-04-29',
      end: '2024-04-29',
      allDay: true,
      //   HostName: 'William',
    },
    {
      id: 4,
      title: 'Time out',
      start: '2024-04-29',
      end: '2024-04-29',
      allDay: true,
      //   HostName: 'William',
    },
    // { title: 'event 3', start: '2019-12-05', end: '2019-12-07', allDay: true },
  ]);

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
    // console.log('EVENT', event);
    const { title } = event;
    return (
      <div className="">
        <p>{title}</p>
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
    // Handle click on "+2 more" label
    // setSelectedDate(date); // Store the selected date
    // Fetch additional events for the selected date from your data source
    const additionalEvents = events.filter((event) =>
      moment(event.start).isSame(date.start, 'day')
    );
    console.log(
      '🚀 ~ handleMoreEventsClick ~ additionalEvents:',
      additionalEvents
    );

    // setAdditionalEvents(additionalEvents);
    // setShowPopup(true); // Show the popup/modal
  };

  const handleEventClick = (event: any, e: any) => {
    // Handle event click
    console.log('Event clicked:', event, e);
  };

  useEffect(() => {
    const empAttendance = async () => {
      const month = monthDate
        ? dayjs(monthDate).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD');
      try {
        // setIsLoader(true);
        const [AttendanceResponse] = await Promise.all([
          StoreEmployeeService.StoreEmployeeAttendanceService(empId, month),
        ]);
        if (AttendanceResponse.data.success) {
          // const structuredAttendanceArr = AttendanceResponse.data.data?.map((el:any) => ({
          //   title: el.,
          // }));
          // console.log('AttendanceResponse.data', AttendanceResponse.data.data);
          // const temp = [
          //   ...AttendanceResponse.data.data.attendance,
          //   ...AttendanceResponse.data.data.leave,
          // ];
          // const structuredArr = temp?.map((el) => ({
          //   title: el.,
          // }));
          // console.log('🚀 ~ empAttendance ~ temp:', temp);
          // console.log('🚀 ~ structuredArr ~ structuredArr:', structuredArr);
          //   setIsLoader(false);
          // setIsNotify(true);
          // setNotifyMessage({
          //   text: AttendanceResponse.data.message,
          //   type: 'success',
          // });
          //   {
          //     id: 2,
          //     title: 'Time in',
          //     start: '2024-04-29',
          //     end: '2024-04-29',
          //     allDay: true,
          //     HostName: 'William',
          //   },
          //   setEvents(AttendanceResponse.data.data);
        } else {
          // throw new Error(paidStatusResponse.data.message);
          //   setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: AttendanceResponse.data.message,
            type: 'error',
          });
        }
        // setIsLoader(false);
      } catch (error: Error | any) {
        // setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      }
    };
    empAttendance();
  }, []);

  return (
    <div>
      <TopBar isNestedRoute title="Attendance" />
      <div className="flex w-full 2xl:px-12">
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
            style={{ height: 600 }}
            // to
          />
        </div>
      </div>
    </div>
  );
}
