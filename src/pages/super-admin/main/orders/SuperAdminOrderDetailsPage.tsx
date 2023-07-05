import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import SuperAdminOrderDetailsPagePopup from './SuperAdminOrderDetailsPagePopup';
import TopBar from '../../../../components/common/TopBar';
import orderService from '../../../../services/superadmin/SuperAdminOrders';

import { ORDER_STATUSES } from '../../../../utils/constants';


function SuperAdminOrderDetailsPage() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [viewData, setViewData] = useState<any>({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState<any>([]);
  const params = useParams();
  const id: any = params.orderId;
  useEffect(() => {
    orderService.viewService(id).then((item) => {
      if (item) {
        setViewData(item.data.data);
        let quantity: number = 0;
        item.data.data.orderItems.forEach((item: any) => {
          quantity += item.quantity;
        });
        setTotalQuantity(quantity);
      }
    })
    setOrderStatuses([...ORDER_STATUSES].map(([key, value]) => ({ key, value })));
  }, []);

  const getIcon = (string: string) => {
    let icon;
    switch (string) {
      case 'AssignmentTurnedInOutlinedIcon':
        icon = <AssignmentTurnedInOutlinedIcon className="text-xl" />;
        break;
      case 'FilterNoneOutlinedIcon':
        icon = <FilterNoneOutlinedIcon className="text-xl" />;
        break;
      case 'LocationOnOutlinedIcon':
        icon = <LocationOnOutlinedIcon className="text-xl" />;
        break;
      case 'DomainVerificationOutlinedIcon':
        icon = <DomainVerificationOutlinedIcon className="text-xl" />;
        break;
      case 'AccessTimeIcon':
        icon = <AccessTimeIcon className="text-xl" />;
        break;
      case 'DomainVerificationOutlinedIcon':
        icon = <DomainVerificationOutlinedIcon className="text-xl" />;
        break;
      default:
        icon = null;
    }
    return icon;
  }

  return (
    <>
      <SuperAdminOrderDetailsPagePopup open={dialogOpen} setOpen={setDialogOpen} />
      <TopBar isNestedRoute title="View Order" />
      <div className="container py-3">
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="mb-auto min-h-[600px] rounded-lg bg-[#fff] shadow-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div className="relative mr-2 inline-flex text-green-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="4rem"
                    variant="determinate"
                    value={totalQuantity}
                    color="inherit"
                  />
                  <CircularProgress
                    thickness={1.5}
                    className="absolute z-0 text-neutral-200"
                    size="4rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <LocationOnOutlinedIcon className="text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-open-sans text-xs font-normal text-neutral-900">
                      Order Id:&nbsp;
                    </span>
                    <span className="font-open-sans text-sm font-semibold text-neutral-900">
                      {viewData.orderNumber}
                    </span>
                  </div>
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {dayjs(viewData.updatedDate)?.format('hh:mm')}, {dayjs(viewData.updatedDate)?.format('DD-MM-YYYY')}
                  </div>
                  <div className="font-open-sans text-sm font-semibold text-green-500">
                    Out For Delivery
                  </div>
                </div>
                <div className="flex-grow" />
                <Button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="rounded-xl bg-neutral-900 py-2 px-12 font-open-sans text-sm font-semibold text-gray-50"
                  color="inherit"
                >
                  Cancel Order
                </Button>
              </div>
              <hr className="my-4 h-[1px] w-full bg-neutral-200" />
              <div className="grid grid-cols-2">
                <div className="flex flex-col">
                  <div className="font-open-sans text-sm font-semibold text-neutral-900">
                    Pick Up Time
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.pickupDateTime)?.format('ddd, MMM MM, YYYY')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.pickupDateTime)?.format('HH:mm')} -
                      {dayjs(viewData.pickupDateTime)?.add(1, 'hours').format('HH:mm')}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-open-sans text-sm font-semibold text-neutral-900">
                    Drop Off Time
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.dropDateTime)?.format('ddd, MMM MM, YYYY')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.dropDateTime)?.format('HH:mm')} -
                      {dayjs(viewData.dropDateTime)?.add(1, 'hours').format('HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              <div className="flex items-center">
                <LocationOnOutlinedIcon className="mr-2 text-xl text-neutral-900" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {viewData.userAddress && viewData.userAddress.address ? viewData.userAddress.address : "No Address"}
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              {viewData.orderItems && viewData.orderItems.map((item: any, index: number) => {
                return (
                  <div key={item.id}>
                    {index > 0 && <hr className="my-2 h-[1px] w-full bg-neutral-200" />}
                    <div className="flex items-center" >
                      <img
                        className="mr-2 aspect-square w-11 rounded-full"
                        src={item.icon}
                        alt=""
                      />
                      <div className="flex-grow font-open-sans text-xs font-semibold text-neutral-900">
                        {item.name}
                      </div>
                      <div className="mx-4 text-right font-open-sans text-xs font-normal text-neutral-500">
                        {item.quantity} Items
                      </div>
                      <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                        {item.unitPrice}
                      </div>
                    </div>
                  </div>
                )
              })}

              <hr className="my-2 h-[1px] w-full bg-neutral-200" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Total Amount
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    ${viewData.totalAmount}
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Discount
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    $18.00
                  </div>
                </div> */}
                <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    HST {viewData.gstPercentage}%
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    ${viewData.gstAmount}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-b-lg bg-neutral-300 py-2 px-4">
              <div className="font-open-sans text-sm font-semibold text-neutral-900">
                Grand Total
              </div>
              <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                ${viewData.grandTotal}
              </div>
            </div>
          </div>
          <div className="mb-auto min-h-[600px] rounded-lg bg-[#fff] shadow-lg">
            <div className="rounded-t-xl bg-neutral-300 py-2 px-4">
              <div className="flex items-center">
                <div className="mr-2 flex aspect-square w-9 items-center justify-center rounded-full bg-neutral-400 text-gray-50">
                  <LocalShippingOutlinedIcon className="text-xl" />
                </div>
                <div className="font-open-sans text-base font-semibold text-neutral-900">
                  Your order is {viewData.status}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-4">
              {viewData.appOrderStatuses && orderStatuses.map((item: any, index: number) => {
                let isExist = false;
                let color = 'text-neutral-500';
                const Icon: any = item.value.iconText;

                if (typeof viewData.appOrderStatuses[index] !== 'undefined') {
                  isExist = true;
                }

                return (
                  <div key={item.key} className={`flex items-center ${isExist && viewData.appOrderStatuses[index].status === item.key ? "" : "opacity-25"}`}>
                    {isExist && viewData.appOrderStatuses[index].status === item.key ? (
                      <CheckCircleOutlineOutlinedIcon />
                    ) : (
                      <CircleOutlinedIcon className="text-neutral-500" />
                    )}

                    <div className={`relative mx-2 inline-flex ${isExist ? item.value.color : color}`}>
                      <CircularProgress
                        thickness={1.5}
                        className="z-10"
                        size="3rem"
                        variant="determinate"
                        value={100}
                        color="inherit"
                      />
                      <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                        {getIcon(item.value.iconText)}
                      </div>
                    </div>
                    <div>
                      <div className={`font-open-sans text-base font-semibold ${isExist ? item.value.color : color}`}>
                        {item.value.title}
                      </div>
                      <div className="font-open-sans text-sm font-normal text-neutral-500">
                        {item.value.text}
                      </div>
                    </div>
                    <div className="flex-grow" />
                    <div className="font-open-sans text-sm font-normal text-neutral-500">
                      {dayjs(item.createdDate).format('HH:mm, MMM DD, YY')}
                    </div>
                  </div>
                )
              })}



              {/* <div className="flex items-center">
                <CheckCircleOutlineOutlinedIcon />
                <div className="relative mx-2 inline-flex text-purple-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="3rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <FilterNoneOutlinedIcon className="text-xl" />
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-base font-semibold text-purple-500">
                    Order Picked Up
                  </div>
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Your order has been collected
                  </div>
                </div>
                <div className="flex-grow" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircleOutlineOutlinedIcon />
                <div className="relative mx-2 inline-flex text-green-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="3rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <LocationOnOutlinedIcon className="text-xl" />
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-base font-semibold text-green-500">
                    Order In Progress
                  </div>
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Your order is in progress
                  </div>
                </div>
                <div className="flex-grow" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </div>
              </div>
              <div className="flex items-center opacity-25">
                <CircleOutlinedIcon className="text-neutral-500" />
                <div className="relative mx-2 inline-flex text-neutral-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="3rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <DomainVerificationOutlinedIcon className="text-xl" />
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-base font-semibold text-neutral-500">
                    Order Drop Off
                  </div>
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Your order has been dropped
                  </div>
                </div>
                <div className="flex-grow" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </div>
              </div>
              <div className="flex items-center opacity-25">
                <CircleOutlinedIcon className="text-neutral-500" />
                <div className="relative mx-2 inline-flex text-neutral-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="3rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <AccessTimeIcon className="text-xl" />
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-base font-semibold text-neutral-500">
                    Order Delivered
                  </div>
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Your order has been delivered
                  </div>
                </div>
                <div className="flex-grow" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </div>
              </div>
              <div className="flex items-center opacity-25">
                <CircleOutlinedIcon className="text-neutral-500" />
                <div className="relative mx-2 inline-flex text-neutral-500">
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="3rem"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    <DomainVerificationOutlinedIcon className="text-xl" />
                  </div>
                </div>
                <div>
                  <div className="font-open-sans text-base font-semibold text-neutral-500">
                    Order Cancelled
                  </div>
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Your order has been cancelled
                  </div>
                </div>
                <div className="flex-grow" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </div>
              </div> */}


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminOrderDetailsPage;
