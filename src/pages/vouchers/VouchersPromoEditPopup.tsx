/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import '../../assets/css/PopupStyle.css';
import { useAppSelector } from '../../redux/redux-hooks';
import DatePickerField from './DatePickerField';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { PATTERN, VALIDATE_NON_NEGATIVE_NUM } from '../../utils/constants';

type Props = {
  vouchersPromoEditDialog: boolean;
  setVouchersPromoEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  callback: Function;
};

interface UpdateVoucherPayload {
  discountType: 'Amount' | 'Percentage';
  value: number;
  minAmount: number;
  maxRedeem: number;
  validFrom: string;
  validTill: string;
  isActive: boolean;
  type: 'Referral' | 'Promo';
  backOfficeUser: string;
  name: string;
}

interface UpdateVoucherFromData {
  type: string;
  discountType: string;
  name: string;
  value: string;
  minProduct: string;
  minAmount: string;
  maxRedeem: string;
  isActive: boolean;
}

function VouchersPromoEditPopup({
  vouchersPromoEditDialog,
  setVouchersPromoEditDialog,
  item,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateVoucherFromData>();
  const authState: any = useAppSelector((state) => state?.authState);
  const handleFormClose = () => setVouchersPromoEditDialog(false);
  const [checked, setChecked] = useState(true);

  const [validFromDate, setValidFromDate] = useState<Dayjs | null>(
    dayjs(item.validFrom)
  );
  const [validTillDate, setValidTillDate] = useState<Dayjs | null>(
    dayjs(item.validTill)
  );

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (data: UpdateVoucherFromData) => {
    handleFormClose();
    const updateVoucherPayload: UpdateVoucherPayload = {
      type: data.type as 'Referral' | 'Promo',
      discountType: data.discountType as 'Amount' | 'Percentage',
      name: data.name,
      value: +data.value,
      minAmount: +data.minAmount,
      maxRedeem: +data.maxRedeem,
      isActive: data.isActive,
      backOfficeUser: authState.user.id,
      validFrom: validFromDate?.toISOString() ?? '',
      validTill: validTillDate?.toISOString() ?? '',
    };
    callback(item.id, updateVoucherPayload);
  };

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={vouchersPromoEditDialog}
        onClose={handleFormClose}
        PaperProps={{
          className: 'Dialog',
          style: { maxWidth: '100%', maxHeight: 'auto' },
        }}
      >
        <div className="Content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="FormHeader">
              <span className="Title">Edit Voucher</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Coupon Type</label>
                  <Select
                    {...register('type', { required: true })}
                    className="FormSelect"
                    labelId="demo-simple-select-label"
                    defaultValue={item.type}
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
                    labelId="demo-simple-select-label"
                    defaultValue={item.discountType}
                    disableUnderline
                  >
                    <MenuItem value="Amount">Amount</MenuItem>
                    <MenuItem value="Percentage">Percentage</MenuItem>
                  </Select>
                  {errors.discountType?.type === 'required' && (
                    <ErrorSpanBox error="Offer Type is required" />
                  )}
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Coupon Code</label>
                  <Input
                    {...register('name', {
                      required: true,
                      pattern: PATTERN.CHAR_NUM_DASH,
                      validate: (value) => value.length <= 100,
                    })}
                    className="FormInput"
                    id="name"
                    name="name"
                    defaultValue={item.name}
                    placeholder="Coupon Code"
                    disableUnderline
                  />
                  {errors.name?.type === 'required' && (
                    <ErrorSpanBox error="Coupon Code is required" />
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
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    type="number"
                    className="FormInput"
                    id="value"
                    name="value"
                    defaultValue={item.value}
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
                    type="number"
                    className="FormInput"
                    id="minAmount"
                    name="minAmount"
                    defaultValue={item.minAmount}
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
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    type="number"
                    className="FormInput"
                    id="maxRedeem"
                    name="maxRedeem"
                    defaultValue={item.maxRedeem}
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
                    id="isActive"
                    name="isActive"
                    checked={checked}
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
                Update
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
}

export default VouchersPromoEditPopup;
