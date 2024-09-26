// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
  CURRENCY_PREFIX,
  DEDUCTION_TYPE,
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
  setIsNotify: any;
  setNotifyMessage: any;
};

function DeductionAddPopup({
  loader,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  //   const [image, setImage] = useState<any>(null);
  const [timeIn, setTimeIn] = useState<any>(null);
  const [timeOut, setTimeOut] = useState<any>(null);

  const {
    register,
    handleSubmit,
    // setValue,
    // clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<DeductionCreate>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenseDetails', // Name of the array field
    keyName: 'key',
  });

  // console.log('Errors', errors, watch('avatar'));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  const handleServices = () => {
    let newtimeIn = timeIn;
    let newtimeOut = timeOut;
    if (
      watch('type') !== 'LateArrival' &&
      watch('type') !== 'EarlyGoing' &&
      watch('type') !== 'HalfDay'
    ) {
      setTimeOut(null);
      setTimeIn(null);
      newtimeIn = null;
      newtimeOut = null;
    }
    const obj = {
      type: watch('type'),
      amount: watch('amount'),
      date: watch('deductionDate'),
      timeIn: newtimeIn,
      timeOut: newtimeOut,
    };
    if (watch('type') !== 'none' && watch('amount') && watch('deductionDate')) {
      if (
        (watch('type') !== 'LateArrival' &&
          watch('type') !== 'EarlyGoing' &&
          watch('type') !== 'HalfDay' &&
          timeIn === null) ||
        timeOut === null
      ) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Time is required',
          type: 'error',
        });
        return;
      }
      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All Fields are Required',
        type: 'error',
      });
    }
  };

  const onSubmit = (data: any) => {
    delete data.amount;
    delete data.deductionDate;
    delete data.desc;
    delete data.employeeName;
    delete data.type;
    data.expenseDetails = fields.map((e: any) => {
      const formattedDateTime = dayjs(e.date)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      e.date = formattedDateTime;
      delete e.key;
      return e;
    });
    // console.log('🚀 ~ onSubmit ~ data:', data);
    callback(data);
  };

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    field.onChange(date);
  };

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

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '750px', width: '700px' },
        // style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add New Deduction</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              {/* <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Employee Name</label>
                <Input
                  className="FormInput"
                  {...register('employeeName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Employee Name"
                  type="text"
                  id="employeeName"
                  disableUnderline
                />
                {errors.employeeName?.type === 'required' && (
                  <ErrorSpanBox error="Category name is required" />
                )}
                {errors.employeeName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.employeeName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl> */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Enter Amount"
                  {...register('amount', {
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
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: DEDUCTION_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Deduction Type"
                  defaultValue="Select type"
                />
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
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-4 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-2 px-2 font-semibold">Type</div>
                <div className="col-span-2 font-semibold">Time In</div>
                <div className="col-span-2 font-semibold">Time Out</div>
                <div className="col-span-2 font-semibold">Date</div>
                <div className="col-span-3 text-center font-semibold">
                  Amount
                </div>
                <div className="" />
              </div>
            </div>
          )}
          <div className="mx-[2px] overflow-x-hidden overflow-y-scroll px-[8px] xl:max-h-[180px] xl:min-h-[0px] 2xl:h-[150px]">
            {fields?.map((item: any, index: number) => {
              return (
                <div
                  className="my-2 grid grid-cols-12 items-center justify-between rounded-md border-[1px] border-[#949EAE] p-0 text-sm text-[#1A1A1A]"
                  key={index}
                >
                  <div className="col-span-2 px-2 capitalize">{item.type}</div>
                  <div className="col-span-2 px-4 capitalize">
                    {dayjs(item.timeIn).isValid()
                      ? dayjs(item.timeIn).format('hh:mm')
                      : '00:00'}
                  </div>
                  <div className="col-span-2 px-3 capitalize">
                    {dayjs(item.timeOut).isValid()
                      ? dayjs(item.timeOut).format('hh:mm')
                      : '00:00'}
                    {/* {dayjs(item.timeOut).format('hh:mm')} */}
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm">
                      {dayjs(item.date).format('DD MMMM YYYY')}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {item.amount}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="bg-primary text-center">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                      fontSize="small"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2">
            <Button
              onClick={handleServices}
              className="w-full"
              component="span"
            >
              <AddIcon sx={{ marginRight: '0.5rem' }} />
              {fields?.length > 0 ? `Add More Deductions` : `Add Deduction`}
            </Button>
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
              value={loader ? 'loading...' : 'Add'}
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

export default DeductionAddPopup;
