import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
// import FormControl from '@mui/material/FormControl';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppUserService from '../../services/adminapp/adminAppUser';
import VoucherService from '../../services/adminapp/adminVouchers';

import assets from '../../assets';
import CustomButton from '../../components/common/CustomButton';
import CustomDateTimePicker from '../../components/common/CustomDateTimePicker';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../components/common/CustomMultipleSelect';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import DeleteIcon from '../../components/icons/DeleteIcon';
import PromoCodeIcon from '../../components/icons/PromoCode';
import { Order } from '../../interfaces/order.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminOrders';
import PromotionListPopup from './PromotionListPopup';

function OrdersCreatePage() {
  const dropOffDate: any = useAppSelector(
    (state: any) =>
      state?.persisitReducer?.appState?.UserItems?.tenantConfig
        ?.minimumDeliveryTime
  );
  const currentDate = dayjs();
  const DeliveryDate = currentDate.add(dropOffDate, 'day');

  // const [address, setAddress] = useState<any>();
  const [catList, setCatList] = useState<any>([]);
  const [catItemList, setCatItemList] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [promoCode, setPromoCode] = useState<any>();
  const [paymentMethod] = useState('CASH_ON_DELIVERY');
  const [isOpenPromoDialog, setIsOpenPromoDialog] = useState(false);

  // const [cashCheck, setCashCheck] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState<any>('Anonymous User');
  const [userIdentifier, setUserIdentifier] = useState<any>('');

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Order>();

  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(true);
  const [isLoginLoader, setIsLoginLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [loginDetails, setLoginDetails] = useState<any>(null);
  const [promoList, setPromoList] = useState<any>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);
  const totalAmount = itemList.reduce(
    (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
    0
  );
  const gstAmount =
    totalAmount * (authState.user.tenantConfig.gstPercentage / 100);

  const discountedValue: any =
    itemList?.length <= 0
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

  const handleLogin = () => {
    setIsLoginLoader(true);
    const anonIdentidier = authState?.user?.username?.split('@')[0];
    const payload = {
      identifier:
        isExistingUser !== 'Exist User'
          ? `${anonIdentidier}@shop.com`
          : userIdentifier || 'false',
    };
    let service;
    if (isExistingUser === 'Exist User') {
      service = AppUserService.appLogin;
    } else {
      service = AppUserService.appAnonymousLogin;
    }
    service(payload)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.data);
          // if(res.data.data.userType === "Shop"){
          //   setAddress(authState?.tenantConfig?.shopAddress);
          // }else{
          //   setAddress(res.data.daaa.);
          // }
          setIsLoginLoader(false);
          setLoginDetails(res.data.data);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
          if (isExistingUser === 'Exist User') {
            VoucherService.orderVoucherPromotionList(
              authState.user.tenant,
              res.data.data.id
            )
              .then((resp) => {
                if (resp.data.success) {
                  setPromoList(resp.data.data);
                } else {
                  setIsNotify(true);
                  setNotifyMessage({
                    text: resp.data.message,
                    type: 'error',
                  });
                  setPromoList([]);
                }
              })
              .catch((err) => {
                setIsNotify(true);
                setNotifyMessage({
                  text: err.message,
                  type: 'error',
                });
              });
          }
        } else {
          setLoginDetails(null);
          setIsLoginLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setLoginDetails(null);
        setIsLoginLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const onSubmit = () => {
    if (loginDetails !== null) {
      if (itemList?.length > 0 && totalAmount > 0) {
        setIsLoader(true);
        const cartPayload = {
          tenant: loginDetails?.tenant,
          appUser: loginDetails?.id,
        };
        Service.OrderGetCart(cartPayload)
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
                products: itemList?.map((items: any) => ({
                  id: items.id,
                  quantity: items.quantity,
                })),
              };
              Service.OrderUpdateCart(updatedCartPayload).then(
                (updateCartRes) => {
                  if (updateCartRes.data.success) {
                    const newOrderPlace = {
                      cartId: item.data.data.cart.id,
                      tenant: item.data.data.cart.tenant,
                      appUser: item.data.data.cart.appUser,
                    };
                    Service.OrderPlace(newOrderPlace).then((orderPlaceRes) => {
                      if (orderPlaceRes.data.success) {
                        setIsLoader(false);
                        setIsNotify(true);
                        setNotifyMessage({
                          text: orderPlaceRes.data.message,
                          type: 'success',
                        });
                        navigate(-1);
                      } else {
                        setIsLoader(false);
                        setIsNotify(true);
                        setNotifyMessage({
                          text: orderPlaceRes.data.message,
                          type: 'error',
                        });
                      }
                      // console.log('Cart REs', cartRes);
                    });
                  }
                  // console.log('Cart REs', cartRes);
                }
              );
            }
          })
          .catch((err: any) => {
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
            // console.log('Err', err)
          });
      } else if (itemList?.length <= 0) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: 'Select atleast one category item',
          type: 'info',
        });
      } else if (totalAmount <= 0) {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: 'Total amount is $0.00, increase your quantity',
          type: 'info',
        });
      }
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'User details not found!',
        type: 'error',
      });
    }
  };

  // const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
  //   setPickUpTime(value);
  // };
  // const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
  //   setDropOffTime(value);
  // };

  const handlePaymentChange = () =>
    // event: any
    {
      // setCashCheck(event.target.value);
    };

  const handleUserChange = (event: any) => {
    setIsExistingUser(event.target.value);
  };

  // const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaymentMethod((event.target as HTMLInputElement).value);
  // };

  // const handleClickSearch = (event: any) => {
  //   setSearch(event.target.value as string);
  // };
  // const handleCategoryChange = (event: SelectChangeEvent) => {
  //   setCategory(event.target.value as string);
  // };

  // const handleServiceChange = (event: SelectChangeEvent) => {
  //   setService(event.target.value as string);
  // };

  const removeQuantity = (index: number) => {
    const item = itemList[index];
    const qty = item.quantity - 1;
    if (qty > 0) {
      setItemList((prevList: any) => {
        return prevList.map((listItem: any, listIndex: number) => {
          if (index === listIndex) {
            listItem.quantity = qty;
          }
          return { ...listItem };
        });
      });
    }
  };

  const addQuantity = (index: number) => {
    const item = itemList[index];
    const qty = item.quantity + 1;
    // if (qty > 0) {
    setItemList((prevList: any) => {
      return prevList.map((listItem: any, listIndex: number) => {
        if (index === listIndex) {
          listItem.quantity = qty;
        }
        return { ...listItem };
      });
    });
    // }
  };

  useEffect(() => {
    // setIsLoader(true);
    if (watch('category') !== 'none' && watch('category') !== undefined) {
      Service.OrderCatItemList(watch('category'))
        .then((item: any) => {
          if (item.data.success) {
            setCatItemList(item.data.data);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
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
    } else {
      Service.OrderCatList(authState.user.tenant)
        .then((item: any) => {
          if (item.data.success) {
            setCatList(item.data.data);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
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
    }
  }, [watch('category'), watch('categoriesItem')]);

  // const handleUserInput = (event: any) => {
  //   // console.log('enven', event.target.value);
  //   setUserIdentifier(event.target.value);
  // };

  // const handleMultipleSelectCallback = () => {
  //   const watchArr = watch('categoriesItem');
  //   const temp: any = [];

  //   watchArr?.forEach((item: any) => {
  //     catItemList.filter((el: any) => {
  //       if (el.id === item) {
  //         const oldItem = itemList.find((item2: any) => item2.id === item);
  //         temp.push({ ...el, ...oldItem });
  //       }
  //       return el;
  //     });
  //   });
  //   setItemList(temp);

  //   const total = itemList.reduce(
  //     (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
  //     0
  //   );
  // };

  const handleMultipleSelectCallback = () => {
    const watchArr = watch('categoriesItem');
    const temp: any = itemList;
    // console.log("Watch Arr",watchArr,catItemList,itemList);
    watchArr?.forEach((item: any) => {
      catItemList.filter((el: any) => {
        if (el.id === item) {
          const oldItem = itemList.find((item2: any) => item2.id === item);
          if (temp.some((tempItem: any) => tempItem.id === el.id)) {
            return el;
          }
          temp.push({ ...el, ...oldItem, quantity: 1 });
        }
        return el;
      });
    });
    setItemList(temp);
    // const total = itemList.reduce(
    //   (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
    //   0
    // );
  };

  // const checkVoucherMinAmount = promoList?.filter((el: any) => {
  //   if (el.voucherCode === promoCode) {
  //     if (Number(totalAmount) > Number(el.minAmount)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // });

  useEffect(() => {
    if (!checkVoucherMinAmount && promoCode) {
      setIsNotify(true);
      setNotifyMessage({
        text: 'Your Selected items amount is not enough to avail this voucher',
        type: 'info',
      });
    }
  }, [checkVoucherMinAmount]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="New Order" />
      <div className="container">
        <div className="grid grid-cols-12 gap-3 py-2">
          <div className="col-span-7 rounded-lg bg-white py-5 px-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mx-2">
                  <FormControl className="FormControl" variant="standard">
                    <CustomDropDown
                      border="1px"
                      validateRequired
                      customWidth="2xl:w-[300px] w-[200px]"
                      id="category"
                      alternativeId="categoriesItem"
                      control={control}
                      error={errors}
                      register={register}
                      setValue={setValue}
                      options={{ roles: catList }}
                      customClassInputTitle="font-bold"
                      inputTitle=""
                      defaultValue="Select Category"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className="FormControl" variant="standard">
                    <CustomMultipleSelectBox
                      valuesBoxBgColor="bg-transparent"
                      border="1px"
                      callback={handleMultipleSelectCallback}
                      validateRequired
                      customWidth="2xl:w-[300px] w-[200px]"
                      id="categoriesItem"
                      control={control}
                      error={errors}
                      setValue={setValue}
                      register={register}
                      options={{ roles: catItemList }}
                      customClassInputTitle="font-bold"
                      inputTitle=""
                      defaultVal="-- Select Category items --"
                    />
                  </FormControl>
                </div>
              </div>
              {promoList?.length > 0 && (
                <div
                  onClick={() => setIsOpenPromoDialog(true)}
                  className="cursor-pointer"
                >
                  <img
                    src={assets.images.ReferralCodeIcon}
                    alt="referral-code"
                    className="h-10 w-10"
                  />
                  {/* <CustomButton
                    title='Promotion List'
                    buttonType='button'
                    className="btn-black-fill"
                    onclick={() => setIsOpenPromoDialog(true)}
                    sx={{
                      marginRight: '0.5rem',
                      padding: '0.375rem 1.5rem !important',
                    }}
                  /> */}
                </div>
              )}
            </div>
            <div className="col-span-12 mt-3">
              <table className="avatar-table no-border-table table-auto">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Products
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Price
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Quantity
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemList?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <IconButton
                            className="p-0 text-neutral-900"
                            onClick={() =>
                              setItemList((prev: any) => {
                                setValue(
                                  'categoriesItem',
                                  watch('categoriesItem').filter(
                                    (id: any) => id !== item.id
                                  )
                                );
                                return prev.filter(
                                  (el: any) => item.id !== el.id
                                );
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
                        <td>
                          <span className="avatar">
                            <img src={item?.banner} alt="" /> {item?.name}
                          </span>
                        </td>
                        <td>${item?.price}</td>
                        <td>
                          <span className="flex w-full flex-row items-center justify-start">
                            <IconButton
                              className="p-0 text-neutral-900"
                              onClick={() => removeQuantity(index)}
                            >
                              <RemoveCircleOutlineOutlinedIcon className="text-lg" />
                            </IconButton>
                            <FormControl
                              className="txt-center m-1 w-8"
                              variant="standard"
                            >
                              <Input
                                className="after:border-b-secondary"
                                id="quantity"
                                value={item?.quantity}
                                disableUnderline
                              />
                            </FormControl>
                            <IconButton
                              className="p-0 text-neutral-900"
                              onClick={() => addQuantity(index)}
                            >
                              <AddCircleOutlineOutlinedIcon className="text-lg" />
                            </IconButton>
                          </span>
                        </td>
                        <td className="text-sm font-semibold text-secondary">
                          $
                          {(
                            Number(item?.quantity) * Number(item?.price)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-5 rounded-lg bg-white py-5 shadow-lg">
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
                    {/* <CustomDateTimePicker
                      register={register}
                      defaultValue={dayjs()}
                      minDate={dayjs()}
                      id="deliveryPickupDate"
                      error={errors.deliveryPickupDate}
                      inputTitle="Delivery Pickup Date"
                      setValue={setValue}
                      value={dayjs()}
                    /> */}
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
              {/* <FormControl className="w-full" variant="filled">
                <label className="mb-1 ml-1 w-full font-open-sans text-xl font-semibold">
                  Address
                </label>
                <div className="w-full rounded-xl border border-solid border-foreground py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Type Addess"
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
                    disabled={isLoginLoader || itemList?.length <= 0}
                    onclick={handleLogin}
                    buttonType="button"
                    title="Login"
                    className={`${
                      itemList?.length <= 0 ? 'btn-gray-fill' : 'btn-black-fill'
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
              <Divider flexItem className="my-5" />
              {promoList?.length > 0 && (
                <>
                  <div className="flex items-center justify-between py-2">
                    <div className="font-open-sans font-bold text-neutral-900">
                      Add Promo Code
                    </div>
                    <div className="font-open-sans text-base font-bold text-neutral-900">
                      <div className="rounded-md border-[1px] border-[#A3A3A3]">
                        <FormControl className="FormControl" variant="standard">
                          <Input
                            // {...register('name', {
                            //   required: true,
                            //   pattern: PATTERN.CHAR_NUM_DASH,
                            //   validate: (value) => value.length <= 100,
                            // })}
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
                  isLoader || loginDetails === null || itemList?.length <= 0
                }
                type="button"
                onClick={onSubmit}
                color="inherit"
                className={`w-full rounded-lg 
                ${
                  loginDetails === null || itemList?.length <= 0
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
      <PromotionListPopup
        promoList={promoList}
        openFormDialog={isOpenPromoDialog}
        setOpenFormDialog={setIsOpenPromoDialog}
      />
    </LocalizationProvider>
  );
}

export default OrdersCreatePage;
