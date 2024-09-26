import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import CustomText from '../../../../components/common/CustomText';
import Loader from '../../../../components/common/Loader';
import Notify from '../../../../components/common/Notify';
import TopBar from '../../../../components/common/TopBar';
import { useAppSelector } from '../../../../redux/redux-hooks';
import storeEmpService from '../../../../services/adminapp/adminStoreEmployee';
import storeEmpOvertime from '../../../../services/adminapp/adminOvertime';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../../utils/constants';
import { listingRolePermission } from '../../../../utils/helper';
import OvertimeAddPopup from './OvertimeAddPopup';
import OvertimeEditPopup from './OvertimeEditPopup';

type QueryParams = {
  //   tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  type?: string | null;
};

function OvertimePage() {
  // const authState: any = useAppSelector((state) => state?.authState);
  const { empId } = useParams();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  //   const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  );
  // const [endDate, setEndDate] = useState<string | null>(
  //   dayjs().add(6, 'month').format('YYYY-MM-DD')
  // );
  const [search] = useState<string>('');
  const [type] = useState<string>('All');
  //   const [search, setSearch] = useState('');
  const [page] = useState(0);
  const [list, setList] = useState<any>([]);
  const [overtimeData, setOvertimeData] = useState<any>(null);
  const [overtimeEmp, setOvertimeEmp] = useState<any>();
  const [empSchedule, setEmpSchedule] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage] = React.useState(31);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isButLoader, setIsButLoader] = React.useState(false);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeEmployeeExpense.addAppointmentEmployeeExpense
      )
    ) {
      if (list.length) {
        setOpenFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Must require atleast one attendance record',
          type: 'info',
        });
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const getOvertimeList = (
    queryParams: QueryParams | any,
    id: string | undefined
  ) => {
    storeEmpOvertime
      .storeEmployeeOvertimeList(queryParams, id)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setList(
            item.data.data.attendance.map((x: any) => ({
              ...x,
              overtimeHours: 0,
            }))
          );
          setOvertimeEmp(item.data.data.identifierData);
          if (item.data.data.list.length) {
            setOvertimeData({
              data: item.data.data.list[0].expenseDetails,
              id: item.data.data.list[0].id,
            });
          } else {
            setOvertimeData(null);
          }
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

  const getEmpSchedule = () => {
    storeEmpService
      .StoreEmployeeScheduleById(empId)
      .then((item: any) => {
        if (item.data.success === true) {
          setIsLoader(false);
          setEmpSchedule(item.data.data.storeEmployeeSchedule);
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
          .viewStoreAppointmentEmployeeOvertime
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
      getOvertimeList(queryParams, empId);
      getEmpSchedule();
    } else {
      setIsLoader(false);
    }
  }, [startDate]);

  const createFormHandler = (data: any) => {
    setIsButLoader(true);
    data.userId = empId;
    data.userType = 'Employee';
    data.expenseType = 'Overtime';
    // setIsLoader(true);
    storeEmpOvertime
      .create(data)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsButLoader(false);
          // setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setOvertimeData({
            data: item.data.data[0].expenseDetails,
            id: item.data.data[0].id,
          });
          // setOvertimeData(item.data.data[0].expenseDetails);
        } else {
          // setIsLoader(false);
          setIsButLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
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
    // data.userType = 'Employee';
    data.expenseType = 'Overtime';
    // setIsLoader(true);
    setIsButLoader(true);
    storeEmpOvertime
      .update(data.id, data)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          // console.log('dadad', updateItem.data.data);
          setOpenEditFormDialog(false);
          // setIsLoader(false);
          setIsButLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          setOvertimeData({
            data: updateItem.data.data.expenseDetails,
            id: updateItem.data.data.id,
          });
        } else {
          setIsButLoader(false);
          // setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsButLoader(false);
        // setIsLoader(false);
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
      search,
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

  const handleOverTime = (el: any) => {
    // Check if timeOut exists; return "0:00" if null
    if (!el.attendanceType.timeOut) {
      return '0:00';
    }

    // Format the day from the attendance date (e.g., 'Monday', 'Tuesday')
    const day = dayjs(el.attendanceDate).format('dddd');

    // Find the employee's scheduled end time for that day
    const checkday = empSchedule.find((x: any) => x.workDay === day);

    // Check if a schedule exists for that day to avoid index errors
    if (!checkday) {
      return 'No schedule found for this day';
    }

    // Format the times to 'HH:mm'
    let timeOut = dayjs(el.attendanceType.timeOut).format('HH:mm'); // Example: '22:07'
    const endTime = dayjs(checkday.endTime).format('HH:mm'); // Example: '18:00'

    // Check if timeOut is after 11:59 PM and cap it at '23:59'
    const maxTimeOut = '23:59';
    if (dayjs(timeOut, 'HH:mm').isAfter(dayjs(maxTimeOut, 'HH:mm'))) {
      timeOut = maxTimeOut;
    }

    // Split the formatted time strings into hours and minutes
    const [outHours, outMinutes] = timeOut.split(':').map(Number); // Convert strings to numbers
    const [endHours, endMinutes] = endTime.split(':').map(Number); // Convert strings to numbers

    // Convert both times to total minutes
    const totalOutMinutes = outHours * 60 + outMinutes; // Total minutes for timeOut
    const totalEndMinutes = endHours * 60 + endMinutes; // Total minutes for endTime

    // Calculate extra minutes
    const extraMinutes = totalOutMinutes - totalEndMinutes;

    // If extraMinutes is negative, it means they left earlier; return '0:00'
    if (extraMinutes <= 0) {
      return '0:00';
    }
    // hello();
    // Add to the total overtime minutes
    // Calculate hours and minutes from the extra time
    const extraHours = Math.floor(extraMinutes / 60); // Full hours
    const remainingMinutes = extraMinutes % 60; // Remaining minutes

    // Format the output as hours:minutes (e.g., 2:30)
    const formattedExtraTime = `${extraHours}:${remainingMinutes
      .toString()
      .padStart(2, '0')}`;

    // const totalhours = formattedExtraTime + totalHours;
    // setTotalHours(totalhours);
    // console.log('overtimeHours', formattedExtraTime);
    return formattedExtraTime;
  };

  const totalOvertimeInMinutes = useMemo(() => {
    return list.reduce((p: number, c: any) => {
      const [hours, minutes] = handleOverTime(c).split(':');
      const parsedHours = parseInt(hours, 10) * 60;
      const parsedMinutes = parseInt(minutes, 10);
      return p + parsedHours + parsedMinutes;
    }, 0);
  }, [list]);
  // console.log('totalHours', totalOvertime);

  const totalOvertime = useMemo(() => {
    let totalMinutes = totalOvertimeInMinutes;
    let hours = 0;
    while (totalMinutes > 60) {
      // eslint-disable-next-line no-plusplus
      hours++;
      totalMinutes -= 60;
    }
    return `${hours}:${totalMinutes.toString().padStart(2, '0')}`;
  }, [totalOvertimeInMinutes]);

  useEffect(() => {
    // Calculate overtime for each item in the list
    const updatedList = list.map((el: any) => {
      const overtimeHours = handleOverTime(el);
      return { ...el, overtimeHours };
    });

    // Update state once after the calculations are done
    setList(updatedList);
    // console.log('list', updatedList);
  }, [totalOvertime]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Overtimes" isNestedRoute />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All {overtimeEmp?.name} Overtime
              </span>
            </div>
            {list?.length < 1 && (
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
            )}
          </div>
          <div className="flex justify-start gap-3 px-4 md:col-span-12 lg:col-span-8">
            <div className="flex justify-start gap-3 md:col-span-12 lg:col-span-8">
              <TextField
                label="Start Date"
                className="en-date"
                sx={{ padding: 0 }}
                type="month"
                value={dayjs(startDate).format('YYYY-MM')}
                // onChange={(e) => setStartDate(e.target.value)}
                onChange={(e) => fetchData(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          {overtimeData?.data && (
            <div className="m-4 flex w-[30%] justify-between rounded border-2 px-3 py-2">
              <div>
                <div>
                  <div className="my-1 font-open-sans text-sm text-[#252733]">
                    <span className="font-semibold">Hourly Rates: </span>{' '}
                    {`${Number(
                      overtimeData?.data?.hourlyRate
                    ).toLocaleString()} ${CURRENCY_PREFIX}`}
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-sm text-[#252733]">
                    <span className="font-semibold">Date: </span>{' '}
                    {dayjs(overtimeData?.data?.date).format('YYYY-MM-DD')}
                  </div>
                </div>
                <div>
                  <div className="my-1 font-open-sans text-sm text-[#252733]">
                    <span className="font-semibold">Overtime Hours: </span>{' '}
                    {overtimeData?.data?.overtimeHours}
                  </div>
                </div>
                <div>
                  <div className="my-1 font-open-sans text-sm text-[#252733]">
                    <span className="font-semibold">
                      Extra Overtime Hours:{' '}
                    </span>{' '}
                    {overtimeData?.data?.extraOvertimeHours ?? '0:00'}
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-sm text-[#252733]">
                    <span className="font-semibold">Overtime Amount: </span>{' '}
                    {`${Number(
                      overtimeData?.data?.amount
                    ).toLocaleString()} ${CURRENCY_PREFIX}`}
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setOpenEditFormDialog(true);
                  setEditFormData({
                    overtimeData,
                    totalHours: totalOvertime,
                  });
                }}
                className="p-1"
              >
                <EditIcon />
              </div>
            </div>
          )}
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Date</th>
                  <th>Overtime Hours</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        {/* <td>{item.description ? item.description : '--'}</td> */}
                        <td>
                          {dayjs(item.attendanceType.timeIn).isValid()
                            ? dayjs(item.attendanceType.timeIn)?.format(
                                'hh:mm A'
                              )
                            : 'Not Marked'}
                        </td>
                        <td>
                          {dayjs(item.attendanceType.timeOut).isValid()
                            ? dayjs(item.attendanceType.timeOut)?.format(
                                'hh:mm A'
                              )
                            : 'Not Marked'}
                        </td>
                        <td>
                          {dayjs(item.attendanceDate).isValid()
                            ? dayjs(item.attendanceDate)?.format(
                                'ddd, MMM DD, YYYY'
                              )
                            : '--'}
                        </td>
                        <td>{handleOverTime(item)}</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <div className="custom-tbody-txt font-semibold">
                      Total Hours
                    </div>
                  </td>
                  <td>
                    <div className="custom-tbody-txt text-sm font-semibold">
                      {totalOvertime}
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
      {openFormDialog && (
        <OvertimeAddPopup
          loader={isButLoader}
          setIsNotify={setIsNotify}
          overtimeHours={totalOvertime}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <OvertimeEditPopup
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

export default OvertimePage;
