// import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import StarIcon from '@mui/icons-material/Star';
// import Avatar from '@mui/material/Avatar';
import WalletIcon from '@mui/icons-material/Wallet';
import IconButton from '@mui/material/IconButton';
// import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import Loader from '../../components/common/Loader2';
import { APPOINTMENT_STATUS } from '../../utils/constants';
import ViewCardAccordin from './ViewCardAccordin';
import CustomAppointmentLayoutCash from '../../utils/CustomPrintLayout/CustomAppointmentLayoutCash';
import Notify from '../../components/common/Notify';
import CustomButton from '../../components/common/CustomButton';
import ViewDiscountPopupCard from './ViewDiscountPopupCard';

type AppointmentViewCardProps = {
  appointmentData?: any;
  setAppointmentTooltipData?: any;
  setIsTooltipOpen?: any;
  // setOpenFormDialog?: any;
  // getUpdatePopupData?: any;
  isTooltipOpen?: boolean;
  isStatusDone?: any;
  isStatusProcessing?: any;
  deleteAppointmentHandler?: any;
};

const AppointmentViewCard = ({
  appointmentData,
  // getUpdatePopupData,
  isTooltipOpen: _isTooltipOpen,
  setAppointmentTooltipData,
  setIsTooltipOpen,
  // setOpenFormDialog,
  isStatusDone,
  isStatusProcessing,
  deleteAppointmentHandler,
}: AppointmentViewCardProps) => {
  // const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isDiscountLoader, setIsDiscountLoader] = useState<boolean>(false);
  const [isPrintEnabled, setIsPrintEnabled] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  // popover navigation of discount button
  const [discountAnchorEl, setDiscountAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const handleDiscountClickPop = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDiscountAnchorEl(event.currentTarget);
  };
  /**
   * Function to close the discount popover
   */
  const handleDiscountClosePop = () => {
    // Set the anchor element to null
    setDiscountAnchorEl(null);
  };
  const discountOpen = Boolean(discountAnchorEl);
  const idDiscount = discountOpen ? 'simple-popover' : undefined;

  const handleClose = () => {
    setIsTooltipOpen(false);
    setAppointmentTooltipData(null);
    setData(null);
  };

  useEffect(() => {
    const element = document.querySelector('.MuiPaper-elevation8');

    if (element) {
      element.classList.add('custom-class-app');
    }

    return () => {
      if (element) {
        element.classList.remove('custom-class-app');
      }
    };
  }, []);

  const getInvoice = (code: string) => {
    // setIsLoader(true);
    setIsPrintEnabled(true);
    storeAppointmentService
      .AppointmentInvoiceDetailByCode(code)
      .then((res) => {
        // setIsLoader(false);
        setIsPrintEnabled(false);
        setInvoiceData(res.data.data.data);
      })
      .catch((err: Error) => {
        setIsPrintEnabled(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentByCode(appointmentData.code)
        .then((res) => {
          setIsLoader(false);
          setData(res.data.data);
          getInvoice(appointmentData.code);
        });
    }
  }, [appointmentData]);
  // console.log('🚀 ~ appointmentData:', data, appointmentData);

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

  const handleCheckIsCompleted = (services: any) => {
    const isCheckCompleteService: any = services?.some(
      (service: any) =>
        (service?.status === APPOINTMENT_STATUS.COMPLETED ||
          service?.status === APPOINTMENT_STATUS.DONE) &&
        service?.paymentStatus !== 'Paid'
    );

    if (!isCheckCompleteService) {
      return true;
    }

    return false;
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

  const displayAppointmentDiscount = () => {
    if (discountedAppointments.type === 'Percentage') {
      return `${discountedAppointments?.actualAmount} % of ${discountedAppointments?.amount} PKR`;
    }
    return `${discountedAppointments.amount.toLocaleString() || 0} PKR`;
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div className="custom-appo">
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="bg-primary p-5 pb-4">
        <div className="flex justify-between">
          <div className="">
            {/* <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                appointmentData?.status === APPOINTMENT_STATUS.MISSED
              }
              className="icon-btn mr-3.5 p-0 text-foreground"
              onClick={() => {
                setOpenFormDialog(true);
                setIsTooltipOpen(false);
                getUpdatePopupData(data);
              }}
            >
              <EditIcon />
            </IconButton> */}
            <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                appointmentData?.status === APPOINTMENT_STATUS.MISSED ||
                appointmentData?.status === APPOINTMENT_STATUS.DONE
              }
              className="icon-btn mr-3.5 p-0 text-foreground"
              onClick={() => {
                setIsTooltipOpen(false);
                deleteAppointmentHandler(appointmentData.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              // onClick={() => getInvoice(data.code)}
              name="Print Slip"
              className="icon-btn p-0"
            >
              {/* {isPrintEnabled && ( */}
              <CustomAppointmentLayoutCash
                isPrintEnabled={isPrintEnabled}
                setPrintEnabled={setIsPrintEnabled}
                data={{
                  ...invoiceData,
                  taxAmount: taxAmount(),
                  totalCost: totalAmount(),
                  grandTotalAmount: grandTotalAmount(),
                  appointmentDiscountAmount: Number(
                    discountedAppointments?.amount
                  ),
                }}
              />
            </IconButton>
            {/* <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                appointmentData?.status === APPOINTMENT_STATUS.MISSED
              }
              name="Reschedule"
              className="icon-btn mr-3.5 p-0 text-foreground"
              onClick={() =>
                navigate(`./reschedule-appointment/${appointmentData.id}`)
              }
            >
              <HistoryIcon />
            </IconButton> */}
            {appointmentData?.status !== APPOINTMENT_STATUS.NEW &&
            appointmentData?.status !== APPOINTMENT_STATUS.PROCESSING ? (
              <div className="mt-3">
                <span className="rounded bg-slate-200 px-2 py-1 text-sm">
                  {appointmentData?.status === APPOINTMENT_STATUS.COMPLETED
                    ? 'Appointment has been Completed'
                    : appointmentData?.status === APPOINTMENT_STATUS.MISSED
                    ? 'Appointment has been Missed'
                    : appointmentData?.status === APPOINTMENT_STATUS.CANCELLED
                    ? 'Appointment has been Cancelled'
                    : appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE
                    ? 'Appointment has been Rescheduled'
                    : appointmentData?.status === APPOINTMENT_STATUS.DONE
                    ? 'Appointment has been Done'
                    : ''}
                </span>
              </div>
            ) : (
              <div className="">
                <div
                  onClick={() => {
                    setIsTooltipOpen(false);
                    if (appointmentData?.status === 'New') {
                      isStatusProcessing(appointmentData.id);
                    } else {
                      isStatusDone(appointmentData.id);
                    }
                  }}
                  className="mt-3 flex w-[100%] cursor-pointer items-center justify-center rounded border-[3px] bg-slate-200 shadow"
                >
                  <IconButton
                    size="small"
                    name="Done"
                    className="icon-btn mx-[4px] p-0"
                    // onClick={() => isStatusDone(appointmentData.id)}
                  >
                    {appointmentData?.status === APPOINTMENT_STATUS.NEW ? (
                      <UpdateOutlinedIcon fontSize="small" />
                    ) : (
                      <CheckCircleOutlineIcon fontSize="small" />
                    )}
                  </IconButton>
                  <span className="text-sm">
                    {appointmentData?.status === APPOINTMENT_STATUS.NEW
                      ? 'Processing'
                      : 'Complete'}
                  </span>
                </div>
              </div>
            )}
            <div className="">
              {handleCheckIsCompleted(data?.services) ? (
                ''
              ) : (
                <CustomButton
                  buttonType="button"
                  title="Discount"
                  icon={<WalletIcon />}
                  className="btn-icon mt-3 h-[30px] bg-foreground text-center text-primary"
                  onclick={handleDiscountClickPop}
                />
              )}
            </div>
            <div className="mt-4 text-foreground">
              <span className="text-xs">
                Sub Total Amount {Number(data?.totalAmount).toLocaleString()}{' '}
                PKR
              </span>
            </div>
            <div className="text-foreground">
              <span className="text-xs">
                Appointments Discount = {displayAppointmentDiscount()}
              </span>
            </div>
            <div className="text-foreground">
              <span className="text-xs">
                Total Amount {totalAmount().toLocaleString() || 0} PKR
              </span>
            </div>
            <div className="text-foreground">
              <span className="text-xs">
                Price Exclusive Tax - {data?.gstPercentage || 0}% ={' '}
                {taxAmount().toLocaleString() || 0} PKR
              </span>
            </div>
            <div className="mt-1 font-bold text-foreground">
              <span className="text-xs">
                Grand Total Amount {grandTotalAmount().toLocaleString()} PKR
              </span>
            </div>
          </div>
          <div>
            <IconButton
              className="icon-btn p-0 text-foreground"
              onClick={handleClose}
            >
              <CloseIcon style={{ fontSize: '28px' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <ViewCardAccordin
        specificEmpAppointmentData={appointmentData}
        data={data}
      />
      <ViewDiscountPopupCard
        id={idDiscount}
        open={discountOpen}
        anchorEl={discountAnchorEl}
        onclose={handleDiscountClosePop}
        isWalletLoader={isDiscountLoader}
        callback={onDiscountSubmit}
        // grandTotalAmount={grandTotalAmount()}
        totalAmount={totalAmountWithoutDiscount}
      />
    </div>
  );
};

export default AppointmentViewCard;
