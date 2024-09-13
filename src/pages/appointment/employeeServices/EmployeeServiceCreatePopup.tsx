import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';
import { BarberItemServices } from '../../../interfaces/services.interface';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeLovService from '../../../services/adminapp/adminStoreService';
import {
  ALL_PERMISSIONS,
  BARBER_SERVICES_AMOUNT,
  CURRENCY_PREFIX,
  // GENDER,
  PATTERN,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';

type EmployeeServiceCreatePopupProps = {
  callback: (...args: any[]) => any;
  catlov?: any;
  emplov?: any;
  openFormDialog: boolean;
  setIsNotify: any;
  setNotifyMessage: any;
  empDetail: any;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function EmployeeServiceCreatePopup({
  callback,
  catlov,
  emplov,
  openFormDialog,
  setIsNotify,
  setNotifyMessage,
  setOpenFormDialog,
  empDetail,
}: EmployeeServiceCreatePopupProps) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BarberItemServices>();

  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services', // Name of the array field
    keyName: 'key',
  });

  // category

  // category items
  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  const [allCatItemsLovlist, setAllCatItemsLovList] = useState<any>([]);

  const getCatItems = async (id: any) => {
    await storeLovService.StoreCatItemsLov(id).then((res) => {
      // setCatItemsLovList(res.data.data);
      const uniqueData = res.data.data.filter(
        (item: any) =>
          !allCatItemsLovlist.some(
            (existingItem: any) => existingItem.id === item.id
          )
      );
      const filtered = res.data.data.filter((el: any) => {
        const find = emplov.find(
          (item: any) => item.storeServiceCategoryItem.id === el.id
        );
        if (!find) {
          return el;
        }
        return false;
      });
      setCatItemsLovList(filtered);
      setAllCatItemsLovList([...allCatItemsLovlist, ...uniqueData]);
    });
  };

  console.log('emplov', emplov);

  useEffect(() => {
    if (
      getValues('categoryId') !== undefined &&
      getValues('categoryId') !== 'none'
    ) {
      getCatItems(watch('categoryId'));
    }
  }, [watch('categoryId')]);

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
      const { categoryId: _categoryId, ...rest } = item;
      return rest;
    });
    // console.log('🚀 ~ onSubmit ~ final data:', updatedArray);
    callback(updatedArray);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const getCatName = (id: any) => {
    // console.log('🚀 ~ getCatItemName ~ id:', id, allCatItemsLovlist);
    let tempAr: any[] = [];
    tempAr = catlov;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const getCatItemName = (id: any) => {
    // console.log('🚀 ~ getCatItemName ~ id:', id, allCatItemsLovlist);
    let tempAr: any[] = [];
    tempAr = allCatItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  function checkDuplicateServices(array: any, targetCategoryItem: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of array) {
      if (obj.storeServiceCategoryItem === targetCategoryItem) {
        return true; // Found a matching object
      }
    }
    return false; // No matching object found
  }

  const handleServices = () => {
    const obj = {
      categoryId: watch('categoryId'),
      storeServiceCategoryItem: watch('storeServiceCategoryItem'),
      amount: watch('amount') ? watch('amount') : 0,
      amountType: watch('amountType') ? watch('amountType') : 'None',
    };
    const isDuplicate = checkDuplicateServices(
      fields,
      watch('storeServiceCategoryItem')
    );
    if (watch('storeServiceCategoryItem') === 'none') {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Add one service atleast',
        type: 'error',
      });
      return;
    }
    if (isDuplicate) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'This service you already selected, Please select another service',
        type: 'error',
      });
      return;
    }
    if (watch('amount') && watch('amount')?.length > 6) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Commission Amount/Percentage should be 6.',
        type: 'error',
      });
      return;
    }
    if (fields.length > 7) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Services limit exceeded.',
        type: 'error',
      });
      return;
    }
    append(obj);
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
          <div className="FormHeader">
            <span className="Title">Add Staff Service</span>
          </div>
          <div className="FormBody mt-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="categoryId"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: catlov }}
                    defaultValue="Select Category"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Category"
                  />
                </FormControl>
              </div>
              {/* <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="serviceType"
                    control={control}
                    error={errors}
                    register={register}
                    setValue={setValue}
                    options={{ roles: GENDER }}
                    defaultValue="Select Type"
                    customClassInputTitle="font-bold"
                    inputTitle="Select Type"
                  />
                </FormControl>
              </div> */}
              <div className="col-span-6">
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
            </div>
            {empDetail &&
              empDetail.payrollType !== 'Salary' &&
              listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storeAppointment.commissionAppointmentEmployee
              ) && (
                <div className="mt-3 grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormControl className="FormControl" variant="standard">
                      <CustomDropDown
                        validateRequired
                        id="amountType"
                        control={control}
                        error={errors}
                        register={register}
                        setValue={setValue}
                        // options={{ roles: providerlov }}
                        customClassInputTitle="font-bold"
                        inputTitle="Amount Type"
                        options={{ roles: BARBER_SERVICES_AMOUNT }}
                        defaultValue="Select Type"
                      />
                    </FormControl>
                  </div>
                  <div className="col-span-6">
                    <FormControl className="FormControl" variant="standard">
                      <CustomInputBox
                        pattern={PATTERN.ONLY_NUM}
                        maxLetterLimit={6}
                        inputTitle="Commission"
                        placeholder="Enter Amount / Percentage"
                        id="amount"
                        register={register}
                        error={errors.amount}
                        inputType="text"
                      />
                    </FormControl>
                  </div>
                  {/* <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomInputBox
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={4}
                    inputTitle="Service Time (Minutes)"
                    placeholder="Enter time (Minutes)"
                    id="serviceTime"
                    register={register}
                    error={errors.serviceTime}
                    inputType="text"
                  />
                </FormControl>
              </div> */}
                </div>
              )}
          </div>
          {fields?.length > 0 && (
            <div className="mx-[2px] px-[8px]">
              <div className="mt-2 grid grid-cols-12 items-center justify-between gap-4 rounded-md border-[1px] border-[#949EAE] py-1 text-sm text-[#1A1A1A]">
                <div className="col-span-2 px-2 font-semibold">Category</div>
                <div className="col-span-3 font-semibold">Service</div>
                <div className="col-span-3 font-semibold">Commission</div>
                <div className="col-span-3 font-semibold">Type</div>
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
                    {getCatName(item.categoryId) ?? 'None'}
                  </div>
                  <div className="col-span-3 truncate px-1">
                    {getCatItemName(item.storeServiceCategoryItem) ?? 'None'}
                  </div>
                  <div className="col-span-3 px-2 capitalize">
                    {item.amount ? (
                      <div>
                        {item.amount}
                        <span className="font-medium"> {CURRENCY_PREFIX}</span>
                      </div>
                    ) : (
                      '0'
                    )}
                    {/* {dayjs(item.date).isValid()
                      ? dayjs(item.date).format('DD MMMM YYYY')
                      : '--'} */}
                  </div>
                  <div className="col-span-3 px-3 text-start">
                    {item.amountType}
                  </div>
                  <div className="col-span-1 bg-primary text-center">
                    <ClearOutlinedIcon
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                      fontSize="small"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2">
            <Button
              onClick={handleServices}
              className="w-full"
              component="span"
            >
              <AddIcon sx={{ marginRight: '0.5rem' }} />
              {fields?.length > 0 ? `Add More Services` : `Add Services`}
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

export default EmployeeServiceCreatePopup;
