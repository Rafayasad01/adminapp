/* eslint-disable prettier/prettier */
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import FacebookIcon from '@mui/icons-material/Facebook';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import CAN, { defineRules } from '../../services/permissions/permissions';
import { MODULE_EMPLOYEES } from '../../utils/constants';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import CategoryIcon from '../icons/CategoryIcon';
import OrderIcon from '../icons/OrderIcon';
import VoucherIcon from '../icons/VoucherIcon';
import ProviderIcon from '../icons/providerIcon';
import VisitIcon from '../icons/visitIcon';

const links = [
  {
    name: 'Dashboard',
    path: 'home',
    permission: 'Dashboard List',
    icon: <GridViewOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Store Appointment',
    path: 'store-appointment',
    permission: 'Appointment Parent',
    icon: <SplitscreenOutlinedIcon fontSize="inherit" />,
    childLinks: [
      {
        name: 'Services',
        path: 'store-appointment/service',
        permission: 'Category List',
        icon: <GridViewOutlinedIcon fontSize="inherit" />,
      },
      {
        name: 'Employees',
        path: 'store-appointment/employees',
        permission: 'Category List',
        icon: <ProviderIcon />,
      },
      {
        name: 'Appointments',
        path: 'store-appointment/appointments',
        permission: 'Category List',
        icon: <VisitIcon />,
      },
      {
        name: 'Leave management',
        path: 'store-appointment/leaves-management',
        permission: 'Category List',
        icon: <ManageAccountsOutlinedIcon fontSize="inherit" />,
      },
      // {
      //   name: 'Ratings',
      //   path: 'store-appointment/ratings',
      //   permission: 'Category List',
      //   icon: <VisitIcon />,
      // },
    ],
  },
  {
    name: 'Store Product',
    path: 'store-product',
    permission: 'Appointment Parent',
    icon: <Inventory2OutlinedIcon fontSize="inherit" />,
    childLinks: [
      {
        name: 'Products',
        path: 'store-product/product',
        permission: 'Category List',
        icon: <CategoryIcon />,
      },
      {
        name: 'Orders',
        path: 'store-product/orders',
        permission: 'Order List',
        icon: <OrderIcon />,
      },
      {
        name: 'Rating',
        path: 'store-product/ratings',
        permission: 'Banners List',
        icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
      },
    ],
  },
  {
    name: 'User',
    path: 'user',
    permission: 'Appointment Parent',
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
    childLinks: [
      {
        name: 'App User',
        path: 'user/app-user/list',
        permission: 'Customer List',
        icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
      },
      {
        name: 'Admin Users',
        path: 'user/employees',
        permission: 'Employee List',
        icon: <PeopleOutlineOutlinedIcon className="w-[17px]" />,
      },
    ],
  },
  {
    name: 'Branches',
    path: 'branches',
    // permission: 'Branch List',
    permission: 'Banners List',
    icon: <CorporateFareIcon className="w-[17px]" />,
  },
  {
    name: 'Banners',
    path: 'banners',
    permission: 'Banners List',
    icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
  },
  {
    name: 'FAQs',
    path: 'faq',
    permission: 'Notification List',
    icon: <QuestionAnswerOutlinedIcon fontSize="inherit" />,
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

function Sidebar() {
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const appItems = useAppSelector(
    (state: any) => state?.persistedReducer?.appState?.UserItems
  );
  const logo = useAppSelector(
    (state: any) => state?.persistedReducer?.appState?.logo
  );

  // console.log('appItems', appItems);

  const [list, setList] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);
  const permissions = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );

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
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `w-full bg-opacity-5` : `w-full`
          }
          to={path}
        >
          <div
            onClick={() => handleToggle(index)}
            className="abc flex cursor-pointer items-center justify-between px-[30px]"
          >
            <div className="ap my-3 flex items-center">
              <div className="pr-[7px]">
                <span className="text-base leading-3">{icon}</span>
              </div>
              <div className="mx-[8px] font-open-sans text-sm font-semibold capitalize">
                {name}
              </div>
            </div>
            <div className="arrow-icon">
              {expandedIndex === index ? <ArrowUp /> : <ArrowDown />}
            </div>
          </div>
        </NavLink>
        {expandedIndex === index &&
          childLinks?.map((el: any, childIndex: number) => {
            return (
              <div key={childIndex} className="cactive flex">
                {NavbarLinks(
                  el.path,
                  el.icon,
                  el.name,
                  childIndex,
                  'py-2',
                  'pl-[45px]'
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
    defineRules(permissions);
    if (permissions) {
      const tempList = links.filter((el) => {
        if (el.name === MODULE_EMPLOYEES) {
          if (appItems.employeeLimit <= 0) {
            return null;
          }
        }
        return CAN('canView', el.permission as string);
      });
      // console.log("tempList", tempList);
      tempList.unshift({
        name: 'Dashboard',
        path: 'home',
        permission: 'Dashboard List',
        icon: <GridViewOutlinedIcon fontSize="inherit" />,
      });
      setList(tempList);
    }
  }, [null, appItems?.employeeLimit]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'left-sidebar box-border w-64 border-r-0',
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
            className="h-[100%] w-full pl-4"
            direction="row"
            justifyContent="left"
          >
            {userData?.isSuperAdmin ? (
              <img
                className="mt-9 h-[29px] max-w-[150px]"
                src={assets.images.urAppLogoWhite}
                alt=""
              />
            ) : logo ? (
              <img
                className="mt-9 h-[29px] max-w-[150px]"
                src={logo}
                alt="logo"
              />
            ) : (
              <div className="flex w-full items-center justify-start rounded-2xl p-3 text-white">
                <img
                  className="mt-2 max-w-[150px]"
                  src={assets.images.urAppLogoWhite}
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
              {appItems?.tenantConfig && (
                <div className="social-icons grid grid-cols-6">
                  {appItems?.tenantConfig?.facebook !== 'undefined' &&
                    appItems?.tenantConfig?.facebook !== null &&
                    appItems?.tenantConfig?.facebook !== '' && (
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
                  {appItems?.tenantConfig?.twitter !== 'undefined' &&
                    appItems?.tenantConfig?.twitter !== null &&
                    appItems?.tenantConfig?.twitter !== '' && (
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
                  {appItems?.tenantConfig?.instagram !== 'undefined' &&
                    appItems?.tenantConfig?.instagram !== null &&
                    appItems?.tenantConfig?.instagram !== '' && (
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
                  {appItems?.tenantConfig?.whatsapp !== 'undefined' &&
                    appItems?.tenantConfig?.whatsapp !== null &&
                    appItems?.tenantConfig?.whatsapp !== '' && (
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
                  {appItems?.tenantConfig?.linkedin !== 'undefined' &&
                    appItems?.tenantConfig?.linkedin !== null &&
                    appItems?.tenantConfig?.linkedin !== '' && (
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
                  {appItems?.tenantConfig?.youtube !== 'undefined' &&
                    appItems?.tenantConfig?.youtube !== null &&
                    appItems?.tenantConfig?.youtube !== '' && (
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
