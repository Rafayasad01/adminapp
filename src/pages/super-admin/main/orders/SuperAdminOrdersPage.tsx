/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
//import Pagination from '@mui/material/Pagination';
//import Stack from '@mui/material/Stack';
import order from '../../../../services/superadmin/SuperAdminOrders';
import dayjs from 'dayjs';
import TablePagination from '@mui/material/TablePagination';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const options = ['View', 'Edit', 'Download PDF'];
const ITEM_HEIGHT = 48;
function SuperAdminOrdersPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('status');
  const [time, setTime] = useState('time');
  const [openDialog, setOpenDialog] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderList, setOrderList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    order.searchService(search, newPage, rowsPerPage).then(item => {
      setOrderList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false })));
      setTotal(item.data.data.total);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    order.searchService(search, page, rowsPerPage).then(item => {
      setOrderList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false })));
      setTotal(item.data.data.total);
    });
  };

  const open = Boolean(anchorEl);

  const handleCheckAllChange = (event: any) => {
    setOrderList((newlist: any) => newlist.map((item: any) => ({ ...item, isSelected: event.target.checked })));
  };

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const addRouteHandler = () => {
    navigate('create');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedMenuClose = (option: string) => {
    let doOption = '';
    if (option === 'Edit') {
      doOption = 'edit';
    } else if (option === 'View') {
      doOption = 'view';
    } else {
      doOption = 'download';
    }
    setAnchorEl(null);
    navigate(`${doOption}/123`);
  };
  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    setSearch(searchTxt);
    setPage(0);
    order.searchService(searchTxt, page, rowsPerPage).then(item => {
      setOrderList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false })));
      setTotal(item.data.data.total);
    })
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };


  useEffect(() => {
    order.getListService((page), rowsPerPage).then(item => {
      //console.log(item);
      setOrderList(item.data.data.list.map((item: any) => ({ ...item, isSelected: false, orderStatus: item.status })));
      setTotal(item.data.data.total);
    });
  }, []);

  return (
    <>
      <SuperAdminTopBar title="Orders" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-3">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Orders
              </span>
            </div>
            <div className="col-span-6">
              <div className="flex flex-row gap-3">
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
                      if (event.key === 'Enter') {
                        handleClickSearch(event);
                      }

                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton aria-label="toggle password visibility"

                        >
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
                <Select
                  className="select-grey-outline h-10 w-36"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="status">Status</MenuItem>
                </Select>
                {/* <Select
                  className=" select-grey-outline mr-3 h-10 w-36"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  onChange={handleTimeChange}
                >
                  <MenuItem value="time">Time</MenuItem>
                </Select> */}
              </div>
            </div>
            {/* <div className="col-span-3">
              <div className="flex flex-row">
                <Button variant="contained" className="btn-black-outline mr-3">
                  Export to CSV
                </Button>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={addRouteHandler}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div> */}
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      {...label}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        handleCheckAllChange(event);
                      }}
                    />
                  </th>
                  <th>Customers</th>
                  <th>Pickup Time</th>
                  <th>Drop-off Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {orderList && orderList.map((order: any, index: number) => {
                  //console.log(order);
                  return (
                    <tr key={order.id}>
                      <td>
                        <Checkbox
                          {...label}
                          icon={
                            <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                          }
                          checkedIcon={
                            <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                          }
                          value={order.id}
                          checked={order.isSelected}
                          onChange={(event: any) => {
                            let filteredItem: any;
                            const newList = orderList.filter((item: any) => {
                              if (item.id === order.id) {
                                filteredItem = item;
                                return false;
                              }
                              return true;
                            })
                            setOrderList([...newList, { ...filteredItem, isSelected: event.target.checked }])
                          }}
                        />
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {order.user.firstName} {order.user.lastName}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {order.user.email}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {order.userAddress.address}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-[#1A1A1A]">
                            {dayjs(order.appUserCart.pickupDateTime)?.format('hh:mm A')} - {dayjs(order.appUserCart.pickupDateTime).add(1, 'hour').format('hh:mm A')}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {dayjs(order.appUserCart.pickupDateTime)?.format('MMMM DD, YYYY')}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-[#1A1A1A]">
                            {dayjs(order.appUserCart.dropDateTime)?.format('hh:mm A')} - {dayjs(order.appUserCart.dropDateTime).add(1, 'hour').format('hh:mm A')}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {dayjs(order.appUserCart.dropDateTime)?.format('MMMM DD, YYYY')}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm font-semibold text-[#1A1A1A]">
                        ${order.appUserCart.grandTotal}
                      </td>
                      <td>
                        <Select
                          className="select-black-outline mr-3 h-7 w-36"
                          labelId="demo-simple-select-label"
                          value={order.orderStatus}
                          onChange={(event: any) => {
                            let filteredItem: any;
                            const newList = orderList.filter((item: any) => {
                              if (item.id === order.id) {
                                filteredItem = item;
                                return false;
                              }
                              return true;
                            })
                            setOrderList([...newList, { ...filteredItem, orderStatus: event.target.value }])

                          }}
                        >
                          <MenuItem value="New">
                            New
                          </MenuItem>
                          <MenuItem value="OrderPlaced">
                            Order Placed
                          </MenuItem>
                          <MenuItem value="ReadyForPickUp">
                            Ready for Pick up
                          </MenuItem>
                        </Select>
                      </td>
                      <td>
                        <IconButton
                          className="btn-dot"
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
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
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '11ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleSelectedMenuClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {/* <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: '#1A1A1A',
            fontFamily: 'Inter',
            fonWeight: 600,
            fonSize: '20px',
            padding: '10px 15px 0 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Cancel Order?
        </DialogTitle>
        <DialogContent
          sx={{
            color: '#6A6A6A',
            fontFamily: 'Inter',
            fonWeight: 400,
            fonSize: '14px',
            padding: '10px 15px 0 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Do you really want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between', margin: '15px 5px 10px 5px' }}
        >
          <Button
            sx={{ width: '140px' }}
            variant="contained"
            className="btn-black-outline mr-3"
            onClick={handleDialogClose}
          >
            Yes, Confirm
          </Button>
          <Button
            sx={{ width: '140px' }}
            variant="contained"
            className="btn-black-fill btn-icon"
            onClick={handleDialogClose}
          >
            No, Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default SuperAdminOrdersPage;
