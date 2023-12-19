import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import '../../assets/css/PopupStyle.css';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function ServicesCreatePopup({ openFormDialog, setOpenFormDialog }: Props) {
  const [category, setCategory] = useState('status');
  const [quantity, setQuantity] = useState('status');
  const [price, setPrice] = useState('status');
  const [isImage, setIsImage] = useState('');
  const handleFormClose = () => setOpenFormDialog(false);
  const handleRemoveImage = () => {
    setIsImage('');
  };

  const handleFileChange = (event: any) => {
    setIsImage(event.target.files[0].name);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value as string);
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
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
        <div className="FormHeader">
          <span className="Title">Add Services</span>
        </div>
        <div className="FormBody">
          <div className="FormFields">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Service Name</label>
              <Input
                className="FormInput"
                id="name"
                value=""
                name="name"
                placeholder="Pants"
                disableUnderline
              />
            </FormControl>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Categories</label>
              <Select
                className="FormSelect"
                labelId="demo-simple-select-label"
                value="Wash & Folds"
                disableUnderline
                onChange={(event) => {
                  handleCategoryChange(event);
                }}
              >
                <MenuItem value="Wash & Folds">Wash & Folds</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="FormFields">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Min Order Quantity</label>
              <Select
                className="FormSelect"
                labelId="demo-simple-select-label"
                value="05"
                disableUnderline
                onChange={(event) => {
                  handleQuantityChange(event);
                }}
              >
                <MenuItem value="05">05</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Price</label>
              <Select
                className="FormSelect"
                labelId="demo-simple-select-label"
                value="$6.99"
                disableUnderline
                onChange={(event) => {
                  handlePriceChange(event);
                }}
              >
                <MenuItem value="$6.99">$6.99</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">
                Short Description{' '}
                <span className="SubLabel">Write 15-20 Characters</span>
              </label>
              <Input
                className="FormInput"
                id="address"
                value=""
                name="address"
                placeholder="Write Description"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">
                Description{' '}
                <span className="SubLabel">Write 25-250 Characters</span>
              </label>
              <TextField
                className="FormTextarea"
                id="outlined-multiline-static"
                multiline
                rows={2}
                defaultValue=""
                placeholder="Write Description"
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
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ServicesCreatePopup;
