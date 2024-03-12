/* eslint-disable prettier/prettier */
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// import  { blac } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Input, InputAdornment } from '@mui/material';
import {
  setLogo,
  setRemoveItemState,
} from '../../../redux/features/appStateSlice';
import { logout } from '../../../redux/features/authStateSlice';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';
import { useAppSelector } from '../../../redux/redux-hooks';
import BackArrowIcon from '../../icons/BackArrowIcon';
import ShopIcon from '../../icons/ShopIcon';

type Props = {
  title?: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute = false }: Props) {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const ProfileAvatar = useAppSelector(
    (state: any) => state?.persisitReducer?.appState?.profileAvatar
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [profileToggler, setProfileToggler] = useState(false);
  const backHandler = () => {
    navigate(-1);
  };

  const logOut = () => {
    dispatch(logout());
    dispatch(setRemoveItemState());
    dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
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
      className="w-full bg-transparent px-0  pb-0 text-gray-50 shadow-none"
    >
      <Toolbar className=" w-100 relative block px-0">
        {isNestedRoute ? (
          <IconButton
            className="back-btn left-0 mr-2  p-0 pr-5"
            onClick={backHandler}
          >
            <BackArrowIcon />
          </IconButton>
        ) : null}
        <div className=" w-100 flex items-center ">
          <div className="title ml-1 w-2/3">{title}</div>

          <div className="flex w-1/3 justify-end text-left">
            <div className="flex w-3/5  justify-end ">
              <FormControl className="w-full">
                <Input
                  type="text"
                  name="search_patient"
                  className="alder-search-patient"
                  placeholder="Search Patient"
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton>
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="w-2/5">
              <div className="items-right flex ">
                <div
                  ref={divRef}
                  className="header-user-box ml-3.5 w-full cursor-pointer"
                  onClick={() => setProfileToggler(!profileToggler)}
                >
                  {ProfileAvatar ? (
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt="user image"
                      variant="rounded"
                      src={ProfileAvatar}
                    />
                  ) : userData?.avatar ? (
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt="user image"
                      variant="rounded"
                      src={userData.avatar}
                    />
                  ) : (
                    <Avatar
                      sx={{ bgcolor: 'black', fontSize: '18px' }}
                    >{`${userData.firstName?.charAt(
                      0
                    )}${userData.lastName?.charAt(0)}`}</Avatar>
                  )}

                  <span className="capitalize">
                    {' '}
                    <span className="alder-greetings text-xs text-[#1E1C24]">
                      Morning!
                    </span>{' '}
                    <br /> {`${userData.firstName} ${userData.lastName}`}
                  </span>
                </div>
              </div>
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
