import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import Loader2 from '../../../../components/common/Loader2';
import Service from '../../../../services/superadmin/Tenant';

type Props = {
  items: any;
  openFormDialog: boolean;
  setOpenFormDialog: any;
};

function SuperAdminUserDialog({
  items,
  openFormDialog,
  setOpenFormDialog,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  // const sentEmailHandler = (id: string) => {
  //   setIsLoader(true);
  //   Service.sentToEmailShop(id).then((item: any) => {
  //     if (item.data.success) {
  //       // setDetail({ ...detail, sendToEmail: true });
  //       setIsLoader(false);
  //     }
  //   });
  // };

  return (
    items[0] && (
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
            User Details
          </span>
          <div className="grid w-full grid-cols-12 gap-3 bg-transparent">
            <div className="col-span-8 my-1 mx-2">
              <div className="flex flex-col py-[1rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Avatar
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <Avatar
                      className="avatar flex flex-row items-center"
                      alt="Remy Sharp"
                      src={items[0].avatar}
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
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Name
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {`${items[0].firstName} ${items[0].lastName}`}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {items[0].email}
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-8 gap-6">
                  <div className="col-span-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Created Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(items[0].createdDate).isValid()
                        ? dayjs(items[0].createdDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Updated Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(items[0].updatedDate).isValid()
                        ? dayjs(items[0].updatedDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-8 gap-6">
                  <div className="col-span-4 mt-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Status
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {items[0].isActive ? (
                        <span className="badge badge-success">ACTIVE</span>
                      ) : (
                        <span className="badge badge-danger">INACTIVE</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 mt-4">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Sent Email
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {items[0].sendToEmail ? (
                        <span className="badge badge-success">sent</span>
                      ) : (
                        <span className="badge badge-danger">NOt Sent</span>
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

export default SuperAdminUserDialog;
