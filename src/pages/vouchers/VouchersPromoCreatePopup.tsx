/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

import '../../assets/css/PopupStyle.css';
import DatePickerField from './DatePickerField';

type Props = {
  vouchersPromoDialog: boolean;
  setVouchersPromoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function VouchersPromoCreatePopup({
  vouchersPromoDialog,
  setVouchersPromoDialog,
}: Props) {
  const [selectShop, setSelectShop] = useState('status');
  const handleFormClose = () => setVouchersPromoDialog(false);
  const [checked, setChecked] = React.useState(true);

  const [validFromDate, setValidFromDate] = useState<Dayjs | null>(null);
  const [validTillDate, setValidTillDate] = useState<Dayjs | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectShop(event.target.value as string);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
          <div className="FormHeader">
            <span className="Title">Add Voucher</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Coupon Type</label>
                <Select
                  className="FormSelect"
                  labelId="demo-simple-select-label"
                  value="Promo"
                  disableUnderline
                  onChange={(event) => {
                    handleChange(event);
                  }}
                >
                  <MenuItem value="Promo">Promo</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Offer Type</label>
                <Select
                  className="FormSelect"
                  labelId="demo-simple-select-label"
                  value="Amount"
                  disableUnderline
                  onChange={(event) => {
                    handleChange(event);
                  }}
                >
                  <MenuItem value="Amount">Amount</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Coupon Code</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="Coupon Code"
                  disableUnderline
                />
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
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="Offer Value"
                  disableUnderline
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Min Products</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="Min Products"
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Min Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="Min Amount"
                  disableUnderline
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Max Redeem</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="Max Redeem"
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Status</label>
                <Switch
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
              onClick={handleFormClose}
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
}

export default VouchersPromoCreatePopup;
