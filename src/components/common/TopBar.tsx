/* eslint-disable prettier/prettier */
import { Button, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
// import { setLogo, setRemoveItemState } from '../../redux/features/appSlice';
// import { logout, setShopAdminTenant } from '../../redux/features/authSlice';
// import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
// import { useAppSelector } from '../../redux/redux-hooks';

type TopBarProps = {
  title?: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute }: TopBarProps) {
  console.log(title, isNestedRoute);

  const userData = useAppSelector((state: any) => state?.authState?.user);
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      setGreeting('Good morning');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  // const ProfileAvatar = useAppSelector(
  //   (state: any) => state?.persistedReducer?.appState?.profileAvatar
  // );
  // console.log("PRAV", ProfileAvatar);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const [
    ,
    // profileToggler
    setProfileToggler,
  ] = useState(false);
  // const backHandler = () => {
  //   navigate(-1);
  // };

  // const logOut = () => {
  //   dispatch(logout());
  //   dispatch(setRemoveItemState());
  //   dispatch(setShopAdminTenant(null));
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
    // <AppBar
    //   position="relative"
    //   className="w-full bg-transparent px-0 pb-0 pt-4 text-gray-50 shadow-none"
    // >
    //   <Toolbar className="toolbar-style container relative mx-auto flex">
    //     {isNestedRoute ? (
    //       <IconButton
    //         className="back-btn left-0 mr-2  p-0 pr-5"
    //         onClick={backHandler}
    //       >
    //         <BackArrowIcon />
    //       </IconButton>
    //     ) : null}
    //     <div className="container mx-auto flex items-center justify-between">
    //       <div className="title ml-1">{title}</div>
    //       {/* <div className="flex-grow">&nbsp;</div> */}
    //       <div className="flex items-center text-cyan-900">
    //         {/* <IconButton className="icon-btn mr-3.5 p-0">
    //         <NotificationsNoneIcon />
    //       </IconButton> */}
    //         {userData?.isSuperAdmin && (
    //           <div className="flex items-center">
    //             <span className="px-2 text-sm font-semibold">Super Admin</span>
    //             <hr className="divider vertical ml-2" />
    //           </div>
    //         )}
    //         {userData?.tenantName && (
    //           <div className="flex items-center">
    //             <span className="px-2 text-sm font-semibold capitalize">
    //               {userData?.tenantName}
    //             </span>
    //             <ShopIcon color="black" />
    //             <hr className="divider vertical ml-4" />
    //           </div>
    //         )}
    //         <div
    //           ref={divRef}
    //           className="header-user-box ml-3.5 cursor-pointer"
    //           onClick={() => setProfileToggler(!profileToggler)}
    //         >
    //           <span className="capitalize">{`${userData.firstName} ${userData.lastName}`}</span>
    //           {ProfileAvatar ? (
    //             <Avatar
    //               sx={{ width: 56, height: 56 }}
    //               alt="user image"
    //               src={ProfileAvatar}
    //             />
    //           ) : userData?.avatar ? (
    //             <Avatar
    //               sx={{ width: 56, height: 56 }}
    //               alt="user image"
    //               src={userData.avatar}
    //             />
    //           ) : (
    //             <Avatar
    //               sx={{ bgcolor: 'black', fontSize: '18px' }}
    //             >{`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(
    //               0
    //             )}`}</Avatar>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </Toolbar>
    //   {profileToggler && (
    //     <div
    //       className={`absolute flex w-[98%] items-end justify-end ${
    //         userData?.isSuperAdmin === false ? 'h-[135px]' : 'h-[105px] '
    //       } z-10`}
    //     >
    //       <div className="rounded-md bg-white p-1 shadow-lg xl:w-[17%] 2xl:w-[11%]">
    //         {userData?.isSuperAdmin === false && (
    //           <div
    //             onClick={() =>
    //               navigate('/admin/dashboard/profile', { replace: true })
    //             }
    //             className="topbar-dd flex cursor-pointer items-center rounded-md p-1 text-sm text-black"
    //           >
    //             <PersonOutlineOutlinedIcon className="w-4" />
    //             <p className="mx-2">View Profile</p>
    //           </div>
    //         )}
    //         <div
    //           className={`topbar-dd flex items-center rounded-md text-sm text-black ${
    //             userData?.isSuperAdmin === false && 'mt-1'
    //           }  p-1`}
    //         >
    //           <NavLink
    //             className="logout-link w-full"
    //             to="/admin"
    //             onClick={() =>    ()}
    //           >
    //             <LogoutOutlinedIcon className="w-4" />
    //             <span className="mx-2">Logout</span>
    //           </NavLink>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </AppBar>
    <div className="bg-[#f5f5f5]">
      <div className="mb-6 flex w-full items-center justify-between px-2 pb-4 pt-2">
        {/* <div className='basis-[10%]'>
          <div className="max-w-[80px]">
            <img src={assets.images.logo} alt="logo" />
          </div>

        </div> */}
        <div className="basis-[50%] px-4">
          <span className="block text-[32px] font-medium capitalize leading-normal text-secondary">
            Hello {userData?.firstName && userData?.firstName}
          </span>
          <span className="block text-[14px] font-medium capitalize leading-normal text-secondary">
            {greeting}
          </span>
        </div>
        <div className="basis-[50%]">
          <div className="  flex items-center justify-between gap-4">
            <div className="w-full">
              <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-[20px] border-none bg-white px-2 py-1 text-[14px] outline-none focus-visible:ring-0"
              />
            </div>
            <div className="px-2">
              <Button className="h-[40px] min-w-[40px] rounded-[20px] bg-white p-2 hover:bg-[#ccc]">
                <img
                  src={assets.images.bellIcon}
                  alt="bellIcon"
                  className="h-full w-full object-contain"
                />
              </Button>
            </div>
            <div className="px-2">
              <div className="h-[40px] w-[100px] rounded-[20px] bg-white p-2 text-center hover:bg-[#ccc]">
                <span className="block text-[12px] font-medium leading-normal text-secondary">
                  12:20 PM
                </span>
              </div>
            </div>
            <div className="px-2">
              <div className="w-[100px]  rounded-[20px]  text-center">
                <span className="block w-full text-left text-[10px] font-medium capitalize leading-normal text-secondary">
                  25 June, Tuesday{' '}
                </span>
                <div className=" flex items-end justify-between gap-1">
                  <span className="block max-w-[50px] text-[14px] font-medium leading-normal text-secondary">
                    Cloudy 30℃
                  </span>
                  <img
                    src={assets.images.cloudIcon}
                    alt="icon"
                    className="h-[30px] w-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
