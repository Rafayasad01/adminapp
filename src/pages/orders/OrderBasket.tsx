import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
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
import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import PromoCodeIcon from '../../components/icons/PromoCode';
import { Order } from '../../interfaces/order.interface';
import {
  setCart,
  setNotifyState,
  showNotifyMessage,
} from '../../redux/features/CartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import appUserService from '../../services/adminapp/adminAppUser';
import ordersService from '../../services/adminapp/adminOrders';
import voucherService from '../../services/adminapp/adminVouchers';
import { CURRENCY_PREFIX } from '../../utils/constants';

const OrderBasket = () => {
  const {
    items: cartItems,
    notify,
    notifyMessage,
  } = useAppSelector((x) => x.cartState);
  const navigate = useNavigate();
  const [paymentMethod] = useState('CASH_ON_DELIVERY');
  const [isExistingUser, setIsExistingUser] = useState<any>('Anonymous User');
  const [isLoginLoader, setIsLoginLoader] = useState(false);
  const [loginDetails, setLoginDetails] = useState<any>(null);
  const [promoCode, setPromoCode] = useState<any>();
  const [promoList, setPromoList] = useState<any>(null);
  const [userIdentifier, setUserIdentifier] = useState<any>('');
  const [isLoader, setIsLoader] = useState(false);
  const authState: any = useAppSelector((state: any) => state?.authState);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Order>();

  const dropOffDate: any = useAppSelector(
    (state: any) =>
      state?.persisitReducer?.appState?.UserItems?.tenantConfig
        ?.minimumDeliveryTime
  );
  const currentDate = dayjs();
  const DeliveryDate = currentDate.add(dropOffDate, 'day');
  const dispatch = useAppDispatch();
  const totalAmount = cartItems.reduce(
    (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
    0
  );
  const gstAmount =
    totalAmount * (authState.user.tenantConfig.gstPercentage / 100);

  const discountedValue: any =
    cartItems?.length <= 0
      ? '0.00'
      : promoList?.filter((val: any) => val.voucherCode === promoCode)[0];

  const discountedPercentageValue: string | undefined = (
    (discountedValue?.value ?? 0 / 100) * totalAmount
  )?.toFixed(2);

  const discountedValueByType: any =
    discountedValue?.discountType === 'Amount'
      ? Number(discountedValue?.value)
      : discountedPercentageValue;

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
    setIsExistingUser(event.target.value);
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

  const handleLogin = () => {
    setIsLoginLoader(true);
    const anonIdentidier = authState?.user?.username?.split('@')[0];
    const payload = {
      tenant: authState?.user?.tenant,
      identifier:
        isExistingUser !== 'Exist User'
          ? `${anonIdentidier}@shop.com`
          : userIdentifier || 'false',
    };
    let service;
    if (isExistingUser === 'Exist User') {
      service = appUserService.appLogin;
    } else {
      service = appUserService.appAnonymousLogin;
    }
    service(payload)
      .then((res) => {
        if (res.data.success) {
          setIsLoginLoader(false);
          setLoginDetails(res.data.data);
          showNotification({
            text: res.data.message,
            type: 'success',
          });
          if (isExistingUser === 'Exist User') {
            voucherService
              .orderVoucherPromotionList(
                authState.user.tenant,
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

  const onSubmit = () => {
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
                          navigate(-1);
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
          text: 'Select atleast one category item',
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
                                <img className="pic" src={item.icon} alt="" />
                                <p className="name"> {item.name}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            {CURRENCY_PREFIX} {item.price}
                          </td>
                          <td>{item.quantity}</td>
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
          <div className="col-span-5">
            <div className="cart-checkout-card">
              <div className="w-full px-4">
                <FormControl className="w-full">
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
                        inputTitle="Delivery Dropoff Date"
                        setValue={setValue}
                        value={
                          watch('deliveryDropOffDate')
                            ? watch('deliveryDropOffDate')
                            : DeliveryDate
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
                            DeliveryDate === null
                              ? 'New'
                              : 'Urgent'
                          } delivery time is ${watch(
                            'deliveryDropOffDate'
                          )?.format('MMMM DD, YYYY')}.`}
                        </span>
                      </div>
                    )}
                </FormControl>
              </div>
              <div className="w-full px-4">
                <Divider flexItem className="mt-5" />
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
                    onClick={() => {}}
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
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={isExistingUser || ''}
                        onClick={handleUserChange}
                      >
                        <FormControlLabel
                          sx={{
                            color: '#6A6A6A',
                            fontFamily: 'Open Sans',
                            fonWeight: 400,
                            fonSize: '14px',
                          }}
                          value="Anonymous User"
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
                          value="Exist User"
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
                  <div>
                    <CustomButton
                      disabled={isLoginLoader || cartItems?.length <= 0}
                      onclick={handleLogin}
                      buttonType="button"
                      title="Login"
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
                </div>

                {/* {console.log("isExx", isExistingUser)} */}
                {isExistingUser === 'Exist User' && (
                  <div className="w-full rounded-xl border border-solid border-foreground py-1 pl-3">
                    <Input
                      className="input-with-icon after:border-b-secondary"
                      id="search"
                      type="text"
                      placeholder="Identifier (Ex : email or phone)"
                      onChange={(event) =>
                        setUserIdentifier(event.target.value)
                      }
                      disableUnderline
                    />
                  </div>
                )}
                <Divider flexItem className="my-5" />
                {promoList?.length > 0 && (
                  <>
                    <div className="flex items-center justify-between py-2">
                      <div className="font-open-sans font-bold text-neutral-900">
                        Add Promo Code
                      </div>
                      <div className="font-open-sans text-base font-bold text-neutral-900">
                        <div className="rounded-md border-[1px] border-[#A3A3A3]">
                          <FormControl
                            className="FormControl"
                            variant="standard"
                          >
                            <Input
                              onChange={(val) => setPromoCode(val.target.value)}
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
                    </div>
                    <Divider flexItem className="my-5" />
                  </>
                )}
                <div className="my-4">
                  <div className="font-open-sans text-lg font-semibold text-neutral-900">
                    Total Amount
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="font-open-sans text-xs font-normal text-neutral-900">
                      Total Amount
                    </div>
                    <div className="font-open-sans text-sm font-bold text-neutral-900">
                      ${totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="font-open-sans text-xs font-normal text-neutral-900">
                      Discount{' '}
                      {discountedValue?.discountType === 'Percentage'
                        ? `(${Number(discountedValue?.value).toFixed(0)}%)`
                        : ''}
                    </div>
                    <div className="font-open-sans text-sm font-bold text-neutral-900">
                      {promoCode
                        ? checkVoucherMinAmount
                          ? `$
                      ${
                        discountedValue?.value > 0 && promoCode
                          ? discountedValue?.discountType === 'Amount'
                            ? Number(discountedValue?.value).toFixed(2)
                            : `${discountedPercentageValue}`
                          : '0.00'
                      }`
                          : 'N/A'
                        : '$0.00'}
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
                      GST ({authState.user.tenantConfig.gstPercentage}%)
                    </div>
                    <div className="font-open-sans text-sm font-bold text-neutral-900">
                      ${gstAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
                <hr className="h-[1px] rounded-lg bg-neutral-200" />
                <div className="mb-2 flex items-center justify-between py-2">
                  <div className="font-open-sans text-lg font-semibold text-neutral-900">
                    Grand Total
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    ${grandTotal ? grandTotal.toFixed(2) : '0.00'}
                  </div>
                </div>
                <Button
                  disabled={
                    isLoader || loginDetails === null || cartItems?.length <= 0
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
                    <span>Submit</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notify
        isOpen={notify}
        setIsOpen={setNotifyDisplay}
        displayMessage={notifyMessage}
      />
    </>
  );
};

export default OrderBasket;
