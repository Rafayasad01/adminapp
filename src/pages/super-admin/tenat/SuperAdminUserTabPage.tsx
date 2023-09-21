import React, { useState, useEffect } from 'react';
import Loader2 from '../../../components/common/Loader2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import dayjs from 'dayjs';
import Service from '../../../services/superadmin/Tenant';

type Props = {
    tenant: string;
};


const SuperAdminUserTabPage = ({ tenant }: Props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        Service.detailUser(tenant).then((item: any) => {
            if (item.data.success) {
                setDetail(item.data.data);
                setIsLoader(false);
            }
        })
    }, [tenant]);

    const handleFormClickOpen = () => {
    };

    return isLoader ? (
        <Loader2 />
    ) : detail && (
        <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4">
                <div className='flex flex-col py-[2rem] px-5'>
                    <div className='flex flex-col w-full'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Avatar</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            <Avatar
                                className="avatar flex flex-row items-center"
                                alt="Remy Sharp"
                                src={detail.avatar}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    textTransform: 'uppercase',
                                    fontSize: '14px',
                                    marginRight: '10px',
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>username</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.username ? detail.username : detail.first_name + detail.last_name}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Status</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            {detail.isActive ?
                                <span className="badge badge-success">ACTIVE</span>
                                :
                                <span className="badge badge-danger">INACTIVE</span>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>email</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.email}</div>
                    </div>
                    <div className='flex flex-row w-full gap-3 mt-4'>
                        <div className='flex flex-col w-full'>
                            <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Created Date</span>
                            <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                                {dayjs(detail.createdDate).isValid() ? (
                                    <>
                                        {dayjs(detail.createdDate)?.format(
                                            'ddd MMM DD YYYY HH:mm:ss'
                                        )}

                                    </>
                                ) : (
                                    '--'
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Updated Date</span>
                            <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                                {dayjs(detail.updatedDate).isValid() ? (
                                    <>
                                        {dayjs(detail.updatedDate)?.format(
                                            'ddd MMM DD YYYY HH:mm:ss'
                                        )}

                                    </>
                                ) : (
                                    '--'
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <Button
                            variant="contained"
                            className="btn-black-fill btn-icon"
                            disableRipple
                            sx={{ width: "200px" }}
                            onClick={handleFormClickOpen}
                        >
                            <SendOutlinedIcon sx={{ marginRight: "6px !important", width: "18px" }} /> Send To Email
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminUserTabPage;