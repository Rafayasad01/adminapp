import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';

function DriverDetailPage() {
  // const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  // const [filteredWeekDays, setFilteredWeekDays] = useState<any>(null);
  // const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);

  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const { appuserId } = useParams();

  useEffect(() => {
    setIsLoader(false);
    console.log('appuserId::::::', appuserId);
    setDetail(null);
    setNotifyMessage('test');
    setList([]);
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
                    User Type
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.userType}
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
                {detail?.postalCode && (
                  <div className="flex w-full flex-col">
                    <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                      Postal Code
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.postalCode}
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
                      <th>Driver</th>
                      <th>Email</th>
                      <th>Balance</th>
                      <th>Status</th>
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
                                {item.avatar ? (
                                  <img src={item.avatar} alt="" />
                                ) : (
                                  <Avatar
                                    className="avatar flex flex-row items-center"
                                    sx={{
                                      bgcolor: '#1D1D1D',
                                      width: 35,
                                      height: 35,
                                      textTransform: 'uppercase',
                                      fontSize: '14px',
                                      marginRight: '10px',
                                    }}
                                  >
                                    {item.firstName?.charAt(0)}
                                    {item.lastName?.charAt(0)}
                                  </Avatar>
                                )}

                                <div className="flex flex-col items-start justify-start">
                                  <span className="text-sm font-semibold">
                                    {`${item.firstName} ${item.lastName}`}
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
                            <td>{item.email}</td>
                            <td>
                              {item.wallets
                                ? `PKR ${item.wallets.balance}`
                                : 'N/A'}
                            </td>
                            <td>
                              {item.isActive ? (
                                <span className="badge badge-success">
                                  ACTIVE
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  INACTIVE
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="flex flex-row-reverse">test</div>
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
      )}
    </>
  );
}

export default DriverDetailPage;
