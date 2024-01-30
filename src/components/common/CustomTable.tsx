import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import { useAppSelector } from '../../redux/redux-hooks';
import { NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import CustomAvatar from './CustomAvatar';
import CustomButton from './CustomButton';
import CustomSearchBar from './CustomSearchBar';

type Props = {
  tableHeader: string;
  tableDataTitle: Array<string>;
  list: any;
  setList: any;
  isSearch: boolean;
  isAddButton: boolean;
  actions: string;
  service: any;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleFormClickOpen: any;
  handleClickSearch: any;
  actionMenuOpen: any;
  setActionMenuAnchorEl: any;
  setActionMenuItemid: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  serviceName: string;
  setIsNotify: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifyMessage: any;
};

function CustomTable({
  tableHeader,
  tableDataTitle,
  list,
  setList,
  isSearch,
  isAddButton,
  actions,
  search,
  service,
  handleFormClickOpen,
  handleClickSearch,
  actionMenuOpen,
  setActionMenuAnchorEl,
  setActionMenuItemid,
  page,
  setPage,
  total,
  setTotal,
  rowsPerPage,
  setRowsPerPage,
  serviceName,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );

  // handle switch state
  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, serviceName)) {
      const data = {
        is_active: event.target.checked,
        updated_by: authState.user.id,
      };
      service
        .updateStatus(id, data)
        .then((updateItem: any) => {
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
        })
        .catch((err: Error) => {
          // console.log('error', err);
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
  // those function is handling pagniation
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      service
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item: any) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      service
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item: any) => {
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
      service
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item: any) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      service
        .searchService(authState.user.tenant, search, newPage, rowsPerPage)
        .then((item: any) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="w-full rounded-lg bg-white shadow-lg">
        <div className="grid grid-cols-12 px-4 py-5">
          <div className="col-span-7">
            <span className="font-open-sans text-xl font-semibold text-[#252733]">
              {tableHeader}
            </span>
          </div>
          {!isSearch && !isAddButton ? null : (
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                {isSearch && (
                  <CustomSearchBar
                    placeholder="Search"
                    onkeydown={handleClickSearch}
                  />
                )}
                {isAddButton && (
                  <CustomButton
                    buttonType="button"
                    title="Add new"
                    icon={<AddOutlinedIcon />}
                    className="btn-black-fill btn-icon"
                    onclick={handleFormClickOpen}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 grid grid-cols-none">
          <table className="table-border table-auto">
            <thead>
              <tr>
                {tableDataTitle?.map((title: string, index: number) => {
                  return <th key={index}>{title}</th>;
                })}
                {actions && <th>&nbsp;</th>}
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item: any, index: number) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="avatar flex flex-row items-center">
                          {item.avatar ? (
                            <img src={item.avatar} alt="" />
                          ) : (
                            <CustomAvatar
                              firstName={item?.firstName}
                              lastName={item?.lastName}
                            />
                            // <Avatar
                            //     className="avatar flex flex-row items-center"
                            //     sx={{
                            //         bgcolor: '#1D1D1D',
                            //         width: 35,
                            //         height: 35,
                            //         textTransform: 'uppercase',
                            //         fontSize: '14px',
                            //         marginRight: '10px',
                            //     }}
                            // >
                            //     {item?.firstName?.charAt(0)}
                            //     {item?.lastName?.charAt(0)}
                            // </Avatar>
                          )}

                          <div className="flex flex-col items-start justify-start">
                            <span className="text-sm font-semibold">
                              {`${item.firstName} ${item.lastName}`}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(item.createdDate).isValid()
                                ? dayjs(item.createdDate)?.format(
                                    'MMMM DD, YYYY'
                                  )
                                : '--'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            item.status === 'Offline' ? 'danger' : 'success'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.licenseNumber ? item.licenseNumber : '--'}</td>
                      <td>
                        {item.isActive ? (
                          <span className="badge badge-success">ACTIVE</span>
                        ) : (
                          <span className="badge badge-danger">INACTIVE</span>
                        )}
                      </td>
                      {actions === 'none' ? null : actions === 'both' ? (
                        <td>
                          <Switch
                            checked={item.isActive}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => handleSwitchChange(event, list[index].id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <CustomButton
                            disabled={item.isActive === false && true}
                            buttonType="dots"
                            isMenuOpen={actionMenuOpen}
                            onclick={(event: React.MouseEvent<HTMLElement>) => {
                              setActionMenuItemid(list[index].id);
                              setActionMenuAnchorEl(event.currentTarget);
                            }}
                          />
                          {/* <IconButton
                                                            className="btn-dot"
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={
                                                                actionMenuOpen ? 'long-menu' : undefined
                                                            }
                                                            aria-expanded={actionMenuOpen ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                                                setActionMenuItemid(list[index].id);
                                                                setActionMenuAnchorEl(event.currentTarget);
                                                            }}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton> */}
                        </td>
                      ) : actions === 'switch' ? (
                        <td>
                          <Switch
                            checked={item.isActive}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => handleSwitchChange(event, list[index].id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </td>
                      ) : actions === 'dots' ? (
                        <td>
                          <CustomButton
                            buttonType="dots"
                            isMenuOpen={actionMenuOpen}
                            onclick={(event: React.MouseEvent<HTMLElement>) => {
                              setActionMenuItemid(list[index].id);
                              setActionMenuAnchorEl(event.currentTarget);
                            }}
                          />
                          {/* <IconButton
                                                                    className="btn-dot"
                                                                    aria-label="more"
                                                                    id="long-button"
                                                                    aria-controls={
                                                                        actionMenuOpen ? 'long-menu' : undefined
                                                                    }
                                                                    aria-expanded={actionMenuOpen ? 'true' : undefined}
                                                                    aria-haspopup="true"
                                                                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                                                                        setActionMenuItemid(list[index].id);
                                                                        setActionMenuAnchorEl(event.currentTarget);
                                                                    }}
                                                                >
                                                                    <MoreVertIcon />
                                                                </IconButton> */}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {list?.length < 1 ? (
          <div className="mx-auto flex w-[90%] items-center justify-center bg-gray-200 py-5 ">
            <p>No Records Found</p>
          </div>
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
  );
}

export default CustomTable;
