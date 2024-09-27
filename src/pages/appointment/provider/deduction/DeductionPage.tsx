import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import ActionMenu from '../../../../components/common/ActionMenu';
import CustomText from '../../../../components/common/CustomText';
import Loader from '../../../../components/common/Loader';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import { useAppSelector } from '../../../../redux/redux-hooks';
import storeDeduction from '../../../../services/adminapp/adminDeduction';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../../utils/constants';
import { listingRolePermission } from '../../../../utils/helper';
import PermissionPopup from '../../../../utils/PermissionPopup';
import DeductionAddPopup from './DeductionAddPopup';
import DeductionEditPopup from './DeductionEditPopup';

type QueryParams = {
  //   tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  type?: string | null;
};

function DeductionPage() {
  const { empId } = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const { control } = useForm();
  //   const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM')
  );
  const [type, setType] = useState<string>('All');
  const [page] = useState(0);
  const [total, setTotal] = useState(0);
  const [empData, setEmpData] = useState<any>();
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage] = React.useState(31);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
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

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense.addAppointmentEmployeeExpense
      )
    ) {
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
    storeDeduction
      .storeEmployeeDedutionList(queryParams, id)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setEmpData(item.data.data.identifierData);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((error: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense
          .viewStoreAppointmentEmployeeDeduction
      )
    ) {
      const queryParams: QueryParams | any = {
        startDate: dayjs(startDate).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(startDate).endOf('month').format('YYYY-MM-DD'),
        type,
        page,
        size: rowsPerPage,
      };
      if (type === 'All') {
        delete queryParams.type;
      }
      getDeductionList(queryParams, empId);
    } else {
      setIsLoader(false);
    }
  }, [startDate, type]);

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    storeDeduction
      .deleteDeduction(id, data)
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
          let newtotal = total;
          setTotal((newtotal -= 1));
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

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense.editAppointmentEmployeeExpense
        )
      ) {
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
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeEmployeeExpense.deleteAppointmentEmployeeExpense
        )
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
  };

  const createFormHandler = (data: any) => {
    setIsButLoader(true);
    data.userId = empId;
    data.userType = 'Employee';
    data.expenseType = 'Deduction';
    // console.log('data==>', data);
    storeDeduction
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
    // console.log('🚀 ~ updateFormHandler ~ data:', data);
    data.userId = empId;
    setIsButLoader(true);
    storeDeduction
      .update(actionMenuItemid, data)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsButLoader(false);
          setOpenEditFormDialog(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.expenseDetails.amount =
                  updateItem.data.data.expenseDetails.amount;
                item.expenseDetails.type =
                  updateItem.data.data.expenseDetails.type;
                item.expenseDetails.timeIn =
                  updateItem.data.data.expenseDetails.timeIn;
                item.expenseDetails.timeOut =
                  updateItem.data.data.expenseDetails.timeOut;
                item.expenseDetails.date =
                  updateItem.data.data.expenseDetails.date;
              }
              return { ...item };
            });
          });
        } else {
          setIsButLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsButLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const fetchData = (date: any) => {
    setStartDate(date);
    const formattedStartDate = date
      ? dayjs(date).startOf('month').format('YYYY-MM-DD')
      : null;
    const formattedEndDate = date
      ? dayjs(date).endOf('month').format('YYYY-MM-DD')
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
  };

  const totalDedution = list.reduce((p: any, c: any) => {
    return Number(p) + Number(c.expenseDetails.amount);
  }, 0);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Deductions" isNestedRoute />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All {empData?.name} deductions
              </span>
            </div>
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
          <div className="flex justify-start gap-3 px-4 md:col-span-12 lg:col-span-8">
            <div className="flex justify-start gap-3 md:col-span-12 lg:col-span-8">
              {/* <TextField
                label="Start Month"
                className="en-date"
                sx={{ padding: 0 }}
                type="month"
                value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
                onChange={(e) => fetchData(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              <div className="">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex w-full items-end justify-end">
                    <div className="">
                      {/* <p className="m-0 py-1 text-xs">Select Month</p> */}
                      <Controller
                        name="startDate"
                        control={control}
                        // defaultValue={dayjs().startOf('month').toDate()}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            label="Select Month"
                            views={['year', 'month']}
                            className="p-[1px]"
                            format="YYYY-MM"
                            value={dayjs(startDate)}
                            // value={dayjs(field.value)}
                            // onChange={(date) => handleDateChange(date, field)}
                            onChange={(date) => fetchData(date)}
                            // onChange={(date) => {
                            //   const firstDayOfMonth = dayjs(date)
                            //     .startOf('month')
                            //     .toDate();
                            //   field.onChange(firstDayOfMonth); // Set to first day of the selected month
                            // }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </LocalizationProvider>
              </div>
              <Select
                value={type}
                className="h-[30px] w-[150px]"
                onChange={(e) => setType(e.target.value as string)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Uniform">Uniform</MenuItem>
                <MenuItem value="LateArrival">Late Arrival</MenuItem>
              </Select>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Amount</th>
                  <th>Deduction Date</th>
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
                          {item.expenseDetails.type
                            ? item.expenseDetails.type
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
                          {item.expenseDetails.amount
                            ? `${Number(
                                item.expenseDetails.amount
                              ).toLocaleString()} ${CURRENCY_PREFIX}`
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
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <div className="custom-tbody-txt font-semibold">
                      Grand Total
                    </div>
                  </td>
                  <td>
                    <div className="custom-tbody-txt text-sm font-semibold">
                      {`${Number(
                        totalDedution
                      ).toLocaleString()} ${CURRENCY_PREFIX}`}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {list?.length < 1 ? (
            <CustomText noRoundedBorders text="No Records Found" />
          ) : null}
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
          loader={isButLoader}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default DeductionPage;
