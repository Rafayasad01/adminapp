import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomInputBox from '../../../components/common/CustomInputBox';
import { BarberItemServices } from '../../../interfaces/services.interface';
import storeLovService from '../../../services/adminapp/adminStoreService';
import {
  BARBER_SERVICES_AMOUNT,
  // GENDER,
  PATTERN,
} from '../../../utils/constants';

type EmployeeServiceCreatePopupProps = {
  callback: (...args: any[]) => any;
  catlov?: any;
  openFormDialog: boolean;
  setIsNotify: any;
  setNotifyMessage: any;
  empDetail: any;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function EmployeeServiceCreatePopup({
  callback,
  catlov,
  openFormDialog,
  setIsNotify: _setIsNotify,
  setNotifyMessage: _setNotifyMessage,
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

  const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);

  const getCatItems = async (id: any) => {
    await storeLovService.StoreCatItemsLov(id).then((res) => {
      setCatItemsLovList(res.data.data);
    });
  };

  useEffect(() => {
    if (
      getValues('categoryId') !== undefined &&
      getValues('categoryId') !== 'none'
    ) {
      getCatItems(watch('categoryId'));
    }
  }, [watch('categoryId')]);

  const onSubmit = (data: BarberItemServices) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    if (empDetail.payrollType === 'Salary') {
      data.amount = 0;
      data.amountType = 'None';
    }
    delete data?.categoryId;
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  console.log('empDetail', empDetail);

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
            {empDetail && empDetail.payrollType !== 'Salary' && (
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
                      maxLetterLimit={15}
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

export default EmployeeServiceCreatePopup;
