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
import TopBar from '../../components/common/TopBar';
// import CustomersCreatePopup from './CustomersCreatePopup';
// import CustomersEditPopup from './CustomersEditPopup';
import ActionMenu from '../../components/common/ActionMenu';
import CustomDialog from '../../components/common/CustomDialog';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import { AppUserEmployees } from '../../interfaces/app-user.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import employeeService from '../../services/adminapp/adminEmployee';
import branchService from '../../services/adminapp/adminBranch';
import PermissionPopup from '../../utils/PermissionPopup';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
  PATTERN,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import { getItem } from '../../utils/storage';

function EmployeePage() {
  const authState: any = useAppSelector((state: any) => state?.authState);
  // const employeeLimit: any = useAppSelector(
  //   (state: any) => state?.persistedReducer?.appState?.UserItems?.employeeLimit
  // );
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const branch: any = getItem('BRANCH_DATA');
  const [search, setSearch] = useState<any>('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [branchesLov, setBranchesLov] = useState<any>([]);
  const [branchByIdLov, setBranchByIdLov] = useState<any>([]);
  const [delBranchesId, setDelBranchesId] = useState<any>([]);
  const [storeDelIds, setStoreDelIds] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions: any = ['Edit', 'Delete', 'Remove'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openRemoveFormDialog, setOpenRemoveFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this employee ?'
  );
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppUserEmployees>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [inputFieldsData, setInputFieldsData] = useState([
    {
      fieldName: 'First Name',
      id: 'first_name',
      placeholder: 'Enter first name',
      register,
      error: errors.first_name,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Last Name',
      id: 'last_name',
      placeholder: 'Enter last name',
      register,
      error: errors.last_name,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Email Address',
      id: 'email',
      placeholder: 'Enter email address',
      register,
      error: errors.email,
      type: 'text',
      pattern: PATTERN.CHAR_NUM_DOT_AT,
      maxLetterLimit: 100,
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
      clickType: 'onclick',
      showPassVisibility: showPassword,
      pattern: PATTERN.PASSWORD,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Employee Type',
      id: 'employeeType',
      defaultValue: 'Select Employee Type',
      validateRequired: true,
      control,
      register,
      setValue,
      error: errors.employeeType,
      type: 'select',
      options: {
        role: watch('employeeType'),
        roles: [
          {
            id: 'USER',
            name: 'User',
          },
          {
            id: 'MANAGER',
            name: 'Manager',
          },
        ],
      },
    },
  ]);

  // console.log('fieldsss', inputFieldsData);

  useEffect(() => {
    if (authState.user.userType === 'ShopUser') {
      branchService.getBranchesLov().then((item: any) => {
        if (item.data.success) {
          const filtered = item.data.data.map(({ id, name }: any) => ({
            id,
            name,
          }));
          setBranchesLov(filtered);
        }
      });
    } else {
      setValue('employeeType', 'USER');
    }
  }, [authState.user.userType]);

  // console.log("watch('employeeType')", inputFieldsData);
  const handleFormClickOpen = () => {
    if (
      !listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeUser.viewUserEmployeeType
      )
    ) {
      let fields = [...inputFieldsData];
      fields = fields.filter((field) => field.id !== 'employeeType');
      setInputFieldsData(fields);
    }
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeUser.addUserEmployee)
    ) {
      setValue('first_name', '');
      setValue('last_name', '');
      setValue('email', '');
      if (authState.user.userType === 'ShopUser')
        setValue('employeeType', 'none');
      setValue('branches', []);
      setStoreDelIds([]);
      setDelBranchesId([]);
      setOpenFormDialog(true);
      // if (total < employeeLimit) {
      // } else {
      //   setIsNotify(true);
      //   setNotifyMessage({
      //     text: 'Employees limit has been excceed',
      //     type: 'warning',
      //   });
      // }
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
      if (searchTxt === '' || searchTxt === null || searchTxt === undefined) {
        employeeService.getListService(newPage, rowsPerPage).then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
      } else {
        employeeService
          .getListServiceSearch(searchTxt, newPage, rowsPerPage)
          .then((item) => {
            setList(item.data.data.list);
            setTotal(item.data.data.total);
          });
      }
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      employeeService.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      employeeService
        .getListServiceSearch(search, newPage, rowsPerPage)
        .then((item) => {
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
      employeeService.getListService(newPage, newRowperPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      employeeService
        .getListServiceSearch(search, newPage, newRowperPage)
        .then((item) => {
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
    employeeService
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
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeUser.editUserEmployee
        )
      ) {
        const editData = list.find((x: any) => x.id === actionMenuItemid);
        // console.log('🚀 ~ manuHandler ~ editData:', editData);
        setValue('first_name', editData.firstName);
        setValue('last_name', editData.lastName);
        setValue('email', editData.email);
        setValue('branches', editData.branches);
        setValue(
          'employeeType',
          editData.userType === 'BranchUser' ? 'MANAGER' : 'USER'
        );
        setStoreDelIds(editData.branches);
        setOpenEditFormDialog(true);
        // employeeService.getService(actionMenuItemid).then((item: any) => {
        //   if (item.data.success) {
        //     setIsLoader(false);
        //   }
        // });
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Remove') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeUser.editUserEmployee
        )
      ) {
        const editData = list.find((x: any) => x.id === actionMenuItemid);
        const branchesById = branchesLov.filter((x: any) =>
          editData.branches.includes(x.id)
        );
        setValue('first_name', editData.firstName);
        setValue('last_name', editData.lastName);
        setValue('email', editData.email);
        setValue('branches', []);
        setValue(
          'employeeType',
          editData.userType === 'BranchUser' ? 'MANAGER' : 'USER'
        );
        setBranchByIdLov(branchesById);
        setOpenRemoveFormDialog(true);
      } else {
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
          ALL_PERMISSIONS.storeUser.deleteUserEmployee
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
    }
  };

  useEffect(() => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeUser.viewUserEmployee
      )
    ) {
      employeeService
        .getListService(page, rowsPerPage)
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
  }, [null]);

  // console.log('LIST', list);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const userData = {
      firstName: data.first_name,
      lastName: data.last_name,
      password: data.password,
      email: data.email,
      branch:
        data.employeeType === 'none'
          ? [branch.id]
          : data.employeeType === 'USER'
          ? [branch.id]
          : data.branches,
      employeeType: !listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeUser.viewUserEmployeeType
      )
        ? 'USER'
        : data.employeeType,
    };

    // console.log('ATA', userData);
    employeeService
      .create(userData)
      .then((item) => {
        if (item.data.success) {
          // reset();
          if (item.data.data.userType === 'BranchUser') {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: 'Manager has been created, please check on assigned branch(es)',
              type: 'success',
            });
            return;
          }
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
        } else {
          // reset();
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
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      branch:
        data.employeeType === 'none'
          ? [branch.id]
          : data.employeeType === 'USER'
          ? [branch.id]
          : data.branches,
      branchDelIds: delBranchesId,
      employeeType: data.employeeType,
    };
    // console.log('🚀 ~ createFormHandler ~ datas:', userData);

    employeeService
      .updateService(actionMenuItemid, userData)
      .then((item) => {
        if (item.data.success) {
          // console.log('LISSST', item.data.data.branch);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          const updatedBranchData = branchesLov.filter((x: any) =>
            item.data.data.branch.includes(x.id)
          );
          setValue('branches', updatedBranchData);
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].firstName = item.data.data.firstName;
              list[i].lastName = item.data.data.lastName;
              list[i].email = item.data.data.email;
              list[i].branches = item.data.data.branch;
            }
          }
          reset();
        } else {
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
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const removeManagerFormHandler = (data: any) => {
    setIsLoader(true);
    const userData = {
      branch: data.branches,
      employeeType: data.employeeType,
    };
    // console.log('🚀 ~ createFormHandler ~ datas:', userData);

    employeeService
      .removeManagerService(actionMenuItemid, userData)
      .then((item) => {
        if (item.data.success) {
          // console.log('LISSST', list, item.data.data, getValues('user_id'));
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          const updatedBranches: any = branchByIdLov
            .filter((b: any) => !item.data.data.branch.includes(b.id))
            .map((x: any) => x.id);
          // console.log('🚀 ~ .then ~ updatedBranches:', updatedBranches);
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].branches = updatedBranches;
              list[i].employeeType = item.data.data.employeeType;
            }
          }
          reset();
        } else {
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
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const onSubmitDialogBox = (data: any) => {
    if (
      openFormDialog &&
      data.first_name &&
      data.last_name &&
      data.email &&
      data.password
    ) {
      // console.log('data', data);
      setOpenFormDialog(false);
      createFormHandler(data);
    } else if (
      openEditFormDialog &&
      data.first_name &&
      data.last_name &&
      data.email
    ) {
      setOpenEditFormDialog(false);
      updateFormHandler(data);
    } else if (openRemoveFormDialog) {
      setOpenRemoveFormDialog(false);
      removeManagerFormHandler(data);
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeUser.editUserEmployee
      )
    ) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      employeeService.updateStatus(id, data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = updateItem.data.data.isActive;
              } else if (
                item.userType === 'BranchUser' &&
                item.id !== updateItem.data.data.id
              ) {
                item.isActive = false;
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

  useEffect(() => {
    if (
      !listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeUser.viewUserEmployeeType
      )
    ) {
      const updatedFields: any = [...inputFieldsData];
      const branchesFieldIndex = updatedFields.findIndex(
        (field: any) => field.id === 'branches'
      );

      const rolesToShow = openRemoveFormDialog ? branchByIdLov : branchesLov;

      if (watch('employeeType') === 'USER') {
        if (branchesFieldIndex !== -1) {
          updatedFields.splice(branchesFieldIndex, 1);
        }
      } else if (
        watch('employeeType') === 'MANAGER' &&
        branchesFieldIndex === -1 &&
        authState.user.userType === 'ShopUser'
      ) {
        updatedFields.push({
          fieldName: 'Branches',
          id: 'branches',
          defaultFieldValue: 'Select Branches',
          control,
          register,
          setValue,
          error: errors.branches,
          type: 'multipleSelect',
          options: {
            role: watch('branches'),
            roles: rolesToShow,
          },
        });
      } else {
        updatedFields[branchesFieldIndex] = {
          ...updatedFields[branchesFieldIndex],
          options: {
            ...updatedFields[branchesFieldIndex]?.options,
            roles: rolesToShow,
          },
        };
      }
      if (authState.user.userType !== 'ShopUser') {
        const finalFields = updatedFields.filter(
          (item: any) => item.id !== 'employeeType'
        );
        setInputFieldsData(finalFields);
        return;
      }
      setInputFieldsData(updatedFields);
    }
  }, [watch('employeeType'), branchesLov, openRemoveFormDialog]);

  useEffect(() => {
    const branches = watch('branches') || [];
    const filteredDelIds = storeDelIds.filter(
      (storeId: any) => !branches.includes(storeId)
    );
    setDelBranchesId(filteredDelIds);
  }, [watch('branches')]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Employees" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Employees
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
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th aria-label="empty tale header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.avatar ? (
                              <img src={item.avatar} alt="" />
                            ) : (
                              <Avatar
                                className="avatar flex flex-row items-center"
                                sx={{
                                  bgcolor: '#1D1D1D',
                                  width: 35,
                                  height: 35,
                                  textTransform: 'uppercase',
                                  fontSize: '14px',
                                  marginRight: '10px',
                                }}
                              >
                                {item.firstName?.charAt(0)}
                                {item.lastName?.charAt(0)}
                              </Avatar>
                            )}

                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.firstName} ${item.lastName}`}
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
                        <td>{item.email}</td>
                        <td>
                          {item.userType === 'BranchUser'
                            ? 'Manager'
                            : 'Admin Employee'}
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
                            </IconButton>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
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
          {list?.length < 1 ? (
            <CustomText noRoundedBorders text="No Records Found" />
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
          options={
            authState.user.userType === 'BranchUser'
              ? actionMenuOptions.filter(
                  (option: any, index: number) => index < 2
                )
              : authState.user.userType === 'ShopUser'
              ? list.find((i: any) => i.id === actionMenuItemid)?.userType ===
                'User'
                ? actionMenuOptions.filter(
                    (option: any, index: number) => index < 2
                  )
                : actionMenuOptions
              : actionMenuOptions
          }
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <CustomDialog
          DialogHeader="Add Employee"
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          errors={errors}
          setInputFieldsData={setInputFieldsData}
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          DialogHeader="Edit Employee"
          type="edit"
          specialCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData?.filter(
            (item) => item.id !== 'password'
          )}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          errors={errors}
        />
      )}
      {openRemoveFormDialog && (
        <CustomDialog
          DialogHeader="Remove Manager Employee"
          type="remove"
          specialCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData?.filter(
            (item) => item.id !== 'password'
          )}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitDialogBox}
          openFormDialog={openRemoveFormDialog}
          setOpenFormDialog={setOpenRemoveFormDialog}
        />
      )}
    </>
  );
}

export default EmployeePage;
