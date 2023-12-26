import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

import '../../assets/css/PopupStyle.css';

type Props = {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileChangePasswordPopup({
  changePassword,
  setChangePassword,
}: Props) {
  const handleFormClose = () => setChangePassword(false);

  return (
    <Dialog
      open={changePassword}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-30',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Change Password</span>
        </div>
        <div className="FormBody">
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Current Password</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="********"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">New Password</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="********"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Re-Enter New Password</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="********"
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

export default ProfileChangePasswordPopup;
