import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import Service from '../../services/adminapp/adminAppUser';
import CustomText from '../../components/common/CustomText';
import { formatNumberWithCommas } from '../../utils/helper';
import { CURRENCY_PREFIX } from '../../utils/constants';

function DriverDetailPage() {
  const [detail, setDetail] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [to, setTo] = useState<any>();
  const [from, setFrom] = useState<any>();

  const { appUser } = useParams();
  const { control, handleSubmit, getValues } = useForm();
  const id: any = appUser;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    Service.driverWalletDetail(
      detail?.wallets.id,
      newPage,
      rowsPerPage,
      to,
      from
    ).then((item) => {
      setList(item.data.data.totalList);
      setTotal(Number(item.data.data.total));
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    Service.driverWalletDetail(
      detail?.wallets.id,
      newPage,
      newRowperPage,
      to,
      from
    ).then((item) => {
      setList(item.data.data.totalList);
      setTotal(Number(item.data.data.total));
    });
  };

  useEffect(() => {
    const fromDate = dayjs().format('YYYY-MM-DD');
    const lastSixMonth = dayjs().subtract(6, 'month');
    const toDate = dayjs(lastSixMonth).format('YYYY-MM-DD');
    setTo(toDate);
    setFrom(fromDate);
    Service.driverDetail(id, page, rowsPerPage, toDate, fromDate).then(
      (item) => {
        setDetail(item.data.data);
        setList(item.data.data.walletTransactions.totalList);
        setTotal(Number(item.data.data.walletTransactions.total));
      }
    );
    // console.log('totalCredit::::::', totalCredit);
    // console.log('totalDebit::::::', totalDebit);
    setIsLoader(false);

    setNotifyMessage('test');
  }, []);

  const handleDateChange = (date: Dayjs | Date | null | any, field: any) => {
    field.onChange(date);
  };

  const fetchDriversData = () => {
    // const { startDate, endDate } = formData;
    setIsLoader(true);
    const startDate = getValues('startDate');
    const endDate = getValues('endDate');
    const formattedStartDate = startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : '';
    const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : '';
    Service.driverDetail(
      id,
      page,
      rowsPerPage,
      formattedStartDate,
      formattedEndDate
    )
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setDetail(item.data.data);
          setList(item.data.data.walletTransactions.totalList);
          setTotal(Number(item.data.data.walletTransactions.total));
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Driver History" />
      {detail && (
        <div className="container m-auto mt-5">
          <div className="grid grid-cols-12 gap-3">
            {detail?.firstName ? (
              <div className="col-span-4 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
                <div className="flex w-full items-center">
                  {detail.avatar ? (
                    <img
                      src={detail.avatar}
                      alt=""
                      className="mr-4 w-[100px] rounded-full"
                    />
                  ) : (
                    <Avatar
                      className="avatar flex flex-row items-center"
                      sx={{
                        bgcolor: '#1D1D1D',
                        width: 100,
                        height: 100,
                        textTransform: 'uppercase',
                        fontSize: '25px',
                        marginRight: '10px',
                      }}
                    >
                      {detail.firstName?.charAt(0)}
                      {detail.lastName?.charAt(0)}
                    </Avatar>
                  )}
                  <div className="flex flex-col justify-start justify-items-center">
                    <span className="font-open-sans text-xl font-semibold text-secondary">
                      {`${detail.firstName} ${detail.lastName}`}
                    </span>
                    <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                      {detail.phone}
                    </span>
                    <span
                      className={`mt-2 flex items-center justify-center text-xs font-light ${
                        detail.isActive
                          ? 'badge badge-success'
                          : 'badge badge-danger'
                      }`}
                    >
                      {detail.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <Divider className="mt-4" />
                <div className="flex w-full flex-col">
                  <div className="flex w-full items-center justify-between">
                    {detail?.wallets && (
                      <div className="flex w-full flex-col">
                        <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                          Balance
                        </span>
                        <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                          {formatNumberWithCommas(
                            Math.floor(detail.wallets.balance)
                          )}{' '}
                          {CURRENCY_PREFIX}
                        </span>
                      </div>
                    )}
                    {detail?.walletTransactions && (
                      <div className="flex w-full flex-col">
                        <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                          Credit
                        </span>
                        <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                          {formatNumberWithCommas(
                            Math.floor(detail.walletTransactions.totalCredit)
                          )}{' '}
                          {CURRENCY_PREFIX}
                        </span>
                      </div>
                    )}
                    {detail?.walletTransactions && (
                      <div className="flex w-full flex-col">
                        <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                          Debit
                        </span>
                        <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                          {formatNumberWithCommas(
                            Math.floor(detail.walletTransactions.totalDebit)
                          )}{' '}
                          {CURRENCY_PREFIX}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                      Email
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.email}
                    </span>
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                      Availibility
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.status}
                    </span>
                  </div>
                  {detail?.userType === 'Driver' && (
                    <div className="flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        License Number
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail.appUserDriverExt.licenseNumber}
                      </span>
                    </div>
                  )}
                  {detail?.appUserAddress && (
                    <div className="flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Address
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail?.appUserAddress.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="col-span-4 flex items-center justify-center rounded-lg bg-[#fff] font-semibold shadow-lg">
                No Records Found
              </div>
            )}
            <div className="col-span-8 min-h-[375px] rounded-lg bg-[#fff] shadow-lg">
              <div className="col-span-12 m-3 flex justify-end gap-3 pt-4 md:col-span-12 md:mt-1 lg:col-span-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <form
                    onSubmit={handleSubmit(fetchDriversData)}
                    className="grid grid-cols-12 items-center gap-3"
                  >
                    <Controller
                      name="startDate"
                      control={control}
                      defaultValue={dayjs().subtract(6, 'month').toDate()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          label="Start Date"
                          className="col-span-6 md:col-span-4"
                          format="YYYY-MM-DD"
                          value={dayjs(field.value)}
                          defaultValue={dayjs().subtract(6, 'month')}
                          onChange={(date) => handleDateChange(date, field)}
                          // renderInput={(params: any) => <TextField {...params} />}
                        />
                      )}
                    />
                    <Controller
                      name="endDate"
                      control={control}
                      defaultValue={dayjs().add(6, 'month').toDate()}
                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          label="End Date"
                          format="YYYY-MM-DD"
                          className="col-span-6 md:col-span-4"
                          value={dayjs(field.value)}
                          defaultValue={dayjs().add(6, 'month')}
                          onChange={(date) => handleDateChange(date, field)}
                          // renderInput={(params: any) => <TextField {...params} />}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      variant="outlined"
                      className="btn-icon col-span-12 md:col-span-4"
                    >
                      <SearchIcon />
                      Search
                    </Button>
                  </form>
                </LocalizationProvider>
              </div>
              <div className="mt-3 grid grid-cols-none">
                <table className="table-border table-auto">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Dated</th>
                      <th aria-label="empty tale header">&nbsp;</th>
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
                                    {`${item.appOrder.orderNumber}`}
                                  </span>
                                  <span className="text-xs font-normal text-[#6A6A6A]">
                                    {dayjs(item.appOrder.createdDate).isValid()
                                      ? dayjs(
                                          item.appOrder.createdDate
                                        )?.format('MMMM DD, YYYY')
                                      : '--'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              {item.type === 'Credit' ? item.amount : '--'}
                            </td>
                            <td>
                              {item.type === 'Debit' ? item.amount : '--'}
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
              <div className="mt-3 flex w-[100%] justify-center py-3">
                <TablePagination
                  component="div"
                  count={total}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[30, 50, 100]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DriverDetailPage;
