import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import Loader2 from '../../../../components/common/Loader2';
import EditIcon from '@mui/icons-material/Edit';
import Service from '../../../../services/superadmin/Tenant';
import CustomButton from '../../../../components/common/CustomButton';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';

type Props = {
  tenant: string;
};

function SuperAdminTenantTabPage({ tenant }: Props) {
  const [isLoader, setIsLoader] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    Service.detailShop(tenant).then((item: any) => {
      if (item.data.success) {
        setDetail(item.data.data);
        setIsLoader(false);
      }
    });
  }, [tenant]);

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

  return isLoader ? (
    <Loader2 />
  ) : (
    detail && (
      <div className="grid w-full grid-cols-8 gap-3">
        <div className="col-span-4 flex py-[2rem]">
          <div className="flex flex-col px-5">
            <div className="flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Shop Name
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                {detail.name}
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Status
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                {detail.isActive ? (
                  <span className="badge badge-success">Enabled</span>
                ) : (
                  <span className="badge badge-danger">Disabled</span>
                )}
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Created Date
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                {dayjs(detail.createdDate).isValid() ? (
                  <>{getDate(detail.createdDate)}</>
                ) : (
                  '--'
                )}
              </div>
            </div>
            {detail.desc && (
              <div className="mt-4 flex w-full flex-col">
                <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                  Description
                </span>
                <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                  {detail.desc}
                </div>
              </div>
            )}
            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Trial Mode
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                <Switch
                  checked={detail.trialMode}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disabled
                />
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Trail Start Date
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                {dayjs(detail.trailStartDate).isValid() ? (
                  <>{getDate(detail.trailStartDate)}</>
                ) : (
                  '--'
                )}
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Trial End Time
              </span>
              <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                {dayjs(detail.trailStartDate).isValid() ? (
                  <>{getRemainingTime(detail.trailStartDate)}</>
                ) : (
                  '--'
                )}
              </div>
            </div>
          </div>
          <div className='flex'>
            <div>
              <IconButton
                title='Edit Branch'
                className="pl-1 m-0"
              // onClick={() =>
              //   item.isActive ? editHandler(item.id) : null
              // }
              >
                <EditIcon />
              </IconButton>
            </div>
            <div>
              <Button
                variant="contained"
                className="btn-black-fill btn-icon"
                // onClick={handleFormClickOpen}
              >
                <AddOutlinedIcon /> Add New Shop
              </Button>
            </div>
          </div>
        </div>
        {/* <div className='col-span-4 bg-slate-300 flex'>
          <div>
            <CustomButton title='Edit Shop' buttonType="button" />
          </div>
          <div>
          <CustomButton title='Add New Shop Branch' buttonType="button" />
          </div>
        </div> */}
      </div>
    )
  );
}

export default SuperAdminTenantTabPage;
