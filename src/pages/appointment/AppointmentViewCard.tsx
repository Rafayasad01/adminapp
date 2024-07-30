import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
// import WalletIcon from '@mui/icons-material/Wallet';
// import EditIcon from '@mui/icons-material/Edit';
// import StarIcon from '@mui/icons-material/Star';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
// import walletService from '../../services/adminapp/adminWallet';
import Loader from '../../components/common/Loader2';
import { APPOINTMENT_STATUS } from '../../utils/constants';
// import CustomButton from '../../components/common/CustomButton';
// import ViewWalletPopupCard from './ViewWalletPopupCard';
import CustomAppointmentLayoutCash from '../../utils/CustomPrintLayout/CustomAppointmentLayoutCash';
import ViewCardAccordin from './ViewCardAccordin';
import Notify from '../../components/common/Notify';
import PermissionPopup from '../../utils/PermissionPopup';

type AppointmentViewCardProps = {
  appointmentData?: any;
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
  // getUpdatePopupData,
  isTooltipOpen: _isTooltipOpen,
  // setAppointmentTooltipData,
  setIsTooltipOpen,
  // setOpenFormDialog,
  isStatusDone,
  // isStatusProcessing,
  deleteAppointmentHandler,
}: AppointmentViewCardProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  // const [isWalletLoader, setIsWalletLoader] = useState<boolean>(false);
  const [isPrintEnabled, setIsPrintEnabled] = useState<boolean>(false);
  const [isRescheduled, setIsRescheduled] = useState(false);

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
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClosePop = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

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

  // const onWalletSubmit = (payload: any) => {
  //   // console.log('🚀 ~ onWalletSubmit ~ data:', payload);
  //   setIsWalletLoader(true);
  //   const dataObj = {
  //     ...payload,
  //     referenceId: appointmentData.id,
  //     appUser: appointmentData.appUser,
  //     // referenceType: 'Appointment',
  //     // type: 'Credit',
  //   };
  //   walletService
  //     .WalletCreate(dataObj)
  //     .then((item) => {
  //       if (item.data.success) {
  //         setIsWalletLoader(false);
  //         handleClosePop();
  //       } else {
  //         setIsWalletLoader(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setIsWalletLoader(false);
  //       console.log('🚀 ~ onWalletSubmit ~ error:', error);
  //     });
  // };

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

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentById(appointmentData.id)
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
          res.data.data?.services?.forEach((el: any) => {
            if (el.status === APPOINTMENT_STATUS.RESCHEDULE) {
              // setData({ ...data, service: el });
              setIsRescheduled(true);
            }
          });
          setData({
            ...res.data.data,
            startDateFormat,
            endDateFormat,
          });
          setInvoiceData(res.data.data);
        });
    }
  }, []);

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
            <div>
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
                disabled={
                  isRescheduled ||
                  appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                  appointmentData?.status === APPOINTMENT_STATUS.DONE ||
                  appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                  appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                  appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                  appointmentData?.status === APPOINTMENT_STATUS.MISSED
                }
                className="icon-btn mr-3.5 p-0"
                onClick={() => setCancelDialogOpen(true)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                disabled={
                  isRescheduled ||
                  appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                  appointmentData?.status === APPOINTMENT_STATUS.DONE ||
                  appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                  appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                  appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                  appointmentData?.status === APPOINTMENT_STATUS.MISSED
                }
                name="Reschedule"
                className="icon-btn mr-3.5 p-0"
                onClick={() =>
                  navigate(`./reschedule-appointment/${appointmentData.id}`)
                }
              >
                <HistoryIcon />
              </IconButton>
              <IconButton name="Print Slip" className="icon-btn p-0">
                <CustomAppointmentLayoutCash
                  isPrintEnabled={isPrintEnabled}
                  setPrintEnabled={setIsPrintEnabled}
                  data={invoiceData}
                />
              </IconButton>
              {/* {appointmentData?.status !== APPOINTMENT_STATUS.NEW &&
            appointmentData?.status !== APPOINTMENT_STATUS.PROCESSING &&
            appointmentData?.status !== APPOINTMENT_STATUS.DONE ? (
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
                    : ''}
                </span>
              </div>
            )  */}
              {/* : ( */}
              {data?.status === APPOINTMENT_STATUS.COMPLETED ? (
                <div className="mb-2 mt-3 flex w-[100%] cursor-pointer items-center justify-center rounded bg-green-500 p-1 text-sm text-white shadow">
                  <span>Paid</span>
                </div>
              ) : data?.status === APPOINTMENT_STATUS.MISSED ? (
                <div className="mt-3 flex w-[100%] items-center justify-center rounded bg-red-500 p-1 text-sm text-white shadow">
                  <span>Missed</span>
                </div>
              ) : data?.status === APPOINTMENT_STATUS.CANCELLED ? (
                <div className="mt-3 flex w-[100%] items-center justify-center rounded bg-red-500 p-1 text-sm text-white shadow">
                  <span>Cancelled</span>
                </div>
              ) : isRescheduled ? (
                <div className="mt-3 flex w-[100%] items-center justify-center rounded bg-primary p-1 text-sm shadow">
                  <span>Rescheduled</span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (data?.status === APPOINTMENT_STATUS.DONE) {
                      setPaidDialogOpen(true);
                    } else {
                      setIsNotify(true);
                      setNotifyMessage({
                        text: 'Services has been under processing',
                        type: 'info',
                      });
                    }
                  }}
                  // onClick={() => {
                  // setIsTooltipOpen(false);
                  // isStatusDone(data.code);
                  // if (appointmentData?.status === 'New') {
                  //   isStatusProcessing(appointmentData.id);
                  // } else if (data?.status === APPOINTMENT_STATUS.PROCESSING) {
                  //   isStatusDone(data.code);
                  // }
                  // }}
                  className="mt-3 flex w-[100%] cursor-pointer items-center justify-center rounded bg-primary p-1 shadow"
                >
                  <IconButton
                    size="small"
                    name="Done"
                    disabled={
                      data?.status === APPOINTMENT_STATUS.PROCESSING ||
                      data?.status === APPOINTMENT_STATUS.CANCELLED
                    }
                    className="icon-btn mx-[4px] p-0 text-foreground"
                    // onClick={() => isStatusDone(data.code)}
                  >
                    <CheckCircleOutlineIcon fontSize="small" />
                    {/* {data?.status === APPOINTMENT_STATUS.NEW ? (
                    <UpdateOutlinedIcon fontSize="small" />
                  ) : (
                    data?.status === APPOINTMENT_STATUS.PROCESSING && (
                      // <InfoOutlinedIcon fontSize="small" />
                      <CheckCircleOutlineIcon fontSize="small" />
                    )
                  )} */}
                  </IconButton>
                  <span className="text-sm text-foreground">
                    Paid
                    {/* {data?.status === APPOINTMENT_STATUS.NEW
                    ? 'Done'
                    : data?.status === APPOINTMENT_STATUS.PROCESSING
                    ? 'Complete'
                    : ''} */}
                  </span>
                </div>
              )}
              {/* )} */}
            </div>
            {/* <div>
            <IconButton className="icon-btn p-0" onClick={handleClose}>
              <CloseIcon style={{ fontSize: '28px' }} />
            </IconButton>
          </div> */}
          </div>
          {/* <div className="mt-3">
          {appointmentData?.status === APPOINTMENT_STATUS.COMPLETED &&
            data?.wallets === null && (
              <div>
                <CustomButton
                  // sx={{
                  //   width: '20px',
                  // }}
                  buttonType="button"
                  title="Wallet"
                  icon={<WalletIcon />}
                  className="btn-black-outline btn-icon"
                  // onclick={handleClickPop}
                  // onclick={handleFormClickOpen}
                />
              </div>
            )}
        </div> */}
          <div className="flex items-center justify-center">
            <span className="text-xl font-semibold">{data?.name}</span>
          </div>
        </div>
        <ViewCardAccordin
          setIsRescheduled={setIsRescheduled}
          data={data}
          setData={setData}
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
        {/* <ViewWalletPopupCard
        id={id}
        open={open}
        anchorEl={anchorEl}
        onclose={handleClosePop}
        isWalletLoader={isWalletLoader}
        callback={onWalletSubmit}
      /> */}
      </div>
    </>
  );
};

export default AppointmentViewCard;
