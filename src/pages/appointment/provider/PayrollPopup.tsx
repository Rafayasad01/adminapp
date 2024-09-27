import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import '../../../assets/css/PopupStyle.css';
// import TablePagination from '@mui/material/TablePagination';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import Button from '@mui/material/Button/Button';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader2';
import Notify from '../../../components/common/Notify';
import { CURRENCY_PREFIX } from '../../../utils/constants';
// import storeEmployee from '../../../services/adminapp/adminStoreEmployee';
import storeEmpPayroll from '../../../services/adminapp/adminPayroll';
// import walletService from '../../../services/adminapp/adminWallet';

type WalletUpdatePopupProps = {
  payrollDialog: boolean;
  setPayrollDialog: React.Dispatch<React.SetStateAction<boolean>>;
  empData: any;
};

type QueryParams = {
  //   tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};

function PayrollPopup({
  payrollDialog,
  setPayrollDialog,
  empData,
}: WalletUpdatePopupProps) {
  const handleFormClose = () => {
    setPayrollDialog(false);
  };

  const { control, watch } = useForm();

  const [isLoader, setIsLoader] = React.useState(true);
  const [payrollData, setPayrollData] = useState<any>(null);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const getPayrollList = (
    queryParams: QueryParams | any,
    id: string | undefined
  ) => {
    storeEmpPayroll
      .storeEmployeePayrollList(queryParams, id)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setPayrollData(item.data.data);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    // fetchEmpLov();
    const startDate = dayjs(watch('startDate')).format('YYYY-MM-DD');
    const queryParams: QueryParams | any = {
      startDate: dayjs(startDate).startOf('month').format('YYYY-MM-DD'),
      endDate: dayjs(startDate).endOf('month').format('YYYY-MM-DD'),
    };
    console.log('empData', empData);

    if (empData) {
      getPayrollList(queryParams, empData?.id);
    }
  }, [watch('startDate')]);

  const handleAmountFormat = (amount: number | any) => {
    return `${amount
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${CURRENCY_PREFIX}`;
  };

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
        <p className="Title pb-10 capitalize">{empData?.name} Payroll</p>
        {isLoader ? (
          <Loader />
        ) : (
          <>
            <div className="">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex w-full items-start justify-start py-1">
                  <span className="font-semibold">
                    Payroll | {dayjs(watch('startDate')).format('MMMM YYYY')}
                  </span>
                </div>
                <div className="flex w-full items-end justify-end">
                  <div className="mx-2">
                    <p className="m-0 py-1 text-xs">Select Month</p>
                    <Controller
                      name="startDate"
                      control={control}
                      defaultValue={dayjs().startOf('month').toDate()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          // label="Start Date"
                          views={['year', 'month']}
                          className="custom-border col-span-6 md:col-span-4"
                          format="YYYY-MM"
                          value={dayjs(field.value)}
                          // onChange={(date) => handleDateChange(date, field)}
                          onChange={(date) => {
                            const firstDayOfMonth = dayjs(date)
                              .startOf('month')
                              .toDate();
                            field.onChange(firstDayOfMonth); // Set to first day of the selected month
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </div>
            {payrollData && (
              <div className="mt-3 grid grid-cols-none overflow-auto">
                <table className="table-border table-auto">
                  <thead>
                    <tr>
                      <th>Payroll Type</th>
                      <th>Amount</th>
                      {/* <th>Reason</th>
                    <th>Date</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold">Salary</td>
                      <td className="font-medium">
                        {handleAmountFormat(Number(payrollData?.salary))}
                      </td>
                    </tr>{' '}
                    <tr>
                      <td className="font-semibold">Deductions</td>
                      <td className="font-medium">
                        {handleAmountFormat(
                          payrollData?.payRoll?.deductionAmount
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Bonus</td>
                      <td className="font-medium">
                        {handleAmountFormat(payrollData?.payRoll?.bonusAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Commissions</td>
                      <td className="font-medium">
                        {handleAmountFormat(
                          payrollData?.payRoll?.commissionAmount
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Overtime</td>
                      <td className="font-medium">
                        {handleAmountFormat(
                          payrollData?.payRoll?.overtimeAmount
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={1}>
                        <div className="custom-tbody-txt font-semibold">
                          Payroll Amount
                        </div>
                      </td>
                      <td>
                        <div className="custom-tbody-txt text-sm font-semibold">
                          {handleAmountFormat(
                            payrollData?.payRoll?.totalAmount
                          )}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
            {payrollData === null ? (
              <CustomText noRoundedBorders text="No Records Found" />
            ) : null}
          </>
        )}
      </div>
    </Dialog>
  );
}

export default PayrollPopup;
