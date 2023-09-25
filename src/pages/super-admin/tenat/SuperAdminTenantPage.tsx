import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import dayjs from 'dayjs';
import TablePagination from '@mui/material/TablePagination';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import TopBar from '../../../components/common/TopBar';
import Loader from '../../../components/common/Loader';
import Service from '../../../services/superadmin/Tenant';
import SuperAdminTenantCreatePopup from './SuperAdminTenantCreatePopup';
import Notify from '../../../components/common/Notify';
import SuperAdminTenantUpdatePopup from './SuperAdminTenantUpdatePopup';
import CustomText from '../../../components/common/CustomText';
import { useAppSelector } from '../../../redux/redux-hooks';

function SuperAdminTenantPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [formDetail, setFormDetail] = useState<any>(null);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [isTrialMode, setIsTrialMode] = React.useState<boolean>(false);

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    Service.searchService(searchTxt, newPage, rowsPerPage).then((item) => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    });
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(search, newPage, rowsPerPage).then((item) => {
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
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(search, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {
    Service.getListService(page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
          setIsLoader(false);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        // console.log('error::::::::', error);
      });
  }, [page, rowsPerPage]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('tenantName', data.tenantName);
    formData.append('email', data.email);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('trialMode', data.trialMode);
    formData.append('developmentDomain', data.developmentDomain);
    formData.append('liveDomain', data.liveDomain);
    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.create(formData)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList([item.data.data, ...list]);
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
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const updateFormHandler = (id: string, data: any) => {
    if (data.trialUpdateMode) setIsTrialMode(true);
    const formData = new FormData();
    formData.append('tenantName', data.tenantName);
    formData.append('email', data.email);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('trialMode', data.trialMode);
    formData.append('trailStartDate', data.trailStartDate);
    formData.append('trialUpdateMode', 'true');
    formData.append('developmentDomain', data.developmentDomain);
    formData.append('liveDomain', data.liveDomain);
    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.update(id, formData)
        .then((item: any) => {
          if (item.data.success) {
            console.log('updated data', item.data);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList((newArr: any) => {
              return newArr.map((newItem: any) => {
                if (newItem.id === item.data.data.id) {
                  newItem.name = item.data.data.tenantName;
                  newItem.isActive = item.data.data.isActive;
                  newItem.trialMode = item.data.data.trialMode;
                  newItem.trailStartDate = item.data.data.trailStartDate;
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
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const editHandler = (id: string) => {
    setIsLoader(true);
    Service.get(id).then((item: any) => {
      if (item.data.success) {
        console.log('item.data.data::::::', item.data.data);
        setIsLoader(false);
        setFormDetail(item.data.data);
        setOpenEditFormDialog(true);
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: 'All fields are required!',
          type: 'error',
        });
      }
    });
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      isActive: event.target.checked,
      trialMode: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updateStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === id) {
              item.isActive = updateItem.data.data.isActive;
              item.trialMode = updateItem.data.data.trialMode;
            }
            return { ...item };
          });
        });
      }
    });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Tenant" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Tenants
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
                  onClick={handleFormClickOpen}
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
                  <th>Name</th>
                  <th>Theme Id</th>
                  <th>Trial Mode</th>
                  <th>Trail Start Date</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.themeId}</td>
                        <td>
                          {item.trialMode ? (
                            <span className="badge badge-success">ON</span>
                          ) : (
                            <span className="badge badge-danger">OFF</span>
                          )}
                        </td>
                        <td>
                          {dayjs(item.trailStartDate).isValid() ? (
                            <>
                              {dayjs(item.trailStartDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                              <br />
                              {dayjs(item.trailStartDate)?.format('hh:mm:ss A')}
                            </>
                          ) : (
                            '--'
                          )}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Enabled</span>
                          ) : (
                            <span className="badge badge-danger">Disabled</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => navigate(`../detail/${item.id}`)}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() =>
                                item.isActive ? editHandler(item.id) : null
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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
      {openFormDialog && (
        <SuperAdminTenantCreatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <SuperAdminTenantUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          item={formDetail}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
        />
      )}

      {isNotify && (
        <Notify
          isOpen={isNotify}
          setIsOpen={setIsNotify}
          displayMessage={notifyMessage}
        />
      )}
    </>
  );
}

export default SuperAdminTenantPage;
