import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import TopBar from '../../components/common/TopBar';
import Map from '../../components/common/Map';
import MapAddress from '../../components/common/MapAddress';
import Service from '../../services/adminapp/adminCustomer';
import ActionMenu from '../../components/common/ActionMenu';
import { useAppSelector } from '../../redux/redux-hooks';
import CustomersAddressCreatePopup from './CustomersAddressCreatePopup';
import CustomersAddressEditPopup from './CustomersAddressEditPopup';
import assets from '../../assets';
import Notify from '../../components/common/Notify';
import Loader from '../../components/common/Loader';
import PermissionPopup from '../../utils/PermissionPopup';

function CustomersAddressPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  const [address, setAddress] = useState<string>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<any>(
    'Are you sure you want to delete this customer address ?'
  );

  const id: any = params.customerId;

  const deleteEntity = (customerId: string) => {
    setIsLoader(true);
    const data = {
      is_deleted: true,
    };
    Service.deleteAddressService(customerId, data)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.filter(
              (newItem: any) => newItem.id !== item.data.data.id
            );
          });
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
  };

  const statusCancelHandler = () => {
    deleteEntity(actionMenuItemid);
  };

  const getData = (customerId: string) => {
    Service.getAddress(customerId).then((item: any) => {
      if (item.data.success) {
        setEditFormData(item.data.data);
        setOpenEditFormDialog(true);
      }
    });
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      getData(actionMenuItemid);
    } else if (option === 'Delete') {
      setCancelDialogOpen(true);
    }
  };

  // const handleClickSearch = (event: any) => {
  //   if (event.key === 'Enter') {
  //     const searchTxt = event.target.value as string;
  //     const newPage = 0;
  //     setSearch(searchTxt);
  //     setPage(newPage);
  //     Service.searchAddressService(id, searchTxt, newPage, rowsPerPage).then(
  //       (item) => {
  //         setList(item.data.data.list);
  //         setTotal(item.data.data.total);
  //       }
  //     );
  //   }
  // };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getListAddressService(id, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchAddressService(id, search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
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
      Service.getListAddressService(id, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchAddressService(id, search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    }
  };

  useEffect(() => {
    Service.getAddressService(id)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setDetail(item.data.data);
          if (
            item.data.data.appUserAddress &&
            item.data.data.appUserAddress.length > 0
          ) {
            const activeAddress = item.data.data.appUserAddress.filter(
              (newItem: any) => newItem.isActive === true
            );
            if (activeAddress.length > 0) {
              setAddress(activeAddress[0].address);
            }
            setList(item.data.data.appUserAddress.reverse());
            setTotal(Number(item.data.data.total));
          }
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
  }, [id]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('type', data.type);
    formData.append('address', data.address);
    formData.append('app_user', id);
    formData.append('tenant', authState.user.tenant);
    Service.createAddress(actionMenuItemid, formData)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          list.push(item.data.data);
          setList(list);
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
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('type', data.type);
    formData.append('address', data.address);
    formData.append('app_user', id);
    Service.updateAddress(actionMenuItemid, formData)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.map((newItem: any) => {
              if (newItem.id === actionMenuItemid) {
                newItem.name = item.data.data.name;
                newItem.type = item.data.data.type;
                newItem.latitude = item.data.data.latitude;
                newItem.longitude = item.data.data.longitude;
                newItem.address = item.data.data.address;
              }
              return { ...newItem };
            });
          });
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
  };

  const handleSwitchChange = (event: any, customerId: string) => {
    if (list.length > 1) {
      Service.updateStatusAddressService(customerId).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = true;
              } else {
                item.isActive = false;
              }
              return { ...item };
            });
          });
        }
      });
    }
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
      <TopBar isNestedRoute title="Customer Address" />
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
                    className={`font-sm mt-2 font-open-sans text-sm ${detail.isActive ? 'text-[#29CC97]' : 'text-[#f50057]'
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
                    Availibility
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.status}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon mt-4"
                    onClick={() => setOpenFormDialog(true)}
                  >
                    <AddOutlinedIcon /> Add New
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-8 min-h-[318px] rounded-lg bg-[#fff] shadow-lg">
              {address ? (
                <MapAddress address={address} zoom={15} />
              ) : (
                <div className="no-map-location">
                  <div className="content">
                    <div className="icon">
                      <img
                        className="w-100"
                        src={assets.images.noMapLocation}
                        alt=""
                      />
                    </div>
                    <h4 className="text">Location not available</h4>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-12">
            <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
              <div className="flex justify-between">
                <span className="pb-2 font-open-sans text-xl font-semibold text-[#1A1A1A]">
                  Address History
                </span>
                {/* <div className="flex-grow">&nbsp;</div> */}
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
                          <th className="w-[28%]">address</th>
                          <th>Name</th>
                          <th>latitude</th>
                          <th>longitude</th>
                          <th>type</th>
                          <th>status</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item: any, index: number) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.address}</td>
                              <td>{item.name}</td>
                              <td>{item.latitude}</td>
                              <td>{item.longitude}</td>
                              <td>{item.type}</td>
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
                                <Switch
                                  checked={item.isActive}
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleSwitchChange(event, list[index].id)
                                  }
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <IconButton
                                  className="btn-dot"
                                  aria-label="more"
                                  id="long-button"
                                  aria-controls={
                                    actionMenuOpen ? 'long-menu' : undefined
                                  }
                                  aria-expanded={
                                    actionMenuOpen ? 'true' : undefined
                                  }
                                  aria-haspopup="true"
                                  onClick={(
                                    event: React.MouseEvent<HTMLElement>
                                  ) => {
                                    setActionMenuItemid(list[index].id);
                                    setActionMenuAnchorEl(event.currentTarget);
                                  }}
                                >
                                  <MoreVertIcon />
                                </IconButton>
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
                <div className="flex w-full items-center justify-center rounded-lg bg-gray-200 py-3">
                  <p className="font-open-sans">No Address Records</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={statusCancelHandler}
        />
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
      <CustomersAddressCreatePopup
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      />
      <CustomersAddressEditPopup
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        callback={updateFormHandler}
      />
    </>
  );
}

export default CustomersAddressPage;
