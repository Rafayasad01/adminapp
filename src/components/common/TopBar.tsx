/* eslint-disable prettier/prettier */
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setRemoveItemState } from '../../redux/features/appSlice';
import { logout, setShopAdminTenant } from '../../redux/features/authSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import { useAppSelector } from '../../redux/redux-hooks';
import BackArrowIcon from '../icons/BackArrowIcon';
import ShopIcon from '../icons/ShopIcon';
import { removeItem } from '../../utils/storage';

type TopBarProps = {
  title?: string;
  isNestedRoute?: boolean;
  isAdditionalRoute?: string | any;
};

function TopBar({
  title,
  isNestedRoute = false,
  isAdditionalRoute,
}: TopBarProps) {
  // const branchData: any = getItem('BRANCH_DATA');
  // console.log('🚀 ~ branchData:', branchData);
  const branchState: any = useAppSelector(
    (state) => state?.persistedReducer?.appState?.branch
  );
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const ProfileAvatar = useAppSelector(
    (state: any) => state?.persistedReducer?.appState?.profileAvatar
  );
  // console.log("PRAV", ProfileAvatar);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [profileToggler, setProfileToggler] = useState(false);
  const backHandler = () => {
    if (isAdditionalRoute) navigate(-1);
    navigate(-1);
  };

  const logOut = () => {
    dispatch(logout());
    dispatch(setRemoveItemState());
    dispatch(setShopAdminTenant(null));
    // dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
    removeItem('AUTH_TOKEN');
    // dispatch(setSystemConfig(null));
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setProfileToggler(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position="relative"
      className="w-full bg-transparent px-0 pb-0 pt-4 text-gray-50 shadow-none"
    >
      <Toolbar className="toolbar-style container relative mx-auto flex">
        {isNestedRoute ? (
          <IconButton
            className="back-btn left-0 mr-2  p-0 pr-5"
            onClick={backHandler}
          >
            <BackArrowIcon />
          </IconButton>
        ) : null}
        <div className="container mx-auto flex items-center justify-between">
          <div className="title ml-1">{title}</div>
          {/* <div className="flex-grow">&nbsp;</div> */}
          <div className="flex items-center text-cyan-900">
            {/* <IconButton className="icon-btn mr-3.5 p-0">
            <NotificationsNoneIcon />
          </IconButton> */}
            {userData?.isSuperAdmin && (
              <div className="flex items-center">
                <span className="px-2 text-sm font-semibold">Super Admin</span>
                <hr className="divider vertical ml-2" />
              </div>
            )}
            {branchState?.name && (
              <div className="flex items-center">
                <span className="px-2 text-sm font-semibold capitalize">
                  {branchState?.name}
                </span>
                <ShopIcon color="black" />
                <hr className="divider vertical ml-4" />
              </div>
            )}
            <div
              ref={divRef}
              className="header-user-box ml-3.5 cursor-pointer"
              onClick={() => setProfileToggler(!profileToggler)}
            >
              <span className="capitalize">{`${userData?.firstName} ${userData?.lastName}`}</span>
              {ProfileAvatar ? (
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt="user image"
                  src={ProfileAvatar}
                />
              ) : userData?.avatar ? (
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt="user image"
                  src={userData.avatar}
                />
              ) : (
                <Avatar
                  sx={{ bgcolor: 'black', fontSize: '18px' }}
                >{`${userData?.firstName?.charAt(
                  0
                )}${userData?.lastName?.charAt(0)}`}</Avatar>
              )}
            </div>
          </div>
        </div>
      </Toolbar>
      {profileToggler && (
        <div
          className={`absolute flex w-[98%] items-end justify-end ${
            userData?.isSuperAdmin === false ? 'h-[135px]' : 'h-[105px] '
          } z-10`}
        >
          <div className="rounded-md bg-white p-1 shadow-lg xl:w-[17%] 2xl:w-[11%]">
            {userData?.isSuperAdmin === false && (
              <div
                onClick={() =>
                  navigate('/admin/dashboard/profile', { replace: true })
                }
                className="topbar-dd flex cursor-pointer items-center rounded-md p-1 text-sm text-black"
              >
                <PersonOutlineOutlinedIcon className="w-4" />
                <p className="mx-2">View Profile</p>
              </div>
            )}
            <div
              className={`topbar-dd flex items-center rounded-md text-sm text-black ${
                userData?.isSuperAdmin === false && 'mt-1'
              }  p-1`}
            >
              <NavLink
                className="logout-link w-full"
                to="/admin"
                onClick={() => logOut()}
              >
                <LogoutOutlinedIcon className="w-4" />
                <span className="mx-2">Logout</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </AppBar>
  );
}

export default TopBar;
