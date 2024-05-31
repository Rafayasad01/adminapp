import Dialog from '@mui/material/Dialog';
import React from 'react';
// import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
// import { AppointmentWalletPaymentUpdate } from '../../../interfaces/app.appointment';

type WalletUpdatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
};

function WalletDetailPopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
}: //   setIsNotify,
//   setNotifyMessage,
WalletUpdatePopupProps) {
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
        <form>
          <div className="FormHeader">
            <span className="Title">Wallet Details</span>
          </div>
          {formData && (
            <>
              <div className="FormBody mt-2">
                <p>detail page</p>
              </div>
              {/* <div className="FormFooter">
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
              </div> */}
            </>
          )}
        </form>
      </div>
    </Dialog>
  );
}

export default WalletDetailPopup;
