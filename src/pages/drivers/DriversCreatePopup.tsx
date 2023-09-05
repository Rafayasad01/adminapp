import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import '../../assets/css/PopupStyle.css';
import { useForm } from 'react-hook-form';
import { AppUserDriverExt } from '../../interfaces/app-user.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function DriversCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [avatar, setAvatar] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<AppUserDriverExt>();

  const handleFormClose = () => setOpenFormDialog(false);

  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null
    setAvatar(null)
  }

  const onSubmit = (data: AppUserDriverExt) => {
    if (data.first_name && data.last_name && data.email && data.phone && data.license_number && data.address) {
      const licenseNumber = data.license_number.replace(/\s+/g, '');
      data.avatar = avatar;
      data.license_number = licenseNumber;
      setOpenFormDialog(false);
      callback(data);
    } else {
      setIsNotify(true)
      setNotifyMessage({
        text: "All fields are required, Except avater image!",
        type: 'error',
      });
    }
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
            <span className="Title">Add Drivers</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  id="first_name"
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
                <label className="FormLabel">Last name</label>
                <Input
                  className="FormInput"
                  id="last_name"
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
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email Address</label>
                <Input
                  className="FormInput"
                  id="email"
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
                <label className="FormLabel">Contact Number</label>
                <Input
                  type="text"
                  className="FormInput"
                  id="phone"
                  disableUnderline
                  {...register('phone', { required: 'Phone is required' })}
                />
                {errors.phone && (
                  <span role="alert">{errors.phone?.message}</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  License Number{' '}
                  <span className="SubLabel">Use This Number To Login</span>
                </label>
                <Input
                  className="FormInput"
                  id="license"
                  disableUnderline
                  {...register('license_number', {
                    required: 'License number is required',
                  })}
                />
                {errors.license_number && (
                  <span role="alert">{errors.license_number?.message}</span>
                )}
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
                  onChange={(event: React.InputHTMLAttributes<HTMLInputElement>) => {
                    handleFileChange(event);
                  }}
                  onClick={(event: React.InputHTMLAttributes<HTMLInputElement>) => {
                    handleFileOnClick(event)
                  }}
                />
                <label htmlFor="raised-button-file" className="ImageLabel">
                  <Button component="span" className="ImageBtn">
                    <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    Upload image
                  </Button>
                </label>
                {avatar ? (
                  <div className="ShowImageBox">
                    <label className="ShowImageLabel">{avatar.name}</label>
                    <IconButton className="btn-dot" onClick={() => setAvatar(null)}>
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

export default DriversCreatePopup;
