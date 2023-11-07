/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Fragment } from 'react';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
// import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { useSelector } from 'react-redux';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import OrderIcon from '../icons/OrderIcon';
import CategoryIcon from '../icons/CategoryIcon';
import VoucherIcon from '../icons/VoucherIcon';
import DriverIcon from '../icons/DriverIcon';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { logout } from '../../redux/features/authStateSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import CAN, { defineRules } from "../../services/permissions/permissions";
import assets from '../../assets';
import TenantIcon from '../icons/TenantIcon';
import ShopIcon from '../icons/ShopIcon';
import RoleIcon from '../icons/RoleIcon';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import UserPermission from '../icons/UserPermission';
import PermissionIcon from '../icons/PermissionIcon';
import { MODULE_EMPLOYEEES } from '../../utils/constants';
import { setItemState } from '../../redux/features/appStateSlice';

const links = [
  {
    name: 'Dashboard',
    path: 'home',
    permission: "Dashboard List",
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Carts',
    path: 'carts',
    permission: "Cart List",
    icon: <ShoppingCartOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Orders',
    path: 'orders',
    permission: "Order List",
    icon: <OrderIcon />,
  },
  {
    name: 'Categories',
    path: 'categories',
    permission: "Category List",
    icon: <CategoryIcon />,
  },
  {
    name: 'Customers',
    path: 'customers',
    permission: "Customer List",
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Drivers',
    path: 'drivers',
    permission: "Driver List",
    icon: <DriverIcon />,
  },
  {
    name: 'Employees',
    path: 'employees',
    permission: "Employee List",
    icon: <PeopleOutlineOutlinedIcon className='w-[17px]' />,
  },
  {
    name: 'Notifications',
    path: 'notification',
    permission: "Notification List",
    icon: <NotificationsOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Vouchers',
    path: 'vouchers',
    permission: "Voucher List",
    icon: <VoucherIcon />,
  },
  {
    name: 'Settings',
    path: 'settings',
    permission: "Setting View",
    icon: <SettingsOutlinedIcon fontSize="inherit" />,
  },
];

const superAdminlinks = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'App Image',
    path: 'app/image-upload',
    icon: <CollectionsOutlinedIcon fontSize="inherit" />
  },
  {
    name: 'tenant',
    path: 'tenant',
    icon: <TenantIcon />,
    childLinks: [
      {
        name: 'shops',
        path: 'tenant/shop',
        icon: <ShopIcon />
      },
      {
        name: 'users',
        path: 'tenant/user',
        icon: <GroupsOutlinedIcon className='w-[20px]' />
      }
    ]
  },
  {
    name: 'user permissions',
    path: 'role',
    icon: <UserPermission />,
    childLinks: [
      {
        name: 'Permission',
        path: 'user-permission/permission',
        icon: <PermissionIcon />
      },
      {
        name: 'Role',
        path: 'user-permission/role',
        icon: <RoleIcon />
      }
    ]
  },
];



function Sidebar() {
  const userData = useSelector((state: any) => state.authState.user);
  const socialItems = useSelector((state: any) => state.appState.items);
  const logo = useSelector((state: any) => state.appState.logo);
  console.log("socialItems", socialItems);

  const [list, setList] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const authState: any = useAppSelector((state: any) => state.authState);
  const dataRole = useSelector((state: any) => state)
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
    dispatch(setItemState(null))
    dispatch(setRolePermissions({ id: "", name: "", permissions: [] }));
  };
  // console.log("ei",expandedIndex);

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  function NavbarLinks(path: any, icon: any, name: string, index: number, padding: any, paddingLeft: any) {
    return (
      <NavLink
        key={path}
        className={({ isActive }) =>
          isActive
            ? `bg-gray-50 bg-opacity-5 ${padding} ${paddingLeft} pr-4 w-full`
            : `${padding} ${paddingLeft} pr-4 w-full`
        }
        to={path}
      >
        <div className="flex items-center text-gray-50">
          <span className="text-base leading-3">{icon} </span>
          <div className="mr-2">&nbsp;</div>
          <span className="font-open-sans text-sm font-semibold">
            {name}
          </span>
        </div>
      </NavLink>
    )
  }

  function SideBarMenu(path: string, name: string, icon: any, childLinks: any, index: number) {
    return (
      childLinks?.length > 0 ?
        <>
          <div onClick={() => handleToggle(index)} className='cursor-pointer flex items-center mx-[30px] justify-between'>
            <div className='flex items-center my-3'>
              <div className='pr-[7px]'>
                <span className='text-base leading-3'>{icon}</span>
              </div>
              <div className='mx-[8px] capitalize font-open-sans text-sm font-semibold'>
                {name}
              </div>
            </div>
            <div className=''>
              {expandedIndex === index ? <ArrowUp />
                : <ArrowDown />}
            </div>
          </div >
          {expandedIndex === index &&
            childLinks?.map((el: any, childIndex: number) => {
              return (
                <div key={childIndex} className='flex mx-8'>
                  {NavbarLinks(el.path, el.icon, el.name, childIndex, "py-2", "pl-[21px]")}
                </div>
              )
            })
          }
        </>
        :
        NavbarLinks(path, icon, name, index, "py-3", "pl-8")
    )
  }
  console.log("logo", logo);

  useEffect(() => {
    defineRules(dataRole.roleState.role.permissions)
    if (authState.user.isSuperAdmin) {
      setList(superAdminlinks);
    } else if (dataRole.roleState.role.permissions) {
      // const tempList = links.filter(el => CAN("canView", el.permission));
      const tempList = links.filter(el => {
        if (el.name === MODULE_EMPLOYEEES) {
          if (authState.user?.employeeLimit <= 0) {
            return null;
          }
        }
        return CAN("canView", el.permission)
      });
      // console.log("templost", tempList);
      tempList.unshift({
        name: 'Dashboard',
        path: 'home',
        permission: "Dashboard List",
        icon: <GridViewOutlinedIcon fontSize="inherit" />,
      })
      setList(tempList);
    }
  }, [authState, dataRole.roleState.role.permissions]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className:
          'left-sidebar box-border w-64 border-r-0 bg-stone-900 text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar className={userData?.tenantConfig?.logo || userData.isSuperAdmin === true ? 'mb-10' : 'my-3'}>
          <Stack className="w-full h-[100%]" direction="row" justifyContent="center">
            {userData.isSuperAdmin ?
              <img className="mt-9" src={assets.images.logo} alt="" />
              :
              logo ?
                <img className="mt-9" src={logo} alt="logo" />
                :
                <div className='flex items-center justify-start w-full p-3 rounded-2xl text-white'>
                  <img className="mt-2" src={assets.images.defaultLogo} alt="logo" />
                </div>
            }
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {/* {SideBarMenu("", "Dashboard", <GridViewOutlinedIcon fontSize="inherit" />)} */}
          {list && list.map((link: any, index: number) => {
            return (
              <Fragment key={link.path}>
                {SideBarMenu(link.path, link.name, link.icon, link.childLinks, index)}
              </Fragment>
            );
          })}
        </div>
        <div className="sidebar-footer-content mt-5">
          {!authState.user.isSuperAdmin && (
            <div className="share-via">
              <h6 className="heading">Share</h6>
              {socialItems?.tenantConfig &&
                <div className="social-icons grid grid-cols-6">
                  {socialItems?.tenantConfig?.facebook &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.facebook} target='_blank' rel="noreferrer">
                        <FacebookIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                  {socialItems?.tenantConfig?.twitter &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.twitter} target='_blank' rel="noreferrer">
                        <TwitterIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                  {socialItems?.tenantConfig?.instagram &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.instagram} target='_blank' rel="noreferrer">
                        <InstagramIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                  {socialItems?.tenantConfig?.whatsapp &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.whatsapp} target='_blank' rel="noreferrer">
                        <WhatsAppIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                  {socialItems?.tenantConfig?.linkedin &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.linkedin} target='_blank' rel="noreferrer">
                        <LinkedInIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                  {socialItems?.tenantConfig?.youtube &&
                    <IconButton className="social-btn" onClick={() => null}>
                      <a href={socialItems?.tenantConfig?.youtube} target='_blank' rel="noreferrer">
                        <YouTubeIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  }
                </div>
              }
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
