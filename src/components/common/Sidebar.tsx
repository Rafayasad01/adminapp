/* eslint-disable prettier/prettier */
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Fragment, useEffect, useState } from 'react';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
// import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import CAN, { defineRules } from '../../services/permissions/permissions';
import { MODULE_EMPLOYEEES } from '../../utils/constants';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import CategoryIcon from '../icons/CategoryIcon';
import OrderIcon from '../icons/OrderIcon';
import PermissionIcon from '../icons/PermissionIcon';
import RoleIcon from '../icons/RoleIcon';
import ShopIcon from '../icons/ShopIcon';
// import TenantIcon from '../icons/TenantIcon';
import UserPermission from '../icons/UserPermission';
import VoucherIcon from '../icons/VoucherIcon';
import AppointmentIcon from '../icons/appointmentIcon';
import VisitIcon from '../icons/visitIcon';
import ProviderIcon from '../icons/providerIcon';

const links = [
  {
    name: 'Dashboard',
    path: 'home',
    permission: 'Dashboard List',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  // {
  //   name: 'Carts',
  //   path: 'carts',
  //   permission: 'Cart List',
  //   icon: <ShoppingCartOutlinedIcon fontSize="inherit" />,
  // },
  {
    name: 'Orders',
    path: 'orders',
    permission: 'Order List',
    icon: <OrderIcon />,
  },
  {
    name: 'Categories',
    path: 'categories',
    permission: 'Category List',
    icon: <CategoryIcon />,
  },
  {
    name: 'App user',
    path: 'app-user',
    permission: 'Customer List',
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Employees',
    path: 'employees',
    permission: 'Employee List',
    icon: <PeopleOutlineOutlinedIcon className="w-[17px]" />,
  },
  {
    name: 'Branches',
    path: 'branches',
    permission: 'Branch List',
    icon: <CorporateFareIcon className="w-[17px]" />,
  },
  {
    name: 'Banners',
    path: 'banners',
    permission: 'Banners List',
    icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
  },
  {
    name: 'Appointment',
    path: 'appointment',
    permission: 'Appointment Parent',
    icon: <AppointmentIcon />,
    childLinks: [
      {
        name: 'Provider',
        path: 'appointment/provider',
        permission: 'Appointment Category List',
        icon: <ProviderIcon />,
      },
      {
        name: 'Visit',
        path: 'appointment/visit',
        permission: 'Appointment Visit List',
        icon: <VisitIcon />,
      },
    ],
  },
  {
    name: 'Notifications',
    path: 'notification',
    permission: 'Notification List',
    icon: <NotificationsOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Vouchers',
    path: 'vouchers',
    permission: 'Voucher List',
    icon: <VoucherIcon />,
  },
  {
    name: 'Settings',
    path: 'settings',
    permission: 'Setting View',
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
    icon: <CollectionsOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'shops',
    path: 'tenant/shop',
    icon: <ShopIcon />,
  },
  // {
  //   name: 'tenant',
  //   path: 'tenant',
  //   icon: <TenantIcon />,
  //   childLinks: [
  //     {
  //       name: 'shops',
  //       path: 'tenant/shop',
  //       icon: <ShopIcon />,
  //     },
  //     {
  //       name: 'users',
  //       path: 'tenant/user',
  //       icon: <GroupsOutlinedIcon className="w-[20px]" />,
  //     },
  //   ],
  // },
  {
    name: 'user permissions',
    path: 'role',
    icon: <UserPermission />,
    childLinks: [
      {
        name: 'Permission',
        path: 'user-permission/permission',
        icon: <PermissionIcon />,
      },
      {
        name: 'Role',
        path: 'user-permission/role',
        icon: <RoleIcon />,
      },
    ],
  },
];

function Sidebar() {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const appItems = useAppSelector((state: any) => state?.persisitReducer?.appState?.UserItems);
  const logo = useAppSelector((state: any) => state?.persisitReducer?.appState?.logo);

  // console.log("appItems", logo);

  const [list, setList] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector((state: any) => state);
  const [emptyVariable] = useState(null);

  // const dispatch = useAppDispatch();
  // const logOut = () => {
  //   dispatch(logout());
  //   dispatch(setItemState(null));
  //   dispatch(setLogo(null));
  //   dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  // };
  // console.log("ei",expandedIndex);

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  function NavbarLinks(
    path: any,
    icon: any,
    name: string,
    index: number,
    padding: any,
    paddingLeft: any
  ) {
    return (
      <NavLink
        key={path}
        className={({ isActive }) =>
          isActive
            ? `bg-gray-50 bg-opacity-5 ${padding} ${paddingLeft} w-full pr-4`
            : `${padding} ${paddingLeft} w-full pr-4`
        }
        to={path}
      >
        <div className="flex items-center text-gray-50">
          <span className="text-base leading-3">{icon} </span>
          <div className="mr-2">&nbsp;</div>
          <span className="font-open-sans text-sm font-semibold">{name}</span>
        </div>
      </NavLink>
    );
  }

  function SideBarMenu(
    path: string,
    name: string,
    icon: any,
    childLinks: any,
    index: number
  ) {
    return childLinks?.length > 0 ? (
      <>
        <div
          onClick={() => handleToggle(index)}
          className="mx-[30px] flex cursor-pointer items-center justify-between"
        >
          <div className="my-3 flex items-center">
            <div className="pr-[7px]">
              <span className="text-base leading-3">{icon}</span>
            </div>
            <div className="mx-[8px] font-open-sans text-sm font-semibold capitalize">
              {name}
            </div>
          </div>
          <div className="">
            {expandedIndex === index ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        {expandedIndex === index &&
          childLinks?.map((el: any, childIndex: number) => {
            return (
              <div key={childIndex} className="mx-8 flex">
                {NavbarLinks(
                  el.path,
                  el.icon,
                  el.name,
                  childIndex,
                  'py-2',
                  'pl-[21px]'
                )}
              </div>
            );
          })}
      </>
    ) : (
      NavbarLinks(path, icon, name, index, 'py-3', 'pl-8')
    );
  }

  useEffect(() => {
    defineRules(dataRole?.persisitReducer?.roleState?.role?.permissions);
    if (authState.user.isSuperAdmin) {
      setList(superAdminlinks);
    } else if (dataRole?.persisitReducer?.roleState?.role?.permissions) {
      // const tempList = links.filter(el => CAN("canView", el.permission));
      const tempList = links.filter((el) => {
        if (el.name === MODULE_EMPLOYEEES) {
          if (appItems.employeeLimit <= 0) {
            return null;
          }
        }
        return CAN('canView', el.permission as string);
      });
      // console.log("templost", tempList);
      tempList.unshift({
        name: 'Dashboard',
        path: 'home',
        permission: 'Dashboard List',
        icon: <GridViewOutlinedIcon fontSize="inherit" />,
      });
      setList(tempList);
    }
  }, [emptyVariable,appItems?.employeeLimit]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className:
          'left-sidebar box-border w-64 border-r-0 bg-color-1  text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar
          className={
            userData?.tenantConfig?.logo || userData.isSuperAdmin === true
              ? 'mb-10'
              : 'my-3'
          }
        >
          <Stack
            className="h-[100%] w-full"
            direction="row"
            justifyContent="center"
          >
            {userData?.isSuperAdmin ? (
              <img className="mt-9 max-w-[150px] h-[29px]" src={assets.images.urApplogoWhite} alt="" />
            ) : logo ? (
              <img className="mt-9 max-w-[150px] h-[29px]" src={logo} alt="logo" />
            ) : (
              <div className="flex w-full items-center justify-start rounded-2xl p-3 text-white">
                <img
                  className="mt-2 max-w-[150px]"
                  src={assets.images.urApplogoWhite}
                  alt="logo"
                />
              </div>
            )}
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {/* {SideBarMenu("", "Dashboard", <GridViewOutlinedIcon fontSize="inherit" />)} */}
          {list &&
            list?.map((link: any, index: number) => {
              return (
                <Fragment key={link.path}>
                  {SideBarMenu(
                    link.path,
                    link.name,
                    link.icon,
                    link.childLinks,
                    index
                  )}
                </Fragment>
              );
            })}
        </div>
        <div className="sidebar-footer-content mt-5">
          {!authState.user.isSuperAdmin && (
            <div className="share-via">
              <h6 className="heading">Share</h6>
              {appItems?.tenantConfig?.facebook === null &&
                appItems?.tenantConfig?.twitter === null &&
                appItems?.tenantConfig?.instagram === null &&
                appItems?.tenantConfig?.whatsapp === null &&
                appItems?.tenantConfig?.linkedin === null &&
                appItems?.tenantConfig?.youtube === null && <span className="text-sm">No Links yet</span>}
              {appItems?.tenantConfig && (
                <div className="social-icons grid grid-cols-6">
                  {appItems?.tenantConfig?.facebook && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FacebookIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                  {appItems?.tenantConfig?.twitter && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TwitterIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                  {appItems?.tenantConfig?.instagram && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <InstagramIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                  {appItems?.tenantConfig?.whatsapp && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <WhatsAppIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                  {appItems?.tenantConfig?.linkedin && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkedInIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                  {appItems?.tenantConfig?.youtube && (
                    <IconButton className="social-btn" onClick={() => null}>
                      <a
                        href={appItems?.tenantConfig?.youtube}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <YouTubeIcon className="text-3xl" />
                      </a>
                    </IconButton>
                  )}
                </div>
              )}
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
          {/* {authState ? (
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
          )} */}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
