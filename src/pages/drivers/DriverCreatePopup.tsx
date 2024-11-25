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
import { AppUser } from '../../interfaces/app-user.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
} from '../../utils/constants';
// import { getItem } from '../../utils/storage';

type AppUserCreatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  appUserRoleLov?: any;
  selectedTab?: string;
};

function DriverCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: AppUserCreatePopupProps) {
  // const title: any = getItem('TITLE_TEXT_USER');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppUser>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = (data: AppUser) => {
    setOpenFormDialog(false);
    callback(data, reset);
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
            <span className="Title">Add Driver</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  id="firstName"
                  placeholder="Enter your first name"
                  disableUnderline
                  {...register('firstName', {
                    required: 'First name is required',
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 100,
                  })}
                />
                {errors.firstName?.type === 'required' && (
                  <ErrorSpanBox error="First name is required" />
                )}
                {errors.firstName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.firstName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Last Name</label>
                <Input
                  className="FormInput"
                  id="lastName"
                  placeholder="Enter your last name"
                  disableUnderline
                  {...register('lastName', {
                    required: 'Last name is required',
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 100,
                  })}
                />
                {errors.lastName?.type === 'required' && (
                  <ErrorSpanBox error="Last name is required" />
                )}
                {errors.lastName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.lastName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Phone Number</label>
                <Input
                  className="FormInput"
                  id="phone"
                  placeholder="923123345345"
                  disableUnderline
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: PATTERN.PHONE,
                    maxLength: {
                      value: 15,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="text"
                />
                {errors.phone?.type === 'required' && (
                  <ErrorSpanBox error="Phone number is required" />
                )}
                {errors.phone?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.phone?.type === 'maxLength' && (
                  <ErrorSpanBox error={PH_MINI_LENGTH} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email Address</label>
                <Input
                  className="FormInput"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="new-password"
                  disableUnderline
                  {...register('email', {
                    required: 'Email is required',
                    pattern: PATTERN.CHAR_NUM_DOT_AT,
                    validate: (value) => value.length <= 150,
                  })}
                />
                {errors.email?.type === 'required' && (
                  <ErrorSpanBox error="Email is required" />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.email?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Password</label>
                <Input
                  style={{ paddingRight: '0' }}
                  className="FormInput"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    pattern: PATTERN.PASSWORD,
                    validate: (value) => value.length <= 150,
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ padding: 0 }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
                {errors.password?.type === 'required' && (
                  <ErrorSpanBox error={errors.password?.message} />
                )}
                {errors.password?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.password?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Postal Code</label>
                <Input
                  className="FormInput"
                  id="postalCode"
                  placeholder="Enter your postal code"
                  disableUnderline
                  {...register('postalCode', {
                    pattern: PATTERN.CHAR_NUM_DASH,
                    validate: (value) => value.length <= 15,
                  })}
                />
                {errors.postalCode?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.postalCode?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Address</label>
                <Input
                  className="FormInput"
                  id="address"
                  disableUnderline
                  placeholder="1401 Lavaca Street"
                  {...register('address', {
                    required: 'Address is required',
                    pattern: PATTERN.ADDRESS_ONLY,
                    validate: (value) => value.length <= 250,
                  })}
                />
                {errors.address?.type === 'required' && (
                  <ErrorSpanBox error={errors.address?.message} />
                )}
                {errors.address?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.address?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">License Number</label>
                <Input
                  className="FormInput"
                  id="licenseNumber"
                  disableUnderline
                  placeholder="Enter license number"
                  {...register('licenseNumber', {
                    required: 'licenseNumber is required',
                    pattern: PATTERN.NUM_DASH,
                    validate: (value) => value.length <= 50,
                  })}
                />
                {errors.licenseNumber?.type === 'required' && (
                  <ErrorSpanBox error={errors.licenseNumber?.message} />
                )}
                {errors.licenseNumber?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.licenseNumber?.type === 'validate' && (
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
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default DriverCreatePopup;
