import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import classes from './SuperAdminAddNewUserDialog.module.css';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function SuperAdminAddNewUserDialog({ openDialog, setOpenDialog }: Props) {
  const [isImage, setIsImage] = useState('');
  const handleFormClose = () => setOpenDialog(false);
  const handleRemoveImage = () => {
    setIsImage('');
  };

  const handleFileChange = (event: any) => {
    setIsImage(event.target.files[0].name);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: classes.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={classes.Dialog__Content}>
        <div className={classes.Dialog__Content__FormHeader}>
          <span className={classes.Dialog__Content__Title}>Add New User</span>
        </div>
        <div className={classes.Dialog__Content__FormBody}>
          <div className={classes.Dialog__Content__FormFields}>
            <FormControl
              className={classes.Dialog__Content__FormControl}
              variant="standard"
            >
              <label className={classes.Dialog__Content__FormLabel}>Name</label>
              <Input
                className={classes.Dialog__Content__FormInput}
                id="name"
                type="text"
                value=""
                name="name"
                disableUnderline
              />
            </FormControl>
            <FormControl
              className={classes.Dialog__Content__FormControl}
              variant="standard"
            >
              <label className={classes.Dialog__Content__FormLabel}>
                Email
              </label>
              <Input
                className={classes.Dialog__Content__FormInput}
                id="email"
                type="email"
                value=""
                name="email"
                disableUnderline
              />
            </FormControl>
          </div>
          <div className={classes.Dialog__Content__FormFields}>
            <FormControl
              className={classes.Dialog__Content__FormControl}
              variant="standard"
            >
              <label className={classes.Dialog__Content__FormLabel}>
                Phone
              </label>
              <Input
                className={classes.Dialog__Content__FormInput}
                id="phone"
                type="text"
                value=""
                name="phone"
                disableUnderline
              />
            </FormControl>
            <FormControl
              className={classes.Dialog__Content__FormControl}
              variant="standard"
            >
              <label className={classes.Dialog__Content__FormLabel}>
                Access
              </label>
              <Select
                className={classes.Dialog__Content__FormInput}
                id="access"
                name="access"
                value="VIEW_ONLY"
                disableUnderline
              >
                <MenuItem value="VIEW_ONLY">View Only</MenuItem>
                <MenuItem value="EDIT">Edit</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.Dialog__Content__FormField}>
            <label className={classes.Dialog__Content__FormLabel}>
              Upload Image
            </label>
            <div className={classes.Dialog__Content__ImageBox}>
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
                className={classes.Dialog__Content__ImageLabel}
              >
                <Button
                  component="span"
                  className={classes.Dialog__Content__ImageButton}
                >
                  <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                  Upload Image
                </Button>
              </label>
              {isImage ? (
                <div className={classes.Dialog__Content__ShowImageBox}>
                  <label className={classes.Dialog__Content__ShowImageLabel}>
                    {isImage}
                  </label>
                  <IconButton
                    className={classes.Dialog__Content__ImageButtonCrossIcon}
                    onClick={handleRemoveImage}
                  >
                    <CloseOutlinedIcon
                      sx={{
                        color: '#171717',
                        fontSize: '1rem',
                        lineHeight: '1.5rem',
                      }}
                    />
                  </IconButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.Dialog__Content__FormFooter}>
          <Button
            className={classes.Dialog__Content__ButtonOutlineBlack}
            onClick={handleFormClose}
            sx={{
              marginRight: '0.5rem',
              padding: '0.375rem 1.5rem !important',
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.Dialog__Content__ButtonFillBlack}
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

export default SuperAdminAddNewUserDialog;
