import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
import storeBonus from '../../../../services/adminapp/adminBonus';
import {
  ALL_PERMISSIONS,
  BONUS_TYPE,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../../utils/constants';
import { listingRolePermission } from '../../../../utils/helper';
import BonusAddPopup from './BonusAddPopup';
import BonusEditPopup from './BonusEditPopup';
// import ServiceCatEditPopup from './ServiceCatEditPopup';
import PermissionPopup from '../../../../utils/PermissionPopup';
// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

type QueryParams = {
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  type?: string | null;
};

function BonusPage() {
  const { empId } = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const { control } = useForm();

  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  );
  const [type, setType] = useState<string>('All');
  const [page] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [empData, setEmpData] = useState<any>();
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage] = React.useState(31);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(true);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isButLoader, setIsButLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Bonus ?'
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

  const getBonusList = (
    queryParams: QueryParams | any,
    id: string | undefined
  ) => {
    storeBonus
      .storeEmployeeBonusList(queryParams, id)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setList(item.data.data.list);
          setEmpData(item.data.data.identifierData);
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
        ALL_PERMISSIONS.storeEmployeeExpense.viewStoreAppointmentEmployeeBonus
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
      getBonusList(queryParams, empId);
    } else {
      setIsLoader(false);
    }
  }, [type, startDate]);

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    storeBonus
      .deleteBonus(id, data)
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
        // console.log('actionMenuItemid', actionMenuItemid, list);
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
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
    data.expenseType = 'Bonus';
    // console.log('datatata', data);
    storeBonus
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
    data.userId = empId;
    setIsButLoader(true);
    storeBonus
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
                item.expenseDetails.date =
                  updateItem.data.data.expenseDetails.date;
                item.expenseDetails.details =
                  updateItem.data.data.expenseDetails.details;
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
    const formattedStartDate = startDate
      ? dayjs(startDate).startOf('month').format('YYYY-MM-DD')
      : null;
    const formattedEndDate = startDate
      ? dayjs(startDate).endOf('month').format('YYYY-MM-DD')
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

    // dispatch(fetchAppointments(queryParams));
  };

  const totalBonus = list.reduce((p: any, c: any) => {
    return Number(p) + Number(c.expenseDetails.amount);
  }, 0);

  const handleTypeName = (bonusType: string) =>
    BONUS_TYPE.find((x) => x.id === bonusType)?.name;

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Bonuses" isNestedRoute />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All {empData?.name} Bonus
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
                label="Select Month"
                className="en-date"
                sx={{ padding: 0 }}
                type="month"
                value={dayjs(startDate).format('YYYY-MM')}
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
                <MenuItem value="performanceBased">Performance Based</MenuItem>
                <MenuItem value="annualBonus">Annual Bonus</MenuItem>
                <MenuItem value="clientRefferal">Client Refferal</MenuItem>
                <MenuItem value="staffRefferal">Staff Refferal</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Type</th>
                  <th className="w-[30%]">details</th>
                  <th>Amount</th>
                  <th>Bonus Date</th>
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
                            ? handleTypeName(item.expenseDetails.type)
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.details
                            ? item.expenseDetails.details
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
                                'ddd, MMM DD, YYYY'
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
                  <td colSpan={2}>
                    <div className="custom-tbody-txt font-semibold">
                      Grand Total
                    </div>
                  </td>
                  <td>
                    <div className="custom-tbody-txt text-sm font-semibold">
                      {`${Number(
                        totalBonus
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
        <BonusAddPopup
          loader={isButLoader}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <BonusEditPopup
          loader={isButLoader}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default BonusPage;
