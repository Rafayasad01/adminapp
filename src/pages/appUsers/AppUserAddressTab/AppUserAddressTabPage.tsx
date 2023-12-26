import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppUser';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import AppUserAddressCreatePopup from './AppUserAddressCreatePopup';
import AppUserAddressUpdatePopup from './AppUserAddressUpdatePopup';

type Props = {
  addressList?: any;
  appUserId?: any;
  setAddress?: any;
};

function AppUserAddressTabPage({ addressList, appUserId, setAddress }: Props) {
  const [emptyVariable] = useState<any>('');
  const authState: any = useAppSelector((state) => state?.authState);
  const [list, setList] = useState<any>();
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>();
  const appUserAddressTypeLov = [
    {
      id: 'Home',
      name: 'Home',
    },
    {
      id: 'Office',
      name: 'Office',
    },
    {
      id: 'Other',
      name: 'Other',
    },
  ];

  useEffect(() => {
    if (addressList?.length > 0) {
      setIsLoader(false);
      setList(addressList);
    }
  }, [emptyVariable]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = {
      latitude: data.latitude ? data.latitude : null,
      longitude: data.longitude ? data.longitude : null,
      type: data.type,
      address: data.address,
      tenant: authState.user.tenant,
      appUser: appUserId,
    };
    Service.appUserAddressCreate(formData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setAddress(item.data.data.address);
          setList((newArr: any) => {
            return newArr
              .map((items: any) => {
                items.isActive = false;
                return { ...items };
              })
              .concat(item.data.data);
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
  };

  const updateFormHandler = (data: any, id: string) => {
    setIsLoader(true);
    const formData = {
      id,
      latitude: data.latitude ? data.latitude : null,
      longitude: data.longitude ? data.longitude : null,
      type: data.type,
      address: data.address,
    };
    Service.appUserAddressUpdate(formData)
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
              list[i].latitude = item.data.data.latitude;
              list[i].longitude = item.data.data.longitude;
              list[i].type = item.data.data.type;
              list[i].address = item.data.data.address;
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
    if (listingRolePermission(dataRole, 'Customer Update Status')) {
      setIsLoader(true);
      const data = {
        id,
        isActive: event.target.checked,
      };
      Service.appUserAddressUpdateStatus(data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              // console.log('ITEMMMMMMMM', item);
              if (item.id === updateItem.data.data.id) {
                item.isActive = updateItem.data.data.isActive;
                setAddress(item.address);
              } else {
                item.isActive = false;
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
      if (list?.length >= 5) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Your address limit is completed',
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
      Service.appUserAddressEdit(id)
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
                All Address
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
            <div className="mt-3 grid grid-cols-none">
              <table className="table-border table-auto">
                <thead>
                  <tr>
                    <th className="w-[50%]">address</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>type</th>
                    <th>status</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.address}</td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                        <td>{item.type}</td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ACTIVE</span>
                          ) : (
                            <span className="badge badge-danger">INACTIVE</span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center justify-end">
                            <Switch
                              disabled={item.isActive && true}
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
          ) : (
            <CustomText noroundedborders text="No Address Records" />
          )}
        </div>
      </div>
      <AppUserAddressCreatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
        appUserAddressTypeLov={appUserAddressTypeLov}
      />
      <AppUserAddressUpdatePopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        setEditFormData={setEditFormData}
        callback={updateFormHandler}
        appUserAddressTypeLov={appUserAddressTypeLov}
      />
    </>
  );
}

export default AppUserAddressTabPage;
