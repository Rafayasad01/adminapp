/* eslint-disable react/jsx-props-no-spreading */
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import orderService from '../../services/adminapp/adminOrders';
import { ORDER_STATUSES } from '../../utils/constants';
import promiseHandler, {
  CheckRolePermission,
  listingRolePermission,
} from '../../utils/helper';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

function OrdersPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
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
  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      const getOrderListPromise = orderService.getListService(
        authState.user.tenant,
        newPage,
        rowsPerPage
      );
      const [getOrderListResult, getOrderListError, getOrderListOk] =
        await promiseHandler(getOrderListPromise);
      if (!getOrderListOk) {
        console.error('getOrderListError :>> ', getOrderListError);
        return;
      }
      if (!getOrderListResult.data.success) {
        console.error(
          'getOrderListResult.data.message :>> ',
          getOrderListResult.data.message
        );
        return;
      }
      setList(
        getOrderListResult.data.data.list.map((newItem: any) => ({
          ...newItem,
          isSelected: false,
          orderStatus: newItem.status,
        }))
      );
      setTotal(getOrderListResult.data.data.total);
    } else {
      const orderSearchPromise = orderService.searchService(
        authState.user.tenant,
        search,
        newPage,
        rowsPerPage
      );
      const [orderSearchResult, orderSearchError, orderSearchOk] =
        await promiseHandler(orderSearchPromise);
      if (!orderSearchOk) {
        console.error('orderSearchError :>> ', orderSearchError);
        return;
      }
      if (!orderSearchResult.data.success) {
        console.error(
          'orderSearchResult.data.message :>> ',
          orderSearchResult.data.message
        );
        return;
      }
      setList(
        orderSearchResult.data.data.list.map((newItem: any) => ({
          ...newItem,
          isSelected: false,
          orderStatus: newItem.status,
        }))
      );
      setTotal(orderSearchResult.data.data.total);
    }
  };
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowPerPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      const getOrderListPromise = orderService.getListService(
        authState.user.tenant,
        newPage,
        newRowPerPage
      );
      const [getOrderListResult, getOrderListError, getOrderListOk] =
        await promiseHandler(getOrderListPromise);
      if (!getOrderListOk) {
        console.error('getOrderListError :>> ', getOrderListError);
        return;
      }
      if (!getOrderListResult.data.success) {
        console.error(
          'getOrderListResult.data.message :>> ',
          getOrderListResult.data.message
        );
        return;
      }
      setList(
        getOrderListResult.data.data.list.map((newItem: any) => ({
          ...newItem,
          isSelected: false,
          orderStatus: newItem.status,
        }))
      );
      setTotal(getOrderListResult.data.data.total);
    } else {
      orderService
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
      orderService
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
    async function getOrderList() {
      const getOrderListPromise = orderService.getListService(
        authState.user.tenant,
        page,
        rowsPerPage
      );
      const [getOrderListResult, getOrderListError, getOrderListOk] =
        await promiseHandler(getOrderListPromise);
      if (!getOrderListOk) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: getOrderListError.message,
          type: 'error',
        });
        return;
      }
      if (!getOrderListResult.data.success) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: getOrderListResult.data.message,
          type: 'error',
        });
        return;
      }
      setIsLoader(false);
      setList(
        getOrderListResult.data.data.list.map((newItem: any) => ({
          ...newItem,
          isSelected: false,
          orderStatus: newItem.status,
        }))
      );
      setTotal(getOrderListResult.data.data.total);
    }
    if (listingRolePermission(dataRole, 'Order List')) {
      getOrderList();
    }
  }, [null]);

  const menuHandler = (option: string) => {
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

  const getStatusBackground = (status: string) => {
    const newStatuses = [...ORDER_STATUSES].map(([key, value]) => ({
      key,
      value,
    }));
    const newStatus = newStatuses.find((s) => s.key === status);
    return newStatus?.value.background;
  };

  const setOrderStatus = (status: string) => {
    const newStatuses = [...ORDER_STATUSES].map(([key, value]) => ({
      key,
      value,
    }));
    const newStatus = newStatuses.find((s) => s.key === status);
    return newStatus?.value.title;
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
          callback={menuHandler}
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
                  <th className="w-[22%]">Customers</th>
                  {/* <th>Pickup Time</th>
                  <th>Drop-off Time</th> */}
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Created Date</th>
                  <th className="w-36">Status</th>
                  <th aria-label="empty table header">&nbsp;</th>
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
                        {/* <td>
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
                          </div
                          >
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
                        </td> */}
                        <td>{Item.orderNumber}</td>
                        <td className="text-sm font-semibold text-secondary">
                          PKR {Item.grandTotal}
                        </td>
                        <td>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {dayjs(Item.createdDate)?.format(
                              'ddd, MMM DD, YYYY'
                            )}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBackground(
                              Item.status
                            )}`}
                          >
                            {setOrderStatus(Item.status)}
                          </span>
                        </td>
                        <td aria-label="go to reviews">
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
