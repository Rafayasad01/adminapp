import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import StoreLovService from '../../../services/adminapp/adminStoreService';
import '../../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { BarberItemServices } from '../../../interfaces/services.interface';
import {
  BARBER_SERVICES_AMOUNT,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  imageAllowedTypes,
} from '../../../utils/constants';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  catlov?: any;
  formData?: any;
};

function EmployeeServiceEditPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  catlov,
  formData,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<BarberItemServices>();

  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);

  const getCatItems = async (id: any) => {
    await StoreLovService.StoreCatItemsLov(id).then((res) => {
      setCatItemsLovList(res.data.data);
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

  const onSubmit = (data: BarberItemServices) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    delete data?.categoryId;
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
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
            <span className="Title">Edit Staff Service</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="categoryId"
                  control={control}
                  error={errors}
                  register={register}
                  setValue={setValue}
                  options={{
                    roles: catlov,
                    role: formData?.storeServiceCategoryItem
                      ?.storeServiceCategory,
                  }}
                  defaultValue="Select Category"
                  customClassInputTitle="font-bold"
                  inputTitle="Select Category"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="storeServiceCategoryItem"
                  control={control}
                  error={errors}
                  register={register}
                  setValue={setValue}
                  options={{
                    roles: catItemsLovlist,
                    role: formData?.storeServiceCategoryItem?.id,
                  }}
                  defaultValue="Select Services"
                  customClassInputTitle="font-bold"
                  inputTitle="Select Services"
                />
              </FormControl>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-4">
              <div className="col-span-4">
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
                    options={{
                      roles: BARBER_SERVICES_AMOUNT,
                      role: formData?.amountType,
                    }}
                    defaultValue="Select Type"
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomInputBox
                    value={formData?.amount}
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={15}
                    inputTitle="Price"
                    placeholder="Enter Service Amount"
                    id="amount"
                    register={register}
                    error={errors.amount}
                    inputType="text"
                  />
                </FormControl>
              </div>
              <div className="col-span-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomInputBox
                    value={formData?.serviceTime}
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={4}
                    inputTitle="Service Time (Minutes)"
                    placeholder="Enter time (Minutes)"
                    id="minutes"
                    register={register}
                    error={errors.minutes}
                    inputType="text"
                  />
                </FormControl>
              </div>
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
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default EmployeeServiceEditPopup;
