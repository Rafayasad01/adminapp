/* eslint-disable react/jsx-props-no-spreading */
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import orderService from '../../services/adminapp/adminOrders';
import AlertBox from '../../utils/Alert';
import { APP_USER_STATUS_OFFLINE, ORDER_STATUS } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';

function OrdersAssignPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [alertSeverity, setAlertSeverity] = useState<string>('');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);
  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    function getOrderDetails() {
      if (!orderId) {
        return;
      }
      if (!listingRolePermission(dataRole, 'Order View')) {
        return;
      }
      orderService
        .viewService(orderId)
        .then((item) => {
          setIsLoader(false);
          if (item) {
            setData(item.data.data);
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
    }
    getOrderDetails();
  }, []);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      if (searchTxt === '' || searchTxt === null || searchTxt === undefined) {
        orderService
          .getListAssignService(authState.user.tenant, newPage, rowsPerPage)
          .then((item) => {
            setList(item.data.data.list);
            setTotal(item.data.data.total);
          });
      } else {
        orderService
          .searchAssignService(
            authState.user.tenant,
            search,
            newPage,
            rowsPerPage
          )
          .then((item) => {
            setList(item.data.data.list);
            setTotal(item.data.data.total);
          });
      }
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      orderService
        .getListAssignService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      orderService
        .searchAssignService(
          authState.user.tenant,
          search,
          newPage,
          rowsPerPage
        )
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsLoader(true);
    const newRowPerPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowPerPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      orderService
        .getListAssignService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      orderService
        .searchAssignService(
          authState.user.tenant,
          search,
          newPage,
          rowsPerPage
        )
        .then((item) => {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Order Assign List')) {
      orderService
        .getListAssignService(authState.user.tenant, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
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
    }
  }, [emptyVariable]);

  const newStatus = useMemo(() => {
    if (!data) {
      return '';
    }
    if (data.status === ORDER_STATUS.NEW) {
      return ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP;
    }
    if (data.fulfillmentMethod === 'Self') {
      return ORDER_STATUS.CUSTOMER_PICK_UP;
    }
    return ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY;
  }, [data?.status, data?.fulfillmentMethod]);

  const assignHandler = (userId: string) => {
    if (!data) {
      return;
    }
    if (listingRolePermission(dataRole, 'Order Assign Create')) {
      const payload = {
        app_user: userId,
        app_order: orderId,
        created_by: authState.user.id,
        status: newStatus,
      };
      orderService.createAssignService(payload).then((item: any) => {
        if (item.data.success) {
          navigate(`../detail/${orderId}`);
        } else {
          setAlertMsg('Not Assign');
          setAlertSeverity('error');
          setAlertOpen(true);
        }
      });
    }
  };
  const assignButton = (item: any) => {
    // console.log("ITEMS", item);
    if (item.status === APP_USER_STATUS_OFFLINE) {
      return true;
    }
    return false;
    let isTrue = false;
    if (
      item.isActive === false ||
      item.status === APP_USER_STATUS_OFFLINE ||
      item.appOrderDelivery.status === ORDER_STATUS.CANCELLED
    ) {
      isTrue = true;
    } else if (
      item.appOrderDelivery.status === ORDER_STATUS.NEW ||
      item.appOrderDelivery.status === null
    ) {
      isTrue = false;
    } else if (item.appOrderDelivery.appOrder === orderId) {
      isTrue = true;
    } else {
      isTrue = false;
    }
    return isTrue;
  };

  const assignBtnColor = (item: any) => {
    let colorText = '';
    if (
      item.isActive === false ||
      item.status === APP_USER_STATUS_OFFLINE ||
      item.appOrderDelivery.status === ORDER_STATUS.CANCELLED
    ) {
      colorText = 'btn-gray-fill btn-icon';
    } else if (
      item.appOrderDelivery.status === ORDER_STATUS.NEW ||
      item.appOrderDelivery.status === null
    ) {
      colorText = 'btn-black-fill btn-icon';
    } else if (item.appOrderDelivery.appOrder === orderId) {
      colorText = 'btn-gray-fill btn-icon';
    } else {
      colorText = 'btn-black-fill btn-icon';
    }
    return colorText;
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar isNestedRoute title="Order Assign" />
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Drivers
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleClickSearch(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton aria-label="toggle password visibility">
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Drivers</th>
                  <th>Phone</th>
                  <th>Availability</th>
                  <th>Working Hours</th>
                  <th>License Number</th>
                  <th>Delivery Status</th>
                  <th aria-label="empty table header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
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
                                {item.firstName.charAt(0)}
                                {item.lastName.charAt(0)}
                              </Avatar>
                            )}

                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.firstName} ${item.lastName} `}
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
                        <td>{item.phone}</td>
                        <td>
                          <span
                            className={`badge badge-${
                              item.status === APP_USER_STATUS_OFFLINE
                                ? 'danger'
                                : 'success'
                            } `}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.appDriverWorkingSchedule ? (
                            <span>
                              {dayjs(
                                item.appDriverWorkingSchedule[0].startTime
                              )?.format('HH:mm')}{' '}
                              to{' '}
                              {dayjs(
                                item.appDriverWorkingSchedule[0].endTime
                              )?.format('HH:mm A')}
                            </span>
                          ) : (
                            '--'
                          )}
                        </td>
                        <td>
                          {item.licenseNumber ? item.licenseNumber : '--'}
                        </td>
                        <td>
                          {item.appOrderDelivery.status ? (
                            <span className="badge badge-success">
                              {item.appOrderDelivery.status}
                            </span>
                          ) : (
                            <span className="badge badge-danger">
                              {ORDER_STATUS.NEW}
                            </span>
                          )}
                        </td>
                        {/* <td>{assignButton(item)}</td> */}
                        <td>
                          <Button
                            variant="contained"
                            className={assignBtnColor(item)}
                            disabled={assignButton(item)}
                            onClick={() => assignHandler(item.id)}
                          >
                            Assign
                          </Button>
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
            />
          </div>
        </div>
      </div>
      {alertOpen && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
        />
      )}
    </>
  );
}

export default OrdersAssignPage;
