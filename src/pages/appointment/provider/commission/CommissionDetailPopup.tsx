import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import '../../../../assets/css/PopupStyle.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// import { Controller, useForm } from 'react-hook-form';
// import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import Button from '@mui/material/Button/Button';
import Avatar from '@mui/material/Avatar';
import storeOrder from '../../../../services/adminapp/adminOrders';
import CustomText from '../../../../components/common/CustomText';
import Loader from '../../../../components/common/Loader2';
import { CURRENCY_PREFIX } from '../../../../utils/constants';

type WalletUpdatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNotify: any;
  setNotifyMessage: any;
  orderId: string;
};

function CommissionDetailPopup({
  openFormDialog,
  setOpenFormDialog,
  setIsNotify,
  setNotifyMessage,
  orderId,
}: WalletUpdatePopupProps) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  useEffect(() => {
    setIsLoader(true);
    storeOrder
      .GetOrderCommissionItems(orderId)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data);
        } else {
          setIsLoader(false);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  }, []);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '845px', width: '850px' },
      }}
    >
      <div className="Content">
        <p className="Title pb-10">Commission Details</p>
        {isLoader ? (
          <Loader />
        ) : (
          <>
            <div className="mt-3 grid grid-cols-none">
              <table className="table-border table-auto">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((item: any) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="avatar flex flex-row items-center">
                              {item.homeCatItem.icon ? (
                                <img src={item.homeCatItem.icon} alt="" />
                              ) : (
                                <Avatar
                                  className="avatar flex flex-row items-center"
                                  sx={{
                                    width: 35,
                                    height: 35,
                                    fontSize: '14px',
                                    marginRight: '10px',
                                  }}
                                >
                                  {item.homeCatItem.name?.charAt(0)}
                                  {item.homeCatItem.name?.charAt(1)}
                                </Avatar>
                              )}
                              <div className="flex flex-col items-start justify-start">
                                <span className="text-sm font-semibold">
                                  {item.homeCatItem.name}
                                </span>
                                <span className="text-xs font-normal text-[#6A6A6A]">
                                  {dayjs(item.createdDate).isValid()
                                    ? dayjs(item.createdDate)?.format(
                                        'MMMM DD, YYYY'
                                      )
                                    : '--'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {item.homeCatItem.desc
                              ? item.homeCatItem.desc
                              : '--'}
                          </td>
                          <td>
                            {item.unitPrice ? item.unitPrice : '--'}{' '}
                            {CURRENCY_PREFIX}
                          </td>
                          <td>{item.quantity ? item.quantity : '--'}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {list?.length < 1 ? (
              <CustomText noRoundedBorders text="No Records Found" />
            ) : null}
            {/* <div className="mt-3 flex w-[100%] justify-center py-3">
              <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[30, 50, 100]}
              />
            </div> */}
          </>
        )}
      </div>
    </Dialog>
  );
}

export default CommissionDetailPopup;
