import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TopBar from '../../components/common/TopBar';
import assets from '../../assets';
import ProfileChangePasswordPopup from './ProfileChangePasswordPopup';
import MarkersMap from '../../components/common/MarkersMap';
import { Marker } from '../../interfaces/map.interface';

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

function ProfilePage() {
  const [changePassword, setChangePassword] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    setMarkers(data);
  }, []);

  return (
    <>
      <ProfileChangePasswordPopup
        changePassword={changePassword}
        setChangePassword={setChangePassword}
      />
      <TopBar isNestedRoute title="Customer Detail" />
      <div className="container mt-5">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-4 min-h-[640px] rounded-lg bg-white px-4 py-5 shadow-lg">
            <div className="flex w-full items-center">
              <img
                src={assets.tempImages.avatarCustomer}
                alt=""
                className="mr-4 h-[100px] w-[100px] rounded-full"
              />
              <div className="flex flex-col justify-start justify-items-center">
                <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                  John S. Phillips
                </span>
                <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                  481872
                </span>
                <Button
                  variant="text"
                  className="font-sm justify-start bg-transparent p-0 font-open-sans text-sm capitalize text-[#1A1A1A]"
                  onClick={() => setChangePassword(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-col">
                <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Email
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  JohnSPhillips@dayrep.com
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Phone
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  +1 218 319 7750
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Postal code
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  00501
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address1
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address2
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address3
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address4
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address5
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-8 min-h-[640px] rounded-lg bg-white shadow-lg">
            <MarkersMap markers={markers} zoom={10} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
