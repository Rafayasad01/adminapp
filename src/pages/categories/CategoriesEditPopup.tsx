import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Category } from '../../interfaces/category.interface';
import category from '../../services/adminapp/adminCategory';

import '../../assets/css/PopupStyle.css';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function CategoriesEditPopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [image, setImage] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    control,
  } = useForm<Category>();

  const onSubmit = (data: Category) => {
    if (data.desc && image && data.name) {
      data.icon = image;
      setOpenFormDialog(false);
      callback(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
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
    // setImageName(icon);
    setImage({ name: icon });
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
            <span className="Title">Edit Category</span>
          </div>
          {formData && (
            <>
              <div className="FormBody">
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Category Name</label>
                    <Input
                      className="FormInput"
                      type="text"
                      id="name"
                      disableUnderline
                      {...register('name', {
                        required: true,
                        value: formData.name,
                      })}
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
                        required: 'Description is required',
                        value: formData.desc,
                        minLength: {
                          value: 5,
                          message: 'Minimum Five Characters',
                        },
                        maxLength: {
                          value: 50,
                          message: 'Too Many Characters',
                        },
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
                      {...register('icon', { required: false })}
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
                        <FileUploadOutlinedIcon
                          sx={{ marginRight: '0.5rem' }}
                        />
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
                  {image === null && errors.icon && (
                    <span role="alert">{errors.icon?.message}</span>
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
                <Input
                  type="submit"
                  value="Update"
                  className="btn-black-fill"
                  disableUnderline
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

export default CategoriesEditPopup;
