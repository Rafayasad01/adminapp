/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import TopBar from '../../components/common/TopBar';
import DriversCreatePopup from './DriversCreatePopup';
import DriversEditPopup from './DriversEditPopup';
import driver from '../../services/adminapp/adminDriver';
import { useAppSelector } from '../../redux/redux-hooks';

import ActionMenu from '../../components/common/ActionMenu';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import CustomTable from '../../components/common/CustomTable';
import CustomersCreatePopup from '../customers/CustomersCreatePopup';
import CustomersEditPopup from '../customers/CustomersEditPopup';
import CustomDialog from '../../components/common/CustomDialog';
import PermissionPopup from '../../utils/PermissionPopup';

import { AppUserDriverExt } from '../../interfaces/app-user.interface';
import { CheckRolePermission, listingRolePermission } from '../../utils/helper';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';

function DriversPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const dataRole = useSelector(
    (state: any) => state.roleState.role.permissions
  );
  const navigate = useNavigate();
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail', 'Address', 'Schedule', 'Edit', 'Delete'];
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [editFormData, setEditFormData] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [dialogText, setDialogText] = useState<any>(
    'Are you sure you want to delete this driver ?'
  );

  // boolean states
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);

  // pagination states
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<AppUserDriverExt>();

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Driver List')) {
      driver
        .getListService(authState.user.tenant, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
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
    }
  }, [authState, page, rowsPerPage]);

  // functions handling
  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Driver Create')) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const createFormHandler = (data: any) => {
    console.log("driverOBJ", data, authState);
    setIsLoader(true);
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phone', data.phone);
    formData.append('license_number', data.license_number);
    formData.append('address', data.address);
    formData.append('tenant', authState.user.tenant);
    formData.append('created_by', authState.user.id);
    formData.append('updated_by', authState.user.id);
    if (data.avatar !== null) formData.append('avatar', data.avatar);
    driver
      .create(formData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setAvatar(null);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([...list, item.data.data]);
        } else {
          reset();
          setAvatar(null);
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
        setAvatar(null);
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
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', data.phone);
    formData.append('license_number', data.license_number);
    formData.append('updated_by', authState.user.id);
    if (data.avatar !== null) formData.append('avatar', data.avatar);
    driver
      .updateService(actionMenuItemid, formData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setAvatar(null);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i = +1) {
            if (list[i].id === actionMenuItemid) {
              list[i].firstName = item.data.data.first_name;
              list[i].lastName = item.data.data.last_name;
              list[i].licenseNumber = item.data.data.license_number;
              list[i].phone = item.data.data.phone;
              if (data.avatar !== null) list[i].phone = item.data.data.avatar;
            }
          }
        } else {
          reset();
          setAvatar(null);
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
        setAvatar(null);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  // get edit data by id
  const editHandler = (id: string) => {
    reset();
    driver.getService(id).then((item: any) => {
      if (item.data.success) {
        setOpenEditFormDialog(true);
        console.log('edit data', item.data);
        setValue('first_name', item.data.data.firstName);
        setValue('last_name', item.data.data.lastName);
        setValue('email', item.data.data.email);
        setValue('phone', item.data.data.phone);
        setValue('license_number', item.data.data.licenseNumber);
        if (item && item.data.data.avatar) {
          let newAvatar = item.data.data.avatar.split('/').slice(-1)[0];
          const regexExp = /[a-z,0-9,-]{36}/;
          if (regexExp.test(newAvatar)) {
            newAvatar = newAvatar.split('-').splice(5)[0].at(0);
          }
          setAvatar({ name: newAvatar });
        }
      }
    });
  };

  // deleting functionality
  const deleteEntity = (id: string) => {
    setIsLoader(true);
    const data = {
      is_active: false,
      is_deleted: true,
      updated_by: authState.user.id,
    };
    driver
      .deleteService(id, data)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.filter((newItem: any) => newItem.id !== id);
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
  };

  // menu handling
  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Driver Update')) {
        editHandler(actionMenuItemid);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Delete') {
      if (listingRolePermission(dataRole, 'Driver Delete')) {
        deleteEntity(actionMenuItemid);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Address') {
      CheckRolePermission(
        'Driver Address Detail',
        dataRole,
        navigate,
        `address/${actionMenuItemid}`
      );
      // navigate(`address / ${ actionMenuItemid }`);
    } else if (option === 'Schedule') {
      CheckRolePermission(
        'Driver Schedule Detail',
        dataRole,
        navigate,
        `schedule/${actionMenuItemid}`
      );
      // navigate(`schedule / ${actionMenuItemid}`);
    } else if (option === 'Detail') {
      CheckRolePermission(
        'Driver Detail',
        dataRole,
        navigate,
        `detail/${actionMenuItemid}`
      );
      // navigate(`detail / ${actionMenuItemid}`);
    }
  };

  // search handling
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

  // uploader functionlity
  const handleFileChange = (event: any) => {
    setAvatar(event.target.files[0]);
  };
  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setAvatar(null);
  };

  const statusCancelHandler = () => {
    deleteEntity(actionMenuItemid);
  };

  // fields for dialog
  const inputFieldsData = [
    {
      fieldName: 'First Name',
      id: 'first_name',
      register,
      error: errors.first_name,
      type: 'text',
    },
    {
      fieldName: 'Last Name',
      id: 'last_name',
      register,
      error: errors.last_name,
      type: 'text',
    },
    {
      fieldName: 'Email Address',
      id: 'email',
      register,
      error: errors.email,
      type: 'text',
    },
    {
      fieldName: 'Password',
      id: 'password',
      register,
      error: errors.password,
      type: 'password',
      onclick: handleClickShowPassword,
      showPassVisibility: showPassword,
    },
    {
      fieldName: 'Contact Number',
      id: 'phone',
      register,
      error: errors.phone,
      type: 'text',
    },
    {
      fieldName: 'License Number',
      id: 'license_number',
      register,
      error: errors.license_number,
      type: 'text',
    },
    {
      fieldName: 'Address',
      id: 'address',
      register,
      error: errors.address,
      type: 'text',
    },
    {
      fieldName: 'Upload Image',
      id: 'upload',
      register,
      onclick: handleFileOnClick,
      onchange: handleFileChange,
      avatar,
      setAvatar,
    },
  ];

  // submit dialog callback
  const onSubmitDialogBox = (data: AppUserDriverExt) => {
    console.log('datass', data, avatar);
    if (
      data.first_name &&
      data.last_name &&
      data.email &&
      data.phone &&
      data.license_number &&
      data.address
    ) {
      const licenseNumber = data.license_number.replace(/\s+/g, '');
      data.avatar = avatar;
      data.license_number = licenseNumber;
      setOpenFormDialog(false);
      createFormHandler(data);
    } else if (
      openEditFormDialog &&
      data.first_name &&
      data.last_name &&
      data.email &&
      data.phone &&
      data.license_number
    ) {
      const licenseNumber = data.license_number.replace(/\s+/g, '');
      data.avatar = avatar;
      data.license_number = licenseNumber;
      setOpenEditFormDialog(false);
      updateFormHandler(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required, Except avater image!',
        type: 'error',
      });
    }
  };

  return isLoader ? (
    <Loader />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Drivers" />
      <div className="align-center flex justify-center">
        <CustomTable
          tableHeader="All Drivers"
          tableDataTitle={[
            'Drivers',
            'Phone',
            'Email',
            'Availability',
            'License Number',
            'Status',
          ]}
          list={list}
          setList={setList}
          isSearch
          isAddButton
          actions="both"
          service={driver}
          search={search}
          setSearch={setSearch}
          handleFormClickOpen={handleFormClickOpen}
          handleClickSearch={handleClickSearch}
          actionMenuOpen={actionMenuOpen}
          setActionMenuAnchorEl={setActionMenuAnchorEl}
          setActionMenuItemid={setActionMenuItemid}
          page={page}
          setPage={setPage}
          total={total}
          setTotal={setTotal}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          serviceName="Driver Update Status"
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
        />
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

      <CustomDialog
        DialogHeader="Add Drivers"
        inputFieldsData={inputFieldsData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitDialogBox}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
      />

      <CustomDialog
        DialogHeader="Edit Drivers"
        type="edit"
        reset={reset}
        inputFieldsData={
          openEditFormDialog
            ? inputFieldsData.filter(
              (item) => item.id !== 'address' && item.id !== 'password'
            )
            : inputFieldsData
        }
        handleSubmit={handleSubmit}
        onSubmit={onSubmitDialogBox}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        setAvater={setAvatar}
      />
      {/* <DriversCreatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      /> */}
      {/* <DriversEditPopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        setEditFormData={setEditFormData}
        callback={updateFormHandler}
      /> */}
    </LocalizationProvider>
  );
}

export default DriversPage;
