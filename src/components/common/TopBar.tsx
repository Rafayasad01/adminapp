/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

function TopBar(_TopBarProps: any) {
  const [time, setTime] = useState(new Date());

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
              Hello New Earth Proptech
            </span>
            <span className="block text-[14px] font-medium capitalize leading-normal text-secondary">
              Admin Dashboard
            </span>
          </div>
          <div className="basis-[50%]">
            <div className="flex items-center justify-end gap-4">
              <div className="px-2">
                <div className="h-[35px] w-[100px] rounded-[20px] bg-white p-2 text-center hover:bg-[#ccc]">
                  <span className="block text-[12px] font-medium leading-normal text-secondary">
                    {dayjs(time).format('hh:mm A')}
                  </span>
                </div>
              </div>
              <div className="pr-4">
                <div className="w-[100px]  rounded-[20px]  text-center">
                  <span className="block w-full text-left text-[12px] font-medium capitalize leading-normal text-secondary">
                    {dayjs().format('D MMMM, dddd')}{' '}
                  </span>
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
