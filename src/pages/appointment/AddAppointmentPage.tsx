import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
import StoreAppointmentService from '../../services/adminapp/adminStoreAppointment';
import StoreLovService from '../../services/adminapp/adminStoreService';
import { GENDER, MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

export default function AddAppointmentPage() {
  const [isLoader /* setIsLoader */] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [activeBarber, setActiveBarber] = useState<any>();
  const [activeBarberData, setActiveBarberData] = useState<any>();
  const [catLovlist, setCatLovList] = useState();
  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  const [barberList, setBarberList] = useState<any>([]);
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

  const { fields, append } = useFieldArray({
    control,
    name: 'appointments', // Name of the array field
    keyName: 'key',
  });

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: any) {
      return `<span class="${className}"></span>`;
    },
  };

  const BarberCard = (item: any, index: number) => {
    const onHandleBarber = async () => {
      if (index === activeBarber) {
        setActiveBarber(null);
        setActiveBarberData(null);
        setAppointmentBookedTime([]);
      } else {
        setActiveBarberData(item);
        setActiveBarber(index);
        // console.log("date",dayjs(getValues("appointmentDate"))?.format('YYYY-MM-DD'));
        await StoreAppointmentService.getBarberBookedTimeSlots(
          item.storeEmployee.id,
          dayjs(getValues('appointmentDate'))?.format('YYYY-MM-DD')
        ).then((res) => {
          setAppointmentBookedTime(res.data.data);
        });
      }
    };

    return (
      <div
        onClick={onHandleBarber}
        className={`${
          index === activeBarber && 'bg-background'
        } w-[100%] cursor-pointer rounded-2xl border-[1px] border-[#949EAE] px-3 py-4`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#003E80]">Beautician</span>
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
            <img
              className="my-2 h-[55px] w-[55px]"
              src={item.storeEmployee.avatar}
              alt="avatar-img"
            />
          </div>
          <span className="text-xl font-semibold">
            {item.storeEmployee.name}
          </span>
        </div>
      </div>
    );
  };

  const catLovService = () => {
    StoreLovService.StoreCatLov()
      .then((res: any) => {
        if (res.data.success) {
          setCatLovList(res.data.data);
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

  useEffect(() => {
    catLovService();
  }, []);

  const getCatItems = async (id: any) => {
    await StoreLovService.StoreCatItemsLov(id).then((res) => {
      setCatItemsLovList(res.data.data);
      // console.log("res items", res.data.data);
    });
  };

  useEffect(() => {
    if (
      getValues('categoryId') !== undefined &&
      getValues('categoryId') !== 'none'
    ) {
      getCatItems(watch('categoryId'));
      // console.log("hit");
    }
  }, [watch('categoryId')]);

  const getBarbers = async (id: any) => {
    await StoreAppointmentService.getBarbersList(id).then((res) => {
      setBarberList(res.data.data);
      // console.log("res items", res.data.data);
    });
  };

  useEffect(() => {
    if (
      getValues('storeServiceCategoryItem') !== undefined &&
      getValues('storeServiceCategoryItem') !== 'none'
    ) {
      getBarbers(watch('storeServiceCategoryItem'));
    }
  }, [watch('storeServiceCategoryItem')]);

  const addAppointmentServices = () => {
    const obj = {
      storeEmployeeService: watch('storeServiceCategoryItem'),
      storeEmployee: watch('categoryId'),
      appointmentTime: `${dayjs(getValues('appointmentDate'))?.format(
        'YYYY-MM-DD'
      )} ${dayjs(appointmentTime)?.format('HH:mm:ss')}`,
    };
    append(obj);
  };

  const onSubmit = (data: any) => {
    delete data.storeServiceCategoryItem;
    delete data.categoryId;
    delete data.appointmentDate;
    console.log('onSubmitDATA1', data);
    StoreAppointmentService.appointmentCreate(data).then((res: any) => {
      console.log('CREATE HIT', res.data.data);
    });
  };

  /* const getName = (arr: any, id: any) => {
    const data = arr.find((el: any) => el.id === id).name;
    console.log(data);
  }; */

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
                      <div className="h-[215px]">
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
                                              'HH:mm A'
                                            )
                                          : '--'}{' '}
                                        -{' '}
                                        {dayjs(item.endTime).isValid()
                                          ? dayjs(item.endTime)?.format(
                                              'HH:mm A'
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
                                  onChange={(date: any) => field.onChange(date)}
                                  value={field.value}
                                />
                              )}
                            />
                            {/* </DemoItem> */}
                          </LocalizationProvider>
                        </ThemeProvider>
                        <div className="mt-3 flex-col">
                          <span className="text-sm">
                            Select Appointment Time
                          </span>
                          <div className="">
                            <FormControl
                              className="FormControl"
                              variant="standard"
                            >
                              <TimePicker
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
                                            'HH:mm A'
                                          )
                                        : '--'}{' '}
                                      -{' '}
                                      {dayjs(item.endTime).isValid()
                                        ? dayjs(item.endTime)?.format('HH:mm A')
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
                  </>
                )}
              <div className="mt-3">
                <span className="text-base font-bold text-[#1A1A1A]">
                  Selected Barber & Service
                </span>
                <hr className="my-4 border-[#949EAE]" />
                {fields?.length > 0 &&
                  fields?.map((items) => {
                    return (
                      <div key={items.key}>
                        <span>hello</span>
                        {/* <span>{getName(catLovlist)}</span> */}
                      </div>
                    );
                  })}
              </div>
              <div className="mt-3 flex w-full items-center justify-end">
                <CustomButton
                  buttonType="button"
                  title="Add"
                  className="btn-black-fill"
                  // type={'submit'}
                  onclick={addAppointmentServices}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '10%',
                    marginRight: '15px',
                    height: '35px',
                  }}
                />
                <CustomButton
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
