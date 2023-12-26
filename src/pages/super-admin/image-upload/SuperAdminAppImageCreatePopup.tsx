import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomButton from '../../../components/common/CustomButton';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { AppImage } from '../../../interfaces/app.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  imageAllowedTypes,
} from '../../../utils/constants';

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
    setValue,
    formState: { errors },
  } = useForm<AppImage>();

  const onSubmit = (data: AppImage) => {
    // console.log('onSubmit called');
    // console.log('data', data);
    data.avatar = image;
    if (data.name && data.avatar) {
      if (data.avatar && Object.keys(data?.avatar).length > 0) {
        data.avatar = image;
      }
      setOpenDialog(false);
      callback(data);
    } else {
      setOpenDialog(true);
    }
  };

  const handleFormClose = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(selectedFile);
        setValue('avatar', selectedFile);
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
        <div className="FormHeader">
          <span className="Title">Add Image</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Image Name</label>
              <Input
                className="FormInput"
                {...register('name', {
                  required: true,
                  pattern: PATTERN.CHAR_SPACE_DASH,
                  validate: (value) => value.length <= 100,
                })}
                type="text"
                id="name"
                placeholder="Write Image Name"
                disableUnderline
              />
              {errors.name?.type === 'required' && (
                <ErrorSpanBox error="Image name is required" />
              )}
              {errors.name?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.name?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">
                Image Description{' '}
                <span className="SubLabel">Write ( 01-250 ) Characters</span>
              </label>
              <TextField
                className="FormTextarea"
                id="desc"
                multiline
                rows={4}
                defaultValue=""
                placeholder="Write Image Description"
                {...register('desc', {
                  minLength: {
                    value: 1,
                    message: 'Minimum Five Characters',
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
                style={{ display: 'none' }}
                {...register('avatar')}
                id="raised-button-file"
                accept=".png, .jpg, .jpeg"
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
                    onClick={() => {
                      setImage(null);
                      setValue('avatar', null);
                    }}
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
            {image === null && <ErrorSpanBox error="Image is required" />}
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
            <CustomButton
              buttonType="button"
              type="submit"
              title="add"
              className="btn-black-fill"
              sx={{
                width: '100%',
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default SuperAdminAppImageCreatePopup;
