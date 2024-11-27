import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
// import CustomButton from '../../../components/common/CustomButton';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentProvider } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
// import Service from '../../../services/adminapp/adminAppointment';
import StoreEmployeeService from '../../../services/adminapp/adminStoreEmployee';
// import StoreLovService from '../../../services/adminapp/adminStoreService';
import PermissionPopup from '../../../utils/PermissionPopup';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
  PATTERN,
  imageAllowedTypes,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppointmentProviderCards from './AppointmentProviderCards';
import CustomSwiperDialog from './CustomAddSwiperDialog';
import CustomEditSwiperDialog from './CustomEditSwiperDialog';
import PayrollPopup from './PayrollPopup';
import StaffFileUploadPopup from './StaffFileUploadPopup';

function AppointmentProviderPage() {
  const navigate = useNavigate();
  // const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole: any = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);
  const [weekDays, setWeekDays] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  // const [currentList, setCurrentList] = useState<any>([]);
  const [rowsPerPage] = React.useState(2000);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const [actionMenuOptions, setAcionMenuOptions] = useState<any>([
    // 'Services',
    // 'Attendance',
    // 'Rating',
    // 'Schedule',
    // 'Edit',
    // 'Delete',
  ]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  // const [, setIsLoaderPagination] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [payrollPopup, setPayrollPopup] = useState<boolean>(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Staff ?'
  );
  const [image, setImage] = useState<any>(null);
  const [startServiceTime, setStartServiceTime] = useState<dayjs.Dayjs | any>(
    null
  );
  // // lovs
  // const [catLovlist, setCatLovList] = useState<any>([]);
  // const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  // const [usedCatItemsLovlist, setusedCatItemsLovList] = useState<any>([]);
  // edit formdata
  const [editFormData, setEditFormData] = useState<any>();
  // delete Id's
  const [delIds, setDelIds] = useState<any>([]);

  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // console.log('showPassword', showPassword);

  // const officeTimings = useAppSelector(
  //   (state) => state?.persistedReducer.appState.UserItems
  // );

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<AppointmentProvider>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services', // Name of the array field
    keyName: 'key',
  });

  const renderMenuOptions = () => {
    const constantsOptions: any = ['Services', 'Edit', 'Delete'];
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewEmployeeAttendance
      )
    ) {
      constantsOptions.push('Attendance');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewEmployeeRating
      )
    ) {
      constantsOptions.push('Rating');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewEmployeeSchedule
      )
    ) {
      constantsOptions.push('Schedule');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense
          .viewStoreAppointmentEmployeeDeduction
      )
    ) {
      constantsOptions.push('Deductions');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense
          .viewStoreAppointmentEmployeeCommission
      )
    ) {
      constantsOptions.push('Commissions');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense.viewStoreAppointmentEmployeeBonus
      )
    ) {
      constantsOptions.push('Bonus');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense
          .viewStoreAppointmentEmployeeOvertime
      )
    ) {
      constantsOptions.push('Overtime');
    }

    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense.viewStoreAppointmentEmployeePayroll
      )
    ) {
      constantsOptions.push('Payroll');
    }

    setAcionMenuOptions([...constantsOptions]);
    // return actionMenuOptions;
  };

  useEffect(() => {
    renderMenuOptions();
  }, []);

  // image handler

  const handleFileChange = (event: any) => {
    // console.log('event', event);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(event.target.files[0]);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .png, .jpg, and .jpeg files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setImage(null);
  };

  const [inputFieldsData, setInputFieldsData] = useState([
    {
      fieldName: 'Staff Name',
      id: 'name',
      placeholder: 'Enter Staff name',
      register,
      error: errors.name,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 150,
    },
    {
      fieldName: 'Email',
      id: 'email',
      placeholder: 'Enter email address',
      disable: openEditFormDialog && true,
      notRequired: true,
      register,
      error: errors.email,
      type: 'text',
      pattern: PATTERN.CHAR_NUM_DOT_AT,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Password',
      id: 'password',
      placeholder: 'Enter password',
      register,
      error: errors.password,
      notRequired: true,
      type: 'password',
      setShowPassword,
      onclick: handleClickShowPassword,
      showPassVisibility: showPassword,
      pattern: PATTERN.PASSWORD,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Phone',
      id: 'phone',
      placeholder: 'Enter Phone',
      register,
      error: errors.phone,
      type: 'text',
      pattern: PATTERN.PHONE,
      maxLetterLimit: 15,
    },
    {
      fieldName: 'Cnic',
      id: 'cnic',
      placeholder: 'Enter Cnic',
      register,
      error: errors.cnic,
      type: 'text',
      disable: openEditFormDialog && true,
      maxLetterLimit: 15,
      pattern: PATTERN.ONLY_NUM,
    },
    {
      fieldName: 'DOB',
      id: 'dob',
      placeholder: 'Select DOB',
      register,
      setValue,
      error: errors.dob,
      type: 'datepickeronly',
    },
    {
      fieldName: 'Upload',
      id: 'uploadImg',
      placeholder: 'Upload Profile Picture',
      register,
      error: errors.uploadImg,
      type: 'uploadImg',
      onchange: handleFileChange,
      Onclick: handleFileOnClick,
      image,
      setImage,
    },
    {
      fieldName: 'Address',
      id: 'address',
      placeholder: 'Enter address',
      register,
      error: errors.address,
      type: 'text',
      notRequired: true,
      pattern: PATTERN.ADDRESS_ONLY,
      maxLetterLimit: 250,
    },
    // {
    //   fieldName: 'DOB',
    //   id: 'dob',
    //   placeholder: 'Select DOB',
    //   register,
    //   error: errors.dob,
    //   type: 'text',
    // },
    // {
    //   fieldName: 'Payroll Type',
    //   id: 'payrollType',
    //   defaultValue: 'Select Payroll Type',
    //   control,
    //   register,
    //   setValue,
    //   error: errors.payrollType,
    //   type: 'select',
    //   options: {
    //     role: watch('payrollType'),
    //     roles: [
    //       {
    //         id: 'Both',
    //         name: 'Both',
    //       },
    //       {
    //         id: 'Salary',
    //         name: 'Salary',
    //       },
    //       {
    //         id: 'Commission',
    //         name: 'Commission',
    //       },
    //     ],
    //   },
    // },
    // {
    //   fieldName: 'Salary',
    //   id: 'salary',
    //   placeholder: 'Enter Salary',
    //   register,
    //   error: errors.salary,
    //   type: 'text',
    //   pattern: PATTERN.PHONE,
    //   maxLetterLimit: 15,
    // },
    // {
    //   fieldName: 'Note',
    //   id: 'note',
    //   placeholder: 'Enter your description',
    //   register,
    //   error: errors.note,
    //   type: 'textarea',
    //   notRequired: true,
    //   pattern: PATTERN.CHAR_NUM_SPACE_DASH,
    //   maxLetterLimit: 150,
    // },
  ]);

  useEffect(() => {
    const addionalFields: any = [
      {
        fieldName: 'Payroll Type',
        id: 'payrollType',
        defaultValue: 'Select Payroll Type',
        control,
        register,
        setValue,
        error: errors.payrollType,
        type: 'select',
        options: {
          role: watch('payrollType'),
          roles: [
            {
              id: 'Both',
              name: 'Both',
            },
            {
              id: 'Salary',
              name: 'Salary',
            },
            {
              id: 'Commission',
              name: 'Commission',
            },
          ],
        },
      },
      {
        fieldName: 'Salary',
        id: 'salary',
        placeholder: 'Enter Salary',
        register,
        error: errors.salary,
        type: 'text',
        pattern: PATTERN.PHONE,
        maxLetterLimit: 15,
      },
    ];
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewSalayAppointmentEmployee
      )
    ) {
      // Initialize with base input fields to ensure fields don't duplicate
      let updatedFields = inputFieldsData.filter(
        (field) => field.id !== 'payrollType' && field.id !== 'salary'
      );

      // Add the payrollType field
      updatedFields = [...updatedFields, addionalFields[0]];

      // If payrollType is 'Salary', add the salary field
      if (
        watch('payrollType') === 'Salary' ||
        watch('payrollType') === 'Both'
      ) {
        updatedFields = [...updatedFields, addionalFields[1]];
      }
      // Update the state with the new fields
      setInputFieldsData(updatedFields);
    }
  }, [watch('payrollType')]);

  useEffect(() => {
    const note = {
      fieldName: 'Note',
      id: 'note',
      placeholder: 'Enter your description',
      register,
      error: errors.note,
      type: 'textarea',
      notRequired: true,
      pattern: PATTERN.CHAR_NUM_SPACE_DASH,
      maxLetterLimit: 150,
    };
    setInputFieldsData((prev: any) => [...prev, note]);
  }, []);

  const inputScheduleData = [
    {
      fieldName: 'Start Time',
      id: 'startdatetime',
      placeholder: 'Office in time',
      register,
      watch,
      setValue,
      time: startTime,
      setTime: setStartTime,
      error: errors.startDateTime,
      type: 'datepicker',
    },
    {
      fieldName: 'End Time',
      id: 'enddatetime',
      placeholder: 'Office out time',
      register,
      watch,
      setValue,
      time: endTime,
      setTime: setEndTime,
      error: errors.endDateTime,
      type: 'datepicker',
    },
  ];

  // const catLovService = () => {
  //   StoreLovService.StoreCatLov()
  //     .then((res) => {
  //       if (res.data.success) {
  //         setCatLovList(res.data.data);
  //       } else {
  //         setCatLovList([]);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: res.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setCatLovList([]);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  const handleFormClickOpen = async () => {
    // reset();
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.addEmployee
      )
    ) {
      setOpenFormDialog(true);
      // catLovService();
      remove();
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleFormClickDocOpen = async () => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.addEmployee
      )
    ) {
      setOpenFileDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  // const getCatItems = async (id: any) => {
  //   await StoreLovService.StoreCatItemsLov(id)
  //     .then((res) => {
  //       if (res.data.success) {
  //         setCatItemsLovList(res.data.data);
  //         const uniqueData = res.data.data.filter(
  //           (item: any) =>
  //             !usedCatItemsLovlist.some(
  //               (existingItem: any) => existingItem.id === item.id
  //             )
  //         );
  //         setusedCatItemsLovList([...usedCatItemsLovlist, ...uniqueData]);
  //       } else {
  //         setCatItemsLovList([]);
  //       }
  //       // console.log("res items", res.data.data);
  //     })
  //     .catch((err: any) => {
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'warning',
  //       });
  //     });
  // };

  // useEffect(() => {
  //   if (
  //     getValues('categoryId') !== undefined &&
  //     getValues('categoryId') !== 'none'
  //   ) {
  //     getCatItems(watch('categoryId'));
  //     // console.log("hit");
  //   }
  // }, [watch('categoryId')]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      StoreEmployeeService.StoreEmployeeAllList(
        // authState.user.tenant,
        searchTxt,
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
      isDeleted: true,
    };
    // console.log(actionMenuItemid);
    StoreEmployeeService.StoreEmployeeDelete(id, data)
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
          let newtotal = total;
          setTotal((newtotal -= 1));
        } else {
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
  };

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.editEmployee
        )
      ) {
        setIsLoader(true);
        StoreEmployeeService.StoreEmployeeFind(actionMenuItemid)
          .then((item: any) => {
            if (item.data.success) {
              // catLovService();
              setImage(null);
              setIsLoader(false);
              setEditFormData(item.data.data);
              setValue('name', item.data.data.name);
              setValue('address', item.data.data.address);
              setValue('phone', item.data.data.phone);
              setValue('email', item.data.data.email);
              setValue('cnic', item.data.data.cnic);
              setValue('note', item.data.data.note);
              setValue('salary', Number(item.data.data.salary).toFixed(0));
              setValue('dob', dayjs(item.data.data.dob).format('YYYY-MM-DD'));
              setValue('payrollType', item.data.data.payrollType ?? 'none');
              setOpenEditFormDialog(true);
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
    } else if (option === 'Delete') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.deleteEmployee
        )
      ) {
        setCancelDialogOpen(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Schedule') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewEmployeeSchedule
        )
      ) {
        navigate(`../schedule/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Attendance') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewEmployeeAttendance
        )
      ) {
        navigate(`../attendance/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Services') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewEmployees
        )
      ) {
        navigate(`../services/list/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Rating') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewEmployeeRating
        )
      ) {
        navigate(`../review/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Deductions') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense
            .viewStoreAppointmentEmployeeDeduction
        )
      ) {
        navigate(`../deduction/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Commissions') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense
            .viewStoreAppointmentEmployeeCommission
        )
      ) {
        navigate(`../commission/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Bonus') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense.viewStoreAppointmentEmployeeBonus
        )
      ) {
        navigate(`../bonus/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Overtime') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense
            .viewStoreAppointmentEmployeeOvertime
        )
      ) {
        navigate(`../overtime/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Payroll') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense
            .viewStoreAppointmentEmployeePayroll
        )
      ) {
        setPayrollPopup(true);
        // navigate(`../overtime/${actionMenuItemid}`);
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
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.viewEmployees
      )
    ) {
      StoreEmployeeService.StoreEmployeeAllList(search, page, rowsPerPage)
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
  }, [null]);

  const swiperRef = useRef<any>(null);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  useEffect(() => {
    const length = Object.keys(errors)?.length;
    if (length > 0) handlePrevSlide();
  }, [errors]);

  const onSubmitUpdateDialogBox = async (data: any) => {
    // console.log('Update data', data);
    setIsLoader(true);
    delete data.services;
    delete data.servicesName;
    delete data.servicesAmount;
    delete data.price;
    delete data.categoryId;
    delete data.servicesId;
    delete data.mints;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('cnic', data.cnic);
    formData.append('salary', data.salary);
    formData.append('note', data.note);
    if (data.password) formData.append('password', data.password);
    formData.append('dob', dayjs(data.dob).format('YYYY-MM-DD'));
    // formData.append('services', JSON.stringify(data.services));
    formData.append('payrollType', data.payrollType || 'None');
    formData.append('deletedIds', JSON.stringify(delIds));
    if (image) formData.append('avatar', image);
    if (data) {
      StoreEmployeeService.StoreEmployeeUpdate(formData, actionMenuItemid)
        .then((res) => {
          if (res.data.success) {
            setIsLoader(false);
            setOpenEditFormDialog(false);
            // console.log('res', res.data.data);
            for (let i = 0; i < list.length; i += 1) {
              if (list[i].id === res.data.data.id) {
                list[i].name = res.data.data.name;
                list[i].address = res.data.data.address;
                list[i].email = res.data.data.email;
                list[i].phone = res.data.data.phone;
                list[i].cnic = res.data.data.cnic;
              }
            }
            remove();
            setIsNotify(true);
            setNotifyMessage({
              text: res.data.message,
              type: 'success',
            });
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: res.data.message,
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
        text: 'All fields are required',
        type: 'error',
      });
    }
  };

  const onSubmitDialogBox = async (data: any) => {
    setIsLoader(true);
    delete data.servicess;
    delete data.servicesName;
    delete data.servicesAmount;
    delete data.price;
    delete data.categoryId;
    delete data.servicesId;
    delete data.mints;

    // console.log(`onSubmitDialogBox -> data:`, data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('cnic', data.cnic);
    formData.append('password', data.password);
    formData.append('salary', data.salary ? data.salary : 0);
    formData.append('dob', dayjs().format('YYYY-MM-DD'));
    formData.append('note', data.note);
    if (image) formData.append('avatar', image);
    // formData.append('services', JSON.stringify(data.services));
    formData.append('payrollType', data.payrollType || 'None');
    formData.append('workDays', JSON.stringify(weekDays));
    formData.append(
      'startTime',
      dayjs(startTime).utc().format('YYYY-MM-DD HH:mm:ss')
    );
    formData.append(
      'endTime',
      dayjs(endTime).utc().format('YYYY-MM-DD HH:mm:ss')
    );
    if (weekDays && startTime && endTime) {
      StoreEmployeeService.StoreEmployeeCreate(formData)
        .then((res) => {
          if (res.data.success) {
            setIsLoader(false);
            setOpenFormDialog(false);
            setList((prev: any) => [res.data.data, ...prev]);
            setIsNotify(true);
            setNotifyMessage({
              text: res.data.message,
              type: 'success',
            });
            reset();
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: res.data.message,
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
        text: `Must add Schedule`,
        type: 'error',
      });
    }
    return null;
    // handleNextSlide();
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.editEmployee
      )
    ) {
      const data = {
        isActive: event.target.checked,
      };
      StoreEmployeeService.StoreEmployeeUpdateStatus(id, data).then(
        (updateItem) => {
          if (updateItem.data.success) {
            setList((newArr: any) => {
              return newArr.map((item: any) => {
                if (item.id === updateItem.data.data.id) {
                  item.isActive = updateItem.data.data.isActive;
                }
                return { ...item };
              });
            });
          } else {
            setIsNotify(true);
            setNotifyMessage({
              text: updateItem.data.message,
              type: 'error',
            });
          }
        }
      );
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const createFileHandler = (data: any) => {
    // setIsLoader(true);
    const formData = new FormData();
    if (data.file !== null) formData.append('file', data.file);
    formData.append('name', data.name);
    StoreEmployeeService.StoreEmployeeFileUpload(formData)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          // setList([item.data.data, ...list]);
        } else {
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
  };

  // const handleViewMore = () => {
  //   setIsLoaderPagination(true);
  //   const newPage = page + 1;
  //   setPage(newPage);
  //   Service.ProviderList(authState.user.tenant, newPage, rowsPerPage)
  //     .then((item) => {
  //       setIsLoaderPagination(false);
  //       setCurrentList(item.data.data.list);
  //       setList((prev: any) => [...prev, ...item.data.data.list]);
  //       setTotal(item.data.data.total);
  //     })
  //     .catch((error: Error) => {
  //       setIsLoaderPagination(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: error.message,
  //         type: 'error',
  //       });
  //     });
  // };

  // const handleViewLess = () => {
  //   setIsLoaderPagination(true);
  //   const newPage = page - 1;
  //   setPage(newPage);
  //   Service.ProviderList(authState.user.tenant, newPage, rowsPerPage)
  //     .then((item) => {
  //       setIsLoaderPagination(false);
  //       setList((prev: any) =>
  //         prev?.filter(
  //           (el: any) => !currentList.some((items: any) => items.id === el.id)
  //         )
  //       );
  //       setCurrentList(item.data.data.list);
  //       setTotal(item.data.data.total);
  //     })
  //     .catch((error: Error) => {
  //       setIsLoaderPagination(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: error.message,
  //         type: 'error',
  //       });
  //     });
  // };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Staff" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-5">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Staffs
              </span>
            </div>
            <div className="col-span-7">
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickDocOpen}
                >
                  <AddOutlinedIcon /> Upload File
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="p-5">
            <AppointmentProviderCards
              data={list}
              handleSwitchChange={handleSwitchChange}
              setActionMenuItemid={setActionMenuItemid}
              setActionMenuAnchorEl={setActionMenuAnchorEl}
              actionMenuOpen={actionMenuOpen}
            />
          </div>
          {list?.length < 1 ? (
            <CustomText noRoundedBorders text="No Records Found" />
          ) : null}
          {/* <div className="mt-3 flex w-[100%] justify-end py-3">
            {list?.length > rowsPerPage && (
              <CustomButton
                onclick={handleViewLess}
                className="bg-transparent text-sm font-light lowercase text-primary shadow-none"
                title="View less"
                buttonType="button"
              />
            )}
            {list?.length !== total && (
              <CustomButton
                onclick={handleViewMore}
                className="bg-transparent text-sm font-light lowercase text-primary shadow-none"
                title="View more"
                buttonType="button"
              />
            )}
          </div> */}
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
      {payrollPopup && (
        <PayrollPopup
          payrollDialog={payrollPopup}
          setPayrollDialog={setPayrollPopup}
          empData={
            list?.length > 0
              ? list?.find((x: any) => x.id === actionMenuItemid)
              : null
          }
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
        <CustomSwiperDialog
          control={control}
          errors={errors}
          setError={setError}
          register={register}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          append={append}
          remove={remove}
          swiperRef={swiperRef}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          handleNextSlide={handleNextSlide}
          handlePrevSlide={handlePrevSlide}
          ServicesFields={fields}
          DialogSliderOne="Add Staff"
          DialogSliderTwo="Add Staff Services"
          DialogSubHeader="Select Schedule"
          img={image}
          inputFieldsData={inputFieldsData}
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
          setStartServiceTime={setStartServiceTime}
          startServiceTime={startServiceTime}
          setInputFieldsData={setInputFieldsData}
          // catLov={catLovlist}
          // catItemsLov={catItemsLovlist}
          // usedCatItemsLovlist={usedCatItemsLovlist}
        />
      )}
      {openEditFormDialog && (
        <CustomEditSwiperDialog
          type="edit"
          reset={reset}
          editFormData={editFormData}
          control={control}
          errors={errors}
          setError={setError}
          register={register}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          append={append}
          remove={remove}
          swiperRef={swiperRef}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          handleNextSlide={handleNextSlide}
          handlePrevSlide={handlePrevSlide}
          ServicesFields={fields}
          DialogSliderOne="Edit Staff"
          DialogSliderTwo="Edit Staff Services"
          img={image}
          inputFieldsData={inputFieldsData?.filter(
            (item) => item.id !== 'password'
          )}
          inputScheduleData={inputScheduleData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitUpdateDialogBox}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          setStartServiceTime={setStartServiceTime}
          startServiceTime={startServiceTime}
          setInputFieldsData={setInputFieldsData}
          // catLov={catLovlist}x
          // catItemsLov={catItemsLovlist}
          // usedCatItemsLovlist={usedCatItemsLovlist}
          // setUsedCatItemsLovlist={setusedCatItemsLovList}
          setDelIds={setDelIds}
        />
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
      {openFileDialog && (
        <StaffFileUploadPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFileDialog}
          setOpenFormDialog={setOpenFileDialog}
          callback={createFileHandler}
        />
      )}
    </>
  );
}

export default AppointmentProviderPage;
