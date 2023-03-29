import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import DriversPopupClasses from './DriversPopup.module.css';

type Props = {
  openEditFormDialog: boolean;
  setOpenEditFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function DriversEditPopup({
  openEditFormDialog,
  setOpenEditFormDialog,
}: Props) {
  const [isImage, setIsImage] = useState('');
  const handleFormClose = () => setOpenEditFormDialog(false);
  const handleRemoveImage = () => {
    setIsImage('');
  };

  const handleFileChange = (event: any) => {
    setIsImage(event.target.files[0].name);
  };

  return (
    <Dialog
      open={openEditFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: DriversPopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={DriversPopupClasses.Content}>
        <div className={DriversPopupClasses.FormHeader}>
          <span className={DriversPopupClasses.Title}>Edit Drivers</span>
        </div>
        <div className={DriversPopupClasses.FormBody}>
          <div className={DriversPopupClasses.FormFields}>
            <FormControl
              className={DriversPopupClasses.FormControl}
              variant="standard"
            >
              <label className={DriversPopupClasses.FormLabel}>Name</label>
              <Input
                className={DriversPopupClasses.FormInput}
                id="name"
                value=""
                name="name"
                disableUnderline
              />
            </FormControl>
            <FormControl
              className={DriversPopupClasses.FormControl}
              variant="standard"
            >
              <label className={DriversPopupClasses.FormLabel}>
                Email Address
              </label>
              <Input
                className={DriversPopupClasses.FormInput}
                id="email"
                value=""
                name="email"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className={DriversPopupClasses.FormFields}>
            <FormControl
              className={DriversPopupClasses.FormControl}
              variant="standard"
            >
              <label className={DriversPopupClasses.FormLabel}>
                Contact Number
              </label>
              <Input
                className={DriversPopupClasses.FormInput}
                id="phone"
                value=""
                name="phone"
                disableUnderline
              />
            </FormControl>
            <FormControl
              className={DriversPopupClasses.FormControl}
              variant="standard"
            >
              <label className={DriversPopupClasses.FormLabel}>
                License Number
              </label>
              <Input
                className={DriversPopupClasses.FormInput}
                id="license"
                value=""
                name="license"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className={DriversPopupClasses.FormField}>
            <FormControl
              className={DriversPopupClasses.FormControl}
              variant="standard"
            >
              <label className={DriversPopupClasses.FormLabel}>Address</label>
              <Input
                className={DriversPopupClasses.FormInput}
                id="address"
                value=""
                name="address"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className={DriversPopupClasses.FormField}>
            <label className={DriversPopupClasses.FormLabel}>
              Upload Image
            </label>
            <div className={DriversPopupClasses.ImageBox}>
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
              />
              <label
                htmlFor="raised-button-file"
                className={DriversPopupClasses.ImageLabel}
              >
                <Button
                  variant="raised"
                  component="span"
                  className={DriversPopupClasses.ImageBtn}
                >
                  <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                  Upload image
                </Button>
              </label>
              {isImage ? (
                <div className={DriversPopupClasses.ShowImageBox}>
                  <label className={DriversPopupClasses.ShowImageLabel}>
                    {isImage}
                  </label>
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
          </div>
        </div>
        <div className={DriversPopupClasses.FormFooter}>
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
            className="btn-black-fill"
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DriversEditPopup;
