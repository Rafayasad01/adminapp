import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import category from '../../services/adminapp/adminCategory';
import PermissionPopup from '../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { CheckRolePermission, listingRolePermission } from '../../utils/helper';
import CategoriesCreatePopup from './CategoriesCreatePopup';
import CategoriesEditPopup from './CategoriesEditPopup';

function CategoriesPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Items', 'Edit', 'Delete'];
  const [emptyVariable] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Category ?'
  );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Category Create')) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Category List')) {
      category
        .getListService(authState.user.tenant, page, rowsPerPage)
        .then((item: any) => {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        })
        .catch((error) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: error.message,
            type: 'error',
          });
          // console.log('error::::::::', error);
        });
    }
  }, [emptyVariable]);

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    category
      .searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage)
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      category
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      category
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
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
      category
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      category
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      is_active: false,
      is_deleted: true,
      updated_by: authState.user.id,
    };
    category
      .deleteCategory(id, data)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.filter((item: any) => item.id !== id);
          });
          let newtotal = total;
          setTotal((newtotal -= 1));
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
      if (listingRolePermission(dataRole, 'Category Update')) {
        category.getCategory(actionMenuItemid).then((item: any) => {
          if (item.data.success) {
            // console.log('tem.data.data:::::::', item.data.data);
            setEditFormData(item.data.data);
            setOpenEditFormDialog(true);
          }
        });
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Items') {
      CheckRolePermission(
        'Category Service Get',
        dataRole,
        navigate,
        `service/${actionMenuItemid}`
      );
      // navigate(`service/${actionMenuItemid}`);
    } else if (option === 'Delete') {
      if (listingRolePermission(dataRole, 'Category Delete')) {
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
      category
        .create(formData)
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
    // console.log('data::::::', data);
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('updated_by', authState.user.id);
    if (data.icon) formData.append('icon', data.icon);
    category
      .updateCategory(actionMenuItemid, formData)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === updateItem.data.data.id) {
              list[i].name = updateItem.data.data.name;
              list[i].desc = updateItem.data.data.desc;
              if (updateItem.data.data.icon) {
                list[i].icon = updateItem.data.data.icon;
              }
            }
          }
        } else {
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

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Category Update Status')) {
      const data = {
        is_active: event.target.checked,
        updated_by: authState.user.id,
      };
      category.updateStatus(id, data).then((updateItem) => {
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
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const openModal = (avatar: string) => {
    setModalImage(avatar);
    setIsModalImage(true);
  };

  const closeModal = () => {
    setModalImage('');
    setIsModalImage(false);
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
      <TopBar title="Categories" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Categories
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
                  <th>Category Name</th>
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
                            {item.icon ? (
                              <button onClick={() => openModal(item.icon)}>
                                <img
                                  className="cursor-pointer"
                                  src={item.icon}
                                  alt={item.name}
                                />
                              </button>
                            ) : (
                              <img
                                src={assets.tempImages.avatarDryCLean}
                                alt=""
                              />
                            )}
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Enabled</span>
                          ) : (
                            <span className="badge badge-danger">Disabled</span>
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
        <CategoriesCreatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <CategoriesEditPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
      {modalImage && (
        <Dialog
          open={isModalImage}
          onClose={closeModal}
          PaperProps={{
            className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
            style: {
              // maxWidth: '25%',
              // minHeight: '45%',
              borderRadius: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <div className="flex h-[100%] items-center justify-center">
            <img
              className="max-w-[250px] xl:max-h-[100px] 2xl:max-h-[150px]"
              src={modalImage}
              alt=""
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default CategoriesPage;
