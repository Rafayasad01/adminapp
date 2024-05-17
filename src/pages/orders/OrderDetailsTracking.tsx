import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ORDER_STATUS, ORDER_STATUSES } from '../../utils/constants';

function OrderDetailsTrackingPage({
  orderData,
  buttonText,
  setDialogOpen,
  setDialogText,
}: any) {
  const showChangeStatusButton = useMemo(() => {
    if (orderData.status === ORDER_STATUS.NEW) {
      return true;
    }
    if (orderData.status === ORDER_STATUS.PROCESSING_ITEM) {
      return true;
    }
    /*  if (
      orderData.status === ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP
    ) {
      return false;
    }
    if (orderData.status === ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER) {
      return false;
    }
    if (
      orderData.status === ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP
    ) {
      return false;
    }
    if (orderData.status === ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP) {
      return false;
    } */
    if (orderData.status === ORDER_STATUS.COMPLETED) {
      return false;
    }
    return false;
  }, [orderData.status, orderData.fulfillmentMethod]);

  const getIcon = (string: string) => {
    let icon;
    if (string === 'AssignmentTurnedInOutlinedIcon') {
      icon = <AssignmentTurnedInOutlinedIcon className="text-xl" />;
    } else if (string === 'FilterNoneOutlinedIcon') {
      icon = <FilterNoneOutlinedIcon className="text-xl" />;
    } else if (string === 'LocationOnOutlinedIcon') {
      icon = <LocationOnOutlinedIcon className="text-xl" />;
    } else if (string === 'DomainVerificationOutlinedIcon') {
      icon = <DomainVerificationOutlinedIcon className="text-xl" />;
    } else if (string === 'AccessTimeIcon') {
      icon = <AccessTimeIcon className="text-xl" />;
    } else {
      icon = '';
    }
    return icon;
  };

  return (
    <div className="mb-auto min-h-[40rem] rounded-lg bg-[#fff] shadow-lg">
      <div className="bg-ord-del rounded-t-xl bg-neutral-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-grey-icon mr-2 flex aspect-square w-9 items-center justify-center rounded-full bg-neutral-400 text-gray-50">
              <LocalShippingOutlinedIcon className="grey-icon text-xl" />
            </div>
            <div className="text-grey font-open-sans text-base font-semibold text-neutral-900">
              Your order is {orderData.status}
            </div>
          </div>
          <div className="items-center justify-center">
            {showChangeStatusButton ? (
              <Button
                type="button"
                onClick={() => {
                  setDialogText(
                    'Are you sure you want to update status of this Order'
                  );
                  setDialogOpen(true);
                }}
                className={`btn-grey rounded px-12 py-2 font-open-sans text-sm font-semibold `}
                color="inherit"
              >
                <span>{buttonText}</span>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4 py-4">
        {[...ORDER_STATUSES].map(([_key, value], index: number) => {
          const appOrderStatus = orderData.appOrderStatuses.find(
            (item: any) => item.status === value.status
          );
          const isActive = Boolean(appOrderStatus);
          return (
            <div
              key={index}
              className={`flex items-center ${isActive ? '' : 'opacity-25'} `}
            >
              {isActive ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : (
                <CircleOutlinedIcon className="text-neutral-500" />
              )}

              <div
                className={`relative mx-2 flex ${
                  isActive ? value.color : 'text-neutral-500'
                } `}
              >
                <CircularProgress
                  thickness={1.5}
                  className="z-10"
                  size="3rem"
                  variant="determinate"
                  value={100}
                  color="inherit"
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                  {getIcon(value.iconText)}
                </div>
              </div>
              <div>
                <div
                  className={`font-open-sans text-base font-semibold ${
                    isActive ? value.color : 'text-neutral-500'
                  } `}
                >
                  {value.title}
                </div>
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {value.text}
                </div>
              </div>
              <div className="flex-grow" />
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                {dayjs(appOrderStatus?.createdDate).format(
                  'MMM DD, YY | HH:mm:ss A'
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetailsTrackingPage;
