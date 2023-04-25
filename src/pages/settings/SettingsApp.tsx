import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import DragDropFile from './DragDropFile';
import MarkersMap from '../../components/common/MarkersMap';
import { Marker } from '../../interfaces/map.interface';
import PlusIcon from '../../components/icons/PlusIcon';
import { SocialMedia } from '../../interfaces/app.interface';
import SocialLinksPopup from './SocialLinksPopup';
import Link from '@mui/material/Link';

import '../../assets/css/PopupStyle.css';
import assets from '../../assets';

const data = [
  { name: 'Address1', lat: -33.890542, lng: 151.274856 },
  { name: 'Address2', lat: -33.923036, lng: 151.259052 },
  { name: 'Address3', lat: -34.028249, lng: 151.157507 },
  {
    name: 'Address4',
    lat: -33.80010128657071,
    lng: 151.28747820854187,
  },
  { name: 'Address5', lat: -33.950198, lng: 151.259302 },
];

const socialIconList = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  linkedIn: '',
  twitter: 'https://twitter.com',
  youTube: '',
  whatsApp: 'https://whatsapp.com',
};
function Item(props: any) {
  return (
    <Link href={props.value} underline="none" target="_blank">
      <img src={assets.images[props.name]} alt="" />
    </Link>
  );
}

function SettingsApp() {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState<Marker[]>(data);
  const [socialIcons, setSocialIcons] = useState<SocialMedia>({});
  const [socialLinks, setSocialLinks] = useState(false);
  useEffect(() => {
    setSocialIcons(socialIconList);
  }, []);
  return (
    <>
      <SocialLinksPopup
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
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
                label="Shop Scheduling"
                value="SHOP_SCHEDULING"
                onClick={() => navigate('../shop')}
              />
            </Tabs>
          </div>
          <div className="Content w-full py-5 px-4">
            <div className="FormField mb-4 w-[150px]">
              <DragDropFile />
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">App Name</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="UrLaundry"
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="FormFields mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Contact Email</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="info@urlaundry.com"
                  disableUnderline
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Tax</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="13%"
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="FormFields mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Min order Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="$49.00"
                  disableUnderline
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Delivery fee</label>
                <Input
                  className="FormInput"
                  id="name"
                  value=""
                  name="name"
                  placeholder="$05.00"
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Social Links</label>
                <div className="mt-2 flex flex-row items-center gap-3">
                  {Object.entries(socialIcons).map(([key, value]) =>
                    value ? <Item key={key} value={value} name={key} /> : ''
                  )}
                  <IconButton
                    className="p-0 text-[1.675rem]"
                    onClick={() => setSocialLinks(true)}
                  >
                    <PlusIcon />
                  </IconButton>
                </div>
              </FormControl>
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Theme Color</label>
                <div className="h-10 w-10 rounded-full bg-[#1D1D1D]">
                  &nbsp;
                </div>
              </FormControl>
            </div>
            <div className="FormField">
              <Button
                className="btn-black-fill flex justify-self-end"
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-6 min-h-[500px] rounded-lg bg-white shadow-lg">
          <MarkersMap markers={markers} zoom={10} />
        </div>
      </div>
    </>
  );
}

export default SettingsApp;
