import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import CustomText from '../../components/common/CustomText';
import { formatCurrency, listingRolePermission } from '../../utils/helper';
import { ALL_PERMISSIONS, NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { useAppSelector } from '../../redux/redux-hooks';
import ActionMenu from '../../components/common/ActionMenu';
import PermissionPopup from '../../utils/PermissionPopup';
import Loader from '../../components/common/Loader';
import adminQuotation from '../../services/adminapp/adminQuotation';
import Quotation from '../../interfaces/Quotation';

const QuotationsPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isNotify, setIsNotify] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [actionMenuItemid, setActionMenuItemid] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const [list, setList] = useState<Quotation[]>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Details', 'Edit', 'Delete'];
  const [isLoader, setIsLoader] = useState(false);
  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Quotation ?'
  );
  const navigate = useNavigate();

  const fetchQuotations = (data = {}) => {
    adminQuotation
      .getQuotationService(data)
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
    setList([]);
    setTotal(0);
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
    handlePermissionCheck(ALL_PERMISSIONS.vendors.add, () => {
      navigate('./create');
    });
  };

  const handleClickSearch = () => {
    const searchTxt = search;
    const newPage = 0;
    setPage(newPage);
    fetchQuotations({
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
      fetchQuotations({
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
    fetchQuotations({
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
    fetchQuotations({
      search: search ?? null,
      page: newPage,
      size: newRowperPage,
    });
  };

  const menuHandler = (option: string) => {
    if (option === 'Edit') {
      handlePermissionCheck(ALL_PERMISSIONS.vendors.edit, () => {
        const editFormData = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        if (editFormData) {
          setActionMenuItemid(editFormData.id);
          navigate(`./edit/${editFormData.id}`);
        }
      });
    } else if (option === 'Delete') {
      handlePermissionCheck(ALL_PERMISSIONS.vendors.delete, () =>
        setCancelDialogOpen(true)
      );
    }
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    adminQuotation
      .deleteStatusQuotationService({ id })
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
    fetchQuotations({
      search: search ?? null,
      page,
      size: rowsPerPage,
    });
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Projects" />

      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Quotations
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
                  <th>Quote</th>
                  <th>Customer</th>
                  <th className="">Expiry</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: Quotation, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.quoteNumber ?? '--'}</td>
                        <td>{item.appUserName ?? '--'}</td>
                        <td>
                          {dayjs(item.expiryDate).isValid()
                            ? dayjs(item.expiryDate)?.format(
                                'ddd, MMM DD, YYYY '
                              )
                            : '--'}
                        </td>
                        <td>
                          {item.discount ?? '--'}{' '}
                          {item.discountType === 'percentage' ? '%' : '/='}{' '}
                        </td>
                        <td>{formatCurrency(Number(item.total) ?? 0)}</td>
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
    </>
  );
};

export default QuotationsPage;
