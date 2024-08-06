import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AirplayIcon from '@mui/icons-material/Airplay';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EditIcon from '@mui/icons-material/Edit';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import Badge from '@mui/material/Badge';
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
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { AppUserEmployees } from '../../interfaces/app-user.interface';
import { setItemState } from '../../redux/features/appSlice';
import { login } from '../../redux/features/authSlice';
import { useAppSelector } from '../../redux/redux-hooks';
import branchService from '../../services/adminapp/adminBranch';
import { listingRolePermission } from '../../utils/helper';
import BranchCreatePopup from './BranchCreatePopup';
import BranchUpdatePopup from './BranchUpdatePopup';
import { ALL_PERMISSIONS, NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';

function BranchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState: any = useAppSelector((state: any) => state?.authState);
  // console.log('🚀 ~ BranchPage ~ authState:', authState);

  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<any>('');
  const [maxTotalEmployeeLimit, setTotalMaxEmployeeLimit] = useState<any>();
  const [maxTotalEmployees, setTotalMaxEmployees] = useState();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [formDetail, setFormDetail] = useState<any>(null);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [totalBranches, setTotalBranches] = useState<number>(0);
  const [
    storeLimitVal,
    // setStateLimitVal
  ] = useState(0);
  const { reset } = useForm<AppUserEmployees>();

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      branchService
        .getListServiceSearch(
          authState.user.tenant,
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      branchService
        .getListService(authState.user.tenant, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      branchService
        .getListServiceSearch(
          authState.user.tenant,
          search,
          newPage,
          rowsPerPage
        )
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowPerPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      branchService
        .getListService(authState.user.tenant, newPage, newRowPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    } else {
      branchService
        .getListServiceSearch(
          authState.user.tenant,
          search,
          newPage,
          newRowPerPage
        )
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  useEffect(() => {
    setIsLoader(true);
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeBranch.viewBranches)
    ) {
      branchService
        .getListService(authState?.shopTenantDetails.tenant, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            // console.log('🚀 ~ .then ~ item.data.data:', item.data.data);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
            setTotalBranches(item.data.data.list.length);
            setTotalMaxEmployeeLimit(item.data.data.totalEmployeeLimitCounts);
            setTotalMaxEmployees(item.data.data.totalEmployees);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err: Error) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      setIsLoader(false);
    }
  }, []);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    branchService
      .insertBranch(data, authState?.user?.tenant)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
          setTotal((prev) => prev + 1);
          setTotalMaxEmployeeLimit(
            (prev: any) => prev + item.data.data.userLimit
          );
          reset();
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

  // const editHandler = (id: string) => {
  //   setIsLoader(true);
  //   branchService
  //     .editBranch(id)
  //     .then((item: any) => {
  //       if (item.data.success) {
  //         setStateLimitVal(item.data.data.userLimit);
  //         setFormDetail(item.data.data);
  //         setOpenEditFormDialog(true);
  //         setIsLoader(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  const updateFormHandler = (id: string, data: any) => {
    setIsLoader(true);
    delete data.email;
    data.userId = authState?.user?.id;
    const temp = Number(maxTotalEmployeeLimit) - storeLimitVal;
    branchService
      .updateBranch(data, id)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setTotalMaxEmployeeLimit(Number(data.userLimit) + temp);
          setFormDetail(item.data.data);
          setOpenEditFormDialog(false);
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].name = item.data.data.tenantName;
              list[i].isActive = item.data.data.isActive;
              list[i].trialMode = item.data.data.trialMode;
              list[i].trialStartDate = item.data.data.trialStartDate;
              list[i].userLimit = item.data.data.userLimit;
            }
          }
          reset();
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
  // console.log('EVENT HITT', openEditFormDialog);

  const handleSwitchChange = (event: any, id: string) => {
    setOpenEditFormDialog(false);
    setIsLoader(true);
    const data = {
      isActive: event.target.checked,
      // trialMode: event.target.checked,
      updatedBy: authState.user.id,
    };
    branchService
      .updateBranchStatus(data, id)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === id) {
                item.isActive = updateItem.data.data.isActive;
                item.trialMode = updateItem.data.data.trialMode;
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

  const handleTrialModeStatus = (status: any, trialMode: boolean): any => {
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

  const handleAddNew = () => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeBranch.add)) {
      if (totalBranches >= authState.user.branchLimit) {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Branch limit has been reached',
          type: 'error',
        });
      } else {
        setOpenFormDialog(true);
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleVendor = (
    tenantId: string,
    name: string,
    maxEmployeeLimit: string,
    maxBranchLimit: string,
    userType: string
  ) => {
    const userObj = {
      ...authState.user,
      tenant: tenantId,
      tenantName: name,
      maxEmployeeLimit,
      branchLimit: maxBranchLimit,
      userType,
    };
    dispatch(login(userObj));
    dispatch(setItemState(userObj));
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
      <TopBar title="Branches" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-2">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Branches
              </span>
            </div>
            <div className="col-span-10">
              <div className="flex flex-row items-center justify-end gap-3">
                {list?.length > 0 && (
                  <>
                    <div className="flex-col px-2">
                      <div>
                        <p className="text-sm font-semibold ">
                          Total Employees
                        </p>
                      </div>
                      <div className="mt-4 flex w-full items-center justify-center">
                        <Badge
                          color="success"
                          max={999}
                          showZero
                          badgeContent={
                            maxTotalEmployees ? Number(maxTotalEmployees) : 0
                          }
                        >
                          <PeopleOutlineIcon />
                        </Badge>
                        {/* <span className=" w-full text-sm">
                      {maxTotalEmployees ?? '0'}
                    </span> */}
                      </div>
                    </div>
                    <div className="flex-col items-center justify-center">
                      <p className="text-sm font-semibold">
                        Employees Distribution
                      </p>
                      <div className="mt-4 flex items-start justify-center">
                        <Badge
                          showZero
                          max={999}
                          color="error"
                          badgeContent={
                            Number(authState?.user?.maxEmployeeLimit) ?? 0
                          }
                        >
                          <PeopleOutlineIcon />
                        </Badge>{' '}
                        <span className="mx-4"> - </span>
                        <Badge
                          showZero
                          max={999}
                          color="success"
                          badgeContent={Number(maxTotalEmployeeLimit) ?? 0}
                        >
                          <PeopleOutlineIcon />
                        </Badge>
                        {/* <span className="w-full text-sm">
                      {authState.user.maxEmployeeLimit} -{' '}
                      {maxTotalEmployeeLimit || 0}
                    </span> */}
                      </div>
                    </div>
                    <div className=" flex-col items-center justify-center px-2">
                      <p className="text-sm font-semibold">
                        Branches Distribution
                      </p>
                      <div className="mt-4 flex items-center justify-center">
                        <Badge
                          showZero
                          max={999}
                          color="success"
                          badgeContent={
                            Number(authState?.user?.branchLimit) ?? 0
                          }
                        >
                          <ApartmentIcon />
                        </Badge>
                        <span className="mx-4"> - </span>
                        <Badge
                          showZero
                          max={999}
                          color="success"
                          badgeContent={Number(total) ?? 0}
                        >
                          <ApartmentIcon />
                        </Badge>
                        {/* <span className="badge badge-success btn-black-outline w-full text-sm">
                      {authState.user.branchLimit} - {total}
                    </span> */}
                      </div>
                    </div>
                  </>
                )}
                <FormControl
                  className="search-grey-outline placeholder-grey w-48 2xl:w-60"
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
                  className="btn-black-fill"
                  onClick={handleAddNew}
                >
                  <AddOutlinedIcon />
                  <span>Add New</span>
                </Button>
              </div>
            </div>
          </div>
          {authState?.user?.tenant !== authState?.shopTenantDetails.tenant && (
            <div className="flex items-center justify-end">
              <CustomButton
                title="Switch to main shop"
                buttonType="button"
                className="mx-5 rounded-full bg-primary text-foreground"
                onclick={() =>
                  handleVendor(
                    authState.shopTenantDetails.tenant,
                    authState.shopTenantDetails.tenantName,
                    authState.shopTenantDetails.maxEmployeeLimit,
                    authState.shopTenantDetails.branchLimit,
                    'ShopUser'
                  )
                }
              />
            </div>
          )}
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Limit</th>
                  <th>Trial Mode</th>
                  <th>Trial Start Date</th>
                  <th>Status</th>
                  <th>Branch Control</th>
                  <th aria-label="empty table header">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.name}`}
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
                        <td>
                          {item.userLimit} - {item.userCounts}
                        </td>
                        <td>
                          <span
                            className={
                              handleTrialModeStatus(
                                item.isActive,
                                item.trialMode
                              ) === 'Started'
                                ? 'badge badge-success'
                                : handleTrialModeStatus(
                                    item.isActive,
                                    item.trialMode
                                  ) === 'Not Started'
                                ? 'badge badge-primary'
                                : 'badge badge-danger'
                            }
                          >
                            {handleTrialModeStatus(
                              item.isActive,
                              item.trialMode
                            )}
                          </span>
                        </td>
                        {/* <td>
                          {item.trialMode ? (
                            <span className="badge badge-success">ON</span>
                          ) : (
                            <span className="badge badge-danger">OFF</span>
                          )}
                        </td> */}
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
                            <span className="badge badge-success">ACTIVE</span>
                          ) : (
                            <span className="badge badge-danger">INACTIVE</span>
                          )}
                        </td>
                        <td className="w-[8%]">
                          {/* {authState?.user?.tenant ===
                            authState?.shopTenantDetails.tenant && ( */}
                          <div
                            className="flex cursor-pointer justify-center"
                            style={{
                              color:
                                item.id === authState?.user?.tenant
                                  ? 'green'
                                  : 'black',
                            }}
                            onClick={() =>
                              handleVendor(
                                item.id,
                                item.name,
                                item.maxUserLimit,
                                item.maxBranchLimit,
                                item.tenantType
                              )
                            }
                          >
                            <AirplayIcon />
                          </div>
                          {/* )} */}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              onClick={() => {
                                if (
                                  listingRolePermission(
                                    dataRole,
                                    ALL_PERMISSIONS.storeBranch.edit
                                  )
                                ) {
                                  navigate(`detail/${item.id}`);
                                } else {
                                  setIsNotify(true);
                                  setNotifyMessage({
                                    text: NOT_AUTHORIZED_MESSAGE,
                                    type: 'warning',
                                  });
                                }
                              }}
                            >
                              <WysiwygOutlinedIcon />
                            </IconButton>
                            <IconButton
                              className="icon-btn mr-3.5 p-0"
                              // onClick={() => {
                              //   if (listingRolePermission(
                              //     dataRole,
                              //     ALL_PERMISSIONS.storeBranch.edit
                              //   )) {
                              //     item.isActive ? editHandler(item.id) : null
                              //   } else {
                              //     setIsNotify(true);
                              //     setNotifyMessage({
                              //       text: NOT_AUTHORIZED_MESSAGE,
                              //       type: 'warning',
                              //     });
                              //   }
                              // }
                              // }
                            >
                              <EditIcon />
                            </IconButton>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, item.id)}
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
      {openFormDialog && (
        <BranchCreatePopup
          type
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <BranchUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          item={formDetail}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default BranchPage;
