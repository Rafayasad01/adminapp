import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

import '../../assets/css/PopupStyle.css';

type Props = {
  openEditFormDialog: boolean;
  setOpenEditFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function CustomersEditPopup({
  openEditFormDialog,
  setOpenEditFormDialog,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleFormClose = () => setOpenEditFormDialog(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Dialog
      open={openEditFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Edit Customer</span>
        </div>
        <div className="FormBody">
          <div className="FormFields">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">First Name</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="Vincent"
                disableUnderline
              />
            </FormControl>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Last Name</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="Boyd"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormFields">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Phone Number</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="+1 536 569"
                disableUnderline
              />
            </FormControl>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Email Address</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="Vincent.96@gmail.com"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormFields">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Password</label>
              <Input
                style={{ paddingRight: '0' }}
                className="FormInput"
                id="password"
                placeholder="**********"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      style={{ padding: 0 }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                disableUnderline
              />
            </FormControl>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Postal Code</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="M6G 596"
                disableUnderline
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
            Update
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CustomersEditPopup;
