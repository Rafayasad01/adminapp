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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
// import TimePicker from '../../../../components/common/TimePicker';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
// import CustomDropDown from '../../../../components/common/CustomDropDown';
// import TimePicker from '../../../../components/common/TimePicker';
import { OvertimeCreate } from '../../../../interfaces/overtime.interface';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';

import {
  // CURRENCY_PREFIX,
  // DEDUCTION_TYPE,
  // INVALID_CHAR,
  // MAX_LENGTH_EXCEEDED,
  // PATTERN,
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
  formData: any;
  loader?: boolean;
};

function OvertimeEditPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  formData,
  loader,
}: // setIsNotify,
// setNotifyMessage,
Props) {
  const {
    register,
    handleSubmit,
    setValue,
    // clearErrors,
    // control,
    watch,
    formState: { errors },
  } = useForm<OvertimeCreate>({
    defaultValues: {
      extraOvertimeHours:
        formData?.overtimeData?.data?.extraOvertimeHours ?? '0:00',
    },
  });

  // const [overtimeHours, setOvertimeHours] = useState<any>(null);

  const onSubmit = (data: any) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    const arrObj = {
      overtimeHours: data.overtimeHours,
      extraOvertimeHours: data.extraOvertimeHours,
      hourlyRate: data.hourlyAmount,
      amount: data.overtimeAmount,
      date: dayjs(formData?.overtimeData?.data?.date)
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    // console.log('🚀 ~ onSubmit ~ data:', arrObj);
    callback({ expenseDetails: arrObj, id: formData?.overtimeData?.id });
  };

  // console.log('formData', formData);

  const calculateOvertimePay = (time: string, hourlyRate: number) => {
    // Split the time string into hours and minutes (e.g., '4:07')
    const [hours, minutes] = time?.split(':').map(Number);
    const [extraHours, extraMinutes] = watch('extraOvertimeHours')
      ?.split(':')
      .map(Number);

    // Calculate total minutes
    const totalMinutes = hours * 60 + minutes;
    const extratotalMinutes = extraHours * 60 + extraMinutes;

    const calculateMints = totalMinutes + extratotalMinutes;

    // Convert total minutes to hours (with decimals for partial hours)
    const totalHours = calculateMints / 60;

    // Calculate the overtime pay based on the hourly rate
    const overtimePay = totalHours * hourlyRate;
    setValue('overtimeAmount', overtimePay.toFixed(0));

    return overtimePay;
  };

  useEffect(() => {
    calculateOvertimePay(formData?.totalHours, watch('hourlyAmount'));
  }, [watch('hourlyAmount'), watch('extraOvertimeHours')]);

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
            <span className="Title">Edit Overtime</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Overtime Hours</label>
                <Input
                  className="FormInput"
                  id="overtimeHours"
                  type="text"
                  placeholder="3:30"
                  disabled
                  {...register('overtimeHours', {
                    value: formData?.totalHours,
                    // required: 'Hourly Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {/* {errors.hourlyAmount && (
                  <ErrorSpanBox error={errors.hourlyAmount?.message} />
                )} */}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Extra Overtime Hours</label>
                <Input
                  className="FormInput"
                  id="extraOvertimeHours"
                  type="text"
                  placeholder="Enter Extra Hours (ex: 4:30)"
                  {...register('extraOvertimeHours', {
                    // value: ,
                    // required: 'Hourly Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                  })}
                  disableUnderline
                />
                {/* {errors.hourlyAmount && (
                  <ErrorSpanBox error={errors.hourlyAmount?.message} />
                )} */}
              </FormControl>
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
                    value: formData?.overtimeData?.data?.hourlyRate,
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
                  disabled
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
              disabled={loader}
              value={loader ? 'Loading...' : 'Update'}
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

export default OvertimeEditPopup;
