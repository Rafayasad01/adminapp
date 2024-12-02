import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import PercentIcon from '@mui/icons-material/Percent';
import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import storeEmployeeCommission from '../../../../services/adminapp/adminCommission';
import { CommissionCreate } from '../../../../interfaces/commission.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  COMMISSION_AMOUNT_TYPE,
  CURRENCY_PREFIX,
  MAX_LENGTH_EXCEEDED,
  PRODUCT,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../../../utils/constants';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import '../../../../assets/css/PopupStyle.css';

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
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allProductsLov, setAllProductsLov] = useState<any>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CommissionCreate>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'commissions', // Name of the array field
    keyName: 'key',
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  const fetchProductsLov = () => {
    storeEmployeeCommission
      .productsLov()
      .then((item) => {
        if (item.data.success) {
          const lov = item.data.data.map((x: any) => ({
            id: x.id,
            name: x.name,
          }));
          setAllProductsLov(lov);
          setAllProducts(item.data.data);
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
  };

  useEffect(() => {
    fetchProductsLov();
  }, []);

  const productAmt =
    allProducts.length > 0
      ? allProducts.find((p: any) => p.id === watch('productName'))?.price
      : 0;

  const totalProductAmount: any = (
    Number(productAmt) * Number(watch('productQuantity'))
  ).toFixed(2);

  const handleServices = () => {
    const obj = {
      productId: watch('productName'),
      productName: allProductsLov?.find(
        (product: any) => product.id === watch('productName')
      )?.name,
      productAmount: productAmt,
      type: PRODUCT,
      productQuantity: watch('productQuantity'),
      totalAmount: totalProductAmount,
      date: watch('commissionDate'),
      commissionAmountType: watch('commissionAmountType'),
      commission: watch('commission'),
      desc: watch('desc'),
      amount:
        watch('commissionAmountType') === 'amount'
          ? Number(totalProductAmount) + Number(watch('commission'))
          : Number(totalProductAmount) +
            Number(totalProductAmount) * (Number(watch('commission')) / 100),
    };
    // append(obj);
    if (
      watch('productName') &&
      watch('productQuantity') &&
      watch('commission')
    ) {
      append(obj);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Product Name,Quantity and Commission are Required',
        type: 'error',
      });
    }
  };

  const onSubmit = (data: CommissionCreate | any) => {
    delete data.productAmount;
    delete data.productName;
    delete data.commissionDate;
    delete data.productQuantity;
    delete data.commission;
    delete data.commissionAmountType;
    delete data.desc;
    delete data.empName;
    data.commissions = data.commissions?.map((comm: any) => ({
      ...comm,
      commissionDate: dayjs(comm.commissionDate).format('YYYY-MM-DD HH:mm:ss'),
    }));
    // console.log('asdasdasd', data);
    callback({ expenseDetails: data.commissions });
  };

  const handleDateChange = (date: any, field: any) => {
    field.onChange(date);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  // const handleEmployee = (employee: string) =>
  //   allEmployees?.find((emp: any) => emp.id === employee)?.name;

  // const handleProductName = (productName: string) =>
  //   allProductsLov?.find((prod: any) => prod.id === productName)?.name;

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '1045px', width: '1050px' },
        // style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Commission</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="productName"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: allProductsLov }}
                  customClassInputTitle="font-bold"
                  inputTitle="Product Name"
                  defaultValue="Select Product"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Product Amount</label>
                <Input
                  className="FormInput"
                  id="productAmount"
                  type="text"
                  placeholder="2500"
                  disabled
                  value={productAmt}
                  // {...register('productAmount', {
                  //   value: productAmt,
                  //   required: 'Product Amount is required in numbers',
                  //   validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  //   maxLength: {
                  //     value: 15,
                  //     message: 'Length should not be excceed from 15 numbers.',
                  //   },
                  // })}
                  disableUnderline
                />
                {errors.productAmount && (
                  <ErrorSpanBox error={errors.productAmount?.message} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Product Quantity</label>
                <Input
                  className="FormInput"
                  id="productQuantity"
                  type="number"
                  placeholder="5"
                  {...register('productQuantity', {
                    required: 'Product Quantity is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 15,
                      message: 'Length should not be excceed from 15 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.productQuantity && (
                  <ErrorSpanBox error={errors.productQuantity?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Total Amount</label>
                <Input
                  className="FormInput"
                  id="totalAmount"
                  type="number"
                  placeholder="12500"
                  value={totalProductAmount ?? 0}
                  disabled
                  // {...register('totalAmount', {
                  //   disabled: true,
                  //   required: 'Total Amount is required in numbers',
                  //   value: 10,
                  //   validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  //   maxLength: {
                  //     value: 15,
                  //     message: 'Length should not be excceed from 15 numbers.',
                  //   },
                  // })}
                  disableUnderline
                />
                {errors.totalAmount && (
                  <ErrorSpanBox error={errors.totalAmount?.message} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="commissionAmountType"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: COMMISSION_AMOUNT_TYPE,
                    role: 'percentage',
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Commission Type"
                  defaultValue="Select Type"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Commission</label>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      {watch('commissionAmountType') === 'amount' ? (
                        CURRENCY_PREFIX
                      ) : (
                        <PercentIcon fontSize="inherit" />
                      )}
                    </InputAdornment>
                  }
                  className="FormInput"
                  id="commissionPercentage"
                  inputProps={{ step: 'any' }}
                  type="number"
                  placeholder={
                    watch('commissionAmountType') === 'amount' ? '200' : '2.5'
                  }
                  {...register('commission', {
                    required: 'Commission Percentage is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 3,
                      message: 'Length should not be excceed from 3 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.commission && (
                  <ErrorSpanBox error={errors.commission?.message} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              {/* <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="empName"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: allEmployees }}
                  customClassInputTitle="font-bold"
                  inputTitle="All Employees"
                  defaultValue="Select Employee"
                />
              </FormControl> */}
              <div className=" w-full">
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
              {/* <FormControl className="FormControl" variant="standard">
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
              </FormControl> */}
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
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-2 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-1 px-2 font-semibold">Name</div>
                <div className="col-span-1 font-semibold">Type</div>
                <div className="col-span-1 font-semibold">Quantity</div>
                <div className="col-span-2 font-semibold">Date</div>
                <div className="col-span-1 font-semibold">P. Amount</div>
                <div className="col-span-1 font-semibold">Total</div>
                <div className="col-span-1 text-center font-semibold">
                  Commission
                </div>
                <div className="col-span-3 text-center font-semibold">
                  Total Amount
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
                  <div className="col-span-1 truncate px-1 capitalize">
                    {item.type}
                  </div>
                  <div className="col-span-1 px-2 capitalize">
                    {item.productQuantity ? item.productQuantity : 0}
                  </div>
                  <div className="col-span-2">
                    <span className="truncate text-sm">
                      {dayjs(item.date).format('DD MMMM YYYY')}
                    </span>
                  </div>
                  <div className="col-span-1 truncate px-2 capitalize">
                    {item.productAmount ? item.productAmount : 0}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 text-center capitalize">
                    {item.totalAmount ? item.totalAmount : 0}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div className="col-span-1 text-center capitalize">
                    {item.commission ? item.commission : 0}{' '}
                    {item.commissionAmountType === 'amount'
                      ? CURRENCY_PREFIX
                      : '%'}
                  </div>
                  <div className="col-span-3 text-center capitalize">
                    {Number(item.amount).toFixed(2)}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </div>
                  <div
                    className="m-0 bg-primary p-0 text-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  >
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
              <AddIcon
                className="text-primary"
                sx={{ marginRight: '0.5rem' }}
              />
              <span className="text-primary">
                {fields?.length > 0 ? `Add More Commission` : `Add Commission`}
              </span>
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
