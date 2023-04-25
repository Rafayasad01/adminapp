import Divider from '@mui/material/Divider';
import Map from '../../components/common/Map';
import TopBar from '../../components/common/TopBar';
import assets from '../../assets';

function CustomersDetailPage() {
  return (
    <>
      <TopBar isNestedRoute title="Customer Detail" />
      <div className="container mt-5">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-4 min-h-[640px] rounded-lg bg-white px-4 py-5 shadow-lg">
            <div className="flex w-full items-center">
              <img
                src={assets.tempImages.avatarCustomer}
                alt=""
                className="mr-4 h-[100px] w-[100px] rounded-full"
              />
              <div className="flex flex-col justify-start justify-items-center">
                <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                  John S. Phillips
                </span>
                <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                  481872
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
                  JohnSPhillips@dayrep.com
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Phone
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  +1 218 319 7750
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Postal code
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  00501
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
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
                  28
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Amount Spent
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  $7540.61
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-8 min-h-[640px] rounded-lg bg-white shadow-lg">
            <Map center={{ lat: 38.8936708, lng: -77.1546612 }} zoom={17} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersDetailPage;
