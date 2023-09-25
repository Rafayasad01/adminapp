import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import Loader2 from '../../../components/common/Loader2';
import Service from '../../../services/superadmin/Tenant';

type Props = {
  tenant: string;
};

function SuperAdminTenantTabPage({ tenant }: Props) {
  const [isLoader, setIsLoader] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    Service.detail(tenant).then((item: any) => {
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
      <div className="grid w-full grid-cols-12 gap-3">
        <div className="col-span-4">
          <div className="flex flex-col py-[2rem] px-5">
            <div className="flex w-full flex-col">
              <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                Tenant Name
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
        </div>
      </div>
    )
  );
}

export default SuperAdminTenantTabPage;
