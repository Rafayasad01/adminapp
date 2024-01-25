import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminNotification';
import AlertBox from '../../utils/Alert';
import {
  NOTIFICATION_STATUS_CANCELLED,
  NOTIFICATION_STATUS_COMPLETED,
  NOTIFICATION_STATUS_FAILED,
  NOTIFICATION_STATUS_NEW,
  NOTIFICATION_STATUS_SENDING,
  NOT_AUTHORIZED_MESSAGE,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import NotificationCreatePopup from './NotificationCreatePopup';
import NotificationDetailPopup from './NotificationDetailPopup';

function NotificationPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [detailPopup, setDetailPopup] = useState<boolean>(false);
  const [batchDetail, setBatchDetail] = useState<any>(null);
  const [alertPopup, setAlertPopup] = useState<boolean>(false);
  const [alertSeverty, setAlertSeverty] = useState<string>('');
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [emptyVariable] = useState(null);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Notification Sent')) {
      setOpenFormDialog(true);
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
      Service.searchService(
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
      Service.searchService(
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
      Service.searchService(
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
    if (listingRolePermission(dataRole, 'Notification List')) {
      Service.getListService(authState.user.tenant, page, rowsPerPage)
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

  const createFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('message', data.message);
    formData.append('tenant', authState.user.tenant);
    formData.append('userId', authState.user.id);
    Service.sentService(formData)
      .then((item) => {
        if (item.data.success) {
          // list.push(item.data.data);
          // setList(list);
        }
      })
      .catch((err) => {
        setAlertMsg(err.message);
        setAlertSeverty('error');
        setAlertPopup(true);
      });
  };

  const getStatusTag = (status: string) => {
    let tag = '';
    if (status === NOTIFICATION_STATUS_NEW) {
      tag = 'blue';
    } else if (status === NOTIFICATION_STATUS_SENDING) {
      tag = 'purple';
    } else if (status === NOTIFICATION_STATUS_COMPLETED) {
      tag = 'green';
    } else if (
      status === NOTIFICATION_STATUS_FAILED ||
      status === NOTIFICATION_STATUS_CANCELLED
    ) {
      tag = 'red';
    }
    return tag;
  };

  const detailButtonHandler = (getItem: any, index: number) => {
    if (listingRolePermission(dataRole, 'Notification Batch Detail')) {
      Service.batchDetailService(list[index].id).then((item) => {
        if (item.data.success) {
          setBatchDetail({ ...getItem, ...item.data.data });
          setDetailPopup(true);
        } else {
          setAlertMsg('No batches found');
          setAlertSeverty('error');
          setAlertPopup(true);
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Notification" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Notifications
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
                  <AddOutlinedIcon /> Sent
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th className="w-[16rem]">Title</th>
                  <th className="w-[30rem]">Message</th>
                  <th>Dated</th>
                  <th>status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <div className="flex flex-col">
                            <span className="text-sm font-normal text-secondary">
                              {dayjs(item.createdDate)?.format('hh:mm:ssA')}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge badge-${getStatusTag(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <IconButton
                            className="icon-btn mr-3.5 p-0"
                            onClick={() => detailButtonHandler(item, index)}
                          >
                            <WysiwygOutlinedIcon />
                          </IconButton>
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
        <NotificationCreatePopup
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {detailPopup && (
        <NotificationDetailPopup
          openDetailDialog={detailPopup}
          setOpenDetailDialog={setDetailPopup}
          detail={batchDetail}
        />
      )}
      {alertPopup && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverty}
          alertOpen={alertPopup}
          setAlertOpen={setAlertPopup}
        />
      )}
    </>
  );
}

export default NotificationPage;
