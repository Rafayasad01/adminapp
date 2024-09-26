// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
import dayjs from 'dayjs';
// import TimePicker from '../../../../components/common/TimePicker';
// import TextField from '@mui/material/TextField';
// import CustomDropDown from '../../../../components/common/CustomDropDown';
// import TimePicker from '../../../../components/common/TimePicker';
import { OvertimeCreate } from '../../../../interfaces/overtime.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  CURRENCY_PREFIX,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  //   imageAllowedTypes,
} from '../../../../utils/constants';
import '../../../../assets/css/PopupStyle.css';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  overtimeHours: any;
  loader: boolean;
};

function OvertimeAddPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  overtimeHours,
  loader,
}: // setIsNotify,
// setNotifyMessage,
Props) {
  const {
    register,
    handleSubmit,
    setValue,
    // clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<OvertimeCreate>({
    defaultValues: {
      extraOvertimeHours: '0:00',
    },
  });

  // const [overtimeHours, setOvertimeHours] = useState<any>(null);

  const onSubmit = (data: any) => {
    const arrObj = [
      {
        overtimeHours: data.overtimeHours,
        hourlyRate: data.hourlyAmount,
        amount: data.overtimeAmount,
        date: dayjs(data.date).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        extraOvertimeHours: data.extraOvertimeHours ?? '0',
      },
    ];
    // console.log('🚀 ~ onSubmit ~ data:', arrObj);
    callback({ expenseDetails: arrObj });
  };

  const calculateOvertimePay = (time: string, hourlyRate: number) => {
    // Split the time string into hours and minutes (e.g., '4:07')
    const [hours, minutes] = time?.split(':').map(Number);
    const [extraHours, extraMinutes] = watch('extraOvertimeHours')
      ?.split(':')
      .map(Number);

    // Calculate total minutes
    const totalMinutes = hours * 60 + minutes;
    const extratotalMinutes = extraHours * 60 + extraMinutes;

    const calculateMints = totalMinutes + extratotalMinutes;

    // Convert total minutes to hours (with decimals for partial hours)
    const totalHours = calculateMints / 60;

    // Calculate the overtime pay based on the hourly rate
    const overtimePay = totalHours * hourlyRate;
    setValue('overtimeAmount', overtimePay.toFixed(0));

    return overtimePay;
  };

  useEffect(() => {
    calculateOvertimePay(overtimeHours, watch('hourlyAmount'));
  }, [watch('hourlyAmount'), watch('extraOvertimeHours')]);

  // console.log('🚀 data:', overtimeHours);

  // const handleDateChange = (date: any, field: any) => {
  //   // console.log('HIT', date, activeBarberData);
  //   field.onChange(date);
  // };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  //   const handleFileChange = (event: any) => {
  //     const selectedFile = event.target.files[0];
  //     if (selectedFile) {
  //       const fileType = selectedFile.type;
  //       if (imageAllowedTypes.includes(fileType)) {
  //         setImage(event.target.files[0]);
  //         setValue('avatar', event.target.files[0]);
  //         clearErrors('avatar');
  //       } else {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: 'Only .png, .jpg, and .jpeg files are allowed',
  //           type: 'error',
  //         });
  //       }
  //     }
  //   };

  //   const handleFileOnClick = (event: any) => {
  //     event.target.value = null;
  //     setImage(null);
  //     setValue('avatar', '');
  //   };

  console.log(errors);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Pay Overtime</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              {/* <TimePicker
                timePickerLabel="Overtime Hours"
                timePickerSubLabel="Select Overtime Hours"
                timePickerValue={overtimeHours}
                // setTimePickerValue={setOvertimeHours}
                id="overtimeHours"
                disabled
                // views={['hours']}
                // errors={items.error}
                // setError={setError}
              /> */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Overtime Hours</label>
                <Input
                  className="FormInput"
                  id="overtimeHours"
                  type="text"
                  placeholder="3:30"
                  disabled
                  {...register('overtimeHours', {
                    value: overtimeHours,
                    // required: 'Hourly Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {/* {errors.hourlyAmount && (
                  <ErrorSpanBox error={errors.hourlyAmount?.message} />
                )} */}
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="w-full">
                  <p className="m-0 w-full py-1 text-xs">Select Month</p>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={dayjs()}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        // label="Start Date"
                        views={['year', 'month']}
                        className="custom-border w-full"
                        format="YYYY-MM"
                        value={dayjs(field.value)}
                        onChange={(date) => {
                          const firstDayOfMonth = dayjs(date)
                            .startOf('month')
                            .toDate();
                          field.onChange(firstDayOfMonth); // Set to first day of the selected month
                        }}
                      />
                    )}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Hourly Amount</label>
                <Input
                  className="FormInput"
                  id="hourlyAmount"
                  type="number"
                  placeholder="Enter Hourly Amount"
                  {...register('hourlyAmount', {
                    required: 'Hourly Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 6,
                      message: 'Length should not be excceed from 6 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.hourlyAmount && (
                  <ErrorSpanBox error={errors.hourlyAmount?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Extra Overtime Hours</label>
                <Input
                  className="FormInput"
                  id="extraOvertimeHours"
                  type="text"
                  placeholder="Enter Extra Hours (ex: 4:30)"
                  {...register('extraOvertimeHours', {
                    pattern: {
                      value: PATTERN.HOURS_MINTS_FORMAT,
                      message:
                        'Invalid format, it should be 4:30, 3:00, 23:59 etc.',
                    },
                    // value: overtimeHours,
                    // required: 'Hourly Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {errors.extraOvertimeHours?.type === 'pattern' && (
                  <ErrorSpanBox error={errors.extraOvertimeHours?.message} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-3">
                  Overtime Amount ({CURRENCY_PREFIX})
                </label>
                <Input
                  className="FormInput"
                  id="overtimeAmount"
                  type="number"
                  disabled
                  placeholder="Enter Overtime Amount"
                  {...register('overtimeAmount', {
                    // value: 0,
                    required: 'Overtime Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 6,
                      message: 'Length should not be excceed from 6 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.overtimeAmount && (
                  <ErrorSpanBox error={errors.overtimeAmount?.message} />
                )}
              </FormControl>
            </div>
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Input
              type="submit"
              disabled={loader}
              value={loader ? 'Loading...' : 'Add'}
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.1rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default OvertimeAddPopup;
