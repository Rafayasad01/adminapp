/* eslint-disable prettier/prettier */
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import assets from '../../assets';

function TopBar() {
  return (
    <AppBar
      position="fixed"
      className="w-full bg-gray-50 text-gray-50 shadow-none"
    >
      <Toolbar className="toolbar-style flex">
        <div className="ml-1 flex text-2xl font-semibold text-heading-color">
          Dashboard
        </div>
        <div className="flex-grow">&nbsp;</div>
        <div className="flex items-center text-cyan-900">
          <IconButton className="mr-3.5 p-0">
            <SearchIcon />
          </IconButton>
          <IconButton className="mr-3.5 p-0">
            <NotificationsNoneIcon />
          </IconButton>
          <div className="divider-height">&nbsp;</div>
          <div className="header-user-box ml-3.5">
            <span>Jones Ferdinand</span>
            <img src={assets.images.avatarUser} alt="" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
