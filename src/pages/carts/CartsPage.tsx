/* eslint-disable react/jsx-props-no-spreading */
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import  { SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import cart from '../../services/adminapp/adminCarts';
import {
  CART_STATUS_COMPELETED,
  CART_STATUS_NEW,
  CART_STATUS_PROCESSING,
} from '../../utils/constants';
import { CheckRolePermission } from '../../utils/helper';

const actionMenuOptions = ['View'];
function CartsPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persisitReducer?.roleState?.role?.permissions
  );

  const navigate = useNavigate();
  const [emptyVariable] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const [isLoader, setIsLoader] = React.useState(true);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      cart
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
          setTotal(item.data.data.total);
        });
    } else {
      cart
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
          setTotal(item.data.data.total);
        });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      cart
        .getListService(authState.user.tenant, newPage, newRowperPage)
        .then((item) => {
          // console.log(item.data.data)
          setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
          setTotal(item.data.data.total);
        });
    } else {
      cart
        .searchService(authState.user.tenant, search, newPage, newRowperPage)
        .then((item) => {
          setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
          setTotal(item.data.data.total);
        });
    }
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      cart
        .searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
          setTotal(item.data.data.total);
        });
    }
  };

  useEffect(() => {
    cart
      .getListService(authState.user.tenant, page, rowsPerPage)
      .then((item) => {
        // console.log(item.data.data)
        setIsLoader(false);
        setList(item.data.data.list.map((newItem: any) => ({ ...newItem })));
        setTotal(item.data.data.total);
      })
      .catch(() => {
        setIsLoader(false);
      });
  }, [emptyVariable]);

  const manuHandler = (option: string) => {
    let doOption = '';
    if (option === 'Edit') {
      doOption = 'edit';
    } else if (option === 'View') {
      doOption = 'view';
    } else {
      doOption = 'download';
    }
    CheckRolePermission(
      'Cart View',
      dataRole,
      navigate,
      `${doOption}/${actionMenuItemid}`
    );
  };

  const getStatusTag = (status: string) => {
    // console.log('STATAT', status);
    let tag = '';
    if (status === CART_STATUS_NEW) {
      tag = 'blue';
    } else if (status === CART_STATUS_PROCESSING) {
      tag = 'green';
    } else if (status === CART_STATUS_COMPELETED) {
      tag = 'green';
    }
    return tag;
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
      <TopBar title="Carts" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-3">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Carts
              </span>
            </div>
            <div className="col-span-9">
              <div className="flex justify-end">
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
                        <IconButton aria-label="toggle password visibility">
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
                  <th className="w-[22%]">Customers</th>
                  <th>Pickup Time</th>
                  <th>Drop-off Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    // console.log(order);
                    return (
                      <tr key={index}>
                        <td>
                          {item.user.firstName ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-secondary">
                                {item.user.firstName} {item.user.lastName}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {item.user.email}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {item.userAddress.address}
                              </span>
                            </div>
                          ) : (
                            '----'
                          )}
                        </td>
                        <td>
                          {dayjs(item.pickupDateTime).isValid() ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-normal text-secondary">
                                {dayjs(item.pickupDateTime)?.format(
                                  'hh:mm:ssA'
                                )}{' '}
                                -{' '}
                                {dayjs(item.pickupDateTime)
                                  .add(1, 'hour')
                                  .format('hh:mm:ssA')}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.pickupDateTime)?.format(
                                  'ddd, MMM DD, YYYY'
                                )}
                              </span>
                            </div>
                          ) : (
                            '----'
                          )}
                        </td>
                        <td>
                          {dayjs(item.dropDateTime).isValid() ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-normal text-secondary">
                                {dayjs(item.dropDateTime)?.format('hh:mm:ssA')}{' '}
                                -{' '}
                                {dayjs(item.dropDateTime)
                                  .add(1, 'hour')
                                  .format('hh:mm:ssA')}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.dropDateTime)?.format(
                                  'ddd, MMM DD, YYYY'
                                )}
                              </span>
                            </div>
                          ) : (
                            '----'
                          )}
                        </td>
                        <td className="text-sm font-semibold text-secondary">
                          ${item.grandTotal}
                        </td>
                        <td>
                          <span
                            className={`badge badge-${getStatusTag(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn"
                              onClick={() => navigate(`./view/${item.id}`)}
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
          {list?.length < 1 ? (
            <CustomText text="No Driver History Records" noroundedborders />
          ) : null}
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

export default CartsPage;
