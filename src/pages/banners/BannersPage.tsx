import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { AppUserEmployees } from '../../interfaces/app-user.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminBanner';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import BannerUpdatePopup from './BannerUpdatePopup';
import BannersCreatePopup from './BannersCreatePopup';

function BannersPage() {
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [emptyVariable] = useState(null);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>();
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const { reset } = useForm<AppUserEmployees>();

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Banners Create')) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  // const deleteHandler = (id: string) => {
  //   setIsLoader(true);
  //   const data = {
  //     updatedBy: authState.user.id,
  //   };
  //   // console.log(actionMenuItemid);

  //   // Service.deleteService(actionMenuItemid, data)
  //   //   .then((item: any) => {
  //   //     if (item.data.success) {
  //   //       setIsLoader(false);
  //   //       setIsNotify(true);
  //   //       setNotifyMessage({
  //   //         text: item.data.message,
  //   //         type: 'success',
  //   //       });
  //   //       setList((newArr: any) => {
  //   //         return newArr.filter(
  //   //           (newItem: any) => newItem.id !== item.data.data.id
  //   //         );
  //   //       });
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     setIsLoader(false);
  //   //     setIsNotify(true);
  //   //     setNotifyMessage({
  //   //       text: err.message,
  //   //       type: 'error',
  //   //     });
  //   //   });
  // };

  // const statusCancelHandler = () => {
  //   deleteHandler(actionMenuItemid);
  // };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Banners List')) {
      Service.getBanners(authState.user.tenant)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            // console.log('bannerss lsit', item.data.data);
            setList(item.data.data);
            // setTotal(item.data.data.total);
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
    }
  }, [emptyVariable]);

  const createFormHandler = (bannerData: any) => {
    if (listingRolePermission(dataRole, 'Banners Create')) {
      setIsLoader(true);
      const formData = new FormData();
      formData.append('name', bannerData.name ?? '');
      formData.append('bannerType', bannerData.bannerType);
      formData.append('shortDesc', bannerData.shortDesc ?? '');
      formData.append('pageDetail', bannerData.pageDetail ?? '');
      formData.append('link', bannerData.link ?? '');
      formData.append('banner', bannerData.bannerImg);
      formData.append('createdBy', authState.user.id);
      formData.append('tenant', authState.user.tenant);
      Service.createBanner(formData)
        .then((item) => {
          if (item.data.success) {
            setOpenFormDialog(false);
            reset();
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setList([...list, item.data.data]);
          } else {
            reset();
            setOpenFormDialog(true);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          reset();
          setOpenFormDialog(true);
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

  const updateFormHandler = (data: any) => {
    if (listingRolePermission(dataRole, 'Banners Update')) {
      setIsLoader(true);
      const formDetails = new FormData();
      formDetails.append('name', data.name ?? '');
      formDetails.append('bannerType', data.bannerType);
      formDetails.append('shortDesc', data.shortDesc ?? '');
      formDetails.append('pageDetail', data.pageDetail ?? '');
      formDetails.append('link', data.link ?? '');
      if (data.bannerImg !== null) formDetails.append('banner', data.bannerImg);
      // formDetails.append('bannerId', data.id);
      formDetails.append('updatedBy', authState.user.id);
      Service.updateBanners(formDetails, editFormData?.id)
        .then((item) => {
          if (item.data.success) {
            // console.log('UPDATED', item.data.data);
            setOpenEditFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            for (let i = 0; i < list.length; i += 1) {
              if (list[i].id === item.data.data.id) {
                list[i].name = item.data.data.name;
                list[i].banner = item.data.data.banner;
                list[i].bannerType = item.data.data.bannerType;
                list[i].shortDesc = item.data.data.shortDesc;
                list[i].pageDetail = item.data.data.pageDetail;
                list[i].link = item.data.data.link;
              }
            }
            reset();
          } else {
            reset();
            setOpenEditFormDialog(false);
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          reset();
          setOpenEditFormDialog(false);
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

  const handleEdit = (id: string) => {
    if (listingRolePermission(dataRole, 'Banners Edit')) {
      setIsLoader(true);
      Service.editBanners(id)
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

  const handleDelete = (id: string) => {
    if (listingRolePermission(dataRole, 'Banners Delete')) {
      setIsLoader(true);
      const deleteObj = {
        updatedBy: authState.user.id,
      };
      Service.deleteBanner(deleteObj, id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
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

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Banners Update Status')) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.BannerUpdateStatus(data, id).then((updateItem) => {
        if (updateItem.data.success) {
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
      <TopBar title="Banners" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 pt-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Banners
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
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
            <div className="grid grid-cols-12 items-center justify-center gap-6 p-5">
              {list?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center xl:col-span-4 2xl:col-span-3"
                  >
                    <Card className="w-[500px] rounded-lg border-[2px] shadow-none">
                      <div className="m-5 flex h-[150px] items-center justify-center">
                        <img
                          className="max-h-[160px] max-w-[250px]"
                          src={item.banner}
                          alt={item.name}
                        />
                      </div>
                      <CardContent className="mt-5">
                        <hr />
                      </CardContent>
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <span className="text-lg font-semibold">
                            {item.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            {item.bannerType}
                          </span>
                        </div>
                      </div>
                      {/* {item.shortDesc && (
                        <>
                          <CardContent className="">
                            <hr />
                          </CardContent>
                          <div className="px-3">
                            <p className="text-base font-semibold">
                              Short Description
                            </p>
                          </div>
                          <div className="px-3">
                            <p className="text-sm">{item.shortDesc}</p>
                          </div>
                        </>
                      )}
                      {item.pageDetail && (
                        <>
                          <CardContent className="">
                            <hr />
                          </CardContent>
                          <div className="px-3">
                            <p className="text-base font-semibold">
                              Page Detail Description
                            </p>
                          </div>
                          <div className="px-3">
                            <p
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: item.pageDetail,
                              }}
                            />
                          </div>
                        </>
                      )} */}
                      <CardActions className="">
                        <div className="flex w-full items-center justify-between">
                          <div>
                            <IconButton
                              onClick={() => handleEdit(item.id)}
                              className="mr-0"
                              aria-label="update"
                            >
                              <EditIcon />
                            </IconButton>
                          </div>
                          <div>
                            <IconButton
                              onClick={() => handleDelete(item.id)}
                              className="mr-0"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 flex w-full items-center justify-center bg-slate-200 p-4">
              <p className="font-semibold">No Banners Record</p>
            </div>
          )}
        </div>
      </div>

      {openFormDialog && (
        <BannersCreatePopup
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
        />
      )}

      {openEditFormDialog && (
        <BannerUpdatePopup
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          formData={editFormData}
        />
      )}
    </>
  );
}

export default BannersPage;
