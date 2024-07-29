import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import assets from '../../../assets';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import employeeService from '../../../services/adminapp/adminStoreEmployee';
import storeLovService from '../../../services/adminapp/adminStoreService';
import PermissionPopup from '../../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE } from '../../../utils/constants';
import {
  CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
import EmployeeServiceCreatePopup from './EmployeeServiceCreatePopup';
import EmployeeServiceEditPopup from './EmployeeServiceEditPopup';
// import ServiceCatCreatePopup from './ServiceCatCreatePopup';
// import ServiceCatEditPopup from './ServiceCatEditPopup';
// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

function EmployeeServices() {
  const { empId } = useParams();
  // const authState = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  // const [search, setSearch] = useState('');
  // const [page, setPage] = useState(0);
  // const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Category ?'
  );
  const [, /* isModalImage */ setIsModalImage] = useState(false);
  const [, /* modalImage */ setModalImage] = useState('');
  const [catLovlist, setCatLovList] = useState<any>([]);
  const [empDetail, setEmpDetail] = useState<any>();

  const catLovService = useCallback(async () => {
    await storeLovService
      .StoreCatLov()
      .then((res) => {
        if (res.data.success) {
          setCatLovList(res.data.data);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, []);

  const getEmployee = useCallback(async () => {
    await employeeService
      .StoreEmployeeFind(empId)
      .then((res) => {
        if (res.data.success) {
          setEmpDetail(res.data.data);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, []);

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Category Create')) {
      setOpenFormDialog(true);
      catLovService();
      getEmployee();
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Category List')) {
      employeeService
        .StoreEmployeeServiceList(empId)
        .then((item: any) => {
          setIsLoader(false);
          setList(item.data.data);
          // setTotal(item.data.data.total);
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
  }, [null]);

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, 'Category Update')) {
        // console.log('actionMenuItemid', actionMenuItemid, list);
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        getEmployee();
        catLovService();
        setActionMenuItemid(editFormDatas.id);
        setEditFormData(editFormDatas);
        setOpenEditFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Items') {
      // navigate(`../item/${actionMenuItemid}`);
      CheckRolePermission(
        'Category Service Get',
        dataRole,
        navigate,
        `services/${actionMenuItemid}`
      );
    } else if (option === 'Delete') {
      if (listingRolePermission(dataRole, 'Category Delete')) {
        setCancelDialogOpen(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    employeeService
      .StoreEmployeeServiceCreate(empId, data)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
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
  };

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    employeeService
      .StoreEmployeeServiceUpdate(actionMenuItemid, data)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setOpenEditFormDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === updateItem.data.data.id) {
              list[i].storeServiceCategoryItem =
                updateItem.data.data.storeServiceCategoryItem;
              list[i].serviceTime = updateItem.data.data.serviceTime;
              list[i].amountType = updateItem.data.data.amountType;
              list[i].amount = updateItem.data.data.amount;
            }
          }
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
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
    if (listingRolePermission(dataRole, 'Category Update Status')) {
      const data = {
        isActive: event.target.checked,
      };
      employeeService
        .StoreEmployeeServiceUpdateStatus(id, data)
        .then((updateItem) => {
          if (updateItem.data.success) {
            setList((newArr: any) => {
              return newArr.map((item: any) => {
                if (item.id === id) {
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

  const statusCancelHandler = (isDel: string) => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Category Update Status')) {
      const data = {
        isDeleted: !!isDel,
      };
      employeeService
        .StoreEmployeeServiceDelete(actionMenuItemid, data)
        .then((updateItem) => {
          if (updateItem.data.success) {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: updateItem.data.message,
              type: 'success',
            });
            setList((newArr: any) => {
              const updatedArray = newArr.map((item: any) => {
                if (item.id === updateItem.data.data.id) {
                  item.isDeleted = updateItem.data.data.isDeleted;
                }
                return { ...item };
              });
              const filteredArray = updatedArray.filter(
                (item: any) => !item.isDeleted
              );
              return filteredArray;
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
  };

  const openModal = (avatar: string) => {
    setModalImage(avatar);
    setIsModalImage(true);
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
      <TopBar isNestedRoute title="Staff Services" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Staff Services
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

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th className="w-[20%]">Name</th>
                  <th className="w-[20%]">Description</th>
                  <th className="w-[12%]">Amount Type</th>
                  <th className="w-[10%]">Amount / Percentage</th>
                  {/* <th className="w-[10%]">Service Time (mints)</th> */}
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list?.length > 0 &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.storeServiceCategoryItem?.avatar ? (
                              <button onClick={() => openModal(item.icon)}>
                                <img
                                  className="cursor-pointer"
                                  src={item.storeServiceCategoryItem?.avatar}
                                  alt={item.storeServiceCategoryItem?.name}
                                />
                              </button>
                            ) : (
                              <img
                                src={assets.tempImages.avatarDryCLean}
                                alt=""
                              />
                            )}
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.storeServiceCategoryItem?.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.storeServiceCategoryItem.description
                            ? item.storeServiceCategoryItem.description
                            : '--'}
                        </td>
                        <td>{item.amountType ? item.amountType : '--'}</td>
                        <td>
                          {item.amount ? Math.floor(item.amount) : '--'}{' '}
                          {item.amountType === 'Percentage'
                            ? '%'
                            : item.amountType === 'None'
                            ? ''
                            : import.meta.env.VITE_CURRENCY_SYMBOL}
                        </td>
                        {/* <td>{item.serviceTime ? item.serviceTime : '--'}</td> */}
                        <td>
                          {dayjs(
                            item.storeServiceCategoryItem.createdDate
                          ).isValid()
                            ? dayjs(
                                item.storeServiceCategoryItem.createdDate
                              )?.format('ddd, MMM DD, YYYY')
                            : '--'}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Enabled</span>
                          ) : (
                            <span className="badge badge-danger">Disabled</span>
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
                              aria-expanded={
                                actionMenuOpen ? 'true' : undefined
                              }
                              aria-haspopup="true"
                              onClick={(
                                event: React.MouseEvent<HTMLElement>
                              ) => {
                                setActionMenuItemid(list[index].id);
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
            <CustomText noRoundedBorders text="No Records Found" />
          ) : null}
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
        </div>
      </div>
      {cancelDialogOpen && (
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
      )}
      {openFormDialog && (
        <EmployeeServiceCreatePopup
          empDetail={empDetail}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          catlov={catLovlist}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <EmployeeServiceEditPopup
          empDetail={empDetail}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          catlov={catLovlist}
          callback={updateFormHandler}
        />
      )}
      {/* {modalImage && (
                <Dialog
                    open={isModalImage}
                    onClose={closeModal}
                    PaperProps={{
                        className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
                        style: {
                            // maxWidth: '25%',
                            // minHeight: '45%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <div className="flex h-[100%] items-center justify-center">
                        <img
                            className="max-w-[250px] xl:max-h-[100px] 2xl:max-h-[150px]"
                            src={modalImage}
                            alt=""
                        />
                    </div>
                </Dialog>
            )} */}
    </>
  );
}

export default EmployeeServices;
