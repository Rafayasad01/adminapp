/* eslint-disable prettier/prettier */
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

import assets from '../../assets';

type Props = {
  title: string;
  isNestedRoute?: boolean;
};

function TopBar({ title, isNestedRoute = false }: Props) {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <AppBar
      position="relative"
      className="w-full bg-gray-50 text-gray-50 shadow-none"
    >
      <Toolbar className="toolbar-style flex">
        {isNestedRoute ? (
          <div className="">
            <IconButton className="back-btn p-0" onClick={backHandler}>
              <ArrowBackOutlinedIcon />
            </IconButton>
          </div>
        ) : null}
        <div className="title ml-1">{title}</div>
        <div className="flex-grow">&nbsp;</div>
        <div className="flex items-center text-cyan-900">
          <IconButton className="icon-btn mr-3.5 p-0">
            <SearchIcon />
          </IconButton>
          <IconButton className="icon-btn mr-3.5 p-0">
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
