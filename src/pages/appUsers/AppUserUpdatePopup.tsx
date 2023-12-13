import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { AppUser } from '../../interfaces/app-user.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  setEditFormData: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  setActionMenuItemid: any;
  appUserRoleLov?: any;
};

function AppUserUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  setEditFormData,
  callback,
  setIsNotify,
  setNotifyMessage,
  setActionMenuItemid,
  appUserRoleLov,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AppUser>();

  const handleFormClose = () => {
    setOpenFormDialog(false);
    setActionMenuItemid(null);
    setEditFormData(null);
  };

  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setAvatar(null);
  };

  const onSubmit = (data: AppUser) => {
    if (data.firstName && data.lastName && data.phone) {
      // data.avatar = avatar;
      setOpenFormDialog(false);
      callback(data);
      setEditFormData(null);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required, Except avater image!',
        type: 'error',
      });
    }
  };

  // useEffect(() => {
  //     if (formData && formData.avatar !== null) {
  //         let newAvatar = formData.avatar.split('/').slice(-1)[0];
  //         const regexExp = /[a-z,0-9,-]{36}/;
  //         if (regexExp.test(newAvatar)) {
  //             newAvatar = newAvatar.split('-').splice(5)[0].at(0);
  //         }
  //         setAvatar({ name: newAvatar });
  //     }
  // }, [formData]);

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
            <span className="Title">Edit App User</span>
          </div>
          {formData && (
            <>
              <div className="FormBody">
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">First Name</label>
                    <Input
                      className="FormInput"
                      id="firstName"
                      placeholder="Vincent"
                      disableUnderline
                      {...register('firstName', {
                        required: 'First name is required',
                        pattern: /^[A-Za-z]+$/i,
                        validate: (value) => value.length <= 10,
                        value: formData?.firstName,
                      })}
                    />
                    {errors.firstName?.type === 'required' && (
                      <ErrorSpanBox error={errors.firstName?.message} />
                    )}
                    {errors.firstName?.type === 'pattern' && (
                      <ErrorSpanBox error="Invalid characters" />
                    )}
                    {errors.firstName?.type === 'validate' && (
                      <ErrorSpanBox error="Maximum length exceeded" />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Last Name</label>
                    <Input
                      className="FormInput"
                      id="lastName"
                      placeholder="Boyd"
                      disableUnderline
                      {...register('lastName', {
                        required: 'Last name is required',
                        pattern: /^[A-Za-z]+$/i,
                        validate: (value) => value.length <= 10,
                        value: formData?.lastName,
                      })}
                    />
                    {errors.lastName?.type === 'required' && (
                      <ErrorSpanBox error={errors.lastName?.message} />
                    )}
                    {errors.lastName?.type === 'pattern' && (
                      <ErrorSpanBox error="Invalid characters" />
                    )}
                    {errors.lastName?.type === 'validate' && (
                      <ErrorSpanBox error="Maximum length exceeded" />
                    )}
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Phone Number</label>
                    <Input
                      className="FormInput"
                      type="number"
                      id="phone"
                      placeholder="+1 536 569"
                      disableUnderline
                      {...register('phone', {
                        value: formData?.phone,
                        maxLength: {
                          value: 15,
                          message: 'Phone number cannot exceed 15 numbers',
                        },
                      })}
                    />
                    {errors.phone?.type === 'maxLength' && (
                      <span role="alert" className="error-color">
                        *{errors.phone?.message}
                      </span>
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Postal Code</label>
                    <Input
                      className="FormInput"
                      id="postalCode"
                      placeholder="M6G 596"
                      type="number"
                      disableUnderline
                      {...register('postalCode', {
                        value: formData?.postalCode,
                        maxLength: {
                          value: 6,
                          message: 'Postel code cannot exceed 6',
                        },
                      })}
                    />
                    {errors.postalCode?.type === 'maxLength' && (
                      <span role="alert" className="error-color">
                        *{errors.postalCode?.message}
                      </span>
                    )}
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Email</label>
                    <Input
                      disabled
                      className="FormInput"
                      type="text"
                      id="email"
                      placeholder="urapptech@gmail.com"
                      disableUnderline
                      {...register('email', {
                        value: formData?.email,
                      })}
                    />
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">User Type</label>
                    <Input
                      disabled
                      className="FormInput"
                      id="appuserRole"
                      placeholder="user type"
                      type="text"
                      disableUnderline
                      {...register('appuserRole', {
                        value: formData?.userType,
                      })}
                    />
                  </FormControl>
                </div>
                <div className="FormFields">
                  {/* <FormControl className="FormControl" variant="standard">
                                        <CustomDropDown
                                            validateRequired
                                            id="appuserRole"
                                            control={control}
                                            error={errors}
                                            register={register}
                                            options={{ roles: appUserRoleLov, role: formData?.userType }}
                                            customClassInputTitle="font-bold"
                                            inputTitle="App User Role"
                                        />
                                    </FormControl> */}
                  {watch('appuserRole') === 'Driver' && (
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">License Number</label>
                      <Input
                        className="FormInput"
                        id="licenseNumber"
                        disableUnderline
                        placeholder="Enter license number"
                        {...register('licenseNumber', {
                          value: formData?.licenseNumber,
                        })}
                      />
                    </FormControl>
                  )}
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

export default AppUserUpdatePopup;
