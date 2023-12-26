/* eslint-disable prettier/prettier */
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

import assets from '../../../assets';

const links = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'Shops',
  //   path: 'shop',
  //   icon: <DescriptionOutlinedIcon fontSize="inherit" />,
  // },

  // {
  //   name: 'Support',
  //   path: 'support',
  //   icon: <HeadphonesOutlinedIcon fontSize="inherit" />,
  // },
  {
    name: 'Logout',
    path: 'logout',
    icon: <LogoutOutlinedIcon fontSize="inherit" />,
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

function SuperAdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'box-border w-64 border-r-0 bg-neutral-900 text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar className="mb-10">
          <Stack className="w-full" direction="row" justifyContent="center">
            <img className="mt-9" src={assets.images.logo} alt="" />
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {links.map((link) => {
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
      </List>
    </Drawer>
  );
}

export default SuperAdminSidebar;
