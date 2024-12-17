import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import categoryService from '../../services/adminapp/adminCategory';
import PermissionPopup from '../../utils/PermissionPopup';
import { ALL_PERMISSIONS, NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { CheckRolePermission, listingRolePermission } from '../../utils/helper';
import ServicesCreatePopup from './CategoriesServicesCreatePopup';
import ServicesEditPopup from './CategoriesServicesEditPopup';
import { getItem } from '../../utils/storage';
import assets from '../../assets';
import CategoriesServicesOverWritePopup from './CategoriesServicesOverridePopup';

function CategoriesServicesPage() {
  const params = useParams();
  const isShop: any = getItem('USER');
  const TITLE_TEXT: any = getItem('TITLE_TEXT');
  const BranchData: any = getItem('BRANCH_DATA');
  // const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = [`${TITLE_TEXT} faq's`, 'Edit', 'Delete'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openOverWriteFormDialog, setOpenOverWriteFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this service ?'
  );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const productId = params.productId ?? '';

  const menuActionOptions: any =
    BranchData.branchType === 'Main'
      ? actionMenuOptions
      : [`${TITLE_TEXT} faq's`];

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    categoryService
      .getCategoryServiceList(productId, {
        search: searchTxt,
        page: newPage,
        size: rowsPerPage,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    categoryService
      .getCategoryServiceList(productId, {
        search,
        page: newPage,
        size: rowsPerPage,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleAddNew = () => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.add)) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
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
    categoryService
      .getCategoryServiceList(productId, {
        search,
        page: newPage,
        size: newRowperPage,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.view)) {
      categoryService
        .getCategoryServiceList(productId, { search, page, size: rowsPerPage })
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
        });
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'error',
      });
    }
  }, [null]);

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    // const data = {
    //   isActive: false,
    //   isDeleted: true,
    //   updatedBy: authState.user.id,
    // };
    categoryService
      .deleteCategoryService(id, productId)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.filter((item: any) => item.id !== id);
          });
          let newtotal = total;
          setTotal((newtotal -= 1));
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

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.edit)) {
        const editData = list.find((item: any) => item.id === actionMenuItemid);
        setEditFormData(editData);
        setOpenEditFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === `${TITLE_TEXT} faq's`) {
      CheckRolePermission(
        ALL_PERMISSIONS.storeProduct.view,
        dataRole,
        navigate,
        `../item/faq/${actionMenuItemid}`
      );
    } else if (option === 'Delete') {
      if (
        listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.delete)
      ) {
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
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('loyaltyCoins', data.loyaltyCoins ? data.loyaltyCoins : 0);
    formData.append('icon', data.icon);
    formData.append('price', data.price);
    formData.append('desc', data.desc);
    // formData.append('createdBy', authState.user.id);
    categoryService
      .categoryServiceCreate(productId, formData)
      .then((item) => {
        if (item.data.success) {
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
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('loyaltyCoins', data.loyaltyCoins);
    formData.append('price', data.price);
    formData.append('desc', data.desc);
    // formData.append('updatedBy', authState.user.id);
    if (data.icon) formData.append('icon', data.icon);
    categoryService
      .updateCategoryService(productId, actionMenuItemid, formData)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === updateItem.data.data.id) {
              list[i].name = updateItem.data.data.name;
              list[i].quantity = updateItem.data.data.quantity;
              list[i].loyaltyCoins = updateItem.data.data.loyaltyCoins;
              list[i].price = updateItem.data.data.price;
              list[i].desc = updateItem.data.data.desc;
              if (updateItem.data.data.icon) {
                list[i].icon = updateItem.data.data.icon;
              }
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

  const handleOverWrite = (id: any) => {
    setActionMenuItemid(id);
    const editData = list.find((item: any) => item.id === id);
    setEditFormData(editData);
    setOpenOverWriteFormDialog(true);
  };

  const updateOverWriteHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    // formData.append('loyaltyCoins', data.loyaltyCoins);
    // formData.append('price', data.price);
    formData.append('parent', actionMenuItemid);
    // if (data.icon) formData.append('icon', data.icon);
    categoryService
      .overWriteCategoryService(productId, formData)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          // setList([updateItem.data.data, ...list]);
          for (let i = 0; i < list.length; i += 1) {
            if (
              list[i].id === updateItem.data.data.id ||
              list[i].id === updateItem.data.data.parent
            ) {
              list[i].name = updateItem.data.data.name;
              list[i].desc = updateItem.data.data.desc;
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
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.edit)) {
      // setIsLoader(true);
      const data = {
        isActive: event.target.checked,
        // updatedBy: authState.user.id,
      };
      categoryService
        .updateCategoryServiceStatus(productId, id, data)
        .then((updateItem) => {
          if (updateItem.data.success) {
            // setIsLoader(false);
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

  const openModal = (avatar: string) => {
    setModalImage(avatar);
    setIsModalImage(true);
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
      <TopBar isNestedRoute title={TITLE_TEXT} />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All {TITLE_TEXT} Items
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
                {isShop.userType === 'ShopUser' && (
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon"
                    onClick={handleAddNew}
                  >
                    <AddOutlinedIcon /> Add New
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th className="w-[20%]">Item</th>
                  <th className="w-[50%]">Description</th>
                  {/* <th>Min Quantity</th> */}
                  <th>Coins</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th aria-label="empty table header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.icon !== 'null' ? (
                              <button onClick={() => openModal(item.icon)}>
                                <img
                                  className="cursor-pointer"
                                  src={item.icon}
                                  alt={item.name}
                                />
                              </button>
                            ) : (
                              <img
                                className="ms-[6px] w-[30px]"
                                src={assets.images.noItems}
                                alt="no-items-img"
                              />
                            )}
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.desc ? item.desc : '--'}</td>
                        {/* <td>{item.quantity}</td> */}
                        <td>{Number(item.loyaltyCoins).toFixed(0)}</td>
                        <td>{item.price}</td>
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
                            {BranchData.branchType !== 'Main' && (
                              <IconButton
                                onClick={() => handleOverWrite(item.id)}
                                className="text-primary"
                              >
                                <EditLocationOutlinedIcon />
                              </IconButton>
                            )}
                            {BranchData.branchType === 'Main' && (
                              <Switch
                                checked={!!item.isActive}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => handleSwitchChange(event, list[index].id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            )}
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
          options={menuActionOptions}
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <ServicesCreatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <ServicesEditPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          formData={editFormData}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
        />
      )}
      {openOverWriteFormDialog && (
        <CategoriesServicesOverWritePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openOverWriteFormDialog}
          formData={editFormData}
          setOpenFormDialog={setOpenOverWriteFormDialog}
          callback={updateOverWriteHandler}
        />
      )}
      {modalImage && (
        <Dialog
          open={isModalImage}
          onClose={closeModal}
          PaperProps={{
            className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
            style: {
              // maxWidth: '20%',
              // minHeight: '35%',
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
      )}
    </>
  );
}

export default CategoriesServicesPage;
