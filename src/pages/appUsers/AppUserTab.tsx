import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppUser';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { CheckRolePermission, listingRolePermission } from '../../utils/helper';

type Props = {
  list: any;
  setList: any;
  isLoader: boolean;
  setIsLoader: any;
  actionMenuItemid: any;
  setActionMenuItemid: any;
  setEditFormData: any;
  setOpenEditFormDialog: any;
  notifyMessage: any;
  setNotifyMessage: any;
  isNotify: boolean;
  setIsNotify: any;
  total: any;
  rowsPerPage: any;
  page: any;
  setTotal: any;
  setPage: any;
  search: any;
  setRowsPerPage: any;
};

function AppUserTab({
  setRowsPerPage,
  setTotal,
  search,
  setPage,
  page,
  total,
  rowsPerPage,
  setIsNotify,
  setNotifyMessage,
  list,
  setList,
  setIsLoader,
  actionMenuItemid,
  setActionMenuItemid,
  setEditFormData,
  setOpenEditFormDialog,
}: Props) {
  const navigate = useNavigate();
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail', 'Reward History', 'Edit', 'Delete'];

  const manuHandler = (option: string) => {
    setIsLoader(true);
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Customer Update')) {
        Service.appUserEdit(actionMenuItemid?.id).then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
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
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Address') {
      CheckRolePermission(
        'Customer Address Detail',
        dataRole,
        navigate,
        `address/${actionMenuItemid?.id}`
      );
      // navigate(`address/${actionMenuItemid?.id}`);
    } else if (option === 'Delete') {
      if (listingRolePermission(dataRole, 'Customer Delete')) {
        setIsLoader(true);
        const data = {
          id: actionMenuItemid?.id,
          updatedBy: authState.user.id,
        };
        Service.appUserDelete(data)
          .then((item: any) => {
            if (item.data.success) {
              setIsLoader(false);
              setIsNotify(true);
              setNotifyMessage({
                text: item.data.message,
                type: 'success',
              });
              setList((newArr: any) => {
                return newArr.filter(
                  (newItem: any) => newItem.id !== item.data.data.id
                );
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
          .catch((err: Error) => {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
          });
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Detail') {
      CheckRolePermission(
        'Customer Detail',
        dataRole,
        navigate,
        `detail/${actionMenuItemid?.id}`
      );
      navigate(`detail/${actionMenuItemid?.id}`);
    } else if (option === 'Reward History') {
      navigate(`./reward/history/${actionMenuItemid?.id}`);
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Customer Update Status')) {
      setIsLoader(true);
      const data = {
        id,
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.appUpdateStatus(data).then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = updateItem.data.data.isActive;
              }
              return { ...item };
            });
          });
        }
      });
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
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
      Service.appList(authState.user.tenant, 'App', newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.appListSearch(
        authState.user.tenant,
        'App',
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
      Service.appList(authState.user.tenant, 'App', newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
    } else {
      Service.appListSearch(
        authState.user.tenant,
        'App',
        search,
        newPage,
        rowsPerPage
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  return (
    <>
      <div className="mt-3 grid grid-cols-none">
        <table className="table-border table-auto">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Postal Code</th>
              <th>Loyalty Coins</th>
              <th>User Type</th>
              <th>Status</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="avatar flex flex-row items-center">
                        {item.avatar ? (
                          <img src={item.avatar} alt="" />
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
                              ? dayjs(item.createdDate)?.format('MMMM DD, YYYY')
                              : '--'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.postalCode ? item.postalCode : '--'}</td>
                    <td>
                      <span className="font-bold">{item.loyaltyCoins}</span>
                    </td>
                    <td>{item.userType}</td>
                    <td>
                      {item.isActive ? (
                        <span className="badge badge-success">ACTIVE</span>
                      ) : (
                        <span className="badge badge-danger">INACTIVE</span>
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
                          aria-expanded={actionMenuOpen ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            setActionMenuItemid(list[index]);
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
      <div className="mt-5 flex items-center justify-center">
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
    </>
  );
}

export default AppUserTab;
