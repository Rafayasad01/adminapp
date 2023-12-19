import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Notification } from '../../interfaces/notification.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function NotificationCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Notification>();
  const onSubmit = (data: Notification) => {
    setOpenFormDialog(false);
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
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
                  {...register('title', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  placeholder="Enter your notification title"
                  id="title"
                  disableUnderline
                />
                {errors.title?.type === 'required' && (
                  <ErrorSpanBox error="Title is required" />
                )}
                {errors.title?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.title?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">
                  Message{' '}
                  <span className="SubLabel">Write 05-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="message"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 5,
                      message: 'Minimum Five Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.message && (
                  <ErrorSpanBox error={errors.message?.message} />
                )}
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
