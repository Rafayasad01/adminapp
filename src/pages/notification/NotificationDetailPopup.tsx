import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../assets/css/PopupStyle.css';

type Props = {
  openDetailDialog: boolean;
  setOpenDetailDialog: React.Dispatch<React.SetStateAction<boolean>>;
  detail: any;
};

function NotificationDetailPopup({
  openDetailDialog,
  setOpenDetailDialog,
  detail,
}: Props) {
  const handleFormClose = () => {
    setOpenDetailDialog(false);
  };

  return (
    <Dialog
      open={openDetailDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-20',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      {detail && (
        <div className="Content">
          <div className="FormBody">
            <div className="NotificationBatchBox">
              <div className="Top">
                <span className="Title">Notification Batch Detail</span>
              </div>
              <div className="Mid">
                <div className="BatchBox">
                  <span className="BatchValue">{detail.success}</span>
                  <span className="BatchHeading">Success</span>
                </div>
                <div className="Separator" />
                <div className="BatchBox">
                  <span className="BatchValue">{detail.failure}</span>
                  <span className="BatchHeading">Failed</span>
                </div>
              </div>
              <div className="Bottom">
                <span className="Title">Message Title</span>
                <span className="Detail">{detail.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default NotificationDetailPopup;
