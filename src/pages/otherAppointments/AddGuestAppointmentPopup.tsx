import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import createTheme from '@mui/material/styles/createTheme';
import dayjs from 'dayjs';
import TimePicker from '../../components/common/TimePicker';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import {
  BarberItemServices,
  GuestItemServices,
} from '../../interfaces/services.interface';
// import { useAppSelector } from '../../redux/redux-hooks';
import storeLovService from '../../services/adminapp/adminStoreService';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import storeEmployeeService from '../../services/adminapp/adminStoreEmployee';
import {
  // ALL_PERMISSIONS,
  // BARBER_SERVICES_AMOUNT,
  CURRENCY_PREFIX,
  // GENDER,
  PATTERN,
} from '../../utils/constants';
// import { listingRolePermission } from '../../utils/helper';

type EmployeeServiceCreatePopupProps = {
  callback: (...args: any[]) => any;
  openFormDialog: boolean;
  setIsNotify: any;
  setNotifyMessage: any;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  parentAppointmentBookedTime: any;
};

function AddGuestAppointmentPopup({
  callback,
  openFormDialog,
  setIsNotify,
  setNotifyMessage,
  setOpenFormDialog,
}: // parentAppointmentBookedTime,
EmployeeServiceCreatePopupProps) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GuestItemServices>();

  // const dataRole = useAppSelector(
  //   (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  // );

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services', // Name of the array field
    keyName: 'key',
  });

  // category
  const [catLovlist, setCatLovList] = useState<any>();
  // category items
  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  // const [allCatItemsLovlist, setAllCatItemsLovList] = useState<any>([]);
  const [usedCatItemsLovlist, setusedCatItemsLovList] = useState<any>([]);
  const [barberLov, setBarberLov] = useState<any>([]);

  const [barberList, setBarberList] = useState<any>([]);
  const [activeBarberData, setActiveBarberData] = useState<any>();

  const [appointmentBookedTime, setAppointmentBookedTime] = useState<
    Array<any>
  >([]);
  const [tempAppointmentBookedTime, setTempAppointmentBookedTime] = useState<
    Array<any>
  >([]);

  const [appointmentTime, setAppointmentTime] = useState<dayjs.Dayjs | any>(
    null
  );

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
      },
    },
  });

  const getCatName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = catLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const getCatItemName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = catItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const checkIsSameDate = (date: any, appointmentDate: any) => {
    return dayjs(date).isSame(appointmentDate, 'day');
  };

  // const checkIsAfterTime = (date: any, appointmentDate: any) => {
  //   return dayjs(date).isAfter(appointmentDate, 'minutes');
  // };

  const checkIsBeforeTime = (appointmentDate: any, date: any) => {
    return dayjs(appointmentDate).isBefore(date, 'minute');
  };

  const checkIsBetweenTime = (
    selectedTime: any,
    beforeTime: any,
    afterTime: any
  ) => {
    return dayjs(selectedTime).isBetween(beforeTime, afterTime, 'minute');
  };

  function checkDuplicateServices(
    array: any,
    targetEmployee: string,
    targetCategoryItem: string
  ) {
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of array) {
      if (
        obj.storeEmployee === targetEmployee &&
        obj.storeServiceCategoryItem === targetCategoryItem &&
        dayjs(obj.appointmentTime).format('YYYYMMDD') ===
          dayjs(getValues('appointmentTime')).format('YYYYMMDD')
      ) {
        return true; // Found a matching object
      }
    }
    return false; // No matching object found
  }

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const shopEvents = async (id: any, date: any) => {
    try {
      const resp = await storeEmployeeService.StoreEmployeeScheduleService(
        id,
        date
      );
      return resp.data.data;
    } catch (error) {
      // console.error('Error:', error);
      // Handle error if necessary
      return false; // or throw error if you want to propagate it
    }
  };

  const getBookedTimeSlots: any = async (id: any, date: any) => {
    const resll = await shopEvents(
      id,
      dayjs(getValues('appointmentTime')).format('YYYY-MM-DD')
    );
    if (resll) {
      setAppointmentBookedTime([]);
      setIsNotify(true);
      setNotifyMessage({
        text: 'Today must be an event or may be employee is on leave',
        type: 'error',
      });
      return false;
    }
    await storeAppointmentService
      .getBarberBookedTimeSlots(id, date)
      .then((res) => {
        if (res.data.success) {
          const newArr = res.data.data;
          newArr.forEach((item: any) => {
            const newAppTime = dayjs(item.appointmentTime)
              .set('hours', dayjs(item.appointmentTime).hour())
              .set('minute', dayjs(item.appointmentTime).minute());
            delete item.appointmentTime;
            item.appointmentTime = newAppTime;
            return item;
          });
          if (tempAppointmentBookedTime.length > 0) {
            tempAppointmentBookedTime.filter((item: any) => {
              if (
                item.storeEmployee === id &&
                checkIsSameDate(
                  getValues('appointmentTime'),
                  dayjs(item.appointmentTime)
                )
              ) {
                newArr.push(item);
                return item;
              }
              return false;
            });
          }
          setAppointmentBookedTime(newArr);
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
    return null;
  };

  const handleDateChange = (date: any, field: any) => {
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

  const catLovService = () => {
    storeLovService
      .StoreCatLov()
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

  const getBarbers = async (id: any) => {
    // setIsPageLoader(true);
    setBarberLov([]);
    setValue('storeEmployee', 'none');
    await storeAppointmentService
      .getBarbersList(id)
      .then((res) => {
        if (res.data.success) {
          // setIsPageLoader(false);
          const data = res.data.data.map((x: any) => {
            return {
              id: x.storeEmployee.id,
              name: x.storeEmployee.name,
            };
          });
          console.log('dattaa', data);
          setBarberList(res.data.data);
          setBarberLov(data);
          setActiveBarberData(null);
          // setActiveBarber(null);
        } else {
          // setIsPageLoader(false);
        }
      })
      .catch((error) => {
        console.error(`getBarbers -> error:`, error);
        // setIsPageLoader(false);
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
      getValues('storeServiceCategory') !== undefined &&
      getValues('storeServiceCategory') !== 'none'
    ) {
      setBarberLov([]);
      setValue('storeServiceCategoryItem', 'none');
      getCatItems(watch('storeServiceCategory'));
      // console.log("hit");
    }
  }, [watch('storeServiceCategory')]);

  useEffect(() => {
    if (
      getValues('storeServiceCategoryItem') !== undefined &&
      getValues('storeServiceCategoryItem') !== 'none'
    ) {
      getBarbers(watch('storeServiceCategoryItem'));
    }
  }, [watch('storeServiceCategoryItem')]);

  useEffect(() => {
    if (
      getValues('storeEmployee') !== undefined &&
      getValues('storeEmployee') !== 'none'
    ) {
      const findBaber = barberList.find(
        (x: any) => x.storeEmployee.id === getValues('storeEmployee')
      );
      // console.log('Active babr', findBaber);
      setActiveBarberData(findBaber);
      getBookedTimeSlots(
        findBaber.storeEmployee.id,
        dayjs(getValues('appointmentTime'))?.format('YYYY-MM-DD')
      );
    }
  }, [watch('storeEmployee')]);

  const sortTimeOrder = () => {
    const daysArr = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    // const temp = activeBarberData?.storeEmployeeSchedule;
    const filteredData = daysArr.reduce((filtered: any, day: any) => {
      const filteredDayData = activeBarberData?.storeEmployeeSchedule.filter(
        (item: any) => item.workDay === day
      );
      return [...filtered, ...filteredDayData];
    }, []);
    return filteredData;
  };

  const onSubmit = (data: BarberItemServices | any) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    // if (empDetail.payrollType === 'Salary') {
    //   data.amount = 0;
    //   data.amountType = 'None';
    // } else {
    // }
    delete data.amount;
    delete data.amountType;
    delete data.storeServiceCategoryItem;
    const updatedArray = data.services.map((item: any) => {
      const { storeServiceCategory: _categoryId, ...rest } = item;
      return rest;
    });
    // console.log('🚀 ~ onSubmit ~ final data:', updatedArray);
    callback(updatedArray);
  };

  const removeBookinkList = (item: any) => {
    // console.log('item::::::', item);
    setTempAppointmentBookedTime((arr: any) =>
      arr.filter((filterItem: any) => filterItem.id !== item.id)
    );
    setAppointmentBookedTime((arr: any) =>
      arr.filter((filterItem: any) => filterItem.id !== item.id)
    );
  };

  const addAppointmentServices = () => {
    const obj = {
      barber: activeBarberData?.storeEmployee?.name,
      amount: activeBarberData?.servicePrice,
      storeServiceCategory: watch('storeServiceCategory'),
      serviceTime: activeBarberData?.serviceTime,
      storeServiceCategoryItem: watch('storeServiceCategoryItem'),
      storeEmployee: activeBarberData?.storeEmployee?.id,
      appointmentTime: `${dayjs(getValues('appointmentTime'))?.format(
        'YYYY-MM-DD'
      )} ${dayjs(appointmentTime)?.format('HH:mm:ss')}`,
    };
    if (
      watch('storeServiceCategoryItem') &&
      activeBarberData &&
      getValues('appointmentTime') &&
      appointmentTime
    ) {
      const currentDay = dayjs(getValues('appointmentTime')).format('dddd');
      const scheduleData = activeBarberData?.storeEmployeeSchedule.filter(
        (item: any) => item.workDay === currentDay
      );
      const time = dayjs(getValues('appointmentTime'))
        .set('hours', dayjs(appointmentTime).hour())
        .set('minute', dayjs(appointmentTime).minute());
      const startTime = dayjs(scheduleData[0]?.startTime)
        .set('date', time.date())
        .set('month', time.month())
        .set('year', time.year());
      let endTime = dayjs(scheduleData[0]?.endTime)
        .set('date', time.date())
        .set('month', time.month())
        .set('year', time.year());
      if (startTime.hour() > endTime.hour()) {
        endTime = endTime.add(1, 'day');
      }
      // const officeTimeIn = dayjs(officeTimings?.tenantConfig?.officeTimeIn)
      //   .set('date', time.date())
      //   .set('month', time.month())
      //   .set('year', time.year());
      // let officeTimeOut = dayjs(officeTimings?.tenantConfig?.officeTimeOut)
      //   .set('date', time.date())
      //   .set('month', time.month())
      //   .set('year', time.year());
      // if (officeTimeIn.hour() > officeTimeOut.hour()) {
      //   officeTimeOut = officeTimeOut.add(1, 'day');
      // }
      let prevTime = startTime;
      const addTime = dayjs(time).add(activeBarberData?.serviceTime, 'minutes');
      if (scheduleData.length > 0) {
        // console.log('time, startTime', time, startTime);

        // console.log(
        //   '!checkIsBeforeTime(time, startTime)',
        //   checkIsBeforeTime(startTime, time)
        // );

        if (!checkIsBeforeTime(startTime, time)) {
          // console.log('1');

          setIsNotify(true);
          setNotifyMessage({
            text: 'Barber is not available at this time',
            type: 'error',
          });
          return false;
        }
        const isDuplicate = checkDuplicateServices(
          fields,
          activeBarberData?.storeEmployee?.id,
          watch('storeServiceCategoryItem')
        );
        if (!isDuplicate) {
          if (tempAppointmentBookedTime.length > 0) {
            for (let i = 0; i < tempAppointmentBookedTime.length; i += 1) {
              const tempEl = tempAppointmentBookedTime[i];
              const tempServiceTime = dayjs(tempEl.appointmentTime).add(
                tempEl.serviceTime,
                'minute'
              );
              if (time > dayjs(tempServiceTime)) {
                prevTime = dayjs(tempServiceTime);
              } else if (
                !checkIsBetweenTime(
                  addTime,
                  prevTime,
                  dayjs(tempEl.appointmentTime)
                )
              ) {
                setIsNotify(true);
                setNotifyMessage({
                  text: `Barber is engaged with another client`,
                  type: 'error',
                });
                return false;
              }
            }
          }
          for (let i = 0; i < appointmentBookedTime.length; i += 1) {
            const el = appointmentBookedTime[i];
            const serviceTime = dayjs(el.appointmentTime).add(
              el.serviceTime,
              'minute'
            );
            if (
              time > dayjs(serviceTime)
              // &&
              // checkIsAfterTime(endTime, serviceTime)
            ) {
              prevTime = dayjs(serviceTime);
            } else if (
              // !checkIsAfterTime(endTime, serviceTime) &&
              !checkIsBetweenTime(addTime, prevTime, dayjs(el.appointmentTime))
            ) {
              // break;
              // console.log('2');
              setIsNotify(true);
              setNotifyMessage({
                text: `Barber is not available at this time`,
                type: 'error',
              });
              return false;
            }
          }
          // setTmpId((prevId: any) => prevId + 1);
          const newData = {
            appointmentTime: time,
            email: activeBarberData?.storeEmployee?.email ?? 'abc@gmail.com',
            gender: 'male',
            name: activeBarberData?.storeEmployee?.name ?? 'urapp',
            note: 'demo',
            phone: activeBarberData?.storeEmployee?.phone,
            serviceTime: activeBarberData?.serviceTime,
            status: 'New',
            storeEmployee: activeBarberData?.storeEmployee?.id,
            storeServiceCategory: '12345',
            storeServiceCategoryItem:
              activeBarberData?.storeServiceCategoryItem,
          };
          // obj.id = tmpId;
          setTempAppointmentBookedTime((prev: any) => [...prev, newData]);
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
        // } else {
        //   setIsNotify(true);
        //   setNotifyMessage({
        //     text: `Barber is not avaiable at ${selectedAppointmentTime}`,
        //     type: 'error',
        //   });
        // }
      } else {
        // console.log('3');
        setIsNotify(true);
        setNotifyMessage({
          text: `Barber is not available at ${currentDay}`,
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

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '965px', maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Guest Appointments</span>
          </div>
          <div className="FormBody mt-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <FormControl className="FormControl w-full" variant="standard">
                  <CustomInputBox
                    maxLetterLimit={50}
                    pattern={PATTERN.CHAR_SPACE_DASH}
                    inputTitle="Guest Name"
                    placeholder="Guest 1"
                    id="guestName"
                    customFontClass="font-semibold mb-1"
                    customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                    register={register}
                    error={errors.guestName}
                    inputType="text"
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="storeServiceCategory"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: catLovlist }}
                    defaultValue="Select Category"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Category"
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="storeServiceCategoryItem"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: catItemsLovlist }}
                    defaultValue="Select Services"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Services"
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="storeEmployee"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: barberLov ?? [] }}
                    defaultValue="Select Baber"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Baber"
                  />
                </FormControl>
              </div>
            </div>
          </div>
          {activeBarberData !== null && (
            <div className="mt-5">
              <span className="text-base font-bold text-[#1A1A1A]">
                Available {activeBarberData?.storeEmployee?.name} Appointment
                slots
              </span>
              <hr className="my-2 border-[#949EAE]" />
              <div className="gaps-4 grid grid-cols-12">
                {activeBarberData &&
                  sortTimeOrder()?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="col-span-3 p-3">
                        <div className="h-[100px] flex-col">
                          <div>
                            <span className="font-semibold">
                              {item.workDay}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm">
                              {dayjs(item.startTime).isValid()
                                ? dayjs(item.startTime)?.format('h:mm A')
                                : '--'}{' '}
                              -{' '}
                              {dayjs(item.endTime).isValid()
                                ? dayjs(item.endTime)?.format('h:mm A')
                                : '--'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          <div className="">
            <div className="">
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
                        <span className="text-sm">Select Appointment Date</span>
                      </div>
                      <Controller
                        name="appointmentTime"
                        control={control}
                        defaultValue={dayjs()}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            disabled={!activeBarberData}
                            onChange={(date) => handleDateChange(date, field)}
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
                    <span className="text-sm">Select Appointment Time</span>
                    <div className="">
                      <FormControl className="FormControl" variant="standard">
                        <TimePicker
                          disabled={!activeBarberData}
                          // timePickerLabel="Appointment Time"
                          // timePickerSubLabel={"(Office in time)"}
                          timePickerValue={appointmentTime}
                          setTimePickerValue={setAppointmentTime}
                          // minTime={selectedScheduleTime.startTime}
                          // maxTime={selectedScheduleTime.endTime}
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
              {appointmentBookedTime
                ?.sort(
                  (a: any, b: any) =>
                    dayjs(a.appointmentTime).unix() -
                    dayjs(b.appointmentTime).unix()
                )
                ?.map((item: any, index: number) => {
                  // console.log('APP ITEM TIME', item);
                  // dayjs();
                  const servicetime = Number(item.serviceTime);
                  const apptimeDayjs = dayjs(item.appointmentTime);
                  const endTime = apptimeDayjs.add(servicetime, 'minute');

                  // const formattedEndTime = endTime.format('h:mm A');
                  const formattedEndTime = dayjs(endTime).isValid()
                    ? dayjs(endTime)?.format('h:mm A')
                    : '--';
                  return (
                    <div key={index} className="col-span-3 p-1">
                      <div className="flex-col rounded-xl bg-background">
                        <div className="flex items-center justify-center p-3">
                          <span className="xl:text-xs 2xl:text-sm">
                            {dayjs(item.appointmentTime).isValid()
                              ? dayjs(item.appointmentTime)?.format('h:mm A')
                              : '--'}{' '}
                            - {formattedEndTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <span className="text-base font-bold text-[#1A1A1A]">Guest List</span>
          <hr className="my-4 border-[#949EAE]" />
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-4 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-2 px-2 font-semibold">Barber</div>
                <div className="col-span-2 font-semibold">Category</div>
                <div className="col-span-2 font-semibold">Service</div>
                <div className="col-span-2 font-semibold">Amount</div>
                <div className="col-span-2 font-semibold">Date & Time</div>
                <div className="" />
              </div>
            </div>
          )}
          <div className="mx-[2px] overflow-x-hidden overflow-y-scroll px-[8px] xl:max-h-[180px] xl:min-h-[0px] 2xl:h-[150px]">
            {fields?.map((item: any, index: number) => {
              return (
                <div
                  className="my-2 grid grid-cols-12 items-center justify-between rounded-md border-[1px] border-[#949EAE] p-0 text-sm text-[#1A1A1A]"
                  key={index}
                >
                  <div className="col-span-2 truncate px-2 capitalize">
                    {item.barber}
                  </div>
                  <div className="col-span-2 truncate px-2 capitalize">
                    {getCatName(item.storeServiceCategory) ?? 'None'}
                  </div>
                  <div className="col-span-2 truncate px-1">
                    {getCatItemName(item.storeServiceCategoryItem) ?? 'None'}
                  </div>
                  <div className="col-span-2 px-2 capitalize">
                    {item.amount ? (
                      <div>
                        {item.amount}
                        <span className="font-medium">
                          {item.amountType === 'Percentage'
                            ? ' %'
                            : ` ${CURRENCY_PREFIX}`}
                        </span>
                      </div>
                    ) : (
                      '0'
                    )}
                    {/* {dayjs(item.appointmentTime).isValid()
                      ? dayjs(item.date).format('DD MMMM YYYY')
                      : '--'} */}
                  </div>
                  <div className="col-span-2 px-2 capitalize">
                    {item.appointmentTime}
                  </div>
                  <div className="col-span-2 text-center text-primary">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      onClick={() => {
                        remove(index);
                        removeBookinkList(item);
                      }}
                      fontSize="small"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2">
            <Button
              onClick={addAppointmentServices}
              className="w-full"
              component="span"
            >
              <AddIcon sx={{ marginRight: '0.5rem' }} />
              {fields?.length > 0 ? `Add More Guest` : `Add Guest`}
            </Button>
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

export default AddGuestAppointmentPopup;
