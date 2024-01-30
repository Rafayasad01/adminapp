import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import assets from '../../../assets';
import CustomButton from '../../../components/common/CustomButton';
import CustomDropDown from '../../../components/common/CustomDropDown';
import TimePicker from '../../../components/common/CustomTimePicker';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import '../../../index.css';
import { AppointmentProviderSchedule } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import { setText, weekDays } from '../../../utils/constants';

function AppointmentProviderAddSchedulePage() {
  const { id } = useParams();
  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<AppointmentProviderSchedule>();
  // console.log('ss', startTime);

  const inputFieldsData = [
    {
      fieldName: 'Select Your Day',
      id: `name${count}`,
      register,
      watch,
      setValue,
      error: errors.weekName,
      type: 'dropdown',
    },
    {
      fieldName: 'Start Time',
      id: `startdatetime${count}`,
      placeholder: '(Office in time)',
      register,
      watch,
      setValue,
      time: startTime,
      setTime: setStartTime,
      error: errors.startDateTime,
      type: 'datepicker',
    },
    {
      fieldName: 'End Time',
      id: `enddatetime${count}`,
      placeholder: 'Office out time',
      register,
      time: endTime,
      setTime: setEndTime,
      error: errors.endDateTime,
      setValue,
      type: 'datepicker',
    },
  ];

  const [permissionList, setPermissionList] = useState<any>([
    {
      id: 0,
      fields: inputFieldsData,
    },
  ]);

  const handleAddMore = () => {
    // const newStartTime = dayjs();
    // const newEndTime = dayjs();
    const tempCount = count + 1;
    setCount(tempCount);
    const newId = tempCount;
    const newPermissionSet = {
      id: newId,
      fields: [
        {
          fieldName: 'Select Your Day',
          id: `name${tempCount}`,
          register,
          error: errors.weekName,
          type: 'dropdown',
        },
        {
          fieldName: 'Start Time',
          id: `startdatetime${tempCount}`,
          placeholder: '(Office in time)',
          register,
          error: errors.startDateTime,
          setValue,
          type: 'datepicker',
        },
        {
          fieldName: 'End Time',
          id: `enddatetime${tempCount}`,
          placeholder: '(Office out time)',
          register,
          error: errors.endDateTime,
          setValue,
          type: 'datepicker',
        },
      ],
    };

    setPermissionList((prevPermissionList: any) => [
      ...prevPermissionList,
      newPermissionSet,
    ]);
  };

  // console.log("add more data", timeObjects);

  const unRegisterValues = (unRegId: any) => {
    return unregister(unRegId);
  };

  const handleRemovePermission = (revId: any, index: number) => {
    const temp: any = [...permissionList];
    temp
      .find((item: any) => item.id === revId)
      ?.fields.forEach((field: any) => {
        unRegisterValues(`${field.id}`);
      });
    const filteredData = temp.filter(
      (item: any, filterIndex: number) => filterIndex !== index
    );
    setPermissionList(filteredData);
  };

  const onSubmit = (data: any) => {
    setIsLoader(true);
    const parent: any = {
      createdBy: authState.user.id,
      appointmentProvider: id,
      workDays: [],
    };
    const dataKeys = Object.keys(data).filter((key) => key.includes('name'));
    const indexPattern: any = /\d+$/; // Regular expression to match the index at the end of keys

    dataKeys.forEach((nameKey: any) => {
      const index = nameKey.match(indexPattern)[0];
      const dataItem = {
        day: data[`name${index}`],
        startTime: data[`startdatetime${index}`].format('YYYY-MM-DD HH:mm:ss'),
        endTime: data[`enddatetime${index}`].format('YYYY-MM-DD HH:mm:ss'),
      };
      parent.workDays.push(dataItem);
    });
    Service.ProviderScheduleCreate(parent)
      .then((item: any) => {
        if (item.data.success) {
          // console.log('CREATED', item.data);
          reset();
          setText(item.data.message);
          navigate(-1);
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
      <TopBar isNestedRoute title="Add Schedules" />
      <div className="m-auto mx-5 mt-5">
        <div className="w-full rounded-lg bg-white py-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="FormBody m-5">
            <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-4">
              {permissionList?.map((mainEl: any, mainIndex: number) => {
                return (
                  <div key={mainIndex} className="xl:col-span-2 2xl:col-span-1">
                    <div className="">
                      <div className="grid-col-12 relative grid rounded-lg border-2 p-5">
                        {mainIndex > 0 && (
                          <div
                            onClick={() =>
                              handleRemovePermission(mainEl.id, mainIndex)
                            }
                            className="absolute right-[-10px] top-[-10px] cursor-pointer"
                          >
                            <img src={assets.images.removeIcon} alt="cancel" />
                          </div>
                        )}
                        {mainEl.fields?.map((item: any, index: number) => {
                          return (
                            <FormControl
                              key={index}
                              className="FormControl"
                              variant="standard"
                            >
                              <div className="FormField my-1">
                                {item.type === 'dropdown' ? (
                                  <div className="">
                                    <CustomDropDown
                                      validateRequired
                                      id={item.id}
                                      control={control}
                                      error={errors}
                                      register={register}
                                      options={{ roles: weekDays }}
                                      customClassInputTitle="font-bold"
                                      inputTitle="Select Day"
                                    />
                                  </div>
                                ) : item.type === 'datepicker' ? (
                                  <div key={index} className="">
                                    <TimePicker
                                      timePickerLabel={item.fieldName}
                                      timePickerSubLabel={item.placeholder}
                                      timePickerValue={item.time}
                                      setTimePickerValue={item.setTime}
                                      id={item.id}
                                      index={index}
                                      errors={errors}
                                      register={register}
                                      setValue={setValue}
                                      watch={watch}
                                      setError={setError}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </FormControl>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={() => handleAddMore()}
                className="flex h-[248px] cursor-pointer items-center justify-center rounded-lg bg-faded xl:col-span-2 2xl:col-span-1"
              >
                <AddIcon className="text-6xl text-foreground" />
              </div>
            </div>
            <div className="mt-5">
              <CustomButton
                buttonType="button"
                type="submit"
                title="add"
                className="btn-black-fill"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AppointmentProviderAddSchedulePage;
