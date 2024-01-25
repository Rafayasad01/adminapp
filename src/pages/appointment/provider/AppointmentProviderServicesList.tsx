import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import { NOT_AUTHORIZED_MESSAGE, PATTERN } from '../../../utils/constants';

import { AppointmentService } from '../../../interfaces/app.appointment';
import { listingRolePermission } from '../../../utils/helper';

function AppointmentProviderServicesList() {
  const { providerId } = useParams();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<any>('');
  const [emptyVariable] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  // const [providerLov, setProviderLov] = useState<any>();
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AppointmentService>();

  const inputFieldsData = [
    {
      fieldName: 'Service Name',
      id: 'serviceName',
      placeholder: 'Enter service name',
      register,
      error: errors.serviceName,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 150,
    },
    {
      fieldName: 'Service Fees',
      id: 'fees',
      placeholder: 'Enter service fees',
      register,
      error: errors.fees,
      type: 'text',
      maxLetterLimit: 5,
      pattern: PATTERN.POINT_NUM,
    },
    {
      fieldName: 'Service Description',
      id: 'serviceDesc',
      placeholder: 'Enter service Description',
      register,
      error: errors.serviceDesc,
      type: 'textarea',
      notRequired: true,
      pattern: PATTERN.ALLOW_ALL,
      maxLetterLimit: 250,
    },
  ];

  const handleFormClickOpen = () => {
    setIsLoader(true);
    if (
      listingRolePermission(dataRole, 'Appointment Provider Service Create')
    ) {
      Service.ServiceProviderLov(authState.user.tenant)
        .then((item: any) => {
          if (item.data.success) {
            // setProviderLov(item.data.data);
            setIsLoader(false);
            setOpenFormDialog(true);
          } else {
            setOpenFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err: Error) => {
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
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.ServiceSearchList(
        providerId,
        searchTxt,
        newPage,
        rowsPerPage
      ).then((item) => {
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
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.ServiceList(authState.user.tenant, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.ServiceSearchList(
        authState.user.tenant,
        search,
        newPage,
        rowsPerPage
      ).then((item) => {
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
      Service.ServiceList(authState.user.tenant, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.ServiceSearchList(
        authState.user.tenant,
        search,
        newPage,
        rowsPerPage
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Service Edit')
      ) {
        setIsLoader(true);
        Service.ServiceEdit(actionMenuItemid).then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setValue('serviceName', item.data.data.name);
            setValue('serviceDesc', item.data.data.desc);
            setValue('fees', item.data.data.fees);
            setOpenEditFormDialog(true);
          }
        });
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Delete') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Service Delete')
      ) {
        setIsLoader(true);
        const data = {
          updatedBy: authState.user.id,
        };
        // console.log(actionMenuItemid);
        Service.ServiceDelete(actionMenuItemid, data)
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
            }
          })
          .catch((err: Error) => {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
          });
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Appointment Provider Service List')) {
      Service.ServiceList(providerId, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
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
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  }, [emptyVariable]);

  const createFormHandler = (data: any) => {
    // console.log('==>', data);
    setIsLoader(true);
    const userData = {
      name: data.serviceName,
      desc: data.serviceDesc ? data.serviceDesc : null,
      tenant: authState.user.tenant,
      appointmentProvider: providerId,
      fees: data.fees,
      createdBy: authState.user.id,
    };
    Service.ServiceCreate(userData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    // console.log("updated data", data);
    setIsLoader(true);
    const userData = {
      name: data.serviceName,
      appointmentProvider: providerId,
      desc: data.serviceDesc ? data.serviceDesc : null,
      fees: data.fees ? data.fees : '0',
      updatedBy: authState.user.id,
    };

    Service.ServiceUpdate(actionMenuItemid, userData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === actionMenuItemid) {
              list[i].name = item.data.data.name;
              list[i].desc = item.data.data.desc;
              list[i].fees = item.data.data.fees;
            }
          }
          reset();
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const onSubmitDialogBox = (data: any) => {
    if (openFormDialog) {
      setOpenFormDialog(false);
      createFormHandler(data);
    } else if (openEditFormDialog) {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Service Update')
      ) {
        setOpenEditFormDialog(false);
        updateFormHandler(data);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (
      listingRolePermission(
        dataRole,
        'Appointment Provider Service Update Status'
      )
    ) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.ServiceUpdateStatus(id, data).then((updateItem) => {
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
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
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
      <TopBar isNestedRoute title="Services" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Services
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
                  <th>Service Name</th>
                  <th>Service Description</th>
                  <th>Service Fees</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td className="w-64">
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.name}`}
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
                        <td className="w-[50%]">{item.desc}</td>
                        <td className="">${Number(item.fees).toFixed(2)}</td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ACTIVE</span>
                          ) : (
                            <span className="badge badge-danger">INACTIVE</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
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
          {list?.length < 1 ? (
            <CustomText noroundedborders text="No Records Found" />
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
      {/* {cancelDialogOpen && (
                <PermissionPopup
                    type="shock"
                    open={cancelDialogOpen}
                    setOpen={setCancelDialogOpen}
                    dialogText={dialogText}
                    callback={statusCancelHandler}
                />
            )} */}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Add Service"
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Edit Service"
          type="edit"
          specailCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
        />
      )}
    </>
  );
}

export default AppointmentProviderServicesList;
