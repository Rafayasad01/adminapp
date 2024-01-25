import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomText from '../../../../components/common/CustomText';
import Loader from '../../../../components/common/Loader';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import { useAppSelector } from '../../../../redux/redux-hooks';
import Service from '../../../../services/superadmin/Tenant';
import SuperAdminCreatePopup from './SuperAdminCreatePopup';

function SuperAdminShopPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rolelist, setRoleList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoader, setIsLoader] = useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);

  const handleFormClickOpen = () => {
    setIsLoader(true);
    Service.getRoleListLOV()
      .then((item) => {
        setIsLoader(false);
        setRoleList(item.data.data);
        setOpenFormDialog(true);
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'success',
        });
      });
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    Service.searchShopService(searchTxt, newPage, rowsPerPage).then((item) => {
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
    if (search === '' || search === null || search === undefined) {
      Service.getShopListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchShopService(search, newPage, rowsPerPage).then((item) => {
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
      Service.getShopListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchShopService(search, newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {
    Service.getShopListService(page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
        // console.log('error::::::::', error);
      });
  }, [emptyVariable]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    let trialLimit = 0;
    if (data.trialModeLimit) {
      trialLimit = data.trialModeLimit;
    }
    data.trialModeLimit = trialLimit;
    if (data.tenantName && data.email && data.firstName && data.lastName) {
      Service.createShop(data)
        .then((item: any) => {
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
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleSwitchChange = (event: any, id: string) => {
    setIsLoader(true);
    const data = {
      isActive: event.target.checked,
      // trialMode: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.updateShopStatus(id, data)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === id) {
                item.isActive = updateItem.data.data.isActive;
                // item.trialMode = updateItem.data.data.trialMode;
              }
              return { ...item };
            });
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
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handletrialModeStatus = (status: any, trialMode: boolean): any => {
    // console.log('TTTMM', trialMode, status);
    let textMsg = '';
    if (trialMode) {
      textMsg = 'Started';
    } else if (status) {
      textMsg = 'Not Started';
    } else {
      textMsg = 'End';
    }
    return textMsg;
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Shop" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Shops
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon flex items-center"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon />{' '}
                  <span className="text-xs">Add New Shop</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th>Trial Mode</th>
                  <th>Trial Start Date</th>
                  <th>Status</th>
                  <th>Branches</th>
                  <th>Employees</th>
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
                        <td>
                          <span
                            className={
                              handletrialModeStatus(
                                item.isActive,
                                item.trialMode
                              ) === 'Started'
                                ? 'badge badge-success'
                                : handletrialModeStatus(
                                    item.isActive,
                                    item.trialMode
                                  ) === 'Not Started'
                                ? 'badge badge-primary'
                                : 'badge badge-danger'
                            }
                          >
                            {handletrialModeStatus(
                              item.isActive,
                              item.trialMode
                            )}
                          </span>
                        </td>
                        <td>
                          {dayjs(item.trialStartDate).isValid() ? (
                            <>
                              {dayjs(item.trialStartDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )}
                              <br />
                              {dayjs(item.trialStartDate)?.format('hh:mm:ss A')}
                            </>
                          ) : (
                            '--'
                          )}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">Enabled</span>
                          ) : (
                            <span className="badge badge-danger">Disabled</span>
                          )}
                        </td>
                        <td>
                          <span className="">
                            {item.maxBranchLimit} - {item.branchCounts}
                          </span>
                        </td>
                        <td>
                          <span className="">
                            {item.maxUserLimit} - {item.userCounts}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => navigate(`../detail/${item.id}`)}
                            >
                              <WysiwygOutlinedIcon />
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
      {openFormDialog && (
        <SuperAdminCreatePopup
          roles={rolelist}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
          isLoader={isLoader}
          setIsLoader={setIsLoader}
        />
      )}

      {isNotify && (
        <Notify
          isOpen={isNotify}
          setIsOpen={setIsNotify}
          displayMessage={notifyMessage}
        />
      )}
    </>
  );
}

export default SuperAdminShopPage;
