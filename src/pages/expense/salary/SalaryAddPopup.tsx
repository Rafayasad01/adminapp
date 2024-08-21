import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../../components/common/CustomMultipleSelect';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import storeEmployee from '../../../services/adminapp/adminStoreEmployee';
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

interface Salary {
  staff: string;
  amount: number;
  paymentMethod: string;
  month: any;
  paymentDate: any;
  amountDetails: any;
  commission: number;
  overtime: number;
  bonus: number;
  loan: number;
}

function SalaryAddPopup({
  loader,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [employees, setEmployees] = useState<any>([]);
  dayjs.extend(utcPlugin);
  dayjs.extend(advancedFormat);

  const paymentMethod = [
    { id: 'Cash', name: 'Cash' },
    { id: 'Online', name: 'Online' },
  ];

  type TempType = 'commission' | 'overtime' | 'bonus' | 'loan';

  const amountDetails: Array<{ id: TempType; name: string }> = [
    { id: 'commission', name: 'Commission' },
    { id: 'overtime', name: 'Overtime' },
    { id: 'bonus', name: 'Bonus' },
    { id: 'loan', name: 'Loan' },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    // clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<Salary>({
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

  useEffect(() => {
    storeEmployee.StoreEmployeeLov().then((item) => {
      if (item.data.success) {
        setEmployees(item.data.data);
      }
    });
  }, []);

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

  const onSubmit = (data: any) => {
    const check: boolean = fields?.some((el: any) => el.staff === data.staff);
    if (!check) {
      const staff = employees.find((item: any) => item.id === data.staff);
      const obj = {
        staff: data.staff,
        name: staff.name,
        paymentMethod: data.paymentMethod,
        month: dayjs(data.month).utc().format('YYYY-MM-DD HH:mm:ss'),
        paymentDate: dayjs(data.paymentDate)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        amountDetails: {
          salary: data.amount,
          commission: data.commission ?? 0,
          overtime: data.overtime ?? 0,
          bonus: data.bonus ?? 0,
          loan: data.loan ?? 0,
        },
        total: 0,
        userType: 'StaffUser',
      };
      let total = 0;
      if (data.amount) {
        total += Number(data.amount);
      }

      if (data.commission) {
        total += Number(data.commission);
      }

      if (data.overtime) {
        total += Number(data.overtime);
      }

      if (data.bonus) {
        total += Number(data.bonus);
      }

      if (data.loan) {
        total += Number(data.loan);
      }
      obj.total = total;

      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Already exist this employee',
        type: 'error',
      });
    }
  };

  const renderFields = () => {
    const selectedFileds = watch('amountDetails');
    if (selectedFileds.length) {
      return selectedFileds.map((item: TempType) => {
        const payFilter: { id: TempType; name: string } | undefined =
          amountDetails.find((filterItem) => filterItem.id === item);
        if (!payFilter) {
          return null;
        }

        const error = errors[payFilter.id];
        return (
          <FormControl
            className="FormControl"
            variant="standard"
            key={payFilter.id}
          >
            <label className="FormLabel">{payFilter.name}</label>
            <Input
              className="FormInput"
              id={payFilter.id}
              type="number"
              defaultValue={0}
              {...register(payFilter.id, {
                required: `${payFilter.name} is required in numbers`,
                validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                min: {
                  value: 1,
                  message: 'Should be greater then 0.',
                },
              })}
              disableUnderline
            />
            {error && <ErrorSpanBox error={error?.message} />}
          </FormControl>
        );
      });
    }
    return null;
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
            <span className="Title">Add Salary Expense</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields3columns">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="staff"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: employees,
                    // DEDUCTION_TYPE
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Staff"
                  defaultValue="Select Staff"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Salary Amount</label>
                <Input
                  className="FormInput"
                  id="amount"
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
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Salary Month</span>
                    </div>
                    <div className="w-full rounded-md border border-gray-200">
                      <Controller
                        name="month"
                        control={control}
                        rules={{ required: 'Salary month is required' }}
                        defaultValue={dayjs()}
                        render={({ field }) => (
                          <>
                            <DesktopDatePicker
                              {...field}
                              className="w-full p-0"
                              onChange={(date) => handleDateChange(date, field)}
                              // onChange={(date) => field.onChange(date)}
                              value={field.value}
                              minDate={dayjs()}
                            />
                            {/* {error && <ErrorSpanBox error={error?.message} />} */}
                          </>
                        )}
                      />
                    </div>
                    {errors.month && (
                      <ErrorSpanBox error={errors.month?.message} />
                    )}
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
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
                <CustomMultipleSelectBox
                  validateRequired
                  id="amountDetails"
                  control={control}
                  error={errors}
                  setValue={setValue}
                  register={register}
                  options={{ roles: amountDetails }}
                  customClassInputTitle="font-bold"
                  inputTitle="Additional Pays"
                  defaultVal="-- Select Additional Pays --"
                />
              </FormControl>
            </div>
            <div className="FormFields4columns">
              {watch('amountDetails') && renderFields()}
            </div>
          </div>
          <div>
            <div className="mt-2">
              <Button type="submit" className="w-full">
                <AddIcon sx={{ marginRight: '0.5rem' }} />
                {fields?.length > 0 ? `Add More Salary` : `Add Salary`}
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
                <div className="col-span-1 font-semibold">Month</div>
                <div className="col-span-2 font-semibold">Pay</div>
                <div className="col-span-1 font-semibold">Amount</div>
                <div className="col-span-2 font-semibold">Payment Date</div>
                <div className="col-span-1 font-semibold">Payment Method</div>
                <div className="col-span-1 font-semibold">Total</div>
                <div className="col-span-1 font-semibold">&nbsp;</div>
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
                  <div className="col-span-1 px-2 capitalize">
                    {dayjs(item.month).format('MMMM')}
                  </div>
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
                  <div
                    className="flex h-full cursor-pointer items-center justify-center bg-primary text-center"
                    onClick={() => remove(index)}
                  >
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      fontSize="small"
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

export default SalaryAddPopup;
