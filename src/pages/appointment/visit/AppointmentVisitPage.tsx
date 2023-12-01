import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
// import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import TopBar from '../../../components/common/TopBar';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { AppUserEmployees } from '../../../interfaces/app-user.interface';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import PermissionPopup from '../../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import { AppointmentProvider, AppointmentService, AppointmentVisit } from '../../../interfaces/app.appointment';
import AppointmentVisitCreatePopup from './AppointmentVisitCreatePopup';
import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';
import AppointmentVisitReschedulePopup from './AppointmentVisitReschedulePopup';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';
// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

function AppointmentVisitPage() {
  const navigate = useNavigate();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<any>('');
  const [emptyVariable] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editDetails, setEditDetails] = useState<any>();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Reschedule', 'Detail', 'Cancel'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openRescheduleFormDialog, setOpenRescheduleFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<any>(
    'Are you sure you want to delete this customer ?'
  );
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<AppointmentVisit>();

  const inputFieldsData = [
    {
      fieldName: 'Visitor Name',
      id: 'visitName',
      placeholder: 'Enter Visitor name',
      register,
      error: errors.visitName,
      type: 'text'
    },
    {
      fieldName: 'Phone',
      id: 'phone',
      placeholder: 'Enter Phone Number',
      register,
      error: errors.phone,
      maxLetterLimit: 11,
      type: 'text'
    },
    {
      fieldName: 'Visitor Description',
      id: 'note',
      placeholder: 'Enter Visitor Description',
      register,
      error: errors.note,
      type: 'textarea',
      notRequired: true,
    }
  ];

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Employee Create')) {
      setOpenFormDialog(true);
    } else {
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
        authState.user.tenant,
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
      if (listingRolePermission(dataRole, 'Employee Update')) {
        setIsLoader(true);
        Service.VisitEdit(actionMenuItemid).then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setOpenEditFormDialog(true);
            setEditDetails(item.data.data);
          } else {
            setIsLoader(false);
            setOpenEditFormDialog(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        }).catch((err) => {
          setIsLoader(false);
          setOpenEditFormDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        })
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Cancel') {
      if (listingRolePermission(dataRole, 'Employee delete')) {
        setIsLoader(true);
        Service.VisitCancel(actionMenuItemid)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'success',
              });
              console.log("statat", item.data.data);
              setList((newArr: any) => {
                return newArr.map((items: any) => {
                  if (items.id === item.data.data.appointmentId) {
                    items.status = item.data.data.status;
                  }
                  return { ...items };
                });
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
    } else if (option === 'Reschedule') {
      // const currentDate = dayjs();
      // const formattedDate = currentDate.format('YYYY-MM-DD');
      // const isSameOrAfter = currentDate.isSame(formattedDate, 'year') || currentDate.isAfter(formattedDate, 'year');
      // console.log("isS",isSameOrAfter);

      // if (isSameOrAfter) {
      setOpenRescheduleFormDialog(true)
      // } else {
      //   setIsNotify(true);
      //   setNotifyMessage({
      //     text: "You can't reschedule on previous date",
      //     type: 'warning',
      //   });
    } else if (option === "Detail") {
      navigate(`../detail/${actionMenuItemid}`)
    }
    // }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Employee List')) {
      Service.VisitList(authState.user.tenant, page, rowsPerPage)
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
    }
  }, [emptyVariable]);

  const createFormHandler = (data: any, type: string) => {
    console.log("dataaaaCREATE", data, type);
    setIsLoader(true);
    if (type === "create") {
      Service.VisitCreate(data)
        .then((item) => {
          if (item.data.success) {
            setOpenFormDialog(false)
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
            setOpenFormDialog(false)
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setOpenFormDialog(false)
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      data.appointmentId = actionMenuItemid
      console.log("daTA", data);
      Service.VisitReschedule(data)
        .then((item: any) => {
          if (item.data.success) {
            setOpenRescheduleFormDialog(false)
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
            setOpenRescheduleFormDialog(false)
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err: Error) => {
          setOpenRescheduleFormDialog(false)
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    }
  };

  const updateFormHandler = (data: any) => {
    console.log("datata", data);
    setIsLoader(true);
    Service.VisitUpdate(data)
      .then((item) => {
        if (item.data.success) {
          console.log("UPDATED", item.data.data);
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === actionMenuItemid) {
              list[i].name = item.data.data.name;
              list[i].note = item.data.data.note;
              list[i].phone = item.data.data.phone;
              list[i].appointmentTime = item.data.data.appointmentTime;
              list[i].appointmentDate = item.data.data.appointmentDate;
              list[i].appointmentService = item.data.data.appointmentService;
              list[i].appointmentProvider = item.data.data.appointmentProvider;
            }
          }
          reset();
        } else {
          setOpenEditFormDialog(false);
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
        setOpenEditFormDialog(false);
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
      // createFormHandler(data);
    }
    else if (openEditFormDialog) {
      setOpenEditFormDialog(false);
      updateFormHandler(data);
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Employee Update Status')) {
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
      <TopBar title="Visit" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Visits
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
                  <th>Appointment Number</th>
                  <th>Service Name</th>
                  <th>Service Description</th>
                  <th>Service Contact Number</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td className='font-bold text-sm'>{item.appointmentNumber}</td>
                        <td className='w-64'>
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
                        <td className=''>{item.note}</td>
                        <td className=''>{item.phone}</td>
                        <td className=''>{dayjs(item.appointmentDate).isValid()
                          ? dayjs(item.appointmentDate)?.format(
                            'MMMM DD, YYYY'
                          )
                          : '--'}</td>
                        <td className=''>
                          {/* {item.appointmentTime.slice(11, item.appointmentTime.indexOf('.'))
                            + " " + dayjs(item.appointmentTime)?.format(
                              'A'
                            )
                          } */}
                          {/* {format(new Date(item.appointmentTime), 'p, dd/mm/yyyy')} */}
                          {dayjs(item.appointmentTime).isValid()
                            ? dayjs(item.appointmentTime)?.format("hh:mm A")
                            : '--'}
                        </td>
                        <td>
                          <span className={`${item.status === "Cancelled" ? "badge badge-danger" : item.status === "Reschedule" ? "badge badge-success" : "badge badge-success"}`}>{item.status}</span>
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              disabled={item.status === "Cancelled" ? true : false}
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
                                setActionMenuItemid(item.id);
                                setActionMenuAnchorEl(event.currentTarget);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
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
        <AppointmentVisitCreatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openRescheduleFormDialog && (
        <AppointmentVisitReschedulePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openRescheduleFormDialog}
          setOpenFormDialog={setOpenRescheduleFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <AppointmentVisitUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
          formData={editDetails}
        />
      )}
    </>
  );
}

export default AppointmentVisitPage;
