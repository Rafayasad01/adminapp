import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Controller, useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TimePicker from '../../components/common/TimePicker';
import CustomButton from '../../components/common/CustomButton';
// import CustomInputBox from '../../components/common/CustomInputBox';
// import { PATTERN } from '../../utils/constants';
// import { AppointmentWalletPayment } from '../../interfaces/app.appointment';
import '../../assets/css/PopupStyle.css';
import { AppointmentReschedulePopup } from '../../interfaces/appointmentReschedulePopup';

type Props = {
  id?: any;
  open?: any;
  anchorEl?: any;
  onclose?: any;
  callback?: any;
  isLoader?: any;
};

const ViewCardAccordinReschedule = ({
  id,
  open,
  anchorEl,
  onclose,
  callback,
  isLoader,
}: Props) => {
  const {
    // register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<AppointmentReschedulePopup>();

  const [appointmentTime, setAppointmentTime] = useState<dayjs.Dayjs | any>(
    null
  );

  const onSubmit = (data: AppointmentReschedulePopup) => {
    // console.log('🚀 ~ onSubmit ~ datasssssss:', data, appointmentTime);
    const formattedDate = dayjs(data.appointmentDate).format('YYYY-MM-DD');
    const formattedTime = dayjs(appointmentTime).utc().format('HH:mm:ss');
    const newDate = `${formattedDate} ${formattedTime}`;
    console.log('🚀 ~ onSubmit ~ newDate:', newDate);
    callback(newDate);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    field.onChange(date);
    // if (activeBarberData) {
    //   getBookedTimeSlots(
    //     activeBarberData.storeEmployee.id,
    //     dayjs(date)?.format('YYYY-MM-DD')
    //   );
    // } else {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: 'First select barber before selecting appointment date & time',
    //     type: 'error',
    //   });
    // }
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onclose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className="w-full">
        <form
          className="w-full overflow-auto p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="FormBody">
            <div className="w-full">
              <div className="w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div className="">
                      <div>
                        <span className="text-sm">
                          Select New Appointment Date
                        </span>
                      </div>
                      <div>
                        <Controller
                          name="appointmentDate"
                          control={control}
                          defaultValue={dayjs()}
                          render={({ field }) => (
                            <DesktopDatePicker
                              {...field}
                              className="w-full"
                              //   disabled={!activeBarberData}
                              onChange={(date) => handleDateChange(date, field)}
                              // onChange={(date) => field.onChange(date)}
                              value={field.value}
                              minDate={dayjs()}
                            />
                          )}
                        />
                      </div>
                    </div>
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
                <div className="my-2 flex-col">
                  <span className="text-sm">Select New Appointment Time</span>
                  <div className="px-2">
                    <FormControl className="FormControl" variant="standard">
                      <TimePicker
                        // disabled={!activeBarberData}
                        // timePickerLabel="Appointment Time"
                        // timePickerSubLabel={"(Office in time)"}
                        timePickerValue={appointmentTime}
                        setTimePickerValue={setAppointmentTime}
                        // minTime={selectedScheduleTime.startTime}
                        // maxTime={selectedScheduleTime.endTime}
                        id="appointmentTime"
                        // setError={setError}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 w-full">
              <CustomButton
                disabled={isLoader}
                buttonType="button"
                title={isLoader ? <CircularProgress size={14} /> : 'Done'}
                className="btn-black-outline"
                type="submit"
                sx={{
                  width: '100%',
                  height: '35px',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </Popover>
  );
};

export default ViewCardAccordinReschedule;
