import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CustomText from '../../../components/common/CustomText';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppUser';

type Props = {
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
};

function AppUserLoyaltyTab({
  list,
  setList,
  total,
  page,
  rowsPerPage,
  setPage,
  setTotal,
  setRowsPerPage,
  search,
}: Props) {
  const navigate = useNavigate();
  const authState: any = useAppSelector((state) => state?.authState);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.appList(
        authState.user.tenant,
        'Other',
        newPage,
        rowsPerPage
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.appListSearch(
        authState.user.tenant,
        'Other',
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
      Service.appList(
        authState.user.tenant,
        'Other',
        newPage,
        rowsPerPage
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.appListSearch(
        authState.user.tenant,
        'Other',
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
              <th className="w-[20%]">Order Number</th>
              <th>Coins</th>
              <th>Grand Total</th>
              <th>Created Date</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>{item?.appOrder[0]?.orderNumber}</div>
                    </td>
                    <td>
                      <div>{item?.coins}</div>
                    </td>
                    <td>
                      <div>${item?.appOrder[0]?.grandTotal}</div>
                    </td>
                    <td>
                      <div>
                        {dayjs(item.createdDate).format('MMMM DD, YYYY')}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row-reverse">
                        <IconButton
                          className="icon-btn"
                          onClick={() =>
                            navigate(`../history/loyalty/detail/${item.id}`)
                          }
                        >
                          <WysiwygOutlinedIcon />
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

export default AppUserLoyaltyTab;
