/* eslint-disable import/no-cycle */

import { Button, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import moment from 'moment';
import isBetween from 'dayjs/plugin/isBetween';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import TimePicker from '../../components/common/TimePicker';
import { WorkDay } from '../../interfaces/shop-schedule.interface';
import { setWordDays } from '../../redux/features/shopScheduleStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

dayjs.extend(isBetween);

type WorkDaysFormProps = {
  onlyWeeksFormat?: boolean;
  setWeekDays?: any;
};

function WorkDaysForm({
  onlyWeeksFormat,
  setWeekDays: _setWeekDays = () => null,
}: WorkDaysFormProps) {
  const [_shopOpenTime, setShopOpenTime] = useState<dayjs.Dayjs | null>(null);
  const [_shopCloseTime, setShopCloseTime] = useState<dayjs.Dayjs | null>(null);
  // const [
  //   _breakTime,
  //   //  setBreakTime
  // ] = useState<dayjs.Dayjs | null>(null);
  // const [
  //   _breakOffTime,
  //   //  setBreakOffTime
  // ] = useState<dayjs.Dayjs | null>(null);
  const [currentDay, setCurrentDay] = useState<string>('Sunday');
  const dispatch = useAppDispatch();
  const workDays = useAppSelector((state) => state.scheduleState.workDays);
  const {
    // register,
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
    const newWorkDay: WorkDay | any = {
      day: currentDay,
      openTime: data.shopOpenTime,
      closeTime: data.shopCloseTime,
      breakTime: data.shopOpenTime,
      breakOffTime: data.shopCloseTime,
      // breakTime: data.breakTime,
      // breakOffTime: data.breakOffTime,
    };

    if (index === -1) {
      setWorkDaysState([...workDays, newWorkDay]);
    } else {
      const updatedWorkDays = [...workDays];
      updatedWorkDays[index] = newWorkDay;
      setWorkDaysState(updatedWorkDays);
    }
  };

  // const handleBreakInTimeChange = (value: any) => {
  //   const TshopOpenTime = dayjs(getValues('shopOpenTime'));
  //   let TshopCloseTime = dayjs(getValues('shopCloseTime'));
  //   const hour1 = TshopOpenTime.hour();
  //   const hour2 = TshopCloseTime.hour();
  //   if (hour1 > hour2) {
  //     TshopCloseTime = TshopCloseTime.add(1, 'day');
  //   }

  //   // Check if tempVal is between date1 and date2
  //   // console.log('VALUE::', value);
  //   // console.log('TS VALUE::', TshopOpenTime, TshopCloseTime);
  //   // console.log(
  //   //   'isbetween',
  //   //   value.isBetween(TshopOpenTime, TshopCloseTime, 'minutes')
  //   // );

  //   return (
  //     value === null ||
  //     !value.isValid() ||
  //     value.isBetween(TshopOpenTime, TshopCloseTime, 'minutes')
  //   );
  // };

  // const handleBreakOffTimeChange = (value: any) => {
  //   // const TshopOpenTime = dayjs(getValues('shopOpenTime'));
  //   // let TshopCloseTime = dayjs(getValues('shopCloseTime'));
  //   const TshopOpenTime = dayjs(getValues('shopOpenTime'));
  //   let TshopCloseTime = dayjs(getValues('shopCloseTime'));
  //   const TbreakTime = dayjs(getValues('breakTime'));
  //   console.log('🚀 ~ handleBreakInTimeChange ~ value:', value);
  //   // const tempVal = moment(moment(value));
  //   // const date1 = dayjs('Wed May 15 2024 10:00:00 GMT+0500');
  //   // let date2 = dayjs('Wed May 15 2024 00:00:00 GMT+0500');
  //   const hour1 = TshopOpenTime.hour();
  //   const hour2 = TshopCloseTime.hour();
  //   if (hour1 > hour2) {
  //     TshopCloseTime = TshopCloseTime.add(1, 'day');
  //   }

  //   // Check if tempVal is between date1 and date2
  //   console.log('VALUE::', value);
  //   console.log('TS VALUE::', TshopOpenTime, TshopCloseTime);
  //   console.log(
  //     'isbetween',
  //     value.isBetween(TshopOpenTime, TshopCloseTime, 'minutes') &&
  //       value.isAfter(TbreakTime)
  //   );

  //   return (
  //     value === null ||
  //     !value.isValid() ||
  //     (value.isBetween(TshopOpenTime, TshopCloseTime, 'minutes') &&
  //       value.isAfter(TbreakTime))
  //   );
  // };

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
          {weekDays.map((day) => (
            <Button
              className={`CustomToggleBtn ${
                currentDay === day && 'btn-black-fill'
              } w-9`}
              value={day}
              key={day}
              aria-label={day}
              onClick={() => handleDayChange(day)}
              disableRipple
            >
              {day.substring(0, 3)}
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
                    // {...register('shopOpenTime', { required: true })}
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
                    // {...register('shopCloseTime', { required: true })}
                  />
                  {errors.shopCloseTime && (
                    <ErrorSpanBox error="This field is required" />
                  )}
                </FormControl>
              </div>
              {/* <div className="FormFields">
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
                      validate: (value) => handleBreakInTimeChange(value),
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
                      validate: (value) => handleBreakOffTimeChange(value),
                    })}
                  />
                  {errors.breakOffTime && (
                    <ErrorSpanBox
                      error="Break off time must be between open and close time and after
                    break time"
                    />
                  )}
                </FormControl>
              </div> */}
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
              {/* <th>Break</th> */}
              {/* <th>Break End</th> */}
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
                  {/* <td>
                    {d.breakTime && d.breakTime?.isValid()
                      ? d.breakTime?.format('h:mm A')
                      : '--'}
                  </td>
                  <td>
                    {' '}
                    {d.breakOffTime && d.breakOffTime?.isValid()
                      ? d.breakOffTime?.format('h:mm A')
                      : '--'}
                  </td> */}
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
