import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';

import '../../../assets/css/PopupStyle.css';
import TextField from '@mui/material/TextField';
import { AppImage } from '../../../interfaces/app.interface';
import CustomButton from '../../../components/common/CustomButton';
// import { Category } from '../../interfaces/category.interface';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function SuperAdminAppImageCreatePopup({
  openDialog,
  setOpenDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [image, setImage] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<AppImage>();

  const onSubmit = (data: AppImage) => {
    console.log('data', data, image);
    data.avatar = image;
    setOpenDialog(false);
    callback(data);
  };

  const handleFormClose = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setImage(null);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Image</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Image Name</label>
                <Input
                  className="FormInput"
                  {...register('name', { required: true })}
                  type="text"
                  id="name"
                  placeholder="Write Image Name"
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <span role="alert">Category name is required</span>
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Image Description{' '}
                  <span className="SubLabel">Write 05-50 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Image Description"
                  {...register('desc')}
                />
                {errors.desc && (
                  <span role="alert">{errors.desc?.message}</span>
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel">Upload Image</label>
              <div className="ImageBox">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  {...register('avatar', { required: 'Icon is required' })}
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

                {image ? (
                  <div className="ShowImageBox">
                    <label className="ShowImageLabel">{image.name}</label>
                    <IconButton
                      className="btn-dot"
                      onClick={() => setImage(null)}
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
              {image === null && errors.avatar && (
                <span role="alert">{errors.avatar?.message}</span>
              )}
            </div>
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <CustomButton
              buttonType="button"
              title="add"
              type="submit"
              className="btn-black-fill"
              sx={{
                width: '100%',
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            />
            {/* <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            /> */}
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default SuperAdminAppImageCreatePopup;
