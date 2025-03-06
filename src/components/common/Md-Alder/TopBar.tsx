/* eslint-disable prettier/prettier */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// import  { blac } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/redux-hooks';
import BackArrowIcon from '../../icons/BackArrowIcon';

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
  // const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [profileToggler, setProfileToggler] = useState(false);
  const backHandler = () => {
    navigate(-1);
  };

  // const logOut = () => {
  //   dispatch(logout());
  //   dispatch(setRemoveItemState());
  //   dispatch(setLogo(null));
  //   dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  //   // dispatch(setSystemConfig(null));
  // };

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
      className="w-full bg-transparent px-0  pb-0 text-secondary2 shadow-none"
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
        <div className="w-100 flex items-center justify-between">
          <div className="title m-3 font-an-gurmukhi text-secondary2">
            {title}
          </div>

          <div className="flex w-1/3 justify-end text-left">
            <div className="">
              <div className="flex items-center">
                <div
                  ref={divRef}
                  className="header-user-box w-full cursor-pointer"
                  onClick={() => setProfileToggler(!profileToggler)}
                >
                  {ProfileAvatar ? (
                    <Avatar
                      className="rounded-md"
                      sx={{ width: 45, height: 45 }}
                      alt="user image"
                      src={ProfileAvatar}
                    />
                  ) : userData?.avatar ? (
                    <Avatar
                      className="rounded-md"
                      sx={{ width: 45, height: 45 }}
                      alt="user image"
                      src={userData.avatar}
                    />
                  ) : (
                    <Avatar
                      className="rounded-md"
                      sx={{
                        bgcolor: '#3800F1',
                        fontSize: '20px',
                        width: 45,
                        height: 45,
                      }}
                    >{`${userData.firstName?.charAt(
                      0
                    )}${userData.lastName?.charAt(0)}`}</Avatar>
                  )}

                  <span className="mx-3 capitalize text-secondary2">
                    {' '}
                    <span className="alder-greetings my-[2px] block text-xs text-secondary2">
                      Morning!
                    </span>{' '}
                    {`${userData.firstName} ${userData.lastName}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
      {/* {profileToggler && (
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
      )} */}
    </AppBar>
  );
}

export default TopBar;
