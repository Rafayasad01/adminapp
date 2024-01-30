import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppUser';
import PermissionPopup from '../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import AppUserCreatePopup from './AppUserCreatePopup';
import AppUserOtherTab from './AppUserOtherTab';
import AppUserTab from './AppUserTab';
import AppUserUpdatePopup from './AppUserUpdatePopup';
// import CustomersCreatePopup from './CustomersCreatePopup';
// import CustomersEditPopup from './CustomersEditPopup';

function AppUsersPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState<any>('');
  // const [actionMenuAnchorEl, setActionMenuAnchorEl] =
  //   useState<null | HTMLElement>(null);
  // const actionMenuOpen = Boolean(actionMenuAnchorEl);
  // const actionMenuOptions = ['Detail', 'History', 'Edit', 'Delete'];
  const [emptyVariable] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this customer ?'
  );
  const [selectedTab, setSelectedTab] = useState('APP USER');

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const appUserRoleLov = [
    {
      id: 'Driver',
      name: 'Driver',
    },
    {
      id: 'App',
      name: 'App User',
    },
  ];

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Customer Create')) {
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
      Service.appListSearch(
        authState.user.tenant,
        selectedTab === 'APP USER' ? 'App' : 'Other',
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
      id,
      updated_by: authState.user.id,
    };
    Service.appUserDelete(data)
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
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid?.id);
  };

  useEffect(() => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Customer List')) {
      Service.appList(
        authState.user.tenant,
        selectedTab === 'APP USER' ? 'App' : 'Other',
        page,
        rowsPerPage
      )
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
          } else {
            setIsLoader(false);
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
  }, [emptyVariable, selectedTab]);

  const createFormHandler = (data: any) => {
    // setIsLoader(true);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
      phone: data.phone ? data.phone : null,
      address: data.address,
      userType: data.appuserRole,
      postalCode: data.postalCode ? data.postalCode : null,
      licenseNumber: data.licenseNumber ? data.licenseNumber : null,
      tenant: authState.user.tenant,
      createdBy: authState.user.id,
    };

    let dataRender = false;
    if (data.appuserRole === 'Driver' && selectedTab === 'OTHER') {
      dataRender = true;
    } else if (data.appuserRole === 'App' && selectedTab === 'APP USER') {
      dataRender = true;
    }
    Service.appCreateUser(formData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          if (dataRender) {
            setList([...list, item.data.data]);
          }
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

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = {
      id: actionMenuItemid?.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone ? data.phone : null,
      userType: data.appuserRole,
      postalCode: data.postalCode ? data.postalCode : null,
      licenseNumber: data.licenseNumber ? data.licenseNumber : null,
      updatedBy: authState.user.id,
    };
    let dataRender = false;
    if (data.appuserRole === 'Driver' && selectedTab === 'OTHER') {
      dataRender = true;
    } else if (data.appuserRole === 'App' && selectedTab === 'APP USER') {
      dataRender = true;
    }
    Service.appUpdateUser(formData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          if (dataRender) {
            for (let i = 0; i < list.length; i += 1) {
              if (list[i].id === item.data.data.id) {
                list[i].firstName = item.data.data.firstName;
                list[i].lastName = item.data.data.lastName;
                list[i].phone = item.data.data.phone;
                list[i].postalCode = item.data.data.postalCode;
                list[i].licenseNumber = item.data.data.licenseNumber;
                list[i].userType = item.data.data.userType;
                // if (data.avatar !== null) list[i].avatar = item.data.data.avatar;
              }
            }
          }
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="App Users" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All App Users
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
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="app user" value="APP USER" />
            <Tab label="other" value="OTHER" />
          </Tabs>
          {selectedTab === 'APP USER' && (
            <AppUserTab
              isLoader={isLoader}
              setIsLoader={setIsLoader}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
              page={page}
              search={search}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              actionMenuItemid={actionMenuItemid}
              setActionMenuItemid={setActionMenuItemid}
              setEditFormData={setEditFormData}
              setOpenEditFormDialog={setOpenEditFormDialog}
              isNotify={isNotify}
              setIsNotify={setIsNotify}
              notifyMessage={notifyMessage}
              setNotifyMessage={setNotifyMessage}
            />
          )}
          {selectedTab === 'OTHER' && (
            <AppUserOtherTab
              isLoader={isLoader}
              setIsLoader={setIsLoader}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
              page={page}
              search={search}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              actionMenuItemid={actionMenuItemid}
              setActionMenuItemid={setActionMenuItemid}
              setEditFormData={setEditFormData}
              setOpenEditFormDialog={setOpenEditFormDialog}
              isNotify={isNotify}
              setIsNotify={setIsNotify}
              notifyMessage={notifyMessage}
              setNotifyMessage={setNotifyMessage}
            />
          )}
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
      <AppUserCreatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
        appUserRoleLov={appUserRoleLov}
        selectedTab={selectedTab}
      />
      <AppUserUpdatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        setEditFormData={setEditFormData}
        callback={updateFormHandler}
        setActionMenuItemid={setActionMenuItemid}
        appUserRoleLov={appUserRoleLov}
      />
    </>
  );
}

export default AppUsersPage;
