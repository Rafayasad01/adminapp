import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import assets from '../../../assets';
import CustomDropDown from '../../../components/common/CustomDropDown';
import TimePicker from '../../../components/common/CustomTimePicker';
import Loader from '../../../components/common/Loader';
import '../../../index.css';
import { AppSchedule } from '../../../interfaces/app-user.interface';
import { useAppSelector } from '../../../redux/redux-hooks';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  filteredWeekdays?: any;
  appUserId?: string;
};

function AppUserScheduleCreatePage({
  openFormDialog,
  setOpenFormDialog,
  callback,
  filteredWeekdays,
  appUserId,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);

  const {
    register,
    unregister,
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<AppSchedule>();
  // console.log('ss', startTime);

  const handleFormClose = () => setOpenFormDialog(false);

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
    // console.log('data3', data);
    setIsLoader(true);
    const parent: any = {
      createdBy: authState.user.id,
      appUser: appUserId,
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

    // console.log("PARENT", parent);
    callback(parent);
  };

  return isLoader ? (
    <Loader />
  ) : (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'custom-dialog-width Dialog',
        style: { maxWidth: '100%', minHeight: '400px', height: '410px' },
      }}
    >
      <div className="Content">
        <div className="overflow-auto px-2">
          <div className="FormHeader">
            <span className="Title my-2">Add Schedule</span>
          </div>
          <div className="w-full rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-3">
                {permissionList?.map((mainEl: any, mainIndex: number) => {
                  return (
                    <div
                      key={mainIndex}
                      className="xl:col-span-2 2xl:col-span-1"
                    >
                      <div className="">
                        <div className="grid-col-12 relative grid rounded-lg border-2 p-5">
                          {mainIndex > 0 && (
                            <div
                              onClick={() =>
                                handleRemovePermission(mainEl.id, mainIndex)
                              }
                              className="absolute right-[-10px] top-[-10px] cursor-pointer"
                            >
                              <img
                                src={assets.images.removeIcon}
                                alt="cancel"
                              />
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
                                        options={{ roles: filteredWeekdays }}
                                        customClassInputTitle="font-bold"
                                        inputTitle="Select Day"
                                        defaultValue="Select Day"
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
                  <img alt="add" src={assets.images.addImg} />
                </div>
              </div>
              <div className="FormFooter">
                <Button
                  className="btn-black-outline"
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
                  sx={{
                    padding: '0.375rem 2rem !important',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
export default AppUserScheduleCreatePage;
