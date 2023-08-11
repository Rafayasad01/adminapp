import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from "react-hook-form";

import '../../assets/css/PopupStyle.css';
import { Notification } from '../../interfaces/notification.interface';
import TextField from '@mui/material/TextField';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
};

function NotificationCreatePopup({ openFormDialog, setOpenFormDialog, callback }: Props) {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<Notification>();
  const onSubmit = (data: Notification) => {
    setOpenFormDialog(false);
    callback(data);

  };

  const handleFormClose = () => {
    setOpenFormDialog(false)
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
            <span className="Title">Sent Notification</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Title</label>
                <Input
                  className="FormInput"
                  {...register("title", { required: true })}
                  type="text"
                  id="title"
                  disableUnderline
                />
                {errors.title?.type === 'required' && <span role="alert">Title is required</span>}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Message{' '}
                  <span className="SubLabel">Write 25-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register("message", { required: true })}
                />
                {errors.message?.type === 'required' && <span role="alert">Message is required</span>}
              </FormControl>
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
              value="Sent"
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

export default NotificationCreatePopup;
