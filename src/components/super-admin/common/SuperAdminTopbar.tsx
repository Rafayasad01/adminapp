import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import assets from '../../../assets';

type Props = {
  title: string;
  isNestedRoute?: boolean;
};

function SuperAdminTopBar({ title, isNestedRoute = false }: Props) {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <AppBar position="relative" className="w-full bg-neutral-200 shadow-none">
      <Toolbar className="flex px-0">
        {isNestedRoute ? (
          <IconButton className="mr-2 p-0" onClick={backHandler}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        ) : null}
        <div className="title ml-1">{title}</div>
        <div className="flex-grow">&nbsp;</div>
        <div className="flex items-center text-neutral-500">
          <IconButton className="mr-3.5 p-0">
            <SearchIcon />
          </IconButton>
          <IconButton className="mr-3.5 p-0">
            <NotificationsNoneIcon />
          </IconButton>
          <hr className="my-2 h-8 border border-solid border-neutral-400" />
          <div className="header-user-box ml-3.5">
            <span>Jones Ferdinand</span>
            <img src={assets.images.avatarUser} alt="" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SuperAdminTopBar;
