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
import CustomDropDown from '../../../../components/common/CustomDropDown';
import storeEmployeeCommission from '../../../../services/adminapp/adminCommission';
// import storeEmployee from '../../../../services/adminapp/adminStoreEmployee';
// import TimePicker from '../../../../components/common/TimePicker';
import { CommissionCreate } from '../../../../interfaces/commission.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  COMMISSION_AMOUNT_TYPE,
  CURRENCY_PREFIX,
  EXPENSE_TYPES,
  // INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  // PATTERN,
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
  formData: any;
};

function CommissionEditPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  formData,
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
  } = useForm<CommissionCreate>();
  // const [allEmployees, setAllEmployees] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allProductsLov, setAllProductsLov] = useState<any>([]);

  // console.log('Errors', errors, watch('avatar'));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  useEffect(() => {
    setValue('commissionDate', dayjs(formData?.expenseDetails?.commissionDate));
  }, [formData]);

  // console.log('formData', formData);

  const productAmt =
    allProducts.length > 0
      ? allProducts.find((p: any) => p.id === watch('productId'))?.price
      : 0;

  // console.log('🚀 ~ productAmt:', productAmt);
  const totalProductAmount: any = (
    Number(productAmt) * Number(watch('productQuantity'))
  ).toFixed(2);

  const totalCommissionAmount =
    watch('commissionAmountType') === 'amount'
      ? Number(totalProductAmount) + Number(watch('commission'))
      : watch('commissionAmountType') === 'percentage'
      ? Number(totalProductAmount) +
        Number(totalProductAmount) * (Number(watch('commission')) / 100)
      : 0;

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

  // const fetchEmpLov = () => {
  //   storeEmployee
  //     .StoreEmployeeLov()
  //     .then((item) => {
  //       if (item.data.success) {
  //         setAllEmployees(item.data.data);
  //       } else {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: item.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  // const productAmt =
  //   allProducts.length > 0
  //     ? allProducts.find((p: any) => p.id === watch('productName'))?.price
  //     : 0;

  // const totalProductAmount: any = (
  //   Number(productAmt) * Number(watch('productQuantity'))
  // ).toFixed(2);

  useEffect(() => {
    // fetchEmpLov();
    fetchProductsLov();
  }, []);

  const onSubmit = (data: any) => {
    const obj = {
      ...data,
      productName: allProductsLov?.find(
        (product: any) => product.id === watch('productId')
      )?.name,
      // empName: allEmployees?.find((emp: any) => emp.id === watch('empId'))
      //   ?.name,
      totalAmount: totalProductAmount,
      productAmount: productAmt,
      date: dayjs(data.commissionDate).format('YYYY-MM-DD HH:mm:ss'),
      amount: totalCommissionAmount.toFixed(2),
      type: formData?.expenseDetails?.type,
    };
    // console.log('obj', obj);
    callback({ expenseType: EXPENSE_TYPES.commission, expenseDetails: obj });
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
            <span className="Title">Update Commission</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="productId"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: allProductsLov,
                    role: formData?.expenseDetails?.productId,
                  }}
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
                {/* {errors.productAmount && (
                  <ErrorSpanBox error={errors.productAmount?.message} />
                )} */}
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
                    value: formData?.expenseDetails?.productQuantity,
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
                {/* {errors.totalAmount && (
                  <ErrorSpanBox error={errors.totalAmount?.message} />
                )} */}
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
                    required: 'Commission is required in numbers',
                    value: formData?.expenseDetails?.commission,
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 15,
                      message: 'Length should not be excceed from 15 numbers.',
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
                  id="empId"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: allEmployees,
                    role: formData?.expenseDetails?.empId,
                  }}
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
                <label className="FormLabel">Total Amount</label>
                <Input
                  className="FormInput"
                  id="productAmount"
                  type="text"
                  placeholder="2500"
                  disabled
                  value={totalCommissionAmount?.toFixed(2)}
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
                {/* {errors.productAmount && (
                  <ErrorSpanBox error={errors.productAmount?.message} />
                )} */}
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
              value="Update"
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

export default CommissionEditPopup;
