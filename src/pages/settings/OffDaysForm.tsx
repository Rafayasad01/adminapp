import { Button, CircularProgress, Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-cycle
import SettingsOffDaysDateRangePicker from './SettingsOffDaysDateRangePicker';
import { DateRange } from '../../interfaces/shop-schedule.interface';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  fetchSchedule,
  setOffDays,
} from '../../redux/features/shopScheduleStateSlice';

function OffDaysForm() {
  const [dateRange, setDateRange] = useState<DateRange[]>([
    {
      key: 'selection',
    },
  ]);
  const [event, setEvent] = useState<string | null>();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state?.authState);
  const offDays = useAppSelector((state) => state?.scheduleState?.offDays);
  const scheduleLoading = useAppSelector(
    (state) => state?.scheduleState?.loading
  );
  const ScheduledMonthDate = useAppSelector(
    (state) => state?.scheduleState?.date
  );

  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent(e.target.value);
  };

  const setOffDaysState = (arr: DateRange[]) => {
    dispatch(setOffDays(arr));
  };

  /**
   * Adds a new event to the list of events if event input and start date are valid.
   * If event input is empty or start date is not selected, the function returns without adding the event.
   * @returns {void}
   */
  const addEvent = () => {
    if (!event?.trim().length) {
      return;
    }
    if (!dateRange[0].startDate) {
      return;
    }
    const newEvent = {
      key: event,
      startDate: dateRange[0].startDate,
      endDate: dateRange[0].endDate,
    };
    setEvent('');
    setOffDaysState([...offDays, newEvent]);
    setDateRange([{ key: 'selection' }]);
  };

  /**
   * Handles the deletion of an event from the list of events.
   * @param {number} i - The index of the event to be deleted.
   * @returns {void}
   */
  const handleDeleteEvent = (i: number) => {
    const days = [...offDays];
    days.splice(i, 1);
    setOffDaysState(days);
  };

  useEffect(() => {
    dispatch(
      fetchSchedule({
        tenant: authState.user?.tenant,
        date: dayjs(ScheduledMonthDate).format('YYYY-MM-DD'),
      })
    );
  }, [ScheduledMonthDate]);
  return (
    <div className="grid grid-cols-12 gap-8" id="OffDayForm">
      <div className="sm:order-2 md:order-2 md:col-span-12 lg:order-first lg:col-span-6">
        <div className="block w-full">
          <div className="FormField !mt-2">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Events</label>
              <Input
                className="FormInput"
                id="name"
                value={event}
                name="name"
                onChange={handleEventInputChange}
                placeholder="Public Holiday"
                disableUnderline
              />
            </FormControl>
          </div>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={addEvent}
            className="mt-3 bg-secondary2"
          >
            Add
          </Button>
        </div>
        <Divider className=" mt-3" />
        {scheduleLoading ? (
          <div className="mt-3 flex h-48 flex-wrap items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <h1 className="mt-4 h-1 text-center text-lg">
              Events of{' '}
              <span className="font-bold">
                {dayjs(ScheduledMonthDate).isValid() &&
                  dayjs(ScheduledMonthDate).format('MMMM')}
              </span>
            </h1>
            <table className="mt-3">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offDays.map((e, i) => {
                  return (
                    <tr key={i}>
                      <th>{e.key}</th>
                      <td>{dayjs(e.startDate).format('DD/MM/YYYY')}</td>
                      <td>{dayjs(e.endDate).format('DD/MM/YYYY')}</td>
                      <td>
                        <Button
                          color="warning"
                          variant="text"
                          onClick={() => handleDeleteEvent(i)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="md:col-span-12 lg:col-span-6">
        <SettingsOffDaysDateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
    </div>
  );
}

export default memo(OffDaysForm);
