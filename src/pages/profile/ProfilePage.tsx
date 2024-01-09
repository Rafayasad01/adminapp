import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TopBar from '../../components/common/TopBar';
import assets from '../../assets';
import ProfileChangePasswordPopup from './ProfileChangePasswordPopup';
import MarkersMap from '../../components/common/MarkersMap';
import { Marker } from '../../interfaces/map.interface';
import ProfileEditPopup from './ProfileEditPopup';
import { useAppSelector } from '../../redux/redux-hooks';
import { listingRolePermission } from '../../utils/helper';
import Service from '../../services/adminapp/adminProfile';
import Notify from '../../components/common/Notify';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import dayjs from 'dayjs';

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
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector((state: any) => state?.persisitReducer?.roleState?.role?.permissions);
  const [changePassword, setChangePassword] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    // setIsLoader(true);
    if (listingRolePermission(dataRole, 'Banners List')) {
      Service.getProfile(authState.user.id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setDetail(item.data.data)
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
      setIsLoader(false);
    }
    // setMarkers(data);
  }, []);

  const updateProfileHandler = (data: any) => {
    if (listingRolePermission(dataRole, 'Banners List')) {
      const formData = new FormData();
      formData.append('id', authState.user.id);
      formData.append('address', data.address);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('country', data.country);
      formData.append('phone', data.phone);
      formData.append('state', data.state);
      formData.append('zipCode', data.zipCode);
      formData.append('city', data.city);
      data.avatar && formData.append('avatar', data.avatar);
      Service.updateProfile(formData)
        .then((item: any) => {
          if (item.data.success) {
            setDetail(item.data.data);
            setIsLoader(false);
            setOpenFormDialog(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
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
      setIsLoader(false);
    }
  }

  const updatePasswordHandler = (data: any) => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Banners List')) {
      let NewPass = {
        id: authState.user.id,
        currentParole: data.currentPassword,
        newParole: data.newPassword
      }
      Service.newPassword(NewPass)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setChangePassword(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
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
      setIsLoader(false);
    }
  }

  return (isLoader ? <Loader /> :
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Profile Detail" />
      <div className="container mt-5 m-auto">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-4 min-h-[640px] rounded-lg bg-white px-4 py-5 shadow-lg">
            <div className="flex w-full items-center">
              <img
                src={detail?.avatar ? detail?.avatar : assets.tempImages.avatarCustomer}
                alt=""
                className="mr-4 h-[100px] w-[100px] rounded-full border-2 p-1"
              />
              <div className='flex justify-between items-start w-full'>
                <div className="flex flex-col justify-start justify-items-center">
                  <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                    {detail?.firstName} {detail?.lastName}
                  </span>
                  <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                    {dayjs(detail?.updatedDate).isValid()
                      ? dayjs(detail?.updatedDate)?.format(
                        'ddd, MMM DD, YYYY hh:mm:ssA'
                      )
                      : '--'}
                  </span>
                  <Button
                    variant="text"
                    className="font-sm justify-start bg-transparent p-0 font-open-sans text-sm capitalize text-[#1A1A1A]"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password
                  </Button>
                </div>
                <div className='mt-2 cursor-pointer' onClick={() => setOpenFormDialog(true)}>
                  <EditIcon className='w-5' />
                </div>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex w-full flex-col">
              <div className='flex justify-between items-center'>
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.email}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Phone
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.tenantExt?.phone}
                  </span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Zip Code
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.tenantExt?.zipCode}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Country
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.tenantExt?.country}
                  </span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    City
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.tenantExt?.city}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    State
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.tenantExt?.state}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address4
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  {detail?.tenantExt?.address}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-8 min-h-[640px] rounded-lg bg-white shadow-lg">
            <MapAddress address={detail?.tenantExt?.address} zoom={10} />
          </div>
        </div>
      </div>
      <ProfileChangePasswordPopup
        changePassword={changePassword}
        setChangePassword={setChangePassword}
        callback={updatePasswordHandler}
        setIsNotify={setIsNotify}
        setNotifyMessage={setNotifyMessage}
      />
      {openFormDialog &&
        <ProfileEditPopup
          callback={updateProfileHandler}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          formData={detail}
        />
      }
    </>
  );
}

export default ProfilePage;
