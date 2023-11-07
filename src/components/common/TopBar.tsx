/* eslint-disable prettier/prettier */
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
// import { blac } from '@mui/material/colors';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ShopIcon from '../icons/ShopIcon';
import BackArrowIcon from '../icons/BackArrowIcon';

type Props = {
  title?: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute = false }: Props) {
  const userData = useSelector((state: any) => state.authState.user);
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <AppBar
      position="relative"
      className="w-full bg-gray-50 text-gray-50 shadow-none px-5"
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
          {userData?.isSuperAdmin &&
            <div className='flex items-center'>
              <span className='text-sm font-semibold px-2'>
                Super Admin
              </span>
              <hr className="divider vertical ml-2" />
            </div>
          }
          {userData?.tenantName &&
            <div className='flex items-center'>
              <span className='text-sm font-semibold px-2'>
                {userData?.tenantName}
              </span>
              <ShopIcon color='black' />
              <hr className="divider vertical ml-4" />
            </div>
          }
          <div className="header-user-box ml-3.5">
            <span>{`${userData.firstName} ${userData.lastName}`}</span>
            {userData?.avatar ?
              <Avatar sx={{ width: 56, height: 56 }} alt="user image" src={userData.avatar} /> :
              <Avatar sx={{ bgcolor: 'black', fontSize: "18px" }}>{`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(0)}`}</Avatar>
            }
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
