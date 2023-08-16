/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../components/common/TopBar';
import DriversCreatePopup from './DriversCreatePopup';
import DriversEditPopup from './DriversEditPopup';
import driver from '../../services/adminapp/adminDriver';
import { useAppSelector } from '../../redux/redux-hooks';
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ActionMenu from '../../components/common/ActionMenu';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';

function DriversPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
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
  const actionMenuOptions = ['Detail', 'Address', 'Schedule', 'Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      edit(actionMenuItemid);
    } else if (option === 'Delete') {
      deleteEntity(actionMenuItemid);
    } else if (option === 'Address') {
      navigate(`address/${actionMenuItemid}`);
    } else if (option === 'Schedule') {
      navigate(`schedule/${actionMenuItemid}`);
    } else if (option === 'Detail') {
      navigate(`detail/${actionMenuItemid}`);
    }
  };

  const deleteEntity = (id: string) => {
    const data = {
      is_active: false,
      is_deleted: true,
      updated_by: authState.user.id,
    };
    driver.deleteService(id, data).then((item: any) => {
      if (item.data.success) {
        setList((newArr: any) => {
          return newArr.filter((newItem: any) => newItem.id !== id);
        });
      }
    });
  };

  const edit = (id: string) => {
    driver.getService(id).then((item: any) => {
      if (item.data.success) {
        setEditFormData(item.data.data);
        setOpenEditFormDialog(true);
      }
    });
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      driver
        .searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      driver
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      driver
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
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
      driver
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      driver
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  useEffect(() => {
    driver
      .getListService(authState.user.tenant, page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      });
  }, []);

  const createFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('license_number', data.license_number);
    formData.append('address', data.address);
    formData.append('tenant', authState.user.tenant);
    formData.append('created_by', authState.user.id);
    formData.append('updated_by', authState.user.id);
    if (data.avatar !== null) formData.append('avatar', data.avatar);
    driver.create(formData).then((item) => {
      if (item.data.success) {
        list.push(item.data.data);
        setList(list);
      }
    });
  };

  const updateFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', data.phone);
    formData.append('license_number', data.license_number);
    formData.append('updated_by', authState.user.id);
    if (data.avatar !== null) formData.append('avatar', data.avatar);
    driver.updateService(actionMenuItemid, formData).then((item) => {
      if (item.data.success) {
        setList((newArr: any) => {
          return newArr.map((newItem: any) => {
            if (newItem.id === actionMenuItemid) {
              newItem.firstName = item.data.data.firstName;
              newItem.lastName = item.data.data.lastName;
              newItem.licenseNumber = item.data.data.licenseNumber;
              newItem.phone = item.data.data.phone;
              if (data.avatar !== null) newItem.phone = item.data.data.avatar;
              return { ...newItem };
            }
          });
        });
      }
    });
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      is_active: event.target.checked,
      updated_by: authState.user.id,
    };
    driver.updateStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === updateItem.data.data.id) {
              item.isActive = updateItem.data.data.isActive;
            }
            return { ...item };
          });
        });
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TopBar title="Drivers" />
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => setOpenFormDialog(true)}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Drivers</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Availability</th>
                  <th>License Number</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    if (!item.isDeleted) {
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
                                  {item.firstName.charAt(0)}
                                  {item.lastName.charAt(0)}
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
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            <span
                              className={`badge badge-${
                                item.status == 'Offline' ? 'danger' : 'success'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          {/* <td>
                          {item.appDriverWorkingSchedule.length > 0 ? item.appDriverWorkingSchedule.map((scheduleItem: any) => {
                            const newStartTime = dayjs().format('YYYY MM DD') + ", " + scheduleItem.startTime;
                            const newEndTime = dayjs().format('YYYY MM DD') + ", " + scheduleItem.endTime;
                            return <span style={{ display: 'block' }} key={scheduleItem.id}>{dayjs(newStartTime)?.format('HH:mm')} to {dayjs(newEndTime)?.format('HH:mm A')}</span>
                          }) : '--'}
                        </td> */}
                          <td>
                            {item.licenseNumber ? item.licenseNumber : '--'}
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
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
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
                    }
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
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      <DriversCreatePopup
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      />
      <DriversEditPopup
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        callback={updateFormHandler}
      />
    </LocalizationProvider>
  );
}

export default DriversPage;
