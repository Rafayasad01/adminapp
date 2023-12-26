import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomDropDown from '../../../components/common/CustomDropDown';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { AppUserAddress } from '../../../interfaces/app-user.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  setEditFormData: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  appUserAddressTypeLov?: any;
};

function AppUserAddressUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  setEditFormData,
  callback,
  appUserAddressTypeLov,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AppUserAddress>();

  const handleFormClose = () => {
    setOpenFormDialog(false);
    setEditFormData(null);
  };

  const onSubmit = (data: AppUserAddress) => {
    setOpenFormDialog(false);
    callback(data, formData?.id);
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
                    <label className="FormLabel">Enter latitude</label>
                    <Input
                      className="FormInput"
                      id="latitude"
                      placeholder="3.435"
                      type="text"
                      disableUnderline
                      {...register('latitude', {
                        value: formData?.latitude,
                        pattern: {
                          value: PATTERN.POINT_NUM,
                          message: 'Enter a valid latitude',
                        },
                      })}
                    />
                    {errors.latitude?.type === 'pattern' && (
                      <ErrorSpanBox error={errors.latitude?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Enter longitude</label>
                    <Input
                      className="FormInput"
                      id="longitude"
                      placeholder="5.678"
                      disableUnderline
                      {...register('longitude', {
                        value: formData?.longitude,
                        pattern: {
                          value: PATTERN.POINT_NUM,
                          message: 'Enter a valid longitude',
                        },
                      })}
                    />
                    {errors.longitude?.type === 'pattern' && (
                      <ErrorSpanBox error={errors.longitude?.message} />
                    )}
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Enter Address</label>
                    <Input
                      className="FormInput"
                      id="address"
                      placeholder="1339 lavaca street"
                      disableUnderline
                      {...register('address', {
                        value: formData?.address,
                        required: 'Address is required',
                        pattern: PATTERN.CHAR_NUM_DOT_AT,
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
                    <CustomDropDown
                      validateRequired
                      id="type"
                      control={control}
                      error={errors}
                      register={register}
                      options={{
                        roles: appUserAddressTypeLov,
                        role: formData?.type,
                      }}
                      customClassInputTitle="font-bold"
                      inputTitle="Address Type"
                      defaultValue="Select Type"
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

export default AppUserAddressUpdatePopup;
