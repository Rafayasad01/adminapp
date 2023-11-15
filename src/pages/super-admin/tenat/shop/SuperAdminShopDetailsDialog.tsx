import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

import '../../../../assets/css/PopupStyle.css';
import IconButton from '@mui/material/IconButton';
import { Tenant } from '../../../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../../../utils/constants';
import CustomDropDown from '../../../../components/common/CustomDropDown';

dayjs.extend(duration);
dayjs.extend(isBetween);

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  items: any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function SuperAdminShopDetailsDialog({
  openFormDialog,
  setOpenFormDialog,
  items,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const getDate = (date: any) => {
    const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
    const toString = dayjs(date)?.toString().split(' ').pop();
    const timeZone = dayjs(date)?.format('ZZ');
    return `${formatDate} ${toString} ${timeZone}`;
  };

  const getRemainingTime = (time: any) => {
    const addTime = dayjs(time).add(15, 'days');
    const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
    const diffBetween = dayjs.duration(dayjs().diff(endTime));
    const remainingTime = Math.abs(diffBetween.days());
    let dayTxt = 'day';
    if (remainingTime > 1) {
      dayTxt = 'days';
    }
    let remainingTxt;
    if (remainingTime <= 0) {
      remainingTxt = 'Expired';
    } else {
      remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
    }
    return remainingTxt;
  };

  return (
    items && (
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        PaperProps={{
          className: 'Dialog',
          style: { maxWidth: '100%', maxHeight: 'auto' },
        }}
      >
        <div className="Content">
          <span className="font-open-sans text-xl font-semibold not-italic text-[#1A1A1A]">
            Shop Details
          </span>
          <div className="mt-5 flex flex-col px-5">
            <div>
              <div className="flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                  Shop Name
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {items.name}
                </div>
              </div>
            </div>
            <div className="grid w-[100%] grid-cols-2">
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                  Created Date
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {dayjs(items.createdDate).isValid() ? (
                    <>{getDate(items.createdDate)}</>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
            </div>

            {items.desc && (
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                  Description
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {items.desc}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                  Trail Start Date
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {dayjs(items.trailStartDate).isValid() ? (
                    <>{getDate(items.trailStartDate)}</>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col items-center">
                <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                  Trial End Time
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {dayjs(items.trailStartDate).isValid() ? (
                    <>{getRemainingTime(items.trailStartDate)}</>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-medium not-italic text-[#1A1A1A]">
                Trial Mode
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                <Switch
                  checked={items?.trialMode}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  );
}

export default SuperAdminShopDetailsDialog;
