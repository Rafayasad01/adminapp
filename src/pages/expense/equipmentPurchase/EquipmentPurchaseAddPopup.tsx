// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utcPlugin from 'dayjs/plugin/utc';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';

import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
// import { DeductionCreate } from '../../../interfaces/deduction.interface';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import {
  CURRENCY_PREFIX,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../../utils/constants';

type Props = {
  loader: boolean;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

interface Maintenance {
  name: string;
  equipment: number;
  labour: number;
  transportation: number;
  paymentMethod: string;
  paymentDate: any;
}

function EquipmentPurchaseAddPopup({
  loader,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  dayjs.extend(utcPlugin);
  dayjs.extend(advancedFormat);

  const paymentMethod = [
    { id: 'Cash', name: 'Cash' },
    { id: 'Online', name: 'Online' },
  ];

  const {
    register,
    handleSubmit,
    // setValue,
    // clearErrors,
    control,
    formState: { errors },
  } = useForm<Maintenance>({
    defaultValues: {
      paymentMethod: 'Cash',
    },
  });

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

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    field.onChange(date);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const onSubmit = (data: any) => {
    const check: boolean = fields?.some((el: any) => el.name === data.name);
    if (!check) {
      const obj = {
        name: data.name,
        paymentMethod: data.paymentMethod,
        paymentDate: dayjs(data.paymentDate)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        amountDetails: {
          equipment: data.equipment,
          labour: data.labour,
          transportation: data.transportation,
        },
        total: 0,
      };
      let total = 0;
      if (data.equipment) total += Number(data.equipment);
      if (data.labour) total += Number(data.labour);
      if (data.transportation) total += Number(data.transportation);

      obj.total = total;

      if (total === 0) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Amount is 0',
          type: 'error',
        });
        return null;
      }

      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Already exist this name',
        type: 'error',
      });
    }
    return null;
  };

  const handleServices = () => {
    if (fields.length) {
      const data = fields.map((item) => {
        const { key: _key, ...rest } = item;
        return rest;
      });
      callback(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Fields is empty',
        type: 'error',
      });
    }
  };

  const renderAditionalFields = (data: { [key: string]: string }) => {
    return Object.entries(data).map(([key, value]) => {
      if (Number(value) <= 0) {
        return null;
      }
      return (
        <>
          <div className="col-span-2 flex capitalize" key={key}>
            {key}
          </div>
          <div className="col-span-1 flex px-2 capitalize" key={key + value}>
            {Number(value).toLocaleString()} {CURRENCY_PREFIX}
          </div>
        </>
      );
    });
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: {
          maxWidth: '100%',
          maxHeight: 'auto',
          minWidth: '75%',
        },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Equipment Purchase Expense</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields3columns">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Name</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  disableUnderline
                />
                {errors.name && <ErrorSpanBox error={errors.name?.message} />}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Payment Date</span>
                    </div>
                    <div className="w-full rounded-md border border-gray-200">
                      <Controller
                        name="paymentDate"
                        control={control}
                        rules={{ required: 'Payment date is required' }}
                        defaultValue={dayjs()}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            className="w-full p-0"
                            onChange={(date) => handleDateChange(date, field)}
                            // onChange={(date) => field.onChange(date)}
                            value={field.value}
                            minDate={dayjs()}
                          />
                        )}
                      />
                    </div>
                    {errors.paymentDate && (
                      <ErrorSpanBox error={errors.paymentDate?.message} />
                    )}
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="paymentMethod"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: paymentMethod,
                    // DEDUCTION_TYPE
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Payment Method"
                  defaultValue="Select Payment Method"
                />
              </FormControl>
            </div>
            <div className="FormFields3columns">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Equipment Amount</label>
                <Input
                  className="FormInput"
                  id="equipmentAmount"
                  type="number"
                  defaultValue={0}
                  {...register('equipment', {
                    required: 'Equipment amount is required',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {errors.equipment && (
                  <ErrorSpanBox error={errors.equipment?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Labour Amount</label>
                <Input
                  className="FormInput"
                  id="labourAmount"
                  type="number"
                  defaultValue={0}
                  {...register('labour', {
                    required: 'Labour amount is required',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {errors.labour && (
                  <ErrorSpanBox error={errors.labour?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Transportation Amount</label>
                <Input
                  className="FormInput"
                  id="transportationAmount"
                  type="number"
                  defaultValue={0}
                  {...register('transportation', {
                    required: 'Transportation amount is required',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {errors.transportation && (
                  <ErrorSpanBox error={errors.transportation?.message} />
                )}
              </FormControl>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <Button type="submit" className="w-full">
                <AddIcon sx={{ marginRight: '0.5rem' }} />
                {fields?.length > 0 ? `Add More Utility` : `Add Utility`}
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
              <Button
                onClick={handleServices}
                disabled={loader}
                className="btn-black-fill w-full"
              >
                {loader ? 'loading...' : 'Submit'}
              </Button>
            </div>
          </div>
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-4 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-2 px-2 font-semibold">Name</div>
                <div className="col-span-2 font-semibold">Pay</div>
                <div className="col-span-1 font-semibold">Amount</div>
                <div className="col-span-2 font-semibold">Payment Date</div>
                <div className="col-span-1 font-semibold">Payment Method</div>
                <div className="col-span-1 font-semibold">Total</div>
                <div className="col-span-2 font-semibold">&nbsp;</div>
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
                  <div className="col-span-2 px-2 capitalize">{item.name}</div>
                  <div className="col-span-3 grid grid-cols-3 px-2">
                    {renderAditionalFields(item.amountDetails)}
                  </div>
                  <div className="col-span-2 px-2 capitalize">
                    {dayjs(item.paymentDate).format('Do MMMM YYYY')}
                  </div>
                  <div className="col-span-1 px-2 capitalize">
                    {item.paymentMethod}
                  </div>
                  <div className="col-span-1 px-2 capitalize">
                    {Number(item.total).toLocaleString()}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 px-2" />
                  <div className="flex h-full cursor-pointer items-center justify-center bg-primary text-center">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      fontSize="small"
                      onClick={() => remove(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default EquipmentPurchaseAddPopup;
