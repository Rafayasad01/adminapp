import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
// import CloseIcon from '@mui/icons-material/Close';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import WalletIcon from '@mui/icons-material/Wallet';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import walletService from '../../services/adminapp/adminWallet';
import Loader from '../../components/common/Loader2';
import { APPOINTMENT_STATUS } from '../../utils/constants';
import CustomButton from '../../components/common/CustomButton';
import ViewWalletPopupCard from './ViewWalletPopupCard';
import CustomAppointmentLayoutCash from '../../utils/CustomPrintLayout/CustomAppointmentLayoutCash';

type AppointmentViewCardProps = {
  appointmentData?: any;
  // setAppointmentTooltipData?: any;
  setIsTooltipOpen?: any;
  setOpenFormDialog?: any;
  getUpdatePopupData?: any;
  isTooltipOpen?: boolean;
  isStatusDone?: any;
  isStatusProcessing?: any;
  deleteAppointmentHandler?: any;
};

const AppointmentViewCard = ({
  appointmentData,
  getUpdatePopupData,
  isTooltipOpen: _isTooltipOpen,
  // setAppointmentTooltipData,
  setIsTooltipOpen,
  setOpenFormDialog,
  isStatusDone,
  isStatusProcessing,
  deleteAppointmentHandler,
}: AppointmentViewCardProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isWalletLoader, setIsWalletLoader] = useState<boolean>(false);
  const [isPrintEnabled, setIsPrintEnabled] = useState<boolean>(false);
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
        } else {
          setIsWalletLoader(false);
        }
      })
      .catch((error) => {
        setIsWalletLoader(false);
        console.log('🚀 ~ onWalletSubmit ~ error:', error);
      });
  };

  useEffect(() => {
    // if (data?.status === APPOINTMENT_STATUS.COMPLETED) {
    storeAppointmentService
      .AppointmentInvoiceDetailById(appointmentData.id)
      .then((res) => {
        setInvoiceData(res.data.data);
      });
    // }
  }, []);

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentById(appointmentData.id)
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
          // console.log('SALON', formattedDateWithHour1, formattedDateWithHour2);
          setIsLoader(false);
          setData({
            ...res.data.data,
            startDateFormat,
            endDateFormat,
          });
        });
    }
  }, [appointmentData, isWalletLoader]);

  return isLoader ? (
    <Loader />
  ) : (
    <div className="custom-appo">
      <div className="bg-[#B8DFF2] p-5 pb-12">
        <div className="flex justify-between">
          <div>
            <IconButton
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
            </IconButton>
            <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
                appointmentData?.status === APPOINTMENT_STATUS.COMPLETED ||
                appointmentData?.status === APPOINTMENT_STATUS.RESCHEDULE ||
                appointmentData?.status === APPOINTMENT_STATUS.PROCESSING ||
                appointmentData?.status === APPOINTMENT_STATUS.MISSED
              }
              className="icon-btn mr-3.5 p-0"
              onClick={() => {
                setIsTooltipOpen(false);
                deleteAppointmentHandler(appointmentData.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              disabled={
                appointmentData?.status === APPOINTMENT_STATUS.CANCELLED ||
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
            {appointmentData?.status !== APPOINTMENT_STATUS.NEW &&
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
            ) : (
              <div
                onClick={() => {
                  setIsTooltipOpen(false);
                  if (appointmentData?.status === 'New') {
                    isStatusProcessing(appointmentData.id);
                  } else if (data?.status === APPOINTMENT_STATUS.DONE) {
                    isStatusDone(appointmentData.id);
                  }
                }}
                className={`mt-3 flex w-[100%] ${
                  data?.status === APPOINTMENT_STATUS.PROCESSING
                    ? 'cursor-default'
                    : 'cursor-pointer border-[3px] bg-slate-200 shadow'
                } items-center justify-center rounded`}
              >
                <IconButton
                  size="small"
                  name="Done"
                  disabled={data?.status === APPOINTMENT_STATUS.PROCESSING}
                  className="icon-btn mx-[4px] p-0"
                  // onClick={() => isStatusDone(appointmentData.id)}
                >
                  {data?.status === APPOINTMENT_STATUS.NEW ? (
                    <UpdateOutlinedIcon fontSize="small" />
                  ) : data?.status === APPOINTMENT_STATUS.PROCESSING ? (
                    <InfoOutlinedIcon fontSize="small" />
                  ) : (
                    <CheckCircleOutlineIcon fontSize="small" />
                  )}
                </IconButton>
                <span className="text-sm">
                  {data?.status === APPOINTMENT_STATUS.NEW
                    ? 'Processing'
                    : data?.status === APPOINTMENT_STATUS.PROCESSING
                    ? 'This must be done by the staff.'
                    : data?.status === APPOINTMENT_STATUS.DONE
                    ? 'Complete'
                    : ''}
                </span>
              </div>
            )}
          </div>
          {/* <div>
            <IconButton className="icon-btn p-0" onClick={handleClose}>
              <CloseIcon style={{ fontSize: '28px' }} />
            </IconButton>
          </div> */}
        </div>
        <div className="mt-3">
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
                  onclick={handleClickPop}
                  // onclick={handleFormClickOpen}
                />
              </div>
            )}
        </div>
      </div>
      <div className="relative h-14">
        <hr className="border-1 border-[#1D4675]" />
        <div className="absolute left-1/2 top-[-50px] -translate-x-1/2 transform">
          <Avatar
            alt="barber-pic"
            src={data?.storeEmployee?.avatar}
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <span className="text-xl font-semibold">
            {data?.storeEmployee?.name}
          </span>
        </div>
        <div>
          <div className="mt-1 flex items-center justify-center rounded-full bg-[#1D1D1D] px-4 py-1 text-white">
            <StarIcon className="text-lg text-inherit" />
            <span className="mx-1 text-base">{data?.rating}</span>
          </div>
        </div>
      </div>
      <div className="m-3 mt-5 rounded-xl border-[1px] border-[#949EAE] p-3">
        <div className="my-2 flex items-center">
          <div>
            <img src={assets.images.appProfile} alt="app-head" />
          </div>
          <div className="flex items-center">
            <span className="mx-2 text-xs text-[#6A6A6A]">{data?.name}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div>
            <PhoneIphoneOutlinedIcon
              className="m-0 p-0 text-[0.9rem] text-[#6A6A6A]"
              fontSize="small"
            />
          </div>
          <div className="">
            <span className="mx-2 text-xs text-[#6A6A6A]">{data?.phone}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div>
            <img src={assets.images.appHead} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              {data?.storeServiceCategoryItem?.name}
            </span>
          </div>
        </div>
        <div className="my-2 flex items-center">
          <div>
            <img src={assets.images.appCalender} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              {dayjs(data?.appointmentTime)?.format('MMMM DD, YYYY') ?? '--'}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src={assets.images.appClock} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              {dayjs(appointmentData?.startDate).format('h:mm A')} -{' '}
              {dayjs(appointmentData?.endDate).format('h:mm A')}
            </span>
          </div>
        </div>
      </div>
      <ViewWalletPopupCard
        id={id}
        open={open}
        anchorEl={anchorEl}
        onclose={handleClosePop}
        isWalletLoader={isWalletLoader}
        callback={onWalletSubmit}
      />
    </div>
  );
};

export default AppointmentViewCard;
