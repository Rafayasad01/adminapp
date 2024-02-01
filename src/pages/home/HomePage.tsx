/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import DeliveredModal from './DeliveredModal';
import DeliveryModal from './DeliveryModal';
import OverdueModal from './OverdueModal';
import PickupModal from './PickupModal';
import TodayOrderModal from './TodayOrderModal';
import TopCustomerModal from './TopCustomerModal';
import TopDriverModal from './TopDriverModal';

import assets from '../../assets';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminDashboard';

function HomePage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const [count, setCount] = useState<any>();
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [openPickupDialog, setOpenPickupDialog] = useState(false);
  const [openDeliveryDialog, setOpenDeliveryDialog] = useState(false);
  const [openOverDueDialog, setOpenOverDueDialog] = useState(false);
  const [openDeliveredDialog, setOpenDeliveredDialog] = useState(false);
  const [openTodayOrderDialog, setOpenTodayOrderDialog] = useState(false);
  const [openTopCustomerDialog, setOpenTopCustomerDialog] = useState(false);
  const [openTopDriverDialog, setOpenTopDriverDialog] = useState(false);
  const data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [emptyVariable] = useState(null);

  useEffect(() => {
    Service.getDashboardCount(authState.user.tenant)
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setCount(res.data.data.data);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <PickupModal
        open={openPickupDialog}
        setOpen={setOpenPickupDialog}
        data={data}
      />
      <DeliveryModal
        open={openDeliveryDialog}
        setOpen={setOpenDeliveryDialog}
        data={data}
      />
      <OverdueModal
        open={openOverDueDialog}
        setOpen={setOpenOverDueDialog}
        data={data}
      />
      <DeliveredModal
        open={openDeliveredDialog}
        setOpen={setOpenDeliveredDialog}
        data={data}
      />
      <TodayOrderModal
        open={openTodayOrderDialog}
        setOpen={setOpenTodayOrderDialog}
        data={data}
      />
      <TopCustomerModal
        open={openTopCustomerDialog}
        setOpen={setOpenTopCustomerDialog}
        data={data}
      />
      <TopDriverModal
        open={openTopDriverDialog}
        setOpen={setOpenTopDriverDialog}
        data={data}
      />
      <TopBar title="Dashboard" />
      {/* <div className="coming-soon">
        <div className="content">
          <div className="icon">
            <img className="w-100" src={assets.images.comingSoonIcon} alt="" />
          </div>
          <h4 className="text">Coming Soon</h4>
        </div>
      </div> */}
      {/* {console.log("COUNT", count)} */}
      <div className="container m-auto mt-3">
        <div className="mt-2 grid flex-1 grid-cols-4 gap-3">
          <div className="flex h-24 flex-row justify-between rounded-lg bg-white shadow-lg">
            <div className="... flex w-44 flex-col justify-evenly pl-3">
              <h2 className="heading-color font-open-sans text-2xl font-semibold">
                {count ? count.pickupToday : '0'}
              </h2>
              <span className="text-color font-open-sans text-xs">
                Pickup Today
              </span>
            </div>
            <div className="flex w-20 flex-col items-center justify-around">
              <IconButton
                className="p-0"
                onClick={() => setOpenPickupDialog(true)}
              >
                <img
                  className="h-12 w-12"
                  src={assets.images.iconPickup}
                  alt=""
                />
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row justify-between rounded-lg bg-white shadow-lg">
            <div className="flex w-44 flex-col justify-evenly pl-3">
              <h2 className="heading-color font-open-sans text-2xl font-semibold">
                {count ? count.deliveryToday : '0'}
              </h2>
              <span className="text-color font-open-sans text-xs">
                Delivery Today
              </span>
            </div>
            <div className="flex w-20 flex-col items-center justify-around">
              <IconButton
                className="p-0"
                onClick={() => setOpenDeliveryDialog(true)}
              >
                <img
                  className="h-12 w-12"
                  src={assets.images.iconDeliveryToday}
                  alt=""
                />
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row justify-between rounded-lg bg-white shadow-lg">
            <div className="... flex w-44 flex-col justify-evenly pl-3">
              <h2 className="heading-color font-open-sans text-2xl font-semibold">
                {count ? count.overdue : '0'}
              </h2>
              <span className="text-color font-open-sans text-xs">Overdue</span>
            </div>
            <div className="... flex w-20 flex-col items-center justify-around">
              <IconButton
                className="p-0"
                onClick={() => setOpenOverDueDialog(true)}
              >
                <img
                  className="h-12 w-12"
                  src={assets.images.iconOverDue}
                  alt=""
                />
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row justify-between rounded-lg bg-white shadow-lg">
            <div className="... flex w-44 flex-col justify-evenly pl-3">
              <h2 className="heading-color font-open-sans text-2xl font-semibold">
                {count ? count.deliveredToday : '0'}
              </h2>
              <span className="text-color font-open-sans text-xs">
                Delivered Today
              </span>
            </div>
            <div className="... flex w-20 flex-col items-center justify-around">
              <IconButton
                className="p-0"
                onClick={() => setOpenDeliveredDialog(true)}
              >
                <img
                  className="h-12 w-12"
                  src={assets.images.iconDeliveredToday}
                  alt=""
                />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center xl:h-[350px] 2xl:h-[800px]">
          <div className="content">
            <div className="icon">
              <img
                className="w-100"
                src={assets.images.comingSoonIcon}
                alt=""
              />
            </div>
            <h4 className="text">Coming Soon</h4>
          </div>
        </div>
        {/* <div className="mt-3 grid grid-cols-2 gap-3 ">
          <div className="flex flex-col rounded-lg bg-white py-5 shadow-lg">
            <div className="flex justify-between px-3">
              <span className="heading-color flex font-open-sans text-sm font-semibold">
                Total Sales
              </span>
              <IconButton className="p-0">
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className="mt-6 flex px-3">
              <TotalSaleChart />
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white py-5 shadow-lg">
            <div className="flex px-4">
              <span className="heading-color flex font-open-sans text-sm font-semibold">
                <IconButton
                  className="p-0"
                  onClick={() => setOpenTodayOrderDialog(true)}
                >
                  Today’s Orders
                </IconButton>
              </span>
            </div>
            <div className="flex">
              <table className="mt-3 w-full table-auto">
                <thead>
                  <tr className="even:text-left">
                    <th className="text-left">Order Number</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Date Created</th>
                    <th className="text-left">Total</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-light-gray">
                    <td className="text-sm font-semibold">123456789</td>
                    <td className="text-sm font-semibold">Andy</td>
                    <td>22:16 , 09-01-2020</td>
                    <td className="text-sm font-semibold">$50.00</td>
                    <td>
                      <span className="badge badge-primary">Order Placed</span>
                    </td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td className="text-sm font-semibold">123456789</td>
                    <td className="text-sm font-semibold">Andy</td>
                    <td>22:16 , 09-01-2020</td>
                    <td className="text-sm font-semibold">$50.00</td>
                    <td>
                      <span className="badge badge-success">Order Pickup</span>
                    </td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td className="text-sm font-semibold">123456789</td>
                    <td className="text-sm font-semibold">Andy</td>
                    <td>22:16 , 09-01-2020</td>
                    <td className="text-sm font-semibold">$50.00</td>
                    <td>
                      <span className="badge badge-purple">
                        Out for Delivery
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <div className="w-4/12 rounded-lg bg-white py-4 shadow-lg">
            <div className="flex px-4 ">
              <span className="heading-color flex font-open-sans text-sm font-semibold">
                <IconButton
                  className="p-0"
                  onClick={() => setOpenTopCustomerDialog(true)}
                >
                  Top Customers
                </IconButton>
              </span>
            </div>
            <div className="flex">
              <table className="avatar-table mt-3 w-full table-auto">
                <thead>
                  <tr className="even:text-left">
                    <th className="text-left">Customers</th>
                    <th className="text-left">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser2} alt="" /> Megan
                        Chang
                      </span>
                    </td>
                    <td>Andy</td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser2} alt="" /> Megan
                        Chang
                      </span>
                    </td>
                    <td>$200.00</td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser2} alt="" /> Megan
                        Chang
                      </span>
                    </td>
                    <td>$200.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-3/5 rounded-lg bg-white py-4 shadow-lg">
            <div className="flex px-4">
              <span className="heading-color flex font-open-sans text-sm font-semibold">
                <IconButton
                  className="p-0"
                  onClick={() => setOpenTopDriverDialog(true)}
                >
                  Top Drivers
                </IconButton>
              </span>
            </div>
            <div className="flex">
              <table className="avatar-table mt-3 w-full table-auto">
                <thead>
                  <tr className="even:text-left">
                    <th>Drivers</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Deliveries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser} alt="" /> John
                        Martin
                      </span>
                    </td>
                    <td>Feb 02, 2005</td>
                    <td>
                      <span className="badge badge-success">ACTIVE</span>
                    </td>
                    <td>120</td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser} alt="" /> John
                        Martin
                      </span>
                    </td>
                    <td>Feb 02, 2005</td>
                    <td>
                      <span className="badge badge-success">ACTIVE</span>
                    </td>
                    <td>120</td>
                  </tr>
                  <tr className="odd:bg-light-gray">
                    <td>
                      <span className="avatar">
                        <img src={assets.images.avatarUser} alt="" /> John
                        Martin
                      </span>
                    </td>
                    <td>Feb 02, 2005</td>
                    <td>
                      <span className="badge badge-danger">INACTIVE</span>
                    </td>
                    <td>120</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col rounded-lg bg-white py-5 shadow-lg">
              <div className="flex px-4">
                <span className="heading-color flex font-open-sans text-sm font-semibold">
                  Most Ordered Items
                </span>
              </div>
              <div className="mt-4 flex px-4">
                <OrderItemsChart />
              </div>
              <div className="flex flex-row items-center justify-center gap-10 px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <span className="custom-circle color-primary">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Pants
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <span className="custom-circle color-success">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Neck Scarf
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <span className="custom-circle color-purple">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Jacket
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default HomePage;
