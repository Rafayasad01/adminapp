import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import PromoCodeIcon from '../../components/icons/PromoCode';
import { Order } from '../../interfaces/order.interface';
import {
  quantityDecrement,
  quantityIncrement,
  setCart,
  setNotifyState,
  showNotifyMessage,
} from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import appUserService from '../../services/adminapp/adminAppUser';
import ordersService from '../../services/adminapp/adminOrders';
import voucherService from '../../services/adminapp/adminVouchers';
import {
  CURRENCY_PREFIX,
  ORDER_FULFILLMENT_METHOD,
} from '../../utils/constants';
import promiseHandler from '../../utils/helper';
import { ValuesOf } from '../../utils/ts-helpers';
import PromotionListPopup from './PromotionListPopup';
import assets from '../../assets';
import { getItem } from '../../utils/storage';

const OrderBasket = () => {
  const {
    items: cartItems,
    notify,
    notifyMessage,
  } = useAppSelector((x) => x.persistedReducer.cartState);
  const tenant = useAppSelector(
    (state) => state?.persistedReducer?.appState.UserItems.tenant
  );
  const navigate = useNavigate();
  const [paymentMethod] = useState('CASH_ON_DELIVERY');
  const [isExistingUser, setIsExistingUser] = useState<'TRUE' | 'FALSE'>(
    'FALSE'
  );
  const [isOpenPromoDialog, setIsOpenPromoDialog] = useState(false);
  const [fulfillmentMethod /* , setFulfillmentMethod */] =
    useState<ValuesOf<typeof ORDER_FULFILLMENT_METHOD>>('Self');
  const [isLoginLoader, setIsLoginLoader] = useState(false);
  const [loginDetails, setLoginDetails] = useState<any>(null);
  const [promoCode, setPromoCode] = useState<any>();
  const [promoList, setPromoList] = useState<any>(null);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [userIdentifier, setUserIdentifier] = useState<any>('');
  const [isLoader, setIsLoader] = useState(false);
  const authState = useAppSelector((state) => state?.authState);
  const tenantConfig: any = getItem('TENANT_CONFIG');

  console.log('authState', tenantConfig);

  const {
    /*  register, */
    watch,
    /*   setValue, */
    /*  formState: { errors }, */
  } = useForm<Order>();

  // const dropOffDate: any = useAppSelector(
  //   (state) =>
  //     state?.persistedReducer?.appState?.UserItems?.tenantConfig
  //       ?.minimumDeliveryTime
  // );
  const currentDate = dayjs();
  const DeliveryDate = currentDate;
  // const DeliveryDate = currentDate.add(dropOffDate ?? dayjs(), 'day');
  // console.log('🚀 ~ OrderBasket ~ dropOffDate:', dropOffDate);
  const dispatch = useAppDispatch();
  const totalAmount = cartItems.reduce(
    (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
    0
  );
  const gstAmount =
    totalAmount *
    (Number(tenantConfig?.tenantConfig?.gstPercentage ?? 0) / 100);

  const discountedValue: any =
    cartItems?.length <= 0
      ? '0.00'
      : promoList?.filter((val: any) => val.voucherCode === promoCode)[0];

  // const discountedPercentageValue: string | undefined = (
  //   (discountedValue?.value ?? 0 / 100) * totalAmount
  // )?.toFixed(2);

  // const discountedValueByType: any =
  //   discountedValue?.discountType === 'Amount'
  //     ? Number(discountedValue?.value)
  //     : discountedPercentageValue;

  const discountedValueByType: any = Number(discountedValue?.value);

  const discountedTotalAmount: any = totalAmount - discountedValueByType;

  const grandTotal = discountedTotalAmount
    ? discountedTotalAmount + gstAmount
    : totalAmount + gstAmount;

  const specificVoucher = promoList?.find(
    (el: any) => el.voucherCode === promoCode
  );

  const checkVoucherMinAmount =
    specificVoucher && Number(totalAmount) > Number(specificVoucher.minAmount);

  const handleCartItemDelete = (id: string | any) => {
    dispatch(setCart(cartItems.filter((x) => x.id !== id)));
  };

  const handleUserChange = (event: any) => {
    if (promoList?.length < 1) {
      setIsExistingUser(event.target.value);
    }
  };

  const setNotifyDisplay = (value: boolean) => {
    dispatch(setNotifyState(value));
  };

  const showNotification = (message: { text?: string; type?: string }) => {
    dispatch(
      showNotifyMessage({
        text: message?.text,
        type: message?.type,
      })
    );
  };

  const handleAnonymousSubmit = async () => {
    if (!cartItems.length) {
      setLoginDetails(null);
      setIsLoginLoader(false);
      showNotification({
        text: 'No Items In Cart',
        type: 'error',
      });
      return;
    }

    setIsLoginLoader(true);
    const anonymousDetailPromise = appUserService.appAnonymousDetail();
    const [anonymousDetailResult, anonymousDetailError, anonymousDetailOk] =
      await promiseHandler(anonymousDetailPromise);
    if (!anonymousDetailOk) {
      setLoginDetails(null);
      setIsLoginLoader(false);
      showNotification({
        text: anonymousDetailError.message,
        type: 'error',
      });

      return;
    }
    if (!anonymousDetailResult.data.success) {
      setLoginDetails(null);
      setIsLoginLoader(false);
      showNotification({
        text: anonymousDetailResult.data.message,
        type: 'error',
      });
      return;
    }
    const anonIdentifier =
      anonymousDetailResult?.data?.data?.username.split('@')[0];
    const payload = {
      identifier:
        isExistingUser === 'FALSE'
          ? `${anonIdentifier}@shop.com`
          : userIdentifier || 'false',
      tenant,
    };

    // console.log('payload::::', payload);
    // return;
    const anonymousLoginPromise = appUserService.appAnonymousLogin(payload);
    const [anonymousLoginResult, anonymousLoginError, anonymousLoginOk] =
      await promiseHandler(anonymousLoginPromise);
    if (!anonymousLoginOk) {
      setLoginDetails(null);
      setIsLoginLoader(false);
      showNotification({
        text: anonymousLoginError.message,
        type: 'error',
      });

      return;
    }
    if (!anonymousLoginResult.data.success) {
      setLoginDetails(null);
      setIsLoginLoader(false);
      showNotification({
        text: anonymousLoginResult.data.message,
        type: 'error',
      });
      return;
    }
    // setIsLoginLoader(false);
    setLoginDetails(anonymousLoginResult.data.data);
    showNotification({
      text: anonymousLoginResult.data.message,
      type: 'success',
    });
    const anonymousLoginResultData = anonymousLoginResult.data.data;
    const cartPayload = {
      tenant: anonymousLoginResultData.tenant,
      appUser: anonymousLoginResultData.id,
    };

    const orderGetCartPromise = ordersService.OrderGetCart(cartPayload);

    const [orderGetCartResult, orderGetCartError, orderGetCartOk] =
      await promiseHandler(orderGetCartPromise);

    if (!orderGetCartOk) {
      showNotification({
        text: orderGetCartError.message,
        type: 'error',
      });
      return;
    }
    if (!orderGetCartResult.data.success) {
      showNotification({
        text: orderGetCartResult.data.message,
        type: 'error',
      });
      return;
    }

    const updatedCartPayload = {
      cartId: orderGetCartResult.data.data.cart.id,
      appUser: orderGetCartResult.data.data.cart.appUser,
      tenant: orderGetCartResult.data.data.cart.tenant,
      appUserAddress: anonymousLoginResultData.appUserAddress.id,
      pickupDateTime: new Date(),
      dropDateTime: watch('deliveryDropOffDate')
        ? watch('deliveryDropOffDate').format('YYYY-MM-DD HH:mm:ss')
        : DeliveryDate.format('YYYY-MM-DD HH:mm:ss'),
      voucherCode: checkVoucherMinAmount ? promoCode : '' || '',
      products: cartItems?.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
    const orderUpdateCartPromise =
      ordersService.OrderUpdateCart(updatedCartPayload);
    const [orderUpdateCartResult, orderUpdateCartError, orderUpdateCartOk] =
      await promiseHandler(orderUpdateCartPromise);

    if (!orderUpdateCartOk) {
      showNotification({
        text: orderUpdateCartError.message,
        type: 'error',
      });
      return;
    }
    if (!orderUpdateCartResult.data.success) {
      showNotification({
        text: orderUpdateCartResult.data.message,
        type: 'error',
      });
      return;
    }

    const newOrderPlace = {
      cartId: orderGetCartResult.data.data.cart.id,
      tenant: orderGetCartResult.data.data.cart.tenant,
      appUser: orderGetCartResult.data.data.cart.appUser,
      fulfillmentMethod: ORDER_FULFILLMENT_METHOD.SELF,
    };

    const orderPlacePromise = ordersService.OrderPlace(newOrderPlace);

    const [orderPlaceResult, orderPlaceError, orderPlaceOk] =
      await promiseHandler(orderPlacePromise);

    if (!orderPlaceOk) {
      showNotification({
        text: orderPlaceError.message,
        type: 'error',
      });
      return;
    }
    if (!orderPlaceResult.data.success) {
      showNotification({
        text: orderPlaceResult.data.message,
        type: 'error',
      });
      return;
    }
    setIsLoader(false);
    showNotification({
      text: orderPlaceResult.data.message,
      type: 'success',
    });
    dispatch(setCart([]));
    setIsLoginLoader(false);
    navigate('../../orders');
  };

  const handleLogin = () => {
    setIsLoginLoader(true);
    const anonIdentifier = authState?.user?.username?.split('@')[0];
    const payload = {
      identifier:
        isExistingUser === 'FALSE'
          ? `${anonIdentifier}@shop.com`
          : userIdentifier || 'false',
      tenant,
    };
    let service;
    if (isExistingUser === 'TRUE') {
      service = appUserService.appLogin;
    } else {
      service = appUserService.appAnonymousLogin;
    }
    service(payload)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.data);
          // if(res.data.data.userType === "Shop"){
          //   setAddress(authState?.tenantConfig?.shopAddress);
          // }else{
          //   setAddress(res.data.data);
          // }
          setIsLoginLoader(false);
          setLoginDetails(res.data.data);
          showNotification({
            text: res.data.message,
            type: 'success',
          });

          if (isExistingUser === 'TRUE') {
            voucherService
              .orderVoucherPromotionList(
                authState.user?.tenant ?? '',
                res.data.data.id
              )
              .then((resp) => {
                if (resp.data.success) {
                  setPromoList(resp.data.data);
                } else {
                  showNotification({
                    text: resp.data.message,
                    type: 'error',
                  });
                  setPromoList([]);
                }
              })
              .catch((err) => {
                showNotification({
                  text: err.message,
                  type: 'error',
                });
              });
          }
        } else {
          setLoginDetails(null);
          setIsLoginLoader(false);
          showNotification({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setLoginDetails(null);
        setIsLoginLoader(false);
        showNotification({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (isExistingUser === 'FALSE') {
      setPromoList([]);
    }
  }, []);

  console.log('isExx', isExistingUser);

  const handlePaymentChange = () => {};

  const onSubmit = async () => {
    if (isExistingUser === 'FALSE') {
      await handleAnonymousSubmit();
      return;
    }
    if (loginDetails !== null) {
      if (cartItems?.length > 0 && totalAmount > 0) {
        setIsLoader(true);
        const cartPayload = {
          tenant: loginDetails?.tenant,
          appUser: loginDetails?.id,
        };
        ordersService
          .OrderGetCart(cartPayload)
          .then((item: any) => {
            if (item.data.success) {
              const updatedCartPayload = {
                cartId: item.data.data.cart.id,
                appUser: item.data.data.cart.appUser,
                tenant: item.data.data.cart.tenant,
                appUserAddress: loginDetails?.appUserAddress.id,
                pickupDateTime: new Date(),
                dropDateTime: watch('deliveryDropOffDate')
                  ? watch('deliveryDropOffDate').format('YYYY-MM-DD HH:mm:ss')
                  : DeliveryDate.format('YYYY-MM-DD HH:mm:ss'),
                voucherCode: checkVoucherMinAmount ? promoCode : '' || '',
                products: cartItems?.map((items: any) => ({
                  id: items.id,
                  quantity: items.quantity,
                })),
              };
              ordersService
                .OrderUpdateCart(updatedCartPayload)
                .then((updateCartRes) => {
                  if (updateCartRes.data.success) {
                    const newOrderPlace = {
                      cartId: item.data.data.cart.id,
                      tenant: item.data.data.cart.tenant,
                      appUser: item.data.data.cart.appUser,
                      fulfillmentMethod,
                    };
                    ordersService
                      .OrderPlace(newOrderPlace)
                      .then((orderPlaceRes) => {
                        if (orderPlaceRes.data.success) {
                          setIsLoader(false);
                          showNotification({
                            text: orderPlaceRes.data.message,
                            type: 'success',
                          });
                          dispatch(setCart([]));
                          navigate(-2);
                        } else {
                          setIsLoader(false);
                          showNotification({
                            text: orderPlaceRes.data.message,
                            type: 'error',
                          });
                        }
                        // console.log('Cart REs', cartRes);
                      });
                  }
                  // console.log('Cart REs', cartRes);
                });
            }
          })
          .catch((err: any) => {
            showNotification({
              text: err.message,
              type: 'error',
            });
            // console.log('Err', err)
          });
      } else if (cartItems?.length <= 0) {
        setIsLoader(false);
        showNotification({
          text: 'Select at least one category item',
          type: 'info',
        });
      } else if (totalAmount <= 0) {
        setIsLoader(false);
        showNotification({
          text: 'Total amount is $0.00, increase your quantity',
          type: 'info',
        });
      }
    } else {
      setIsLoader(false);
      showNotification({
        text: 'User details not found!',
        type: 'error',
      });
    }
  };

  const handlePromoCode = (code: string) => {
    // console.log('promoList:::::::', promoList);
    setPromoCode(code);
    const filteredPromoCode = promoList?.find(
      (el: any) => el.voucherCode === code
    );

    if (filteredPromoCode) {
      setMinDiscount(Number(filteredPromoCode.minAmount));
    }
  };

  return (
    <>
      <TopBar isNestedRoute title="Order" />
      <div className="cart-page p-4 sm:p-5 xl:p-7">
        <div className="mb-4 flex items-center justify-start md:mb-6">
          <h4 className="page-heading">My Basket</h4>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <div className="cart-products-card">
              <div className="overflow-x-auto">
                <table className="cart-products-table">
                  <thead className="border-b border-b-neutral-200 ">
                    <tr className="h-10">
                      <th>Products</th>
                      <th>Price</th>
                      <th>Items</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="flex items-center gap-x-5">
                              <button
                                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium btn-delete css-78trlr-MuiButtonBase-root-MuiIconButton-root"
                                tabIndex={0}
                                type="button"
                                onClick={() => handleCartItemDelete(item.id)}
                              >
                                <svg
                                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root text-2xl"
                                  focusable="false"
                                  aria-hidden="true"
                                  viewBox="0 0 24 24"
                                  data-testid="DeleteOutlineOutlinedIcon"
                                >
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                                </svg>
                                <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                              </button>
                              <div className="product">
                                {item.icon !== 'null' ? (
                                  <img className="pic" src={item.icon} alt="" />
                                ) : (
                                  <img
                                    className="pic"
                                    src={assets.images.noItems}
                                    alt="no-pic"
                                  />
                                )}
                                <p className="name"> {item.name}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            {CURRENCY_PREFIX} {item.price}
                          </td>
                          <td>
                            <IconButton
                              className="p-0 text-neutral-900"
                              onClick={() =>
                                dispatch(quantityDecrement(item.id))
                              }
                            >
                              <RemoveCircleOutlineOutlinedIcon className="text-lg" />
                            </IconButton>
                            <span className="mx-2"> {item.quantity}</span>
                            <IconButton
                              className="p-0 text-neutral-900"
                              onClick={() =>
                                dispatch(quantityIncrement(item.id))
                              }
                            >
                              <AddCircleOutlineOutlinedIcon className="text-lg" />
                            </IconButton>
                          </td>
                          <td>
                            {' '}
                            {CURRENCY_PREFIX}
                            {_.toNumber(
                              _.toNumber(item.price) * item.quantity
                            ).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="my-2.5 flex items-center justify-between px-5">
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit btn-add-more css-sbfmij-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
                  onClick={() => navigate('../create')}
                  type="button"
                >
                  <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon">
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ShoppingBagOutlinedIcon"
                    >
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
                    </svg>
                  </span>
                  Add More to Basket
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-5 rounded-lg bg-white py-5 shadow-lg">
            <div className="w-full px-4">
              {/*   <FormControl className="w-full">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="font-open-sans text-xl font-semibold text-secondary"
                >
                  Delivery Date
                </FormLabel>
                <div className="mt-3 flex items-center">
                  <div>
                    <p className="text-sm">Delivery Pickup Date</p>
                    <span className="text-sm font-semibold">
                      {dayjs().format('MMMM DD, YYYY')}
                    </span>
                  </div>
                  <div className="mx-10">
                    <CustomDateTimePicker
                      register={register}
                      defaultValue={dayjs()}
                      minDate={dayjs()}
                      id="deliveryDropOffDate"
                      error={errors.deliveryDropOffDate}
                      inputTitle="Delivery Drop off Date"
                      setValue={setValue}
                      value={
                        watch('deliveryDropOffDate')
                          ? watch('deliveryDropOffDate')
                          : DeliveryDate.toDate()
                      }
                    />
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-sm font-semibold">
                    {dropOffDate
                      ? `Standard delivery time is ${dropOffDate} days.`
                      : ''}
                  </span>
                </div>
                {watch('deliveryDropOffDate') &&
                  watch('deliveryDropOffDate').format('MM/DD/YYYY') !==
                    DeliveryDate.format('MM/DD/YYYY') && (
                    <div className="">
                      <span className="text-sm font-semibold">
                        {`${
                          watch('deliveryDropOffDate').format('MM/DD/YYYY') >
                            DeliveryDate.format('MM/DD/YYYY') ||
                          !DeliveryDate.isValid()
                            ? 'New'
                            : 'Urgent'
                        } delivery time is ${watch(
                          'deliveryDropOffDate'
                        )?.format('MMMM DD, YYYY')}.`}
                      </span>
                    </div>
                  )}
              </FormControl> */}
            </div>
            <div className="w-full px-4">
              {/* <FormControl className="w-full" variant="filled">
                <label className="mb-1 ml-1 w-full font-open-sans text-xl font-semibold">
                  Address
                </label>
                <div className="w-full rounded-xl border border-solid border-foreground py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Type Address"
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleClickSearch(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <PlaceOutlinedIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </div>
              </FormControl> */}
              {/* <Divider flexItem className="mt-5" /> */}
              <FormControl className="mt-4">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="font-open-sans text-xl font-semibold text-secondary"
                >
                  Payment
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={paymentMethod}
                  onClick={handlePaymentChange}
                >
                  <FormControlLabel
                    sx={{
                      color: '#6A6A6A',
                      fontFamily: 'Open Sans',
                      fonWeight: 400,
                      fonSize: '14px',
                    }}
                    value="CASH_ON_DELIVERY"
                    control={
                      <Radio
                        className="text-sm text-[#1D1D1D]"
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<CheckCircleOutlinedIcon />}
                      />
                    }
                    label="Cash"
                  />
                </RadioGroup>
              </FormControl>

              <Divider flexItem className="my-5" />
              <div className="flex items-center justify-between">
                <div>
                  <FormControl className="">
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="font-open-sans text-xl font-semibold text-secondary"
                    >
                      User
                    </FormLabel>
                    <RadioGroup
                      className="mb-1"
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={isExistingUser ?? ''}
                      onClick={handleUserChange}
                    >
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        disabled={promoList?.length > 0}
                        value="FALSE"
                        control={
                          <Radio
                            className="text-sm text-[#1D1D1D]"
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlinedIcon />}
                          />
                        }
                        label="Anonymous User"
                      />
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        value="TRUE"
                        control={
                          <Radio
                            className="text-[#1D1D1D]"
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlinedIcon />}
                          />
                        }
                        label="Exist User"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              {isExistingUser === 'TRUE' && (
                <div className="w-full rounded-xl border border-solid border-foreground py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Identifier (Ex : email or phone)"
                    // onKeyDown={(
                    //   event: React.KeyboardEvent<
                    //     HTMLInputElement | HTMLTextAreaElement
                    //   >
                    // ) => {
                    //   handleUserInput(event);
                    // }}
                    onChange={(event) => setUserIdentifier(event.target.value)}
                    disableUnderline
                  />
                </div>
              )}
              {isExistingUser === 'TRUE' && (
                <div className="mt-2">
                  <CustomButton
                    disabled={isLoginLoader || cartItems?.length <= 0}
                    onclick={handleLogin}
                    buttonType="button"
                    title="Verify"
                    className={`${
                      cartItems?.length <= 0
                        ? 'btn-gray-fill'
                        : 'btn-black-fill'
                    }`}
                    sx={{
                      padding: '0.375rem 2rem !important',
                      width: '100%',
                      height: '35px',
                    }}
                  />
                </div>
              )}
              {/* <Divider flexItem className="my-5" /> */}
              {/* {isExistingUser === 'TRUE' && (
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    className="font-open-sans text-xl font-semibold text-secondary"
                  >
                    Fulfillment Mode
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={fulfillmentMethod}
                    onClick={(event: any) =>
                      setFulfillmentMethod(event.target.value)
                    }
                  >
                    <FormControlLabel
                      sx={{
                        color: '#6A6A6A',
                        fontFamily: 'Open Sans',
                        fonWeight: 400,
                        fonSize: '14px',
                      }}
                      value="Self"
                      control={
                        <Radio
                          className="text-[#1D1D1D]"
                          icon={<RadioButtonUncheckedOutlinedIcon />}
                          checkedIcon={<CheckCircleOutlinedIcon />}
                        />
                      }
                      label="Customer Pickup"
                    />
                    <FormControlLabel
                      sx={{
                        color: '#6A6A6A',
                        fontFamily: 'Open Sans',
                        fonWeight: 400,
                        fonSize: '14px',
                      }}
                      value="Delivery"
                      control={
                        <Radio
                          className="text-sm text-[#1D1D1D]"
                          icon={<RadioButtonUncheckedOutlinedIcon />}
                          checkedIcon={<CheckCircleOutlinedIcon />}
                        />
                      }
                      label="Delivery"
                    />
                  </RadioGroup>
                </FormControl>
              )}

              <Divider flexItem className="my-5" /> */}

              {promoList?.length > 0 && isExistingUser === 'TRUE' && (
                <>
                  <Divider flexItem className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="font-open-sans text-xs text-neutral-900">
                      Check All Available Promo Codes
                    </div>
                    <div className="font-open-sans text-base font-bold text-neutral-900">
                      <div
                        onClick={() => setIsOpenPromoDialog(true)}
                        className="flex w-full cursor-pointer rounded-md text-xs hover:text-blue-800"
                      >
                        <span>
                          <IntegrationInstructionsOutlinedIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-2 font-open-sans text-base font-bold text-neutral-900">
                    <div className="flex w-full rounded-md border-[1px] border-[#A3A3A3] bg-slate-100">
                      <FormControl className="FormControl" variant="standard">
                        <Input
                          // {...register('name', {
                          //   required: true,
                          //   pattern: PATTERN.CHAR_NUM_DASH,
                          //   validate: (value) => value.length <= 100,
                          // })}
                          onChange={(val: any) =>
                            handlePromoCode(val.target.value)
                          }
                          className="FormInput px-1 text-sm"
                          id="PromoCode"
                          name="PromoCode"
                          placeholder="Enter Promo Code"
                          disableUnderline
                          startAdornment={
                            <InputAdornment position="start">
                              <PromoCodeIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                  </div>
                  {/* <Divider flexItem className="my-5" /> */}
                </>
              )}
              <Divider flexItem className="my-5" />
              <div className="my-4">
                <div className="font-open-sans text-lg font-semibold text-neutral-900">
                  Total Amount
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Total Amount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    {CURRENCY_PREFIX} {totalAmount.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Discount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    {promoCode ? (
                      checkVoucherMinAmount ? (
                        `${CURRENCY_PREFIX}
                      ${
                        discountedValue?.value > 0 &&
                        totalAmount > minDiscount &&
                        totalAmount > discountedValue?.value &&
                        promoCode
                          ? Number(discountedValue?.value).toFixed(2)
                          : '0.00'
                      }`
                      ) : (
                        <span className="text-xs font-normal">
                          This discount is not applicable
                        </span>
                      )
                    ) : (
                      `${CURRENCY_PREFIX} 0.00`
                    )}
                  </div>
                </div>
                {/* <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Total Discounted Amount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    ${discountedTotalAmount ? discountedTotalAmount.toFixed(2) : "0.00"}
                  </div>
                </div> */}
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    GST ({tenantConfig.tenantConfig?.gstPercentage}%)
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    {CURRENCY_PREFIX} {gstAmount.toFixed(2)}
                  </div>
                </div>
              </div>
              <hr className="h-[1px] rounded-lg bg-neutral-200" />
              <div className="mb-2 flex items-center justify-between py-2">
                <div className="font-open-sans text-lg font-semibold text-neutral-900">
                  Grand Total
                </div>
                <div className="font-open-sans text-sm font-bold text-neutral-900">
                  {CURRENCY_PREFIX}{' '}
                  {grandTotal ? grandTotal.toFixed(2) : '0.00'}
                </div>
              </div>
              <Button
                disabled={
                  isLoginLoader ||
                  grandTotal <= 0 ||
                  (isExistingUser === 'TRUE' && isLoader) ||
                  (isExistingUser === 'TRUE' && loginDetails === null) ||
                  (isExistingUser === 'TRUE' && cartItems?.length <= 0)
                }
                type="button"
                onClick={onSubmit}
                color="inherit"
                className={`w-full rounded-lg 
                ${
                  loginDetails === null || cartItems?.length <= 0
                    ? 'bg-neutral-400'
                    : 'bg-neutral-900'
                } btn-gray-fill font-open-sans text-base font-semibold text-gray-50`}
              >
                {isLoader && loginDetails !== null ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  <div className="flex items-center">
                    {isLoginLoader && (
                      <CircularProgress size="15px" color="inherit" />
                    )}
                    <span className="mx-2">Submit</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PromotionListPopup
        promoList={promoList}
        openFormDialog={isOpenPromoDialog}
        setOpenFormDialog={setIsOpenPromoDialog}
      />
      <Notify
        isOpen={notify}
        setIsOpen={setNotifyDisplay}
        displayMessage={notifyMessage}
      />
    </>
  );
};

export default OrderBasket;
