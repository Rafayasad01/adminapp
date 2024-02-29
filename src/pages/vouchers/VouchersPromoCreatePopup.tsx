/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { useAppSelector } from '../../redux/redux-hooks';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH,
} from '../../utils/constants';

type Props = {
  vouchersPromoDialog: boolean;
  setVouchersPromoDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
};

interface CreateVoucherPayload {
  discountType: 'Amount' | 'Percentage';
  value: number;
  minAmount: number;
  maxRedeem: any;
  validFrom: string;
  validTill: string;
  isActive: boolean;
  type: 'Referral' | 'Promo';
  backOfficeUser: string;
  voucherCode: string;
  isUnlimitedRedeem: boolean;
  maxUserRedeem: string;
}

interface CreateVoucherFromData {
  type: string;
  discountType: string;
  voucherCode: string;
  value: string;
  minProduct: string;
  minAmount: string;
  maxRedeem: any;
  isActive: boolean;
  isUnlimitedRedeem: boolean;
  maxUserRedeem: string;
  validTill: string;
  validFrom: string;
}

function VouchersPromoCreatePopup({
  vouchersPromoDialog,
  setVouchersPromoDialog,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateVoucherFromData>();

  const authState: any = useAppSelector((state) => state?.authState);
  const handleFormClose = () => setVouchersPromoDialog(false);
  const [checked, setChecked] = React.useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (data: CreateVoucherFromData) => {
    handleFormClose();
    const createVoucherPayload: CreateVoucherPayload = {
      type: data.type as 'Referral' | 'Promo',
      discountType: data.discountType as 'Amount' | 'Percentage',
      voucherCode: data.voucherCode,
      value: +data.value,
      minAmount: +data.minAmount,
      maxRedeem: data.isUnlimitedRedeem ? 0 : data.maxRedeem,
      isActive: data.isActive,
      backOfficeUser: authState.user.id,
      validFrom: dayjs(data.validFrom)?.format('YYYY-MM-DD HH:mm:ss'),
      validTill: dayjs(data.validTill)?.format('YYYY-MM-DD HH:mm:ss'),
      isUnlimitedRedeem: data.isUnlimitedRedeem,
      maxUserRedeem: data.maxUserRedeem,
    };
    callback(createVoucherPayload);
    // reset();
  };

  useEffect(() => {
    if (watch('isUnlimitedRedeem')) {
      setValue('maxRedeem', 0);
    } else {
      setValue('maxUserRedeem', '0');
    }
  }, [watch('isUnlimitedRedeem')]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={vouchersPromoDialog}
        onClose={handleFormClose}
        PaperProps={{
          className: 'Dialog',
          style: { maxWidth: '100%', maxHeight: 'auto' },
        }}
      >
        <div className="Content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="FormHeader">
              <span className="Title">Add Voucher</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Coupon Type</label>
                  <Select
                    {...register('type', { required: true })}
                    className="FormSelect"
                    id="type"
                    name="type"
                    labelId="demo-simple-select-label"
                    defaultValue="Promo"
                    disableUnderline
                  >
                    <MenuItem value="Promo">Promo</MenuItem>
                  </Select>
                  {errors.type?.type === 'required' && (
                    <span
                      role="alert"
                      style={{
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        color: 'rgb(220 38 38 / 1)',
                      }}
                    >
                      Coupon Type is required
                    </span>
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Offer Type</label>
                  <Select
                    {...register('discountType', { required: true })}
                    className="FormSelect"
                    id="discountType"
                    name="discountType"
                    labelId="demo-simple-select-label"
                    defaultValue="Amount"
                    disableUnderline
                  >
                    <MenuItem value="Amount">Amount</MenuItem>
                    <MenuItem value="Percentage">Percentage</MenuItem>
                  </Select>
                  {errors.discountType?.type === 'required' && (
                    <span
                      role="alert"
                      style={{
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        color: 'rgb(220 38 38 / 1)',
                      }}
                    >
                      Offer Type is required
                    </span>
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <CustomDateTimePicker
                    register={register}
                    value={watch('validFrom')}
                    id="validFrom"
                    error={errors.validTill}
                    inputTitle="Valid From"
                    setValue={setValue}
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <CustomDateTimePicker
                    register={register}
                    value={watch('validTill')}
                    id="validTill"
                    error={errors.validTill}
                    inputTitle="Valid Till"
                    setValue={setValue}
                  />
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Voucher Code</label>
                  <Input
                    {...register('voucherCode', {
                      required: true,
                      pattern: PATTERN.CHAR_NUM_DASH,
                      validate: (value) => value.length <= 100,
                    })}
                    className="FormInput"
                    id="voucherCode"
                    name="voucherCode"
                    placeholder="Voucher Code"
                    disableUnderline
                  />
                  {errors.voucherCode?.type === 'required' && (
                    <ErrorSpanBox error="Coupon Code is required" />
                  )}
                  {errors.voucherCode?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.voucherCode?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Offer Value</label>
                  <Input
                    {...register('value', {
                      required: 'Offer Value is required in numbers',
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    className="FormInput"
                    id="value"
                    name="value"
                    type="number"
                    placeholder="Offer Value"
                    disableUnderline
                  />
                  {errors?.value && (
                    <ErrorSpanBox error={errors?.value?.message} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Min Amount</label>
                  <Input
                    {...register('minAmount', {
                      required: 'Min Amount is required in numbers',
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    className="FormInput"
                    id="minAmount"
                    type="number"
                    name="minAmount"
                    placeholder="Min Amount"
                    disableUnderline
                  />
                  {errors?.minAmount && (
                    <ErrorSpanBox error={errors?.minAmount?.message} />
                  )}
                </FormControl>
                {/* {watch('isUnlimitedRedeem') === true && */}
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Max Redeem</label>
                  <Input
                    {...register('maxRedeem', {
                      required:
                        watch('isUnlimitedRedeem') === false
                          ? 'Max Redeem is required in numbers'
                          : false,
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH(value, 0),
                    })}
                    disabled={watch('isUnlimitedRedeem')}
                    className="FormInput"
                    id="maxRedeem"
                    name="maxRedeem"
                    type="number"
                    placeholder="Max Redeem"
                    disableUnderline
                  />
                  {errors?.maxRedeem && (
                    <ErrorSpanBox
                      error={errors?.maxRedeem?.message?.toString()}
                    />
                  )}
                </FormControl>
                {/* } */}
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Status</label>
                  <Switch
                    {...register('isActive')}
                    checked={checked}
                    id="isActive"
                    name="isActive"
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: '#1D1D1D' }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                      }
                      {...register('isUnlimitedRedeem')}
                    />
                  }
                  label="Enable Max Users Offer"
                />
              </div>
              {watch('isUnlimitedRedeem') === true && (
                <div>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Max User Redeem</label>
                    <Input
                      className="FormInput"
                      {...register('maxUserRedeem', {
                        required:
                          watch('isUnlimitedRedeem') === true &&
                          'Max users redeem is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                      })}
                      type="number"
                      id="maxUserRedeem"
                      placeholder="Enter Max User Redeem limit"
                      disableUnderline
                    />
                    {errors?.maxUserRedeem && (
                      <ErrorSpanBox error={errors?.maxUserRedeem?.message} />
                    )}
                  </FormControl>
                </div>
              )}
            </div>
            <div className="FormFooter">
              <Button
                className="btn-black-outline"
                onClick={handleFormClose}
                type="button"
                sx={{
                  marginRight: '0.5rem',
                  padding: '0.375rem 1.5rem !important',
                }}
              >
                Cancel
              </Button>
              <Button
                className="btn-black-fill"
                type="submit"
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
}

export default VouchersPromoCreatePopup;
