/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
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
import { setItemState, setLogo } from '../../redux/features/appStateSlice';

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
  console.log('links', links);

  const filtered = links?.filter((el: string) => el !== null);
  if (filtered?.length < 6) {
    return <PlusIcon />;
  }
  return <EditIcon />;
}

function SettingsApp() {
  const dispatch = useDispatch();
  const authState: any = useAppSelector((state) => state.authState);
  const dataRole = useSelector(
    (state: any) => state.roleState.role.permissions
  );
  const navigate = useNavigate();
  const [openSocialMediaPopup, setOpenSocialMediaPopup] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);
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
      formData.append('gstPercentage', data.gstPercentage);
      formData.append('email', data.email);
      formData.append('minOrderAmount', data.minOrderAmount);
      formData.append('deliveryFee', data.deliveryFee);
      formData.append('facebook', detail ? detail.facebook : '');
      formData.append('instagram', detail ? detail.instagram : '');
      formData.append('linkedin', detail ? detail.linkedin : '');
      formData.append('twitter', detail ? detail.twitter : '');
      formData.append('youtube', detail ? detail.youtube : '');
      formData.append('whatsapp', detail ? detail.whatsapp : '');
      formData.append('updatedBy', authState.user.id);
      formData.append('color1', color1);
      formData.append('color2', color2);
      formData.append('color3', color3);
      if (file !== null) formData.append('logo', file);

      Service.updateService(authState.user.tenant, formData).then(
        (item: any) => {
          const { success, message, data: itemData } = item.data;
          if (success) {
            dispatch(setLogo(itemData.logo));
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
        }
      );
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Setting View')) {
      Service.getService(authState.user.tenant).then((item: any) => {
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

  console.log('detail', file);

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
                  <DragDropFile setFile={setFile} setImg={setSelectedImg} />
                </div>
                {selectedImg ? (
                  <div className="flex h-[50px] w-[30%] items-center justify-end">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={selectedImg}
                      alt="Shop Logo"
                    />
                  </div>
                ) : detail && detail.logo ? (
                  <div className="flex h-[50px] w-[30%] items-center justify-end">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={detail.logo}
                      alt="Shop Logo"
                    />
                  </div>
                ) : null}
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
                    {...register('gstPercentage', {
                      value: detail ? detail.gstPercentage : '',
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
                    {...register('minOrderAmount', {
                      value: detail ? detail.minOrderAmount : '',
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
                    {...register('deliveryFee', {
                      value: detail ? detail.deliveryFee : '',
                    })}
                  />
                </FormControl>
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
