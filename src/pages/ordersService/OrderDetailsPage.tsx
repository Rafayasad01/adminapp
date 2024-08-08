import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import assets from '../../assets';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import ShopIcon from '../../components/icons/ShopIcon';
import { useAppSelector } from '../../redux/redux-hooks';
import orderService from '../../services/adminapp/adminOrders';
import CustomOrderPrintLayoutCash from '../../utils/CustomPrintLayout/CustomOrderPrintLayoutCash';
import CustomOrderPrintLayoutInvoice from '../../utils/CustomPrintLayout/CustomOrderPrintLayoutInvoice';
import PermissionPopup from '../../utils/PermissionPopup';
import cn from '../../utils/class-names';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
  ORDER_FULFILLMENT_METHOD,
  ORDER_STATUS_SERVICE,
  ORDER_STATUSES_SERVICE,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import OrderDetailsTrackingPage from './OrderDetailsTracking';
import { OrderBalance } from '../../interfaces/order.interface';

function OrderDetailsPage() {
  const navigate = useNavigate();
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const authState: any = useAppSelector((state) => state?.authState);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  // const [orderAssign, setOrderAssign] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<any>('');
  const [viewData, setViewData] = useState<any>({});
  const [isPrintEnabled, setPrintEnabled] = useState<any>([false]);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const params = useParams();
  const id: any = params.orderId;

  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<OrderBalance>();

  const currentStatus = {
    key: viewData.status,
    value: ORDER_STATUSES_SERVICE.get(viewData.status),
  };

  const showSelectDriverButton = useMemo(() => {
    console.log('viewData.status :>> ', viewData.status);
    if (viewData.status === ORDER_STATUS_SERVICE.NEW) {
      return true;
    }
    if (
      viewData.status ===
      ORDER_STATUS_SERVICE.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER
    ) {
      return true;
    }
    if (viewData.status === ORDER_STATUS_SERVICE.PROCESSING_ITEM) {
      if (viewData.fulfillmentMethod === ORDER_FULFILLMENT_METHOD.SELF) {
        return false;
      }
      return true;
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
    ) {
      return false;
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_RETURNED_ITEM_TO_CUSTOMER
    ) {
      return true;
    }
    if (
      viewData.status ===
      ORDER_STATUS_SERVICE.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP
    ) {
      return true;
    }
    if (viewData.status === ORDER_STATUS_SERVICE.DRIVER_RETURNED_ITEM_TO_SHOP) {
      return true;
    }

    return false;
  }, [viewData.status, viewData.fulfillmentMethod]);

  const setData = (itemData: any) => {
    setViewData(itemData);
  };

  useEffect(() => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.viewOrder)
    ) {
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
  }, []);

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

  const createOrderStatusesService = (data: any) => {
    console.log('🚀 ~ createOrderStatusesService ~ data:', data, viewData);
    // setStatus({
    //   paymentType: viewData.paymentType,
    //   status: data.status,
    // });
    data.app_user = authState.user.anonAppUser;
    if (
      viewData.paymentType === 'CashOnDelivery' &&
      data.status === ORDER_STATUS_SERVICE.COMPLETED
    ) {
      data.balance = watch('balance');
    }
    console.log('updated data', data);
    setIsLoader(true);
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
          const tempData = structuredClone(viewData);
          tempData.appOrderStatuses.push(item.data.data);
          tempData.status = item.data.data.status;
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

  const getNextStatusButton = useMemo(() => {
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_ASSIGNED_FOR_ITEM_PICKUP
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER
        ),
      };
    }
    if (
      viewData.status ===
      ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER
        ),
      };
    }
    if (
      viewData.status ===
      ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_SHOP,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_SHOP
        ),
      };
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_SHOP
    ) {
      return {
        key: ORDER_STATUS_SERVICE.PROCESSING_ITEM,
        value: ORDER_STATUSES_SERVICE.get(ORDER_STATUS_SERVICE.PROCESSING_ITEM),
      };
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.PROCESSING_ITEM &&
      viewData.fulfillmentMethod === ORDER_FULFILLMENT_METHOD.SELF
    ) {
      return {
        key: ORDER_STATUS_SERVICE.CUSTOMER_PICK_UP,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.CUSTOMER_PICK_UP
        ),
      };
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP
        ),
      };
    }
    if (
      viewData.status ===
      ORDER_STATUS_SERVICE.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_SHOP
        ),
      };
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_PICKED_UP_ITEM_FROM_SHOP
    ) {
      return {
        key: ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
        value: ORDER_STATUSES_SERVICE.get(
          ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
        ),
      };
    }
    if (
      viewData.status === ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
    ) {
      return {
        key: ORDER_STATUS_SERVICE.COMPLETED,
        value: ORDER_STATUSES_SERVICE.get(ORDER_STATUS_SERVICE.COMPLETED),
      };
    }
    if (viewData.status === ORDER_STATUS_SERVICE.CUSTOMER_PICK_UP) {
      return {
        key: ORDER_STATUS_SERVICE.COMPLETED,
        value: ORDER_STATUSES_SERVICE.get(ORDER_STATUS_SERVICE.COMPLETED),
      };
    }
    return null;
  }, [viewData.status, viewData.fulfillmentMethod]);

  const statusUpdateHandler = () => {
    if (viewData.status === ORDER_STATUS_SERVICE.COMPLETED) {
      return;
    }
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.editOrder)
    ) {
      const data = {
        app_order: id,
        status: getNextStatusButton?.value?.status,
      };

      createOrderStatusesService(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const statusCancelHandler = () => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storeProduct.editOrder)
    ) {
      const data = {
        app_order: id,
        status: ORDER_STATUS_SERVICE.CANCELLED,
      };
      createOrderStatusesService(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleDriverStatus = () => {
    if (
      viewData.paymentType === 'Shop' &&
      viewData.fulfillmentMethod === ORDER_FULFILLMENT_METHOD.SELF
    ) {
      return (
        <div className="flex items-center font-open-sans text-sm font-normal text-neutral-500">
          <ShopIcon color="black" />
          <p className="mx-3">Order has been delivered by shop</p>
        </div>
      );
    }
    if (!showSelectDriverButton) {
      return null;
    }
    return (
      <IconButton
        aria-label="delete"
        className="p-0"
        disableRipple
        onClick={() => navigate(`../assign/${id}`)}
        disabled={false}
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

  const isCancelledOrCompleted = useMemo(() => {
    if (
      currentStatus.value?.status ===
      ORDER_STATUS_SERVICE.DRIVER_DELIVERED_ITEM_TO_CUSTOMER
    ) {
      return true;
    }
    if (currentStatus.value?.status === ORDER_STATUS_SERVICE.COMPLETED) {
      return true;
    }
    if (currentStatus.value?.status === ORDER_STATUS_SERVICE.CANCELLED) {
      return true;
    }
    return false;
  }, [currentStatus]);

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
          register={register}
          errors={errors}
          watch={watch}
          setError={setError}
          clearErrors={clearErrors}
          status={viewData}
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
          <div className="mb-auto min-h-[40rem] rounded-lg bg-[#fff] shadow-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div
                  className={cn(
                    `relative mr-2 inline-flex`,
                    currentStatus?.value?.color
                  )}
                >
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    size="4rem"
                    variant="determinate"
                    value={currentStatus?.value?.progress ?? 0}
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
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                    {currentStatus &&
                      getIcon(currentStatus?.value?.iconText ?? '')}
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
                    className={cn(
                      `font-open-sans text-sm font-semibold`,
                      currentStatus?.value?.color
                    )}
                  >
                    {currentStatus && `${currentStatus?.value?.title} `}
                  </div>
                </div>
                <div className="flex-grow" />
                {!isCancelledOrCompleted && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        listingRolePermission(
                          dataRole,
                          ALL_PERMISSIONS.storeProduct.editOrder
                        )
                      ) {
                        setDialogText(
                          'Are you sure you want to cancel this Order'
                        );
                        setCancelDialogOpen(true);
                      } else {
                        setIsNotify(true);
                        setNotifyMessage({
                          text: NOT_AUTHORIZED_MESSAGE,
                          type: 'warning',
                        });
                      }
                    }}
                    className={`bg-ord-del rounded-xl px-12 py-2 font-open-sans text-sm font-semibold ${
                      false
                        ? 'bg-neutral-400 text-neutral-900'
                        : 'bg-neutral-900 text-gray-50'
                    } `}
                    color="inherit"
                    disabled={false}
                  >
                    <span> Cancel Order</span>
                  </Button>
                )}
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
                  <div className="mx-1 my-2">
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
                {viewData.driver && !showSelectDriverButton ? (
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
              <hr className="my-3 h-0.5 w-full bg-neutral-200" />
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
                    PKR {viewData.totalAmount}
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
                    PKR {viewData.gstAmount}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-ord-del flex items-center justify-between rounded-b-lg bg-neutral-300 px-4 py-2">
              <div className="font-open-sans text-sm font-semibold text-neutral-900 ">
                Grand Total
              </div>
              <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                PKR {viewData.grandTotal}
              </div>
            </div>
          </div>
          <OrderDetailsTrackingPage
            orderData={viewData}
            buttonText={getNextStatusButton?.value?.title}
            setDialogOpen={setDialogOpen}
            setDialogText={setDialogText}
          />
        </div>
      </div>
    </>
  );
}

export default OrderDetailsPage;
