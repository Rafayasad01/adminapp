/* eslint-disable prettier/prettier */
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';

function TopBar(_TopBarProps: any) {
  // console.log(title, isNestedRoute);

  const userData = useAppSelector((state: any) => state?.authState?.user);
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());
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

  useEffect(() => {
    // Update the time every second
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 mx-0 w-[92.5%] bg-[#f5f5f5]">
        <div className="mb-4 flex w-[100%] items-center justify-between px-2 pb-1 pt-2">
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
                {/* <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-[20px] border-none bg-white px-2 py-1 text-[14px] outline-none focus-visible:ring-0"
              /> */}
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
                <div className="h-[35px] w-[100px] rounded-[20px] bg-white p-2 text-center hover:bg-[#ccc]">
                  <span className="block text-[12px] font-medium leading-normal text-secondary">
                    {dayjs(time).format('hh:mm A')}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="w-[100px]  rounded-[20px]  text-center">
                  <span className="block w-full text-left text-[10px] font-medium capitalize leading-normal text-secondary">
                    {dayjs().format('D MMMM, dddd')}{' '}
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
      <div className="pt-[110px]" />
    </>
  );
}

export default TopBar;
