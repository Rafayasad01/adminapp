// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import PercentIcon from '@mui/icons-material/Percent';
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
import TextField from '@mui/material/TextField';
import storeEmployee from '../../services/adminapp/adminStoreEmployee';
// import CustomDropDown from '../../components/common/CustomDropDown';
// import TimePicker from '../../components/common/TimePicker';
import { CommissionCreate } from '../../interfaces/commission.interface';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';

import {
  COMMISSION_TYPE,
  // CURRENCY_PREFIX,
  // DEDUCTION_TYPE,
  // INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  // PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  //   imageAllowedTypes,
} from '../../utils/constants';
import '../../assets/css/PopupStyle.css';
import CustomDropDown from '../../components/common/CustomDropDown';

type Props = {
  isButLoader: boolean;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function CommissionAddPopup({
  isButLoader,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [allEmployees, setAllEmployees] = useState<any>(null);

  const {
    register,
    handleSubmit,
    // setValue,
    // clearErrors,
    control,
    // watch,
    formState: { errors },
  } = useForm<CommissionCreate>();

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'commissions', // Name of the array field
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
    storeEmployee
      .StoreAllEmployeeLov()
      .then((item) => {
        if (item.data.success) {
          setAllEmployees(item.data.data);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, []);

  // const handleServices = () => {
  //   const obj = {
  //     productName: watch('productName'),
  //     productAmount: watch('productAmount'),
  //     type: watch('type'),
  //     productQuantity: watch('productQuantity'),
  //     totalAmount: watch('totalAmount'),
  //     commissionDate: watch('commissionDate'),
  //     commissionPercentage: watch('commissionPercentage'),
  //   };
  //   // const check: boolean = fields?.some((el: any) =>
  //   //   dayjs(el.date).isSame(dayjs(watch('deductionDate')), 'day')
  //   // );
  //   append(obj);
  //   // if (check) {
  //   //   setIsNotify(true);
  //   //   setNotifyMessage({
  //   //     text: 'This date you already selected, Please select another date',
  //   //     type: 'error',
  //   //   });
  //   //   return;
  //   // }
  //   // if (
  //   //   watch('employeeName') &&
  //   //   watch('type') !== 'none' &&
  //   //   watch('amount') &&
  //   //   watch('deductionDate')
  //   // ) {
  //   //   append(obj);
  //   //   // setValue("servicesId", 'none')
  //   //   // setValue("servicesAmount", 'none')
  //   //   // setValue("price", null)
  //   //   // setStartServiceTime(null)
  //   // } else {
  //   //   setIsNotify(true);
  //   //   setNotifyMessage({
  //   //     text: 'All Fields are Required',
  //   //     type: 'error',
  //   //   });
  //   // }
  // };

  const onSubmit = (data: any) => {
    const formattedDateTime = dayjs(data.commissionDate)
      .utc()
      .format('YYYY-MM-DD HH:mm:ss');
    const expenseDetails = [
      {
        date: formattedDateTime,
        percentage: data.commissionPercentage,
        desc: data.desc,
        type: data.type,
      },
    ];
    const obj = {
      expenseDetails,
    };
    // console.log('🚀 ~ onSubmit ~ data:', data);
    callback(obj, data.empId);
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
        // style: { minWidth: '945px', width: '950px' },
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Commission</span>
          </div>
          <div className="FormBody mt-2">
            <div className="flex items-center">
              <div className="mr-7 w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Select Date</span>
                    </div>
                    <Controller
                      name="commissionDate"
                      control={control}
                      defaultValue={dayjs()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          className="custom-border-2 w-full"
                          onChange={(date) => handleDateChange(date, field)}
                          value={field.value}
                          minDate={dayjs()}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Percentage</label>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <PercentIcon fontSize="inherit" />
                    </InputAdornment>
                  }
                  className="FormInput"
                  id="commissionPercentage"
                  type="number"
                  placeholder="2.5"
                  {...register('commissionPercentage', {
                    required: 'Commission Percentage is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 3,
                      message: 'Length should not be excceed from 3 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.commissionPercentage && (
                  <ErrorSpanBox error={errors.commissionPercentage?.message} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="empId"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: allEmployees }}
                  customClassInputTitle="font-bold"
                  inputTitle="All Employees"
                  defaultValue="Select Employee"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: COMMISSION_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Type"
                  defaultValue="Select Type"
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">
                  Description{' '}
                  <span className="SubLabel">Write 01-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="desc"
                  multiline
                  rows={1}
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
            </div>
          </div>
          {/* {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-2 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-1 px-2 font-semibold">Name</div>
                <div className="col-span-1 font-semibold">Type</div>
                <div className="col-span-1 font-semibold">Quantity</div>
                <div className="col-span-2 font-semibold">Date</div>
                <div className="col-span-1 font-semibold">Amount</div>
                <div className="col-span-1 font-semibold">Total</div>
                <div className="col-span-1 text-center font-semibold">
                  Commission
                </div>
                <div className="col-span-3 text-center font-semibold">
                  Commission Amount
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
                  <div className="col-span-1 truncate px-2 capitalize">
                    {item.productName}
                  </div>
                  <div className="col-span-1 px-2 capitalize">{item.type}</div>
                  <div className="col-span-1 px-2 capitalize">
                    {item.productQuantity ? item.productQuantity : 0}
                  </div>
                  <div className="col-span-2">
                    <span className="truncate text-sm">
                      {dayjs(item.date).format('DD MMMM YYYY')}
                    </span>
                  </div>
                  <div className="col-span-1 px-2 capitalize">
                    {item.productAmount ? item.productAmount : 0}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 text-center capitalize">
                    {item.totalAmount ? item.totalAmount : 0}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 text-center capitalize">
                    {item.commissionPercentage ? item.commissionPercentage : 0}{' '}
                    %
                  </div>
                  <div className="col-span-3 text-center capitalize">
                    {(Number(item.totalAmount) *
                      Number(item.commissionPercentage)) /
                      100}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="m-0 bg-primary p-0 text-center">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                      fontSize="small"
                    />
                  </div>
                </div>
              );
            })}
          </div> */}
          {/* <div className="mt-2">
            <Button
              onClick={handleServices}
              className="w-full"
              component="span"
            >
              <AddIcon
                className="text-primary"
                sx={{ marginRight: '0.5rem' }}
              />
              <span className="text-primary">
                {fields?.length > 0 ? `Add More Commission` : `Add Commission`}
              </span>
            </Button>
          </div> */}
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
              disabled={isButLoader}
              type="submit"
              value={isButLoader ? 'Loading...' : 'Add'}
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

export default CommissionAddPopup;
