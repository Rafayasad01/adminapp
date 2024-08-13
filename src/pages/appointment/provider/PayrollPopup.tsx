import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import '../../../assets/css/PopupStyle.css';
// import TablePagination from '@mui/material/TablePagination';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Button from '@mui/material/Button/Button';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader2';
import Notify from '../../../components/common/Notify';
import { CURRENCY_PREFIX } from '../../../utils/constants';
// import walletService from '../../../services/adminapp/adminWallet';

type WalletUpdatePopupProps = {
  payrollDialog: boolean;
  setPayrollDialog: React.Dispatch<React.SetStateAction<boolean>>;
  empId: string;
};

function PayrollPopup({
  payrollDialog,
  setPayrollDialog,
}: //   empId,
WalletUpdatePopupProps) {
  const handleFormClose = () => {
    setPayrollDialog(false);
  };

  const { control, handleSubmit } = useForm();

  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   const [total, setTotal] = useState(0);
  const [
    list,
    // setList
  ] = useState<any>([]);
  const [
    ,
    // to
    setTo,
  ] = useState<any>();
  const [
    ,
    // from
    setFrom,
  ] = useState<any>();
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [
    notifyMessage,
    // setNotifyMessage
  ] = React.useState({});

  useEffect(() => {
    const fromDate = dayjs().format('YYYY-MM-DD');
    const lastSixMonth = dayjs().subtract(6, 'month');
    const toDate = dayjs(lastSixMonth).format('YYYY-MM-DD');
    setTo(toDate);
    setFrom(fromDate);
    // setIsLoader(true);
    // walletService
    //   .WalletTransactionList(empId, toDate, fromDate)
    //   .then((item: any) => {
    //     if (item.data.success) {
    //       setIsLoader(false);
    //     //   setTotal(item.data.data.total);
    //       setList(item.data.data.totalList);
    //     } else {
    //       setIsLoader(false);
    //       setNotifyMessage({
    //         text: item.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: error.message,
    //       type: 'error',
    //     });
    //   });
  }, []);

  const handleDateChange = (date: Dayjs | Date | null | any, field: any) => {
    field.onChange(date);
  };

  const fetchDriversData = () => {
    // const { startDate, endDate } = formData;
    setIsLoader(true);
    // const startDate = getValues('startDate');
    // const endDate = getValues('endDate');
    // // const formattedStartDate = startDate
    // //   ? dayjs(startDate).format('YYYY-MM-DD')
    // //   : '';
    // // const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : '';
    // walletService
    //   .WalletTransactionList(
    //     empId,
    //     page,
    //     rowsPerPage,
    //     formattedStartDate,
    //     formattedEndDate
    //   )
    //   .then((item) => {
    //     if (item.data.success) {
    //       setIsLoader(false);
    //       setList(item.data.data.totalList);
    //       setTotal(item.data.data.total);
    //     } else {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: item.data.message,
    //         type: 'success',
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: err.message,
    //       type: 'error',
    //     });
    //   });
  };

  //   const handleChangePage = (
  //     event: React.MouseEvent<HTMLButtonElement> | null,
  //     newPage: number
  //   ) => {
  //     setPage(newPage);
  //     walletService
  //       .WalletTransactionList(empId, newPage, rowsPerPage, to, from)
  //       .then((item) => {
  //         if (item.data.success) {
  //           setTotal(item.data.data.total);
  //           setList(item.data.data.list);
  //         } else {
  //           setIsNotify(true);
  //           setNotifyMessage({
  //             text: item.data.message,
  //             type: 'error',
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: error.message,
  //           type: 'error',
  //         });
  //       });
  //   };

  //   const handleChangeRowsPerPage = (
  //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     const newRowperPage = parseInt(event.target.value, 10);
  //     const newPage = 0;
  //     setRowsPerPage(newRowperPage);
  //     setPage(newPage);
  //     walletService
  //       .WalletTransactionList(empId, newPage, newRowperPage, to, from)
  //       .then((item) => {
  //         if (item.data.success) {
  //           setTotal(item.data.data.total);
  //           setList(item.data.data.list);
  //         } else {
  //           setIsNotify(true);
  //           setNotifyMessage({
  //             text: item.data.message,
  //             type: 'error',
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: error.message,
  //           type: 'error',
  //         });
  //       });
  //   };

  return (
    <Dialog
      open={payrollDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '845px', width: '850px' },
      }}
    >
      <div className="Content">
        <Notify
          isOpen={isNotify}
          setIsOpen={setIsNotify}
          displayMessage={notifyMessage}
        />
        <p className="Title pb-10">Ahmed Payroll</p>
        {isLoader ? (
          <Loader />
        ) : (
          <>
            <div className="">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form
                  onSubmit={handleSubmit(fetchDriversData)}
                  className="mx-2 flex w-full items-end justify-between"
                >
                  <div className="flex w-full items-start justify-start py-1">
                    <span className="font-semibold">
                      Payroll - {dayjs().format('MMMM YYYY')}
                    </span>
                  </div>
                  <div className="flex w-full items-end justify-end">
                    <div className="mx-2">
                      <p className="m-0 py-1 text-xs">Start Date</p>
                      <Controller
                        name="startDate"
                        control={control}
                        defaultValue={dayjs().subtract(6, 'month').toDate()}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            // label="Start Date"
                            className="custom-border col-span-6 md:col-span-4"
                            format="YYYY-MM-DD"
                            value={dayjs(field.value)}
                            defaultValue={dayjs().subtract(6, 'month')}
                            onChange={(date) => handleDateChange(date, field)}
                            // renderInput={(params: any) => <TextField {...params} />}
                          />
                        )}
                      />
                    </div>
                    <div className="">
                      <p className="m-0 py-1 text-xs">End Date</p>
                      <Controller
                        name="endDate"
                        control={control}
                        defaultValue={dayjs().add(6, 'month').toDate()}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            //   label="End Date"
                            format="YYYY-MM-DD"
                            className="custom-border col-span-6 md:col-span-4"
                            value={dayjs(field.value)}
                            defaultValue={dayjs().add(6, 'month')}
                            onChange={(date) => handleDateChange(date, field)}
                            // renderInput={(params: any) => <TextField {...params} />}
                          />
                        )}
                      />
                    </div>
                    <div className="mx-2">
                      <Button
                        type="submit"
                        variant="outlined"
                        className="btn-icon col-span-12 items-end  border-primary text-primary md:col-span-3"
                      >
                        Find
                      </Button>
                    </div>
                  </div>
                </form>
              </LocalizationProvider>
            </div>
            <div className="mt-3 grid grid-cols-none">
              <table className="table-border table-auto">
                <thead>
                  <tr>
                    <th>Payroll Type</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((item: any) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="avatar flex flex-row items-center">
                              <div className="flex flex-col items-start justify-start">
                                <span className="text-sm font-semibold">
                                  {`${item.referenceId}`}
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
                            {item.type === 'Credit'
                              ? `${item.amount} ${CURRENCY_PREFIX}`
                              : '--'}
                          </td>
                          <td>
                            {item.type === 'Debit'
                              ? `${item.amount} ${CURRENCY_PREFIX}`
                              : '--'}
                          </td>
                          <td>
                            {dayjs(item.createdDate)?.format('MMMM DD, YYYY')}
                          </td>
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

export default PayrollPopup;
