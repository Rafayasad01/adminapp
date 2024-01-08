import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { CategoryService } from '../../interfaces/category.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  imageAllowedTypes,
} from '../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function CategoriesServicesEditPopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryService>();
  const onSubmit = (data: CategoryService) => {
    if (image !== null) {
      const res = {
        name: data.name,
        desc: data.desc,
        price: data.price,
        loyaltyCoins: data.loyaltyCoins,
        icon: image,
      };
      setOpenFormDialog(false);
      callback(res);
    } else if (data.desc && data.name && data.price && imageName) {
      const res = {
        name: data.name,
        desc: data.desc,
        price: data.price,
        loyaltyCoins: data.loyaltyCoins,
        quantity: data.quantity,
      };
      setOpenFormDialog(false);
      callback(res);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

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
    let icon = formData.icon.split('/').slice(-1)[0];
    const regexExp = /[a-z,0-9,-]{36}/;
    if (regexExp.test(icon)) {
      icon = icon.split('-').splice(5)[0].at(0);
    }
    setImageName(icon);
  }, [formData]);

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
            <span className="Title">Edit Services</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Service Name</label>
                <Input
                  className="FormInput"
                  id="name"
                  placeholder="Enter service name"
                  {...register('name', {
                    required: 'Name is required',
                    value: formData.name,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <ErrorSpanBox error={errors.name?.message} />
                )}
                {errors.name?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.name?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Price</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  {...register('price', {
                    required: 'Price is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    value: formData.price,
                  })}
                  disableUnderline
                />
                {errors.price && <ErrorSpanBox error={errors.price?.message} />}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Loyality Coins</label>
                <Input
                  className="FormInput"
                  id="loyaltyCoins"
                  placeholder="Enter loyalty Coins"
                  type="number"
                  {...register('loyaltyCoins', {
                    value: formData?.loyaltyCoins,
                    pattern: {
                      value: PATTERN.POINT_NUM,
                      message: 'Enter a valid loyalty coins in numbers',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Length should not be excceed from 10 numbers.',
                    },
                    validate: (value: any) =>
                      formData?.loyaltyCoins &&
                      VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {errors.loyaltyCoins && (
                  <ErrorSpanBox error={errors.loyaltyCoins?.message} />
                )}
              </FormControl>
            </div>
            {/* <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Min Order Quantity</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Enter minimum order quantity"
                  {...register('quantity', {
                    required: 'Quantity is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    value: formData.quantity,
                  })}
                  disableUnderline
                />
                {errors.quantity && (
                  <ErrorSpanBox error={errors.quantity?.message} />
                )}
              </FormControl>
             
            </div> */}
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Message{' '}
                  <span className="SubLabel">Write 01-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    required: 'Description is required',
                    value: formData.desc,
                    minLength: {
                      value: 1,
                      message: 'Minimum One Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
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
              {image === null && imageName === null && (
                <ErrorSpanBox error="Image is required" />
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
        </form>
      </div>
    </Dialog>
  );
}

export default CategoriesServicesEditPopup;
