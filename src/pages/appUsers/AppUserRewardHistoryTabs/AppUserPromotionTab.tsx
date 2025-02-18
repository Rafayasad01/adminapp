import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CustomText from '../../../components/common/CustomText';
import { useAppSelector } from '../../../redux/redux-hooks';
import appUserService from '../../../services/adminapp/adminAppUser';
import { ALL_PERMISSIONS, CURRENCY_PREFIX } from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';

type AppUserPromotionTabProps = {
  list: any;
  total: number;
  page: number;
  rowsPerPage: number;
  setPage: any;
  setTotal: any;
  setRowsPerPage: any;
  setList: any;
  search: string;
  setSearch: any;
  userId: any;
};

function AppUserPromotionTab({
  list,
  userId,
  setList,
  total,
  page,
  rowsPerPage,
  setPage,
  setTotal,
  setRowsPerPage,
  search,
  setSearch,
}: AppUserPromotionTabProps) {
  const navigate = useNavigate();
  // const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      appUserService
        .appUserVocuherHistoryList(userId, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      appUserService
        .appUserSearchVocuherHistoryList(userId, search, newPage, rowsPerPage)
        .then((item) => {
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
      appUserService
        .appUserVocuherHistoryList(userId, newPage, newRowperPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      appUserService
        .appUserSearchVocuherHistoryList(userId, search, newPage, newRowperPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      appUserService
        .appUserSearchVocuherHistoryList(
          userId,
          searchTxt,
          newPage,
          rowsPerPage
        )
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const ConvertToAmount: any = (totalAmount: any, PercentageValue: any) => {
    return `${(totalAmount * (PercentageValue / 100)).toFixed(
      0
    )} ${CURRENCY_PREFIX}`;
  };

  return (
    <>
      <div className="mt-1 grid grid-cols-none">
        <div className="my-3 flex items-center justify-end">
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
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton aria-label="toggle password visibility">
                    <SearchIcon className="text-[#6A6A6A]" />
                  </IconButton>
                </InputAdornment>
              }
              disableUnderline
            />
          </FormControl>
        </div>
        <table className="table-border table-auto">
          <thead>
            <tr>
              <th className="">Voucher Code</th>
              <th>Discount</th>
              <th>Amount</th>
              <th className="w-[15%]">Order Number</th>
              <th>Avail Date</th>
              <th aria-label="empty table header">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list?.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>{item?.adminVoucher?.voucherCode}</div>
                    </td>
                    <td>
                      {item?.adminVoucher?.discountType === 'Amount'
                        ? `${Number(item?.adminVoucher?.value).toFixed(
                            0
                          )} ${CURRENCY_PREFIX}`
                        : ConvertToAmount(
                            Number(item?.adminVoucher?.value).toFixed(0),
                            Number(item?.appOrder[0]?.totalAmount)
                          )}
                    </td>
                    <td>
                      <div>
                        {item?.appOrder[0]?.grandTotal} {CURRENCY_PREFIX}
                      </div>
                    </td>
                    <td>
                      <div>{item?.appOrder[0]?.orderNumber}</div>
                    </td>
                    <td>
                      <div>
                        {item?.adminVoucher?.redeemDate
                          ? dayjs(item?.adminVoucher?.redeemDate).format(
                              'MMMM DD, YYYY'
                            )
                          : 'Date not available'}
                      </div>
                    </td>
                    {listingRolePermission(
                      dataRole,
                      ALL_PERMISSIONS.storeUser.viewUserAppRewardHistory
                    ) && (
                      <td>
                        <div className="flex flex-row-reverse">
                          <IconButton
                            className="icon-btn"
                            onClick={() =>
                              navigate(
                                `/admin/dashboard/app-user/reward/history/voucher/detail/${item.id}`
                              )
                            }
                          >
                            <WysiwygOutlinedIcon />
                          </IconButton>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {list?.length < 1 ? (
        <CustomText noRoundedBorders text="No Records Found" />
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
      {/* {actionMenuAnchorEl && (
                <ActionMenu
                    open={actionMenuOpen}
                    anchorEl={actionMenuAnchorEl}
                    setAnchorEl={setActionMenuAnchorEl}
                    options={actionMenuOptions}
                    callback={manuHandler}
                />
            )} */}
    </>
  );
}

export default AppUserPromotionTab;
