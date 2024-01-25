import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomDateTimePicker from '../../../components/common/CustomDateTimePicker';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../../components/common/CustomMultipleSelect';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Loader from '../../../components/common/Loader2';
import TimePicker from '../../../components/common/TimePicker';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
} from '../../../utils/constants';

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

function AppointmentVisitReschedulePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AppointmentVisit>();

  const authState: any = useAppSelector((state: any) => state?.authState);
  const [isLoader, setIsLoader] = React.useState(true);
  const [providerlov, setProviderLov] = useState<any>();
  const [servicelov, setServiceLov] = useState<any>();
  const [schedule, setSchedule] = useState<any>();
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);

  const onSubmit = (data: AppointmentVisit) => {
    // console.log('dataSS', data, startTime);
    const formattedDate = `${
      dayjs(data.appointmentDate).isValid() &&
      dayjs(data.appointmentDate)?.format('YYYY-MM-DD')
    } ${dayjs(startTime).isValid() && dayjs(startTime)?.format('HH:mm:ss')}`;
    const currentDate = dayjs();
    const formattedCurrentDate = currentDate.format('YYYY-MM-DD');
    const visitorDetails = {
      name: data.visitName,
      phone: data.phone,
      appointmentTime: watch('isCheckTimingSlot')
        ? formattedDate
        : formattedCurrentDate,
      appointmentProvider: data.appointmentProvider,
      appointmentService: data.appointmentService,
      note: data.note,
      tenant: authState.user.tenant,
      isUrgent: data.isUrgent,
    };
    // console.log('visitorDetails', visitorDetails);
    if (startTime && data.appointmentDate) {
      callback(visitorDetails, 'reschedule');
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    // setIsLoader(true);
    setServiceLov([]);
    if (
      watch('appointmentProvider') !== 'none' &&
      watch('appointmentProvider') !== undefined
    ) {
      Service.VisitProviderById(watch('appointmentProvider'))
        .then((item: any) => {
          if (item.data.success) {
            // console.log('visit', item.data.data);
            setSchedule(item.data.data);
            setIsLoader(false);
            Service.VisitServiceLovByProviderId(item.data.data.id)
              .then((items: any) => {
                if (items.data.success) {
                  // console.log('visit Services', items.data.data);
                  setServiceLov(items.data.data);
                  setIsLoader(false);
                } else {
                  setIsLoader(false);
                  setIsNotify(true);
                  setNotifyMessage({
                    text: item.data.message,
                    type: 'error',
                  });
                }
              })
              .catch((err) => {
                setIsLoader(false);
                setIsNotify(true);
                setNotifyMessage({
                  text: err.message,
                  type: 'error',
                });
              });
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      Service.VisitLov(authState.user.tenant)
        .then((item: any) => {
          if (item.data.success) {
            // console.log('visit', item.data.data);
            setProviderLov(item.data.data);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    }
  }, [watch('appointmentProvider')]);

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  // console.log('sssssssssssss', watch('appointmentProvider'));

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', minHeight: '545px', height: '550px' },
      }}
    >
      <div className="Content">
        {isLoader ? (
          <Loader />
        ) : (
          <form
            className="overflow-auto px-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="FormHeader">
              <span className="Title">Appointment Reschedule</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Name</label>
                  <Input
                    className="FormInput"
                    type="text"
                    id="visitName"
                    placeholder="Enter name"
                    disableUnderline
                    {...register('visitName', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                    })}
                  />
                  {errors.visitName?.type === 'required' && (
                    <ErrorSpanBox error="visit name is required" />
                  )}
                  {errors.visitName?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.visitName?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Phone</label>
                  <Input
                    className="FormInput"
                    {...register('phone', {
                      required: true,
                      pattern: PATTERN.PHONE,
                      maxLength: {
                        value: 15,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    type="text"
                    id="phone"
                    placeholder="Enter phone number"
                    disableUnderline
                  />
                  {errors.phone?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.phone?.type === 'maxLength' && (
                    <ErrorSpanBox error={PH_MINI_LENGTH} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="appointmentProvider"
                    alternativeId="appointmentService"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: providerlov }}
                    customClassInputTitle="font-bold"
                    inputTitle="Appointment Provider"
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <CustomMultipleSelectBox
                    validateRequired
                    id="appointmentService"
                    control={control}
                    error={errors}
                    setValue={setValue}
                    register={register}
                    options={{ roles: servicelov }}
                    customClassInputTitle="font-bold"
                    inputTitle="Appointment Services"
                  />
                </FormControl>
              </div>
              {schedule && (
                <>
                  <div className="my-2">
                    <label className="FormLabel">
                      <span className="font-semibold">Schedule</span>
                    </label>
                  </div>
                  {schedule.appointmentProviderSchedule?.length <= 0 && (
                    <div className="flex items-center justify-center">
                      <p className="text-sm">There is no avaiablility</p>
                    </div>
                  )}
                  <div className="grid grid-cols-7 gap-6">
                    {schedule?.appointmentProviderSchedule?.map(
                      (item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="col-span-1 rounded-full bg-background"
                          >
                            <div className="m-2 flex items-center justify-center rounded-full bg-primary p-4">
                              <p className="text-sm text-foreground">
                                {item.workDay.slice(0, 3)}
                              </p>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="my-0 text-xs">
                                {dayjs(item.startTime).isValid() &&
                                  dayjs(item.startTime).format('hh:mm A')}
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="mb-5 text-xs">
                                {dayjs(item.endTime).isValid() &&
                                  dayjs(item.endTime).format('hh:mm A')}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">
                    Note{' '}
                    <span className="SubLabel">Write 01-250 Characters</span>
                  </label>
                  <TextField
                    className="FormTextarea"
                    id="note"
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder="Write Description"
                    {...register('note', {
                      required: 'Description is required',
                      minLength: {
                        value: 1,
                        message: 'Minimum Five Characters',
                      },
                      maxLength: {
                        value: 250,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.note && <ErrorSpanBox error={errors.note?.message} />}
                </FormControl>
              </div>
              <div className="mt-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: '#1D1D1D' }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                      }
                      {...register('isUrgent')}
                    />
                  }
                  label="Enable Urgent Appointment"
                />
              </div>
              <div className="">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: '#1D1D1D' }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                      }
                      {...register('isCheckTimingSlot')}
                    />
                  }
                  label="Enable Timing Slot"
                />
              </div>
              {watch('isCheckTimingSlot') === true && (
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <TimePicker
                      timePickerLabel="Appointment Time"
                      isTrue={watch('isCheckTimingSlot')}
                      // timePickerSubLabel={"(Office in time)"}
                      timePickerValue={startTime}
                      setTimePickerValue={setStartTime}
                      id="startTime"
                      // setError={setError}
                    />
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <CustomDateTimePicker
                      register={register}
                      id="appointmentDate"
                      isTrue={watch('isCheckTimingSlot')}
                      value={watch('appointmentDate')}
                      error={errors.appointmentService}
                      inputTitle="Appointmant Date"
                      setValue={setValue}
                    />
                  </FormControl>
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
                value="Add"
                className="btn-black-fill"
                disableUnderline
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              />
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}

export default AppointmentVisitReschedulePopup;
