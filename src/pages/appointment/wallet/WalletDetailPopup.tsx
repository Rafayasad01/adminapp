import Dialog from '@mui/material/Dialog';
import React from 'react';
import '../../../assets/css/PopupStyle.css';

type WalletUpdatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  //   data: any;
};

function WalletDetailPopup({
  openFormDialog,
  setOpenFormDialog,
}: //   data,
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
        <div className="FormHeader">
          <span className="Title">Wallet Transaction Balance</span>
        </div>
      </div>
    </Dialog>
  );
}

export default WalletDetailPopup;
