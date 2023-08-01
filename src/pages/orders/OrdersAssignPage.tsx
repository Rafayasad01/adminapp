/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TopBar from '../../components/common/TopBar';
import driver from '../../services/adminapp/adminDriver';
import { useAppSelector } from '../../redux/redux-hooks';
import dayjs from 'dayjs';

import Avatar from '@mui/material/Avatar';
import TablePagination from '@mui/material/TablePagination';
import { APP_USER_STATUS_OFFLINE, ORDER_DELIVERY_STATUS_NEW, ORDER_DELIVERY_STATUS_NOT_ASSIGN } from '../../utils/constants';
import order from '../../services/adminapp/adminOrders';
import { useAppDispatch } from '../../redux/redux-hooks';
import { addDriver } from '../../redux/features/driverStateSlice';



function OrdersAssignPage() {
  const dispatch = useAppDispatch();
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const params = useParams();
  const orderId: any = params.orderId;

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      driver.searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      })
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === "" || search === null || search === undefined) {
      driver.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      driver.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    if (search === "" || search === null || search === undefined) {
      driver.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      driver.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {

    driver.getListService(authState.user.tenant, page, rowsPerPage).then((item: any) => {
      if (item.data.success) {
        console.log('item.data.data', item.data.data)
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      }
    });
  }, []);

  const assignHandler = (userId: string) => {
    const data = {
      app_user: userId,
      app_order: orderId,
      created_by: authState.user.id,
      status: ORDER_DELIVERY_STATUS_NEW
    }
    order.createAppOrderDelivery(data).then((item: any) => {
      if (item.data.success) {
        let driverData: any = null;
        setList((newArr: any) => {
          return newArr.map((newItem: any) => {
            if (newItem.id === userId) {
              newItem.appOrderDeliveryStatus = item.data.data.status
              driverData = newItem;
            }
            return { ...newItem };
          });
        });
        driverData.app_order = orderId;
        dispatch(addDriver(driverData));
        navigate(`../view/${orderId}`);
      }
    })
  }
  return (
    <>
      <TopBar isNestedRoute={true} title="Order Assign" />
      <div className="container mt-5">
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
                    className="input-with-icon after:border-b-neutral-900"
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
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map((item: any, index: number) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="avatar flex flex-row items-center">
                          {item.avatar ? (
                            <img src={item.avatar} alt="" />
                          ) : (
                            <Avatar className="avatar flex flex-row items-center" sx={{ bgcolor: '#1D1D1D', width: 35, height: 35, textTransform: 'uppercase', fontSize: '14px', marginRight: '10px' }}>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</Avatar>
                          )}

                          <div className="flex flex-col items-start justify-start">
                            <span className="text-sm font-semibold">
                              {`${item.firstName} ${item.lastName}`}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(item.createdDate).isValid() ? dayjs(item.createdDate)?.format('MMMM DD, YYYY') : '--'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{item.phone}</td>
                      <td>
                        <span className={`badge badge-${item.status == APP_USER_STATUS_OFFLINE ? 'danger' : 'success'}`}>{item.status}</span>
                      </td>
                      <td>
                        {item.appDriverWorkingSchedule.length > 0 ? item.appDriverWorkingSchedule.map((scheduleItem: any) => {
                          const newStartTime = dayjs().format('YYYY MM DD') + ", " + scheduleItem.startTime;
                          const newEndTime = dayjs().format('YYYY MM DD') + ", " + scheduleItem.endTime;
                          return <span style={{ display: 'block' }} key={scheduleItem.id}>{dayjs(newStartTime)?.format('HH:mm')} to {dayjs(newEndTime)?.format('HH:mm A')}</span>
                        }) : '--'}
                      </td>
                      <td>{item.licenseNumber ? item.licenseNumber : '--'}</td>
                      <td>{item.appOrderDeliveryStatus === null || item.appOrderDeliveryStatus === ORDER_DELIVERY_STATUS_NOT_ASSIGN ? (
                        <span className="badge badge-danger">{item.appOrderDeliveryStatus ? item.appOrderDeliveryStatus : ORDER_DELIVERY_STATUS_NOT_ASSIGN}</span>
                      ) : (
                        <span className="badge badge-success">{item.appOrderDeliveryStatus}</span>
                      )}</td>
                      <td>
                        {item.isActive ? (
                          <span className="badge badge-success">ACTIVE</span>
                        ) : (
                          <span className="badge badge-danger">INACTIVE</span>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          className="btn-black-fill btn-icon"
                          disabled={item.isActive && (item.status == APP_USER_STATUS_OFFLINE && item.appOrderDeliveryStatus == null || item.appOrderDeliveryStatus != ORDER_DELIVERY_STATUS_NOT_ASSIGN) ? true : false}
                          onClick={() => assignHandler(item.id)}
                        >
                          Assign
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className='w-[100%] mt-3 flex justify-center py-3'>
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
    </>

  );
}

export default OrdersAssignPage;
