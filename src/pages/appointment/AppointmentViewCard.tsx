import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
// import WalletIcon from '@mui/icons-material/Wallet';
import DeleteIcon from '@mui/icons-material/Delete';
import WalletIcon from '@mui/icons-material/Wallet';
// import EditIcon from '@mui/icons-material/Edit';
// import StarIcon from '@mui/icons-material/Star';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
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

  // console.log("DATATA", appointmentData);

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
    const checkDone: boolean = data?.services?.some(
      (el: any) => el.status === APPOINTMENT_STATUS.DONE
    );
    const statusNewProcess: boolean = data?.services?.some(
      (el: any) =>
        el.status === APPOINTMENT_STATUS.NEW ||
        el.status === APPOINTMENT_STATUS.PROCESSING
    );
    if (statusNewProcess) {
      return (
        <div
          onClick={() => {
            setIsNotify(true);
            setNotifyMessage({
              text: 'Some Process are in processing...',
              type: 'info',
            });
          }}
          className="mb-2 mt-3 flex w-[30%] cursor-pointer items-center justify-center rounded bg-primary p-1 text-sm text-white shadow"
        >
          <span className="px-2 text-xs">Paid</span>
        </div>
      );
    }
    if (data?.status === APPOINTMENT_STATUS.COMPLETED) {
      return (
        <div className="mt-3 flex items-center justify-between">
          <div
            onClick={() => {
              setIsNotify(true);
              setNotifyMessage({
                text: 'Its Paid',
                type: 'success',
              });
            }}
            className="mb-2 mt-3 flex w-[30%] cursor-pointer items-center justify-center rounded bg-primary p-1 text-sm text-white shadow"
          >
            <span className="px-2 text-xs">Paid</span>
          </div>
          {data?.wallet === null && data?.isAppUser ? (
            <div className="flex">
              <CustomButton
                // sx={{
                //   height: '20px',
                //   // width: '20px',
                // }}
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
                <WalletIcon className="mx-1 text-primary" fontSize="small" />
                <span className="text-xs">{`${data?.wallet?.balance} ${CURRENCY_PREFIX}`}</span>
              </div>
            )
          )}
        </div>
      );
    }
    if (checkDone) {
      return (
        <div
          onClick={() => setPaidDialogOpen(true)}
          className="mb-2 mt-3 flex w-[30%] cursor-pointer items-center justify-center rounded bg-green-500 p-1 text-sm text-white shadow"
        >
          <CheckCircleOutlineIcon fontSize="inherit" className="mx-1" />
          <span>Paid</span>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          setIsNotify(true);
          setNotifyMessage({
            text: 'Paid button will enable when all services get done..',
            type: 'info',
          });
        }}
        className="mb-2 mt-3 flex w-[30%] cursor-pointer items-center justify-center rounded bg-primary p-1 text-sm text-white shadow"
      >
        <span className="px-2 text-xs">Paid</span>
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
    // console.log('🚀 ~ onWalletSubmit ~ data:', payload);
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
        // console.log('🚀 ~ onWalletSubmit ~ error:', error);
      });
  };

  // useEffect(() => {
  //   // if (data?.status === APPOINTMENT_STATUS.COMPLETED) {
  //   storeAppointmentService
  //     .AppointmentInvoiceDetailById(appointmentData.id)
  //     .then((res) => {
  //       setInvoiceData(res.data.data);
  //     });
  //   // }
  // }, []);

  const statusCancelConfirmationHandler = () => {
    setIsTooltipOpen(false);
    deleteAppointmentHandler(data.code);
  };

  const statusPaidConfirmationHandler = () => {
    setIsTooltipOpen(false);
    isStatusDone(data.code);
  };

  const getInvoice = (code: string) => {
    // console.log('🚀 ~ getInvoice ~ code:', code);
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

  // console.log('appointmentData', appointmentData);

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentByCode(appointmentData.code)
        .then((res) => {
          // console.log('🚀 ~ useEffect ~ appointmentData:', res.data.data);
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
          // console.log('SALON', formattedDateWithHour1, formattedDateWithHour2);
          setIsLoader(false);
          // res.data.data?.services?.forEach((el: any) => {
          //   if (el.status === APPOINTMENT_STATUS.RESCHEDULE) {
          //     // setData({ ...data, service: el });
          //     setIsRescheduled(true);
          //   }
          // });
          setData({
            ...res.data.data,
            startDateFormat,
            endDateFormat,
          });
          getInvoice(res.data.data.code);
        });
    }
  }, []);

  // console.log('data2222222222222222', data);

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
              {/* <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                appointmentData?.status === APPOINTMENT_STATUS.MISSED
              }
              className="icon-btn mr-3.5 p-0"
              onClick={() => {
                setOpenFormDialog(true);
                setIsTooltipOpen(false);
                getUpdatePopupData(data);
              }}
            >
              <EditIcon />
            </IconButton> */}
              <IconButton
                // disabled={
                //   isRescheduled ||
                //   appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                //   appointmentData?.status === APPOINTMENT_STATUS.DONE ||
                //   appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                //   appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                //   appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                //   appointmentData?.status === APPOINTMENT_STATUS.MISSED
                // }
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
                // disabled={
                //   isRescheduled ||
                //   appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                //   appointmentData?.status === APPOINTMENT_STATUS.DONE ||
                //   appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                //   appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                //   appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                //   appointmentData?.status === APPOINTMENT_STATUS.MISSED
                // }
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
                  />
                )}
              </IconButton>
              {showPaidHandler()}
            </div>
          </div>
          <div className="">
            <span className="text-xs">
              Total Amount {Number(data?.totalAmount).toLocaleString()} PKR
            </span>
          </div>
          <div className="">
            <span className="text-xs">
              Tax {data?.gstPercentage || 0}% ={' '}
              {Number(data?.gstAmount).toLocaleString() || 0} PKR
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xs">
              Grand Total Amount{' '}
              {Number(data?.grandTotalAmount).toLocaleString()} PKR
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <span className="text-xl font-semibold">{data?.name}</span>
          </div>
        </div>
        <ViewCardAccordin
          // setIsRescheduled={setIsRescheduled}
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
      </div>
    </>
  );
};

export default AppointmentViewCard;
