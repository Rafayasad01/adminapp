/* eslint-disable react-hooks/exhaustive-deps */
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../../components/icons/PlusIcon';
import { Setting } from '../../interfaces/app.interface';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import DragDropFile from './DragDropFile';
import SocialLinksPopup from './SocialLinksPopup';

import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import ColorPicker from '../../components/common/ColorPicker';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
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
import { setLogo } from '../../redux/features/appStateSlice';

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

  const filtered = links?.filter((el: string) => el !== null);
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
  const [color1, setColor1] = useState<any>('#1A1A1A');
  const [color2, setColor2] = useState<any>('#1A1A1A');
  // const [color3, setColor3] = useState<any>('#1A1A1A');
  const [detail, setDetail] = useState<Setting>();
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
    // console.log('itesmssss', item);

    setValue('name', item.name);
    setValue('email', item.email);
    setValue(
      'gstPercentage',
      item.gstPercentage ? item.gstPercentage : item.gst_percentage
    );
    setValue(
      'minOrderAmount',
      item.minOrderAmount ? item.minOrderAmount : item.min_order_amount
    );
    setValue(
      'deliveryFee',
      item.deliveryFee ? item.deliveryFee : item.delivery_fee
    );
    setValue(
      'developmentDomain',
      item.developmentDomain ? item.developmentDomain : item.development_domain
    );
    setValue(
      'liveDomain',
      item.liveDomain ? item.liveDomain : item.live_domain
    );
    setValue('facebook', item.facebook !== 'null' ? item.facebook : '');
    setValue('instagram', item.instagram ? item.instagram : '');
    setValue('linkedin', item.linkedin !== 'null' ? item.linkedin : '');
    setValue('twitter', item.twitter ? item.twitter : '');
    setValue('youtube', item.youtube ? item.youtube : '');
    setValue('whatsapp', item.whatsapp ? item.whatsapp : '');
    setValue('address', item.address ? item.address : '');
    setValue('userLimit', item.userLimit ? item.userLimit : '');
    setColor1(item.color1);
    setColor2(item.color2);
    // setColor3(item.color3);
  };

  const onSubmit = (data: any) => {
    // console.log('SETTTING DATA', data);
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Setting Update')) {
      // setIsLoader(true);
      const formData = new FormData();
      formData.append('name', data.name ? data.name : '');
      formData.append('desc', data.name ? data.name : '');
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
      formData.append('address', data.address ? data.address : '');
      formData.append('facebook', detail ? detail.facebook : '');
      formData.append('instagram', detail ? detail.instagram : '');
      formData.append('linkedin', detail ? detail.linkedin : '');
      formData.append('twitter', detail ? detail.twitter : '');
      formData.append('youtube', detail ? detail.youtube : '');
      formData.append('whatsapp', detail ? detail.whatsapp : '');
      formData.append('updatedBy', authState.user.id);
      formData.append('color1', color1);
      formData.append('color2', color2);
      // formData.append('color3', color3);
      if (authState?.user?.userType === 'ShopUser')
        formData.append('userLimit', data.userLimit ? data.userLimit : '');
      if (file !== null) formData.append('logo', file);

      Service.updateService(authState.user.tenant, formData)
        .then((item: any) => {
          const { success, message, data: itemData } = item.data;
          if (success) {
            if (itemData?.logo) {
              dispatch(setLogo(itemData.logo));
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
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: message,
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
    if (listingRolePermission(dataRole, 'Setting Address')) {
      Service.getAddressService(authState.user.tenant).then((item: any) => {
        if (item.data.success) {
          setAddress(item.data.data);
        }
      });
    }
  }, [emptyVariable]);

  // console.log('detail', selectedImg, detail?.logo);

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
              {/* <Tab
                label="Shop Scheduling"
                value="SHOP_SCHEDULING"
                onClick={() => navigate('../shop')}
              /> */}
            </Tabs>
          </div>
          <div className="Content w-full py-5 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                ) : detail && detail.logo ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={detail.logo}
                      alt="Shop Logo"
                    />
                  </div>
                ) : null}
              </div>
              <div className="FormFields mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">App Name</label>
                  <Input
                    className="FormInput"
                    id="name"
                    placeholder="UrLaundry"
                    disableUnderline
                    {...register('name', {
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                      value: detail ? detail.name : '',
                    })}
                  />
                  {errors.name?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.name?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
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
              <div className="FormFields mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Contact Email</label>
                  <Input
                    className="FormInput"
                    id="email"
                    type="text"
                    placeholder="warning@urlaundry.com"
                    disableUnderline
                    {...register('email', {
                      pattern: PATTERN.CHAR_NUM_DOT_AT,
                      validate: (value) => detail?.email && value.length <= 150,
                      value: detail ? detail.email : '',
                    })}
                  />
                  {errors.email?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.email?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
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
              <div className="mb-4 flex">
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
                  <label className="FormLabel">Delivery fee</label>
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
                {authState?.user?.userType === 'ShopUser' && (
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Employee Limit</label>
                    <Input
                      className="FormInput"
                      {...register('userLimit', {
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
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Development Domain</label>
                  <Input
                    className="FormInput"
                    id="developmentDomain"
                    value={
                      watch('developmentDomain') &&
                      `${DOMAIN_PROTOCOL}${watch(
                        'developmentDomain'
                      )}${DOMAIN_PREFIX}`
                    }
                    disableUnderline
                    disabled
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Live Domain</label>
                  <Input
                    className="FormInput"
                    id="liveDomain"
                    value={
                      watch('liveDomain') &&
                      `${DOMAIN_PROTOCOL}${watch('liveDomain')}${DOMAIN_PREFIX}`
                    }
                    disableUnderline
                    disabled
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Social Links</label>
                  <div className="mt-2 flex flex-row items-center gap-3">
                    {detail && detail.facebook && (
                      <Item
                        value={detail.facebook}
                        name={FACEBOOK as AssetsImages}
                      />
                    )}
                    {detail && detail.instagram && (
                      <Item
                        value={detail.instagram}
                        name={INSTAGRAM as AssetsImages}
                      />
                    )}
                    {detail && detail.linkedin && (
                      <Item
                        value={detail.linkedin}
                        name={LINKEDIN as AssetsImages}
                      />
                    )}
                    {detail && detail.twitter && (
                      <Item
                        value={detail.twitter}
                        name={TWITTER as AssetsImages}
                      />
                    )}
                    {detail && detail.youtube && (
                      <Item
                        value={detail.youtube}
                        name={YOUTUBE as AssetsImages}
                      />
                    )}
                    {detail && detail.whatsapp && (
                      <Item
                        value={detail.whatsapp}
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
              <div className="FormMultipleFields mb-4">
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
                {/* <ColorPicker
                  colorPickerLabel="Color3"
                  colorPickerValue={color3 || '#1A1A1A'}
                  setColorPickerValue={setColor3}
                  id="color3"
                /> */}
              </div>
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
            <MapAddress address={address.address} zoom={10} />
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
