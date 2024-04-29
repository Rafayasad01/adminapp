import EditNoteOutlinedIcon from '@mui/icons-material/BorderColor';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import Loader from '../../components/common/Loader2';
import { APPOINTMENT_STATUS } from '../../utils/constants';

type AppointmentViewCardProps = {
  appointmentData?: any;
  setAppointmentTooltipData?: any;
  setIsTooltipOpen?: any;
  setOpenFormDialog?: any;
  getUpdatePopupData?: any;
  isTooltipOpen?: boolean;
  isStatusDone?: any;
};

const AppointmentViewCard = ({
  appointmentData,
  getUpdatePopupData,
  isTooltipOpen: _isTooltipOpen,
  setAppointmentTooltipData,
  setIsTooltipOpen,
  setOpenFormDialog,
  isStatusDone,
}: AppointmentViewCardProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  const handleClose = () => {
    setIsTooltipOpen(false);
    setAppointmentTooltipData(null);
    setData(null);
  };

  useEffect(() => {
    if (appointmentData) {
      storeAppointmentService
        .getAppointmentById(appointmentData.id)
        .then((res) => {
          const date = dayjs(res.data.data.appointmentTime);
          const newDate2 = date.add(25, 'minute');
          const formattedDateWithHour1 = dayjs(date).format(
            'ddd MMM DD YYYY h:mm:ss A'
          );
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
  }, [appointmentData]);

  console.log('appointmentData', appointmentData);

  return isLoader ? (
    <Loader />
  ) : (
    <div className="custom-appo">
      <div className="bg-[#B8DFF2] p-5 pb-16">
        <div className="flex justify-between">
          <div>
            <IconButton
              className="icon-btn mr-3.5 p-0"
              onClick={() => {
                setOpenFormDialog(true);
                setIsTooltipOpen(false);
                getUpdatePopupData(data);
              }}
              // onClick={() =>
              //     item.isActive ? editHandler(item.id) : null
              // }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className="icon-btn mr-3.5 p-0"
              // onClick={() =>
              //     item.isActive ? editHandler(item.id) : null
              // }
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              name="Reschedule"
              className="icon-btn mr-3.5 p-0"
              onClick={() =>
                navigate(`./reschedule-appointment/${appointmentData.id}`)
              }
            >
              <EditNoteOutlinedIcon />
            </IconButton>
            {appointmentData?.status !== APPOINTMENT_STATUS.NEW ? (
              <div className="mt-3">
                <span className="rounded bg-slate-200 px-2 py-1 text-sm">
                  {appointmentData?.status === APPOINTMENT_STATUS.COMPLETED
                    ? 'Appointment has been Completed'
                    : appointmentData?.status === APPOINTMENT_STATUS.MISSED
                    ? 'Appointment has been Missed'
                    : ''}
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsTooltipOpen(false);
                  isStatusDone(appointmentData.id);
                }}
                className="mt-3 flex w-[70%] cursor-pointer items-center justify-center rounded border-[3px] bg-slate-200 shadow"
              >
                <IconButton
                  size="small"
                  name="Done"
                  className="icon-btn mx-[4px] p-0"
                  // onClick={() => isStatusDone(appointmentData.id)}
                >
                  <CheckCircleOutlineIcon fontSize="small" />
                </IconButton>
                <span className="text-sm">Done</span>
              </div>
            )}
          </div>
          <div>
            <IconButton className="icon-btn p-0" onClick={handleClose}>
              <CloseIcon style={{ fontSize: '28px' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="relative h-14">
        <hr className="border-1 border-[#1D4675]" />
        <div className="absolute left-1/2 top-[-50px] -translate-x-1/2 transform">
          <Avatar
            alt="barber-pic"
            src={data?.storeEmployee?.avatar}
            sx={{ width: 100, height: 100 }}
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
            <span className="mx-1 text-base">4.5</span>
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
              {dayjs(data?.appointmentTime).isValid()
                ? dayjs(data?.appointmentTime)?.format('MMMM DD, YYYY')
                : '--'}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src={assets.images.appClock} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              {data?.startDateFormat} - {data?.endDateFormat} (
              {data?.serviceTime} min)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewCard;
