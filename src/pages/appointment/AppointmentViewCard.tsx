import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
// import WalletIcon from '@mui/icons-material/Wallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import WalletIcon from '@mui/icons-material/Wallet';
// import EditIcon from '@mui/icons-material/Edit';
// import StarIcon from '@mui/icons-material/Star';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import assets from '../../assets';
import Loader from '../../components/common/Loader2';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import walletService from '../../services/adminapp/adminWallet';
import {
  ALL_PERMISSIONS,
  APPOINTMENT_STATUS,
  CURRENCY_PREFIX,
} from '../../utils/constants';
// import CustomButton from '../../components/common/CustomButton';
// import ViewWalletPopupCard from './ViewWalletPopupCard';
import CustomButton from '../../components/common/CustomButton';
import Notify from '../../components/common/Notify';
import { useAppSelector } from '../../redux/redux-hooks';
import CustomAppointmentLayoutCash from '../../utils/CustomPrintLayout/CustomAppointmentLayoutCash';
import { listingRolePermission } from '../../utils/helper';
import PermissionPopup from '../../utils/PermissionPopup';
import ViewCardAccordin from './ViewCardAccordin';
import ViewWalletPopupCard from './ViewWalletPopupCard';
import ViewDiscountPopupCard from './ViewDiscountPopupCard';

type AppointmentViewCardProps = {
  appointmentData?: any;
  setAllAppointments?: any;
  // setAppointmentTooltipData?: any;
  setIsTooltipOpen?: any;
  // setOpenFormDialog?: any;
  // getUpdatePopupData?: any;
  isTooltipOpen?: boolean;
  isStatusDone?: any;
  // isStatusProcessing?: any;
  deleteAppointmentHandler?: any;
};

const AppointmentViewCard = ({
  appointmentData,
  setAllAppointments,
  // getUpdatePopupData,
  isTooltipOpen: _isTooltipOpen,
  // setAppointmentTooltipData,
  setIsTooltipOpen,
  // setOpenFormDialog,
  isStatusDone,
  // isStatusProcessing,
  deleteAppointmentHandler,
}: AppointmentViewCardProps) => {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isWalletLoader, setIsWalletLoader] = useState<boolean>(false);
  const [isDiscountLoader, setIsDiscountLoader] = useState<boolean>(false);
  const [isPrintEnabled, setIsPrintEnabled] = useState<boolean>(false);
  // const [isRescheduled, setIsRescheduled] = useState(false);

  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Appointment ?'
  );

  const [paidDialogOpen, setPaidDialogOpen] = useState<boolean>(false);
  const [dialogPaidText] = useState<any>(
    'Are you sure you want to change status to paid ?'
  );
  // popover navigation of wallet button
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // popover navigation of discount button
  const [discountAnchorEl, setDiscountAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const handleDiscountClickPop = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDiscountAnchorEl(event.currentTarget);
  };
  const handleDiscountClosePop = () => {
    setDiscountAnchorEl(null);
  };
  const discountOpen = Boolean(discountAnchorEl);
  const idDiscount = discountOpen ? 'simple-popover' : undefined;

  console.log('DATATA', appointmentData);

  useEffect(() => {
    // Select the element
    const element = document.querySelector('.MuiPaper-elevation8');

    // Add the custom class
    if (element) {
      element.classList.add('custom-class-app');
    }

    // Clean-up function (optional)
    return () => {
      // Remove the class if needed
      if (element) {
        element.classList.remove('custom-class-app');
      }
    };
  }, []);

  const showPaidHandler = () => {
    const statusDone: any = data?.services?.find(
      (el: any) => el.status === APPOINTMENT_STATUS.COMPLETED
    );
    const statusNewProcess: any = data?.services?.find(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.NEW ||
        el.status === APPOINTMENT_STATUS.PROCESSING
    );
    if (statusNewProcess && statusNewProcess?.paymentStatus === 'Unpaid') {
      return (
        <div
          onClick={() => {
            setIsNotify(true);
            setNotifyMessage({
              text: 'Some services are in processing, Please wait...',
              type: 'info',
            });
          }}
          className="mb-2 mt-3 flex w-[50%] cursor-pointer items-center justify-center rounded bg-primary p-1 text-sm text-white shadow"
        >
          <span className="px-2 text-xs">Paid</span>
        </div>
      );
    }
    if (statusDone && statusDone?.paymentStatus === 'Unpaid') {
      return (
        <div
          onClick={() => setPaidDialogOpen(true)}
          className="mb-2 mt-3 flex w-[50%] cursor-pointer items-center justify-center rounded bg-green-500 p-1 text-sm text-white shadow"
        >
          <CheckCircleOutlineIcon fontSize="inherit" className="mx-1" />
          <span>Paid</span>
        </div>
      );
    }

    return (
      <div className="mx-1 my-2 flex items-center rounded bg-green-500 px-3 py-1 text-sm">
        <CheckCircleIcon color="success" fontSize="inherit" className="mr-1" />{' '}
        Its Paid
      </div>
    );
  };

  const checkStatusHandler = (type: string) => {
    const checkDone: boolean = data.services.some(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.DONE ||
        el.status === APPOINTMENT_STATUS.PROCESSING ||
        el.status === APPOINTMENT_STATUS.COMPLETED
    );
    if (checkDone) {
      const text =
        type === 'delete'
          ? 'Some services were processing, Please delete individually'
          : 'Some services were processing, Please reschedule individually';
      setIsNotify(true);
      setNotifyMessage({
        text,
        type: 'error',
      });
      return false;
    }
    return true;
  };

  const onWalletSubmit = (payload: any) => {
    setIsWalletLoader(true);
    const dataObj = {
      ...payload,
      referenceId: appointmentData.id,
      appUser: appointmentData.appUser,
      // referenceType: 'Appointment',
      // type: 'Credit',
    };
    walletService
      .WalletCreate(dataObj)
      .then((item) => {
        if (item.data.success) {
          setIsWalletLoader(false);
          handleClosePop();
          setData((prev: any) => ({
            ...prev,
            wallet: item.data.data,
          }));
        } else {
          setIsWalletLoader(false);
        }
      })
      .catch((error) => {
        setIsWalletLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
        // return false;
      });
  };

  const onDiscountSubmit = (payload: any) => {
    setIsDiscountLoader(true);
    storeAppointmentService
      .AppointmentDiscount(appointmentData.code, payload)
      .then((item) => {
        if (item.data.success) {
          setIsDiscountLoader(false);
          handleDiscountClosePop();
          // setData((prev: any) => ({
          //   ...prev,
          //   wallet: item.data.data,
          // }));
          setData((prevData: any) => ({
            ...prevData,
            services: prevData.services.map((x: any) =>
              x.id === item.data.data.id
                ? {
                    ...x,
                    isManuel: item.data.data.isManuel,
                    appointmentDiscount: item.data.data.appointmentDiscount,
                    appointmentDiscountAmountType:
                      item.data.data.appointmentDiscountAmountType,
                  }
                : x
            ),
          }));
        } else {
          setIsDiscountLoader(false);
        }
      })
      .catch((error) => {
        setIsDiscountLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      });
  };

  const statusCancelConfirmationHandler = () => {
    setIsTooltipOpen(false);
    deleteAppointmentHandler(data.code);
  };

  const getInvoice = (code: string) => {
    setIsLoader(true);
    storeAppointmentService
      .AppointmentInvoiceDetailByCode(code)
      .then((res) => {
        setIsLoader(false);
        setInvoiceData(res.data.data);
      })
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const completedAppointments = () => {
    const completedServices = data?.services?.filter(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.DONE ||
        el.status === APPOINTMENT_STATUS.COMPLETED
    );
    const completedCount = completedServices?.length;
    const completedAmount = completedServices?.reduce(
      (total: any, service: any) => total + parseFloat(service.totalAmount),
      0
    );
    return {
      completedCount,
      completedAmount,
    };
  };

  const missedAppointments = () => {
    const missedServices = data?.services?.filter(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.MISSED ||
        el.status === APPOINTMENT_STATUS.CANCELLED
    );
    const missedCount = missedServices?.length;
    const missedAmount = missedServices?.reduce(
      (total: any, service: any) => total + parseFloat(service.totalAmount),
      0
    );
    return {
      missedCount,
      missedAmount,
    };
  };

  const totalAmountWithoutDiscount = useMemo(() => {
    const gtAmount = data?.services?.filter(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.COMPLETED ||
        el.status === APPOINTMENT_STATUS.DONE ||
        el.status === APPOINTMENT_STATUS.NEW ||
        el.status === APPOINTMENT_STATUS.PROCESSING
    );

    const gtAppAmount = gtAmount?.reduce(
      (total: any, service: any) => total + parseFloat(service.totalAmount),
      0
    );

    return gtAppAmount || 0;
  }, [data]);

  const discountedAppointments = useMemo(() => {
    const discountedServices = data?.services?.find(
      (el: any) => el.isManuel === true
    );
    if (!discountedServices) {
      return { amount: 0, type: 'None', actualAmount: 0 };
    }

    const discount = Number(discountedServices?.appointmentDiscount) || 0;
    const type = discountedServices?.appointmentDiscountAmountType || 'Amount';

    let finalDiscountAmount = discount;
    let actualAmount = 0;

    if (type === 'Percentage') {
      // Avoid circular dependency by using the already calculated final discount
      actualAmount = discount;
      finalDiscountAmount = (totalAmountWithoutDiscount * discount) / 100;
    }

    return { amount: finalDiscountAmount, type, actualAmount };
  }, [data]);

  // Separate memoization for totalAmount calculation

  const totalAmount = () => {
    const discountedAmount = discountedAppointments.amount;
    return totalAmountWithoutDiscount - discountedAmount;
  };

  const taxAmount = () => {
    const taxServices = data?.services?.filter(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.COMPLETED ||
        el.status === APPOINTMENT_STATUS.DONE ||
        el.status === APPOINTMENT_STATUS.NEW ||
        el.status === APPOINTMENT_STATUS.PROCESSING
    );

    const ta = totalAmount();

    const gstPercentage = taxServices?.[0]?.gstPercentage ?? 0;

    const taxAppAmount = (Number(ta) * parseFloat(gstPercentage)) / 100;

    return taxAppAmount;
  };

  const grandTotalAmount = () => {
    const total = totalAmount();
    const tax = taxAmount();
    return Number(total) + Number(tax);
  };

  const statusPaidConfirmationHandler = () => {
    setIsTooltipOpen(false);
    const obj = {
      code: data.code,
      gstPercentage: data.gstPercentage,
      gstAmount: taxAmount(),
      totalAmount: totalAmount(),
      grandTotalAmount: grandTotalAmount(),
      appointmentDiscount: discountedAppointments.amount,
      appointmentDiscountType:
        discountedAppointments.type === 'Percentage' ? 'Percentage' : 'Amount',
      isManuel: discountedAppointments?.amount > 0,
    };
    // console.log('fnf data', obj);
    isStatusDone(obj);
  };

  const handleCheckAllServices = (services: any) => {
    console.log('service', services);
    const allRescheduled = services.every(
      (service: any) => service.status === APPOINTMENT_STATUS.RESCHEDULE
    );
    const allCancelled = services.every(
      (service: any) => service.status === APPOINTMENT_STATUS.CANCELLED
    );
    const allMissed = services.every(
      (service: any) => service.status === APPOINTMENT_STATUS.MISSED
    );
    const allRescheduledOrMissedCancelled = services.every(
      (service: any) =>
        service.status === APPOINTMENT_STATUS.RESCHEDULE ||
        service.status === APPOINTMENT_STATUS.MISSED ||
        service.status === APPOINTMENT_STATUS.CANCELLED
    );
    if (allRescheduled) {
      return allRescheduled;
    }
    if (allCancelled) {
      return allCancelled;
    }
    if (allMissed) {
      return allMissed;
    }
    if (allRescheduledOrMissedCancelled) {
      return allRescheduledOrMissedCancelled;
    }
    return false;
  };

  const handleDiscountButton = (services: any) => {
    const isCheckDiscount: any = services.find(
      (service: any) => service.isManuel === true
    );

    if (isCheckDiscount) {
      return true;
    }

    return false;
  };

  const handleCheckIsCompleted = (services: any) => {
    const isCheckCompleteService: any = services.some(
      (service: any) =>
        service.status === APPOINTMENT_STATUS.COMPLETED &&
        service.paymentStatus !== 'Paid'
    );

    if (!isCheckCompleteService) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentByCode(appointmentData.code)
        .then((res) => {
          const date = dayjs(res.data.data.appointmentTime);
          const formattedDateWithHour1 = dayjs(date).format(
            'ddd MMM DD YYYY h:mm:ss A'
          );
          const newDate2 = date.add(res.data.data.serviceTime, 'minute');
          const formattedDateWithHour2 = newDate2.format(
            'ddd MMM DD YYYY h:mm:ss A'
          );
          const startDate = dayjs(formattedDateWithHour1);
          const endDate = dayjs(formattedDateWithHour2);
          const startDateFormat = startDate.format('HH:mm');
          const endDateFormat = endDate.format('HH:mm');
          setIsLoader(false);
          setData({
            ...res.data.data,
            startDateFormat,
            endDateFormat,
          });
          getInvoice(res.data.data.code);
        });
    }
  }, []);

  const displayAppointmentDiscount = () => {
    if (discountedAppointments.type === 'Percentage') {
      return `${discountedAppointments?.actualAmount} % of ${discountedAppointments?.amount} PKR`;
    }
    return `${discountedAppointments.amount.toLocaleString() || 0} PKR`;
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
      <div className="custom-appo">
        <div className="bg-[#B8DFF2] p-5 pb-4">
          <div className="flex justify-between">
            <div className="w-full">
              <IconButton
                disabled={
                  data?.status === APPOINTMENT_STATUS.CANCELLED ||
                  data?.status === APPOINTMENT_STATUS.DONE ||
                  data?.status === APPOINTMENT_STATUS.COMPLETED ||
                  data?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                  data?.status === APPOINTMENT_STATUS.PROCESSING ||
                  data?.status === APPOINTMENT_STATUS.MISSED
                }
                className="icon-btn mr-3.5 p-0"
                onClick={() => {
                  if (
                    checkStatusHandler('delete') &&
                    listingRolePermission(
                      dataRole,
                      ALL_PERMISSIONS.storeAppointment.deleteAppointment
                    )
                  ) {
                    setCancelDialogOpen(true);
                  } else {
                    setIsNotify(true);
                    setNotifyMessage({
                      text: 'You are not authorized to view this page.',
                      type: 'error',
                    });
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                disabled={
                  data?.status === APPOINTMENT_STATUS.CANCELLED ||
                  data?.status === APPOINTMENT_STATUS.DONE ||
                  data?.status === APPOINTMENT_STATUS.COMPLETED ||
                  data?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                  data?.status === APPOINTMENT_STATUS.PROCESSING ||
                  data?.status === APPOINTMENT_STATUS.MISSED
                }
                name="Reschedule"
                className="icon-btn mr-3.5 p-0"
                onClick={() => {
                  if (
                    checkStatusHandler('reschedule') &&
                    listingRolePermission(
                      dataRole,
                      ALL_PERMISSIONS.storeAppointment.editAppointment
                    )
                  ) {
                    navigate(`./reschedule-appointment/${data.code}`);
                  } else {
                    setIsNotify(true);
                    setNotifyMessage({
                      text: 'You are not authorized to view this page.',
                      type: 'error',
                    });
                  }
                }}
              >
                <HistoryIcon />
              </IconButton>
              <IconButton name="Print Slip" className="icon-btn p-0">
                {/* {isPrintEnabled && ( */}
                {listingRolePermission(
                  dataRole,
                  ALL_PERMISSIONS.storeAppointment.editAppointment
                ) && (
                  <CustomAppointmentLayoutCash
                    isPrintEnabled={isPrintEnabled}
                    setPrintEnabled={setIsPrintEnabled}
                    data={invoiceData}
                    taxAmount={taxAmount()}
                    totalCost={totalAmount()}
                    grandTotalAmount={grandTotalAmount()}
                    appointmentDiscountAmount={Number(
                      discountedAppointments?.amount
                    )}
                  />
                )}
              </IconButton>
              <div className="mt-2 flex justify-between">
                <div className="flex w-[50%] items-center justify-start">
                  {showPaidHandler()}
                </div>
                <div className="flex w-[50%] items-center justify-end">
                  {handleCheckAllServices(data.services) ? (
                    ''
                  ) : data?.wallet === null &&
                    data?.isAppUser &&
                    !handleCheckAllServices(data.services) ? (
                    <div className="flex items-center justify-center">
                      <CustomButton
                        sx={
                          {
                            // height: '40px',
                            // width: '20px',
                          }
                        }
                        buttonType="button"
                        title="Wallet"
                        icon={<WalletIcon />}
                        className="btn-black-outline btn-icon"
                        onclick={handleClickPop}
                      />
                    </div>
                  ) : (
                    data?.isAppUser && (
                      <div>
                        <WalletIcon
                          className="mx-1 text-primary"
                          fontSize="small"
                        />
                        <span className="text-xs">{`${data?.wallet?.balance} ${CURRENCY_PREFIX}`}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-2 flex items-center justify-start">
                {handleDiscountButton(data?.services) ? (
                  handleDiscountButton(data?.services)
                ) : handleCheckIsCompleted(data?.services) ? (
                  ''
                ) : (
                  <CustomButton
                    buttonType="button"
                    title="Discount"
                    icon={<WalletIcon />}
                    className="btn-black-outline btn-icon"
                    onclick={handleDiscountClickPop}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <span className="text-xs">
              Sub Total Amount {Number(data?.totalAmount).toLocaleString()} PKR
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Completed Appointments (
              {completedAppointments()?.completedCount || 0}) ={' '}
              {completedAppointments()?.completedAmount.toLocaleString() || 0}{' '}
              PKR
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Missed Appointments ({missedAppointments().missedCount || 0}) ={' '}
              {missedAppointments().missedAmount.toLocaleString() || 0} PKR
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Appointments Discount = {displayAppointmentDiscount()}
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Total Amount {totalAmount().toLocaleString() || 0} PKR
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Tax {data?.gstPercentage || 0}% ={' '}
              {taxAmount().toLocaleString() || 0} PKR
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xs">
              Grand Total Amount {grandTotalAmount().toLocaleString()} PKR
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <span className="text-xl font-semibold">{data?.name}</span>
          </div>
        </div>
        <ViewCardAccordin
          // setIsRescheduled={setIsRescheduled}
          specificEmpAppointmentData={appointmentData}
          data={data}
          setData={setData}
          setAllAppointments={setAllAppointments}
        />
        {cancelDialogOpen && (
          <PermissionPopup
            type="shock"
            open={cancelDialogOpen}
            setOpen={setCancelDialogOpen}
            dialogText={dialogText}
            callback={statusCancelConfirmationHandler}
          />
        )}
        {paidDialogOpen && (
          <PermissionPopup
            type="thumb"
            open={paidDialogOpen}
            setOpen={setPaidDialogOpen}
            dialogText={dialogPaidText}
            callback={statusPaidConfirmationHandler}
          />
        )}
        <ViewWalletPopupCard
          id={id}
          open={open}
          anchorEl={anchorEl}
          onclose={handleClosePop}
          isWalletLoader={isWalletLoader}
          callback={onWalletSubmit}
        />
        <ViewDiscountPopupCard
          id={idDiscount}
          open={discountOpen}
          anchorEl={discountAnchorEl}
          onclose={handleDiscountClosePop}
          isWalletLoader={isDiscountLoader}
          callback={onDiscountSubmit}
          grandTotalAmount={grandTotalAmount()}
          totalAmount={totalAmount()}
        />
      </div>
    </>
  );
};

export default AppointmentViewCard;
