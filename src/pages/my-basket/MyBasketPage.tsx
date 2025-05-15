import React from 'react';

export default function MyBasketPage() {
  return <div>MyBasketPage</div>;
}

// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import DiscountIcon from '@mui/icons-material/Discount';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
// import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangeIcon } from '@mui/x-date-pickers/icons';
// import dayjs from 'dayjs';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AlertBox from '../../components/common/SnackBar';
// import useAlert from '../../hooks/alert.hook';
// import { setDropOff, setPickup } from '../../redux/features/DateAndTime';
// import {
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
//   resetCart,
//   setCartData,
// } from '../../redux/features/cartStateSlice';
// import { setUserAddressList } from '../../redux/features/deviceState';
// import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
// import addressService from '../../services/address.service';
// import cartService, { UpdateCartPayload } from '../../services/cart.service';
// import orderService from '../../services/order.service';
// import promiseHandler from '../../utilities/promise-handler';
// import DatePickerButton from './DatePickerButton';
// import PayFastForm from './PayFastForm';
// import PaymentOptionPopup from './PaymentOptionPopup';

// function MyBasketPage() {
//   const {
//     alertMessage,
//     setAlertMessage,
//     showAlert,
//     setShowAlert,
//     alertSeverity,
//     setAlertSeverity,
//   } = useAlert();

//   const { dropOff, pickUp } = useAppSelector((state) => state.dateState);
//   const { cartItems, cartData } = useAppSelector((state) => state.cartState);
//   const tenant = useAppSelector((state) => state.deviceStates.tenant);
//   const tenantConfig = useAppSelector(
//     (state) => state.deviceStates.tenantConfig
//   );
//   const user = useAppSelector((state) => state.authState.user);
//   const userAddress = useAppSelector((state) => state.deviceStates.addressList);
//   const dispatch = useAppDispatch();
//   const [voucherCode, setVoucherCode] = useState('');
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [payFastFormData, setPayFastFormData] = useState<any>(null);
//   const [openPaymentSelectPopup, setOpenPaymentSelectPopup] = useState(false);
//   const minimumDeliveryTime = tenant?.tenantConfig?.minimumDeliveryTime ?? 1;
//   const formSubmitButtonRef = useRef<HTMLButtonElement>(null);

//   const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
//     if (value) {
//       dispatch(setPickup(value.toISOString()));
//       dispatch(
//         setDropOff(value.add(minimumDeliveryTime, 'days').toISOString())
//       );
//     }
//   };
//   const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
//     if (value) {
//       dispatch(setDropOff(value.toISOString()));
//     }
//   };

//   const onCheckoutPayFast = async () => {
//     const tempAddress = userAddress[0] ? userAddress[0].id : null;
//     const pickupDateTime = pickUp;
//     const dropDateTime = dropOff;
//     const updateCartPayload: UpdateCartPayload = {
//       appUser: user?.id,
//       appUserAddress: tempAddress,
//       appUserDevice: cartData?.appUserDevice,
//       cartId: cartData?.id,
//       dropDateTime,
//       pickupDateTime,
//       voucherCode,
//       tenant: cartData?.tenant,
//       products: cartItems.map((item: any) => {
//         return { id: item.id, quantity: item.buyCount };
//       }),
//     };
//     const updateCartPromise = cartService.updateCart(updateCartPayload);
//     const [updateCartResult, updateCartError] = await promiseHandler(
//       updateCartPromise
//     );
//     if (!updateCartResult) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!updateCartResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     dispatch(setCartData(updateCartResult.data.data.cart));
//     const addOrderPromise = orderService.addPayFastOrder({
//       cartId: updateCartResult.data.data.cart.id,
//     });
//     const [addOrderResult, addOrderError] = await promiseHandler(
//       addOrderPromise
//     );
//     if (!addOrderResult) {
//       setAlertSeverity('error');
//       setAlertMessage(addOrderError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!addOrderResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(addOrderResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     dispatch(setPickup(null));
//     dispatch(setDropOff(null));
//     dispatch(resetCart());
//     // window.location.replace(orderResponse.data.data.paymentUrl);
//     const payFastTokenPromise = orderService.getPayFastToken();
//     const [payFastTokenResult, payFastTokenError] = await promiseHandler(
//       payFastTokenPromise
//     );
//     if (!payFastTokenResult) {
//       setAlertSeverity('error');
//       setAlertMessage(payFastTokenError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!payFastTokenResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(payFastTokenResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     setPayFastFormData({
//       merchantId: payFastTokenResult.data.data.merchantId,
//       token: payFastTokenResult.data.data.accessToken,
//       merchantName: payFastTokenResult.data.data.name,
//       generatedDateTime: payFastTokenResult.data.data.generatedDateTime,
//       // successURL: payFastTokenResult.data.data.successUrl,
//       successURL: window.location.href,
//       failureURL: window.location.href,
//       webHookURL: payFastTokenResult.data.data.payFastHookUrl,
//       userName: user?.firstName,
//       totalPrice: addOrderResult.data.data.order.grandTotal,
//       phoneNumber: user?.phone,
//       emailAddress: user?.email,
//       items: addOrderResult.data.data.orderItems.map((item: any) => ({
//         id: item.itemId,
//         quantity: item.quantity,
//         price: item.unitPrice.replace('$', ''),
//       })),
//       orderId: addOrderResult.data.data.order.id,
//       currencyType: 'USD',
//     });
//     setTimeout(() => {
//       formSubmitButtonRef?.current?.click();
//     }, 0);
//   };

//   const onCheckoutCash = async () => {
//     const tempAddress = userAddress[0] ? userAddress[0].id : null;
//     const pickupDateTime = pickUp;
//     const dropDateTime = dropOff;
//     const updateCartPayload: UpdateCartPayload = {
//       appUser: user?.id,
//       appUserAddress: tempAddress,
//       appUserDevice: cartData?.appUserDevice,
//       cartId: cartData?.id,
//       dropDateTime,
//       pickupDateTime,
//       voucherCode,
//       tenant: cartData?.tenant,
//       products: cartItems.map((item: any) => {
//         return { id: item.id, quantity: item.buyCount };
//       }),
//     };

//     const updateCartPromise = cartService.updateCart(updateCartPayload);
//     const [updateCartResult, updateCartError] = await promiseHandler(
//       updateCartPromise
//     );
//     if (!updateCartResult) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!updateCartResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     dispatch(setCartData(updateCartResult.data.data.cart));
//     const addOrderPromise = orderService.addCashOrder({
//       cartId: updateCartResult.data.data.cart.id,
//     });
//     const [addOrderResult, addOrderError] = await promiseHandler(
//       addOrderPromise
//     );
//     if (!addOrderResult) {
//       setAlertSeverity('error');
//       setAlertMessage(addOrderError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!addOrderResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(addOrderResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     dispatch(setPickup(null));
//     dispatch(setDropOff(null));
//     dispatch(resetCart());

//     setAlertSeverity('success');
//     setAlertMessage('Order Placed');
//     setShowAlert(true);
//   };

//   const updateCart = useCallback(async () => {
//     if (!cartData?.id) {
//       return;
//     }
//     const pickupDateTime = dayjs(new Date()).toISOString();
//     const dropDateTime = dayjs(pickupDateTime)
//       .add(tenantConfig?.minimumDeliveryTime ?? 3, 'day')
//       .toISOString();
//     const tempAddress = userAddress[0] ? userAddress[0].id : null;
//     const updateCartPayload: UpdateCartPayload = {
//       appUser: user?.id,
//       appUserAddress: tempAddress,
//       appUserDevice: cartData?.appUserDevice,
//       cartId: cartData?.id,
//       dropDateTime: pickupDateTime,
//       pickupDateTime: dropDateTime,
//       voucherCode,
//       tenant: cartData?.tenant,
//       products: cartItems.map((item: any) => {
//         return { id: item.id, quantity: item.buyCount };
//       }),
//     };
//     const updateCartPromise = cartService.updateCart(updateCartPayload);
//     const [updateCartResult, updateCartError] = await promiseHandler(
//       updateCartPromise
//     );
//     if (!updateCartResult) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartError.message);
//       setShowAlert(true);
//       return;
//     }
//     if (!updateCartResult.data.success) {
//       setAlertSeverity('error');
//       setAlertMessage(updateCartResult.data.message);
//       setShowAlert(true);
//       return;
//     }
//     dispatch(setCartData(updateCartResult.data.data.cart));
//   }, [cartItems]);

//   useEffect(() => {
//     updateCart().then();
//   }, [cartItems]);

//   const handleRemoveFromCart = async (id: string) => {
//     dispatch(removeFromCart(id));
//   };

//   const handlePopupClose = (paymentType: 'CASH' | 'ONLINE' | null) => {
//     if (!paymentType) {
//       return;
//     }
//     if (paymentType === 'CASH') {
//       onCheckoutCash();
//       return;
//     }
//     if (paymentType === 'ONLINE') {
//       onCheckoutPayFast();
//     }
//   };

//   const getUserAddress = useCallback(async () => {
//     if (user) {
//       setIsLoading(true);
//       const getUserAddressPromise = addressService.getUserAddress();
//       const [getUserAddressResult, getUserAddressError] = await promiseHandler(
//         getUserAddressPromise
//       );
//       setIsLoading(false);
//       if (!getUserAddressResult) {
//         setAlertSeverity('error');
//         setAlertMessage(getUserAddressError.message);
//         setShowAlert(true);
//         return;
//       }
//       if (!getUserAddressResult.data.success) {
//         setAlertSeverity('error');
//         setAlertMessage(getUserAddressResult.data.message);
//         setShowAlert(true);
//         return;
//       }
//       dispatch(setUserAddressList(getUserAddressResult.data.data));
//     }
//   }, [user]);

//   useEffect(() => {
//     getUserAddress().then();
//   }, [user]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <AlertBox
//         msg={alertMessage}
//         setSeverity={alertSeverity}
//         alertOpen={showAlert}
//         setAlertOpen={setShowAlert}
//       />
//       <PaymentOptionPopup
//         handlePopupClose={handlePopupClose}
//         open={openPaymentSelectPopup}
//         setOpen={setOpenPaymentSelectPopup}
//       />
//       <div className="cart-page p-4 sm:p-5 xl:p-7">
//         <div className="mb-4 flex items-center justify-start md:mb-6">
//           <h4 className="page-heading">My Basket</h4>
//         </div>
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-12 md:col-span-7">
//             <div className="cart-products-card">
//               <div className="overflow-x-auto">
//                 <table className="cart-products-table">
//                   <thead className="border-b border-b-neutral-200 ">
//                     <tr className="h-10">
//                       <th>Products</th>
//                       <th>Price</th>
//                       <th>Items</th>
//                       <th>Quantity</th>
//                       <th>Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item: any) => (
//                       <tr key={item.id}>
//                         <td>
//                           <div className="flex items-center gap-x-5">
//                             <IconButton
//                               className="btn-delete"
//                               onClick={() => handleRemoveFromCart(item.id)}
//                             >
//                               <DeleteOutlineOutlinedIcon className="text-2xl" />
//                             </IconButton>
//                             <div className="product">
//                               <img
//                                 className="pic"
//                                 src={item.image || item.icon}
//                                 alt=""
//                               />
//                               <p className="name">{item.name}</p>
//                             </div>
//                           </div>
//                         </td>

//                         <td>${Number(item?.price ?? 0).toFixed(2)}</td>
//                         <td>{Number(item?.buyCount ?? 0).toFixed(2)}</td>
//                         <td>
//                           <span className="flex w-full flex-row items-center justify-start">
//                             <IconButton
//                               className="p-0 text-neutral-900"
//                               onClick={() =>
//                                 dispatch(decrementQuantity(item.id))
//                               }
//                             >
//                               <RemoveCircleOutlineOutlinedIcon className="text-lg" />
//                             </IconButton>
//                             <span className="mx-2">{item?.buyCount}</span>

//                             <IconButton
//                               className="p-0 text-neutral-900"
//                               onClick={() =>
//                                 dispatch(incrementQuantity(item.id))
//                               }
//                             >
//                               <AddCircleOutlineOutlinedIcon className="text-lg" />
//                             </IconButton>
//                           </span>
//                         </td>
//                         <td>
//                           $
//                           {(
//                             Number(item?.price ?? 0) *
//                             Number(item?.buyCount ?? 0)
//                           ).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="my-2.5 flex items-center justify-between px-5">
//                 <div className="flex items-center">
//                   <p className="mr-2 text-xs font-semibold text-[var(--dark-100)]">
//                     Add Promo Code
//                   </p>
//                   <FormControl variant="standard" size="small">
//                     <Input
//                       className="min-h-[10px] min-w-60 rounded-[0.625rem] border border-solid border-[var(--light-400)] p-2 text-xs font-normal text-faded"
//                       disableUnderline
//                       inputProps={{
//                         placeholder: 'Enter Promo Code',
//                         className: 'p-[initial]',
//                       }}
//                       value={voucherCode}
//                       onChange={(e) => setVoucherCode(e.target.value)}
//                       startAdornment={
//                         <InputAdornment
//                           className="text-orange-100"
//                           position="start"
//                         >
//                           <DiscountIcon />
//                         </InputAdornment>
//                       }
//                     />
//                   </FormControl>
//                 </div>
//                 <Button
//                   className="flex items-center border-none text-xs font-semibold capitalize text-[var(--dark-100)]"
//                   variant="outlined"
//                   color="inherit"
//                   startIcon={<ShoppingBagOutlinedIcon />}
//                   onClick={() => navigate('/dashboard/products')}
//                 >
//                   Add More to Basket
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12 md:col-span-5">
//             <div className="cart-checkout-card">
//               <div className="mb-5 grid grid-cols-1 sm:grid-cols-2">
//                 <div className="select-date-time sm:pr-4 lg:pr-7">
//                   <DatePickerButton
//                     onChange={handlePickUpTimeChange}
//                     id="pick-up-date-time-picker"
//                     icon={<DateRangeIcon />}
//                     text="Pick up time"
//                     initialValue={dayjs(pickUp ?? new Date())}
//                   />
//                   <div className="mb-2 flex items-center">
//                     <p className="selected-value">
//                       {pickUp
//                         ? dayjs(pickUp).format('ddd, MMM D, YYYY HH:mm a')
//                         : 'Select a date'}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="select-date-time sm:pl-4 lg:pl-7">
//                   <DatePickerButton
//                     onChange={handleDropOffTimeChange}
//                     id="drop-off-date-time-picker"
//                     icon={<DateRangeIcon />}
//                     text="Urgent time"
//                     initialValue={dayjs(dropOff)}
//                   />
//                   <div className="mb-2 flex flex-col items-center">
//                     <p className="selected-value w-full">
//                       {dropOff && dayjs(dropOff).isValid()
//                         ? dayjs(dropOff).format('ddd, MMM D, YYYY HH:mm a')
//                         : null}
//                     </p>
//                     <br />
//                     <div className="w-full text-end text-[0.625rem]">
//                       minimum time is {minimumDeliveryTime} days
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {user ? (
//                 <div className="address-card">
//                   <div className="key" style={{ width: '500px' }}>
//                     <LocationOnOutlinedIcon className="mr-2 text-xl" />
//                     <p className="text">{userAddress[0]?.address}</p>
//                   </div>
//                 </div>
//               ) : (
//                 ''
//               )}
//               <div className="total-amount">
//                 <h5 className="heading">Amount</h5>
//                 <div className="mb-4 flex items-center justify-between">
//                   <p className="key">Total Amount</p>
//                   <p className="value">
//                     ${Number(cartData?.totalAmount ?? 0).toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="mb-4 flex items-center justify-between">
//                   <p className="key">Discount</p>
//                   <p className="value">$0.00</p>
//                 </div>
//                 <div className="mb-4 flex items-center justify-between">
//                   <p className="key">
//                     HST {Number(cartData?.gstPercentage ?? 0).toFixed(0)}%
//                   </p>
//                   <p className="value">
//                     {Number(cartData?.gstAmount ?? 0).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="grand-total">
//                 <p className="key">Grand Total</p>
//                 <p className="value">
//                   ${Number(cartData?.grandTotal ?? 0).toFixed(2)}
//                 </p>
//               </div>
//               <Button
//                 type="button"
//                 onClick={() => {
//                   if (!user) {
//                     navigate('/auth/login');
//                     return;
//                   }
//                   if (!cartItems.length) {
//                     setAlertSeverity('error');
//                     setAlertMessage(`No Products In Cart`);
//                     setShowAlert(true);
//                     return;
//                   }
//                   if (!pickUp && !dropOff) {
//                     setAlertSeverity('error');
//                     setAlertMessage('Pickup Date time is Required');
//                     setShowAlert(true);
//                     return;
//                   }
//                   setOpenPaymentSelectPopup(true);
//                 }}
//                 color="inherit"
//                 className="btn-checkout"
//               >
//                 {user ? 'Checkout' : 'Proceed'}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {payFastFormData ? (
//         <PayFastForm
//           token={payFastFormData.token}
//           totalPrice={payFastFormData.totalPrice}
//           phoneNumber={payFastFormData.phoneNumber}
//           emailAddress={payFastFormData.emailAddress}
//           items={payFastFormData.items}
//           successURL={payFastFormData.successURL}
//           failureURL={payFastFormData.failureURL}
//           webHookURL={payFastFormData.webHookURL}
//           orderId={payFastFormData.orderId}
//           currencyType={payFastFormData.currencyType}
//           userName={payFastFormData.userName}
//           merchantId={payFastFormData.merchantId}
//           merchantName={payFastFormData.merchantName}
//           generatedDateTime={payFastFormData.generatedDateTime}
//           formSubmitButtonRef={formSubmitButtonRef}
//         />
//       ) : null}
//     </LocalizationProvider>
//   );
// }

// export default MyBasketPage;
