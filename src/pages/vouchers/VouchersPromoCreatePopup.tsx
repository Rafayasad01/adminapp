/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { useAppSelector } from '../../redux/redux-hooks';
import DatePickerField from './DatePickerField';
import { INVALID_CHAR, MAX_LENGTH_EXCEEDED, PATTERN, VALIDATE_NON_NEGATIVE_NUM } from '../../utils/constants';

type Props = {
  vouchersPromoDialog: boolean;
  setVouchersPromoDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
};

interface CreateVoucherPayload {
  discountType: 'Amount' | 'Percentage';
  value: number;
  minProduct: number;
  minAmount: number;
  maxRedeem: number;
  validFrom: string;
  validTill: string;
  isActive: boolean;
  type: 'Referral' | 'Promo';
  backOfficeUser: string;
  name: string;
}

interface CreateVoucherFromData {
  type: string;
  discountType: string;
  name: string;
  value: string;
  minProduct: string;
  minAmount: string;
  maxRedeem: string;
  isActive: boolean;
}

function VouchersPromoCreatePopup({
  vouchersPromoDialog,
  setVouchersPromoDialog,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVoucherFromData>();

  const authState: any = useAppSelector((state) => state?.authState);
  const handleFormClose = () => setVouchersPromoDialog(false);
  const [checked, setChecked] = React.useState(true);

  const [validFromDate, setValidFromDate] = useState<Dayjs | null>(dayjs());
  const [validTillDate, setValidTillDate] = useState<Dayjs | null>(dayjs());

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (data: CreateVoucherFromData) => {
    handleFormClose();
    const createVoucherPayload: CreateVoucherPayload = {
      type: data.type as 'Referral' | 'Promo',
      discountType: data.discountType as 'Amount' | 'Percentage',
      name: data.name,
      value: +data.value,
      minProduct: +data.minProduct,
      minAmount: +data.minAmount,
      maxRedeem: +data.maxRedeem,
      isActive: data.isActive,
      backOfficeUser: authState.user.id,
      validFrom: validFromDate?.toISOString() ?? '',
      validTill: validTillDate?.toISOString() ?? '',
    };
    callback(createVoucherPayload);
    reset();
  };

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
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Coupon Code</label>
                  <Input
                    {...register('name', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 100,
                    })}
                    className="FormInput"
                    id="name"
                    name="name"
                    placeholder="Coupon Code"
                    disableUnderline
                  />
                  {errors.name?.type === 'required' && (
                    <ErrorSpanBox error="Coupon Code is required" />
                  )}
                  {errors.name?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.name?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <DatePickerField
                  datePickerLabel="Valid From"
                  datePickerValue={validFromDate}
                  setDatePickerValue={setValidFromDate}
                  id="validFromDatePicker"
                />
                <DatePickerField
                  datePickerLabel="Valid Till"
                  datePickerValue={validTillDate}
                  setDatePickerValue={setValidTillDate}
                  id="validTillDatePicker"
                />
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Offer Value</label>
                  <Input
                    {...register('value', {
                      required: 'Offer Value is required in numbers',
                      validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
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
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Min Products</label>
                  <Input
                    {...register('minProduct', {
                      required: 'Min Products is required in numbers',
                      validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    className="FormInput"
                    id="minProduct"
                    type="number"
                    name="minProduct"
                    placeholder="Min Products"
                    disableUnderline
                  />
                  {errors?.minProduct && (
                    <ErrorSpanBox error={errors?.minProduct?.message} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Min Amount</label>
                  <Input
                    {...register('minAmount', {
                      required: 'Min Amount is required in numbers',
                      validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
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
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Max Redeem</label>
                  <Input
                    {...register('maxRedeem', {
                      required: 'Max Redeem is required in numbers',
                      validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    className="FormInput"
                    id="maxRedeem"
                    name="maxRedeem"
                    type="number"
                    placeholder="Max Redeem"
                    disableUnderline
                  />
                  {errors?.maxRedeem && (
                    <ErrorSpanBox error={errors?.maxRedeem?.message} />
                  )}
                </FormControl>
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
