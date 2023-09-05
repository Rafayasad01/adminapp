import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import TextField from '@mui/material/TextField';
import { Notification } from '../../interfaces/notification.interface';

type Props = {
  openDetailDialog: boolean;
  setOpenDetailDialog: React.Dispatch<React.SetStateAction<boolean>>;
  detail: any;
};

function NotificationDetailPopup({
  openDetailDialog,
  setOpenDetailDialog,
  detail,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Notification>();
  const onSubmit = (data: Notification) => {
    setOpenDetailDialog(false);
  };

  const handleFormClose = () => {
    setOpenDetailDialog(false);
  };

  return (
    <Dialog
      open={openDetailDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Notification Batch Detail</span>
          </div>
          <div className="FormBody">
            {Object.entries(detail).map(([key, value]: any) => {
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '10px 10px',
                    backgroundColor: '#d1d0cd',
                  }}
                >
                  <div className="key">{key}</div>:
                  <div className="value">{value}</div>
                </div>
              );
            })}
          </div>
          <div className="FormFooter" />
        </form>
      </div>
    </Dialog>
  );
}

export default NotificationDetailPopup;
