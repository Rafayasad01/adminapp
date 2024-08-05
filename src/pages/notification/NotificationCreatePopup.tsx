import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import TextField from '@mui/material/TextField';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Notification } from '../../interfaces/notification.interface';
import {
  ALL_PERMISSIONS,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import { useAppSelector } from '../../redux/redux-hooks';

type NotificationCreatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function NotificationCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: NotificationCreatePopupProps) {
  const [notificationType, setNotificationType] = useState('Customers');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Notification>();

  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const onSubmit = (data: Notification) => {
    setOpenFormDialog(false);
    data.notificationType = notificationType;
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleUserChange = (event: any) => {
    setNotificationType(event.target.value);
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
                    pattern: PATTERN.CHAR_SPEC_NUM_DASH,
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
                <label className="FormLabel mt-3">
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
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storeNotification.selectType
            ) && (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <FormControl className="">
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="font-open-sans text-sm text-secondary"
                    >
                      User Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={notificationType ?? ''}
                      onClick={handleUserChange}
                    >
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        // disabled={FALSE}
                        value="Customers"
                        control={
                          <Radio
                            className="text-sm text-[#1D1D1D]"
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlinedIcon />}
                          />
                        }
                        label="Customers"
                      />
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        value="StaffUsers"
                        control={
                          <Radio
                            className="text-[#1D1D1D]"
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlinedIcon />}
                          />
                        }
                        label="Staff Users"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )}
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
