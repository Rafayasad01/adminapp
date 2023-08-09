import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';
import '../../assets/css/PopupStyle.css';
import TimePicker from '../../components/common/TimePicker';
import { useForm } from "react-hook-form";
import { AppUserDriverExt } from '../../interfaces/app-user.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
};

function DriversScheduleCreatePopup({ openFormDialog, setOpenFormDialog, callback }: Props) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<AppUserDriverExt>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = (data: AppUserDriverExt) => {
    data.start_time = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
    data.end_time = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
    setOpenFormDialog(false);
    callback(data);
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
            <span className="Title">Add Schedule</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <TimePicker
                timePickerLabel="Start Time"
                timePickerSubLabel="Office in time"
                timePickerValue={startTime}
                setTimePickerValue={setStartTime}
                id="start_time"
              />
              <TimePicker
                timePickerLabel="End Time"
                timePickerSubLabel="Office out time"
                timePickerValue={endTime}
                setTimePickerValue={setEndTime}
                id="end_time"
              />
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
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
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

export default DriversScheduleCreatePopup;
