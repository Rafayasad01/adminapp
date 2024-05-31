// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
// import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
// import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
// import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import assets from '../../../assets';
// import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import walletService from '../../../services/adminapp/adminWallet';
// import PermissionPopup from '../../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import {
  // CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
import CustomButton from '../../../components/common/CustomButton';
// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

function WalletPage() {
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
      walletService
        .WalletList(search, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setTotal(item.data.data.total);
            setList(item.data.data.list);
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
      walletService.WalletList(searchTxt, page, rowsPerPage).then((item) => {
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
    walletService
      .WalletList(search, newPage, rowsPerPage)
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
    walletService
      .WalletList(search, newPage, newRowperPage)
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

  // const handleLeave = (id: any, type: string) => {
  //   setIsLoader(true);
  //   if (listingRolePermission(dataRole, 'Category List')) {
  //     employeeService
  //       .StoreEmployeeLeaveStatusUpdateService(id, type)
  //       .then((item: any) => {
  //         if (item.data.success) {
  //           setIsLoader(false);
  //           setList((newArr: any) => {
  //             return newArr.map((el: any) => {
  //               if (el.id === id) {
  //                 el.status = item.data.data.status;
  //               }
  //               return { ...el };
  //             });
  //           });
  //         } else {
  //           setIsLoader(false);
  //           setIsNotify(true);
  //           setNotifyMessage({
  //             text: item.data.message,
  //             type: 'error',
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: error.message,
  //           type: 'error',
  //         });
  //       });
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: NOT_AUTHORIZED_MESSAGE,
  //       type: 'warning',
  //     });
  //   }
  // };

  // const openModal = (avatar: string) => {
  //   // console.log('🚀 ~ openModal ~ avatar:', avatar);
  //   setModalImage(avatar);
  //   setIsModalImage(true);
  // };

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
      <TopBar title="Wallet" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Remaining Wallets
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
                  <th>Balance</th>
                  <th>Type</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th aria-label="empty table header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="font-semibold">{item.balance}</td>
                        <td>{item.referenceType}</td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.status === 'Balance'
                                ? 'badge-primary'
                                : 'badge-success'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <div className="mx-3">
                              <CustomButton
                                // disabled={isWalletLoader}
                                buttonType="button"
                                title="Update"
                                className="btn-black-outline"
                                // type="submit"
                                sx={{
                                  width: '100%',
                                  height: '35px',
                                }}
                              />
                              {/* <IconButton
                                // disabled={
                                //   item.status === 'Approved' ||
                                //   item.status === 'Rejected'
                                // }
                                // className={`${
                                //   item.status === 'Approved'
                                //     ? 'text-gray'
                                //     : item.status === 'Rejected'
                                //     ? 'text-[red]'
                                //     : 'text-black'
                                // } btn-icon`}
                                onClick={() => handleLeave(item.id, 'Rejected')}
                              >
                                <CancelOutlinedIcon />
                                {/* Reject */}
                              {/* </IconButton> */}
                            </div>
                            {/* <div className="">
                              <IconButton
                                disabled={
                                  item.status === 'Approved' ||
                                  item.status === 'Rejected'
                                }
                                className={`${
                                  item.status === 'Rejected'
                                    ? 'text-gray'
                                    : item.status === 'Approved'
                                    ? 'text-[green]'
                                    : 'text-black'
                                } btn-icon`}
                                onClick={() => handleLeave(item.id, 'Approved')}
                              >
                                <CheckCircleOutlineOutlinedIcon />
                                {/* Approve */}
                            {/* </IconButton> */}
                            {/* </div> */}
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

export default WalletPage;
