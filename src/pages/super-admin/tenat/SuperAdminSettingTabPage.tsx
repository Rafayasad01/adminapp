import React, { useState, useEffect } from 'react';
import Loader2 from '../../../components/common/Loader2';
import assets from '../../../assets';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { FACEBOOK, INSTAGRAM, LINKEDIN, TWITTER, WHATSAPP, YOUTUBE } from '../../../utils/constants';
import Service from '../../../services/superadmin/Tenant';

type Props = {
    tenant: string;
};

const SuperAdminSettingTabPage = ({ tenant }: Props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        Service.detailSetting(tenant).then((item: any) => {
            if (item.data.success) {
                setDetail(item.data.data.tenantConfig);
                setIsLoader(false);
            }
        })
    }, [tenant]);

    type AssetsImages = keyof typeof assets.images;
    const Item = (props: { value: any; name: AssetsImages }) => {
        const { value, name } = props;
        return (
            <Link href={value} underline="none" target="_blank">
                <img src={assets.images[name]} alt="" />
            </Link>
        );
    }

    return isLoader ? (
        <Loader2 />
    ) : detail && (
        <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4">
                <div className='flex flex-col py-[2rem] px-5'>
                    <div className='flex flex-col w-full'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Logo</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-2'>
                            {detail.logo ? (
                                <Avatar
                                    className="avatar flex flex-row items-center"
                                    alt="Remy Sharp"
                                    src={detail.logo}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        textTransform: 'uppercase',
                                        fontSize: '14px',
                                        marginRight: '10px',
                                    }}
                                />
                            ) : (
                                <Avatar
                                    className="avatar flex flex-row items-center"
                                    alt="Remy Sharp"
                                    src={assets.images.tenantIcon}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        textTransform: 'uppercase',
                                        fontSize: '14px',
                                        marginRight: '10px',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Theme Name</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.name ? detail.name : '--'}</div>
                    </div>
                    <div className='flex flex-row w-full gap-3 mt-4'>
                        <div className='flex flex-col w-full'>
                            <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Theme Color</span>
                            <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                                <span style={{ background: `${detail.color1 ? detail.color1 : '#1A1A1A'}` }} className={`w-[25px] h-[25px] block rounded-full border border-[#D9D9D9]`}></span>
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Text Color</span>
                            <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                                <span style={{ background: `${detail.color2 ? detail.color2 : '#1A1A1A'}` }} className={`w-[25px] h-[25px] block rounded-full border border-[#D9D9D9]`}></span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>GST percentage</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.gstPercentage ? detail.gstPercentage : '0.00'}%</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Email</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.email ? detail.email : '--'}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Description</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.desc ? detail.desc : '--'}</div>
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <div className='flex flex-col py-[2rem] px-5'>
                    <div className='flex flex-col w-full'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>minimum order amount</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.minOrderAmount ? detail.minOrderAmount : '--'}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>delivery fee</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.deliveryFee ? detail.deliveryFee : '--'}</div>
                    </div>

                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>development domain</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.developmentDomain ? detail.developmentDomain : '--'}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>live domain</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>{detail.liveDomain ? detail.liveDomain : '--'}</div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold not-italic'>Social Media Icons</span>
                        <div className='text-[#6A6A6A] font-open-sans text-sm font-normal not-italic mt-1'>
                            <div className="mt-2 flex flex-row items-center gap-3">
                                {detail.facebook && (
                                    <Item
                                        key={detail.facebook}
                                        value={detail.facebook}
                                        name={FACEBOOK as AssetsImages}
                                    />
                                )}
                                {detail.instagram && (
                                    <Item
                                        key={detail.instagram}
                                        value={detail.instagram}
                                        name={INSTAGRAM as AssetsImages}
                                    />
                                )}
                                {detail.linkedin && (
                                    <Item
                                        key={detail.linkedin}
                                        value={detail.linkedin}
                                        name={LINKEDIN as AssetsImages}
                                    />
                                )}
                                {detail.twitter && (
                                    <Item
                                        key={detail.twitter}
                                        value={detail.twitter}
                                        name={TWITTER as AssetsImages}
                                    />
                                )}
                                {detail.youtube && (
                                    <Item
                                        key={detail.youtube}
                                        value={detail.youtube}
                                        name={YOUTUBE as AssetsImages}
                                    />
                                )}
                                {detail.whatsapp && (
                                    <Item
                                        key={detail.whatsapp}
                                        value={detail.whatsapp}
                                        name={WHATSAPP as AssetsImages}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminSettingTabPage;