import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import '../../assets/css/PopupStyle.css';
import { useForm } from 'react-hook-form';
import { AppUser } from '../../interfaces/app-user.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function CustomersCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarName, setAvatarName] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<AppUser>();

  const handleFormClose = () => setOpenFormDialog(false);
  const handleRemoveImage = () => {
    setAvatar('');
    setAvatarName('');
  };

  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
    setAvatarName(event.target.files[0].name);
  };

  const onSubmit = (data: AppUser) => {
    data.avatar = avatar;
    setOpenFormDialog(false);
    callback(data);
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
            <span className="Title">Add Customer</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  id="first_name"
                  placeholder="Vincent"
                  disableUnderline
                  {...register('first_name', {
                    required: 'First name is required',
                  })}
                />
                {errors.first_name && (
                  <span role="alert">{errors.first_name?.message}</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Last Name</label>
                <Input
                  className="FormInput"
                  id="last_name"
                  placeholder="Boyd"
                  disableUnderline
                  {...register('last_name', {
                    required: 'Last name is required',
                  })}
                />
                {errors.last_name && (
                  <span role="alert">{errors.last_name?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Phone Number</label>
                <Input
                  className="FormInput"
                  id="phone"
                  placeholder="+1 536 569"
                  disableUnderline
                  {...register('phone', {
                    required: 'Phone number is required',
                  })}
                />
                {errors.phone && (
                  <span role="alert">{errors.phone?.message}</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email Address</label>
                <Input
                  className="FormInput"
                  id="name"
                  placeholder="Vincent.96@gmail.com"
                  disableUnderline
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <span role="alert">{errors.email?.message}</span>
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
                  placeholder="**********"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
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
                {errors.password && (
                  <span role="alert">{errors.password?.message}</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Postal Code</label>
                <Input
                  className="FormInput"
                  id="postal_code"
                  placeholder="M6G 596"
                  disableUnderline
                  {...register('postal_code')}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Address</label>
                <Input
                  className="FormInput"
                  id="address"
                  disableUnderline
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && (
                  <span role="alert">{errors.address?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel">Upload Image</label>
              <div className="ImageBox">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  {...register('avatar')}
                  onChange={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileChange(event);
                  }}
                />
                <label htmlFor="raised-button-file" className="ImageLabel">
                  <Button component="span" className="ImageBtn">
                    <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    Upload image
                  </Button>
                </label>
                {avatarName ? (
                  <div className="ShowImageBox">
                    <label className="ShowImageLabel">{avatarName}</label>
                    <IconButton className="btn-dot" onClick={handleRemoveImage}>
                      <CloseOutlinedIcon
                        sx={{
                          color: '#1D1D1D',
                          fontSize: '1rem',
                          lineHeight: '1.5rem',
                        }}
                      />
                    </IconButton>
                  </div>
                ) : (
                  ''
                )}
              </div>
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

export default CustomersCreatePopup;
