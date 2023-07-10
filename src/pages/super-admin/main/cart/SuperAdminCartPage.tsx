/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
import cart from '../../../../services/superadmin/SuperAdminCarts';
import dayjs from 'dayjs';
import TablePagination from '@mui/material/TablePagination';
import ActionMenu from '../../../../components/common/ActionMenu';
import { CART_STATUS_NEW, CART_STATUS_PROCESSING } from '../../../../utils/constants';

const actionMenuOptions = ['View'];
function SuperAdminCartPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState("");
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);

  const actionMenuHandler = (event: any, index: number) => {
    setActionMenuItemid(list[index].id)
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    cart.searchService(search, newPage, rowsPerPage).then(item => {
      //console.log(item)
      setList(item.data.data.list.map((item: any) => ({ ...item })));
      setTotal(item.data.data.total);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    cart.searchService(search, page, rowsPerPage).then(item => {
      setList(item.data.data.list.map((item: any) => ({ ...item })));
      setTotal(item.data.data.total);
    });
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    setSearch(searchTxt);
    setPage(0);
    cart.searchService(searchTxt, page, rowsPerPage).then(item => {
      setList(item.data.data.list.map((item: any) => ({ ...item })));
      setTotal(item.data.data.total);
    })
  };

  useEffect(() => {
    cart.getListService(page, rowsPerPage).then(item => {
      //console.log(item.data.data)
      setList(item.data.data.list.map((item: any) => ({ ...item })));
      setTotal(item.data.data.total);
    });
  }, []);

  const manuHandler = (option: string) => {
    let doOption = '';
    if (option === 'Edit') {
      doOption = 'edit';
    } else if (option === 'View') {
      doOption = 'view';
    } else {
      doOption = 'download';
    }
    navigate(`${doOption}/${actionMenuItemid}`);
    //console.log('actionMenuItemid', actionMenuItemid)
  }

  const getStatusTag = (status: string) => {
    let tag = "";
    if (status === CART_STATUS_NEW) {
      tag = "blue";
    } else if (status === CART_STATUS_PROCESSING) {
      tag = "gray";
    }
    return tag;
  }

  return (
    <>
      {actionMenuAnchorEl && (
        <ActionMenu open={actionMenuOpen} anchorEl={actionMenuAnchorEl} setAnchorEl={setActionMenuAnchorEl} options={actionMenuOptions} callback={manuHandler} />
      )}
      <SuperAdminTopBar title="Carts" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-3">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Carts
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
                {/* <Select
                  className="select-grey-outline h-10 w-36"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="status">Status</MenuItem>
                </Select> */}
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
                  <th>Customers</th>
                  <th>Pickup Time</th>
                  <th>Drop-off Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map((cart: any, index: number) => {
                  //console.log(order);
                  return (
                    <tr key={cart.id}>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {cart.user.firstName} {cart.user.lastName}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {cart.user.email}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {cart.userAddress.address}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-[#1A1A1A]">
                            {dayjs(cart.pickupDateTime)?.format('hh:mm A')} - {dayjs(cart.pickupDateTime).add(1, 'hour').format('hh:mm A')}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {dayjs(cart.pickupDateTime)?.format('MMMM DD, YYYY')}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-[#1A1A1A]">
                            {dayjs(cart.dropDateTime)?.format('hh:mm A')} - {dayjs(cart.dropDateTime).add(1, 'hour').format('hh:mm A')}
                          </span>
                          <span className="text-xs font-normal text-[#6A6A6A]">
                            {dayjs(cart.dropDateTime)?.format('MMMM DD, YYYY')}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm font-semibold text-[#1A1A1A]">
                        ${cart.grandTotal}
                      </td>
                      <td>
                        <span className={`bg-${getStatusTag(cart.status)}-100 text-${getStatusTag(cart.status)}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${getStatusTag(cart.status)}-900 dark:text-${getStatusTag(cart.status)}-300`}>{cart.status}</span>
                      </td>
                      <td>
                        <IconButton
                          className="btn-dot"
                          aria-label="more"
                          id="long-button"
                          aria-controls={actionMenuOpen ? 'long-menu' : undefined}
                          aria-expanded={actionMenuOpen ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={(event: React.MouseEvent<HTMLElement>) => { actionMenuHandler(event, index) }}
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
    </>
  );
}

export default SuperAdminCartPage;
