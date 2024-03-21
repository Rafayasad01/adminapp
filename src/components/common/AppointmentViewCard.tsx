import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import assets from '../../assets';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import dayjs from 'dayjs';

type Props = {
  appointmentData?: any;
  setAppointmentTooltipData?: any;
  setIsTooltipOpen?: any;
  isTooltipOpen?: boolean;
};

const AppointmentViewCard = ({
  appointmentData,
  setAppointmentTooltipData,
  isTooltipOpen,
  setIsTooltipOpen,
  ...restProps
}: Props) => {
  console.log('🚀 ~ AppointmentViewCard ~ appointmentData:', appointmentData);

  const handleClose = () => {
    setIsTooltipOpen(false);
    setAppointmentTooltipData(null);
  };

  return (
    <div className="">
      <div className="bg-[#B8DFF2] p-5 pb-16">
        <div className="flex justify-between">
          <div>
            <IconButton
              className="icon-btn mr-3.5 p-0"
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
            alt="Remy Sharp"
            src={assets.images.avatarUser}
            sx={{ width: 100, height: 100 }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <span className="text-xl font-semibold">Linda Brown</span>
        </div>
        <div>
          <div className="mt-1 flex items-center justify-center rounded-full bg-[#1D1D1D] px-4 py-1 text-white">
            <StarIcon className="text-lg text-inherit" />
            <span className="mx-1 text-base">4.5</span>
          </div>
        </div>
      </div>
      <div className="m-3 mt-5 rounded-xl border-[1px] border-[#949EAE] p-3">
        <div className="mt-2 flex items-center">
          <div>
            <img src={assets.images.appHead} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              PRP Treatment & Botox Cosmetic (unit)
            </span>
          </div>
        </div>
        <div className="my-2 flex items-center">
          <div>
            <img src={assets.images.appCalender} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              {dayjs().isValid() ? dayjs()?.format('MMMM DD, YYYY') : '--'}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src={assets.images.appClock} alt="app-head" />
          </div>
          <div>
            <span className="mx-2 text-xs text-[#6A6A6A]">
              10AM - 11AM (60 min)
            </span>
          </div>
        </div>
        <div className="my-2 flex items-center">
          <div>
            <img src={assets.images.appProfile} alt="app-head" />
          </div>
          <div className="flex items-center">
            <Avatar
              className="ml-2"
              alt="Remy Sharp"
              src={assets.images.avatarUser}
              sx={{ width: 25, height: 25 }}
            />
            <span className="mx-2 text-xs text-[#6A6A6A]">W. Bailey</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewCard;
