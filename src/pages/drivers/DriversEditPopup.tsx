import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import '../../assets/css/PopupStyle.css';
import TimePicker from '../../components/common/TimePicker';
import { useForm } from "react-hook-form";
import { AppUserDriverExt } from '../../interfaces/app-user.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: Function;
};

function DriversEditPopup({ openFormDialog, setOpenFormDialog, formData, callback }: Props) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarName, setAvatarName] = useState<string>('');

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<AppUserDriverExt>();

  const handleFormClose = () => setOpenFormDialog(false);
  const handleRemoveImage = () => {
    setAvatar('');
    setAvatarName('');
  };

  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
    setAvatarName(event.target.files[0].name);
  };

  const onSubmit = (data: AppUserDriverExt) => {
    const licenseNumber = data.license_number.replace(/\s+/g, '');
    data.avatar = avatar;
    data.license_number = licenseNumber;
    //setOpenFormDialog(false);
    callback(data);
  };

  useEffect(() => {
    if (formData && formData.avatar) {
      let avatar = formData.avatar.split("/").slice(-1)[0];
      const regexExp = /[a-z,0-9,-]{36}/;
      if (regexExp.test(avatar)) {
        avatar = avatar.split("-").splice(5)[0];
      }
      setAvatarName(avatar);
    }

  }, []);

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
            <span className="Title">Edit Drivers</span>
          </div>
          {formData && (
            <>
              <div className="FormBody">
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">First Name</label>
                    <Input
                      className="FormInput"
                      id="first_name"
                      disableUnderline
                      {...register("first_name", { required: "First name is required", value: formData.firstName })}
                    />
                    {errors.first_name && <span role="alert">{errors.first_name?.message}</span>}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Last name</label>
                    <Input
                      className="FormInput"
                      id="last_name"
                      disableUnderline
                      {...register("last_name", { required: "Last name is required", value: formData.lastName })}
                    />
                    {errors.last_name && <span role="alert">{errors.last_name?.message}</span>}
                  </FormControl>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Email Address</label>
                    <Input
                      className="FormInput"
                      id="email"
                      value={formData.email}
                      disableUnderline
                      disabled
                    />
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
                      {...register("phone", { required: "Phone is required", value: formData.phone })}
                    />
                    {errors.phone && <span role="alert">{errors.phone?.message}</span>}
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
                      {...register("license_number", { required: "License number is required", value: formData.licenseNumber })}
                    />
                    {errors.license_number && <span role="alert">{errors.license_number?.message}</span>}
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
                      {...register("avatar")}
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
                  value="Update"
                  className="btn-black-fill"
                  sx={{
                    padding: '0.375rem 2rem !important',
                  }}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </Dialog>
  );
}

export default DriversEditPopup;
