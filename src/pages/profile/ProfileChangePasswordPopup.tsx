import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Password } from '../../interfaces/app-user.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';

type Props = {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function ProfileChangePasswordPopup({
  changePassword,
  setChangePassword,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>();

  const handleFormClose = () => setChangePassword(false);

  const [currentPassToggler, setCurrentPassToggler] = useState(true);
  const [newPassToggler, setNewPassToggler] = useState(true);
  const [reNewPassToggler, setReNewPassToggler] = useState(true);

  const onSubmit = (data: Password) => {
    if (data.newPassword !== data.reNewPassword) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'new password and re-new password are not matched.',
        type: 'error',
      });
    } else {
      callback(data);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Change Password</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Current Password</label>
                <Input
                  className="FormInput"
                  {...register('currentPassword', {
                    required: 'Current Password is required',
                    pattern: PATTERN.PASSWORD,
                    validate: (value) => value.length <= 50,
                  })}
                  type={currentPassToggler ? 'password' : 'text'}
                  id="currentPassword"
                  placeholder="Enter Your Current Password"
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ padding: 0 }}
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setCurrentPassToggler(!currentPassToggler)
                        }
                      >
                        {currentPassToggler ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.currentPassword?.type === 'required' && (
                  <ErrorSpanBox error={errors.currentPassword?.message} />
                )}
                {errors.currentPassword?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.currentPassword?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">New Password</label>
                <Input
                  className="FormInput"
                  {...register('newPassword', {
                    required: 'New Password is required',
                    pattern: PATTERN.PASSWORD,
                    validate: (value) => value.length <= 50,
                  })}
                  type={newPassToggler ? 'password' : 'text'}
                  id="newPassword"
                  placeholder="Enter Your New Password"
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ padding: 0 }}
                        aria-label="toggle password visibility"
                        onClick={() => setNewPassToggler(!newPassToggler)}
                      >
                        {newPassToggler ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.newPassword?.type === 'required' && (
                  <ErrorSpanBox error={errors.newPassword?.message} />
                )}
                {errors.newPassword?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.newPassword?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Re-Enter New Password</label>
                <Input
                  className="FormInput"
                  {...register('reNewPassword', {
                    required: 'Re New Password is required',
                    pattern: PATTERN.PASSWORD,
                    validate: (value) => value.length <= 50,
                  })}
                  id="reNewPassword"
                  type={reNewPassToggler ? 'password' : 'text'}
                  placeholder="Re-Enter Your New Password"
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ padding: 0 }}
                        aria-label="toggle password visibility"
                        onClick={() => setReNewPassToggler(!reNewPassToggler)}
                      >
                        {reNewPassToggler ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.reNewPassword?.type === 'required' && (
                  <ErrorSpanBox error={errors.reNewPassword?.message} />
                )}
                {errors.reNewPassword?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.reNewPassword?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
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
              type="submit"
              className="btn-black-fill"
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
  );
}

export default ProfileChangePasswordPopup;
