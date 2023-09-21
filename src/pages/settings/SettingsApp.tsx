/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DragDropFile from './DragDropFile';
import PlusIcon from '../../components/icons/PlusIcon';
import { Setting } from '../../interfaces/app.interface';
import SocialLinksPopup from './SocialLinksPopup';
import { useAppSelector } from '../../redux/redux-hooks';

import '../../assets/css/PopupStyle.css';
import assets from '../../assets';
import ColorPicker from '../../components/common/ColorPicker';
import Service from '../../services/adminapp/admin';
import {
  DOMAIN_PREFIX,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  DOMAIN_PROTOCOL,
  TWITTER,
  WHATSAPP,
  YOUTUBE,
} from '../../utils/constants';
import MapAddress from '../../components/common/MapAddress';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import { listingRolePermission } from '../../utils/helper';

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
  const filtered = links?.filter((el: string) => el !== '');
  if (filtered?.length < 6) {
    return <PlusIcon />;
  }
  return <EditIcon />;
}

function SettingsApp() {
  const authState: any = useAppSelector((state) => state.authState);
  const dataRole = useSelector(
    (state: any) => state.roleState.role.permissions
  );
  const navigate = useNavigate();
  const [openSocialMediaPopup, setOpenSocialMediaPopup] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [color1, setColor1] = useState<any>('#1A1A1A');
  const [color2, setColor2] = useState<any>('#1A1A1A');
  const [color3, setColor3] = useState<any>('#1A1A1A');
  const [detail, setDetail] = useState<Setting>();
  const [address, setAddress] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Setting>();

  const setData = (item: any) => {
    setValue('name', item.name);
    setValue('email', item.email);
    setValue(
      'gst_percentage',
      item.gstPercentage ? item.gstPercentage : item.gst_percentage
    );
    setValue(
      'min_order_amount',
      item.minOrderAmount ? item.minOrderAmount : item.min_order_amount
    );
    setValue(
      'delivery_fee',
      item.deliveryFee ? item.deliveryFee : item.delivery_fee
    );
    setValue(
      'development_domain',
      item.developmentDomain ? item.developmentDomain : item.development_domain
    );
    setValue(
      'live_domain',
      item.liveDomain ? item.liveDomain : item.live_domain
    );
    setValue('facebook', item.facebook);
    setValue('instagram', item.instagram);
    setValue('linkedin', item.linkedin);
    setValue('twitter', item.twitter);
    setValue('youtube', item.youtube);
    setValue('whatsapp', item.whatsapp);
    setColor1(item.color1);
    setColor2(item.color2);
    setColor3(item.color3);
  };

  const onSubmit = (data: Setting) => {
    if (listingRolePermission(dataRole, 'Setting Update')) {
      setIsLoader(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('desc', data.name);
      formData.append('gst_percentage', data.gst_percentage);
      formData.append('email', data.email);
      formData.append('min_order_amount', data.min_order_amount);
      formData.append('delivery_fee', data.delivery_fee);
      formData.append('development_domain', data.development_domain);
      formData.append('live_domain', data.live_domain);
      formData.append('facebook', detail ? detail.facebook : '');
      formData.append('instagram', detail ? detail.instagram : '');
      formData.append('linkedin', detail ? detail.linkedin : '');
      formData.append('twitter', detail ? detail.twitter : '');
      formData.append('youtube', detail ? detail.youtube : '');
      formData.append('whatsapp', detail ? detail.whatsapp : '');
      formData.append('updated_by', authState.user.id);
      formData.append('color1', color1);
      formData.append('color2', color2);
      formData.append('color3', color3);
      if (file !== null) formData.append('logo', file);

      Service.updateService(
        authState.user.tenant,
        authState.user.tenantConfig,
        formData
      ).then((item: any) => {
        const { success, message, data: itemData } = item.data;
        if (success) {
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
      });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Setting View')) {
      Service.getService(authState.user.tenantConfig).then((item: any) => {
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
      });
    }
    if (listingRolePermission(dataRole, 'Setting Address')) {
      Service.getAddressService(authState.user.tenant).then((item: any) => {
        if (item.data.success) {
          setAddress(item.data.data);
        }
      });
    }
  }, [authState]);

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
              <div className="flex items-center">
                <div className="FormField mb-4 w-[150px]">
                  <DragDropFile setFile={setFile} />
                </div>
                {detail && detail.logo && (
                  <div className="mb-4 mt-[0.75rem] ml-4 h-[142px] w-[150px] rounded-md">
                    <img
                      className="h-full w-full rounded-md"
                      src={detail.logo}
                      alt="Shop Logo"
                    />
                  </div>
                )}
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">App Name</label>
                  <Input
                    className="FormInput"
                    id="name"
                    placeholder="UrLaundry"
                    disableUnderline
                    {...register('name', { value: detail ? detail.name : '' })}
                  />
                </FormControl>
              </div>
              <div className="FormFields mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Contact Email</label>
                  <Input
                    className="FormInput"
                    id="email"
                    placeholder="warning@urlaundry.com"
                    disableUnderline
                    {...register('email', {
                      value: detail ? detail.email : '',
                    })}
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Tax</label>
                  <Input
                    className="FormInput"
                    id="gst_percentage"
                    placeholder="1%"
                    disableUnderline
                    {...register('gst_percentage', {
                      value: detail ? detail.gst_percentage : '',
                    })}
                  />
                </FormControl>
              </div>
              <div className="FormFields mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Min order Amount</label>
                  <Input
                    className="FormInput"
                    id="min_order_amount"
                    placeholder="$1.00"
                    disableUnderline
                    {...register('min_order_amount', {
                      value: detail ? detail.min_order_amount : '',
                    })}
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Delivery fee</label>
                  <Input
                    className="FormInput"
                    id="name"
                    placeholder="$1.00"
                    disableUnderline
                    {...register('delivery_fee', {
                      value: detail ? detail.delivery_fee : '',
                    })}
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Development Domain</label>
                  <Input
                    className="FormInput"
                    id="development_domain"
                    value={`${DOMAIN_PROTOCOL}${detail ? detail.development_domain : 'abc'}${DOMAIN_PREFIX}`}
                    disableUnderline
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Live Domain</label>
                  <Input
                    className="FormInput"
                    id="live_domain"
                    value={`${DOMAIN_PROTOCOL}${detail ? detail.live_domain : 'abc'}${DOMAIN_PREFIX}`}
                    disableUnderline
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Social Links</label>
                  <div className="mt-2 flex flex-row items-center gap-3">
                    {detail && detail.facebook && (
                      <Item
                        key={detail.facebook}
                        value={detail.facebook}
                        name={FACEBOOK as AssetsImages}
                      />
                    )}
                    {detail && detail.instagram && (
                      <Item
                        key={detail.instagram}
                        value={detail.instagram}
                        name={INSTAGRAM as AssetsImages}
                      />
                    )}
                    {detail && detail.linkedin && (
                      <Item
                        key={detail.linkedin}
                        value={detail.linkedin}
                        name={LINKEDIN as AssetsImages}
                      />
                    )}
                    {detail && detail.twitter && (
                      <Item
                        key={detail.twitter}
                        value={detail.twitter}
                        name={TWITTER as AssetsImages}
                      />
                    )}
                    {detail && detail.youtube && (
                      <Item
                        key={detail.youtube}
                        value={detail.youtube}
                        name={YOUTUBE as AssetsImages}
                      />
                    )}
                    {detail && detail.whatsapp && (
                      <Item
                        key={detail.whatsapp}
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
