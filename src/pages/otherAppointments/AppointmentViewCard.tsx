// import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import StarIcon from '@mui/icons-material/Star';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import Loader from '../../components/common/Loader2';
import { APPOINTMENT_STATUS } from '../../utils/constants';
import ViewCardAccordin from './ViewCardAccordin';

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

  const handleClose = () => {
    setIsTooltipOpen(false);
    setAppointmentTooltipData(null);
    setData(null);
  };

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
  }, []); // Empty dependency array ensures this effect runs only once

  // const calculateGrandTotal = () => {
  //   const dataList = data;
  //   console.log('🚀 ~ calculateGrandTotal ~ data:', data);
  //   return (
  //     dataList?.length > 0 &&
  //     dataList?.reduce((acc: any, tempData: any) => {
  //       return acc + parseFloat(tempData.grandTotalAmount);
  //     }, 0)
  //   );
  // };

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentByCode(appointmentData.code)
        .then((res) => {
          setIsLoader(false);
          setData(res.data.data);
        });
    }
  }, [appointmentData]);
  // console.log('🚀 ~ appointmentData:', data, appointmentData);

  return isLoader ? (
    <Loader />
  ) : (
    <div className="custom-appo">
      <div className="bg-primary p-5 pb-4">
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
            )}
            <div className="mt-4 text-foreground">
              <span className="text-xs">
                Total Amount {Number(data?.totalAmount).toLocaleString()} PKR
              </span>
            </div>
            <div className="text-foreground">
              <span className="text-xs">
                Tax {data?.gstPercentage || 0}% ={' '}
                {Number(data?.gstAmount).toLocaleString() || 0} PKR
              </span>
            </div>
            <div className="mt-1 text-foreground">
              <span className="text-xs">
                Grand Total Amount{' '}
                {Number(data?.grandTotalAmount).toLocaleString()} PKR
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
      <ViewCardAccordin data={data} />
    </div>
  );
};

export default AppointmentViewCard;
