import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/superadmin/RolePermissions';
import { TEXT_STORE_KEY, setText } from '../../../utils/constants';
import SuperAdminPermissionPagePopup from './SuperAdminPermissionPagePopup';

function SuperAdminPermissionPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const [emptyVariable] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [heading] = useState<string>('');
  const [childList] = useState<any>();

  const handleClickSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const executeQuery = () => {
    Service.getPermissionSearchService(search, page, rowsPerPage)
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      executeQuery();
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const tempPage = newPage;
    setPage(tempPage);
    // // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getPermissionListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getPermissionSearchService(search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
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
      Service.getPermissionListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getPermissionSearchService(search, newPage, rowsPerPage).then(
        (item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      );
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
    Service.getPermissionListService(page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'success',
        });
        // console.error('error::::::::', error);
      });
  }, [emptyVariable]);

  const editHandler = (id: string) => {
    navigate(`../edit-permission/${id}`);
  };

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      isActive: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updatePermissionStatus(id, data).then((updateItem) => {
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
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Permissions" />
      <div className="container m-auto">
        <div className="mt-5 w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Permissions
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
                    onChange={(event) => handleClickSearch(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton
                          onClick={executeQuery}
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
                  className="btn-black-fill btn-icon flex items-center"
                  onClick={() => navigate('../add-permission')}
                >
                  <AddOutlinedIcon />{' '}
                  <span className="w-[100px] text-xs">Add Permission</span>
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
                  <th>Type</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm font-semibold">{item.name}</td>
                        <td className="w-[50%]">{item.desc}</td>
                        <td>{item.permissionType}</td>
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
                              disabled={!item.isActive}
                              className="icon-btn mr-3.5 p-0"
                              onClick={() =>
                                navigate(`../details/${item.id}`, {
                                  state: item.name,
                                })
                              }
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            <IconButton
                              disabled={!item.isActive}
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
          {list?.length < 0 ? <CustomText text="No Records Found" /> : null}
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
      {openDialog && (
        <SuperAdminPermissionPagePopup
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          heading={heading}
          list={childList}
        />
      )}
    </>
  );
}

export default SuperAdminPermissionPage;
