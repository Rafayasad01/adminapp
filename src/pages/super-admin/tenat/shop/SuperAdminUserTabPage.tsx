import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import dayjs from 'dayjs';
import Loader2 from '../../../../components/common/Loader2';
import Service from '../../../../services/superadmin/Tenant';

type Props = {
  tenant: string;
};

function SuperAdminUserTabPage({ tenant }: Props) {
  const [isLoader, setIsLoader] = useState(true);
  const [detail, setDetail] = useState<any>(null);
  const [list, setList] = useState<any>([]);
  const [emptyVariable] = useState(null);

  useEffect(() => {
    Service.detailShopUser(tenant).then((item: any) => {
      console.log('item.data.data::::::', item.data.data);
      if (item.data.success) {
        setList(item.data.data);
        setIsLoader(false);
      }
    });
  }, [emptyVariable]);

  const sentEmailHandler = (id: string) => {
    setIsLoader(true);
    Service.sentToEmailShop(id).then((item: any) => {
      if (item.data.success) {
        // setDetail({ ...detail, sendToEmail: true });
        setIsLoader(false);
      }
    });
  };

  return isLoader ? (
    <Loader2 />
  ) : (
    list && (
      <div className="grid w-full grid-cols-12 gap-3 bg-transparent">
        {list.map((item: any, index: number) => {
          return (
            <div
              className="col-span-4 my-2 mx-2 rounded-lg border bg-white shadow-lg"
              key={index}
            >
              <div className="flex flex-col py-[2rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Avatar
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <Avatar
                      className="avatar flex flex-row items-center"
                      alt="Remy Sharp"
                      src={item.avatar}
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
                    {`${item.firstName} ${item.lastName}`}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Status
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {item.isActive ? (
                      <span className="badge badge-success">ACTIVE</span>
                    ) : (
                      <span className="badge badge-danger">INACTIVE</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {item.email}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-row gap-3">
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Created Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(item.createdDate).isValid()
                        ? dayjs(item.createdDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                      Updated Date
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      {dayjs(item.updatedDate).isValid()
                        ? dayjs(item.updatedDate)?.format(
                            'ddd MMM DD YYYY HH:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-[#1A1A1A]">
                    Sent Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {item.sendToEmail ? (
                      <span className="badge badge-success">sent</span>
                    ) : (
                      <span className="badge badge-danger">NOt Sent</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default SuperAdminUserTabPage;
