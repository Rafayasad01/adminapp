import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import TopBar from '../../components/common/TopBar';
import Service from '../../services/adminapp/adminCustomer';
import MapAddress from '../../components/common/MapAddress';
import Avatar from '@mui/material/Avatar';
import assets from '../../assets';

function CustomersDetailPage() {
  const params = useParams();
  const [address, setAddress] = useState<string>("");
  const [detail, setDetail] = useState<any>(null);
  const id: any = params.customerId;
  useEffect(() => {
    Service.getDetailService(id).then((item: any) => {
      if (item.data.success) {
        if (item.data.data.appUserAddress && item.data.data.appUserAddress.length > 0) {
          const activeAddress = item.data.data.appUserAddress.filter((newItem: any) => newItem.isActive === true);
          if (activeAddress.length > 0) {
            setAddress(activeAddress[0].address);
          }
        }
        setDetail(item.data.data);
      }
    });
  }, []);

  return (
    <>
      <TopBar isNestedRoute title="Customer Detail" />
      <div className="container mt-5">
        {detail && (
          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4 rounded-lg bg-white px-4 py-5 shadow-lg">
              <div className="flex w-full items-center">
                {detail.avatar ? (
                  <img
                    src={detail.avatar}
                    alt=""
                    className="mr-4 w-[100px] rounded-full"
                  />
                ) : (
                  <Avatar
                    className="avatar flex flex-row items-center"
                    sx={{
                      bgcolor: '#1D1D1D',
                      width: 100,
                      height: 100,
                      textTransform: 'uppercase',
                      fontSize: '25px',
                      marginRight: '10px',
                    }}
                  >
                    {detail.firstName.charAt(0)}
                    {detail.lastName.charAt(0)}
                  </Avatar>
                )}
                <div className="flex flex-col justify-start justify-items-center">
                  <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                    {`${detail.firstName} ${detail.lastName}`}
                  </span>
                  <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                    {detail.phone}
                  </span>
                  <span
                    className={`font-sm mt-2 font-open-sans text-sm ${detail.isActive ? 'text-[#29CC97]' : 'text-[#f50057]'
                      }`}
                  >
                    {detail.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.email}
                  </span>
                </div>

                {detail.postalCode && (
                  <div className="flex w-full flex-col">
                    <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                      Postal code
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.postalCode}
                    </span>
                  </div>
                )}
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Availibility
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.status}
                  </span>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Total Orders
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.totalOrders}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Amount Spent
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    ${`${detail.amountSpent ? detail.amountSpent : 0} `}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-8 min-h-[400px] rounded-lg bg-white shadow-lg">
              {address ? (
                <MapAddress address={address} zoom={15} />
              ) : (
                <div className="no-map-location">
                  <div className="content">
                    <div className="icon">
                      <img className='w-100' src={assets.images.noMapLocation} alt="" />
                    </div>
                    <h4 className='text'>Location not available</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomersDetailPage;
