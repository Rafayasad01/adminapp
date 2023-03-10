import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Drawer, List, Stack, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import assets from '../../assets';

const links = [
  {
    name: 'Home',
    path: 'home',
    icon: <HomeOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: <AssignmentOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Payment Setting',
    path: 'payment-setting',
    icon: <CreditCardRoundedIcon fontSize="inherit" />,
  },
  {
    name: 'Delivery Address',
    path: 'delivery-address',
    icon: <LocationOnOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Account',
    path: 'account',
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'FAQs',
    path: 'faqs',
    icon: <HelpOutlineOutlinedIcon fontSize="inherit" />,
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'box-border w-80 border-r-0 bg-stone-900 text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar className="mb-5">
          <Stack className="w-full" direction="row" justifyContent="center">
            <img src={assets.images.logo} alt="" />
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {links.map((link) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full bg-gray-50 bg-opacity-5 px-4 py-3'
                    : 'w-full px-4 py-3'
                }
                to={link.path}
              >
                <div className="flex items-center font-open-sans text-gray-50">
                  <span className="text-3xl"> {link.icon} </span>
                  <div className="mr-2"> </div>
                  {link.name}
                </div>
              </NavLink>
            );
          })}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
