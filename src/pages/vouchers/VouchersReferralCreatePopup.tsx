/* eslint-disable react/jsx-props-no-spreading */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import React from 'react';

import '../../assets/css/PopupStyle.css';

type Props = {
  vouchersReferralDialog: boolean;
  setVouchersReferralDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function VouchersReferralCreatePopup({
  vouchersReferralDialog,
  setVouchersReferralDialog,
}: Props) {
  // const [selectShop, setSelectShop] = useState('status');
  const handleFormClose = () => setVouchersReferralDialog(false);
  const [checked, setChecked] = React.useState(true);

  // const handleChange = () =>
  //   // event: SelectChangeEvent
  //   {
  //     // setSelectShop(event.target.value as string);
  //   };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog
      open={vouchersReferralDialog}
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
                // onChange={(event) => {
                //   handleChange(event);
                // }}
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
                // onChange={(event) => {
                //   handleChange(event);
                // }}
              >
                <MenuItem value="Amount">Amount</MenuItem>
              </Select>
            </FormControl>
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
  );
}

export default VouchersReferralCreatePopup;
