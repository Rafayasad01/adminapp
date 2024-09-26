import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActionMenu from '../../../../components/common/ActionMenu';
import CustomText from '../../../../components/common/CustomText';
import Loader from '../../../../components/common/Loader';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import { useAppSelector } from '../../../../redux/redux-hooks';
import storeCommission from '../../../../services/adminapp/adminCommission';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../../utils/constants';
import { listingRolePermission } from '../../../../utils/helper';
import PermissionPopup from '../../../../utils/PermissionPopup';
import CommissionEditPopup from './CommissionEditPopup';
import CommissionAddPopup from './CommissionAddPopup';

type QueryParams = {
  //   tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  type?: string | null;
};

function CommissionPage() {
  const { empId } = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  //   const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM')
  );
  const [type, setType] = useState<string>('All');
  const [page] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [commEmp, setCommEmp] = useState<any>();
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
    'Are you sure you want to delete this Commission ?'
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

  const getCommissionList = (
    queryParams: QueryParams | any,
    id: string | undefined
  ) => {
    storeCommission
      .storeEmployeeCommissionList(queryParams, id)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setList(item.data.data.list);
          setCommEmp(item.data.data.identifierData);
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
          .viewStoreAppointmentEmployeeCommission
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
      getCommissionList(queryParams, empId);
    } else {
      setIsLoader(false);
    }
  }, [startDate, type]);

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    storeCommission
      .deleteCommission(id, data)
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
    // else if (option === 'Details') {
    //   if (
    //     listingRolePermission(
    //       dataRole,
    //       ALL_PERMISSIONS.storeEmployeeExpense.editAppointmentEmployeeExpense
    //     )
    //   ) {
    //     setOpenFormDialog(true);
    //   } else {
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: NOT_AUTHORIZED_MESSAGE,
    //       type: 'warning',
    //     });
    //   }
    // }
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
    data.expenseType = 'Commission';
    storeCommission
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
    storeCommission
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
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === updateItem.data.data.id) {
              list[i].expenseDetails.empName =
                updateItem.data.data.expenseDetails.empName;
              list[i].expenseDetails.type =
                updateItem.data.data.expenseDetails.type;
              list[i].expenseDetails.desc =
                updateItem.data.data.expenseDetails.desc;
              list[i].expenseDetails.productName =
                updateItem.data.data.expenseDetails.productName;
              list[i].expenseDetails.totalAmount =
                updateItem.data.data.expenseDetails.totalAmount;
              list[i].expenseDetails.commission =
                updateItem.data.data.expenseDetails.commission;
              list[i].expenseDetails.amount =
                updateItem.data.data.expenseDetails.amount;
              list[i].expenseDetails.commissionDate =
                updateItem.data.data.expenseDetails.commissionDate;
              list[i].expenseDetails.commissionAmountType =
                updateItem.data.data.expenseDetails.commissionAmountType;
            }
          }
          setEditFormData(null);
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
    // getCommissionList(queryParams, empId);
  };

  const totalCommission = list.reduce((p: any, c: any) => {
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
      <TopBar title="Commissions" isNestedRoute />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All {commEmp?.name} Commission
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
              <TextField
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
              />
              <Select
                value={type}
                className="h-[40px] w-[150px]"
                onChange={(e) => setType(e.target.value as string)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
              </Select>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Prod/Service Name</th>
                  <th>Commission Type</th>
                  <th className="w-[20%]">Description</th>
                  <th>Prod/Service Amount</th>
                  <th>Commission</th>
                  <th>Commission Amount</th>
                  <th>Commission Date</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.expenseDetails.productName
                            ? item.expenseDetails.productName
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.type
                            ? item.expenseDetails.type
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.desc
                            ? item.expenseDetails.desc
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.totalAmount
                            ? `${Number(
                                item.expenseDetails.totalAmount
                              ).toLocaleString()} ${CURRENCY_PREFIX}`
                            : '--'}
                        </td>
                        <td>
                          {item.expenseDetails.commission
                            ? `${item.expenseDetails.commission} ${
                                item.expenseDetails.commissionAmountType ===
                                'percentage'
                                  ? '%'
                                  : CURRENCY_PREFIX
                              }`
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
                          {dayjs(item.expenseDetails.commissionDate).isValid()
                            ? dayjs(item.expenseDetails.commissionDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
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
                                // setAppOrderId(item.expenseDetails.appOrder);
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
                  <td colSpan={5}>
                    <div className="custom-tbody-txt font-semibold">
                      Grand Total
                    </div>
                  </td>
                  <td>
                    <div className="custom-tbody-txt text-sm font-semibold">
                      {`${Number(
                        totalCommission
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
        <CommissionAddPopup
          isButLoader={isButLoader}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <CommissionEditPopup
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

export default CommissionPage;
