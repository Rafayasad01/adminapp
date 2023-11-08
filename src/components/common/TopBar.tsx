/* eslint-disable prettier/prettier */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// import { blac } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

import BackArrowIcon from '../icons/BackArrowIcon';
import ShopIcon from '../icons/ShopIcon';
import { useAppSelector } from '../../redux/redux-hooks';

type Props = {
  title?: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute = false }: Props) {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <AppBar
      position="relative"
      className="w-full bg-gray-50 px-5 text-gray-50 shadow-none"
    >
      <Toolbar className="toolbar-style flex">
        {isNestedRoute ? (
          <IconButton className="back-btn mr-2 p-0" onClick={backHandler}>
            <BackArrowIcon />
          </IconButton>
        ) : null}
        <div className="title ml-1">{title}</div>
        <div className="flex-grow">&nbsp;</div>
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
          <div className="header-user-box ml-3.5">
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
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
