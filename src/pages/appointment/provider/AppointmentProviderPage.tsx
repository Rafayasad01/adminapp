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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomButton from '../../../components/common/CustomButton';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentProvider } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppointment';
import PermissionPopup from '../../../utils/PermissionPopup';
import {
  NOT_AUTHORIZED_MESSAGE,
  PATTERN,
  imageAllowedTypes,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppointmentProviderCards from './AppointmentProviderCards';
import CustomSwiperDialog from '../../../components/common/CustomSwiperDialog';

function AppointmentProviderPage() {
  const navigate = useNavigate();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole: any = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [startTime, setStartTime] = useState<dayjs.Dayjs | any>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | any>(null);
  const [weekDays, setWeekDays] = useState<any>([]);
  const [, setSearch] = useState<any>('');
  const [emptyVariable] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  const [rowsPerPage] = React.useState(2000);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Schedule', 'Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [, setIsLoaderPagination] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AppointmentProvider>();

  // image handler
  const handleFileChange = (event: any) => {
    console.log('event', event);
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

  const inputFieldsData = [
    {
      fieldName: 'Provider Name',
      id: 'providerName',
      placeholder: 'Enter provider name',
      register,
      error: errors.providerName,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 150,
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
    {
      fieldName: 'Email',
      id: 'email',
      placeholder: 'Enter email address',
      register,
      error: errors.email,
      type: 'text',
      pattern: PATTERN.CHAR_NUM_DOT_AT,
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
      fieldName: 'Upload',
      id: 'uploadImg',
      placeholder: 'Upload Profile Picture',
      register,
      error: errors.uploadImg,
      type: 'uploadImg',
      onChange: handleFileChange,
      OnClick: handleFileOnClick,
      image,
      setImage,
    },
  ];

  console.log('image', image);

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

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Appointment Provider Create')) {
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

  const statusCancelHandler = () => {
    // deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Appointment Provider Edit')) {
        setIsLoader(true);
        Service.ProviderEdit(actionMenuItemid).then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setValue('providerName', item.data.data.name);
            setValue('address', item.data.data.address);
            setValue('phone', item.data.data.phone);
            setValue('email', item.data.data.email);
            setValue('cnic', item.data.data.cnic);
            // setValue('urgentFee', item.data.data.urgentFee);
            setStartTime(item.data.data.startTime);
            setEndTime(item.data.data.endTime);
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
      if (listingRolePermission(dataRole, 'Appointment Provider Delete')) {
        setIsLoader(true);
        const data = {
          updatedBy: authState.user.id,
        };
        // console.log(actionMenuItemid);
        Service.ProviderDelete(actionMenuItemid, data)
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
    } else if (option === 'Schedule') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Schedule View')
      ) {
        navigate(`../schedule/${actionMenuItemid}`);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Services') {
      if (
        listingRolePermission(dataRole, 'Appointment Provider Service View')
      ) {
        navigate(`../services/${actionMenuItemid}`);
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
    if (listingRolePermission(dataRole, 'Appointment Provider List')) {
      Service.ProviderList(authState.user.tenant, page, rowsPerPage)
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
    // console.log("dadada", data);
    setIsLoader(true);
    const userData = {
      name: data.providerName,
      address: data.address ? data.address : null,
      email: data.email ? data.email : null,
      urgentFee: data.urgentFee ? data.urgentFee : null,
      phone: data.phone,
      cnic: data.cnic,
      startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
      workDays: weekDays,
      createdBy: authState.user.id,
      tenant: authState.user.tenant,
    };
    // console.log('final data', userData);
    Service.ProviderCreate(userData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setStartTime('');
          setEndTime('');
          setWeekDays([]);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
        } else {
          reset();
          setStartTime('');
          setEndTime('');
          setWeekDays([]);
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
        setWeekDays([]);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    // console.log("dtaat updated", data);
    setIsLoader(true);
    const userData = {
      name: data.providerName,
      address: data.address ? data.address : null,
      urgentFee: data.urgentFee ? data.urgentFee : null,
      email: data.email ? data.email : null,
      phone: data.phone,
      cnic: data.cnic,
      updatedBy: authState.user.id,
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

  const onSubmitDialogBox = (data: any) => {
    console.log('🚀 ~ onSubmitDialogBox ~ data:', data);
    handleNextSlide();
    // if (openFormDialog && weekDays && startTime && endTime) {
    //   setOpenFormDialog(false);
    //   createFormHandler(data);
    // } else if (openEditFormDialog) {
    //   if (listingRolePermission(dataRole, 'Appointment Provider Update')) {
    //     setOpenEditFormDialog(false);
    //     updateFormHandler(data);
    //   } else {
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: NOT_AUTHORIZED_MESSAGE,
    //       type: 'warning',
    //     });
    //   }
    // }
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Appointment Provider Update Status')) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.ProviderUpdateStatus(id, data).then((updateItem) => {
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

  const handleViewMore = () => {
    setIsLoaderPagination(true);
    const newPage = page + 1;
    setPage(newPage);
    Service.ProviderList(authState.user.tenant, newPage, rowsPerPage)
      .then((item) => {
        setIsLoaderPagination(false);
        setCurrentList(item.data.data.list);
        setList((prev: any) => [...prev, ...item.data.data.list]);
        setTotal(item.data.data.total);
      })
      .catch((error: Error) => {
        setIsLoaderPagination(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const handleViewLess = () => {
    setIsLoaderPagination(true);
    const newPage = page - 1;
    setPage(newPage);
    Service.ProviderList(authState.user.tenant, newPage, rowsPerPage)
      .then((item) => {
        setIsLoaderPagination(false);
        setList((prev: any) =>
          prev?.filter(
            (el: any) => !currentList.some((items: any) => items.id === el.id)
          )
        );
        setCurrentList(item.data.data.list);
        setTotal(item.data.data.total);
      })
      .catch((error: Error) => {
        setIsLoaderPagination(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
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
      <TopBar title="Provider" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Provider
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
            <CustomText noroundedborders text="No Records Found" />
          ) : null}
          <div className="mt-3 flex w-[100%] justify-end py-3">
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
          </div>
        </div>
      </div>
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          // dialogText={dialogText}
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
        <CustomSwiperDialog
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          swiperRef={swiperRef}
          handleNextSlide={handleNextSlide}
          DialogSliderOne="Add Barber"
          DialogSliderTwo="Add Barber Services"
          DialogSubHeader="Select Schedule"
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
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          DialogHeader="Edit Provider"
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

export default AppointmentProviderPage;
