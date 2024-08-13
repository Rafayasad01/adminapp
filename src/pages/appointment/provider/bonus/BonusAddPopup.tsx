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
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
import CustomDropDown from '../../../../components/common/CustomDropDown';
// import TimePicker from '../../../../components/common/TimePicker';
import { BonusCreate } from '../../../../interfaces/bonus.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  CURRENCY_PREFIX,
  DEDUCTION_TYPE,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
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
};

function DeductionAddPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    // clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<BonusCreate>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deductions', // Name of the array field
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

  useEffect(() => {
    if (watch('type') !== 'others') setValue('details', null);
  }, [watch('type')]);

  const handleServices = () => {
    const obj = {
      employeeName: watch('employeeName'),
      type: watch('type'),
      amount: watch('amount'),
      date: watch('bonusDate'),
      details: watch('details'),
    };
    if (watch('amount').length > 6) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'length must not be greater than 6',
        type: 'error',
      });
      return;
    }
    append(obj);
    // const check: boolean = fields?.some((el: any) =>
    //   dayjs(el.date).isSame(dayjs(watch('bonusDate')), 'day')
    // );
    // if (check) {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: 'This date you already selected, Please select another date',
    //     type: 'error',
    //   });
    //   return;
    // }
    // if (
    //   watch('employeeName') &&
    //   watch('type') !== 'none' &&
    //   watch('amount') &&
    //   watch('deductionDate')
    // ) {
    //   // setValue("servicesId", 'none')
    //   // setValue("servicesAmount", 'none')
    //   // setValue("price", null)
    //   // setStartServiceTime(null)
    // } else {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: 'All Fields are Required',
    //     type: 'error',
    //   });
    // }
  };

  const onSubmit = (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // data.avatar = image;
    // const res = {
    //   name: data.categoryName,
    //   description: data.categoryDesc,
    //   avatar: image,
    // };
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
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add New Bonus</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: DEDUCTION_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Bonus Type"
                  defaultValue="Select type"
                />
              </FormControl>
            </div>
            {watch('type') === 'others' && (
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel mt-2">Add Details</label>
                  <Input
                    className="FormInput"
                    {...register('details', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                    })}
                    placeholder="Enter Details"
                    type="text"
                    id="details"
                    disableUnderline
                  />
                  {errors.details?.type === 'required' && (
                    <ErrorSpanBox error="Details is required" />
                  )}
                  {errors.details?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.details?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
            )}
            <div className="FormFields">
              <div className="w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Select Bonus Date</span>
                    </div>
                    <Controller
                      name="bonusDate"
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
                <div className="col-span-3 font-semibold">Details</div>
                <div className="col-span-3 font-semibold">Date</div>
                <div className="col-span-3 font-semibold">Amount</div>
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
                  <div className="col-span-2 truncate px-2 capitalize">
                    {item.type}
                  </div>
                  <div className="col-span-2 truncate px-1">
                    {item.details ?? '--'}
                  </div>
                  <div className="col-span-3 text-center capitalize">
                    {dayjs(item.date).isValid()
                      ? dayjs(item.date).format('DD MMMM YYYY')
                      : '--'}
                  </div>
                  <div className="col-span-4 text-center">
                    {item.amount}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 bg-primary text-center">
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
              {fields?.length > 0 ? `Add More Bonus` : `Add Bonus`}
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
              value="Add"
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
