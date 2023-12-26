import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import TimePicker from '../../../components/common/TimePicker';
import { AppointmentProviderScheduleTime } from '../../../interfaces/app.appointment';

type Props = {
  roles?: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
  formData?: any;
};

function AppointmentProviderScheduleUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  formData,
}: Props) {
  const { handleSubmit } = useForm<AppointmentProviderScheduleTime>();
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);

  const onSubmit = () => {
    const time = {
      startTime:
        dayjs(startTime).isValid() &&
        dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime:
        dayjs(endTime).isValid() &&
        dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
      id: formData?.id,
      workDay: formData?.workDay,
    };
    if (startTime && endTime) {
      setOpenFormDialog(false);
      callback(time);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (formData) {
      setStartTime(formData.startTime);
      setEndTime(formData.endTime);
    }
  }, []);

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  // console.log('sssssssssssss', formData);

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
            <span className="Title">{`Edit ${formData?.workDay} Schedule`}</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <TimePicker
                  timePickerLabel="Start Time"
                  timePickerSubLabel="(Office in time)"
                  timePickerValue={startTime}
                  setTimePickerValue={setStartTime}
                  id="startTime"
                  // setError={setError}
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <TimePicker
                  timePickerLabel="End Time"
                  timePickerSubLabel="(Office out time)"
                  timePickerValue={endTime}
                  setTimePickerValue={setEndTime}
                  id="endTime"
                  // setError={setError}
                />
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
              value="Update"
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

export default AppointmentProviderScheduleUpdatePopup;
