import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppUser';
import PermissionPopup from '../../utils/PermissionPopup';
import { weekDays } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import AppUserAddressTabPage from './AppUserAddressTab/AppUserAddressTabPage';
import AppUserScheduleTabPage from './AppUserScheduleTab/AppUserScheduleTabPage';

function AppUserDetailPage() {
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  // const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  const [filteredWeekDays, setFilteredWeekDays] = useState<any>(null);
  // const [total, setTotal] = useState(0);
  // const [list, setList] = useState<any>([]);
  const [address, setAddress] = useState<string>('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this driver address ?'
  );
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [emptyVariable] = useState(null);

  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [selectedTab, setSelectedTab] = useState('ADDRESS');

  const { appuserId } = useParams();

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Driver Address Detail')) {
      Service.appUserDetails(appuserId)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setDetail(item.data.data);
            const filterWeekDays = weekDays.filter(
              (day) =>
                !item.data.data.appDriverWorkingSchedule.some(
                  (scheduleDay: any) => scheduleDay.workDay === day.name
                )
            );
            setFilteredWeekDays(filterWeekDays);
            if (
              item.data.data.appUserAddress &&
              item.data.data.appUserAddress.length > 0
            ) {
              const activeAddress = item.data.data.appUserAddress.filter(
                (newItem: any) => newItem.isActive === true
              );
              if (activeAddress.length > 0) {
                // console.log(activeAddress[0].address);
                setAddress(activeAddress[0].address);
              }
              // setList(item.data.data.appUserAddress.reverse());
              // setTotal(Number(item.data.data.total));
            }
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
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Details" />
      {detail && (
        <div className="container m-auto mt-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
              <div className="flex w-full items-center">
                {detail.avatar ? (
                  <img
                    src={detail.avatar}
                    alt=""
                    className="mr-4 w-[100px] rounded-full"
                  />
                ) : (
                  <Avatar
                    className="avatar flex flex-row items-center"
                    sx={{
                      bgcolor: '#1D1D1D',
                      width: 100,
                      height: 100,
                      textTransform: 'uppercase',
                      fontSize: '25px',
                      marginRight: '10px',
                    }}
                  >
                    {detail.firstName.charAt(0)}
                    {detail.lastName.charAt(0)}
                  </Avatar>
                )}
                <div className="flex flex-col justify-start justify-items-center">
                  <span className="font-open-sans text-xl font-semibold text-secondary">
                    {`${detail.firstName} ${detail.lastName}`}
                  </span>
                  <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                    {detail.phone}
                  </span>
                  <span
                    className={`font-sm mt-2 font-open-sans text-sm ${
                      detail.isActive ? 'text-[#29CC97]' : 'text-[#f50057]'
                    }`}
                  >
                    {detail.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Divider className="mt-4" />
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.email}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                    User Type
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.userType}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                    Availibility
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.status}
                  </span>
                </div>
                {detail?.userType === 'Driver' && (
                  <div className="flex w-full flex-col">
                    <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                      License Number
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.appUserDriverExt.licenseNumber}
                    </span>
                  </div>
                )}
                {detail?.postalCode && (
                  <div className="flex w-full flex-col">
                    <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                      Postal Code
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.postalCode}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-8 min-h-[375px] rounded-lg bg-[#fff] shadow-lg">
              <MapAddress address={address} zoom={15} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-12">
            <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
              {detail?.userType === 'Driver' && (
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab
                    label="address"
                    value="ADDRESS"
                    // onClick={() => navigate(`./detail/${appuserId}`)}
                  />
                  <Tab
                    label="Schedule"
                    value="SCHEDULE"
                    // onClick={() => navigate('../shop')}
                  />
                </Tabs>
              )}
              {selectedTab === 'ADDRESS' && (
                <AppUserAddressTabPage
                  addressList={detail?.appUserAddress}
                  appUserId={appuserId}
                  setAddress={setAddress}
                />
              )}
              {selectedTab === 'SCHEDULE' && (
                <AppUserScheduleTabPage
                  appUserId={appuserId}
                  scheduleList={detail?.appDriverWorkingSchedule}
                  filteredWeekdays={filteredWeekDays}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={() => {}}
        />
      )}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={() => {}}
        />
      )}
    </>
  );
}

export default AppUserDetailPage;
