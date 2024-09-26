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
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  BONUS_TYPE,
  EXPENSE_TYPES,
  // CURRENCY_PREFIX,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  //   imageAllowedTypes,
} from '../../../../utils/constants';
import '../../../../assets/css/PopupStyle.css';

type Props = {
  loader: boolean;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  formData: any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function BonusEditPopup({
  loader,
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
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
  } = useForm<BonusCreate>();

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

  const onSubmit = (data: any) => {
    data.date = dayjs(data.bonusDate).utc().format('YYYY-MM-DD HH:mm:ss');
    const obj = {
      expenseDetails: data,
      expenseType: EXPENSE_TYPES.bonus,
    };
    delete data.bonusDate;
    callback(obj);
  };

  useEffect(() => {
    setValue('type', formData?.expenseDetails?.type);
    setValue('amount', formData?.expenseDetails?.amount);
    setValue('details', formData?.expenseDetails?.details);
    setValue('bonusDate', dayjs(formData?.expenseDetails?.date));
  }, [formData]);

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
            <span className="Title">Edit Bonus</span>
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
                  options={{ roles: BONUS_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Bonus Type"
                  defaultValue="Select type"
                />
              </FormControl>
            </div>
            {watch('type') === 'others' && (
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel mt-2">Edit Details</label>
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

export default BonusEditPopup;
