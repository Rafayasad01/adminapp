import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/superadmin/appImage';
import SuperAdminAppImageCreatePopup from './SuperAdminAppImageCreatePopup';
import SuperAdminAppImageEditPopup from './SuperAdminAppImageEditPopup';
import SuperAdminAppImagePagePopup from './SuperAdminAppImagePagePopup';

function SuperAdminAppImagePage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const [emptyVariable] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openPopupDialog, setOpenPopupDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>();
  const [actionMenuItemid, setActionMenuItemid] = useState<string>('');
  const [childData, setChildData] = useState<any>();

  const handleClickSearch = (event: any) => {
    // console.log('search event', event.target.value);
    setSearch(event.target.value as string);
    // const searchTxt = event.target.value as string;
    // const newPage = 0;
    // setPage(newPage);
  };

  const executeQuery = () => {
    Service.searchService(search, page, rowsPerPage)
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      executeQuery();
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset ? , limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.listService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(search, newPage, rowsPerPage).then((item) => {
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
      Service.listService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(search, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {
    Service.listService(page, rowsPerPage)
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
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  }, [emptyVariable]);

  const childDataHandler = (id: any) => {
    setIsLoader(true);
    Service.get(id).then((item: any) => {
      if (item.data.success) {
        // console.log('item.data.data::::::', item.data.data);
        setIsLoader(false);
        setChildData(item.data.data.avatar);
        setOpenPopupDialog(true);
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

  const editHandler = (id: string) => {
    setIsLoader(true);
    Service.get(id).then((item: any) => {
      if (item.data.success) {
        // console.log('item.data.data::::::', item.data.data);
        setIsLoader(false);
        setActionMenuItemid(id);
        setOpenEditFormDialog(true);
        setEditFormData(item.data.data);
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
  // console.log('edirform', editFormData);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc ? data.desc : null);
    formData.append('avatar', data.avatar);
    formData.append('createdBy', authState.user.id);
    if (data.name && data.avatar) {
      Service.create(formData)
        .then((item) => {
          if (item.data.success) {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList([item.data.data, ...list]);
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
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    // console.log('data2222222', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    if (data.avatar !== null) {
      formData.append('avatar', data.avatar);
    }
    formData.append('updatedBy', authState.user.id);
    if (data.name) {
      Service.update(actionMenuItemid, formData)
        .then((item) => {
          if (item.data.success) {
            // console.log("updated data", item.data);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList((newArr: any) => {
              return newArr.map((newItem: any) => {
                if (newItem.id === item.data.data.id) {
                  newItem.name = item.data.data.name;
                  newItem.isActive = item.data.data.isActive;
                  newItem.desc = item.data.data.desc;
                  newItem.avatar = item.data.data.avatar;
                }
                return { ...newItem };
              });
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
      <div className="container m-auto">
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
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onChange={(event) => handleClickSearch(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton
                          onClick={executeQuery}
                          aria-label="toggle password visibility"
                        >
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
                  <th style={{ width: '20%' }}>Name</th>
                  <th style={{ width: '50%' }}>Description</th>
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
                              <img
                                src={item.avatar}
                                style={{
                                  objectFit: 'contain',
                                  width: 30,
                                  height: 30,
                                  border: '1px solid #DFE0EB',
                                  padding: '4px',
                                }}
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
                        <td>{item.desc !== 'null' ? item.desc : '--'}</td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format('MMMM DD, YYYY')
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
                            <IconButton
                              disabled={!item.isActive}
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => childDataHandler(item.id)}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            <IconButton
                              disabled={!item.isActive}
                              className="icon-btn mr-3 p-0"
                              onClick={() =>
                                item.isActive ? editHandler(item.id) : null
                              }
                            >
                              <EditIcon />
                            </IconButton>
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
          type="edit"
          openDialog={openEditFormDialog}
          setOpenDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
        />
      )}
      {openPopupDialog && (
        <SuperAdminAppImagePagePopup
          openDialog={openPopupDialog}
          setOpenDialog={setOpenPopupDialog}
          link={childData}
        />
      )}
    </>
  );
}

export default SuperAdminAppImagePage;
