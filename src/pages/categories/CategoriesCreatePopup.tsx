import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import { Category } from '../../interfaces/category.interface';
import TextField from '@mui/material/TextField';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
};

function CategoriesCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: Props) {
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Category>();
  const onSubmit = (data: Category) => {
    data.icon = image;
    setOpenFormDialog(false);
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  const handleRemoveImage = () => {
    setImage('');
    setImageName('');
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name);
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
            <span className="Title">Add Category</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Category Name</label>
                <Input
                  className="FormInput"
                  {...register('name', { required: true })}
                  type="text"
                  id="name"
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
                  Message{' '}
                  <span className="SubLabel">Write 05-50 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    required: 'Description is required', minLength: {
                      value: 5,
                      message: "Minimum Five Characters"
                    }, maxLength: {
                      value: 50,
                      message: "Too Many Characters"
                    }
                  })}
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
                  {...register('icon', { required: 'Icon is required' })}
                  id="raised-button-file"
                  type="file"
                  onChange={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileChange(event);
                    //setIsImage(event.nativeEventtarget.files[0])
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
              {errors.icon && <span role="alert">{errors.icon?.message}</span>}
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
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
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

export default CategoriesCreatePopup;
