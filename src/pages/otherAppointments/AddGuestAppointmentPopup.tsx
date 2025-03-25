import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
// import createTheme from '@mui/material/styles/createTheme';
import dayjs from 'dayjs';
// import TimePicker from '../../components/common/TimePicker';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import {
  BarberItemServices,
  GuestItemServices,
} from '../../interfaces/services.interface';
// import { useAppSelector } from '../../redux/redux-hooks';
import storeLovService from '../../services/adminapp/adminStoreService';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import {
  // ALL_PERMISSIONS,
  // BARBER_SERVICES_AMOUNT,
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
  editGuestFormData: any;
  parentBabars: any;
};

interface Appointment {
  guest: string;
  storeServiceCategory: string;
  serviceTime: string;
  storeServiceCategoryItem: string;
  storeEmployee: string;
  appointmentTime: string;
  amount?: string;
  appointmentType?: string;
}

interface GuestAppointments {
  name: string;
  appointments: Omit<Appointment, 'guest'>[]; // Exclude 'guest' from appointments
}

function AddGuestAppointmentPopup({
  callback,
  openFormDialog,
  setIsNotify,
  setNotifyMessage,
  setOpenFormDialog,
  editGuestFormData,
  parentBabars,
}: EmployeeServiceCreatePopupProps) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
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

  useEffect(() => {
    if (openFormDialog && editGuestFormData) {
      append(editGuestFormData); // Restore form state
    }
  }, [openFormDialog]);

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

  const handleFormClose = () => {
    // setSavedData(getValues());
    setOpenFormDialog(false);
  };

  const handleReset = () => {
    reset();
    setValue('services', []);
    setOpenFormDialog(false);
    editGuestFormData = [];
    append(editGuestFormData);
    callback([], []);
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

  const babarLov = () => {
    const filteredLOV = barberLov.filter(
      (item: any) =>
        !parentBabars.some((barber: any) => barber.storeEmployee === item.id)
    );
    return filteredLOV || [];
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
      // console.log('acaca', activeBarberData);

      if (getValues('storeEmployee') !== 'AnyProfessional') {
        const findBaber = barberList.find(
          (x: any) => x.storeEmployee.id === getValues('storeEmployee')
        );
        // console.log('Active babr', findBaber);
        setActiveBarberData(findBaber);
      } else {
        setActiveBarberData({
          storeEmployee: {
            id: 'AnyProfessional',
            name: 'Any Professional',
          },
        });
      }
    }
  }, [watch('storeEmployee')]);

  function reshapeAppointments(data: Appointment[]): {
    guest: GuestAppointments[];
  } {
    // const groupedGuests: any = {};
    const groupedGuests: Record<string, GuestAppointments> = {};

    data?.forEach(({ guest, ...appointmentDetails }) => {
      if (!groupedGuests[guest]) {
        groupedGuests[guest] = {
          name: guest,
          appointments: [],
        };
      }
      groupedGuests[guest].appointments.push(appointmentDetails);
    });

    return { guest: Object.values(groupedGuests) };
  }

  const onSubmit = (data: BarberItemServices | any) => {
    // console.log('🚀 ~ onSubmit ~ data: 1', data);
    if (fields?.length < 1) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Add at-least one guest',
        type: 'error',
      });
      return;
    }
    delete data.amount;
    delete data.amountType;
    delete data.storeServiceCategoryItem;
    const updatedArray = data.services.map((item: any) => {
      const {
        // storeServiceCategory: _categoryId,
        barber: _babar,
        ...rest
      } = item;
      return rest;
    });
    const fnfData = reshapeAppointments(updatedArray);
    const updatedServices = data.services.map((service: any) => ({
      ...service,
      storeCatItemName: getCatItemName(service.storeServiceCategoryItem),
    }));
    setValue('services', updatedServices);
    callback(fnfData, updatedServices);
    setOpenFormDialog(false);
  };

  // console.log('guest data ==>', parentBabars);

  const addAppointmentServices = () => {
    const obj = {
      guest: `Guest ${watch('guestName')}`,
      barber: activeBarberData?.storeEmployee?.name,
      amount: activeBarberData?.servicePrice || '',
      storeServiceCategory: watch('storeServiceCategory'),
      appointmentType:
        activeBarberData?.storeEmployee?.id === 'AnyProfessional'
          ? 'AnyProfessional'
          : 'Professional',
      serviceTime: activeBarberData?.serviceTime || '',
      storeServiceCategoryItem: watch('storeServiceCategoryItem'),
      storeEmployee:
        activeBarberData?.storeEmployee?.id !== 'AnyProfessional'
          ? activeBarberData?.storeEmployee?.id
          : '',
      appointmentTime: `${dayjs(getValues('appointmentTime'))?.format(
        'YYYY-MM-DD'
      )}`,
    };
    if (
      watch('storeServiceCategoryItem') &&
      activeBarberData &&
      watch('guestName')
    ) {
      const isDuplicateServiceForGuest = fields.some(
        (el: any) =>
          el.guest === `Guest ${watch('guestName')}` && // Same guest
          el.storeServiceCategoryItem === watch('storeServiceCategoryItem') // Same service
      );

      // Check if the barber is already assigned to another guest (excluding "AnyProfessional")
      const isBarberDuplicate = fields.some(
        (el: any) =>
          el.guest !== `Guest ${watch('guestName')}` &&
          el.storeEmployee === watch('storeEmployee') &&
          watch('storeServiceCategoryItem') !== 'AnyProfessional'
      );

      // Check if "AnyProfessional" is selected, ensuring storeServiceCategoryItem is unique for the same guest
      const isDuplicateAnyProfessionalService = fields.some(
        (el: any) =>
          el.guest === `Guest ${watch('guestName')}` &&
          el.storeServiceCategoryItem === watch('storeServiceCategoryItem') &&
          watch('storeEmployee') === 'AnyProfessional'
      );

      if (isDuplicateServiceForGuest) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'This service is already added for this guest.',
          type: 'error',
        });
      } else if (isBarberDuplicate) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'This barber is already assigned to another guest. Please choose a different one.',
          type: 'error',
        });
      } else if (isDuplicateAnyProfessionalService) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'If selecting "AnyProfessional", the service must be unique for the guest.',
          type: 'error',
        });
      } else {
        append(obj);
      }
    } else {
      // console.log("6");
      setIsNotify(true);
      setNotifyMessage({
        text: 'Please select your preferred Guest, category and, desired services for scheduling appointment.',
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
                    requiredType
                    maxLetterLimit={50}
                    pattern={PATTERN.CHAR_SPACE_DASH}
                    inputTitle="Guest Name"
                    placeholder="Guest 1"
                    id="guestName"
                    customFontClass="font-semibold mb-1"
                    customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                    register={register}
                    error={errors.guestName}
                    inputType="number"
                    typeImportant
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    // validateRequired
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
                    // validateRequired
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
                    // validateRequired
                    id="storeEmployee"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                      roles: [
                        ...(babarLov() ?? []),
                        ...[
                          { name: 'Any Professional', id: 'AnyProfessional' },
                        ],
                      ],
                    }}
                    defaultValue="Select Baber"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Baber"
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <span className="mt-2 block text-base font-bold text-[#1A1A1A]">
            Guest List
          </span>
          <hr className="my-4 border-[#949EAE]" />
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-4 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-2 px-2 font-semibold">Guest</div>
                <div className="col-span-2 px-2 font-semibold">Barber</div>
                <div className="col-span-2 font-semibold">Category</div>
                <div className="col-span-2 font-semibold">Service</div>
                {/* <div className="col-span-2 font-semibold">Amount</div> */}
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
                    {item.guest}
                  </div>
                  <div className="col-span-2 truncate px-2 capitalize">
                    {item.barber}
                  </div>
                  <div className="col-span-2 truncate px-2 capitalize">
                    {getCatName(item.storeServiceCategory) ?? 'None'}
                  </div>
                  <div className="col-span-2 truncate px-1">
                    {item.storeCatItemName
                      ? item.storeCatItemName
                      : getCatItemName(item.storeServiceCategoryItem) ?? 'None'}
                  </div>
                  {/* <div className="col-span-2 px-2 capitalize">
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
                   
                  </div> */}
                  <div className="col-span-2 px-2 capitalize">
                    {item.appointmentTime}
                  </div>
                  <div className="col-span-1 text-center text-primary">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      onClick={() => {
                        remove(index);
                      }}
                      fontSize="small"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="">
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
            <Button
              className="btn-black-outline w-[20%]"
              type="submit"
              onClick={handleReset}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Reset & Close
            </Button>
            <Input
              type="submit"
              value="Save"
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
