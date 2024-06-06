import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import Service from '../../services/adminapp/adminAppUser';

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
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  const { appUser } = useParams();

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
      setTotalCredit(Number(item.data.data.totalCredit));
      setTotalDebit(Number(item.data.data.totalDebit));
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
      setTotalCredit(Number(item.data.data.totalCredit));
      setTotalDebit(Number(item.data.data.totalDebit));
    });
  };

  useEffect(() => {
    const id: any = appUser;
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
        setTotalCredit(Number(item.data.data.walletTransactions.totalCredit));
        setTotalDebit(Number(item.data.data.walletTransactions.totalDebit));
      }
    );
    console.log('totalCredit::::::', totalCredit);
    console.log('totalDebit::::::', totalDebit);
    setIsLoader(false);

    setNotifyMessage('test');
  }, [null]);

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
                    {detail.firstName.charAt(0)}
                    {detail.lastName.charAt(0)}
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
                    className={`font-sm mt-2 font-open-sans text-sm ${
                      detail.isActive ? 'text-[#29CC97]' : 'text-[#f50057]'
                    }`}
                  >
                    {detail.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Divider className="mt-4" />
              <div className="flex w-full flex-col">
                {detail?.wallets && (
                  <div className="flex w-full flex-col">
                    <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                      Balance
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.wallets.balance}
                    </span>
                  </div>
                )}
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
            <div className="col-span-8 min-h-[375px] rounded-lg bg-[#fff] shadow-lg">
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
                            <td>{item.type === 'Credit' ? item.amount : ''}</td>
                            <td>{item.type === 'Debit' ? item.amount : ''}</td>
                            <td>
                              {dayjs(item.createdDate)?.format('MMMM DD, YYYY')}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
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
