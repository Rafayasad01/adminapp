import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AppointmentWalletPaymentUpdate } from '../../../interfaces/app.appointment';
import { PATTERN } from '../../../utils/constants';
import CustomInputBox from '../../../components/common/CustomInputBox';
import '../../../assets/css/PopupStyle.css';

type WalletUpdatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: (...args: any[]) => any;
  //   setIsNotify: any;
  //   setNotifyMessage: any;
};

function WalletUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
}: //   setIsNotify,
//   setNotifyMessage,
WalletUpdatePopupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentWalletPaymentUpdate>();

  const onSubmit = (data: AppointmentWalletPaymentUpdate) => {
    console.log('DATE', data);
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
            <span className="Title">Update Wallet Balance</span>
          </div>
          {formData && (
            <>
              <div className="FormBody mt-2">
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <CustomInputBox
                      pattern={PATTERN.ONLY_NUM}
                      maxLetterLimit={15}
                      inputTitle="Amount"
                      placeholder="2500 (PKR)"
                      id="balance"
                      register={register}
                      error={errors.balance}
                      inputType="text"
                      value={Math.floor(formData?.balance)}
                    />
                  </FormControl>
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
                  value="Update"
                  className="btn-black-fill cursor-pointer"
                  disableUnderline
                  sx={{
                    padding: '0.375rem 2rem !important',
                    height: '35px',
                  }}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </Dialog>
  );
}

export default WalletUpdatePopup;
