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
import classes from './SuperAdminChangeUserAccessDialog.module.css';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function SuperAdminChangeUserAccessDialog({
  openDialog,
  setOpenDialog,
}: Props) {
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
        <div className={classes.Dialog__Content__Title}>Change Access ?</div>
        <div className={classes.Dialog__Content__Description}>
          Do you really want to change the access?
        </div>

        <div className={classes.Dialog__Content__Action}>
          <Button
            className={classes.Dialog__Content__ButtonOutlineBlack}
            onClick={handleFormClose}
            sx={{
              marginRight: '0.5rem',
              padding: '0.375rem 1.5rem !important',
            }}
          >
            Yes, Confirm
          </Button>
          <Button
            className={classes.Dialog__Content__ButtonFillBlack}
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SuperAdminChangeUserAccessDialog;
