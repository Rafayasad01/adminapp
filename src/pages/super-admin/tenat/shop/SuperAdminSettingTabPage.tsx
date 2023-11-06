import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import Loader2 from '../../../../components/common/Loader2';
import assets from '../../../../assets';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
  WHATSAPP,
  YOUTUBE,
} from '../../../../utils/constants';
import Service from '../../../../services/superadmin/Tenant';

type Props = {
  setOpenFormDialog: any;
  openFormDialog: any;
  detail: any;
};

type AssetsImages = keyof typeof assets.images;

function Item(props: { value: any; name: AssetsImages }) {
  const { value, name } = props;
  return (
    <Link href={value} underline="none" target="_blank">
      <img src={assets.images[name]} alt="" />
    </Link>
  );
}

function SuperAdminSettingTabPage({
  openFormDialog,
  setOpenFormDialog,
  detail,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    detail && (
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        scroll='paper'
        PaperProps={{
          // className: 'Dialog',
          // style: { maxWidth: '100%', maxHeight: 'auto' },
        }}
      >
        <div className="Content p-5">
          <span className="font-open-sans text-xl font-semibold not-italic text-[#1A1A1A]">
            Setting Details
          </span>
          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4">
              <div className="flex flex-col py-[2rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Logo
                  </span>
                  <div className="mt-2 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
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
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Theme Name
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.name ? detail.name : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-row gap-3">
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Theme Color
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      <span
                        style={{
                          background: `${
                            detail.color1 ? detail.color1 : '#1A1A1A'
                          }`,
                        }}
                        className="block h-[25px] w-[25px] rounded-full border border-[#D9D9D9]"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Text Color
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      <span
                        style={{
                          background: `${
                            detail.color2 ? detail.color2 : '#1A1A1A'
                          }`,
                        }}
                        className="block h-[25px] w-[25px] rounded-full border border-[#D9D9D9]"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    GST Percentage
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.gstPercentage ? detail.gstPercentage : '0.00'}%
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.email ? detail.email : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Description
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.desc ? detail.desc : '--'}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col py-[2rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Minimum Order Amount
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.minOrderAmount ? detail.minOrderAmount : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Delivery Fee
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.deliveryFee ? detail.deliveryFee : '--'}
                  </div>
                </div>

                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Development Domain
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.developmentDomain
                      ? DOMAIN_PROTOCOL +
                        detail.developmentDomain +
                        DOMAIN_PREFIX
                      : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Live Domain
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.liveDomain
                      ? DOMAIN_PROTOCOL + detail.liveDomain + DOMAIN_PREFIX
                      : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Social Media Icons
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
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
        </div>
      </Dialog>
    )
  );
}

export default SuperAdminSettingTabPage;
