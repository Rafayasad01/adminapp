import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Switch,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import dayjs from 'dayjs';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import CustomText from '../../components/common/CustomText';
import { listingRolePermission } from '../../utils/helper';
import adminVendors from '../../services/adminapp/adminVendors';
import { ALL_PERMISSIONS, NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { useAppSelector } from '../../redux/redux-hooks';
import ActionMenu from '../../components/common/ActionMenu';
import PermissionPopup from '../../utils/PermissionPopup';
import Loader from '../../components/common/Loader';
import { Vendor, VendorTypes } from '../../interfaces/Vendor';
import VendorAddPopup from './VendorTypesAddPopup';
import VendorEditPopup from './VendorTypesEditPopup';

const VendorTypePage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isNotify, setIsNotify] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [actionMenuItemid, setActionMenuItemid] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [vendorData, setVendorData] = useState<VendorTypes>();
  const [list, setList] = useState<VendorTypes[]>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [isLoader, setIsLoader] = useState(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Vendor Type ?'
  );

  const fetchVendorType = (data = {}) => {
    adminVendors
      .getVendorTypeService(data)
      .then((res) => {
        if (res.data.success) {
          setList(res.data.data.list);
          setTotal(res.data.data.total);
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

  const handlePermissionCheck = (permission: string, callback: () => void) => {
    if (listingRolePermission(dataRole, permission)) {
      callback();
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleFormClickOpen = () => {
    handlePermissionCheck(ALL_PERMISSIONS.vendors.addVendorTypes, () => {
      setOpenCreateDialog(true);
    });
  };

  const handleClickSearch = () => {
    const searchTxt = search;
    const newPage = 0;
    setPage(newPage);
    fetchVendorType({
      search: searchTxt,
      page: newPage,
      size: rowsPerPage,
    });
  };
  const handleSearchEnter = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setPage(newPage);
      fetchVendorType({
        search: searchTxt,
        page: newPage,
        size: rowsPerPage,
      });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    fetchVendorType({
      search: search ?? null,
      page: newPage,
      size: rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    fetchVendorType({
      search: search ?? null,
      page: newPage,
      size: newRowperPage,
    });
  };

  const menuHandler = (option: string) => {
    if (option === 'Edit') {
      handlePermissionCheck(ALL_PERMISSIONS.vendors.editVendorTypes, () => {
        const editFormData = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        if (editFormData) {
          setActionMenuItemid(editFormData.id);
          setVendorData(editFormData);
          setOpenEditDialog(true);
        }
      });
    } else if (option === 'Delete') {
      handlePermissionCheck(ALL_PERMISSIONS.vendors.deleteVendorTypes, () =>
        setCancelDialogOpen(true)
      );
    }
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    adminVendors
      .deleteStatusVendorTypeService({ id })
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
          setTotal((t) => t - 1);
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

  useEffect(() => {
    fetchVendorType({
      search: search ?? null,
      page,
      size: rowsPerPage,
    });
  }, []);

  const createFormHandler = async (data: VendorTypes) => {
    data.tenant = authState.user.tenant;
    setIsLoader(true);
    const success = await adminVendors
      .createVendorTypeService(data)
      .then((res) => {
        setIsLoader(false);
        if (res.data.success === false) {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
          return false;
        }

        setIsNotify(true);
        setNotifyMessage({
          text: res.data.message,
          type: 'success',
        });
        const t = parseInt(total.toString(), 10) + 1;
        setTotal(t);
        setList([res.data.data, ...list]);
        return true;
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
        return false;
      });
    return success;
  };

  const updateFormHandler = async (data: Vendor) => {
    setIsLoader(true);
    const success = await adminVendors
      .updateVendorTypeService(vendorData?.id ?? '', data)
      .then((res) => {
        setIsLoader(false);
        if (res.data.success === false) {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
          setOpenEditDialog(true);
          return false;
        }

        setIsNotify(true);
        setNotifyMessage({
          text: res.data.message,
          type: 'success',
        });
        const vendor: VendorTypes = res.data.data;
        const updatedList = list.map((item: VendorTypes) =>
          item.id === vendor.id ? vendor : item
        );
        setList([...updatedList]);
        setVendorData(undefined);
        return true;
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
        return false;
      });
    return success;
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.vendors.editVendorTypes)
    ) {
      const data = {
        isActive: event.target.checked,
      };
      adminVendors
        .updateStatusVendorTypeService(id, data)
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

  return (
    <>
      {isLoader && <Loader />}
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Vendor Types" />

      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Vendor Types
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
                    onKeyUp={(e: any) => setSearch(e.target.value)}
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleSearchEnter(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton
                          onClick={handleClickSearch}
                          aria-label="toggle password visibility"
                        >
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
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="">Description</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: VendorTypes, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.name ?? '--'}</td>
                        <td>{item.desc ?? '--'}</td>
                        <td>
                          {dayjs(item.createdAt).isValid()
                            ? dayjs(item.createdAt)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
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
                                setActionMenuItemid(item.id);
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
          options={actionMenuOptions}
          callback={menuHandler}
        />
      )}

      <VendorAddPopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openCreateDialog}
        setOpenFormDialog={setOpenCreateDialog}
        callback={createFormHandler}
      />
      <VendorEditPopup
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
        openFormDialog={openEditDialog}
        setOpenFormDialog={setOpenEditDialog}
        callback={updateFormHandler}
        existingVendorData={vendorData}
      />
    </>
  );
};

export default VendorTypePage;
