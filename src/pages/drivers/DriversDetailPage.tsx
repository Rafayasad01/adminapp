import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import Service from '../../services/adminapp/adminDriver';
import {
  ORDER_DELIVERY_STATUS_ACCEPTED,
  ORDER_DELIVERY_STATUS_CANCELLED,
  ORDER_DELIVERY_STATUS_DELIVERED,
  ORDER_DELIVERY_STATUS_IN_DELIVERY,
  ORDER_DELIVERY_STATUS_NEW,
  ORDER_DELIVERY_STATUS_PICKED_UP,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import { useAppSelector } from '../../redux/redux-hooks';

function DriversDetailPage() {
  const params = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [address, setAddress] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [emptyVariable] = useState(null);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];

  const id: any = params.driverId;

  const manuHandler = (option: string) => {
    // if (option === 'Edit') {
    // } else if (option === 'Delete') {
    // }
  };

  const handleClickSearch = (event: any) => {
    // if (event.key === 'Enter') {
    //   const searchTxt = event.target.value as string;
    //   const newPage = 0;
    //   setSearch(searchTxt);
    //   setPage(newPage);
    //   Service.searchAddressService(id, searchTxt, newPage, rowsPerPage).then(item => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    //   })
    // }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getDeliveryListService(id, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      // Service.searchAddressService(id, search, newPage, rowsPerPage).then(item => {
      //   setList(item.data.data.list);
      //   setTotal(item.data.data.total);
      // });
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
      Service.getDeliveryListService(id, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      // Service.searchAddressService(id, search, newPage, rowsPerPage).then(item => {
      //   setList(item.data.data.list);
      //   setTotal(item.data.data.total);
      // });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Driver Detail')) {
      Service.getDetailService(id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setAddress(item.data.data.appUserAddress);
            setDetail(item.data.data);
            setList(item.data.data.appOrderDelivery.reverse());
            setTotal(Number(item.data.data.total));
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

  const getStatusTag = (status: string) => {
    let tag = '';
    if (status === ORDER_DELIVERY_STATUS_NEW) {
      tag = 'blue';
    } else if (status === ORDER_DELIVERY_STATUS_ACCEPTED) {
      tag = 'blue';
    } else if (status === ORDER_DELIVERY_STATUS_PICKED_UP) {
      tag = 'purple';
    } else if (status === ORDER_DELIVERY_STATUS_IN_DELIVERY) {
      tag = 'orange';
    } else if (status === ORDER_DELIVERY_STATUS_DELIVERED) {
      tag = 'yellow';
    } else if (status === ORDER_DELIVERY_STATUS_CANCELLED) {
      tag = 'red';
    }
    return tag;
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
      <TopBar isNestedRoute title="Driver Detail" />
      {detail && (
        <div className="container mt-5">
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
                  <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
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
                  <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.email}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    License Number
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.licenseNumber}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Availibility
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-8 min-h-[375px] rounded-lg bg-[#fff] shadow-lg">
              <MapAddress address={address} zoom={15} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-12">
            <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
              <div className="flex justify-between">
                <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                  Driver History
                </span>
                <div className="flex-grow">&nbsp;</div>
                {/* <FormControl
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
                  </FormControl> */}
              </div>
              {list?.length > 0 ? (
                <>
                  <div className="mt-3 grid grid-cols-none">
                    <table className="table-border table-auto">
                      <thead>
                        <tr>
                          <th>Pickup Time</th>
                          <th>Drop Time</th>
                          <th>Status</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item: any, index: number) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                {dayjs(item.pickupDateTime).isValid() ? (
                                  <div className="flex flex-col">
                                    <span className="text-sm font-normal text-[#1A1A1A]">
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
                                    <span className="text-sm font-normal text-[#1A1A1A]">
                                      {dayjs(item.dropDateTime)?.format(
                                        'hh:mm:ssA'
                                      )}{' '}
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
                                {/* <IconButton
                                className="btn-dot"
                                aria-label="more"
                                id="long-button"
                                aria-controls={actionMenuOpen ? 'long-menu' : undefined}
                                aria-expanded={actionMenuOpen ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(event: React.MouseEvent<HTMLElement>) => {
                                  setActionMenuItemid(list[index].id)
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
                </>
              ) : (
                <CustomText noroundedborders text="No Driver History Records" />
              )}
            </div>
          </div>
        </div>
      )}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
    </>
  );
}

export default DriversDetailPage;
