import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import WalletIcon from '@mui/icons-material/Wallet';
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
import walletService from '../../../services/adminapp/adminWallet';
import {
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import {
  // CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
import WalletUpdatePopup from './WalletUpdatePopup';

function WalletPage() {
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  // const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(true);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [
    ,
    // openDetailDialog
    setOpenDetailDialog,
  ] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  // const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  // const [dialogText] = useState<any>(
  //   'Are you sure you want to delete this Category ?'
  // );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

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
      walletService.WalletList(searchTxt, newPage, rowsPerPage).then((item) => {
        setTotal(item.data.data.total);
        setList(item.data.data.list);
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
          setTotal(item.data.data.total);
          setList(item.data.data.list);
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
          setTotal(item.data.data.total);
          setList(item.data.data.list);
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

  const editHandler = (id: string, type: string) => {
    if (type === 'update') {
      setOpenEditFormDialog(true);
    } else {
      setOpenDetailDialog(true);
    }
    const filtered = list.filter((item: any) => item.id === id);
    setEditFormData(filtered);
  };

  const updateFormHandler = (data: string) => {
    setIsLoader(true);
    walletService
      .WalletUpdate(editFormData[0]?.id, data)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.balance = updateItem.data.data.balance;
                item.status = updateItem.data.data.status;
              }
              return { ...item };
            });
          });
          setIsLoader(false);
          setOpenEditFormDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'sccuess',
          });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
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
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Service</th> */}
                  <th>Credit</th>
                  <th>Type</th>
                  {/* <th>Status</th> */}
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
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.appUser?.firstName} ${item.appUser?.lastName}`}
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
                        <td>{item.appUser?.email}</td>
                        {/* <td>{item.storeServiceCategoryItem?.name}</td> */}
                        <td>
                          {Math.floor(item?.balance)} {CURRENCY_PREFIX}
                        </td>
                        <td>{item?.referenceType}</td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              disabled={!!(item.status === 'Completed')}
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => editHandler(item?.id, 'update')}
                            >
                              <WalletIcon />
                            </IconButton>
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
      {openEditFormDialog && (
        <WalletUpdatePopup
          // setIsNotify={setIsNotify}
          // setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData[0]}
          callback={updateFormHandler}
        />
      )}
      {/* {openDetailDialog && (
        <WalletDetailPopup
          // setIsNotify={setIsNotify}
          // setNotifyMessage={setNotifyMessage}
          openFormDialog={openDetailDialog}
          setOpenFormDialog={setOpenDetailDialog}
          formData={editFormData[0]}
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
