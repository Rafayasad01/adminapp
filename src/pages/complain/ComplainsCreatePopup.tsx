import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import '../../assets/css/PopupStyle.css';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function ComplainsCreatePopup({ openFormDialog, setOpenFormDialog }: Props) {
  // const [selectShop, setSelectShop] = useState('status');
  const [isImage, setIsImage] = useState('');
  const handleFormClose = () => setOpenFormDialog(false);
  const handleRemoveImage = () => {
    setIsImage('');
  };

  const handleFileChange = (event: any) => {
    setIsImage(event.target.files[0].name);
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   // setSelectShop(event.target.value as string);
  // };

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
        <div className="FormHeader">
          <span className="Title">Add New Complain</span>
        </div>
        <div className="FormBody">
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Select Shop</label>
              <Select
                className="FormSelect"
                labelId="demo-simple-select-label"
                value="UrLaundry"
                disableUnderline
                // onChange={(event) => {
                //   handleChange(event);
                // }}
              >
                <MenuItem value="UrLaundry">UrLaundry</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Shop Name</label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="UrLaundry"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Complain</label>
              <TextField
                className="FormTextarea"
                id="outlined-multiline-static"
                multiline
                rows={1}
                defaultValue=""
                placeholder="Write Here"
              />
            </FormControl>
          </div>
          <div className="FormField">
            <label className="FormLabel">Upload Evidence</label>
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
                <Button component="span" className="ImageBtn">
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
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ComplainsCreatePopup;
