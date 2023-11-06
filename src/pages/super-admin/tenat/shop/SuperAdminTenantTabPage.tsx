import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import PreviewIcon from '@mui/icons-material/Preview';
import ViewListIcon from '@mui/icons-material/ViewList';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import Service from '../../../../services/superadmin/Tenant';
import Loader2 from '../../../../components/common/Loader2';
import SuperAdminTenantUpdatePopup from './SuperAdminTenantUpdatePopup';
import Notify from '../../../../components/common/Notify';
import SuperAdminTenantCreatePopup from './SuperAdminTenantCreatePopup';
import SuperAdminShopBranchDetailPopup from './SuperAdminShopBranchDetailPopup';
import SuperAdminSettingTabPage from './SuperAdminSettingTabPage';
import SuperAdminCategoryTabPage from './SuperAdminCategoryTabPage';
import { useAppSelector } from '../../../../redux/redux-hooks';

type Props = {
  tenant: string;
};

function SuperAdminTenantTabPage({ tenant }: Props) {
  const authState: any = useAppSelector((state) => state.authState);
  const [emptyVariable, setEmptyVariable] = useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [detail, setDetail] = useState<any>(null);
  const [settingDetail, setSettingDetail] = useState<any>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openSettingDialog, setOpenSettingDialog] = useState(false);
  const [branchDialog, setBranchDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [formDetail, setFormDetail] = useState<any>(null);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [rolelist, setRoleList] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [isTrialMode, setIsTrialMode] = React.useState<boolean>(false);

  const getShopService = (id: any, setModalHandler: any) => {
    Service.getShop(id)
      .then((item: any) => {
        if (item.data.success) {
          console.log('item.data.data::::::', item.data.data);
          setIsLoader(false);
          setFormDetail(item.data.data);
          setModalHandler(true);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: 'All fields are required!',
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

  const getSettingById = (id: any) => {
    setIsLoader(true);
    Service.detailShopSetting(id)
      .then((item: any) => {
        if (item.data.success) {
          setSettingDetail(item.data.data.tenantConfig);
          setOpenSettingDialog(true);
          setIsLoader(false);
        } else {
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setOpenSettingDialog(false);
      });
  };

  const getCategoryById = (id: any) => {
    setIsLoader(true);
    Service.detailShopCategory(id)
      .then((item: any) => {
        if (item.data.success) {
          setCategories(item.data.data);
          setSubCategories(item.data.data[0].homeCatItem);
          setOpenCategoryDialog(true);
          setIsLoader(false);
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
        console.log(err);
        setIsLoader(false);
      });
  };

  const openBranchModal = (id: any) => {
    setIsLoader(true);
    getShopService(id, setBranchDialog);
  };

  const editHandler = (id: any) => {
    setIsLoader(true);
    getShopService(id, setOpenEditFormDialog);
  };

  const createFormBranchHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('tenantName', data.tenantName);
    formData.append('email', data.email);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('trialMode', data.trialMode);
    formData.append('developmentDomain', data.developmentDomain);
    formData.append('liveDomain', data.liveDomain);
    formData.append('role', data.role);
    formData.append('maxBranchLimit', data.maxBranchLimit);
    formData.append('maxUserLimit', data.maxUserLimit);
    formData.append(
      'trialModeLimit',
      data.trialModeLimit ? data.trialModeLimit : 0
    );
    console.log('formdata 2', formData);

    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.createShopBranch(formData, tenant)
        .then((item: any) => {
          if (item.data.success) {
            console.log('ITEMMM', item.data);
            setIsLoader(false);
            setDetail((prevDetail: any) => ({
              ...prevDetail,
              branches: [...prevDetail.branches, item.data.data],
            }));
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
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
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      isActive: event.target.checked,
      // trialMode: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updateShopStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        const newTempArr = detail.branches.map((item: any) => {
          console.log('itemss', item);
          if (item.id === id) {
            item.isActive = updateItem.data.data.isActive;
            // item.trialMode = updateItem.data.data.trialMode;
          }
          return { ...item };
        });
        setDetail({ ...detail, newTempArr });
        // setDetail((newArr: any) => {
        //   console.log("neearr", newArr, id)
        //   return newArr.branches.map((item: any) => {
        //     console.log("itemss", item);

        //     if (item.id === id) {
        //       item.isActive = updateItem.data.data.isActive;
        //       // item.trialMode = updateItem.data.data.trialMode;
        //     }
        //     return { ...item };
        //   });
        // });
      }
    });
  };

  console.log('DETAILS DATA', detail);

  const updateFormBranchHandler = (id: string, data: any) => {
    setIsLoader(true);
    if (data.trialUpdateMode) setIsTrialMode(true);
    console.log('formDATA1', data);
    const formData = {
      tenantName: data.tenantName,
      // email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      trialMode: formDetail?.trialMode,
      trialUpdateMode: data.trialUpdateMode,
      developmentDomain: data.developmentDomain,
      trialModeLimit: data.trialModeLimit ? data.trialModeLimit : 0,
      liveDomain: data.liveDomain,
      role: data.role,
      maxBranchLimit: data.maxBranchLimit,
      maxUserLimit: data.maxUserLimit,
    };
    console.log('formDATA2', formData);
    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.updateShop(id, formData)
        .then((items: any) => {
          if (items.data.success) {
            Service.getShopWithBranch(tenant).then((item: any) => {
              if (item.data.success) {
                setIsNotify(true);
                setNotifyMessage({
                  text: item.data.message,
                  type: 'success',
                });
                setDetail(item.data.data);
                setIsLoader(false);
              }
            });
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: items.data.message,
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
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    Service.getShopWithBranch(tenant)
      .then((item: any) => {
        if (item.data.success) {
          setDetail(item.data.data);
          setIsLoader(false);
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
  }, []);

  const handleFormClickOpenNewBranch = () => {
    if (detail.maxBranchLimit <= detail.branches?.length) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Branch Limit is full',
        type: 'error',
      });
    } else {
      setIsLoader(true);
      Service.getRoleListLOV()
        .then((item) => {
          setIsLoader(false);
          setRoleList(item.data.data);
          setOpenFormDialog(true);
        })
        .catch((err) => {
          setIsLoader(false);
        });
    }
  };

  const getDate = (date: any) => {
    const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
    const toString = dayjs(date)?.toString().split(' ').pop();
    const timeZone = dayjs(date)?.format('ZZ');
    return `${formatDate} ${toString} ${timeZone}`;
  };

  const getRemainingTime = (time: any) => {
    const addTime = dayjs(time).add(15, 'days');
    const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
    const diffBetween = dayjs.duration(dayjs().diff(endTime));
    const remainingTime = Math.abs(diffBetween.days());
    let dayTxt = 'day';
    if (remainingTime > 1) {
      dayTxt = 'days';
    }
    let remainingTxt;
    if (remainingTime <= 0) {
      remainingTxt = 'Expired';
    } else {
      remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
    }
    return remainingTxt;
  };

  return isLoader ? (
    <Loader2 />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      {detail === null && (
        <div className="mx-5">
          <span className="font-open-sans text-lg font-semibold text-[#1A1A1A]">
            Shop Name
          </span>
        </div>
      )}
      {detail ? (
        <div className="grid w-full gap-3 xl:grid-cols-8 2xl:grid-cols-12">
          <div className="col-span-4 flex w-full justify-between py-[2rem]">
            <div className="flex flex-col px-5">
              <div className="flex w-full flex-col">
                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                  Shop Name
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {detail.name}
                </div>
              </div>

              <div className="grid w-[100%] grid-cols-2">
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Created Date
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {dayjs(detail.createdDate).isValid() ? (
                      <>{getDate(detail.createdDate)}</>
                    ) : (
                      '--'
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col items-center">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Status
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.isActive ? (
                      <span className="badge badge-success">Enabled</span>
                    ) : (
                      <span className="badge badge-danger">Disabled</span>
                    )}
                  </div>
                </div>
              </div>

              {detail.desc && (
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Description
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.desc}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Trail Start Date
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {dayjs(detail.trailStartDate).isValid() ? (
                      <>{getDate(detail.trailStartDate)}</>
                    ) : (
                      '--'
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col items-center">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Trial End Time
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {dayjs(detail.trailStartDate).isValid() ? (
                      <>{getRemainingTime(detail.trailStartDate)}</>
                    ) : (
                      '--'
                    )}
                  </div>
                </div>
              </div>

              <div className="grid w-[100%] grid-cols-2">
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Branch
                  </span>
                  <div className="mt-1 w-16 text-center font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <span className="badge badge-primary">
                      {detail.maxBranchLimit} - {detail.branches?.length}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col items-center">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Employees
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <span className="badge badge-primary">
                      {detail.maxUserLimit} - {detail.userCounts}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                  Trial Mode
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  <Switch
                    checked={detail?.trialMode}
                    inputProps={{ 'aria-label': 'controlled' }}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="">
                <IconButton
                  title="View Branch"
                  className="m-0"
                  onClick={() => openBranchModal(tenant)}
                >
                  <PreviewIcon />
                </IconButton>
              </div>
              <div className="">
                <IconButton
                  title="Branch Category"
                  className="m-0"
                  onClick={() => getCategoryById(tenant)}
                >
                  <ViewListIcon />
                </IconButton>
              </div>
              <div className="">
                <IconButton
                  title="Branch Setting"
                  className="m-0"
                  onClick={() => getSettingById(tenant)}
                >
                  <SettingsIcon />
                </IconButton>
              </div>
              <div>
                <IconButton
                  title="Edit Branch"
                  className="m-0 pl-1"
                  onClick={() => editHandler(tenant)}
                >
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-5 xl:col-span-4 2xl:col-span-8">
            <div className="mt-5">
              <Button
                variant="contained"
                className="btn-black-fill btn-icon"
                onClick={handleFormClickOpenNewBranch}
              >
                <AddOutlinedIcon /> Add New Branch
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="col-span-12 grid items-center justify-center">
            <p>No Shop Owner Found!</p>
          </div>
        </div>
      )}
      <div>
        <hr className="mx-5 my-3" />
        <div className="m-5">
          <p className="text-lg font-semibold text-[#1A1A1A]">Shop Branches</p>
          <div className="mt-4 grid grid-cols-12 gap-6">
            {detail?.branches?.length > 0 ? (
              detail?.branches?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="rounded-lg bg-blue-50 shadow-xl xl:col-span-4 2xl:col-span-3"
                  >
                    <div className="flex w-full justify-between py-[2rem]">
                      <div className="flex flex-col px-5">
                        <div className="flex w-full flex-col">
                          <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                            Shop Name
                          </span>
                          <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                            {item.name}
                          </div>
                        </div>

                        <div className="flex w-[100%] ">
                          <div className="mt-4 flex w-full flex-col">
                            <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                              Employees
                            </span>
                            <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                              <span className="badge badge-primary">
                                {item.maxUserLimit} - {item.userCounts}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="flex ">
                          <div className="flex items-center justify-end">
                            <IconButton
                              title="View Branch"
                              className="m-0"
                              onClick={(event) => openBranchModal(item.id)}
                            >
                              <PreviewIcon />
                            </IconButton>
                          </div>
                          <div className="flex items-center justify-end">
                            <IconButton
                              title="Branch Category"
                              className="m-0"
                              onClick={() => getCategoryById(item.id)}
                            >
                              <ViewListIcon />
                            </IconButton>
                          </div>
                          <div className="flex items-center justify-end">
                            <IconButton
                              title="Branch Setting"
                              className="m-0"
                              onClick={() => getSettingById(item.id)}
                            >
                              <SettingsIcon />
                            </IconButton>
                          </div>
                          <div className="flex items-center justify-end">
                            <IconButton
                              title="Edit Branch"
                              className="m-0"
                              onClick={() => editHandler(item.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className="flex h-[90%] items-center justify-end px-3 font-open-sans font-normal">
                          {item.isActive ? (
                            <span className="badge badge-success">Enabled</span>
                          ) : (
                            <span className="badge badge-danger">Disabled</span>
                          )}
                          <div>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, item.id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-12 grid items-center justify-center">
                <p>No Branches Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {openCategoryDialog && (
        <SuperAdminCategoryTabPage
          setOpenFormDialog={setOpenCategoryDialog}
          openFormDialog={openCategoryDialog}
          categories={categories}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          setCategories={setCategories}
        />
      )}

      {openSettingDialog && (
        <SuperAdminSettingTabPage
          setOpenFormDialog={setOpenSettingDialog}
          openFormDialog={openSettingDialog}
          detail={settingDetail}
        />
      )}

      {branchDialog && (
        <SuperAdminShopBranchDetailPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          items={formDetail}
          openFormDialog={branchDialog}
          setOpenFormDialog={setBranchDialog}
        />
      )}

      {openFormDialog && (
        <SuperAdminTenantCreatePopup
          type
          roles={rolelist}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormBranchHandler}
        />
      )}

      {openEditFormDialog && (
        <SuperAdminTenantUpdatePopup
          role={formDetail?.backofficeUser?.role}
          roles={formDetail?.roles}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          item={formDetail}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormBranchHandler}
        />
      )}
    </div>
  );
}

export default SuperAdminTenantTabPage;
