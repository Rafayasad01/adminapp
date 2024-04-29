/* eslint-disable no-restricted-syntax */

import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader2';
import Notify from '../../components/common/Notify';
import TimePicker from '../../components/common/TimePicker';
import TopBar from '../../components/common/TopBar';
import { AddAppointmentForm } from '../../interfaces/app.appointment';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import storeLovService from '../../services/adminapp/adminStoreService';
import { GENDER, MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';

// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

export default function AddAppointmentPage() {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [isPageLoader, setIsPageLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [activeBarber, setActiveBarber] = useState<any>();
  const [activeBarberData, setActiveBarberData] = useState<any>();
  const [, /* bookingList */ setBookingList] = useState<any>();
  const [catLovlist, setCatLovList] = useState<any>();
  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  const [usedCatItemsLovlist, setusedCatItemsLovList] = useState<any>([]);
  const [barberList, setBarberList] = useState<any>([]);
  // const [prevBookedAppointment, setPrevBookedAppointment] = useState<any>([]);
  const [empId, setEmpId] = useState<any>();
  const [appointmentTime, setAppointmentTime] = useState<dayjs.Dayjs | any>(
    null
  );
  const [appointmentBookedTime, setAppointmentBookedTime] = useState<any>([]);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AddAppointmentForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'appointments', // Name of the array field
    keyName: 'key',
  });

  const getCatItemName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = usedCatItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: any) {
      return `<span class="${className}"></span>`;
    },
  };

  const getBookedTimeSlots = async (id: any, date: any) => {
    await storeAppointmentService
      .getBarberBookedTimeSlots(id, date)
      .then((res) => {
        if (res.data.success) {
          setEmpId(id);
          setAppointmentBookedTime(res.data.data);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const BarberCard = (item: any, index: number) => {
    const onHandleBarber = async () => {
      if (index === activeBarber) {
        setActiveBarber(null);
        setActiveBarberData(null);
        setBookingList(null);
        setAppointmentBookedTime([]);
      } else {
        setBookingList(item.storeEmployeeSchedule);
        setActiveBarberData(item);
        setActiveBarber(index);
        if (item.storeEmployee.id !== empId) {
          getBookedTimeSlots(
            item.storeEmployee.id,
            dayjs(getValues('appointmentDate'))?.format('YYYY-MM-DD')
          );
        }
      }
    };

    const getAvatarName: any = (name: string | undefined) => {
      const ProfileName = name?.split(' ');
      const initials = ProfileName?.map((part) => part.charAt(0).toUpperCase());
      return initials?.join('');
    };

    // console.log('activeBarberData', activeBarberData);

    return (
      <div
        onClick={onHandleBarber}
        className={`${
          index === activeBarber && 'bg-background'
        } w-[100%] cursor-pointer rounded-2xl border-[1px] border-[#949EAE] px-3 py-4`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#003E80]">
            {getCatItemName(item.storeServiceCategoryItem)}
          </span>
          <div className="flex items-center">
            <img
              className="h-[14px] w-[14px]"
              src={assets.images.Star}
              alt="avatar-img"
            />
            <span className="ml-1 text-sm font-semibold">4.9</span>
          </div>
        </div>
        <div className="my-6 text-center">
          <div className="flex items-center justify-center">
            {item.storeEmployee.avatar ? (
              <img
                className="my-2 h-[55px] w-[55px]"
                src={item.storeEmployee.avatar}
                alt="avatar-img"
              />
            ) : (
              <Avatar className="my-2 h-[55px] w-[55px]">
                {getAvatarName(item.storeEmployee.name)}
              </Avatar>
            )}
          </div>
          <span className="text-sm font-semibold">
            {item.storeEmployee.name}
          </span>
        </div>
      </div>
    );
  };

  const catLovService = () => {
    storeLovService
      .StoreCatLov()
      .then((res: any) => {
        if (res.data.success) {
          setCatLovList(res.data.data);
        } else {
          setTimeout(() => {
            navigate(-1);
          }, 1000);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    catLovService();
  }, []);

  const getBarbers = async (id: any) => {
    setIsPageLoader(true);
    await storeAppointmentService
      .getBarbersList(id)
      .then((res) => {
        if (res.data.success) {
          setIsPageLoader(false);
          setBarberList(res.data.data);
          setActiveBarberData(null);
          setBookingList(null);
          setActiveBarber(null);
        } else {
          setIsPageLoader(false);
        }
      })
      .catch((error) => {
        console.error(`getBarbers -> error:`, error);
        setIsPageLoader(false);
      });
  };

  const getCatItems = async (id: any) => {
    await storeLovService.StoreCatItemsLov(id).then((res) => {
      if (res.data.success) {
        setCatItemsLovList(res.data.data);
        const uniqueData = res.data.data.filter(
          (item: any) =>
            !usedCatItemsLovlist.some(
              (existingItem: any) => existingItem.id === item.id
            )
        );
        setusedCatItemsLovList([...usedCatItemsLovlist, ...uniqueData]);
      } else {
        setCatItemsLovList([]);
        setIsNotify(true);
        setNotifyMessage({
          text: res.data.message,
          type: 'error',
        });
      }
    });
  };

  useEffect(() => {
    if (
      getValues('categoryId') !== undefined &&
      getValues('categoryId') !== 'none'
    ) {
      setBarberList([]);
      setValue('storeServiceCategoryItem', 'none');
      getCatItems(watch('categoryId'));
      // console.log("hit");
    }
  }, [watch('categoryId')]);

  useEffect(() => {
    if (
      getValues('storeServiceCategoryItem') !== undefined &&
      getValues('storeServiceCategoryItem') !== 'none'
    ) {
      getBarbers(watch('storeServiceCategoryItem'));
    }
  }, [watch('storeServiceCategoryItem')]);

  const addAppointmentServices = () => {
    const tmpId = 0;
    const obj = {
      id: 0,
      barber: activeBarberData?.storeEmployee?.name,
      amount: activeBarberData?.amount,
      storeServiceCategory: watch('categoryId'),
      storeServiceCategoryItem: watch('storeServiceCategoryItem'),
      storeEmployee: activeBarberData?.storeEmployee?.id,
      appointmentTime: `${dayjs(getValues('appointmentDate'))?.format(
        'YYYY-MM-DD'
      )} ${dayjs(appointmentTime)?.format('HH:mm:ss')}`,
    };
    if (
      watch('storeServiceCategoryItem') &&
      activeBarberData &&
      getValues('appointmentDate') &&
      appointmentTime
    ) {
      const check: boolean =
        fields?.find(
          (el: any) =>
            el.storeServiceCategoryItem === watch('storeServiceCategoryItem')
        ) !== undefined;
      console.log('check', check);
      if (!check) {
        const currentDay = dayjs(getValues('appointmentDate')).format('dddd');
        const scheduleData = activeBarberData?.storeEmployeeSchedule.filter(
          (item: any) => item.workDay === currentDay
        );
        // console.log("active barber", activeBarberData);
        // console.log(
        //   'appointmentBookedTime',
        //   appointmentBookedTime,
        //   scheduleData
        // );
        // if (appointmentBookedTime?.length <= 0) {
        //   append(obj);
        // };
        const startTime = dayjs(scheduleData[0]?.startTime).format('HH:mm');
        const endTime = dayjs(scheduleData[0]?.endTime).format('HH:mm');
        let prevTime = dayjs(scheduleData[0]?.startTime).format('HH:mm');
        const time: any = dayjs(appointmentTime).format('HH:mm');
        const addTime = dayjs(appointmentTime).add(
          activeBarberData?.serviceTime,
          'minute'
        );
        const convertAppointmentAddTime = dayjs(addTime).format('HH:mm');
        // console.log('start end');
        appointmentBookedTime.forEach((el: any) => {
          // for (const key of Object.keys(appointmentBookedTime)) {
          //   const index = key;
          //   const el = appointmentBookedTime[index];
          console.log('El', el);
          // console.log('activeBarberData', activeBarberData);
          if (
            el.storeEmployee === activeBarberData?.storeEmployee?.id &&
            dayjs(el.appointmentTime).format('HH:mm') !== time
          ) {
            // console.log('El', el);
            const add = dayjs(el.appointmentTime).add(el.serviceTime, 'minute');
            const elStartTime = dayjs(el.appointmentTime).format('HH:mm');
            const convertAddTime: any = dayjs(add).format('HH:mm');
            console.log(
              '🚀 ~ appointmentBookedTime.forEach ~ elStartTime:',
              elStartTime,
              convertAddTime
            );
            console.log('add', add);
            if (elStartTime > startTime && elStartTime < endTime) {
              console.log('if mee 1');
              if (time > convertAddTime) {
                console.log('if mee 2');
                // console.log('if');
                prevTime = convertAddTime;
              } else if (
                time < prevTime &&
                convertAppointmentAddTime >= elStartTime
              ) {
                console.log('if mee 3');
                // console.log("2");
                // console.log('else');
                // console.log("3");
                // console.log('if meet error');
                setIsNotify(true);
                setNotifyMessage({
                  text: `Service time is ${activeBarberData?.serviceTime} minutes, Barber is not avaiable at ${time}`,
                  type: 'error',
                });
                return false;
                // break;
              }
            } else {
              // console.log('if mee 4');
              // console.log("4");
              // console.log("if success error 2");/
              setNotifyMessage({
                text: 'Barber is not avaiable at this time',
                type: 'error',
              });
            }
          }
          return null;
        });
        // console.log('hello me');
        const newTmpId = tmpId + 1;
        const newData = {
          id: newTmpId,
          appointmentTime,
          email: activeBarberData?.storeEmployee?.email ?? 'abc@gmail.com',
          gender: 'male',
          name: activeBarberData?.storeEmployee?.name ?? 'urapp',
          note: 'demo',
          phone: activeBarberData?.storeEmployee?.phone,
          serviceTime: activeBarberData?.serviceTime,
          status: 'New',
          storeEmployee: activeBarberData?.storeEmployee?.id,
          storeServiceCategory: '12345',
          storeServiceCategoryItem: activeBarberData?.storeServiceCategoryItem,
        };
        // console.log('NEWDATA', newData);
        obj.id = newTmpId;
        setAppointmentBookedTime((prev: any) => [...prev, newData]);
        // setPrevBookedAppointment(newData);
        append(obj);
      } else {
        // console.log("5");
        setIsNotify(true);
        setNotifyMessage({
          text: 'This service you already selected, Please select another service',
          type: 'error',
        });
      }
    } else {
      // console.log("6");
      setIsNotify(true);
      setNotifyMessage({
        text: 'Please select your preferred barber, category , desired services, and appointment date & time for scheduling.',
        type: 'error',
      });
    }
    return null;
  };

  console.log('AVTIVE BARBER FIELDS', fields);
  console.log('AVTIVE BARBER BOOKING', fields);

  const onSubmit = (data: any) => {
    setIsLoader(true);
    delete data.storeServiceCategoryItem;
    delete data.storeServiceCategory;
    delete data.categoryId;
    delete data.appointmentDate;
    const updatedAppointmentArray = data.appointments.map((item: any) => {
      const { _amount, _barber, ...rest } = item;
      return rest;
    });
    data.appointments = updatedAppointmentArray;
    // console.log('dataa', data, bookingList);
    storeAppointmentService
      .appointmentCreate(data)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
          setTimeout(() => {
            navigate(-1);
          }, 500);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
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
  };

  const handleDateChange = (date: any, field: any) => {
    // console.log('HIT', date, activeBarberData);
    if (activeBarberData) {
      field.onChange(date);
      getBookedTimeSlots(
        activeBarberData.storeEmployee.id,
        dayjs(date)?.format('YYYY-MM-DD')
      );
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'First select barber before selecting appointment date & time',
        type: 'error',
      });
    }
  };

  // console.log("barberList", barberList);

  const removeBookinkList = (item: any) => {
    setAppointmentBookedTime((arr: any) =>
      arr.filter((filterItem: any) => filterItem.id !== item.id)
    );
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Fill Appointment Form" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="p-3">
            <span className="text-base font-bold text-[#1A1A1A]">Add Info</span>
            <hr className="my-4 border-[#949EAE]" />
            <form
              // className="overflow-auto px-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="FormBody">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="FormFields grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            maxLetterLimit={50}
                            pattern={PATTERN.CHAR_SPACE_DASH}
                            inputTitle="Full Name"
                            placeholder="Enter full name"
                            id="name"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.name}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="gender"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{ roles: GENDER }}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            defaultValue="Select Gender"
                            inputTitle="Gender"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle="Phone"
                            placeholder="Enter phone number"
                            id="phone"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.phone}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.CHAR_NUM_DOT_AT}
                            inputTitle="Email"
                            placeholder="Enter email address"
                            id="email"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.email}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="categoryId"
                            control={control}
                            error={errors}
                            register={register}
                            setValue={setValue}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Barber Category"
                            options={{ roles: catLovlist }}
                            defaultValue="Select Barber Category"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="storeServiceCategoryItem"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{ roles: catItemsLovlist }}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Barber Services"
                            defaultValue="Select Service"
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="w-full">
                      <FormControl
                        className="FormControl w-full"
                        variant="standard"
                      >
                        <label className="FormLabel font-semibold">
                          Any Message{' '}
                        </label>
                        <TextField
                          className="FormTextarea"
                          id="note"
                          multiline
                          rows={7}
                          defaultValue=""
                          placeholder="Write Note..."
                          {...register('note', {
                            required: 'Note is required',
                            minLength: {
                              value: 1,
                              message: 'Minimum One Characters',
                            },
                            maxLength: {
                              value: 250,
                              message: MAX_LENGTH_EXCEEDED,
                            },
                          })}
                        />
                        {errors.note && (
                          <ErrorSpanBox error={errors.note?.message} />
                        )}
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>

              {getValues('storeServiceCategoryItem') !== undefined &&
                getValues('storeServiceCategoryItem') !== 'none' && (
                  <>
                    <div className="mt-5">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        Select Barber
                      </span>
                      <hr className="my-4 border-[#949EAE]" />
                      {isPageLoader ? (
                        <Loader />
                      ) : barberList?.length > 0 ? (
                        <div
                          className={
                            barberList?.length === 0 ? 'h-[0px]' : 'h-[215px]'
                          }
                        >
                          <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            pagination={pagination}
                            modules={[Pagination]}
                            className="mySwiper custom-swiper custom-swiper-slider"
                          >
                            {barberList?.map((item: any, index: number) => {
                              return (
                                <SwiperSlide key={index}>
                                  {BarberCard(item, index)}
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
                      ) : (
                        <span>
                          There are currently no barbers available to provide
                          this service.
                        </span>
                      )}
                    </div>
                    {activeBarberData !== null && (
                      <div className="mt-5">
                        <span className="text-base font-bold text-[#1A1A1A]">
                          Available {activeBarberData?.storeEmployee?.name}{' '}
                          Appointment slots
                        </span>
                        <hr className="my-4 border-[#949EAE]" />
                        <div className="gaps-4 grid grid-cols-12">
                          {activeBarberData?.storeEmployeeSchedule?.map(
                            (item: any, index: number) => {
                              return (
                                <div key={index} className="col-span-2 p-3">
                                  <div className="h-[100px] flex-col">
                                    <div>
                                      <span className="font-semibold">
                                        {item.workDay}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm">
                                        {dayjs(item.startTime).isValid()
                                          ? dayjs(item.startTime)?.format(
                                              'h:mm A'
                                            )
                                          : '--'}{' '}
                                        -{' '}
                                        {dayjs(item.endTime).isValid()
                                          ? dayjs(item.endTime)?.format(
                                              'h:mm A'
                                            )
                                          : '--'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                    <div className="">
                      <div className="mt-5">
                        <span className="text-base font-bold text-[#1A1A1A]">
                          Select Date & Time
                        </span>
                        <hr className="my-4 border-[#949EAE]" />
                        <div className="flex items-center">
                          <div>
                            <ThemeProvider theme={darkTheme}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DemoItem label="Desktop variant"> */}
                                <div>
                                  <span className="text-sm">
                                    Select Appointment Date
                                  </span>
                                </div>
                                <Controller
                                  name="appointmentDate"
                                  control={control}
                                  defaultValue={dayjs()}
                                  render={({ field }) => (
                                    <DesktopDatePicker
                                      {...field}
                                      disabled={!activeBarberData}
                                      onChange={(date) =>
                                        handleDateChange(date, field)
                                      }
                                      // onChange={(date) => field.onChange(date)}
                                      value={field.value}
                                      minDate={dayjs()}
                                    />
                                  )}
                                />
                                {/* </DemoItem> */}
                              </LocalizationProvider>
                            </ThemeProvider>
                          </div>
                          <div className="mx-5">
                            <div className="flex-col">
                              <span className="text-sm">
                                Select Appointment Time
                              </span>
                              <div className="">
                                <FormControl
                                  className="FormControl"
                                  variant="standard"
                                >
                                  <TimePicker
                                    disabled={!activeBarberData}
                                    // timePickerLabel="Appointment Time"
                                    // timePickerSubLabel={"(Office in time)"}
                                    timePickerValue={appointmentTime}
                                    setTimePickerValue={setAppointmentTime}
                                    id="startTime"
                                    // setError={setError}
                                  />
                                </FormControl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        Booked Time slots
                      </span>
                      <hr className="my-4 border-[#949EAE]" />
                      {appointmentBookedTime?.length === 0 && (
                        <span className="">No Booked Appointments</span>
                      )}
                      <div className="gaps-4 grid grid-cols-12">
                        {appointmentBookedTime?.map(
                          (item: any, index: number) => {
                            // console.log('APP ITEM TIME', item);

                            const servicetime = Number(item.serviceTime);
                            const apptimeDayjs = dayjs(item.appointmentTime);
                            const endTime = apptimeDayjs.add(
                              servicetime,
                              'minute'
                            );
                            // const formattedEndTime = endTime.format('h:mm A');
                            const formattedEndTime = dayjs(endTime).isValid()
                              ? dayjs(endTime)?.format('h:mm A')
                              : '--';
                            return (
                              <div key={index} className="col-span-2 p-3">
                                <div className="flex-col rounded-xl bg-background">
                                  <div className="flex items-center justify-center p-3">
                                    <span className="text-sm">
                                      {dayjs(item.appointmentTime).isValid()
                                        ? dayjs(item.appointmentTime)?.format(
                                            'h:mm A'
                                          )
                                        : '--'}{' '}
                                      - {formattedEndTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </>
                )}
              <div className="mt-3">
                <span className="text-base font-bold text-[#1A1A1A]">
                  Selected Barber & Service
                </span>
                {fields?.length > 0 && <hr className="my-4 border-[#949EAE]" />}
                {fields?.length > 0 &&
                  fields?.map((items: any, index: number) => {
                    return (
                      <div className="my-4 grid grid-cols-12" key={index}>
                        <div className="col-span-1">
                          <div
                            onClick={() => {
                              remove(index);
                              removeBookinkList(items);
                            }}
                            className="flex w-[40%] cursor-pointer items-center justify-center rounded-2xl bg-background p-2"
                          >
                            <CloseIcon />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Barber</p>
                          <span>{items.barber}</span>
                        </div>
                        <div className="col-span-2 mx-7">
                          <p className="font-semibold">Service</p>
                          <span>
                            {getCatItemName(items.storeServiceCategoryItem)}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Appointment Amount</p>
                          <span>{items.amount}</span>
                        </div>
                        <div className="col-span-2 mx-7">
                          <p className="font-semibold">Appointment Date</p>
                          <span>{items.appointmentTime.split(' ')[0]}</span>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Appointment Time</p>
                          <span>{items.appointmentTime.split(' ')[1]}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr className="my-4 border-[#949EAE]" />
              <div className="mt-3 flex w-full items-center justify-end">
                <CustomButton
                  buttonType="button"
                  title={fields.length > 0 ? 'Add More Service' : 'Add'}
                  className="btn-black-fill"
                  // type={'submit'}
                  onclick={addAppointmentServices}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '12%',
                    marginRight: '15px',
                    height: '35px',
                  }}
                />
                <CustomButton
                  disabled={fields?.length < 1 && true}
                  buttonType="button"
                  title="Submit"
                  className="btn-black-outline"
                  type="submit"
                  // onclick={handleFormClose}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '15%',
                    height: '35px',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
