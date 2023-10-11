import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import dayjs from 'dayjs';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../redux/redux-hooks';
import TopBar from '../../../components/common/TopBar';
import Loader from '../../../components/common/Loader';
import Service from '../../../services/superadmin/RolePermissions';
import Notify from '../../../components/common/Notify';
import CustomText from '../../../components/common/CustomText';
import { TEXT_STORE_KEY, setText } from '../../../utils/constants';
import PermissionIcon from '../../../components/icons/PermissionIcon';

function SuperAdminRolePermissionsPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const handleFormClickOpen = () => {
    navigate('../add-role');
  };

  const handleClickSearch = (event: any) => {
    console.log('evenet', event);
    // const searchTxt = event.target.value as string;
    // const newPage = 0;
    // setSearch(searchTxt);
    // setPage(newPage);
    // Service.searchService(searchTxt, newPage, rowsPerPage).then((item) => {
    //     setList(item.data.data.list);
    //     setTotal(item.data.data.total);
    // });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      console.log('search functionality here');
      // Service.searchService(search, newPage, rowsPerPage).then((item) => {
      //     setList(item.data.data.list);
      //     setTotal(item.data.data.total);
      // });
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
      Service.getListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      console.log('serach functionality here');
      // Service.searchService(search, newPage, rowsPerPage).then((item) => {
      //     setList(item.data.data.list);
      //     setTotal(item.data.data.total);
      // });
    }
  };

  useEffect(() => {
    if (TEXT_STORE_KEY) {
      setIsNotify(true);
      setNotifyMessage({
        text: TEXT_STORE_KEY,
        type: 'success',
      });
      setText('');
    } else {
      setIsLoader(true);
    }
    Service.getListService(page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          // console.log("DAATA", item.data.data);
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        // console.log('error::::::::', error);
      });
  }, [page, rowsPerPage]);

  const editHandler = (id: string) => {
    navigate(`../edit-role/${id}`);
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      is_active: event.target.checked,
      updated_by: authState.user.id,
    };
    Service.updateStatus(id, data).then((updateItem) => {
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
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Role Permissions" />
      <div className="m-auto mx-5">
        <div className="mt-5 w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-6">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Roles
              </span>
            </div>
            <div className="col-span-6">
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => {
                    navigate(`../../permission`);
                  }}
                >
                  <span style={{ marginRight: '5px' }}>
                    <PermissionIcon />
                  </span>
                  Permissions
                </Button>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add Role
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created Date</th>
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
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.desc}</td>
                        <td>
                          {item.createdDate !== null
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )
                            : '--'}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ENABLED</span>
                          ) : (
                            <span className="badge badge-danger">DISABLED</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3 p-0"
                              onClick={() => editHandler(item.id)}
                            >
                              <EditIcon />
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
    </div>
  );
}

export default SuperAdminRolePermissionsPage;
