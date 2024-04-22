/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */

import { Button, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import TimePicker from '../../components/common/TimePicker';
import { WorkDay } from '../../interfaces/shop-schedule.interface';
import { setWordDays } from '../../redux/features/shopScheduleStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

type WorkDaysFormProps = {
  onlyWeeksFormat?: boolean;
  setWeekDays?: any;
};

function WorkDaysForm({
  onlyWeeksFormat,
  setWeekDays = (e?: any) => {},
}: WorkDaysFormProps) {
  const [shopOpenTime, setShopOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [shopCloseTime, setShopCloseTime] = useState<dayjs.Dayjs | null>(null);
  const [breakTime, setBreakTime] = useState<dayjs.Dayjs | null>(null);
  const [breakOffTime, setBreakOffTime] = useState<dayjs.Dayjs | null>(null);
  const [currentDay, setCurrentDay] = useState<string>('Sunday');
  const dispatch = useAppDispatch();
  const workDays = useAppSelector((state) => state.scheduleState.workDays);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const setWorkDaysState = (arr: WorkDay[]) => {
    dispatch(setWordDays(arr));
  };

  /**
   * Sets the form values for shop open time, shop close time, break time, and break off time
   * based on the work day details corresponding to the given day.
   * If no work day details exist for the given day, sets the form values to null.
   * @param {string} day - The day for which to set the timings.
   * @returns {void}
   */
  const SetCurrentDayTimings = (day: string) => {
    const index = workDays.findIndex((x) => x.day === day);
    if (index > -1) {
      setValue('shopOpenTime', dayjs(workDays[index].openTime));
      setValue('shopCloseTime', dayjs(workDays[index].closeTime));
      setValue('breakTime', dayjs(workDays[index].breakTime));
      setValue('breakOffTime', dayjs(workDays[index].breakOffTime));
    } else {
      setValue('shopOpenTime', null);
      setValue('shopCloseTime', null);
      setValue('breakTime', null);
      setValue('breakOffTime', null);
    }
  };

  const handleDayChange = (selectedDay: string) => {
    setCurrentDay(selectedDay);
    SetCurrentDayTimings('');
  };

  /**
   * Handles form submission for updating or adding work day details.
   * If the current day already exists in the list of work days, it updates its details,
   * otherwise, it adds a new work day with the provided data.
   * @param {any} data - The form data containing shop open time, shop close time, break time, and break off time.
   * @returns {void}
   */
  const onSubmit = (data: any) => {
    const index = workDays.findIndex((x) => x.day === currentDay);
    const newWorkDay: WorkDay = {
      day: currentDay,
      openTime: data.shopOpenTime,
      closeTime: data.shopCloseTime,
      breakTime: data.breakTime,
      breakOffTime: data.breakOffTime,
    };

    if (index === -1) {
      setWorkDaysState([...workDays, newWorkDay]);
    } else {
      const updatedWorkDays = [...workDays];
      updatedWorkDays[index] = newWorkDay;
      setWorkDaysState(updatedWorkDays);
    }
  };

  /**
   * Handles the deletion of a work day from the list of work days.
   * @param {number} i - The index of the work day to be deleted.
   * @returns {void}
   */
  const handleDeleteDays = (i: number) => {
    const days = [...workDays];
    days.splice(i, 1);
    setWorkDaysState(days);
  };

  useEffect(() => {
    SetCurrentDayTimings('');
  }, [workDays, currentDay]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`${!onlyWeeksFormat && 'height-230'}`}>
        <div className=" !mt-3 grid grid-cols-7 justify-center">
          {weekDays.map((d, index) => (
            <Button
              className={`CustomToggleBtn ${
                currentDay === d && 'btn-black-fill'
              } w-9`}
              value={d}
              key={d}
              aria-label={d}
              onClick={() => handleDayChange(d)}
              disableRipple
            >
              {d.substring(0, 3)}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!onlyWeeksFormat && (
            <>
              <div className="FormFields">
                <FormControl>
                  <TimePicker
                    timePickerLabel="Open Time"
                    timePickerValue={getValues('shopOpenTime')}
                    setTimePickerValue={(e: any) => {
                      setValue('shopOpenTime', e);
                      setShopOpenTime(e);
                    }}
                    id="shopInTimePicker"
                    {...register('shopOpenTime', { required: true })}
                  />
                  {errors.shopOpenTime && (
                    <ErrorSpanBox error="This field is required" />
                  )}
                </FormControl>
                <FormControl>
                  <TimePicker
                    timePickerLabel="Closes Time"
                    timePickerValue={getValues('shopCloseTime')}
                    setTimePickerValue={(e: any) => {
                      setValue('shopCloseTime', e);
                      setShopCloseTime(e);
                    }}
                    id="shopOutTimePicker"
                    {...register('shopCloseTime', { required: true })}
                  />
                  {errors.shopCloseTime && (
                    <ErrorSpanBox error="This field is required" />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl>
                  <TimePicker
                    timePickerLabel="BreakIn Time"
                    timePickerValue={getValues('breakTime')}
                    setTimePickerValue={(e: any) => {
                      setValue('breakTime', e);
                      setBreakTime(e);
                    }}
                    id="pickupTimePicker"
                    {...register('breakTime', {
                      validate: (value) => {
                        const TshopOpenTime = getValues('shopOpenTime');
                        const TshopCloseTime = getValues('shopCloseTime');
                        return (
                          value === null ||
                          !value.isValid() ||
                          (TshopOpenTime &&
                            value.isAfter(TshopOpenTime) &&
                            TshopCloseTime &&
                            value.isBefore(TshopCloseTime))
                        );
                      },
                    })}
                  />
                  {errors.breakTime && (
                    <ErrorSpanBox error="Break time must be between open and close time" />
                  )}
                </FormControl>
                <FormControl>
                  <TimePicker
                    timePickerLabel="Break off Time"
                    timePickerValue={getValues('breakOffTime')}
                    setTimePickerValue={(e) => {
                      setValue('breakOffTime', e);
                      setBreakOffTime(e);
                    }}
                    id="dropoffTimePicker"
                    {...register('breakOffTime', {
                      validate: (value) => {
                        const TshopOpenTime = getValues('shopOpenTime');
                        const TbreakTime = getValues('breakTime');
                        const TshopCloseTime = getValues('shopCloseTime');
                        return (
                          value === null ||
                          !value.isValid() ||
                          (TshopOpenTime &&
                            TbreakTime &&
                            value.isAfter(TbreakTime) &&
                            TshopCloseTime &&
                            value.isBefore(TshopCloseTime))
                        );
                      },
                    })}
                  />
                  {errors.breakOffTime && (
                    <ErrorSpanBox
                      error="Break off time must be between open and close time and after
                    break time"
                    />
                  )}
                </FormControl>
              </div>
            </>
          )}
          <div className="mt-3">
            <Button
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
              }}
              type="submit"
            >
              Set Timings
            </Button>
          </div>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Open</th>
              <th>Close</th>
              <th>Break</th>
              <th>Break End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workDays.map((d, index) => {
              return (
                <tr key={d.day}>
                  <th>{d.day}</th>
                  <td> {d.openTime?.format('h:mm A') || '--'} </td>
                  <td> {d.closeTime?.format('h:mm A') || '--'} </td>
                  <td>
                    {d.breakTime && d.breakTime?.isValid()
                      ? d.breakTime?.format('h:mm A')
                      : '--'}
                  </td>
                  <td>
                    {' '}
                    {d.breakOffTime && d.breakOffTime?.isValid()
                      ? d.breakOffTime?.format('h:mm A')
                      : '--'}
                  </td>
                  <td>
                    <Button
                      color="warning"
                      variant="text"
                      onClick={() => handleDeleteDays(index)}
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
    </LocalizationProvider>
  );
}

export default memo(WorkDaysForm);
