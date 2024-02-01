import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
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
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminVouchers';
import PermissionPopup from '../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import VouchersPromoCreatePopup from './VouchersPromoCreatePopup';
import VouchersPromoEditPopup from './VouchersPromoEditPopup';
// import VouchersReferralCreatePopup from './VouchersReferralCreatePopup';

const options = ['Edit', 'Delete'];
function VouchersPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [list, setList] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [vouchersPromoDialog, setVouchersPromoDialog] = useState(false);
  const [vouchersPromoEditDialog, setVouchersPromoEditDialog] = useState(false);
  // const [vouchersReferralDialog, setVouchersReferralDialog] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItemId, setDeleteItemId] = useState<string>('');
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [emptyVariable] = useState(null);

  const open = Boolean(anchorEl);

  const handleDialogClose = (deleteVoucher: boolean) => {
    if (deleteVoucher) {
      if (deleteItemId) {
        Service.deleteVoucher(authState.user.tenant, deleteItemId).then(
          (response) => {
            if (response.data.success) {
              const newList = list.filter(
                (item: any) => item.id !== deleteItemId
              );
              setList(newList);
            }
          }
        );
      }
    }
    setDeleteItemId('');
    setOpenDialog(false);
  };

  const handleAddNew = () => {
    if (listingRolePermission(dataRole, 'Voucher Create')) {
      setVouchersPromoDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setEditItem(list.find((item: any) => item.id === id));
    setDeleteItemId(id);
  };

  const handleSelectedMenuClose = (option: string) => {
    setAnchorEl(null);
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Voucher Update')) {
        setVouchersPromoEditDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
    if (option === 'Delete') {
      if (listingRolePermission(dataRole, 'Voucher Delete')) {
        setOpenDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    Service.listVouchers(
      authState.user.tenant,
      newPage,
      rowsPerPage,
      search
    ).then((response) => {
      if (response.data.success) {
        setList(response.data.data.result);
        setTotal(response.data.data.totalResults);
      }
    });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowPerPage);
    setPage(newPage);
    Service.listVouchers(
      authState.user.tenant,
      newPage,
      rowsPerPage,
      search
    ).then((response) => {
      if (response.data.success) {
        setList(response.data.data.result);
        setTotal(response.data.data.totalResults);
      }
    });
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Voucher List')) {
      Service.listVouchers(authState.user.tenant, page, rowsPerPage, search)
        .then((response: any) => {
          if (response.data.success) {
            setIsLoader(false);
            setList(response.data.data.result);
            setTotal(response.data.data.totalResults);
          } else {
            setIsLoader(false);
            // setIsNotify(true);
            // setNotifyMessage({
            //   text: response.data.message,
            //   type: 'error',
            // });
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
    }
  }, [emptyVariable]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    Service.createVoucher(authState.user.tenant, data)
      .then((response) => {
        if (response.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: response.data.message,
            type: 'success',
          });
          setList([response.data.data, ...list]);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: response.data.message,
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

  const updateFormHandler = (id: string, data: any) => {
    setIsLoader(true);
    Service.updateVoucher(authState.user.tenant, id, data)
      .then((response: any) => {
        if (response.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: response.data.message,
            type: 'success',
          });
          const newList = [
            ...list.filter((item: any) => item.id !== response.data.data.id),
            response.data.data,
          ];
          setList(newList);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: response.data.message,
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
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Category Update Status')) {
      const data = {
        id,
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.updateStatus(data).then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === id) {
                item.isActive = updateItem.data.data.isActive;
                item.status = updateItem.data.data.status;
              }
              return { ...item };
            });
          });
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'error',
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <VouchersPromoCreatePopup
        vouchersPromoDialog={vouchersPromoDialog}
        setVouchersPromoDialog={setVouchersPromoDialog}
        callback={createFormHandler}
      />
      {editItem ? (
        <VouchersPromoEditPopup
          vouchersPromoEditDialog={vouchersPromoEditDialog}
          setVouchersPromoEditDialog={setVouchersPromoEditDialog}
          item={editItem}
          callback={updateFormHandler}
        />
      ) : null}
      {/* <VouchersReferralCreatePopup
        vouchersReferralDialog={vouchersReferralDialog}
        setVouchersReferralDialog={setVouchersReferralDialog}
      /> */}
      <TopBar title="Vouchers" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Vouchers
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
                  onClick={handleAddNew}
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
                  <th>Vouchers</th>
                  <th>Valid From</th>
                  <th>Valid Till</th>
                  <th>
                    Value <br /> $ / %
                  </th>
                  <th>Min Amount</th>
                  <th>Type</th>
                  <th>Redeem</th>
                  <th>Limitation</th>
                  <th>User Redeem</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.voucherCode}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{dayjs(item.validFrom).format('MMMM DD, YYYY')}</td>
                        <td>{dayjs(item.validTill).format('MMMM DD, YYYY')}</td>
                        <td>
                          {(item.discountType === 'Amount' ? '$' : '') +
                            Number(item.value) +
                            (item.discountType === 'Percentage' ? '%' : '')}
                        </td>
                        <td>${Number(item.minAmount)}</td>
                        <td>{item.discountType}</td>
                        <td>
                          {item.isUnlimitedRedeem
                            ? '0'
                            : `${item.maxRedeem} - ${item.redeemCount}`}
                        </td>
                        <td>
                          <span
                            className={`${
                              item.isUnlimitedRedeem
                                ? 'badge badge-success'
                                : 'badge badge-primary'
                            }`}
                          >
                            {item.isUnlimitedRedeem ? 'unlimited' : 'limited'}
                          </span>
                        </td>
                        <td>{item.maxUserRedeem}</td>
                        <td>
                          {item.status === 'Expired' ||
                          item.status === 'Deleted' ? (
                            <span className="badge badge-danger">
                              {item.status}
                            </span>
                          ) : item.status === 'Inactive' ? (
                            <span className="badge badge-primary">
                              {item.status}
                            </span>
                          ) : (
                            <span className="badge badge-success">
                              {item.status}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="btn-dot"
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={(event) => handleClick(event, item.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Switch
                              disabled={
                                item.status === 'Expired' ||
                                (item.status === 'Deleted' && true)
                              }
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, item.id)}
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
      <ActionMenu
        options={options}
        anchorEl={anchorEl}
        open={open}
        setAnchorEl={setAnchorEl}
        callback={handleSelectedMenuClose}
      />

      <PermissionPopup
        open={openDialog}
        setOpen={setOpenDialog}
        dialogText="Delete Voucher?"
        callback={() => handleDialogClose(true)}
      />
    </>
  );
}

export default VouchersPage;
