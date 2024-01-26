import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../../components/common/CustomMultipleSelect';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Loader from '../../../components/common/Loader2';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
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

function AppointmentVisitUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  formData,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AppointmentVisit>();

  const [isLoader, setIsLoader] = React.useState(true);
  const [servicelov, setServiceLov] = useState<any>();
  const [schedule, setSchedule] = useState<any>();

  const onSubmit = (data: AppointmentVisit) => {
    const visitorDetails = {
      appointmentId: formData.id,
      name: data.visitName,
      phone: data.phone,
      appointmentProvider: data.appointmentProvider,
      appointmentService: data.appointmentService,
      note: data.note,
    };
    // console.log('visitorDetails', visitorDetails);
    callback(visitorDetails);
  };

  useEffect(() => {
    if (formData?.appointmentProvider) {
      Service.VisitProviderById(
        watch('appointmentProvider')
          ? watch('appointmentProvider')
          : formData?.appointmentProvider
      )
        .then((item: any) => {
          if (item.data.success) {
            // console.log('visitTTTT', item.data.data);
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
                    text: items.data.message,
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
    }
  }, [watch('appointmentProvider') !== undefined]);

  // console.log(
  //   '===>',
  //   formData?.services,
  //   servicelov,
  //   formData?.appointmentService
  // );

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  // console.log(formData?.appointmentService);

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
              <span className="Title">Update Appointment</span>
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
                      value: formData?.name,
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
                      value: formData?.phone,
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
                    options={{
                      roles: formData && formData?.providers,
                      role: formData?.appointmentProvider,
                    }}
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
                    options={{
                      roles:
                        servicelov !== undefined
                          ? servicelov
                          : formData && formData?.services,
                      role: formData?.appointmentService,
                    }}
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
                      pattern: {
                        value: PATTERN.CHAR_NUM_DOT_AT,
                        message: INVALID_CHAR,
                      },
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
        )}
      </div>
    </Dialog>
  );
}

export default AppointmentVisitUpdatePopup;
