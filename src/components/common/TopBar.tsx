/* eslint-disable prettier/prettier */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import { blac } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import BackArrowIcon from '../icons/BackArrowIcon';
import ShopIcon from '../icons/ShopIcon';
import { useAppSelector } from '../../redux/redux-hooks';
import { logout } from '../../redux/features/authStateSlice';
import { setItemState, setLogo } from '../../redux/features/appStateSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';

type Props = {
  title?: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute = false }: Props) {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [profileToggler, setProfileToggler] = useState(false);
  const backHandler = () => {
    navigate(-1);
  };

  const logOut = () => {
    dispatch(logout());
    dispatch(setItemState(null));
    dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
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
  }, [])

  return (
    <AppBar
      position="relative"
      className="w-full bg-transparent pt-4 pb-0 px-0 text-gray-50 shadow-none"
    >
      <Toolbar className="toolbar-style flex relative container mx-auto">
        {isNestedRoute ? (
          <IconButton className="back-btn mr-2 p-0  left-0 pr-5" onClick={backHandler}>
            <BackArrowIcon />
          </IconButton>
        ) : null}
        <div className='container mx-auto flex justify-between items-center'>

       
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
          {userData?.tenantName && (
            <div className="flex items-center">
              <span className="px-2 text-sm font-semibold">
                {userData?.tenantName}
              </span>
              <ShopIcon color="black" />
              <hr className="divider vertical ml-4" />
            </div>
          )}
          <div ref={divRef} className="header-user-box ml-3.5 cursor-pointer" onClick={() => setProfileToggler(!profileToggler)}>
            <span>{`${userData.firstName} ${userData.lastName}`}</span>
            {userData?.avatar ? (
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt="user image"
                src={userData.avatar}
              />
            ) : (
              <Avatar
                sx={{ bgcolor: 'black', fontSize: '18px' }}
              >{`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(
                0
              )}`}</Avatar>
            )}
          </div>
          </div>
        </div>
      </Toolbar>
      {profileToggler &&
        <div className='flex items-end justify-end absolute w-[98%] h-[135px] z-10'>
          <div className='bg-white 2xl:w-[11%] xl:w-[17%] p-1 rounded-md shadow-lg'>
            <div onClick={() => navigate('/admin/dashboard/profile', { replace: true })} className='p-1 topbar-dd rounded-md text-black text-sm flex items-center cursor-pointer'>
              <PersonOutlineOutlinedIcon className='w-4' />
              <p className='mx-2'>View Profile</p>
            </div>
            <div className='text-black text-sm flex items-center topbar-dd rounded-md mt-1 p-1'>
              <NavLink
                className="logout-link w-full"
                to="/admin"
                onClick={() => logOut()}
              >
                <LogoutOutlinedIcon className="w-4" />
                <span className='mx-2'>Logout</span>
              </NavLink>
            </div>
          </div>
        </div>
      }
    </AppBar>
  );
}

export default TopBar;
