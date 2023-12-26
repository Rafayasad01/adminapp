import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppUser';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppUserScheduleCreatePopup from './AppUserScheduleCreatePopup';
import AppUserScheduleUpdatePopup from './AppUserScheduleUpdatePopup';

type Props = {
  appUserId?: any;
  scheduleList?: any;
  filteredWeekdays?: any;
};

function AppUserScheduleTabPage({
  scheduleList,
  appUserId,
  filteredWeekdays,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  const [list, setList] = useState<any>([]);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>();

  useEffect(() => {
    if (scheduleList?.length > 0) {
      setIsLoader(false);
      setList(scheduleList);
    }
  }, []);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    Service.appUserScheduleCreate(data)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setOpenFormDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          item.data.data.forEach((el: any) => {
            list.push(el);
          });
          setList([...list]);
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
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    data.updatedBy = authState.user.id;
    Service.appUserScheduleUpdate(data)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].startTime = item.data.data.startTime;
              list[i].endTime = item.data.data.endTime;
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
    if (listingRolePermission(dataRole, 'Customer Update Status')) {
      setIsLoader(true);
      const data = {
        id,
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.appUserScheduleUpdateStatus(data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = updateItem.data.data.isActive;
              }
              return { ...item };
            });
          });
          setIsLoader(false);
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

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Customer Create')) {
      if (list?.length >= 7) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Your schedule limit is completed',
          type: 'warning',
        });
      } else {
        setOpenFormDialog(true);
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleEdit = (id: string) => {
    if (listingRolePermission(dataRole, 'Banners Edit')) {
      setIsLoader(true);
      Service.appUserScheduleEdit(id)
        .then((item: any) => {
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
      <div>
        <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Schedules
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex items-center justify-end">
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
          {list?.length > 0 ? (
            <>
              <div className="mt-3 grid grid-cols-none">
                <table className="table-border table-auto">
                  <thead>
                    <tr>
                      <th className="w-[45%]">Work Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>status</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{item.workDay}</td>
                          <td>
                            {' '}
                            {dayjs(item.startTime).isValid()
                              ? dayjs(item.startTime).format('hh:mm A')
                              : '--'}
                          </td>
                          <td>
                            {' '}
                            {dayjs(item.endTime).isValid()
                              ? dayjs(item.endTime).format('hh:mm A')
                              : '--'}
                          </td>
                          <td>
                            {item.isActive ? (
                              <span className="badge badge-success">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="badge badge-danger">
                                INACTIVE
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex items-center justify-end">
                              <Switch
                                checked={item.isActive}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => handleSwitchChange(event, item.id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              <div>
                                <IconButton
                                  onClick={() => handleEdit(item.id)}
                                  className="mr-0"
                                  aria-label="update"
                                >
                                  <EditIcon />
                                </IconButton>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* <div className="mt-3 flex w-[100%] justify-center py-3">
                            <TablePagination
                                component="div"
                                count={total}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div> */}
            </>
          ) : (
            <CustomText noroundedborders text="No Address Records" />
          )}
        </div>
      </div>
      <AppUserScheduleCreatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
        filteredWeekdays={filteredWeekdays}
        appUserId={appUserId}
      />
      <AppUserScheduleUpdatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        callback={updateFormHandler}
      />
    </>
  );
}

export default AppUserScheduleTabPage;
