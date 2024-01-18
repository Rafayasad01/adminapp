import Dialog from '@mui/material/Dialog';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import React from 'react';
import '../../assets/css/PopupStyle.css';
import dayjs from 'dayjs';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  promoList: any;
};

function PromotionListPopup({
  openFormDialog,
  setOpenFormDialog,
  promoList,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const PrintCode = (text: string) => {
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
                    <th>Value</th>
                    <th className="w-1/6">Valid From</th>
                    <th className="w-1/6">Valid Till</th>
                    <th>Amount Type</th>
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
                              {item.discountType === 'Amount'
                                ? `$${Number(item.value).toFixed(0)}`
                                : `${Number(item.value).toFixed(0)}%`}
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
                            <div>{item.discountType}</div>
                          </td>
                          <td>
                            <div>
                              {item.maxRedeem} - {item.redeemCount}
                            </div>
                          </td>
                          <td>
                            <div>{item.maxUserRedeem}</div>
                          </td>
                          <td>
                            <div>
                              <span
                                className={`badge ${
                                  item.isUnlimitedRedeem === false
                                    ? 'badge-primary'
                                    : 'badge-success'
                                }`}
                              >
                                {item.isUnlimitedRedeem === false
                                  ? 'Limited'
                                  : 'Un Limited'}
                              </span>
                            </div>
                          </td>
                          <td>
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
