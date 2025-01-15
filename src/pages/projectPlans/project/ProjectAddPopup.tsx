import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import '../../../assets/css/PopupStyle.css';
import {
  ALL_PERMISSIONS,
  CONSTRUCTION_TYPE,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PROJECT_PLAN_TYPE,
  // VALIDATE_NON_NEGATIVE_NUM,
} from '../../../utils/constants';
import { Project } from '../../../interfaces/projectPlan.interface';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import storeAppUsers from '../../../services/adminapp/adminAppUser';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { listingRolePermission } from '../../../utils/helper';
import { useAppSelector } from '../../../redux/redux-hooks';

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
    watch,
    formState: { errors },
  } = useForm<Project>();
  const [users, setUsers] = useState([]);
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  useEffect(() => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewProjects)
    ) {
      storeAppUsers.usersLov(authState.user.tenant).then((item: any) => {
        setUsers(item.data.data.list);
      });
    }
  }, []);

  const onSubmit = (data: any) => {
    const obj = {
      ...data,
      startDate: dayjs(data.startDate).utc().format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs(data.endDate).utc().format('YYYY-MM-DD HH:mm:ss'),
    };
    // console.log('🚀 ~ onSubmit ~ data:', obj);
    callback(obj);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleDateChange = (date: any, field: any) => {
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
                <CustomDropDown
                  validateRequired
                  id="clientName"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: users }}
                  customClassInputTitle="font-bold"
                  inputTitle="Client Name"
                  defaultValue="Select Client"
                />
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
                          // minDate={dayjs()}
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
                        validate: (endDate) => {
                          const startDate = watch('startDate');
                          if (!startDate || !endDate) {
                            return true; // Skip validation if either date is missing
                          }
                          return (
                            !dayjs(startDate).isSame(endDate, 'day') ||
                            'End date cannot be the same as the start date'
                          );
                        },
                      }}
                      defaultValue={dayjs()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          className="custom-border-2 w-full"
                          onChange={(date) => handleDateChange(date, field)}
                          // onChange={(date) => field.onChange(date)}
                          value={field.value || dayjs()}
                          minDate={dayjs(watch('startDate'))}
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
                <label className="FormLabel">Project Name</label>
                <Input
                  className="FormInput"
                  {...register('name', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Project Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <ErrorSpanBox error="Project Name is required" />
                )}
                {errors.name?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.name?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="constructionType"
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
                <label className="FormLabel mt-2">Site Supervisor Name</label>
                <Input
                  className="FormInput"
                  {...register('supervisorName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Site Supervisor Name"
                  type="text"
                  id="supervisorName"
                  disableUnderline
                />
                {errors.supervisorName?.type === 'required' && (
                  <ErrorSpanBox error="Site Supervisor Name is required" />
                )}
                {errors.supervisorName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.supervisorName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              {/* <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Quotation</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Enter Quotation Amount"
                  {...register('budget', {
                    required: 'Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 20,
                      message: 'Length should not be excceed from 20 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.budget && (
                  <ErrorSpanBox error={errors.budget?.message} />
                )}
              </FormControl> */}
            </div>
            {/* <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Total Paid</label>
                <Input
                  className="FormInput"
                  id="totalPaid"
                  type="number"
                  placeholder="Enter Amount"
                  {...register('totalPaid', {
                    required: 'Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    validate: (value: any) => {
                      const isNonNegative = VALIDATE_NON_NEGATIVE_NUM(value);
                      const isValidAmount =
                        parseFloat(value) <= parseFloat(watch('budget')) ||
                        'Total paid cannot exceed quotation amount';
                      return isNonNegative && isValidAmount;
                    },
                    maxLength: {
                      value: 20,
                      message: 'Length should not be excceed from 20 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.totalPaid && (
                  <ErrorSpanBox error={errors.totalPaid?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Due Amount</label>
                <Input
                  className="FormInput"
                  id="dueAmount"
                  type="number"
                  placeholder="Enter Amount"
                  {...register('dueAmount', {
                    required: 'Amount is required in numbers',
                    // validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    validate: (value) => {
                      const calculatedDue =
                        parseFloat(watch('budget')) -
                        parseFloat(watch('totalPaid'));
                      const isNonNegative = VALIDATE_NON_NEGATIVE_NUM(value);
                      const isValidDue =
                        parseFloat(value) === calculatedDue ||
                        `Due amount should be ${calculatedDue}`;
                      return isNonNegative && isValidDue;
                    },
                    maxLength: {
                      value: 20,
                      message: 'Length should not be excceed from 20 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.dueAmount && (
                  <ErrorSpanBox error={errors.dueAmount?.message} />
                )}
              </FormControl>
            </div> */}
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
                padding: '0.175rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ProjectAddPopup;
