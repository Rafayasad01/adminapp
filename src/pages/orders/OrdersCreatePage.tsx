import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { SelectChangeEvent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePickerButton from './DatePickerButton';
import AppUserService from '../../services/adminapp/adminAppUser';

import TopBar from '../../components/common/TopBar';
import DeleteIcon from '../../components/icons/DeleteIcon';
import assets from '../../assets';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomMultipleSelectBox from '../../components/common/CustomMultipleSelect';
import { Order } from '../../interfaces/order.interface';
import Service from '../../services/adminapp/adminOrders';
import { useAppSelector } from '../../redux/redux-hooks';
import Loader from '../../components/common/Loader2';
import Notify from '../../components/common/Notify';
import CustomButton from '../../components/common/CustomButton';

function OrdersCreatePage() {
  const [catList, setCatList] = useState<any>([]);
  const [catItemList, setCatItemList] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('categories');
  const [service, setService] = useState('services');
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);

  const [cashCheck, setCashCheck] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState<any>('false');
  const [userIdentifier, setUserIdentifier] = useState<any>('false');
  const [existCheck, setExistCheck] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Order>();

  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [loginDetails, setLoginDetails] = useState<any>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);

  const totalAmount = itemList.reduce(
    (p: any, c: any) => p + Number(c.price) * Number(c.quantity),
    0
  );
  const gstAmount =
    totalAmount * (authState.user.tenantConfig.gstPercentage / 100);
  const grandTotal = gstAmount + totalAmount;

  const handleLogin = () => {
    setIsLoader(true);
    const anonIdentidier = authState?.user?.username?.split('@')[0];
    const payload = {
      identifier:
        isExistingUser !== 'true'
          ? `${anonIdentidier}@shop.com`
          : userIdentifier,
    };
    AppUserService.appLogin(payload)
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setLoginDetails(res.data);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
        } else {
          setLoginDetails(null);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setLoginDetails(null);
        setIsLoader(false);
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
          tenant: loginDetails?.data?.tenant,
          appUser: loginDetails?.data?.id,
        };
        Service.OrderGetCart(cartPayload)
          .then((item: any) => {
            // console.log('ITTTTTTEM', item);
            if (item.data.success) {
              const updatedCartPayload = {
                cartId: item.data.data.cart.id,
                appUser: item.data.data.cart.appUser,
                tenant: item.data.data.cart.tenant,
                appUserAddress: loginDetails?.data?.appUserAddress.id,
                pickupDateTime: new Date(),
                dropDateTime: new Date(),
                promoCode: '',
                products: itemList?.map((items: any) => ({
                  id: items.id,
                  quantity: items.quantity,
                })),
              };
              Service.OrderUpdateCart(updatedCartPayload).then((cartRes) => {
                if (loginDetails?.success) {
                  const orderPlace = {
                    cartId: cartRes.data.data.cart.id,
                    tenant: cartRes.data.data.cart.tenant,
                    appUser: cartRes.data.data.cart.appUser,
                  };
                  Service.OrderPlace(updatedCartPayload).then((orderItem) => {
                    if (loginDetails?.success) {
                      setIsLoader(false);
                      // console.log('Order place', orderItem);
                      navigate(-1);
                    }
                    // console.log('Cart REs', cartRes);
                  });
                }
                // console.log('Cart REs', cartRes);
              });
            }
          })
          .catch((err: any) => console.log('Err', err));
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

  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value);
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value);
  };

  const handlePaymentChange = (event: any) => {
    setCashCheck(event.target.value);
  };

  const handleUserChange = (event: any) => {
    console.log('enven', event);
    setIsExistingUser(event.target.value);
  };

  // const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaymentMethod((event.target as HTMLInputElement).value);
  // };

  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleServiceChange = (event: SelectChangeEvent) => {
    setService(event.target.value as string);
  };
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
    setCatItemList([]);
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
  }, [watch('category')]);

  // console.log("ID", watch("categoriesItem"));

  const handleUserInput = (event: any) => {
    console.log('enven', event.target.value);
    setUserIdentifier(event.target.value);
  };

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
    watchArr?.forEach((item: any) => {
      catItemList.filter((el: any) => {
        if (el.id === item) {
          const oldItem = itemList.find((item2: any) => item2.id === item);
          if (temp.some((item: any) => item.id === el.id)) {
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
            <div className="flex items-center justify-center">
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
            <div className="col-span-12 mt-3">
              <table className="avatar-table no-border-table table-auto">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th className="font-open-sans text-base font-semibold text-[#1A1A1A]">
                      Products
                    </th>
                    <th className="font-open-sans text-base font-semibold text-[#1A1A1A]">
                      Price
                    </th>
                    <th className="font-open-sans text-base font-semibold text-[#1A1A1A]">
                      Quantity
                    </th>
                    <th className="font-open-sans text-base font-semibold text-[#1A1A1A]">
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
                                className="after:border-b-neutral-900"
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
                        <td className="text-sm font-semibold text-[#1A1A1A]">
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
              {/* <FormControl className="w-full" variant="filled">
                <label className="mb-1 ml-1 w-full font-open-sans text-xl font-semibold">
                  Address
                </label>
                <div className="w-full rounded-xl border border-solid border-[#E4E4E4] py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
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
              <FormControl className="mt-4">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="font-open-sans text-xl font-semibold text-[#1A1A1A]"
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
                      className="font-open-sans text-xl font-semibold text-[#1A1A1A]"
                    >
                      User
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={isExistingUser}
                      onClick={handleUserChange}
                    >
                      <FormControlLabel
                        sx={{
                          color: '#6A6A6A',
                          fontFamily: 'Open Sans',
                          fonWeight: 400,
                          fonSize: '14px',
                        }}
                        value={false}
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
                        value
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
                    onclick={handleLogin}
                    buttonType="button"
                    title="Login"
                    className="btn-black-fill"
                    sx={{
                      padding: '0.375rem 2rem !important',
                      width: '100%',
                      height: '35px',
                    }}
                  />
                </div>
              </div>

              {/* {console.log("isExx", isExistingUser)} */}
              {isExistingUser === 'true' && (
                <div className="w-full rounded-xl border border-solid border-[#E4E4E4] py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
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
                {/* <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Discount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    $0.00
                  </div>
                </div> */}
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    GST {authState.user.tenantConfig.gstPercentage}%
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
                  ${grandTotal.toFixed(2)}
                </div>
              </div>
              <Button
                disabled={isLoader || loginDetails === null}
                type="button"
                onClick={onSubmit}
                color="inherit"
                className={`w-full rounded-lg ${loginDetails === null ? 'bg-neutral-400' : 'bg-neutral-900'
                  } font-open-sans text-base font-semibold text-gray-50`}
              >
                {isLoader ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default OrdersCreatePage;
