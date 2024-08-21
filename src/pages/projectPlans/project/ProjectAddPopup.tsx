import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { Project } from '../../../interfaces/projectPlan.interface';
import {
  CONSTRUCTION_TYPE,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PROJECT_PLAN_TYPE,
} from '../../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function ProjectAddPopup({
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
    control,
    // watch,
    formState: { errors },
  } = useForm<Project>();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  // console.log('Errors', errors, watch('file'));

  const onSubmit = (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    callback();
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    field.onChange(date);
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
          <div className="FormHeader w-full">
            <span className="Title">Add Project</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Project Name</label>
                <Input
                  className="FormInput"
                  {...register('projectName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Project Name"
                  type="text"
                  id="projectName"
                  disableUnderline
                />
                {errors.projectName?.type === 'required' && (
                  <ErrorSpanBox error="Project Name is required" />
                )}
                {errors.projectName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.projectName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: PROJECT_PLAN_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Project Type"
                  defaultValue="Select type"
                />
              </FormControl>
            </div>
            <div className="FormFields">
              <div className="w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Select Start Date</span>
                    </div>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        required: 'Start date is required',
                      }}
                      defaultValue={dayjs()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          className="custom-border-2 w-full"
                          onChange={(date) => handleDateChange(date, field)}
                          // onChange={(date) => field.onChange(date)}
                          value={field.value || dayjs()}
                          minDate={dayjs()}
                        />
                      )}
                    />
                    {errors && errors.startDate && (
                      <ErrorSpanBox error={errors.startDate.message} />
                    )}
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
              <div className="w-full">
                <ThemeProvider theme={darkTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Desktop variant"> */}
                    <div>
                      <span className="text-sm">Select End Date</span>
                    </div>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: 'End date is required',
                      }}
                      // defaultValue={dayjs()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          className="custom-border-2 w-full"
                          onChange={(date) => handleDateChange(date, field)}
                          // onChange={(date) => field.onChange(date)}
                          value={field.value || dayjs()}
                          minDate={dayjs()}
                        />
                      )}
                    />
                    {errors && errors.endDate && (
                      <ErrorSpanBox error={errors.endDate.message} />
                    )}
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Client Name</label>
                <Input
                  className="FormInput"
                  {...register('clientName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Project Name"
                  type="text"
                  id="clientName"
                  disableUnderline
                />
                {errors.clientName?.type === 'required' && (
                  <ErrorSpanBox error="Client Name is required" />
                )}
                {errors.clientName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.clientName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="contructionType"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: CONSTRUCTION_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Construction Type"
                  defaultValue="Select type"
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">Supervisor Name</label>
                <Input
                  className="FormInput"
                  {...register('supervisorName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Supervisor Name"
                  type="text"
                  id="supervisorName"
                  disableUnderline
                />
                {errors.supervisorName?.type === 'required' && (
                  <ErrorSpanBox error="Supervisor Name is required" />
                )}
                {errors.supervisorName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.supervisorName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
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
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ProjectAddPopup;
