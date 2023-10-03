/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../../components/common/TopBar';
import CustomText from '../../../components/common/CustomText';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Service from '../../../services/superadmin/shop';
import Loader from '../../../components/common/Loader';
function SuperAdminShopsListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    // setSearch(searchTxt);
    // setPage(newPage);
    // Service.searchService(searchTxt, newPage, rowsPerPage).then((item) => {
    //   setList(item.data.data.list);
    //   setTotal(item.data.data.total);
    // });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    // if (search === '' || search === null || search === undefined) {
    //   Service.getListService(newPage, rowsPerPage).then((item) => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    //   });
    // } else {
    //   Service.searchService(search, newPage, rowsPerPage).then((item) => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    //   });
    // }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    // if (search === '' || search === null || search === undefined) {
    //   Service.getListService(newPage, rowsPerPage).then((item) => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    //   });
    // } else {
    //   Service.searchService(search, newPage, rowsPerPage).then((item) => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    //   });
    // }
  };

  const editHandler = (id: string) => {
    setIsLoader(true);
    // Service.get(id).then((item: any) => {
    //   if (item.data.success) {
    //     console.log('item.data.data::::::', item.data.data);
    //     setIsLoader(false);
    //     setFormDetail(item.data.data);
    //     setOpenEditFormDialog(true);
    //   } else {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: 'All fields are required!',
    //       type: 'error',
    //     });
    //   }
    // });
  };

  useEffect(() => {
    Service.getListService(page, rowsPerPage).then((item) => {
      if (item.data.success) {
        console.log('item', item.data.data)
        setList(item.data.data.list);
        setTotal(item.data.data.total);
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    });
  }, [page, rowsPerPage]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Shops" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Shop Users
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
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
                {/* <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add New
                </Button> */}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Shop</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>User Limits</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.avatar ? (
                              <Avatar
                                className="avatar flex flex-row items-center"
                                sx={{
                                  bgcolor: '#1D1D1D',
                                  width: 35,
                                  height: 35,
                                  marginRight: '10px',
                                }}
                                alt=""
                                src={item.avatar}
                              />
                            ) : (
                              <Avatar
                                className="avatar flex flex-row items-center"
                                sx={{
                                  bgcolor: '#1D1D1D',
                                  width: 35,
                                  height: 35,
                                  textTransform: 'uppercase',
                                  fontSize: '14px',
                                  marginRight: '10px',
                                }}
                              >
                                {item.firstName?.charAt(0)}
                                {item.lastName?.charAt(0)}
                              </Avatar>
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
                        <td>{item.email}</td>
                        <td>{item.role ? item.role : '--'}</td>
                        <td>{item.userLimits}</td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-danger">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() =>
                                item.isActive ? editHandler(item.id) : null
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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
    </>
  );
}

export default SuperAdminShopsListPage;
