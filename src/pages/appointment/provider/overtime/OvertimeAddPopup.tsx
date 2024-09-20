// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import { createTheme } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
import TimePicker from '../../../../components/common/TimePicker';
// import TextField from '@mui/material/TextField';
// import CustomDropDown from '../../../../components/common/CustomDropDown';
// import TimePicker from '../../../../components/common/TimePicker';
import { OvertimeCreate } from '../../../../interfaces/overtime.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  VALIDATE_NON_NEGATIVE_NUM,
  //   imageAllowedTypes,
} from '../../../../utils/constants';
import '../../../../assets/css/PopupStyle.css';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function OvertimeAddPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: // setIsNotify,
// setNotifyMessage,
Props) {
  const {
    register,
    handleSubmit,
    // setValue,
    // clearErrors,
    // control,
    // watch,
    formState: { errors },
  } = useForm<OvertimeCreate>();

  const [overtimeHours, setOvertimeHours] = useState<any>(null);

  const onSubmit = (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // data.avatar = image;
    // const res = {
    //   name: data.categoryName,
    //   description: data.categoryDesc,
    //   avatar: image,
    // };
    callback(data);
  };

  // const handleDateChange = (date: any, field: any) => {
  //   // console.log('HIT', date, activeBarberData);
  //   field.onChange(date);
  // };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  //   const handleFileChange = (event: any) => {
  //     const selectedFile = event.target.files[0];
  //     if (selectedFile) {
  //       const fileType = selectedFile.type;
  //       if (imageAllowedTypes.includes(fileType)) {
  //         setImage(event.target.files[0]);
  //         setValue('avatar', event.target.files[0]);
  //         clearErrors('avatar');
  //       } else {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: 'Only .png, .jpg, and .jpeg files are allowed',
  //           type: 'error',
  //         });
  //       }
  //     }
  //   };

  //   const handleFileOnClick = (event: any) => {
  //     event.target.value = null;
  //     setImage(null);
  //     setValue('avatar', '');
  //   };

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
            <span className="Title">Add New Bonus</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormField">
              <TimePicker
                timePickerLabel="Overtime Hours"
                timePickerSubLabel="Select Overtime Hours"
                timePickerValue={overtimeHours}
                setTimePickerValue={setOvertimeHours}
                id="overtimeHours"
                // views={['hours']}
                // errors={items.error}
                // setError={setError}
              />
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Amount</label>
                <Input
                  className="FormInput"
                  id="hourlyAmount"
                  type="number"
                  placeholder="Enter Hourly Amount"
                  {...register('hourlyAmount', {
                    required: 'Hourly Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 6,
                      message: 'Length should not be excceed from 6 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.hourlyAmount && (
                  <ErrorSpanBox error={errors.hourlyAmount?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Overtime Amount</label>
                <Input
                  className="FormInput"
                  id="overtimeAmount"
                  type="number"
                  placeholder="Enter Overtime Amount"
                  {...register('overtimeAmount', {
                    required: 'Overtime Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 6,
                      message: 'Length should not be excceed from 6 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.overtimeAmount && (
                  <ErrorSpanBox error={errors.overtimeAmount?.message} />
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
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.1rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default OvertimeAddPopup;
