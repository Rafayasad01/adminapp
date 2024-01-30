import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import assets from '../../assets';
import TopBar from '../../components/common/TopBar';
import ProfileChangePasswordPopup from './ProfileChangePasswordPopup';
// import MarkersMap from '../../components/common/MarkersMap';
// import  { Marker } from '../../interfaces/map.interface';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
import { setProfileAvatar } from '../../redux/features/appStateSlice';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminProfile';
import { listingRolePermission } from '../../utils/helper';
import ProfileEditPopup from './ProfileEditPopup';

// const data = [
//   { name: 'Address1', lat: -33.890542, lng: 151.274856 },
//   { name: 'Address2', lat: -33.923036, lng: 151.259052 },
//   { name: 'Address3', lat: -34.028249, lng: 151.157507 },
//   {
//     name: 'Address4',
//     lat: -33.80010128657071,
//     lng: 151.28747820854187,
//   },
//   { name: 'Address5', lat: -33.950198, lng: 151.259302 },
// ];

function ProfilePage() {
  const dispatch = useDispatch();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [changePassword, setChangePassword] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Banners List')) {
      Service.getProfile(authState.user.id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
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
    } else {
      setIsLoader(false);
    }
    // setMarkers(data);
  }, []);

  const updateProfileHandler = (dataEl: any) => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Banners List')) {
      const formData = new FormData();
      formData.append('id', authState.user.id);
      formData.append('address', dataEl.address);
      formData.append('firstName', dataEl.firstName);
      formData.append('lastName', dataEl.lastName);
      formData.append('country', dataEl.country);
      formData.append('phone', dataEl.phone);
      formData.append('state', dataEl.state);
      formData.append('zipCode', dataEl.zipCode);
      formData.append('city', dataEl.city);
      dataEl.avatar && formData.append('avatar', dataEl.avatar);
      Service.updateProfile(formData)
        .then((item: any) => {
          if (item.data.success) {
            setDetail(item.data.data);
            // console.log(item.data.data);
            dispatch(setProfileAvatar(item.data.data.avatar));
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
  };

  const updatePasswordHandler = (dataItems: any) => {
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Banners List')) {
      const NewPass = {
        id: authState.user.id,
        currentParole: dataItems.currentPassword,
        newParole: dataItems.newPassword,
      };
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
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Profile Detail" />
      <div className="container m-auto mt-5">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="min-h-[640px] rounded-lg bg-white px-4 py-5 shadow-lg xl:col-span-5 2xl:col-span-4">
            <div className="flex w-full items-center">
              <img
                src={
                  detail?.avatar
                    ? detail?.avatar
                    : assets.tempImages.avatarCustomer
                }
                alt=""
                className="mr-4 h-[100px] w-[100px] rounded-full border-2 p-1"
              />
              <div className="flex w-full items-start justify-between">
                <div className="flex flex-col justify-start justify-items-center">
                  <span className="font-open-sans text-xl font-semibold text-secondary">
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
                    className="font-sm justify-start bg-transparent p-0 font-open-sans text-sm capitalize text-secondary"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password
                  </Button>
                </div>
                <div
                  className="mt-2 cursor-pointer"
                  onClick={() => setOpenFormDialog(true)}
                >
                  <EditIcon className="w-5" />
                </div>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.email ?? '--'}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                    Phone
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.phone ?? '--'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                    Country
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.country ?? '--'}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                    State
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.state ?? '--'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                    City
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.city ?? '--'}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                    Zip Code
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail?.zipCode ?? '--'}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-4 font-open-sans text-base font-semibold text-secondary">
                  Address
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  {detail?.address ?? '--'}
                </span>
              </div>
            </div>
          </div>
          <div className="min-h-[640px] rounded-lg bg-white shadow-lg xl:col-span-7 2xl:col-span-8">
            <MapAddress address={detail?.address} zoom={10} />
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
      {openFormDialog && (
        <ProfileEditPopup
          callback={updateProfileHandler}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          formData={detail}
        />
      )}
    </>
  );
}

export default ProfilePage;
