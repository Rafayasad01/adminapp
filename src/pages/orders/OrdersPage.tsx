/* eslint-disable react/jsx-props-no-spreading */
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import ActionMenu from '../../components/common/ActionMenu';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import order from '../../services/adminapp/adminOrders';
import {
  ORDER_STATUSES,
  ORDER_STATUS_IN_CANCELLED,
  ORDER_STATUS_IN_DELIVERED,
  ORDER_STATUS_IN_DELIVERY,
  ORDER_STATUS_NEW,
  ORDER_STATUS_PICKED_UP,
  ORDER_STATUS_PROCESSING,
} from '../../utils/constants';
import { CheckRolePermission, listingRolePermission } from '../../utils/helper';

function OrdersPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail'];
  const [emptyVariable] = useState(null);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      order
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
        });
    } else {
      order
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
        });
    }
    // order.searchService(search, newPage, rowsPerPage).then(item => {
    //   setList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false, orderStatus: item.status })));
    //   setTotal(item.data.data.total);
    // });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      order
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
        });
    } else {
      order
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
        });
    }
    // order.searchService(search, page, rowsPerPage).then(item => {
    //   setList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false, orderStatus: item.status })));
    //   setTotal(item.data.data.total);
    // });
  };

  // const addRouteHandler = () => {
  //   navigate('create');
  // };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      setSearch(searchTxt);
      setPage(0);
      order
        .searchService(authState.user.tenant, searchTxt, page, rowsPerPage)
        .then((item) => {
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
        });
    }
  };

  // const handleStatusChange = (event: SelectChangeEvent) => {
  //   setStatus(event.target.value as string);
  // };

  // const handleTimeChange = (event: SelectChangeEvent) => {
  //   setTime(event.target.value as string);
  // };
  // const changeStatusHandler = (event: any) => {
  //   setStatus(event.target.value as string);
  // };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Order List')) {
      order
        .getListService(authState.user.tenant, page, rowsPerPage)
        .then((item) => {
          setIsLoader(false);
          // console.log(item.data.data);
          setList(
            item.data.data.list.map((newItem: any) => ({
              ...newItem,
              isSelected: false,
              orderStatus: newItem.status,
            }))
          );
          setTotal(item.data.data.total);
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

  const manuHandler = (option: string) => {
    let doOption = '';
    if (option === 'Edit') {
      doOption = 'edit';
    } else if (option === 'Detail') {
      doOption = 'detail';
    } else {
      doOption = 'download';
    }
    CheckRolePermission(
      'Order View',
      dataRole,
      navigate,
      `${doOption}/${actionMenuItemid}`
    );
  };

  const getStatusTag = (status: string) => {
    let tag = '';
    if (status === ORDER_STATUS_NEW) {
      tag = 'blue';
    } else if (status === ORDER_STATUS_PICKED_UP) {
      tag = 'purple';
    } else if (status === ORDER_STATUS_PROCESSING) {
      tag = 'green';
    } else if (status === ORDER_STATUS_IN_DELIVERY) {
      tag = 'orange';
    } else if (status === ORDER_STATUS_IN_DELIVERED) {
      tag = 'yellow';
    } else if (status === ORDER_STATUS_IN_CANCELLED) {
      tag = 'red';
    }
    return tag;
  };

  const setOrderStatus = (status: string) => {
    const newStatuses = [...ORDER_STATUSES].map(([key, value]) => ({
      key,
      value,
    }));
    const newStatus = newStatuses.filter((s) => s.key === status);
    return newStatus[0].value.title;
  };
  return isLoader ? (
    <Loader />
  ) : (
    <>
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Orders" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Orders
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => navigate('./create')}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr className="border-opacity">
                  <th className="w-[22%] ">Customers</th>
                  <th>Pickup Time</th>
                  <th>Drop-off Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Order ID</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((Item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-secondary">
                              {Item.user.firstName} {Item.user.lastName}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {Item.user.email}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {Item.userAddress.address}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <span className="text-sm font-normal text-secondary">
                              {dayjs(Item.pickupDateTime)?.format('hh:mm:ssA')}{' '}
                              -{' '}
                              {dayjs(Item.pickupDateTime)
                                .add(1, 'hour')
                                .format('hh:mm:ssA')}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(Item.pickupDateTime)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <span className="text-sm font-normal text-secondary">
                              {dayjs(Item.dropDateTime)?.format('hh:mm:ssA')} -{' '}
                              {dayjs(Item.dropDateTime)
                                .add(1, 'hour')
                                .format('hh:mm:ssA')}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(Item.dropDateTime)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="text-sm font-semibold text-secondary">
                          ${Item.grandTotal}
                        </td>
                        <td>
                          <span
                            className={`badge badge-${getStatusTag(
                              Item.status
                            )}`}
                          >
                            {setOrderStatus(Item.status)}
                          </span>
                        </td>
                        <td>{Item.orderNumber}</td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn"
                              onClick={() => navigate(`./detail/${Item.id}`)}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                          </div>
                          {/* <IconButton
                            className="btn-dot"
                            aria-label="more"
                            id="long-button"
                            aria-controls={
                              actionMenuOpen ? 'long-menu' : undefined
                            }
                            aria-expanded={actionMenuOpen ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              setActionMenuItemid(list[index].id);
                              setActionMenuAnchorEl(event.currentTarget);
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton> */}
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
    </>
  );
}

export default OrdersPage;
