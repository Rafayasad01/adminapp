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

import '../../../assets/css/PopupStyle.css';
import { useForm } from 'react-hook-form';
import { AppUserAddress } from '../../../interfaces/app-user.interface';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { INVALID_CHAR, MAX_LENGTH_EXCEEDED, PATTERN } from '../../../utils/constants';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
// import CustomDropDown from '../../components/common/CustomDropDown';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  appUserAddressTypeLov?: any;
};

function AppUserAddressCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  appUserAddressTypeLov,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [avatar, setAvatar] = useState<any>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<AppUserAddress>();

  const handleFormClose = () => setOpenFormDialog(false);

  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setAvatar(null);
  };

  const onSubmit = (data: AppUserAddress) => {
    console.log('SUB DATA', data);
    setOpenFormDialog(false);
    callback(data);
    // if (
    //     data.firstName &&
    //     data.lastName &&
    //     data.address &&
    //     data.password
    // ) {
    //     // data.avatar = avatar;
    // } else {
    //     setIsNotify(true);
    //     setNotifyMessage({
    //         text: 'All fields are required, Except avater image!',
    //         type: 'error',
    //     });
    // }
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
            <span className="Title">Add Address</span>
          </div>
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
                    required: 'Address is required',
                    pattern: PATTERN.CHAR_NUM_SPACE_DOT_AT,
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
                  options={{ roles: appUserAddressTypeLov }}
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

export default AppUserAddressCreatePopup;
