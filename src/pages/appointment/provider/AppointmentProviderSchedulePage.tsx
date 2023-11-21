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
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
import { AppointmentProvider, AppointmentProviderSchedule } from '../../../interfaces/app.appointment';
import { useNavigate, useParams } from 'react-router-dom';

function AppointmentProviderSchedulePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const authState: any = useAppSelector((state: any) => state?.authState);
    const dataRole = useAppSelector(
        (state: any) => state?.persisitReducer?.roleState?.role?.permissions
    );
    const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);
    const [weekDays, setWeekDays] = useState<any>([]);
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

    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
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
    } = useForm<AppointmentProviderSchedule>();

    const inputScheduleData = [
        {
            fieldName: 'Start Time',
            id: 'startDateTime',
            placeholder: 'Office in time',
            register,
            watch: watch,
            time: startTime,
            setTime: setStartTime,
            error: errors.startDateTime,
            setValue: setValue,
            type: 'datepicker'
        },
        {
            fieldName: 'End Time',
            id: 'endDateTime',
            placeholder: 'Office out time',
            register,
            watch: watch,
            time: endTime,
            setTime: setEndTime,
            error: errors.endDateTime,
            setValue: setValue,
            type: 'datepicker'
        },
    ]

    const getDate = (date: any) => {
        const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
        const toString = dayjs(date)?.toString().split(' ').pop();
        const timeZone = dayjs(date)?.format('ZZ');
        return `${formatDate} ${toString} ${timeZone}`;
    };

    const handleFormClickOpen = () => {
        if (listingRolePermission(dataRole, 'Employee Create')) {
            // setOpenFormDialog(true);
            if (list.appointmentProviderSchedule?.length < 7) {
                navigate(`../add-schedule/${id}`)
            } else {
                setIsNotify(true);
                setNotifyMessage({
                    text: "Schedule days limit has been completed.",
                    type: 'warning',
                });
            }
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
            Service.ProviderSearchList(
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
            Service.ProviderList(authState.user.tenant, newPage, rowsPerPage).then(
                (item) => {
                    setList(item.data.data.list);
                    setTotal(item.data.data.total);
                }
            );
        } else {
            Service.ProviderSearchList(
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
            Service.ProviderList(authState.user.tenant, newPage, rowsPerPage).then(
                (item) => {
                    setList(item.data.data.list);
                    setTotal(item.data.data.total);
                }
            );
        } else {
            Service.ProviderSearchList(
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

    const deleteHandler = (id: string) => {
        setIsLoader(true);
        const data = {
            updatedBy: authState.user.id,
        };
        console.log(actionMenuItemid);

        // Service.deleteService(actionMenuItemid, data)
        //   .then((item: any) => {
        //     if (item.data.success) {
        //       setIsLoader(false);
        //       setIsNotify(true);
        //       setNotifyMessage({
        //         text: item.data.message,
        //         type: 'success',
        //       });
        //       setList((newArr: any) => {
        //         return newArr.filter(
        //           (newItem: any) => newItem.id !== item.data.data.id
        //         );
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     setIsLoader(false);
        //     setIsNotify(true);
        //     setNotifyMessage({
        //       text: err.message,
        //       type: 'error',
        //     });
        //   });
    };

    const statusCancelHandler = () => {
        deleteHandler(actionMenuItemid);
    };

    const manuHandler = (option: string) => {
        if (option === 'Edit') {
            if (listingRolePermission(dataRole, 'Employee Update')) {
                setIsLoader(true);
                Service.ProviderScheduleEdit(actionMenuItemid).then((item: any) => {
                    if (item.data.success) {
                        setIsLoader(false);
                        console.log("itemmm", item.data.data);

                        setOpenEditFormDialog(true);
                        setStartTime(item.data.data.startTime)
                        setEndTime(item.data.data.endTime)
                        // setValue("startDateTime", item.data.data.startTime)
                        // watch("startDateTime", item.data.data.startTime);
                        // watch("endDateTime", item.data.data.endTime);
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
            if (listingRolePermission(dataRole, 'Employee delete')) {
                setIsLoader(true);
                const data = {
                    id: actionMenuItemid,
                    updatedBy: authState.user.id,
                };
                Service.ProviderScheduleDelete(data)
                    .then((item: any) => {
                        if (item.data.success) {
                            setIsLoader(false);
                            setIsNotify(true);
                            setNotifyMessage({
                                text: item.data.message,
                                type: 'success',
                            });
                            setList((prevList: any) => {
                                return {
                                    ...prevList,
                                    appointmentProviderSchedule: prevList.appointmentProviderSchedule?.filter(
                                        (items: any) => items.id !== item.data.data.id
                                    ),
                                };
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
        // if (listingRolePermission(dataRole, 'Employee List')) {
        Service.ProviderScheduleList(id, page, rowsPerPage)
            .then((item: any) => {
                if (item.data.success) {
                    setIsLoader(false);
                    setList(item.data.data);
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
        // } else {
        //     setIsLoader(false);
        // }
    }, [emptyVariable]);

    const createFormHandler = (data: any) => {
        setIsLoader(true);
        const userData = {
            startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            workDays: weekDays,
            createdBy: authState.user.id
        };
        // console.log("final data", userData)
        Service.ProviderScheduleCreate(userData)
            .then((item) => {
                if (item.data.success) {
                    reset();
                    setStartTime('')
                    setEndTime('')
                    setWeekDays([])
                    setIsLoader(false);
                    setIsNotify(true);
                    setNotifyMessage({
                        text: item.data.message,
                        type: 'success',
                    });
                    setList([item.data.data, ...list]);
                } else {
                    reset();
                    setStartTime('')
                    setEndTime('')
                    setWeekDays([])
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
                setStartTime('')
                setEndTime('')
                setWeekDays([])
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
        const userData = {
            name: data.providerName,
            address: data.address ? data.address : null,
            email: data.email ? data.email : null,
            phone: data.phone,
            cnic: data.cnic,
            updatedBy: authState.user.id
        };
        Service.ProviderUpdate(actionMenuItemid, userData)
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
                            list[i].address = item.data.data.address;
                            list[i].email = item.data.data.email;
                            list[i].phone = item.data.data.phone;
                            list[i].cnic = item.data.data.cnic;
                        }
                    }
                    reset();
                    setStartTime('');
                    setEndTime('');
                } else {
                    reset();
                    setStartTime('');
                    setEndTime('');
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
                setStartTime('');
                setEndTime('');
                setIsLoader(false);
                setIsNotify(true);
                setNotifyMessage({
                    text: err.message,
                    type: 'error',
                });
            });
    };

    const onSubmitDialogBox = (data: any) => {
        if (openFormDialog && weekDays && startTime && endTime) {
            setOpenFormDialog(false);
            createFormHandler(data);
        }
        else if (openEditFormDialog) {
            setOpenEditFormDialog(false);
            // updateFormHandler(data);
        }
    };

    const handleSwitchChange = (event: any, id: string) => {
        if (listingRolePermission(dataRole, 'Appointment Provider Schedule Update Status')) {
            const data = {
                id: id,
                isActive: event.target.checked,
                updatedBy: authState.user.id,
            };
            Service.ProviderScheduleUpdateStatus(data).then((updateItem) => {
                if (updateItem.data.success) {
                    setList((prevList: any) => {
                        return {
                            ...prevList,
                            appointmentProviderSchedule: prevList.appointmentProviderSchedule?.map(
                                (item: any) => {
                                    if (item.id === updateItem.data.data.id) {
                                        return { ...item, isActive: updateItem.data.data.isActive };
                                    }
                                    return item;
                                }
                            ),
                        };
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
            <TopBar title="Schedule" isNestedRoute />
            <div className="container m-auto mt-5">
                <div className="w-full rounded-lg bg-white shadow-lg">
                    <div>
                        <div className='pt-4'>
                            <span className="font-open-sans p-3 text-xl font-semibold text-[#252733]">
                                Provider Details
                            </span>
                        </div>
                        {list ? (
                            <div className="grid w-full gap-3 xl:grid-cols-8 2xl:grid-cols-12">
                                <div className="col-span-4 flex w-full justify-between py-[2rem]">
                                    <div className="flex flex-col px-5">
                                        <div className="flex">
                                            <div className="flex w-full items-center justify-around">
                                                <div className='flex-col w-full items-center'>
                                                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                        Provider Name
                                                    </span>
                                                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                        {list.name}
                                                    </div>
                                                </div>
                                                <div className="flex w-full flex-col">
                                                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                        Status
                                                    </span>
                                                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                        {list.isActive ? (
                                                            <span className="badge badge-success">
                                                                Enabled
                                                            </span>
                                                        ) : (
                                                            <span className="badge badge-danger">
                                                                Disabled
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid w-[100%] grid-cols-2 items-center justify-between">
                                            <div className="mt-4 flex w-full flex-col">
                                                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                    Created Date
                                                </span>
                                                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                    {dayjs(list.createdDate).isValid() ? (
                                                        <>{getDate(list.createdDate)}</>
                                                    ) : (
                                                        '--'
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="mt-4 flex w-full flex-col">
                                                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                        Updated Date
                                                    </span>
                                                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                        {dayjs(list.updatedDate).isValid() ? (
                                                            <>{getDate(list.updatedDate)}</>
                                                        ) : (
                                                            '--'
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex'>
                                            <div className="mt-4 flex w-full flex-col">
                                                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                    Email
                                                </span>
                                                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                    {list.email}
                                                </div>
                                            </div>
                                            <div className="mt-4 flex w-full flex-col">
                                                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                    Phone number
                                                </span>
                                                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                    {list.phone}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex'>
                                            <div className="mt-4 flex w-full flex-col">
                                                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                                                    Cnic
                                                </span>
                                                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                                                    {list.cnic}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="col-span-12 grid items-center justify-center">
                                    <p>No Shop Owner Found!</p>
                                </div>
                            </div>
                        )}
                        <hr />
                    </div>
                    <div className="grid grid-cols-12 px-4 py-5">
                        <div className="col-span-7">
                            <span className="font-open-sans text-xl font-semibold text-[#252733]">
                                All Schedules
                            </span>
                        </div>
                        <div className="col-span-5">
                            <div className="flex flex-row justify-end gap-3">
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
                                    <th>Work Days</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.appointmentProviderSchedule &&
                                    list.appointmentProviderSchedule?.map((item: any, index: number) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="avatar flex flex-row items-center">
                                                        <div className="flex flex-col items-start justify-start">
                                                            <span className="text-sm font-semibold">
                                                                {`${item.workDay}`}
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
                                                <td>{dayjs(item.startTime).isValid()
                                                    ? dayjs(item.startTime).format('HH:mm A')
                                                    : '--'}</td>
                                                <td>{dayjs(item.endTime).isValid()
                                                    ? dayjs(item.endTime).format('HH:mm A')
                                                    : '--'}</td>
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
                                                                setActionMenuItemid(item.id);
                                                                setActionMenuAnchorEl(event.currentTarget);
                                                            }}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Switch
                                                            checked={item.isActive}
                                                            onChange={(
                                                                event: React.ChangeEvent<HTMLInputElement>
                                                            ) => handleSwitchChange(event, item.id)}
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
                    {list.appointmentProviderSchedule?.length < 1 ? (
                        <CustomText noroundedborders text="No Records Found" />
                    ) : null}
                </div>
            </div>
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
            {openFormDialog && (
                <CustomDialog
                    DialogHeader="Add Schedule"
                    inputScheduleData={inputScheduleData}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmitDialogBox}
                    openFormDialog={openFormDialog}
                    setOpenFormDialog={setOpenFormDialog}
                    addScheduleFormat
                    setWeekDays={setWeekDays}
                    weekDays={weekDays}
                    startTime={startTime}
                    endTime={endTime}
                />
            )}
            {openEditFormDialog && (
                <CustomDialog
                    noweekdays
                    addScheduleFormat
                    DialogHeader="Edit Schedule"
                    inputScheduleData={inputScheduleData}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmitDialogBox}
                    openFormDialog={openEditFormDialog}
                    setOpenFormDialog={setOpenEditFormDialog}
                />
            )}
            {/* <CustomersCreatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      />
      <CustomersEditPopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        setEditFormData={setEditFormData}
        callback={updateFormHandler}
        setActionMenuItemid={setActionMenuItemid}
      /> */}
        </>
    );
}

export default AppointmentProviderSchedulePage;
