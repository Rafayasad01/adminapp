import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import DragDropFile from './DragDropFile';
import { Marker } from '../../interfaces/map.interface';
import PlusIcon from '../../components/icons/PlusIcon';
import { Setting, SocialMedia } from '../../interfaces/app.interface';
import SocialLinksPopup from './SocialLinksPopup';
import { useAppSelector } from '../../redux/redux-hooks';

import '../../assets/css/PopupStyle.css';
import assets from '../../assets';
import { useForm } from 'react-hook-form';
import ColorPicker from '../../components/common/ColorPicker';
import Service from '../../services/adminapp/admin';
import { FACEBOOK, INSTAGRAM, LINKEDIN, TWITTER, WHATSAPP, YOUTUBE } from '../../utils/constants';
import AlertBox from '../../utils/Alert';
import MapAddress from '../../components/common/MapAddress';

type AssetsImages = keyof typeof assets.images;

function Item(props: { value: any; name: AssetsImages }) {
  return (
    <Link href={props.value} underline="none" target="_blank">
      <img src={assets.images[props.name]} alt="" />
    </Link>
  );
}

function SettingsApp() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMedia | any>(null);
  const [openSocialMediaPopup, setOpenSocialMediaPopup] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [color1, setColor1] = useState<any>("#1A1A1A");
  const [color2, setColor2] = useState<any>("#1A1A1A");
  const [color3, setColor3] = useState<any>("#1A1A1A");
  const [detail, setDetail] = useState<any>(null);
  const [alertPopup, setAlertPopup] = useState<boolean>(false);
  const [alertSeverty, setAlertSeverty] = useState<string>('');
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [address, setAddress] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Setting>();
  const onSubmit = (data: Setting) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('color1', color1);
    formData.append('color2', color2);
    formData.append('color3', color3);
    formData.append('gst_percentage', data.gst_percentage);
    formData.append('email', data.email);
    formData.append('min_order_amount', data.min_order_amount);
    formData.append('delivery_fee', data.delivery_fee);
    formData.append('facebook', socialMediaLinks.facebook);
    formData.append('instagram', socialMediaLinks.instagram);
    formData.append('linkedin', socialMediaLinks.linkedin);
    formData.append('twitter', socialMediaLinks.twitter);
    formData.append('youtube', socialMediaLinks.youtube);
    formData.append('whatsapp', socialMediaLinks.whatsapp);
    formData.append('updated_by', authState.user.id);
    if (file !== null) formData.append('logo', file);

    Service.updateService(authState.user.tenantConfig, formData).then((item: any) => {
      if (item.data.success) {
        const socialIconList = {
          facebook: item.data.data.facebook === 'null' ? '' : item.data.data.facebook,
          instagram: item.data.data.instagram === 'null' ? '' : item.data.data.instagram,
          linkedin: item.data.data.linkedin === 'null' ? '' : item.data.data.linkedin,
          twitter: item.data.data.twitter === 'null' ? '' : item.data.data.twitter,
          youtube: item.data.data.youtube === 'null' ? '' : item.data.data.youtube,
          whatsapp: item.data.data.whatsapp === 'null' ? '' : item.data.data.whatsapp,
        };
        if (item.data.data.color1) setColor1(item.data.data.color1);
        if (item.data.data.color2) setColor1(item.data.data.color2);
        if (item.data.data.color3) setColor1(item.data.data.color3);
        setSocialMediaLinks(socialIconList);
        setDetail(item.data.data);
        setAlertMsg(item.data.message);
        setAlertSeverty('success');
        setAlertPopup(true);
      } else {
        setAlertMsg(item.data.message);
        setAlertSeverty('error');
        setAlertPopup(true);
      }
    });
  };


  useEffect(() => {
    Service.getService(authState.user.tenantConfig).then((item: any) => {
      if (item.data.success) {
        const socialIconList = {
          facebook: item.data.data.facebook === 'null' ? '' : item.data.data.facebook,
          instagram: item.data.data.instagram === 'null' ? '' : item.data.data.instagram,
          linkedin: item.data.data.linkedin === 'null' ? '' : item.data.data.linkedin,
          twitter: item.data.data.twitter === 'null' ? '' : item.data.data.twitter,
          youtube: item.data.data.youtube === 'null' ? '' : item.data.data.youtube,
          whatsapp: item.data.data.whatsapp === 'null' ? '' : item.data.data.whatsapp,
        };
        if (item.data.data.color1) setColor1(item.data.data.color1);
        if (item.data.data.color2) setColor2(item.data.data.color2);
        if (item.data.data.color3) setColor3(item.data.data.color3);
        setSocialMediaLinks(socialIconList);
        setDetail(item.data.data);
      }
    });
    Service.getAddressService(authState.user.tenant).then((item: any) => {
      if (item.data.success) {
        setAddress(item.data.data);
      }
    });
  }, []);

  return (
    <>
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
            {detail && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center">
                  <div className="FormField mb-4 w-[150px]">
                    <DragDropFile setFile={setFile} />
                  </div>
                  {detail.logo && (
                    <div className="mb-4 mt-[0.75rem] w-[150px] h-[142px] ml-4 rounded-md">
                      <img className="w-full h-full rounded-md" src={detail.logo} alt="Shop Logo" />
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
                      {...register('name', { value: detail.name })}
                    />
                  </FormControl>
                </div>
                <div className="FormFields mb-4">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Contact Email</label>
                    <Input
                      className="FormInput"
                      id="email"
                      placeholder="info@urlaundry.com"
                      disableUnderline
                      {...register('email', { value: detail.email })}
                    />
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Tax</label>
                    <Input
                      className="FormInput"
                      id="gst_percentage"
                      placeholder="1%"
                      disableUnderline
                      {...register('gst_percentage', { value: detail.gstPercentage })}
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
                      {...register('min_order_amount', { value: detail.minOrderAmount })}
                    />
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Delivery fee</label>
                    <Input
                      className="FormInput"
                      id="name"
                      placeholder="$1.00"
                      disableUnderline
                      {...register('delivery_fee', { value: detail.deliveryFee })}
                    />
                  </FormControl>
                </div>
                <div className="FormField mb-4">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Social Links</label>
                    <div className="mt-2 flex flex-row items-center gap-3">
                      {socialMediaLinks && socialMediaLinks.facebook && (
                        < Item
                          key={socialMediaLinks.facebook}
                          value={socialMediaLinks.facebook}
                          name={FACEBOOK as AssetsImages}
                        />
                      )}
                      {socialMediaLinks && socialMediaLinks.instagram && (
                        < Item
                          key={socialMediaLinks.instagram}
                          value={socialMediaLinks.instagram}
                          name={INSTAGRAM as AssetsImages}
                        />
                      )}
                      {socialMediaLinks && socialMediaLinks.linkedin && (
                        < Item
                          key={socialMediaLinks.linkedin}
                          value={socialMediaLinks.linkedin}
                          name={LINKEDIN as AssetsImages}
                        />
                      )}
                      {socialMediaLinks && socialMediaLinks.twitter && (
                        < Item
                          key={socialMediaLinks.twitter}
                          value={socialMediaLinks.twitter}
                          name={TWITTER as AssetsImages}
                        />
                      )}
                      {socialMediaLinks && socialMediaLinks.youtube && (
                        < Item
                          key={socialMediaLinks.youtube}
                          value={socialMediaLinks.youtube}
                          name={YOUTUBE as AssetsImages}
                        />
                      )}
                      {socialMediaLinks && socialMediaLinks.whatsapp && (
                        < Item
                          key={socialMediaLinks.whatsapp}
                          value={socialMediaLinks.whatsapp}
                          name={WHATSAPP as AssetsImages}
                        />
                      )}
                      <IconButton
                        className="p-0 text-[1.675rem]"
                        onClick={() => setOpenSocialMediaPopup(true)}
                      >
                        <PlusIcon />
                      </IconButton>
                    </div>
                  </FormControl>
                </div>
                <div className="FormMultipleFields mb-4">
                  <ColorPicker
                    colorPickerLabel="Color1"
                    colorPickerValue={color1}
                    setColorPickerValue={setColor1}
                    id="color1"
                  />
                  <ColorPicker
                    colorPickerLabel="Color2"
                    colorPickerValue={color2}
                    setColorPickerValue={setColor2}
                    id="color2"
                  />
                  <ColorPicker
                    colorPickerLabel="Color3"
                    colorPickerValue={color3}
                    setColorPickerValue={setColor3}
                    id="color3"
                  />
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
            )}
          </div>
        </div>
        <div className="col-span-6 min-h-[500px] rounded-lg bg-white shadow-lg">
          {address ? (
            <MapAddress address={address.address} zoom={10} />
          ) : (
            <div
              className="no-map-location"
            >
              <div className="content">
                <div className="icon">
                  <img className="w-100" src={assets.images.noMapLocation} alt="" />
                </div>
                <h4 className="text">Location not available</h4>
              </div>
            </div>
          )}

        </div>
      </div >
      {openSocialMediaPopup && (
        <SocialLinksPopup
          openDialog={openSocialMediaPopup}
          setOpenDialog={setOpenSocialMediaPopup}
          socialMediaLinks={socialMediaLinks}
          setSocialMediaLinks={setSocialMediaLinks}
        />
      )
      }
      {
        alertPopup && (
          <AlertBox
            msg={alertMsg}
            setSeverty={alertSeverty}
            alertOpen={alertPopup}
            setAlertOpen={setAlertPopup}
          />
        )
      }
    </>
  );
}

export default SettingsApp;
