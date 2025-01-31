import React from 'react';
import Popover from '@mui/material/Popover';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../../components/common/CustomButton';
import CustomInputBox from '../../components/common/CustomInputBox';
import { AppointmentDiscountPayment } from '../../interfaces/app.appointment';
import '../../assets/css/PopupStyle.css';
import CustomDropDown from '../../components/common/CustomDropDown';
import { PATTERN } from '../../utils/constants';

type Props = {
  id?: any;
  open?: any;
  anchorEl?: any;
  onclose?: any;
  callback?: any;
  isWalletLoader?: any;
  grandTotalAmount: any;
};

const ViewDiscountPopupCard = ({
  id,
  open,
  anchorEl,
  onclose,
  callback,
  isWalletLoader,
  grandTotalAmount,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AppointmentDiscountPayment>();

  const onSubmit = (data: AppointmentDiscountPayment) => {
    data.isManuel = true;
    callback(data);
  };
  console.log('🚀 ~ onSubmit ~ datasssssss:', grandTotalAmount);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onclose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div className="w-full">
        <form
          className="w-full overflow-auto p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="FormBody">
            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <FormControl
                  className="FormControl w-full py-1"
                  variant="standard"
                >
                  <CustomInputBox
                    customFontClass="text-sm"
                    sx={{
                      border: '1px solid',
                      padding: '5px',
                      borderRadius: '3px',
                      marginTop: '3px',
                      fontSize: '12px',
                    }}
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={15}
                    min={1}
                    max={grandTotalAmount}
                    inputTitle="Discount"
                    placeholder="2000"
                    id="appointmentDiscount"
                    register={register}
                    error={errors.appointmentDiscount}
                    inputType="text"
                  />
                </FormControl>
                <FormControl className="FormControl w-full" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="appointmentDiscountAmountType"
                    control={control}
                    error={errors}
                    setValue={setValue}
                    register={register}
                    options={{
                      roles: [
                        { id: 'Amount', name: 'Amount' },
                        { id: 'Percentage', name: 'Percentage' },
                      ],
                    }}
                    customHeight="h-[40px]"
                    customClassInputTitle="mb-[px] text-[14px]"
                    defaultValue="Select Type"
                    inputTitle="Amount Type"
                  />
                </FormControl>
              </div>
            </div>
            <div className="mt-1 w-full">
              <CustomButton
                disabled={isWalletLoader}
                buttonType="button"
                title={isWalletLoader ? <CircularProgress size={14} /> : 'Done'}
                className="btn-black-outline"
                type="submit"
                sx={{
                  width: '100%',
                  height: '35px',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </Popover>
  );
};

export default ViewDiscountPopupCard;
