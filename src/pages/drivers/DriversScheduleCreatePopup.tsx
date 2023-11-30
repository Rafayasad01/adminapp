import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';
import '../../assets/css/PopupStyle.css';
import { useForm } from 'react-hook-form';
import TimePicker from '../../components/common/CustomTimePicker';
import { AppUserDriverExt } from '../../interfaces/app-user.interface';
import CustomButton from '../../components/common/CustomButton';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function DriversScheduleCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: Props) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    control,
  } = useForm<AppUserDriverExt>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = () => {
    if (startTime !== null && endTime !== null) {
      const data = {
        start_time: '',
        end_time: '',
      };
      data.start_time = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
      data.end_time = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
      setOpenFormDialog(false);
      callback(data);
      // console.log('s1', startTime, endTime, data);
    } else {
      if (startTime === null) {
        setError('start_time', {
          type: 'manual',
          message: 'Start time is required.',
        });
      }
      if (endTime === null) {
        setError('end_time', {
          type: 'manual',
          message: 'End time is required.',
        });
      }
      setOpenFormDialog(true);
    }
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
        <form>
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
                errors={errors.start_time}
                setError={setError}
              />
              <TimePicker
                timePickerLabel="End Time"
                timePickerSubLabel="Office out time"
                timePickerValue={endTime}
                setTimePickerValue={setEndTime}
                id="end_time"
                errors={errors.end_time}
                setError={setError}
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
            <CustomButton
              buttonType="button"
              title="Add"
              onclick={() => onSubmit()}
              // type='submit'
              className="btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
                width: '85%',
                height: '35px',
              }}
            />
            {/* <Input
              // type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
              onClick={() => onSubmit()}
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            /> */}
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default DriversScheduleCreatePopup;
