import React, { useState, useEffect } from 'react';
import Loader2 from '../../../components/common/Loader2';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import Service from '../../../services/superadmin/Tenant';

type Props = {
    tenant: string;
};

const SuperAdminTenantTabPage = ({ tenant }: Props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        Service.detail(tenant).then((item: any) => {
            if (item.data.success) {
                setDetail(item.data.data);
                setIsLoader(false);
            }
        })
    }, [tenant]);

    const getDate = (date: any) => {
        const formatDate = dayjs(date)?.format('ddd MMM DD YYYY HH:mm:ss');
        const toString = dayjs(date)?.toString().split(' ').pop();
        const timeZone = dayjs(date)?.format('ZZ');
        return `${formatDate} ${toString} ${timeZone}`;
    }

    const getRemainingTime = (time: any) => {
        const addTime = dayjs(time).add(14, 'days');
        const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
        const diffBetween = dayjs.duration(dayjs().diff(endTime));
        const remainingTime = Math.abs(diffBetween.days());
        let dayTxt = "day";
        if (remainingTime > 1) {
            dayTxt = "days";
        }
        let remainingTxt;
        if (remainingTime <= 0) {
            remainingTxt = "Expired";
        } else {
            remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
        }
        return remainingTxt;
    }

    return isLoader ? (
        <Loader2 />
    ) : detail && (
        <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4">
                <div className='flex flex-col py-[2rem] px-5'>
                    <div className='flex flex-col w-full'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Tenant Name</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.name}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Status</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            {detail.isActive ?
                                <span className="badge badge-success">Enabled</span>
                                :
                                <span className="badge badge-danger">Disabled</span>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Created Date</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            {dayjs(detail.createdDate).isValid() ? (
                                <>
                                    {getDate(detail.createdDate)}

                                </>
                            ) : (
                                '--'
                            )}
                        </div>
                    </div>
                    {detail.desc && (
                        <div className='flex flex-col w-full mt-4'>
                            <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Description</span>
                            <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.desc}</div>
                        </div>
                    )}
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Trial mode</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            <Switch
                                checked={detail.trialMode}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>trail start date</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            {dayjs(detail.trailStartDate).isValid() ? (
                                <>{getDate(detail.trailStartDate)}</>
                            ) : (
                                '--'
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Trial End time</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
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
}

export default SuperAdminTenantTabPage;