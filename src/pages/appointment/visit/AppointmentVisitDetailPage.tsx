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
import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useParams } from 'react-router-dom';
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
import {
  AppointmentProvider,
  AppointmentService,
  AppointmentVisit,
} from '../../../interfaces/app.appointment';
import AppointmentVisitCreatePopup from './AppointmentVisitCreatePopup';
import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';
import AppointmentVisitReschedulePopup from './AppointmentVisitReschedulePopup';
import CustomButton from '../../../components/common/CustomButton';
// import MyPrintComponent from './print';
// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

function AppointmentVisitDetailPage() {
  const { id } = useParams();
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
  const [openRescheduleFormDialog, setOpenRescheduleFormDialog] =
    useState(false);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });

  const inputFieldsData = [
    {
      fieldName: 'Visitor Name',
      id: 'visitName',
      placeholder: 'Enter Visitor name',
      register,
      error: errors.visitName,
      type: 'text',
    },
    {
      fieldName: 'Phone',
      id: 'phone',
      placeholder: 'Enter Phone Number',
      register,
      error: errors.phone,
      maxLetterLimit: 11,
      type: 'text',
    },
    {
      fieldName: 'Visitor Description',
      id: 'note',
      placeholder: 'Enter Visitor Description',
      register,
      error: errors.note,
      type: 'textarea',
      notRequired: true,
    },
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

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Employee List')) {
      Service.VisitDetailById(id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data);
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
    // console.log("dataaaaCREATE", data, type);
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
      data.appointmentId = actionMenuItemid;
      Service.VisitReschedule(data)
        .then((item) => {
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
        .catch((err) => {
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
    console.log('datata', data);
    setIsLoader(true);
    Service.VisitUpdate(data)
      .then((item) => {
        if (item.data.success) {
          console.log('UPDATED', item.data.data);
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
    } else if (openEditFormDialog) {
      setOpenEditFormDialog(false);
      updateFormHandler(data);
    }
  };

  const handleSwitchChange = (event: any, switchid: string) => {
    if (listingRolePermission(dataRole, 'Employee Update Status')) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.ServiceUpdateStatus(switchid, data).then((updateItem) => {
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
      <TopBar isNestedRoute title="Visitor Detail" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          {/* <div className="p-3">
            <div className="flex justify-end">
              <CustomButton
                buttonType="button"
                title="Print Recipt"
                type="submit"
                className="btn-black-fill"
                sx={{
                  padding: '0.375rem 2rem !important',
                  width: '10%',
                  height: '35px',
                }}
              />
            </div>
          </div> */}
          <div className="grid grid-cols-12 gap-4 px-4 py-5">
            <div className="col-span-5 p-3">
              <div className="">
                <span className="font-open-sans text-xl font-bold text-[#252733]">
                  Patient Information
                </span>
              </div>
              <div className="p-3">
                <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
                  <div className="my-4">
                    <span className="text-xl font-semibold uppercase">
                      {list?.name}
                    </span>
                  </div>
                  {list?.status && (
                    <div className="">
                      <span className="badge badge-success">
                        {list?.status}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <p className="text-sm font-semibold">Appointment Number</p>
                  <span className="text-sm">
                    {list?.appointmentNumber ? list?.appointmentNumber : '--'}
                  </span>
                </div>
                <div className="my-2">
                  <p className="text-sm font-semibold">Appointment Time</p>
                  <span className="text-sm">
                    {list?.appointmentTime
                      ? dayjs(list?.appointmentTime).isValid() &&
                        dayjs(list?.appointmentTime).format('hh:mm A')
                      : '--'}
                  </span>
                </div>
                <div className="my-2">
                  <p className="text-sm font-semibold">Appointment Date</p>
                  <span className="text-sm">
                    {list?.appointmentTime
                      ? dayjs(list?.appointmentTime).isValid() &&
                        dayjs(list?.appointmentTime).format('YYYY-MM-DD')
                      : '--'}
                  </span>
                </div>
                <div className="my-2">
                  <p className="text-sm font-semibold">
                    Patient Contact Number
                  </p>
                  <span className="text-sm">
                    {list?.phone ? list?.phone : '--'}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 border-l-[1px] border-[#a6bac8]" />
            <div className="col-span-6 p-3">
              <span className="font-open-sans text-xl font-bold text-[#252733]">
                Doctor Information
              </span>
              <div className="p-3">
                <div className="grid grid-cols-2 items-center">
                  <div className="my-4">
                    <span className="text-xl font-semibold uppercase">
                      {list?.appointmentProvider?.name}
                    </span>
                  </div>
                  <div className="">
                    {list?.appointmentProvider?.isActive ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-danger">InActive</span>
                    )}
                  </div>
                </div>
                {/* <div className='grid grid-cols-2 items-center'> */}
                <div className="">
                  <p className="text-sm font-semibold">Doctor Email</p>
                  <span className="text-sm">
                    {list?.appointmentProvider?.email
                      ? list?.appointmentProvider?.email
                      : '--'}
                  </span>
                </div>
                <div className="my-2">
                  <p className="text-sm font-semibold">Doctor CNIC</p>
                  <span className="text-sm">
                    {list?.appointmentProvider?.cnic
                      ? list?.appointmentProvider?.cnic
                      : '--'}
                  </span>
                </div>
                {/* </div> */}
                {/* <div className='grid grid-cols-4'> */}
                <div className="col-span-2 my-2">
                  <p className="text-sm font-semibold">Appointment Created</p>
                  <span className="text-sm">
                    {list?.appointmentProvider?.createdDate
                      ? dayjs(
                          list?.appointmentProvider?.createdDate
                        ).isValid() &&
                        dayjs(list?.appointmentProvider?.createdDate).format(
                          'hh:mm A'
                        )
                      : '--'}
                  </span>
                </div>
                <div className="col-span-2 my-2">
                  <p className="text-sm font-semibold">Doctor Contact Number</p>
                  <span className="text-sm">
                    {list?.appointmentProvider?.phone
                      ? list?.appointmentProvider?.phone
                      : '--'}
                  </span>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-xl font-semibold">Service Details</p>
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Service Created</th>
                  <th>Service Name</th>
                  <th>Service Description</th>
                  <th>Service Cost</th>
                </tr>
              </thead>
              <tbody>
                {list ? (
                  list?.appointmentService?.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <div className="">
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
                        <td>{item.name}</td>
                        <td>{item.desc ? item.desc : '--'}</td>
                        <td>{item.fees ? `${item.fees}.00` : '--'}</td>
                      </tr>
                    );
                  })
                ) : list?.appointmentService?.length < 1 ? (
                  <CustomText noroundedborders text="No Records Found" />
                ) : null}
              </tbody>
            </table>
            <div className="mt-10 grid grid-cols-12 gap-4">
              <div className="col-span-6 2xl:col-span-8">
                <div className="w-72 rounded-md border-[1px] border-[#a6bac8] p-4">
                  <p className="mb-2 text-base font-bold uppercase">Notes</p>
                  <span className="text-sm">
                    {list?.note ? list?.note : "There's no notes"}
                  </span>
                </div>
              </div>
              <div className="col-span-6 2xl:col-span-4">
                <div className="rounded-md border-[1px] border-[#a6bac8] p-4">
                  <p className="mb-2 text-base font-bold uppercase">
                    Total Cost
                  </p>
                  <p className="text-sm font-medium">
                    {'Sub Total Amount : '}
                    <span className="font-bold">{list.subTotalAmount}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {'Urgent Fee : '}
                    <span className="font-bold">{list.urgentFee}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {'Total Amount : '}
                    <span className="font-bold">{list.totalAmount}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {'GST Percentage : '}
                    <span className="font-bold">{list.gstPercentage}%</span>
                  </p>
                  <p className="text-sm font-medium">
                    {'GST Amount : '}
                    <span className="font-bold">{list.gstAmount}</span>
                  </p>
                  <p className="mt-2 text-lg font-medium">
                    {'Grand Total Amount : '}
                    <span className="font-bold">{list.grandTotal}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentVisitDetailPage;
