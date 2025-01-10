import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import React from 'react';
import '../../assets/css/PopupStyle.css';
import { CURRENCY_PREFIX } from '../../utils/constants';

type PromotionListPopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  promoList: any;
  showNotification?: any;
};

function PromotionListPopup({
  openFormDialog,
  setOpenFormDialog,
  promoList,
  showNotification,
}: PromotionListPopupProps) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const PrintCode = (text: string) => {
    showNotification({
      text: 'Copied',
      type: 'success',
    });
    return navigator.clipboard.writeText(text);
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      scroll="paper"
      disableScrollLock
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '1000px', maxHeight: '500px' },
      }}
    >
      <div className="overflow-auto">
        <div className="Content">
          <div className="">
            <div className="FormHeader">
              <span className="Title">Promotion List</span>
            </div>
            <div className="grid grid-cols-none">
              <table className="table-border table-auto">
                <thead>
                  <tr>
                    <th className="w-32">Voucher Code</th>
                    <th>Discount</th>
                    <th className="w-1/6">Valid From</th>
                    <th className="w-1/6">Valid Till</th>
                    <th>Min Withdrawl</th>
                    <th>Redeem Count</th>
                    <th>Max User Redeem</th>
                    <th>Redeem Limitation</th>
                    <th className="w-2">Copy Code</th>
                  </tr>
                </thead>
                <tbody>
                  {promoList &&
                    promoList?.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div>{item.voucherCode}</div>
                          </td>
                          <td>
                            <div>
                              {CURRENCY_PREFIX} {Number(item.value).toFixed(0)}
                            </div>
                          </td>
                          <td>
                            <div>
                              {dayjs(item.validFrom).format('MMMM DD, YYYY')}
                            </div>
                          </td>
                          <td>
                            <div>
                              {dayjs(item.validTill).format('MMMM DD, YYYY')}
                            </div>
                          </td>
                          <td>
                            <div>{Number(item.minAmount).toFixed(0)}</div>
                          </td>
                          <td>
                            <div>
                              {item.isUnlimitedRedeem
                                ? '--'
                                : `${item.maxRedeem} - ${item.redeemCount}`}
                            </div>
                          </td>
                          <td>
                            {!item.isUnlimitedRedeem
                              ? '--'
                              : `${item.maxUserRedeem} - ${item.userCount}`}
                          </td>
                          <td>
                            <div>
                              <span
                                className={`badge ${
                                  item.isUnlimitedRedeem
                                    ? 'badge-primary'
                                    : 'badge-success'
                                }`}
                              >
                                {item.isUnlimitedRedeem
                                  ? 'Limited'
                                  : 'Un Limited'}
                              </span>
                            </div>
                          </td>
                          <td aria-label="print code button">
                            <div onClick={() => PrintCode(item.voucherCode)}>
                              <ContentCopyOutlinedIcon className="cursor-pointer" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default PromotionListPopup;
