import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomDropDown from '../../components/common/CustomDropDown';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { EditProfile } from '../../interfaces/app-user.interface';
import Countries from '../../services/commonApis/commonApis';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
  imageAllowedTypes,
} from '../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNotify: any;
  setNotifyMessage: any;
  callback: any;
  formData: any;
};

function ProfileEditPopup({
  openFormDialog,
  setOpenFormDialog,
  setIsNotify,
  setNotifyMessage,
  callback,
  formData,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditProfile>();
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<any>(null);
  const [countries, setCountries] = useState<any>([]);

  const handleFormClose = () => setOpenFormDialog(false);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(event.target.files[0]);
        setImageName(event.target.files[0].name);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .png, .jpg, and .jpeg files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setImage(null);
  };

  useEffect(() => {
    setValue('firstName', formData?.firstName);
    setValue('lastName', formData?.lastName);
    setValue('country', formData?.country);
    setValue('state', formData?.state);
    setValue('city', formData?.city);
    setValue('zipCode', formData?.zipCode);
    setValue('phone', formData?.phone);
    setValue('address', formData?.address);
    let icon = formData?.avatar?.split('/')?.slice(-1)[0];
    const regexExp = /[a-z,0-9,-]{36}/;
    if (regexExp.test(icon)) {
      icon = icon.split('-').splice(5)[0].at(0);
    }
    setImageName(icon);
  }, [formData]);

  const onSubmit = (data: EditProfile) => {
    // console.log('data::::::::::', data);
    if (image) {
      data.avatar = image;
    } else {
      data.avatar = null;
    }
    callback(data);
  };

  useEffect(() => {
    Countries().then((res: any) => {
      setCountries(
        res.data.map((country: any) => ({
          id: country.name.common,
          name: country.name.common,
        }))
      );
    });
  }, []);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-30',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Edit Profile</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  {...register('firstName', {
                    value: formData?.firstName,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter First Name"
                  type="text"
                  id="firstName"
                  disableUnderline
                />
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
                  {...register('lastName', {
                    value: formData?.lastName,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Last Name"
                  type="text"
                  id="lastName"
                  disableUnderline
                />
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
                <div className="">
                  <CustomDropDown
                    id="country"
                    control={control}
                    error={errors}
                    register={register}
                    options={{
                      roles: countries,
                      role: formData?.backofficeUserExt?.country,
                    }}
                    customClassInputTitle="font-bold"
                    inputTitle="Select Country"
                    defaultValue="Select Your Country"
                  />
                </div>
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">State</label>
                <Input
                  className="FormInput"
                  {...register('state', {
                    value: formData?.backofficeUserExt?.state,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 100,
                  })}
                  placeholder="Enter State Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.state?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.state?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">City</label>
                <Input
                  className="FormInput"
                  {...register('city', {
                    value: formData?.backofficeUserExt?.city,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 100,
                  })}
                  placeholder="Enter City Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.city?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.city?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Zip Code</label>
                <Input
                  className="FormInput"
                  {...register('zipCode', {
                    value: formData?.backofficeUserExt?.zipCode,
                    pattern: PATTERN.PHONE,
                    maxLength: {
                      value: 15,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  placeholder="Enter Zip Code Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.zipCode?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.zipCode?.type === 'maxLength' && (
                  <ErrorSpanBox error="Length excceed" />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Phone</label>
                <Input
                  className="FormInput"
                  {...register('phone', {
                    value: formData?.backofficeUserExt?.phone,
                    pattern: PATTERN.PHONE,
                    maxLength: {
                      value: 15,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="text"
                  id="phone"
                  placeholder="Enter phone number"
                  disableUnderline
                />
                {errors.phone?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.phone?.type === 'maxLength' && (
                  <ErrorSpanBox error={PH_MINI_LENGTH} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Address</label>
                <Input
                  className="FormInput"
                  id="address"
                  disableUnderline
                  placeholder="Enter Address"
                  {...register('address', {
                    value: formData?.backofficeUserExt?.address,
                    pattern: PATTERN.ADDRESS_ONLY,
                    validate: (value) => value.length <= 250,
                  })}
                />
                {errors.address?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.address?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel">Upload Image</label>
              <div className="ImageBox">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  {...register('avatar')}
                  id="raised-button-file"
                  type="file"
                  onChange={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileChange(event);
                  }}
                  onClick={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileOnClick(event);
                  }}
                />
                <label htmlFor="raised-button-file" className="ImageLabel">
                  <Button component="span" className="ImageBtn">
                    <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    Upload image
                  </Button>
                </label>

                {imageName ? (
                  <div className="ShowImageBox">
                    <label className="ShowImageLabel">{imageName}</label>
                    <IconButton
                      className="btn-dot"
                      onClick={() => setImageName(null)}
                    >
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
              {/* {image === null && <ErrorSpanBox error={errors.avatar?.message} />} */}
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

export default ProfileEditPopup;
