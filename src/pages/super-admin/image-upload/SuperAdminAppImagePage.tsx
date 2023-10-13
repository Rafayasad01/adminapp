import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import { useAppSelector } from '../../../redux/redux-hooks';
import TopBar from '../../../components/common/TopBar';
import Loader from '../../../components/common/Loader';
import Service from '../../../services/superadmin/RolePermissions';
import Notify from '../../../components/common/Notify';
import CustomText from '../../../components/common/CustomText';
import { TEXT_STORE_KEY, setText } from '../../../utils/constants';
import SuperAdminAppImageCreatePopup from './SuperAdminAppImageCreatePopup';
import SuperAdminAppImageEditPopup from './SuperAdminAppImageEditPopup';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';

const SuperAdminAppImagePage = () => {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>();
  const [actionMenuItemid, setActionMenuItemid] = useState<string>('');

  const handleFormClickOpen = () => {
    navigate('../add-role');
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    Service.getPermissionSearchService(searchTxt, newPage, rowsPerPage).then(
      (item) => {
        console.log('item:::::', item);
        setList(item.data.data.list);
        // setTotal(item.data.data.total);
      }
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getPermissionSearchService(search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
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
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getPermissionSearchService(search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    }
  };

  useEffect(() => {
    if (TEXT_STORE_KEY) {
      setIsNotify(true);
      setNotifyMessage({
        text: TEXT_STORE_KEY,
        type: 'success',
      });
      setText('');
    } else {
      setIsLoader(true);
    }
    Service.getPermissionListService(page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        console.error('error::::::::', error);
      });
  }, [page, rowsPerPage]);

  const editHandler = (id: string) => {
    //navigate(`../edit-permission/${id}`);
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      isActive: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updatePermissionStatus(id, data).then((updateItem) => {
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

  const childDataHandler = (data: any) => {
    console.log("DATA", data);

    setIsLoader(true);
    Service.getChildPermissionListService(data.id).then((item) => {
      if (item.data.success) {
        console.log("itemss", item.data);
        // if (item.data.data.length > 0) {
        //   setIsLoader(false);
        //   setOpenDialog(true);
        //   setHeading(data.name);
        //   setChildList(item.data.data);
        // } else {
        //   setIsLoader(false);
        //   setIsNotify(true);
        //   setNotifyMessage({
        //     text: "No Child List Found!",
        //     type: 'info',
        //   })
        // }
      }
    });
  };

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('icon', data.icon);
    formData.append('tenant', authState.user.tenant);
    formData.append('created_by', authState.user.id);
    formData.append('updated_by', authState.user.id);
    if (data.name && data.desc && data.icon) {
      // category
      //   .create(formData)
      //   .then((item) => {
      //     if (item.data.success) {
      //       setIsLoader(false);
      //       setIsNotify(true);
      //       setNotifyMessage({
      //         text: item.data.message,
      //         type: 'success',
      //       });
      //       setList([item.data.data, ...list]);
      //     } else {
      //       setIsLoader(false);
      //       setIsNotify(true);
      //       setNotifyMessage({
      //         text: item.data.message,
      //         type: 'error',
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
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('icon', data.icon);
    formData.append('tenant', authState.user.tenant);
    formData.append('created_by', authState.user.id);
    formData.append('updated_by', authState.user.id);
    if (data.name && data.desc && data.icon) {
      // category
      //   .create(formData)
      //   .then((item) => {
      //     if (item.data.success) {
      //       setIsLoader(false);
      //       setIsNotify(true);
      //       setNotifyMessage({
      //         text: item.data.message,
      //         type: 'success',
      //       });
      //       setList([item.data.data, ...list]);
      //     } else {
      //       setIsLoader(false);
      //       setIsNotify(true);
      //       setNotifyMessage({
      //         text: item.data.message,
      //         type: 'error',
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
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
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
      <TopBar title="App Image" />
      <div className="m-auto mx-5">
        <div className="mt-5 w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All App Images
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => setOpenFormDialog(true)}
                >
                  <AddOutlinedIcon /> Add Image
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created Date</th>
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
                                  textTransform: 'uppercase',
                                  fontSize: '14px',
                                  marginRight: '10px',
                                }}
                                src={item.avatar}
                                alt=""
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
                                {item.name?.charAt(0)}
                                {item.name?.charAt(1)}
                              </Avatar>
                            )}
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                              'MMMM DD, YYYY'
                            )
                            : '--'}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ENABLED</span>
                          ) : (
                            <span className="badge badge-danger">DISABLED</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <>
                              <IconButton
                                disabled={!(item.isActive)}
                                className="icon-btn mr-3.5 p-0"
                                onClick={() => childDataHandler(item)}
                              >
                                <WysiwygOutlinedIcon />
                              </IconButton>
                              <IconButton
                                disabled={!(item.isActive)}
                                className="icon-btn mr-3 p-0"
                                onClick={() => { setActionMenuItemid(item.id), setOpenEditFormDialog(true) }}
                              >
                                <EditIcon />
                              </IconButton>
                            </>
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
      {openFormDialog && (
        <SuperAdminAppImageCreatePopup
          openDialog={openFormDialog}
          setOpenDialog={setOpenFormDialog}
          callback={createFormHandler}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
        />
      )}
      {openEditFormDialog && (
        <SuperAdminAppImageEditPopup
          openDialog={openEditFormDialog}
          setOpenDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
        />
      )}
    </>
  );
}

export default SuperAdminAppImagePage;
