import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
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
  setActionMenuItemid,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppUser>();

  const handleFormClose = () => {
    setOpenFormDialog(false);
    setActionMenuItemid(null);
    setEditFormData(null);
  };

  const onSubmit = (data: AppUser) => {
    if (data.firstName && data.lastName) {
      // data.avatar = avatar;
      setOpenFormDialog(false);
      callback(data);
      setEditFormData(null);
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
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 100,
                        value: formData?.firstName,
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
                      placeholder="Boyd"
                      disableUnderline
                      {...register('lastName', {
                        required: 'Last name is required',
                        pattern: PATTERN.CHAR_SPACE_DASH,
                        validate: (value) => value.length <= 100,
                        value: formData?.lastName,
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
                      type="number"
                      id="phone"
                      placeholder="+1 536 569"
                      disableUnderline
                      {...register('phone', {
                        value: formData?.phone,
                        pattern: PATTERN.PHONE,
                        maxLength: {
                          value: 15,
                          message: MAX_LENGTH_EXCEEDED,
                        },
                      })}
                    />
                    {errors.phone?.type === 'pattern' && (
                      <ErrorSpanBox error={INVALID_CHAR} />
                    )}
                    {errors.phone?.type === 'maxLength' && (
                      <ErrorSpanBox error={PH_MINI_LENGTH} />
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
                        value: formData?.postalCode ? formData?.postalCode : '',
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
                  {formData?.userType === 'Driver' && (
                    <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">License Number</label>
                      <Input
                        className="FormInput"
                        id="licenseNumber"
                        disableUnderline
                        placeholder="Enter license number"
                        {...register('licenseNumber', {
                          value: formData?.licenseNumber,
                          pattern: PATTERN.NUM_DASH,
                          validate: (value) => value.length <= 50,
                        })}
                      />
                      {errors.licenseNumber?.type === 'pattern' && (
                        <ErrorSpanBox error={INVALID_CHAR} />
                      )}
                      {errors.licenseNumber?.type === 'validate' && (
                        <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                      )}
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
