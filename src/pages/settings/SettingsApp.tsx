/* eslint-disable react-hooks/exhaustive-deps */
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
import PlusIcon from '../../components/icons/PlusIcon';
import { Setting } from '../../interfaces/app.interface';
import { setEmployeeLimit, setLogo } from '../../redux/features/appStateSlice';
import { setTheme } from '../../redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/admin';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  FACEBOOK,
  INSTAGRAM,
  INVALID_CHAR,
  LINKEDIN,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
  TWITTER,
  VALIDATE_NON_NEGATIVE_NUM,
  WHATSAPP,
  YOUTUBE,
} from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import DragDropFile from './DragDropFile';
import SocialLinksPopup from './SocialLinksPopup';

type AssetsImages = keyof typeof assets.images;

function Item(props: { value: any; name: AssetsImages }) {
  const { value, name } = props;
  return (
    <Link href={value} underline="none" target="_blank">
      <img src={assets.images[name]} alt="" />
    </Link>
  );
}

function HelpingIcon(elements: any) {
  const { links } = elements;
  // console.log('links', links);

  const filtered = links?.filter((el: string) => el !== 'null' && el !== null);
  if (filtered?.length < 6) {
    return <PlusIcon />;
  }
  return <EditIcon />;
}

function SettingsApp() {
  const dispatch = useAppDispatch();
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [openSocialMediaPopup, setOpenSocialMediaPopup] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [detail, setDetail] = useState<any>();
  const [address, setAddress] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Setting>();

  const setData = (item: any) => {
    console.log('itesmssss', item);

    // setValue('name', item.tenantConfig.name);
    setValue('desc', item.tenantConfig.desc);
    setValue('email', item.tenantConfig.email);
    setValue('deliveryUrgentFees', item.tenantConfig.deliveryUrgentFees);
    setValue(
      'minimumDeliveryTime',
      Number(item.tenantConfig.minimumDeliveryTime)
    );
    setValue(
      'gstPercentage',
      item.tenantConfig.gstPercentage
        ? item.tenantConfig.gstPercentage
        : item.gst_percentage
    );
    setValue(
      'minOrderAmount',
      item.tenantConfig.minOrderAmount
        ? item.tenantConfig.minOrderAmount
        : item.min_order_amount
    );
    setValue(
      'deliveryFee',
      item.tenantConfig.deliveryFee
        ? item.tenantConfig.deliveryFee
        : item.delivery_fee
    );
    setValue(
      'domainAdminapp',
      item.systemConfig.domain ? item.systemConfig.domain : item.domain_adminapp
    );
    setValue(
      'domainWebapp',
      item.systemConfig.domainWebapp
        ? item.systemConfig.domainWebapp
        : item.domain_webapp
    );
    setValue(
      'facebook',
      item.tenantConfig.facebook !== 'null' ? item.tenantConfig.facebook : ''
    );
    setValue(
      'instagram',
      item.tenantConfig.instagram ? item.tenantConfig.instagram : ''
    );
    setValue(
      'linkedin',
      item.tenantConfig.linkedin !== 'null' ? item.tenantConfig.linkedin : ''
    );
    setValue(
      'twitter',
      item.tenantConfig.twitter ? item.tenantConfig.twitter : ''
    );
    setValue(
      'youtube',
      item.tenantConfig.youtube ? item.tenantConfig.youtube : ''
    );
    setValue(
      'whatsapp',
      item.tenantConfig.whatsapp ? item.tenantConfig.whatsapp : ''
    );
    setValue(
      'address',
      item.tenantConfig.shopAddress ? item.tenantConfig.shopAddress : ''
    );
    if (
      item.tenantConfig.enableLoyaltyProgram === 'true' ||
      item.tenantConfig.enableLoyaltyProgram === true
    ) {
      setValue('enableLoyaltyProgram', true);
    }
    setValue(
      'loyaltyCoinConversionRate',
      item.tenantConfig.loyaltyCoinConversionRate
    );
    setValue('requiredCoinsToRedeem', item.tenantConfig.requiredCoinsToRedeem);
  };

  const onSubmit = (data: any) => {
    // console.log('SETTTING DATA', data);
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Setting Update')) {
      // setIsLoader(true);
      const formData = new FormData();
      // formData.append('name', data.name ? data.name : '');
      formData.append('desc', data.desc ? data.desc : '');
      formData.append(
        'gstPercentage',
        data.gstPercentage ? data.gstPercentage : ''
      );
      formData.append('email', data.email ? data.email : '');
      formData.append(
        'minOrderAmount',
        data.minOrderAmount ? data.minOrderAmount : 0
      );
      formData.append('deliveryFee', data.deliveryFee ? data.deliveryFee : 0);
      formData.append(
        'minimumDeliveryTime',
        data.minimumDeliveryTime ? data.minimumDeliveryTime : 0
      );
      formData.append(
        'deliveryUrgentFees',
        data.deliveryUrgentFees ? data.deliveryUrgentFees : 0
      );
      formData.append('address', data.address ? data.address : '');
      formData.append('facebook', detail ? detail.facebook : '');
      formData.append('instagram', detail ? detail.instagram : '');
      formData.append('linkedin', detail ? detail.linkedin : '');
      formData.append('twitter', detail ? detail.twitter : '');
      formData.append('youtube', detail ? detail.youtube : '');
      formData.append('whatsapp', detail ? detail.whatsapp : '');
      formData.append('updatedBy', authState.user.id);
      // formData.append('color1', color1);
      // formData.append('color2', color2);
      // formData.append('color3', color3);
      formData.append('enableLoyaltyProgram', data.enableLoyaltyProgram);
      formData.append(
        'loyaltyCoinConversionRate',
        data.loyaltyCoinConversionRate
      );
      formData.append('requiredCoinsToRedeem', data.requiredCoinsToRedeem);
      // formData.append('domain', data.domainAdminapp);
      // formData.append('domainWebapp', data.domainWebapp);
      if (authState?.user?.userType === 'ShopUser')
        formData.append('userLimit', data.userLimit ? data.userLimit : 0);
      if (file !== null) formData.append('logo', file);
      // if (themeFile !== null) formData.append('banner', themeFile);

      Service.updateService(authState.user.tenant, formData)
        .then((item: any) => {
          const { success, message, data: itemData } = item.data;
          if (success) {
            console.log('message', message);

            dispatch(setTheme(itemData));
            setAddress(itemData?.address);
            dispatch(setTheme(itemData));
            if (itemData?.logo) {
              dispatch(setLogo(itemData.logo));
            }
            if (itemData?.userLimit) {
              dispatch(setEmployeeLimit(itemData.userLimit));
            }
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: message,
              type: 'success',
            });
            setData(itemData);
            setDetail(itemData);
          } else {
            console.log('message2', message);

            setValue('userLimit', Number(detail?.userLimit));
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          console.log('message', err.message);
          setValue('userLimit', Number(detail?.userLimit));
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Setting View')) {
      Service.getService(authState.user.tenant)
        .then((item: any) => {
          // console.log('item Select:::::', item)
          if (item.data.success) {
            setIsLoader(false);
            setData(item.data.data);
            setDetail(item.data.data);
            setAddress(item.data.data.address);
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
    // if (listingRolePermission(dataRole, 'Setting Address')) {
    //   Service.getAddressService(authState.user.tenant).then((item: any) => {
    //     if (item.data.success) {
    //       setAddress(item.data.data.address);
    //     }
    //   });
    // }
  }, [emptyVariable]);

  // console.log(
  //   'ENABLE',
  //   watch('enableLoyaltyProgram'),
  //   detail?.enableLoyaltyProgram
  // );

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="grid w-full grid-cols-12 gap-3">
        <div className="col-span-6 min-h-[500px] rounded-lg bg-white py-3 shadow-lg">
          <div className="custom-tab">
            <Tabs value="APP_SETTINGS" aria-label="basic tabs example">
              <Tab
                label="App Settings"
                value="APP_SETTINGS"
                onClick={() => navigate('../app')}
              />
              <Tab
                label="System Configuration"
                value="SYSTEM_CONFIGURATION"
                onClick={() => navigate('../config')}
              />
              {/* <Tab
                label="Shop Scheduling"
                value="SHOP_SCHEDULING"
                onClick={() => navigate('../shop')}
              /> */}
            </Tabs>
          </div>
          <div className="Content w-full px-4 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 text-base">
                <span className="">Upload Shop Logo</span>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-5 mb-4">
                  <DragDropFile
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    setFile={setFile}
                    setImg={setSelectedImg}
                  />
                </div>
                {selectedImg ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={selectedImg}
                      alt="Shop Logo"
                    />
                  </div>
                ) : detail && detail?.tenantConfig.logo ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={detail?.tenantConfig.logo}
                      alt="Shop Logo"
                    />
                  </div>
                ) : null}
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Address</label>
                  <Input
                    className="FormInput"
                    id="address"
                    placeholder="Enter Address"
                    disableUnderline
                    {...register('address', {
                      pattern: PATTERN.ADDRESS_ONLY,
                      validate: (value) => value.length <= 250,
                      value: detail ? detail.address : '',
                    })}
                  />
                  {errors.address?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.address?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">
                    Description{' '}
                    <span className="SubLabel">Write 01-350 Characters</span>
                  </label>
                  <TextField
                    className="FormTextarea"
                    id="desc"
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder="Write Description"
                    {...register('desc', {
                      required: 'Description is required',
                      minLength: {
                        value: 1,
                        message: 'Minimum One Characters',
                      },
                      maxLength: {
                        value: 250,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
                </FormControl>
              </div>
              <div className="FormFields mb-4">
                {/* <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Contact Email</label>
                  <Input
                    className="FormInput"
                    id="email"
                    type="text"
                    placeholder="warning@urlaundry.com"
                    disableUnderline
                    {...register('email', {
                      pattern: PATTERN.CHAR_NUM_DOT_AT,
                      validate: (value) => value?.length <= 150,
                      value: detail?.email ? detail.email : '',
                    })}
                  />
                  {errors.email?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.email?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl> */}
                {authState?.user?.userType === 'ShopUser' && (
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Employee Limit</label>
                    <Input
                      className="FormInput"
                      {...register('userLimit', {
                        value: detail ? detail.userLimit : 0,
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                      })}
                      defaultValue={0}
                      type="number"
                      id="userLimits"
                      placeholder="Enter max user limits"
                      disableUnderline
                    />
                    {errors?.userLimit && (
                      <ErrorSpanBox error={errors?.userLimit?.message} />
                    )}
                  </FormControl>
                )}
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Tax</label>
                  <Input
                    className="FormInput"
                    id="gst_percentage"
                    placeholder="1%"
                    disableUnderline
                    {...register('gstPercentage', {
                      pattern: PATTERN.POINT_NUM,
                      maxLength: {
                        value: 15,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                      value: detail ? detail.gstPercentage : '',
                    })}
                    type="text"
                  />
                  {errors.gstPercentage?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.gstPercentage?.type === 'maxLength' && (
                    <ErrorSpanBox error={PH_MINI_LENGTH} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Min order Amount</label>
                  <Input
                    className="FormInput"
                    id="min_order_amount"
                    placeholder="$1.00"
                    disableUnderline
                    {...register('minOrderAmount', {
                      value: detail ? detail.minOrderAmount : '',
                      pattern: {
                        value: PATTERN.POINT_NUM,
                        message: 'Enter a valid amount',
                      },
                    })}
                  />
                  {errors.minOrderAmount?.type === 'pattern' && (
                    <ErrorSpanBox error="Enter a valid amount" />
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Rider Delivery Charges</label>
                  <Input
                    className="FormInput"
                    id="name"
                    placeholder="$1.00"
                    disableUnderline
                    {...register('deliveryFee', {
                      value: detail ? detail.deliveryFee : '',
                      pattern: {
                        value: PATTERN.POINT_NUM,
                        message: 'Enter a valid delivery fee',
                      },
                    })}
                  />
                  {errors.deliveryFee?.type === 'pattern' && (
                    <ErrorSpanBox error="Enter a valid delivery fee" />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Minimum Delivery Days</label>
                  <Input
                    id="minimumDeliveryTime"
                    placeholder="Enter minimum delivery time"
                    type="number"
                    className="FormInput"
                    defaultValue={0}
                    {...register('minimumDeliveryTime', {
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                      maxLength: {
                        value: 10,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    disableUnderline
                  />
                  {errors?.minimumDeliveryTime && (
                    <ErrorSpanBox
                      error={errors?.minimumDeliveryTime?.message}
                    />
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Delivery Urgent Day Fees</label>
                  <Input
                    id="deliveryUrgentFees"
                    placeholder="Enter Delivery Urgent Fees"
                    type="number"
                    className="FormInput"
                    defaultValue={0}
                    {...register('deliveryUrgentFees', {
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                      maxLength: {
                        value: 10,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    disableUnderline
                  />
                  {errors?.deliveryUrgentFees && (
                    <ErrorSpanBox error={errors?.deliveryUrgentFees?.message} />
                  )}
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Domain</label>
                  <Input
                    className="FormInput"
                    id="domainAdminapp"
                    placeholder="Domain"
                    value={
                      watch('domainAdminapp') &&
                      `${DOMAIN_PROTOCOL}${watch(
                        'domainAdminapp'
                      )}${DOMAIN_PREFIX}`
                    }
                    disableUnderline
                    disabled
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: '#1D1D1D' }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                      }
                      {...register('enableLoyaltyProgram')}
                      checked={watch('enableLoyaltyProgram')}
                    />
                  }
                  label="Loyality Program"
                />
              </div>
              {watch('enableLoyaltyProgram') === true && (
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">
                      Loyality Conversion Rate
                    </label>
                    <Input
                      id="loyaltyCoinConversionRate"
                      placeholder="Enter Conversion Rate"
                      type="number"
                      className="FormInput"
                      defaultValue={0}
                      {...register('loyaltyCoinConversionRate', {
                        required:
                          watch('enableLoyaltyProgram') === true &&
                          'Loyality rate is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message: MAX_LENGTH_EXCEEDED,
                        },
                      })}
                      disableUnderline
                    />
                    {errors?.loyaltyCoinConversionRate && (
                      <ErrorSpanBox
                        error={errors?.loyaltyCoinConversionRate?.message}
                      />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Minimum Loyality Coins</label>
                    <Input
                      id="requiredCoinsToRedeem"
                      placeholder="Enter Minimum Loyality coins"
                      type="number"
                      className="FormInput"
                      defaultValue={0}
                      {...register('requiredCoinsToRedeem', {
                        required:
                          watch('enableLoyaltyProgram') === true &&
                          'Loyality coins is required in numbers',
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message: MAX_LENGTH_EXCEEDED,
                        },
                      })}
                      disableUnderline
                    />
                    {errors?.requiredCoinsToRedeem && (
                      <ErrorSpanBox
                        error={errors?.requiredCoinsToRedeem?.message}
                      />
                    )}
                  </FormControl>
                </div>
              )}
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Social Links</label>
                  <div className="mt-2 flex flex-row items-center gap-3">
                    {detail &&
                      detail.tenantConfig.facebook &&
                      detail.tenantConfig.facebook !== 'null' && (
                        <Item
                          value={detail.tenantConfig.facebook}
                          name={FACEBOOK as AssetsImages}
                        />
                      )}
                    {detail &&
                      detail.tenantConfig.instagram &&
                      detail.tenantConfig.instagram !== 'null' && (
                        <Item
                          value={detail.tenantConfig.instagram}
                          name={INSTAGRAM as AssetsImages}
                        />
                      )}
                    {detail &&
                      detail.tenantConfig.linkedin &&
                      detail.tenantConfig.linkedin !== 'null' && (
                        <Item
                          value={detail.tenantConfig.linkedin}
                          name={LINKEDIN as AssetsImages}
                        />
                      )}
                    {detail &&
                      detail.tenantConfig.twitter &&
                      detail.tenantConfig.twitter !== 'null' && (
                        <Item
                          value={detail.tenantConfig.twitter}
                          name={TWITTER as AssetsImages}
                        />
                      )}
                    {detail &&
                      detail.tenantConfig.youtube &&
                      detail.tenantConfig.youtube !== 'null' && (
                        <Item
                          value={detail.tenantConfig.youtube}
                          name={YOUTUBE as AssetsImages}
                        />
                      )}
                    {detail &&
                      detail.tenantConfig.whatsapp &&
                      detail.tenantConfig.whatsapp !== 'null' && (
                        <Item
                          value={detail.tenantConfig.whatsapp}
                          name={WHATSAPP as AssetsImages}
                        />
                      )}
                    <IconButton
                      className="p-0 text-[1.675rem]"
                      onClick={() => setOpenSocialMediaPopup(true)}
                    >
                      <HelpingIcon
                        links={[
                          detail?.facebook,
                          detail?.instagram,
                          detail?.linkedin,
                          detail?.twitter,
                          detail?.whatsapp,
                          detail?.youtube,
                        ]}
                      />
                    </IconButton>
                  </div>
                </FormControl>
              </div>
              {/* <div className="FormMultipleFields mb-4">
                <ColorPicker
                  colorPickerLabel="Theme Color"
                  colorPickerValue={color1 || '#1A1A1A'}
                  setColorPickerValue={setColor1}
                  id="color1"
                />
                <ColorPicker
                  colorPickerLabel="Text Color"
                  colorPickerValue={color2 || '#1A1A1A'}
                  setColorPickerValue={setColor2}
                  id="color2"
                />
                <ColorPicker
                  colorPickerLabel="Page Color"
                  colorPickerValue={color3 || '#1A1A1A'}
                  setColorPickerValue={setColor3}
                  id="color3"
                />
              </div> */}
              <div className="FormField">
                <Button
                  type="submit"
                  className="btn-black-fill flex justify-self-end"
                  sx={{
                    padding: '0.375rem 2rem !important',
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-6 min-h-[500px] rounded-lg bg-white shadow-lg">
          {address ? (
            <MapAddress address={address} zoom={10} />
          ) : (
            <div className="no-map-location">
              <div className="content">
                <div className="icon">
                  <img
                    className="w-100"
                    src={assets.images.noMapLocation}
                    alt=""
                  />
                </div>
                <h4 className="text">Location not available</h4>
              </div>
            </div>
          )}
        </div>
      </div>
      {openSocialMediaPopup && (
        <SocialLinksPopup
          setIsLoader={setIsLoader}
          openDialog={openSocialMediaPopup}
          setOpenDialog={setOpenSocialMediaPopup}
          detail={detail}
          setDetail={setDetail}
        />
      )}
    </>
  );
}

export default SettingsApp;
