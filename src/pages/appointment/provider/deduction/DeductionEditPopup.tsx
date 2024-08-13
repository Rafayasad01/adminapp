// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import TimePicker from '../../../../components/common/TimePicker';

import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';
import { DeductionCreate } from '../../../../interfaces/deduction.interface';
import {
  // CURRENCY_PREFIX,
  DEDUCTION_TYPE,
  EXPENSE_TYPES,
  // INVALID_CHAR,
  // MAX_LENGTH_EXCEEDED,
  // PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  //   imageAllowedTypes,
} from '../../../../utils/constants';
import '../../../../assets/css/PopupStyle.css';

type Props = {
  loader: boolean;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  // setIsNotify: any;
  // setNotifyMessage: any;
  formData: any;
};

function DeductionEditPopup({
  loader,
  openFormDialog,
  setOpenFormDialog,
  callback,
  formData,
}: // setIsNotify,
// setNotifyMessage,
Props) {
  //   const [image, setImage] = useState<any>(null);
  const [timeIn, setTimeIn] = useState<any>(null);
  const [timeOut, setTimeOut] = useState<any>(null);

  console.log('🚀 ~ formData:', formData);
  const {
    register,
    handleSubmit,
    setValue,
    // clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<DeductionCreate>();
  // console.log('timeIn', timeIn);

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'deductions', // Name of the array field
  //   keyName: 'key',
  // });

  // console.log('Errors', errors, watch('avatar'));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  useEffect(() => {
    if (formData?.expenseDetails?.timeIn)
      setTimeIn(formData?.expenseDetails?.timeIn);
    if (formData?.expenseDetails?.timeOut)
      setTimeIn(formData?.expenseDetails?.timeOut);
    if (
      formData.expenseDetails.type === 'LateArrival' ||
      formData.expenseDetails.type === 'EarlyGoing' ||
      formData.expenseDetails.type === 'HalfDay'
    ) {
      setValue('type', formData?.expenseDetails?.type);
      setTimeIn(formData.expenseDetails.timeIn);
      setTimeOut(formData.expenseDetails.timeOut);
    }
  }, [formData]);

  // const handleServices = () => {
  //   const obj = {
  //     employeeName: watch('employeeName'),
  //     type: watch('type'),
  //     amount: watch('amount'),
  //     date: watch('deductionDate'),
  //     timeIn,
  //     timeOut,
  //   };
  //   const check: boolean = fields?.some((el: any) =>
  //     dayjs(el.date).isSame(dayjs(watch('deductionDate')), 'day')
  //   );
  //   if (check) {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: 'This date you already selected, Please select another date',
  //       type: 'error',
  //     });
  //     return;
  //   }
  //   // );
  //   if (
  //     watch('employeeName') &&
  //     watch('type') !== 'none' &&
  //     watch('amount') &&
  //     watch('deductionDate')
  //   ) {
  //     append(obj);
  //     // setValue("servicesId", 'none')
  //     // setValue("servicesAmount", 'none')
  //     // setValue("price", null)
  //     // setStartServiceTime(null)
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: 'All Fields are Required',
  //       type: 'error',
  //     });
  //   }
  // };

  const onSubmit = (data: any) => {
    delete data.deductionDate;
    data.timeIn = timeIn
      ? dayjs(timeIn).utc().format('YYYY-MM-DD HH:mm:ss')
      : null;
    data.timeOut = timeOut
      ? dayjs(timeOut).utc().format('YYYY-MM-DD HH:mm:ss')
      : null;
    if (
      watch('type') !== 'LateArrival' &&
      watch('type') !== 'EarlyGoing' &&
      watch('type') !== 'HalfDay'
    ) {
      data.timeIn = null;
      data.timeOut = null;
      setTimeIn(null);
      setTimeOut(null);
    }
    data.date = dayjs(data.deduction).utc().format('YYYY-MM-DD HH:mm:ss');
    const obj = {
      expenseDetails: data,
      expenseType: EXPENSE_TYPES.deduction,
    };
    // console.log('🚀 ~ onSubmit ~ data:', data);
    callback(obj);
  };

  // console.log('🚀 ~ onSubmit ~ data:', watch('type'));

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    field.onChange(date);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

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
            <span className="Title">Edit Deduction</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: DEDUCTION_TYPE,
                    role: formData.expenseDetails.type,
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Deduction Type"
                  defaultValue="Select type"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Enter Amount"
                  {...register('amount', {
                    value: formData.expenseDetails.amount,
                    required: 'Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 10,
                      message: 'Length should not be excceed from 10 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.amount && (
                  <ErrorSpanBox error={errors.amount?.message} />
                )}
              </FormControl>
            </div>

            {(watch('type') === 'LateArrival' ||
              watch('type') === 'EarlyGoing' ||
              watch('type') === 'HalfDay') && (
              <div className="FormFields">
                <TimePicker
                  timePickerLabel="Time In"
                  timePickerSubLabel="Select Time In"
                  timePickerValue={timeIn}
                  setTimePickerValue={setTimeIn}
                  id="timeIn"
                  // errors={items.error}
                  // setError={setError}
                />
                <TimePicker
                  timePickerLabel="Time Out"
                  timePickerSubLabel="Select Time Out"
                  timePickerValue={timeOut}
                  setTimePickerValue={setTimeOut}
                  id="timeOut"
                  // errors={items.error}
                  // setError={setError}
                />
              </div>
            )}
            <div className="FormFields">
              <div className="w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Select Deduction Date</span>
                    </div>
                    <Controller
                      name="deductionDate"
                      control={control}
                      defaultValue={dayjs()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          className="custom-border-2 w-full"
                          onChange={(date) => handleDateChange(date, field)}
                          // onChange={(date) => field.onChange(date)}
                          value={field.value}
                          minDate={dayjs()}
                        />
                      )}
                    />
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            {/* <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">
                  Description{' '}
                  <span className="SubLabel">Write 01-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="desc"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
              </FormControl>
            </div> */}
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
              value={loader ? 'loading...' : 'Update'}
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

export default DeductionEditPopup;
