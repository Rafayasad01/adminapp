import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import CustomOrderPrintLayoutCash from '../../../utils/CustomPrintLayout/CustomAppointmentPrintLayout';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppointmentProviderDetailPopup from './AppointmentProviderDetailPopup';
// import AppointmentVisitCreatePopup from './AppointmentVisitCreatePopup';
// import AppointmentVisitReschedulePopup from './AppointmentVisitReschedulePopup';
// import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';
// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

function AppointmentProviderByIdPage() {
  const navigate = useNavigate();
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
  const [popUplist, setPopUpList] = useState<any>([]);
  const [editDetails, setEditDetails] = useState<any>();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [actionMenuItemid, setActionMenuItemid] = React.useState<any>();
  // const [actionMenuAnchorEl, setActionMenuAnchorEl] =
  //     useState<null | HTMLElement>(null);
  // const actionMenuOpen = Boolean(actionMenuAnchorEl);
  // const actionMenuOptions = ['Detail'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openRescheduleFormDialog, setOpenRescheduleFormDialog] =
    useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [isPrintEnabled, setPrintEnabled] = useState<any>([]);

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
      Service.ProviderTodaysList(
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

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Appointment List')) {
      Service.ProviderTodaysList(providerId, search, page, rowsPerPage)
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

  const handleDetailDialog = (id: string) => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Employee List')) {
      Service.VisitDetailById(id)
        .then((item: any) => {
          if (item.data.success) {
            setOpenFormDialog(true);
            setIsLoader(false);
            setPopUpList(item.data.data);
            // setTotal(item.data.data.total);
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
      <TopBar isNestedRoute title="Today's Appointment" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="xl:col-span-7 2xl:col-span-9">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Today's Appointments
              </span>
            </div>
            <div className="grid justify-end xl:col-span-5 2xl:col-span-3">
              <div className="flex gap-3">
                <div className="flex flex-col justify-center">
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
                </div>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon h-[42%]"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-none">
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
                          <div
                            onClick={() => handleDetailDialog(item.id)}
                            className="mr-5 flex cursor-pointer flex-row-reverse items-center"
                          >
                            <WysiwygIcon />
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
      {openFormDialog && (
        <AppointmentProviderDetailPopup
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          list={popUplist}
        />
      )}
      {/* {cancelDialogOpen && (
                <PermissionPopup
                    type="shock"
                    open={cancelDialogOpen}
                    setOpen={setCancelDialogOpen}
                    dialogText={dialogText}
                    callback={statusCancelHandler}
                />
            )} */}
      {/* {actionMenuAnchorEl && (
                <ActionMenu
                    open={actionMenuOpen}
                    anchorEl={actionMenuAnchorEl}
                    setAnchorEl={setActionMenuAnchorEl}
                    options={actionMenuOptions}
                    callback={manuHandler}
                />
            )} */}
      {/* {openFormDialog && (
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
      )} */}
    </>
  );
}

export default AppointmentProviderByIdPage;
