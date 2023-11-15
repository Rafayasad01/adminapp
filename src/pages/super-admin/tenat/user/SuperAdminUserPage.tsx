/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import CustomText from '../../../../components/common/CustomText';
import TopBar from '../../../../components/common/TopBar';
import { Shop } from '../../../../interfaces/superadmin/shop.interface';
import Service from '../../../../services/superadmin/Tenant';
import Loader from '../../../../components/common/Loader';
import Notify from '../../../../components/common/Notify';
import CustomDialog from '../../../../components/common/CustomDialog';
import { useAppSelector } from '../../../../redux/redux-hooks';

function SuperAdminUserPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [dataById, setDataById] = React.useState<any>();
  const [emptyVariable] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<Shop>();

  const inputFieldsData = [
    {
      fieldName: 'Role',
      id: 'role',
      register,
      control,
      error: errors,
      type: 'select',
      options: dataById,
      validateRequired: true,
    },
  ];

  const onSubmitDialogBox = (data: any) => {
    console.log('data', data);
    setIsLoader(true);
    const updateddata = {
      userLimits: data.userLimits,
      role: data.role,
      updatedBy: authState.user.id,
    };
    Service.updateUser(dataById?.id, updateddata)
      .then((updateItem) => {
        if (updateItem.data.success) {
          // console.log("updateItem", updateItem);
          const filterRolename = dataById?.roles.filter(
            (el: any) => el.id === updateItem.data.data.role
          );
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === dataById?.id) {
                item.role = filterRolename[0].name;
                item.userLimits = updateItem.data.data.userLimits;
              }
              return { ...item };
            });
          });
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
        } else {
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
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

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      isActive: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updateUserStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === id) {
              item.isActive = updateItem.data.data.isActive;
            }
            return { ...item };
          });
        });
      }
    });
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    Service.searchUserService(searchTxt, newPage, rowsPerPage)
      .then((item) => {
        // console.log("AS", item.data.data);
        if (item.data.success) {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getUserListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchUserService(search, newPage, rowsPerPage).then((item) => {
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
      Service.getUserListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchUserService(search, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  const editHandler = (id: string) => {
    setIsLoader(true);
    setOpenEditFormDialog(true);
    Service.getUser(id).then((item: any) => {
      if (item.data.success) {
        setDataById(item.data.data);
        setValue('role', item.data.data.role ? item.data.data.role : 'none');
        setIsLoader(false);
        setOpenEditFormDialog(true);
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: item.data.message,
          type: 'error',
        });
      }
    });
  };

  useEffect(() => {
    Service.getUserListService(page, rowsPerPage).then((item) => {
      if (item.data.success) {
        // console.log('item', item.data.data)
        setList(item.data.data.list);
        setTotal(item.data.data.total);
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    });
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Shop User" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Shop Users
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
                  <th>User Name</th>
                  <th>Shop Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>User Limit</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.avatar ? (
                              <Avatar
                                className="avatar flex flex-row items-center"
                                sx={{
                                  bgcolor: '#1D1D1D',
                                  width: 35,
                                  height: 35,
                                  marginRight: '10px',
                                }}
                                alt=""
                                src={item.avatar}
                              />
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
                        <td>{item.tenantName}</td>
                        <td>{item.email}</td>
                        <td>{item.roleName ? item.roleName : '--'}</td>
                        <td>
                          {item && `${item.maxUserLimit} - ${item.userCounts}`}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-danger">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => navigate(`../detail/${item.id}`)}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            {/* <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() =>
                                item.isActive ? editHandler(item.id) : null
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <Switch
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
          {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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
      <CustomDialog
        DialogHeader="Edit Shop User"
        type="edit"
        singleField
        specailCase
        reset={reset}
        inputFieldsData={inputFieldsData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitDialogBox}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        setAvater={setAvatar}
      />
    </>
  );
}

export default SuperAdminUserPage;
