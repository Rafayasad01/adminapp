import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import CustomOrderPrintLayoutCash from '../../../utils/CustomPrintLayout/CustomAppointmentPrintLayout';
import {
  APPOINTMENT_TYPE,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppointmentVisitCreatePopup from './AppointmentVisitCreatePopup';
import AppointmentVisitReschedulePopup from './AppointmentVisitReschedulePopup';
import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';
import AllAppointment from '../AllAppointment';
import IndividualAppointment from '../IndividualAppointment';
import CustomDropDown from '../../../components/common/CustomDropDown';
import CustomBgDropdown from '../../../components/common/CustomBgDropdown';
import assets from '../../../assets';
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
  const [actionMenuItemid, setActionMenuItemid] = React.useState<any>();
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail', 'Reschedule', 'Edit', 'Cancel'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openRescheduleFormDialog, setOpenRescheduleFormDialog] =
    useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [isPrintEnabled, setPrintEnabled] = useState<any>([]);
  const [selectedPriorityData, setSelectedPriorityData] = useState<any>([]);
  const [priorityData, setPriorityData] = useState<any>([
    {
      text: 'John',
      id: 1,
      imageUrl: assets.images.avatarUser,
    },
    {
      text: 'Thomas',
      id: 2,
      imageUrl: assets.images.avatarUser,
    },
  ]);

  // dropdown
  const [appointmentType, setAppointmentType] = useState({
    text: 'All Appointments',
    icon: GroupsOutlinedIcon,
  });

  const { reset } = useForm<AppointmentVisit>();

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Appointment Create')) {
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
      Service.VisitSearchList(
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
      Service.VisitList(authState.user.tenant, newPage, rowsPerPage).then(
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
      Service.VisitList(authState.user.tenant, newPage, rowsPerPage).then(
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
    if (actionMenuItemid?.status === 'Cancelled') {
      if (option === 'Detail') {
        if (listingRolePermission(dataRole, 'Appointment Detail')) {
          navigate(`../detail/${actionMenuItemid?.id}`);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: NOT_AUTHORIZED_MESSAGE,
            type: 'warning',
          });
        }
      }
    } else if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Appointment Edit')) {
        setIsLoader(true);
        Service.VisitEdit(actionMenuItemid?.id)
          .then((item: any) => {
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
          })
          .catch((err) => {
            setIsLoader(false);
            setOpenEditFormDialog(false);
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
    } else if (option === 'Cancel') {
      if (listingRolePermission(dataRole, 'Appointment Cancel')) {
        setIsLoader(true);
        Service.VisitCancel(actionMenuItemid?.id)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'success',
              });
              // console.log('statat', item.data.data);
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
      if (listingRolePermission(dataRole, 'Appointment Reschedule')) {
        setOpenRescheduleFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Detail') {
      if (listingRolePermission(dataRole, 'Appointment Detail')) {
        navigate(`../detail/${actionMenuItemid?.id}`);
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
    if (appointmentType?.text === 'All Appointments') {
      setPriorityData([
        {
          text: 'John',
          id: 1,
          imageUrl: assets.images.avatarUser,
        },
        {
          text: 'Thomas',
          id: 2,
          imageUrl: assets.images.avatarUser,
        },
      ]);
    }
  }, [appointmentType]);

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Appointment List')) {
      Service.VisitList(authState.user.tenant, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            // console.log('item.data.data.list::::::', item.data.data.list);
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
            setPrintEnabled(item.data.data.list.map(() => false));
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
    // console.log('dataaaaCREATE', data, type);
    setIsLoader(true);
    if (type === 'create') {
      Service.VisitCreate(data)
        .then((item) => {
          if (item.data.success) {
            setOpenFormDialog(false);
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
            setOpenFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setOpenFormDialog(false);
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      data.appointmentId = actionMenuItemid?.id;
      // console.log('daTA', data);
      Service.VisitReschedule(data)
        .then((item: any) => {
          if (item.data.success) {
            setOpenRescheduleFormDialog(false);
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
            setOpenRescheduleFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err: Error) => {
          setOpenRescheduleFormDialog(false);
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
    // console.log('datata', data);
    setIsLoader(true);
    Service.VisitUpdate(data)
      .then((item) => {
        if (item.data.success) {
          // console.log('UPDATED', item.data.data);
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === actionMenuItemid?.id) {
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Appointment" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="flex xl:col-span-7 2xl:col-span-9">
              <div className="mr-6">
                <span className="font-open-sans text-xl font-semibold text-[#252733]">
                  All Appointments
                </span>
              </div>
              <div>
                <CustomBgDropdown
                  appointmentType={appointmentType}
                  setAppointmentType={setAppointmentType}
                  options={APPOINTMENT_TYPE}
                />
              </div>
            </div>
            <div className="grid justify-end xl:col-span-5 2xl:col-span-3">
              <div className="flex gap-3">
                {/* <div className="flex flex-col justify-center">
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
                  <div className="mx-1 w-56 leading-3">
                    <span className="text-xs">
                      <span className="text-sm font-bold">Hint:</span> if you
                      want to search by #Number then you must write only last
                      digit, if its greater then 0.
                    </span>
                  </div>
                </div> */}
                <div className="flex">
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon"
                    onClick={handleFormClickOpen}
                  >
                    <AddOutlinedIcon /> Add New Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <AllAppointment
              appointmentType={appointmentType?.text}
              priorityData={priorityData}
              selectedPriorityData={selectedPriorityData}
              setSelectedPriorityData={setSelectedPriorityData}
              setAppointmentType={setAppointmentType}
            />
          </div>
          {/* <div className='mt-5'>
            <IndividualAppointment />
          </div> */}
          {/* <div className="grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>#Number</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Appoint Time</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-sm font-bold">
                          {item.appointmentNumber}
                        </td>
                        <td className="w-64">
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.name}`}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.createdDate).isValid()
                                  ? dayjs(item.createdDate)?.format(
                                      'MMM DD, YYYY'
                                    )
                                  : '--'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="">{item.phone}</td>
                        <td className="">
                          {dayjs(item.appointmentTime).isValid() ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-normal text-secondary">
                                {dayjs(item.appointmentTime)?.format('hh:mm A')}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.appointmentTime)?.format(
                                  'ddd, MMM DD, YYYY'
                                )}
                              </span>
                            </div>
                          ) : (
                            '----'
                          )}
                        </td>
                        <td>
                          ${Number(item.grandTotal.toString()).toFixed(2)}
                        </td>
                        <td>
                          <span
                            className={`${
                              item.status === 'Cancelled'
                                ? 'badge badge-danger'
                                : item.status === 'Reschedule'
                                ? 'badge badge-success'
                                : 'badge badge-success'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-row-reverse items-center">
                            <IconButton
                              // disabled={item.status === 'Cancelled'}
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
                                setActionMenuItemid(item);
                                setActionMenuAnchorEl(event.currentTarget);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <div>
                              <CustomOrderPrintLayoutCash
                                isPrintEnabled={isPrintEnabled}
                                setPrintEnabled={setPrintEnabled}
                                data={item}
                                index={index}
                              />
                            </div>
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
          </div> */}
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
