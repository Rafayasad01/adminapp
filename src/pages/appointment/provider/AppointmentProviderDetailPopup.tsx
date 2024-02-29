import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  list: any;
};

function AppointmentProviderDetailPopup({
  openFormDialog,
  setOpenFormDialog,
  list,
}: Props) {
  // const { id } = useParams();
  // const dataRole = useAppSelector(
  //   (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  // );
  // const [emptyVariable] = useState(null);
  // const [total, setTotal] = useState(0);
  // const [list, setList] = useState<any>([]);
  const [isLoader] = React.useState(false);
  // const [isNotify, setIsNotify] = React.useState(false);
  // const [notifyMessage, setNotifyMessage] = React.useState({});

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  // useEffect(() => {
  //     if (listingRolePermission(dataRole, 'Employee List')) {
  //         Service.VisitDetailById(id)
  //             .then((item: any) => {
  //                 if (item.data.success) {
  //                     setIsLoader(false);
  //                     setList(item.data.data);
  //                     // setTotal(item.data.data.total);
  //                 } else {
  //                     setIsLoader(false);
  //                     setIsNotify(true);
  //                     setNotifyMessage({
  //                         text: item.data.message,
  //                         type: 'error',
  //                     });
  //                 }
  //             })
  //             .catch((err) => {
  //                 setIsLoader(false);
  //                 setIsNotify(true);
  //                 setNotifyMessage({
  //                     text: err.message,
  //                     type: 'error',
  //                 });
  //             });
  //     } else {
  //         setIsLoader(false);
  //     }
  // }, [emptyVariable]);

  // const [isPrintEnabled, setPrintEnabled] = useState<any>([false]);

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog app-dialog',
        style: { minHeight: '400px' },
      }}
    >
      <div className="Content">
        {isLoader ? (
          <Loader />
        ) : (
          <div className="w-full">
            <div className="flex justify-between px-7 py-3">
              <div>
                <span className="font-open-sans text-2xl font-bold text-[#252733]">
                  Appointment Details
                </span>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-12 gap-4 px-4 py-5">
              <div className="p-3 xl:col-span-8 2xl:col-span-5">
                <span className="font-open-sans text-xl font-bold text-[#252733]">
                  Patient Information
                </span>
                <div className="p-3">
                  <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
                    <div className="my-4">
                      <span className="font-semibold uppercase xl:text-lg 2xl:text-xl">
                        {list?.name}
                      </span>
                    </div>
                    {list?.status && (
                      <div className="">
                        <span className="badge badge-success">
                          {list?.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Appointment Number</p>
                    <span className="text-sm">
                      {list?.appointmentNumber ? list?.appointmentNumber : '--'}
                    </span>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold">Appointment Time</p>
                    <span className="text-sm">
                      {list?.appointmentTime
                        ? dayjs(list?.appointmentTime).isValid() &&
                          dayjs(list?.appointmentTime).format('hh:mm A')
                        : '--'}
                    </span>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold">Appointment Date</p>
                    <span className="text-sm">
                      {list?.appointmentTime
                        ? dayjs(list?.appointmentTime).isValid() &&
                          dayjs(list?.appointmentTime).format('YYYY-MM-DD')
                        : '--'}
                    </span>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold">
                      Patient Contact Number
                    </p>
                    <span className="text-sm">
                      {list?.phone ? list?.phone : '--'}
                    </span>
                  </div>
                </div>
                <Divider className="2xl:hidden" />
              </div>
              <div className="col-span-1 justify-center border-l-[1px] border-[#a6bac8] xl:hidden 2xl:block" />
              <div className="p-3 xl:col-span-8 2xl:col-span-6">
                <span className="font-open-sans text-xl font-bold text-[#252733]">
                  Doctor Information
                </span>
                <div className="p-3">
                  <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
                    <div className="my-4">
                      <span className="font-semibold uppercase xl:text-lg 2xl:text-xl">
                        {list?.appointmentProvider?.name}
                      </span>
                    </div>
                    {list?.status && (
                      <div className="">
                        {list?.appointmentProvider?.isActive ? (
                          <span className="badge badge-success">Active</span>
                        ) : (
                          <span className="badge badge-danger">InActive</span>
                        )}
                      </div>
                    )}
                  </div>
                  {/* <div className="grid grid-cols-2 items-center">
                                        <div className="my-4">
                                            <span className="xl:text-lg 2xl:text-xl font-semibold uppercase">
                                                {list?.appointmentProvider?.name}
                                            </span>
                                        </div>
                                        <div className="">
                                            {list?.appointmentProvider?.isActive ? (
                                                <span className="badge badge-success">Active</span>
                                            ) : (
                                                <span className="badge badge-danger">InActive</span>
                                            )}
                                        </div>
                                    </div> */}
                  {/* <div className='grid grid-cols-2 items-center'> */}
                  <div className="">
                    <p className="text-sm font-semibold">Doctor Email</p>
                    <span className="text-sm">
                      {list?.appointmentProvider?.email
                        ? list?.appointmentProvider?.email
                        : '--'}
                    </span>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold">Doctor CNIC</p>
                    <span className="text-sm">
                      {list?.appointmentProvider?.cnic
                        ? list?.appointmentProvider?.cnic
                        : '--'}
                    </span>
                  </div>
                  {/* </div> */}
                  {/* <div className='grid grid-cols-4'> */}
                  <div className="col-span-2 my-2">
                    <p className="text-sm font-semibold">Appointment Created</p>
                    <span className="text-sm">
                      {list?.appointmentProvider?.createdDate
                        ? dayjs(
                            list?.appointmentProvider?.createdDate
                          ).isValid() &&
                          dayjs(list?.appointmentProvider?.createdDate).format(
                            'hh:mm A'
                          )
                        : '--'}
                    </span>
                  </div>
                  <div className="col-span-2 my-2">
                    <p className="text-sm font-semibold">
                      Doctor Contact Number
                    </p>
                    <span className="text-sm">
                      {list?.appointmentProvider?.phone
                        ? list?.appointmentProvider?.phone
                        : '--'}
                    </span>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-xl font-semibold">Service Details</p>
              <table className="table-border table-auto">
                <thead>
                  <tr>
                    <th>Service Created</th>
                    <th>Service Name</th>
                    <th>Service Description</th>
                    <th>Service Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {list ? (
                    list?.appointmentService?.map(
                      (item: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="avatar flex flex-row items-center">
                                <div className="">
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
                            <td>{item.name}</td>
                            <td>{item.desc ? item.desc : '--'}</td>
                            <td>
                              {item.fees
                                ? `$${Number(item.fees).toFixed(2)}`
                                : '--'}
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : list?.appointmentService?.length < 1 ? (
                    <CustomText noroundedborders text="No Records Found" />
                  ) : null}
                </tbody>
              </table>
              <div className="mt-10 grid grid-cols-12 gap-4">
                <div className="col-span-6 2xl:col-span-8">
                  <div className="w-72 rounded-md border-[1px] border-[#a6bac8] p-4">
                    <p className="mb-2 text-base font-bold uppercase">Notes</p>
                    <span className="text-sm">
                      {list?.note ? list?.note : "There's no notes"}
                    </span>
                  </div>
                </div>
                <div className="col-span-6 2xl:col-span-4">
                  <div className="rounded-md border-[1px] border-[#a6bac8] p-4">
                    <div className="mb-2 text-base font-bold uppercase">
                      Total Cost
                    </div>
                    {list.urgentFee > 0 && (
                      <>
                        <div className="mb-2 flex justify-between text-sm font-medium">
                          <span>Sub Total Amount :</span>
                          <span className="font-bold">
                            ${list.subTotalAmount}
                          </span>
                        </div>
                        <div className="mb-2 flex justify-between text-sm font-medium">
                          <span>Urgent Fee :</span>
                          <span className="font-bold">${list.urgentFee}</span>
                        </div>
                      </>
                    )}
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>Total Amount :</span>
                      <span className="font-bold">${list.totalAmount}</span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>HST {list.gstPercentage}% :</span>
                      <span className="font-bold">${list.gstAmount}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-lg font-medium ">
                      <span>Grand Total Amount :</span>
                      <span className="font-bold">${list.grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default AppointmentProviderDetailPopup;
