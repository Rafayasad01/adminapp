import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeExpense from '../../../services/adminapp/adminEmployee';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import {
  //   CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
import DeductionAddPopup from './UtilityAddPopup';
// import ServiceCatEditPopup from './ServiceCatEditPopup';
import PermissionPopup from '../../../utils/PermissionPopup';
import DeductionEditPopup from './UtilityEditPopup';
// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

type QueryParams = {
  //   tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  type?: string | null;
};

function UtilityPage() {
  // const authState: any = useAppSelector((state) => state?.authState);
  const { empId } = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  //   const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().subtract(6, 'month').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().add(6, 'month').format('YYYY-MM-DD')
  );
  // const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<string>('All');
  //   const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [
    total,
    // setTotal
  ] = useState(0);
  const [
    empData,
    // setEmpData
  ] = useState<any>();
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(false);
  const [isButLoader, setIsButLoader] = React.useState(false);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this deduction ?'
  );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeExpense.add)) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const getDeductionList = (
    queryParams: QueryParams | any,
    id: string | undefined
  ) => {
    console.log('🚀 ~ UtilityPage ~ queryParams:', queryParams, id);
    // storeExpense
    //   .storeEmployeeDedutionList(queryParams, id)
    //   .then((item: any) => {
    //     if (item.data.success === true) {
    //       setIsLoader(false);
    //       setEmpData(item.data.data.identifierData);
    //       setList(item.data.data.list);
    //       setTotal(item.data.data.total);
    //     } else {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: item.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((error: Error) => {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: error.message,
    //       type: 'error',
    //     });
    //   });
  };

  useEffect(() => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeExpense.viewExpenses)
    ) {
      const queryParams: QueryParams | any = {
        startDate,
        endDate,
        // type,
        page,
        size: rowsPerPage,
      };
      getDeductionList(queryParams, empId);
    } else {
      setIsLoader(false);
    }
  }, [null]);

  //   const handleClickSearch = (event: any) => {
  //     if (event.key === 'Enter') {
  //       const searchTxt = event.target.value as string;
  //       const newPage = 0;
  //       setSearch(searchTxt);
  //       setPage(newPage);
  //       storeService
  //         .StoreCatList(searchTxt, newPage, rowsPerPage)
  //         .then((item) => {
  //           setList(item.data.data.list);
  //           setTotal(item.data.data.total);
  //         });
  //     }
  //   };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const queryParams: QueryParams = {
      startDate,
      endDate,
      page: newPage,
      size: rowsPerPage,
      type,
    };
    setPage(newPage);
    getDeductionList(queryParams, empId);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    const queryParams: QueryParams = {
      startDate,
      endDate,
      page: newPage,
      size: newRowperPage,
      type,
    };
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    getDeductionList(queryParams, empId);
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    console.log('🚀 ~ deleteHandler ~ data:', data, id);
    // storeExpense
    //   .deleteDeduction(id, data)
    //   .then((updateItem) => {
    //     if (updateItem.data.success) {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'success',
    //       });
    //       setList((newArr: any) => {
    //         return newArr.filter((item: any) => item.id !== id);
    //       });
    //       let newtotal = total;
    //       setTotal((newtotal -= 1));
    //     } else {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: err.message,
    //       type: 'error',
    //     });
    //   });
  };

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (listingRolePermission(dataRole, ALL_PERMISSIONS.storeExpense.edit)) {
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        editFormDatas.name = empData.name;
        setActionMenuItemid(editFormDatas.id);
        setEditFormData(editFormDatas);
        setOpenEditFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Delete') {
      if (
        listingRolePermission(dataRole, ALL_PERMISSIONS.storeExpense.delete)
      ) {
        setCancelDialogOpen(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
    //  else if (option === 'Services') {
    //   // navigate(`../item/${actionMenuItemid}`);
    //   CheckRolePermission(
    //     'Category Service Get',
    //     dataRole,
    //     navigate,
    //     `services/${actionMenuItemid}`
    //   );
    // }
  };

  const createFormHandler = (data: any) => {
    setIsButLoader(true);
    data.userId = empId;
    data.userType = 'Employee';
    data.expenseType = 'Deduction';
    // console.log('data==>', data);
    storeExpense
      .create(data)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsButLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([...item.data.data, ...list]);
        } else {
          setIsButLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsButLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const updateFormHandler = (data: any) => {
    console.log('🚀 ~ updateFormHandler ~ data:', data);
    data.userId = empId;
    setIsButLoader(true);
    // storeExpense
    //   .update(actionMenuItemid, data)
    //   .then((updateItem: any) => {
    //     if (updateItem.data.success) {
    //       setIsButLoader(false);
    //       setOpenEditFormDialog(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'success',
    //       });
    //       setList((newArr: any) => {
    //         return newArr.map((item: any) => {
    //           if (item.id === updateItem.data.data.id) {
    //             item.expenseDetails.amount =
    //               updateItem.data.data.expenseDetails.amount;
    //             item.expenseDetails.type =
    //               updateItem.data.data.expenseDetails.type;
    //             item.expenseDetails.timeIn =
    //               updateItem.data.data.expenseDetails.timeIn;
    //             item.expenseDetails.timeOut =
    //               updateItem.data.data.expenseDetails.timeOut;
    //             item.expenseDetails.date =
    //               updateItem.data.data.expenseDetails.date;
    //           }
    //           return { ...item };
    //         });
    //       });
    //     } else {
    //       setIsButLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setIsButLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: err.message,
    //       type: 'error',
    //     });
    //   });
  };

  const fetchAppointmentsData = () => {
    const formattedStartDate = startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : null;
    const formattedEndDate = endDate
      ? dayjs(endDate).format('YYYY-MM-DD')
      : null;

    const queryParams: QueryParams = {
      //   tenant: user?.tenant,
      page,
      size: rowsPerPage,
      // search,
      type,
    };
    if (formattedStartDate) {
      queryParams.startDate = formattedStartDate;
    }
    if (formattedEndDate) {
      queryParams.endDate = formattedEndDate;
    }
    if (type === 'All') {
      delete queryParams.type;
    }
    setIsLoader(true);
    getDeductionList(queryParams, empId);
  };

  const closeModal = () => {
    setModalImage('');
    setIsModalImage(false);
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
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-none">
          <div className="flex justify-between gap-3 px-4 md:col-span-12 lg:col-span-12">
            <div className="flex justify-start gap-3 md:col-span-12 lg:col-span-8">
              <TextField
                label="Start Date"
                className="en-date"
                sx={{ padding: 0 }}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                className="en-date"
                sx={{ padding: 0 }}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Select
                value={type}
                className="h-[40px] w-[150px]"
                onChange={(e) => setType(e.target.value as string)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Utility">Utility</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="EquipmentPurchase">
                  Equipment Purchase
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <div>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => fetchAppointmentsData()}
                >
                  <SearchIcon />
                </Button>
              </div>
            </div>
            <div className="grid px-4 lg:col-span-4 ">
              <div className="col-span-5">
                <div className="flex flex-row justify-end gap-3">
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
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Month</th>
                  <th>Payment Date</th>
                  <th>Payment Method</th>
                  <th>Total Amount</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.expenseDetails.type
                            ? item.expenseDetails.type
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.amount
                            ? item.expenseDetails.amount
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.expenseDetails.timeIn).isValid()
                            ? dayjs(item.expenseDetails.timeIn)?.format(
                                'hh:mm A'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.expenseDetails.timeOut).isValid()
                            ? dayjs(item.expenseDetails.timeOut)?.format(
                                'hh:mm A'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.expenseDetails.date).isValid()
                            ? dayjs(item.expenseDetails.date)?.format(
                                'ddd, MMM DD, YYYY'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm A'
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
                            {/* <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            /> */}
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
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <DeductionAddPopup
          loader={isButLoader}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <DeductionEditPopup
          // setIsNotify={setIsNotify}
          // setNotifyMessage={setNotifyMessage}
          loader={isButLoader}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
      {modalImage && (
        <Dialog
          open={isModalImage}
          onClose={closeModal}
          PaperProps={{
            className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
            style: {
              // maxWidth: '25%',
              // minHeight: '45%',
              borderRadius: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <div className="flex h-[100%] items-center justify-center">
            <img
              className="max-w-[250px] xl:max-h-[100px] 2xl:max-h-[150px]"
              src={modalImage}
              alt=""
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default UtilityPage;
