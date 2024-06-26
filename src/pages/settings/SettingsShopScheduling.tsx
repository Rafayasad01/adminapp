import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notify from '../../components/common/Notify';
import { DateRange } from '../../interfaces/shop-schedule.interface';
import {
  fetchSchedule,
  setNotifyScheduleError,
} from '../../redux/features/shopScheduleStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import SettingsCreateSchedulePopup from './SettingsCreateSchedulePopup';
import SettingsDateRangePicker from './SettingsDateRangePicker';
import SettingsEditSchedulePopup from './SettingsEditSchedulePopup';

interface Holiday {
  id: string;
  event: string;
  startDate: string;
  endDate: string;
  tenant: string;
  isDeleted: boolean;
  key: string;
}

function SettingsShopScheduling() {
  const navigate = useNavigate();
  const [scheduleAddPopup, setScheduleAddPopup] = useState(false);
  const [scheduleEditPopup, setScheduleEditPopup] = useState(false);
  const dispatch = useAppDispatch();
  const [currentWeekDates, setCurrentWeekDates] = useState<
    { day: string; date: string }[]
  >([]);
  const {
    workDays,
    offDaysForWeek: offDays,
    dateForWeek: ScheduledMonthDate,
    notify,
    notifyMessage,
  } = useAppSelector((state) => state?.scheduleState);
  const authState = useAppSelector((state) => state?.authState);

  // Function to generate dates for the current week
  const generateCurrentWeekDates = (date = dayjs().format('YYYY-MM-DD')) => {
    const startDate = dayjs(date).startOf('week');
    const endDate = dayjs(date).endOf('week');

    const dates = [];
    let currentDate = startDate;
    while (currentDate.isSame(endDate) || currentDate.isBefore(endDate)) {
      dates.push({
        day: currentDate.format('dddd'),
        date: currentDate.format('YYYY-MM-DD'),
      });
      currentDate = currentDate.add(1, 'day');
    }
    setCurrentWeekDates(dates);
  };

  const SetNotify = (n: boolean) => {
    dispatch(setNotifyScheduleError(n));
  };

  const checkHoliday = (
    date: string,
    holidays: Array<DateRange | Holiday>
  ): string | false => {
    const currentDate = dayjs(date);

    const holiday = holidays.find((item: any) => {
      const startDate = dayjs(item.startDate);
      const endDate = dayjs(item.endDate);

      return (
        currentDate.isBetween(startDate, endDate, null, '[]') ||
        currentDate.isSame(startDate) ||
        currentDate.isSame(endDate)
      );
    });

    return holiday ? holiday.key : false;
  };

  useEffect(() => {
    // Generate dates for the current week when the component mounts

    dispatch(
      fetchSchedule({
        tenant: authState.user?.tenant,
        date: dayjs(ScheduledMonthDate).format('YYYY-MM-DD'),
        forWeek: true,
      })
    );
  }, [ScheduledMonthDate]);

  useEffect(() => {
    generateCurrentWeekDates(ScheduledMonthDate);
  }, [offDays]);

  return (
    <>
      <Notify
        isOpen={notify}
        setIsOpen={SetNotify}
        displayMessage={notifyMessage}
      />
      <SettingsCreateSchedulePopup
        scheduleAddPopup={scheduleAddPopup}
        setScheduleAddPopup={setScheduleAddPopup}
      />
      <SettingsEditSchedulePopup
        schedulePopup={scheduleEditPopup}
        setSchedulePopup={setScheduleEditPopup}
      />
      <div className="grid w-full grid-cols-12 gap-3">
        <div className="col-span-12 min-h-[650px] rounded-lg bg-white py-3 shadow-lg">
          <div className="custom-tab">
            <Tabs value="SHOP_SCHEDULING" aria-label="basic tabs example">
              <Tab
                label="App Settings"
                value="APP_SETTINGS"
                onClick={() => navigate('../app')}
              />
              <Tab
                label="System Configuration"
                value="SYSTEM_CONFIGURATION"
                onClick={() => navigate('../config')}
              />
              <Tab
                label="Shop Scheduling"
                value="SHOP_SCHEDULING"
                onClick={() => navigate('../shop')}
              />
            </Tabs>
          </div>
          <div className="Content w-full px-4 py-5">
            <div className="flex flex-col gap-0">
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => setScheduleAddPopup(true)}
                >
                  <AddOutlinedIcon /> Set Schedule
                </Button>
              </div>
              <div className="grid grid-cols-12 gap-x-4 gap-y-0">
                <div className="col-span-8">
                  <div className="class">
                    {workDays.length === 0 ? (
                      <div className="flex h-72 w-full items-center justify-center">
                        <h1 className="text-3xl">
                          Please set work days to show week schedule.
                        </h1>
                      </div>
                    ) : (
                      <table className="schedule-table table-border table-auto border-separate border-spacing-y-[1.4rem]">
                        <thead>
                          <tr>
                            <th className="w-16">&nbsp;</th>
                            <th>Date</th>
                            <th>Shop Time</th>
                            {/* <th>Break Time</th> */}
                            <th>Days Off</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentWeekDates?.map((x) => {
                            const day = workDays?.find((d) =>
                              d?.day?.includes(x.day)
                            );
                            const event = checkHoliday(x?.date, offDays);
                            const holiday = !day || event;
                            return (
                              <tr
                                className={`${holiday ? 'days-off' : ''}`}
                                key={x?.date}
                              >
                                <td>{x?.day?.substring(0, 3)}</td>
                                <td>{dayjs(x.date)?.format('LL')}</td>
                                <td className="py-3">
                                  {holiday
                                    ? `${event || ''}`
                                    : `${day?.openTime?.format('h:mm A')} - `}

                                  {holiday
                                    ? ''
                                    : day?.closeTime?.format('h:mm A')}
                                </td>
                                {/* <td>
                                  {' '}
                                  {holiday
                                    ? ''
                                    : `${
                                        isDayjs(day.breakTime) &&
                                        day.breakTime.isValid()
                                          ? `${day.breakTime?.format(
                                              'h:mm A'
                                            )} - `
                                          : ''
                                      }`}
                                  {holiday
                                    ? ''
                                    : isDayjs(day.breakTime) &&
                                      day.breakOffTime?.isValid() &&
                                      day.breakOffTime?.format('h:mm A')}
                                </td> */}
                                <td className="py-3">
                                  {' '}
                                  {holiday ? ' Day Off' : ''}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="mt-6">
                    <SettingsDateRangePicker calendarStyle="settingPage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SettingsShopScheduling);
