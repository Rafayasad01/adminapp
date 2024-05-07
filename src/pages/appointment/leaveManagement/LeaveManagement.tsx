// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
// import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import assets from '../../../assets';
// import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import employeeService from '../../../services/adminapp/adminStoreEmployee';
// import PermissionPopup from '../../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import {
  // CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

function LeaveManagement() {
  // const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  // const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  // const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
  // const [actionMenuAnchorEl, setActionMenuAnchorEl] =
  //   useState<null | HTMLElement>(null);
  // const actionMenuOpen = Boolean(actionMenuAnchorEl);
  // const actionMenuOptions = ['Products', 'Edit', 'Delete'];
  // const [openFormDialog, setOpenFormDialog] = useState(false);
  // const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  // const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  // const [dialogText] = useState<any>(
  //   'Are you sure you want to delete this Category ?'
  // );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // const handleFormClickOpen = () => {
  //   if (listingRolePermission(dataRole, 'Category Create')) {
  //     setOpenFormDialog(true);
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: NOT_AUTHORIZED_MESSAGE,
  //       type: 'warning',
  //     });
  //   }
  // };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Category List')) {
      employeeService
        .StoreEmployeeAttendanceLeaveService(search, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setTotal(item.data.data.totalPages);
            setList(item.data.data.leaves);
            // setTotal(item.data.data.total);
          } else {
            setIsLoader(false);
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
          // console.log('error::::::::', error);
        });
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  }, [null]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      employeeService
        .StoreEmployeeAttendanceLeaveService(searchTxt, page, rowsPerPage)
        .then((item) => {
          setTotal(item.data.data.totalPages);
          setList(item.data.data.leaves);
        });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    employeeService
      .StoreEmployeeAttendanceLeaveService(search, newPage, rowsPerPage)
      .then((item) => {
        if (item.data.success) {
          setTotal(item.data.data.totalPages);
          setList(item.data.data.leaves);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    employeeService
      .StoreEmployeeAttendanceLeaveService(search, newPage, newRowperPage)
      .then((item) => {
        if (item.data.success) {
          setTotal(item.data.data.totalPages);
          setList(item.data.data.leaves);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const handleLeave = (type: string) => {
    console.log(type);
    if (listingRolePermission(dataRole, 'Category List')) {
      // employeeService
      //   .StoreEmployeeAttendanceLeaveService(search, page, rowsPerPage)
      //   .then((item: any) => {
      //     if (item.data.success) {
      //       setIsLoader(false);
      //       setTotal(item.data.data.total);
      //       setList(item.data.data.leaves);
      //       // setTotal(item.data.data.total);
      //     } else {
      //       setIsLoader(false);
      //     }
      //   })
      //   .catch((error) => {
      //     setIsLoader(false);
      //     setIsNotify(true);
      //     setNotifyMessage({
      //       text: error.message,
      //       type: 'error',
      //     });
      //     // console.log('error::::::::', error);
      //   });
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const openModal = (avatar: string) => {
    console.log('🚀 ~ openModal ~ avatar:', avatar);
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
      <TopBar title="Leave Management" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Leaves
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
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Type</th>
                  <th>Attachments</th>
                  <th>Status</th>
                  <th aria-label="empty table header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.storeEmployee.avatar ? (
                              <img src={item.storeEmployee.avatar} alt="" />
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
                                {item.storeEmployee.name?.charAt(0)}
                              </Avatar>
                            )}

                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.storeEmployee.name}`}
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
                          {dayjs(item.fromDate).isValid()
                            ? dayjs(item.fromDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.toDate).isValid()
                            ? dayjs(item.toDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>{item.leaveType}</td>
                        <td>
                          {item.storeEmployeeLeaveAttachment?.length < 1 &&
                            'No Attentments'}
                          <div className="flex flex-wrap">
                            {item.storeEmployeeLeaveAttachment?.map(
                              (el: any, ind: any) => {
                                return (
                                  <div key={ind}>
                                    <div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() => openModal(el.attachment)}
                                      >
                                        {el.attachmentExtension === 'jpg' && (
                                          <ImageOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() => openModal(el.attachment)}
                                      >
                                        {el.attachmentExtension === 'png' && (
                                          <ImageOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() => openModal(el.attachment)}
                                      >
                                        {el.attachmentExtension === 'jpeg' && (
                                          <ImageOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                          window.open(el.attachment, '_blank')
                                        }
                                      >
                                        {el.attachmentExtension === 'pdf' && (
                                          <PictureAsPdfOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                          window.open(el.attachment, '_blank')
                                        }
                                      >
                                        {el.attachmentExtension === 'docx' && (
                                          <ArticleOutlinedIcon />
                                        )}
                                      </div>
                                      <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                          window.open(el.attachment, '_blank')
                                        }
                                      >
                                        {el.attachmentExtension === 'xlsx' && (
                                          <ArticleOutlinedIcon />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </td>
                        <td>{item.status}</td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <div className="mx-3">
                              <Button
                                variant="contained"
                                className="btn-black-outline btn-icon"
                                onClick={() => handleLeave('accept')}
                              >
                                Disapprove
                              </Button>
                            </div>
                            <div className="">
                              <Button
                                variant="contained"
                                className="btn-black-fill btn-icon"
                                onClick={() => handleLeave('reject')}
                              >
                                Approve
                              </Button>
                            </div>
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
      {/* {cancelDialogOpen && (
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
      )} */}
      {/* {openFormDialog && (
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
      )} */}
      {modalImage && (
        <Dialog
          open={isModalImage}
          onClose={closeModal}
          title="Image"
          PaperProps={{
            className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
            style: {
              // maxWidth: '25%',
              // minHeight: '45%',
              borderRadius: '2%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <div className="flex h-[100%] items-center justify-center">
            <img
              className="max-w-[250px] rounded-2xl xl:max-h-[200px] 2xl:max-h-[300px]"
              src={modalImage}
              alt=""
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default LeaveManagement;
