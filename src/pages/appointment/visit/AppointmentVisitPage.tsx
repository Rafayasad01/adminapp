import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../../components/common/TopBar';
// import CustomersCreatePopup from './CustomersCreatePopup';
// import CustomersEditPopup from './CustomersEditPopup';
import CustomDialog from '../../../components/common/CustomDialog';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { AppUserEmployees } from '../../../interfaces/app-user.interface';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminBranch';
import { listingRolePermission } from '../../../utils/helper';

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
  } = useForm<AppUserEmployees>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputFieldsData = [
    {
      fieldName: 'First Name',
      id: 'first_name',
      placeholder: 'Enter first name',
      register,
      error: errors.first_name,
      type: 'text',
    },
    {
      fieldName: 'Last Name',
      id: 'last_name',
      placeholder: 'Enter last name',
      register,
      error: errors.last_name,
      type: 'text',
    },
    {
      fieldName: 'Email Address',
      id: 'email',
      placeholder: 'Enter email address',
      register,
      error: errors.email,
      type: 'text',
      disable: openEditFormDialog,
    },
    {
      fieldName: 'Password',
      id: 'password',
      placeholder: 'Enter password',
      register,
      error: errors.password,
      type: 'password',
      onclick: handleClickShowPassword,
      showPassVisibility: showPassword,
    },
  ];

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.getListServiceSearch(
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
      Service.getListService(authState.user.tenant, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.getListServiceSearch(
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
      Service.getListService(authState.user.tenant, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.getListServiceSearch(
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
      Service.getListService(authState.user.tenant, page, rowsPerPage)
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
    } else {
      setIsLoader(false);
    }
  }, [emptyVariable]);

  // const createFormHandler = (data: any) => {
  //   setIsLoader(true);
  //   const userData = {
  //     firstName: data.first_name,
  //     lastName: data.last_name,
  //     password: data.password,
  //     email: data.email,
  //     createdBy: authState.user.id,
  //     tenant: authState.user.tenant,
  //   };
  //   Service.create(userData)
  //     .then((item) => {
  //       if (item.data.success) {
  //         reset();
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: item.data.message,
  //           type: 'success',
  //         });
  //         setList([...list, item.data.data]);
  //       } else {
  //         reset();
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: item.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       reset();
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  // const updateFormHandler = (data: any) => {
  //   setIsLoader(true);
  //   const userData = {
  //     firstName: data.first_name,
  //     lastName: data.last_name,
  //     updatedBy: authState.user.id,
  //     tenant: authState.user.tenant,
  //   };
  //   console.log('User', userData);

  //   Service.updateService(getValues('user_id'), userData)
  //     .then((item) => {
  //       if (item.data.success) {
  //         console.log('LISSST', list, item.data.data, getValues('user_id'));
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: item.data.message,
  //           type: 'success',
  //         });
  //         for (let i = 0; i < list.length; i += 1) {
  //           if (list[i].id === getValues('user_id')) {
  //             list[i].firstName = item.data.data.firstName;
  //             list[i].lastName = item.data.data.lastName;
  //           }
  //         }
  //         reset();
  //       } else {
  //         reset();
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: item.data.message,
  //           type: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       reset();
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  const onSubmitDialogBox = (data: any) => {
    if (
      openFormDialog &&
      data.first_name &&
      data.last_name &&
      data.email &&
      data.password
    ) {
      console.log('data', data);
      setOpenFormDialog(false);
      // createFormHandler(data);
    } else if (
      openEditFormDialog &&
      data.first_name &&
      data.last_name &&
      data.email
    ) {
      console.log('dataEdit', data);
      setOpenEditFormDialog(false);
      // updateFormHandler(data);
    }
  };

  // const handleSwitchChange = (event: any, id: string) => {
  //   if (listingRolePermission(dataRole, 'Employee Update Status')) {
  //     const data = {
  //       isActive: event.target.checked,
  //       updatedBy: authState.user.id,
  //     };
  //     Service.updateStatus(id, data).then((updateItem) => {
  //       if (updateItem.data.success) {
  //         setList((newArr: any) => {
  //           return newArr.map((item: any) => {
  //             if (item.id === updateItem.data.data.id) {
  //               item.isActive = updateItem.data.data.isActive;
  //             }
  //             return { ...item };
  //           });
  //         });
  //       }
  //     });
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: NOT_AUTHORIZED_MESSAGE,
  //       type: 'warning',
  //     });
  //   }
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
      <TopBar title="Branches" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Branches
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
                {/* <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add New
                </Button> */}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Branch Name</th>
                  <th>Employee Limit</th>
                  <th>Trial Mode</th>
                  <th>Trail Start Date</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
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
                        <td>
                          {item.maxUserLimit} - {item.userCounts}
                        </td>
                        <td>
                          {dayjs(item.trailStartDate).isValid() ? (
                            <>
                              {dayjs(item.trailStartDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                              <br />
                              {dayjs(item.trailStartDate)?.format('hh:mm:ss A')}
                            </>
                          ) : (
                            '--'
                          )}
                        </td>
                        <td>
                          {item.trialMode ? (
                            <span className="badge badge-success">ON</span>
                          ) : (
                            <span className="badge badge-danger">OFF</span>
                          )}
                        </td>
                        {/* <td>{item.phone}</td> */}
                        {/* <td>{item.postalCode}</td> */}
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
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => navigate(`detail/${item.id}`)}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            {/* <IconButton
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
                            </IconButton> */}
                            {/* <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            /> */}
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
          // callback={statusCancelHandler}
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
      {openFormDialog && (
        <CustomDialog
          DialogHeader="Add Employee"
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          DialogHeader="Edit Employee"
          type="edit"
          specailCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData?.filter(
            (item) => item.id !== 'password'
          )}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
        />
      )}
    </>
  );
}

export default AppointmentVisitPage;
