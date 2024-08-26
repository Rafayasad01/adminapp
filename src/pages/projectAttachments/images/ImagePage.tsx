import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import Switch from '@mui/material/Switch';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeAttachmentService from '../../../services/adminapp/adminProjectAttachments';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import ImageAddPopup from './ImageAddPopup';
import ImageEditPopup from './ImageEditPopup';
import ActionMenu from '../../../components/common/ActionMenu';
import PermissionPopup from '../../../utils/PermissionPopup';
import assets from '../../../assets';

function ImagePage({ projectId }: any) {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const actionMenuOptions = ['Edit', 'Delete'];
  // const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Category ?'
  );

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.addImagesPlans)
    ) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  // const handleSwitchChange = (event: any, id: string) => {
  //   if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.edit)) {
  //     const data = {
  //       is_active: event.target.checked,
  //       updated_by: authState.user.id,
  //     };
  //     storeAttachmentService
  //       .updateStatusProjectService(id, data)
  //       .then((updateItem) => {
  //         if (updateItem.data.success) {
  //           setList((newArr: any) => {
  //             return newArr.map((item: any) => {
  //               if (item.id === id) {
  //                 item.isActive = updateItem.data.data.isActive;
  //               }
  //               return { ...item };
  //             });
  //           });
  //         }
  //       });
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: NOT_AUTHORIZED_MESSAGE,
  //       type: 'warning',
  //     });
  //   }
  // };

  useEffect(() => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewImagesPlans
      )
    ) {
      storeAttachmentService
        .getListProjectAttachmentService('image', search, page, rowsPerPage)
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
        });
    } else {
      setIsLoader(false);
    }
  }, [null]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      storeAttachmentService
        .getListProjectAttachmentService('image', searchTxt, page, rowsPerPage)
        .then((item) => {
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
    storeAttachmentService
      .getListProjectAttachmentService('image', search, newPage, rowsPerPage)
      .then((item: any) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    storeAttachmentService
      .getListProjectAttachmentService('image', search, newPage, newRowperPage)
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };
  const createFormHandler = (data: any) => {
    console.log('data==>', data);
    setIsLoader(true);
    const formData = new FormData();
    if (data.file !== null) formData.append('file', data.file);
    formData.append('projectId', data.projectId);
    formData.append('day', data.day);
    formData.append('title', data.title);
    formData.append('category', data.type);
    formData.append('description', data.description);
    storeAttachmentService
      .addProjectAttachmentService(formData, authState.user.tenant)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
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
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    console.log('🚀 ~ updateFormHandler ~ data:', data);
    setIsLoader(true);
    const formData = new FormData();
    if (data.file !== null) formData.append('file', data.file);
    formData.append('projectId', data.projectId);
    formData.append('day', data.day);
    formData.append('title', data.title);
    formData.append('category', data.type);
    formData.append('description', data.description);
    storeAttachmentService
      .updateProjectAttachmentService(actionMenuItemid, formData)
      .then((item: any) => {
        if (item.data.success) {
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].filePath = item.data.data.filePath;
              list[i].projectId = item.data.data.projectId;
              list[i].day = item.data.data.day;
              list[i].title = item.data.data.title;
              list[i].category = item.data.data.category;
              list[i].description = item.data.data.description;
              list[i].mimiType = item.data.data.mimiType;
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
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    storeAttachmentService
      .deleteStatusProjectService(id)
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
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.editImagesPlans
        )
      ) {
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        setActionMenuItemid(editFormDatas.id);
        setEditFormData(editFormDatas);
        setOpenEditFormDialog(true);
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
          ALL_PERMISSIONS.storePlans.deleteImagesPlans
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Renders
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
                  <AddOutlinedIcon /> Add
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Category</th>
                  <th className="w-[30%]">Description</th>
                  <th>Project Name</th>
                  <th>Day</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {' '}
                          <div className="avatar flex flex-row items-center">
                            {item.filePath ? (
                              <button
                              // onClick={() => openModal(item.icon)}
                              >
                                <img
                                  className="cursor-pointer"
                                  src={item.filePath}
                                  alt={item.title}
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
                                {item.title}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.category ? item.category : '--'}</td>
                        <td>{item.description ? item.description : '--'}</td>
                        <td>{item.projectName ? item.projectName : '--'}</td>
                        <td>{item.day ? item.day : '--'}</td>
                        <td>
                          {dayjs(item.uploadedAt).isValid()
                            ? dayjs(item.uploadedAt)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
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
                                setActionMenuItemid(item.id);
                                setActionMenuAnchorEl(event.currentTarget);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
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
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <ImageAddPopup
          projectId={projectId}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <ImageEditPopup
          projectId={projectId}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default ImagePage;
