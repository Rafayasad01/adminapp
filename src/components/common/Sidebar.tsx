/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import OrderIcon from '../icons/OrderIcon';
import CategoryIcon from '../icons/CategoryIcon';
import VoucherIcon from '../icons/VoucherIcon';
import DriverIcon from '../icons/DriverIcon';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { logout } from '../../redux/features/authStateSlice';


import assets from '../../assets';

const links = [
  {
    name: 'Dashboard',
    path: 'home',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Carts',
    path: 'carts',
    icon: <ShoppingCartOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: <OrderIcon />,
  },
  {
    name: 'Categories',
    path: 'categories',
    icon: <CategoryIcon />,
  },
  {
    name: 'Customers',
    path: 'customers',
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Drivers',
    path: 'drivers',
    icon: <DriverIcon />,
  },
  {
    name: 'Notifications',
    path: 'notification',
    icon: <NotificationsOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Vouchers',
    path: 'vouchers',
    icon: <VoucherIcon />,
  },
  {
    name: 'Settings',
    path: 'settings',
    icon: <SettingsOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'Reports',
  //   path: 'reports',
  //   icon: <DescriptionOutlinedIcon fontSize="inherit" />,
  // },
  // {
  //   name: 'Complains',
  //   path: 'complains',
  //   icon: <DescriptionOutlinedIcon fontSize="inherit" />,
  // },

  // {
  //   name: 'Locations',
  //   path: 'locations',
  //   icon: <PlaceOutlinedIcon fontSize="inherit" />,
  // },

  // {
  //   name: 'Vouchers',
  //   path: 'vouchers',
  //   icon: <VoucherIcon />,
  // },
];

const superAdminlinks = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Shops',
    path: 'shop',
    icon: <DescriptionOutlinedIcon fontSize="inherit" />,
  },

  {
    name: 'Support',
    path: 'support',
    icon: <HeadphonesOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'Users',
  //   path: 'user',
  //   icon: <GroupsOutlinedIcon fontSize="inherit" />,
  // },
  // {
  //   name: 'Role',
  //   path: 'role/permission',
  //   icon: <HeadphonesOutlinedIcon fontSize="inherit" />,
  // },
  // {
  //   name: 'Settings',
  //   path: 'settings',
  //   icon: <SettingsOutlinedIcon fontSize="inherit" />,
  // },
];

function Sidebar() {
  const [list, setList] = useState<any>(null);
  const authState: any = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (authState.user.isSuperAdmin) {
      setList(superAdminlinks);
    } else {
      setList(links);
    }
  }, [authState]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className:
          'left-sidebar box-border w-64 border-r-0 bg-stone-900 text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar className="mb-10">
          <Stack className="w-full" direction="row" justifyContent="center">
            <img className="mt-9" src={assets.images.logo} alt="" />
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {list && list.map((link: any) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full bg-gray-50 bg-opacity-5 py-3 pl-8 pr-4'
                    : 'w-full py-3 pl-8 pr-4'
                }
                to={link.path}
              >
                <div className="flex items-center  text-gray-50">
                  <span className="text-base leading-3"> {link.icon} </span>
                  <div className="mr-2">&nbsp;</div>
                  <span className="font-open-sans text-sm font-semibold">
                    {link.name}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
        <div className="sidebar-footer-content mt-5">
          {!authState.user.isSuperAdmin && (
            <div className="share-via">
              <h6 className="heading">Share</h6>
              <div className="social-icons">
                <IconButton className="social-btn" onClick={() => null}>
                  <FacebookIcon className="text-3xl" />
                </IconButton>
                <IconButton className="social-btn" onClick={() => null}>
                  <TwitterIcon className="text-3xl" />
                </IconButton>
                <IconButton className="social-btn" onClick={() => null}>
                  <InstagramIcon className="text-3xl" />
                </IconButton>
                <IconButton className="social-btn" onClick={() => null}>
                  <MailIcon className="text-3xl" />
                </IconButton>
              </div>
              <hr className="mb-0" />
              {/* <NavLink className="link mb-1" to="#">
              Terms & Conditions
            </NavLink>
            <NavLink className="link" to="#">
              Privacy Policy
            </NavLink>
            <hr className="mt-2" /> */}
            </div>
          )}
          {authState ? (
            <NavLink
              className="logout-link"
              to="/admin"
              onClick={() => logOut()}
            >
              <LogoutOutlinedIcon className="icon" />
              Logout
            </NavLink>
          ) : (
            ''
          )}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
