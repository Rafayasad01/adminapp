import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TopBar from '../../components/common/TopBar';
import orderService from '../../services/adminapp/adminOrders';

import assets from '../../assets';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import ShopIcon from '../../components/icons/ShopIcon';
import { useAppSelector } from '../../redux/redux-hooks';
import {
  NOT_AUTHORIZED_MESSAGE,
  ORDER_STATUS_IN_CANCELLED,
  ORDER_STATUS_IN_DELIVERED,
  ORDER_STATUS_IN_DELIVERY,
  ORDER_STATUSES,
} from '../../utils/constants';
import CustomOrderPrintLayoutCash from '../../utils/CustomPrintLayout/CustomOrderPrintLayoutCash';
import CustomOrderPrintLayoutInvoice from '../../utils/CustomPrintLayout/CustomOrderPrintLayoutInvoice';
import { listingRolePermission } from '../../utils/helper';
import PermissionPopup from '../../utils/PermissionPopup';

function OrderDetailsPage() {
  const navigate = useNavigate();
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  // const [orderAssign, setOrderAssign] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<any>('');
  const [viewData, setViewData] = useState<any>({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState<any>([]);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);
  const [isPrintEnabled, setPrintEnabled] = useState<any>([false]);
  const [nextBtn, setNextBtn] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const params = useParams();
  const id: any = params.orderId;
  const [emptyVariable] = useState(null);

  const setData = (itemData: any) => {
    setViewData(itemData);
    let quantity = 0;
    itemData.appOrderStatuses.forEach((item: any, index: number) => {
      if (item.status !== ORDER_STATUS_IN_CANCELLED) {
        quantity = (index + 1) * 20;
      }
    });
    setTotalQuantity(quantity);
    let laststatus = {};
    const newStatuses = [...ORDER_STATUSES].map(([key, value]) => ({
      key,
      value,
    }));
    const newResult = newStatuses.map((statusItem, index) => {
      const result = itemData.appOrderStatuses.find((matchItem: any) =>
        matchItem.status.includes(statusItem.key)
      );
      if (result) {
        laststatus = statusItem;
        if (
          result.status === ORDER_STATUS_IN_DELIVERY ||
          result.status === ORDER_STATUS_IN_DELIVERED
        ) {
          setIsCancelled(true);
          if (result.status === ORDER_STATUS_IN_DELIVERED) {
            setCancelled(true);
          }
        }
        if (result.status === ORDER_STATUS_IN_CANCELLED) {
          setCancelled(true);
        }
        if (typeof newStatuses[index + 1] !== 'undefined') {
          setNextBtn(newStatuses[index + 1]);
        }
        return { ...statusItem, isStatus: true };
      }
      return { ...statusItem, isStatus: false };
    });
    setCurrentStatus(laststatus);
    setOrderStatuses(newResult);
    // console.log('orderStatuses', newResult);
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Order View')) {
      orderService
        .viewService(id)
        .then((item) => {
          setIsLoader(false);
          if (item) {
            setData(item.data.data);
            // console.log('ITEMSS', item.data.data);
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
    }
  }, [emptyVariable]);

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

  const createOrderStatusesService = (data: any, key: string) => {
    setIsLoader(true);
    if (key === ORDER_STATUS_IN_CANCELLED && (cancelled || isCancelled)) {
      return;
    }
    orderService
      .createStatusesService(data)
      .then((item) => {
        if (item) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          const tempData = viewData;
          tempData.appOrderStatuses.push(item.data.data);
          setViewData(tempData);
          setData(tempData);
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
  };

  const statusUpdateHandler = () => {
    if (listingRolePermission(dataRole, 'Order Statuses Create')) {
      let newIndex = 0;
      orderStatuses.forEach((item: any, index: number) => {
        if (typeof viewData.appOrderStatuses[index] !== 'undefined') {
          newIndex = index;
        }
      });
      const data = {
        app_order: id,
        status: orderStatuses[newIndex + 1].key,
      };
      // console.log('DATA', data);

      createOrderStatusesService(data, orderStatuses[newIndex].key);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const statusCancelHandler = () => {
    if (listingRolePermission(dataRole, 'Order Statuses Create')) {
      const data = {
        app_order: id,
        status: ORDER_STATUS_IN_CANCELLED,
      };
      createOrderStatusesService(data, ORDER_STATUS_IN_CANCELLED);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleDriverStatus = () => {
    if (viewData.paymentType === 'Shop') {
      return (
        <div className="flex items-center font-open-sans text-sm font-normal text-neutral-500">
          <ShopIcon color="black" />
          <p className="mx-3">Order has been delivered by shop</p>
        </div>
      );
    }
    return (
      <IconButton
        aria-label="delete"
        className="p-0"
        disableRipple
        onClick={() => navigate(`../assign/${id}`)}
        disabled={!!(isCancelled || cancelled)}
      >
        <Avatar
          alt="Truck Driver Icon"
          src={assets.images.truckDriverIcon}
          sx={{ width: 24, height: 24, marginRight: '5px' }}
        />
        <div className="font-open-sans text-sm font-normal text-neutral-500">
          Choose a driver
        </div>
      </IconButton>
    );
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      {dialogOpen && (
        <PermissionPopup
          open={dialogOpen}
          setOpen={setDialogOpen}
          dialogText={dialogText}
          callback={statusUpdateHandler}
        />
      )}
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={statusCancelHandler}
        />
      )}
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Order Details" />
      <div className="order--details container py-3">
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="mb-auto min-h-[600px] rounded-lg bg-[#fff] shadow-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div
                  className={`relative mr-2 inline-flex ${
                    currentStatus &&
                    currentStatus.key === ORDER_STATUS_IN_CANCELLED
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
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
                    {currentStatus && getIcon(currentStatus.value.iconText)}
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
                    {dayjs(viewData.updatedDate)?.format(
                      'ddd, MMM DD, YYYY | hh:mm:ssA'
                    )}
                  </div>
                  <div
                    className={`font-open-sans text-sm font-semibold  ${
                      currentStatus &&
                      currentStatus.key === ORDER_STATUS_IN_CANCELLED
                        ? 'text-red-500'
                        : 'text-green-500'
                    } `}
                  >
                    {currentStatus && `${currentStatus.value.title} `}
                  </div>
                </div>
                <div className="flex-grow" />
                <Button
                  type="button"
                  onClick={() => {
                    setDialogText('Are you sure you want to cancel this Order');
                    setCancelDialogOpen(true);
                  }}
                  className={`bg-ord-del rounded-xl py-2 px-12 font-open-sans text-sm font-semibold ${
                    cancelled || isCancelled
                      ? 'bg-neutral-400 text-neutral-900'
                      : 'bg-neutral-900 text-gray-50'
                  } `}
                  color="inherit"
                  disabled={!!(cancelled || isCancelled)}
                >
                  <span> Cancel Order</span>
                </Button>
              </div>
              <div className="flex items-center justify-end">
                {/* <div>
                  <CustomButton
                    title="Driver History"
                    buttonType="button"
                    className="btn-black-fill"
                    onclick={() => navigate('../view-driver')}
                  />
                </div> */}
                <div>
                  <div>
                    <CustomOrderPrintLayoutCash
                      isPrintEnabled={isPrintEnabled}
                      setPrintEnabled={setPrintEnabled}
                      data={viewData}
                    />
                    {/* <button><PrintOutlinedIcon /> Order Slip</button> */}
                  </div>
                  <div className="my-2 mx-1">
                    <CustomOrderPrintLayoutInvoice
                      isPrintEnabled={isPrintEnabled}
                      setPrintEnabled={setPrintEnabled}
                      data={viewData}
                    />
                    {/* <button><DescriptionOutlinedIcon /> Invoice Slip</button> */}
                  </div>
                </div>
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
                      {dayjs(viewData.pickupDateTime)?.format(
                        'ddd, MMM DD, YYYY'
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.pickupDateTime)?.format('HH:mm:ssA')} -
                      {dayjs(viewData.pickupDateTime)
                        ?.add(1, 'hours')
                        .format('HH:mm:ssA')}
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
                      {dayjs(viewData.dropDateTime)?.format(
                        'ddd, MMM DD, YYYY'
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.dropDateTime)?.format('HH:mm:ssA')} -
                      {dayjs(viewData.dropDateTime)
                        ?.add(1, 'hours')
                        .format('HH:mm:ssA')}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              <div className="flex items-center">
                <LocationOnOutlinedIcon className="mr-2 text-xl text-neutral-900" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {viewData.userAddress && viewData.userAddress.address
                    ? viewData.userAddress.address
                    : 'No Address'}
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              <div className="flex w-full flex-shrink-0 items-center gap-x-3">
                {viewData.driver ? (
                  <>
                    <IconButton
                      aria-label="delete"
                      className="p-0"
                      disableRipple
                      disabled
                    >
                      <Avatar
                        alt="Truck Driver Icon"
                        src={assets.images.truckDriverIcon}
                        sx={{ width: 24, height: 24, marginRight: '5px' }}
                      />
                    </IconButton>
                    <div className="flex-grow-1 flex w-full items-center justify-between font-open-sans text-sm font-normal text-neutral-500">
                      <div className="flex items-center gap-x-1">
                        <div className="avatar">
                          {viewData.driver.avatar ? (
                            // <img src={viewData.driver.avatar} alt="" />
                            <Avatar
                              className="avatar flex items-center"
                              sx={{
                                bgcolor: '#1D1D1D',
                                width: 25,
                                height: 25,
                                textTransform: 'uppercase',
                                fontSize: '11px',
                                marginRight: '10px',
                              }}
                              src={viewData.driver.avatar}
                              alt=""
                            />
                          ) : (
                            <Avatar
                              className="avatar flex items-center"
                              sx={{
                                bgcolor: '#1D1D1D',
                                width: 25,
                                height: 25,
                                textTransform: 'uppercase',
                                fontSize: '11px',
                                marginRight: '10px',
                              }}
                            >
                              {viewData.driver.firstName.charAt(0)}
                              {viewData.driver.lastName.charAt(0)}
                            </Avatar>
                          )}
                        </div>
                        <div>
                          <span>{`${viewData.driver.firstName} ${viewData.driver.lastName}`}</span>
                        </div>
                      </div>
                      <span>{viewData.driver.phone}</span>
                      <span>{viewData.driver.licenseNumber}</span>
                    </div>
                  </>
                ) : (
                  handleDriverStatus()
                )}
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              <div className="max-h-48 flex-none overflow-y-scroll scroll-smooth px-4">
                {viewData.orderItems &&
                  viewData.orderItems.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        {index > 0 && (
                          <hr className="my-2 h-[1px] w-full bg-neutral-200" />
                        )}
                        <div className="flex items-center">
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
                    );
                  })}
              </div>

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
            <div className="bg-ord-del flex items-center justify-between rounded-b-lg bg-neutral-300 py-2 px-4">
              <div className="font-open-sans text-sm font-semibold text-neutral-900 ">
                Grand Total
              </div>
              <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                ${viewData.grandTotal}
              </div>
            </div>
          </div>
          <div className="mb-auto min-h-[610px] rounded-lg bg-[#fff] shadow-lg">
            <div className="bg-ord-del rounded-t-xl bg-neutral-300 py-2 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-grey-icon mr-2 flex aspect-square w-9 items-center justify-center rounded-full bg-neutral-400 text-gray-50">
                    <LocalShippingOutlinedIcon className="grey-icon text-xl" />
                  </div>
                  <div className="text-grey font-open-sans text-base font-semibold text-neutral-900">
                    Your order is {viewData.status}
                  </div>
                </div>
                <div className="items-center justify-center">
                  {nextBtn && (
                    <Button
                      type="button"
                      onClick={() => {
                        setDialogText(
                          'Are you sure you want to update status this Order'
                        );
                        setDialogOpen(true);
                      }}
                      className={`btn-grey rounded py-2 px-12 font-open-sans text-sm font-semibold ${
                        cancelled ||
                        (isCancelled &&
                          nextBtn.key === ORDER_STATUS_IN_CANCELLED)
                          ? 'bg-neutral-400 text-neutral-900'
                          : 'bg-neutral-900 text-gray-50'
                      } `}
                      color="inherit"
                      disabled={
                        !!(
                          cancelled ||
                          (isCancelled &&
                            nextBtn.key === ORDER_STATUS_IN_CANCELLED)
                        )
                      }
                    >
                      <span>{nextBtn.value.title}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-4">
              {orderStatuses &&
                orderStatuses.map((item: any, index: number) => {
                  // console.log(item)
                  if (item.key === ORDER_STATUS_IN_CANCELLED && isCancelled) {
                    return null;
                  }
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        item.isStatus ? '' : 'opacity-25'
                      } `}
                    >
                      {item.isStatus ? (
                        <CheckCircleOutlineOutlinedIcon />
                      ) : (
                        <CircleOutlinedIcon className="text-neutral-500" />
                      )}

                      <div
                        className={`relative mx-2 flex ${
                          item.isStatus ? item.value.color : 'text-neutral-500'
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
                        <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                          {getIcon(item.value.iconText)}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`font-open-sans text-base font-semibold ${
                            item.isStatus
                              ? item.value.color
                              : 'text-neutral-500'
                          } `}
                        >
                          {item.value.title}
                        </div>
                        <div className="font-open-sans text-sm font-normal text-neutral-500">
                          {item.value.text}
                        </div>
                      </div>
                      <div className="flex-grow" />
                      <div className="font-open-sans text-sm font-normal text-neutral-500">
                        {dayjs(viewData?.updatedDate).format(
                          'MMM DD, YY | HH:mm:ss A'
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsPage;
