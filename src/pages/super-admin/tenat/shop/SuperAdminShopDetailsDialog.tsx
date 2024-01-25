import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import React from 'react';

import '../../../../assets/css/PopupStyle.css';

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
          <span className="font-open-sans text-xl font-semibold not-italic text-secondary">
            Shop Details
          </span>
          <div className="mt-5 flex flex-col px-5">
            <div>
              <div className="flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-secondary">
                  Shop Name
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {items.name}
                </div>
              </div>
            </div>
            <div className="grid w-[100%] grid-cols-2">
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-secondary">
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
                <span className="font-open-sans text-base font-medium not-italic text-secondary">
                  Description
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {items.desc}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-medium not-italic text-secondary">
                  Trial Start Date
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {dayjs(items.trialStartDate).isValid() ? (
                    <>{getDate(items.trialStartDate)}</>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col items-center">
                <span className="font-open-sans text-base font-medium not-italic text-secondary">
                  Trial End Time
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {dayjs(items.trialStartDate).isValid() ? (
                    <>{getRemainingTime(items.trialStartDate)}</>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-medium not-italic text-secondary">
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
