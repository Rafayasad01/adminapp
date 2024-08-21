import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import React, { useEffect, useState } from 'react';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeExpense from '../../../services/adminapp/adminExpense';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import EquipmentPurchaseAddPopup from './EquipmentPurchaseAddPopup';

type QueryParams = {
  page?: string | null | any;
  size?: string | null | any;
  expenseType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

function EquipmentPurchasePage() {
  dayjs.extend(advancedFormat);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isButLoader, setIsButLoader] = React.useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const expenseType = `EquipmentPurchase`;

  const [startDate, setStartDate] = useState<string | null>(
    dayjs().subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  );

  const getList = (queryParams: QueryParams | any) => {
    storeExpense
      .getList(queryParams)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
          setTotalAmount(item.data.data.totalAmount);
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
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeExpense.viewExpenses)
    ) {
      const queryParams: QueryParams | any = {
        page,
        size: rowsPerPage,
        expenseType,
        startDate,
        endDate,
      };
      getList(queryParams);
    } else {
      setIsLoader(false);
    }
  }, [null]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const queryParams: QueryParams | any = {
      page: newPage,
      size: rowsPerPage,
      expenseType,
      startDate,
      endDate,
    };
    setPage(newPage);
    getList(queryParams);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowperPage);
    const newPage = 0;
    const queryParams: QueryParams | any = {
      page: newPage,
      size: rowsPerPage,
      expenseType,
      startDate,
      endDate,
    };
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    getList(queryParams);
  };

  const filterHandler = () => {
    const formattedStartDate = startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : null;
    const formattedEndDate = endDate
      ? dayjs(endDate).format('YYYY-MM-DD')
      : null;

    const queryParams: QueryParams | any = {
      page,
      size: rowsPerPage,
      expenseType,
    };
    if (formattedStartDate) {
      queryParams.startDate = formattedStartDate;
    }
    if (formattedEndDate) {
      queryParams.endDate = formattedEndDate;
    }
    setIsLoader(true);
    getList(queryParams);
  };

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

  const createFormHandler = (data: any) => {
    // console.log('data::::::', data);
    setIsButLoader(true);
    const formData = {
      expenseType,
      expenseDetails: data,
    };
    storeExpense
      .create(formData)
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

  const renderAditionalFieldKey = (data: { [key: string]: string }) => {
    return Object.entries(data).map(([key, value]) => {
      if (Number(value) <= 0) {
        return null;
      }
      return (
        <span className="flex w-full capitalize" key={key}>
          {key}
        </span>
      );
    });
  };

  const renderAditionalFieldValue = (data: { [key: string]: string }) => {
    return Object.entries(data).map(([key, value]) => {
      if (Number(value) <= 0) {
        return null;
      }
      return (
        <span className="flex w-full capitalize" key={key + value}>
          {Number(value).toLocaleString()} {CURRENCY_PREFIX}
        </span>
      );
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
                inputProps={{
                  min: dayjs().subtract(12, 'month').format('YYYY-MM-DD'),
                  max: dayjs().format('YYYY-MM-DD'),
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
                inputProps={{
                  min: dayjs().subtract(12, 'month').format('YYYY-MM-DD'),
                  max: dayjs().format('YYYY-MM-DD'),
                }}
              />
              <div>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => filterHandler()}
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
                  <th>Name</th>
                  <th>Pay</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Payment Method</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.expenseDetails.name}</td>
                        <td>
                          {renderAditionalFieldKey(
                            item.expenseDetails.amountDetails
                          )}
                        </td>
                        <td>
                          {renderAditionalFieldValue(
                            item.expenseDetails.amountDetails
                          )}
                        </td>
                        <td>
                          {dayjs(item.expenseDetails.paymentDate).format(
                            'Do MMMM YYYY'
                          )}
                        </td>
                        <td>{item.expenseDetails.paymentMethod}</td>
                        <td>
                          {item.expenseDetails.total
                            ? Number(item.expenseDetails.total).toLocaleString()
                            : 0}
                          <span className="font-medium">
                            {' '}
                            {CURRENCY_PREFIX}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>Grand Total</td>
                  <td>
                    {Number(totalAmount).toLocaleString()}
                    <span className="font-medium"> {CURRENCY_PREFIX}</span>
                  </td>
                </tr>
              </tfoot>
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
        <EquipmentPurchaseAddPopup
          loader={isButLoader}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
    </>
  );
}

export default EquipmentPurchasePage;
