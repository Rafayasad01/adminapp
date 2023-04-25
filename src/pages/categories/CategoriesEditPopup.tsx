import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';

import '../../assets/css/PopupStyle.css';

type Props = {
  openEditFormDialog: boolean;
  setOpenEditFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function CategoriesEditPopup({
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
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Edit Category</span>
        </div>
        <div className="FormBody">
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Category Name</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Dry Cleaning"
                disableUnderline
              />
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
              />
              <label htmlFor="raised-button-file" className="ImageLabel">
                <Button variant="raised" component="span" className="ImageBtn">
                  <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                  Upload image
                </Button>
              </label>
              {isImage ? (
                <div className="ShowImageBox">
                  <label className="ShowImageLabel">{isImage}</label>
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
            className="btn-black-fill"
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CategoriesEditPopup;
