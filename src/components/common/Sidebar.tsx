/* eslint-disable prettier/prettier */
// import CorporateFareIcon from '@mui/icons-material/CorporateFare';
// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
// import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
// import WalletIcon from '@mui/icons-material/Wallet';
import { Button } from '@mui/material';
// import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../assets';
import { setItemState, setLogo } from '../../redux/features/appSlice';
import { logout } from '../../redux/features/authSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
// import CAN, { defineRules } from '../../services/permissions/permissions';
import // ALL_PERMISSIONS,
// MODULE_BRANCHES,
// MODULE_EMPLOYEES,
// MODULE_SETTINGS,
'../../utils/constants';
// import ArrowDown from '../icons/ArrowDown';
// import ArrowUp from '../icons/ArrowUp';
// import CategoryIcon from '../icons/CategoryIcon';
// import DriverIcon from '../icons/DriverIcon';
// import OrderIcon from '../icons/OrderIcon';
// import VoucherIcon from '../icons/VoucherIcon';
// import ProviderIcon from '../icons/providerIcon';
// import VisitIcon from '../icons/visitIcon';

// const links = [
//   {
//     name: 'Dashboard',
//     path: 'home',
//     permission: 'Dashboard List',
//     icon: <GridViewOutlinedIcon fontSize="inherit" />,
//   },
//   {
//     name: 'Store Appointment',
//     path: 'store-appointment',
//     permission: ALL_PERMISSIONS.storeAppointment.viewAppointments,
//     icon: <SplitscreenOutlinedIcon fontSize="inherit" />,
//     childLinks: [
//       {
//         name: 'Services',
//         path: 'store-appointment/service',
//         permission: ALL_PERMISSIONS.storeAppointment.viewServices,
//         icon: <GridViewOutlinedIcon fontSize="inherit" />,
//       },
//       {
//         name: 'Employees',
//         path: 'store-appointment/employees',
//         permission: ALL_PERMISSIONS.storeAppointment.viewEmployees,
//         icon: <ProviderIcon />,
//       },
//       {
//         name: 'Appointments',
//         path: 'store-appointment/appointments',
//         permission: ALL_PERMISSIONS.storeAppointment.viewAppointment,
//         icon: <VisitIcon />,
//       },
//       {
//         name: 'Wallet',
//         path: 'store-appointment/wallet',
//         permission: ALL_PERMISSIONS.storeAppointment.viewWallets,
//         icon: <WalletIcon fontSize="inherit" />,
//       },
//       {
//         name: 'Leave management',
//         path: 'store-appointment/leaves-management',
//         permission: ALL_PERMISSIONS.storeAppointment.viewLeaveManagement,
//         icon: <ManageAccountsOutlinedIcon fontSize="inherit" />,
//       },
//       // {
//       //   name: 'Ratings',
//       //   path: 'store-appointment/ratings',
//       //   permission: ALL_PERMISSIONS.storeAppointment.viewRatings,
//       //   icon: <VisitIcon />,
//       // },
//     ],
//   },
//   {
//     name: 'Store Product',
//     path: 'store-product',
//     permission: ALL_PERMISSIONS.storeProduct.viewProducts,
//     icon: <Inventory2OutlinedIcon fontSize="inherit" />,
//     childLinks: [
//       {
//         name: 'Products',
//         path: 'store-product/product',
//         permission: ALL_PERMISSIONS.storeProduct.view,
//         icon: <CategoryIcon />,
//       },
//       {
//         name: 'Orders',
//         path: 'store-product/orders',
//         permission: ALL_PERMISSIONS.storeProduct.viewOrders,
//         icon: <OrderIcon />,
//       },
//       {
//         name: 'Rating',
//         path: 'store-product/ratings',
//         permission: ALL_PERMISSIONS.storeProduct.viewRatings,
//         icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
//       },
//     ],
//   },
//   {
//     name: 'Store Services',
//     path: 'store-service',
//     permission: ALL_PERMISSIONS.storeProduct.viewServices,
//     icon: <Inventory2OutlinedIcon fontSize="inherit" />,
//     childLinks: [
//       {
//         name: 'Services',
//         path: 'store-service/product',
//         permission: ALL_PERMISSIONS.storeProduct.view,
//         icon: <CategoryIcon />,
//       },
//       {
//         name: 'Orders',
//         path: 'store-service/orders',
//         permission: ALL_PERMISSIONS.storeProduct.viewOrders,
//         icon: <OrderIcon />,
//       },
//       {
//         name: 'Rating',
//         path: 'store-service/ratings',
//         permission: ALL_PERMISSIONS.storeProduct.viewRatings,
//         icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
//       },
//       {
//         name: 'Driver History',
//         path: 'store-service/drivers',
//         permission: ALL_PERMISSIONS.storeProduct.viewDriverHistory,
//         icon: <DriverIcon />,
//       },
//     ],
//   },
//   {
//     name: 'User',
//     path: 'user',
//     permission: ALL_PERMISSIONS.storeUser.viewUsers,
//     icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
//     childLinks: [
//       {
//         name: 'App User',
//         path: 'user/app-user/list',
//         permission: ALL_PERMISSIONS.storeUser.viewUserApp,
//         icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
//       },
//       {
//         name: 'Admin Users',
//         path: 'user/employees',
//         permission: ALL_PERMISSIONS.storeUser.viewUserEmployee,
//         icon: <PeopleOutlineOutlinedIcon className="w-[17px]" />,
//       },
//     ],
//   },
//   {
//     name: 'Branches',
//     path: 'branches',
//     permission: ALL_PERMISSIONS.storeBranch.viewBranches,
//     // permission: 'Banners List',
//     icon: <CorporateFareIcon className="w-[17px]" />,
//   },
//   {
//     name: 'Banners',
//     path: 'banners',
//     permission: ALL_PERMISSIONS.storeBanner.viewBanners,
//     icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
//   },
//   {
//     name: 'Project Plans',
//     path: 'projects',
//     permission: ALL_PERMISSIONS.storePlans.viewPlans,
//     icon: <ViewCarouselOutlinedIcon className="w-[17px]" />,
//   },
//   {
//     name: 'FAQs',
//     path: 'faq',
//     permission: ALL_PERMISSIONS.storeFaq.viewFaqs,
//     icon: <QuestionAnswerOutlinedIcon fontSize="inherit" />,
//   },
//   {
//     name: 'Notifications',
//     path: 'notification',
//     permission: ALL_PERMISSIONS.storeNotification.viewNotifications,
//     icon: <NotificationsOutlinedIcon fontSize="inherit" />,
//   },
//   {
//     name: 'Vouchers',
//     path: 'vouchers',
//     permission: ALL_PERMISSIONS.storeVoucher.viewVouchers,
//     icon: <VoucherIcon />,
//   },
//   {
//     name: 'Settings',
//     path: 'settings/app',
//     permission: ALL_PERMISSIONS.storeSetting.viewSettings,
//     icon: <SettingsOutlinedIcon fontSize="inherit" />,
//   },
// ];

function Sidebar() {
  const navigate = useNavigate();
  // function handleClick() {
  //   navigate("./projects");
  // }
  // const userData = useAppSelector((state: any) => state?.authState?.user);
  // const appItems = useAppSelector(
  //   (state: any) => state?.persistedReducer?.appState?.UserItems
  // );
  // const logo = useAppSelector(
  //   (state: any) => state?.persistedReducer?.appState?.logo
  // );

  // console.log('appItems', appItems);

  // const [
  //   // list,
  //   setList,
  // ] = useState<any>(null);
  // const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);
  // const permissions = useAppSelector(
  //   (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  // );

  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
    dispatch(setItemState(null));
    dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  };
  // console.log("ei",expandedIndex);

  // const handleToggle = (index: number) => {
  //   if (expandedIndex === index) {
  //     setExpandedIndex(null);
  //   } else {
  //     setExpandedIndex(index);
  //   }
  // };

  // function NavbarLinks(
  //   path: any,
  //   icon: any,
  //   name: string,
  //   index: number,
  //   padding: any,
  //   paddingLeft: any
  // ) {
  //   return (
  //     <NavLink
  //       key={path}
  //       className={({ isActive }) =>
  //         isActive
  //           ? `bg-gray-50 bg-opacity-5 ${padding} ${paddingLeft} w-full pr-4`
  //           : `${padding} ${paddingLeft} w-full pr-4`
  //       }
  //       to={path}
  //     >
  //       <div className="flex items-center text-gray-50">
  //         <span className="text-base leading-3">{icon} </span>
  //         <div className="mr-2">&nbsp;</div>
  //         <span className="font-open-sans text-sm font-semibold">{name}</span>
  //       </div>
  //     </NavLink>
  //   );
  // }

  // function SideBarMenu(
  //   path: string,
  //   name: string,
  //   icon: any,
  //   childLinks: any,
  //   index: number
  // ) {
  //   return childLinks?.length > 0 ? (
  //     <>
  //       <NavLink
  //         key={path}
  //         className={({ isActive }) =>
  //           isActive ? `w-full bg-opacity-5` : `w-full`
  //         }
  //         to={path}
  //       >
  //         <div
  //           onClick={() => handleToggle(index)}
  //           className="abc flex cursor-pointer items-center justify-between px-[30px]"
  //         >
  //           <div className="ap my-3 flex items-center">
  //             <div className="pr-[7px]">
  //               <span className="text-base leading-3">{icon}</span>
  //             </div>
  //             <div className="mx-[8px] font-open-sans text-sm font-semibold capitalize">
  //               {name}
  //             </div>
  //           </div>
  //           <div className="arrow-icon">
  //             {expandedIndex === index ? <ArrowUp /> : <ArrowDown />}
  //           </div>
  //         </div>
  //       </NavLink>
  //       {expandedIndex === index &&
  //         childLinks?.map((el: any, childIndex: number) => {
  //           return (
  //             <div key={childIndex} className="cactive flex">
  //               {NavbarLinks(
  //                 el.path,
  //                 el.icon,
  //                 el.name,
  //                 childIndex,
  //                 'py-2',
  //                 'pl-[45px]'
  //               )}
  //             </div>
  //           );
  //         })}
  //     </>
  //   ) : (
  //     NavbarLinks(path, icon, name, index, 'py-3', 'pl-8')
  //   );
  // }

  // useEffect(() => {
  //   // console.log('🚀 ~ useEffect ~ permissions:', permissions);
  //   defineRules(permissions);
  //   if (permissions) {
  //     const tempList = links.filter((el) => {
  //       if (el.name === MODULE_EMPLOYEES) {
  //         if (appItems.employeeLimit <= 0) {
  //           return null;
  //         }
  //       }
  //       if (el.name === MODULE_SETTINGS) {
  //         if (authState.user.userType !== 'ShopUser') {
  //           return null;
  //         }
  //       }
  //       // console.log('el.permission', el.permission);

  //       return CAN('canView', el.permission as string);
  //     });
  //     const tempListChild = links.filter((el) => {
  //       return CAN('canView', el.permission as string);
  //     });
  //     // console.log('tempList', links, tempList);
  //     tempList.unshift({
  //       name: 'Dashboard',
  //       path: 'home',
  //       permission: 'Dashboard List',
  //       icon: <GridViewOutlinedIcon fontSize="inherit" />,
  //     });
  //     setList(tempList);
  //     console.log('🚀 ~ useEffect ~ tempList:', tempList);
  //   }
  // }, [null, appItems?.employeeLimit, authState]);

  // useEffect(() => {
  // console.log('INITAIL ROUTES', permissions);

  //   defineRules(permissions);
  //   if (permissions) {
  //     const filterLinks = (allLinks: any) => {
  //       return allLinks
  //         .map((link: any) => {
  //           // Specific condition for MODULE_EMPLOYEES
  //           if (
  //             link.name === MODULE_EMPLOYEES &&
  //             authState.user.userType !== 'ShopUser' &&
  //             authState.user.userType !== 'BranchUser'
  //           ) {
  //             return null;
  //           }
  //           // Specific condition for MODULE_BRANCES
  //           if (
  //             link.name === MODULE_BRANCHES &&
  //             authState.user.userType !== 'ShopUser'
  //           ) {
  //             return null;
  //           }
  //           // Specific condition for MODULE_SETTINGS
  //           if (
  //             link.name === MODULE_SETTINGS &&
  //             authState.user.userType !== 'ShopUser'
  //           ) {
  //             return null;
  //           }
  //           // Filter child links
  //           if (link.childLinks) {
  //             const filteredChildLinks = link.childLinks.filter(
  //               (childLink: any) =>
  //                 CAN('canView', childLink.permission) &&
  //                 CAN('canView', link.permission)
  //             );

  //             // Include parent link if it has visible child links or passes its own permission
  //             if (
  //               filteredChildLinks.length > 0 ||
  //               CAN('canView', link.permission)
  //             ) {
  //               return {
  //                 ...link,
  //                 childLinks: filteredChildLinks,
  //               };
  //             }
  //             return null;
  //           }
  //           return CAN('canView', link.permission) ? link : null;
  //         })
  //         .filter((link: any) => link !== null);
  //     };

  //     const tempList = filterLinks(links);
  //     tempList.unshift({
  //       name: 'Dashboard',
  //       path: 'home',
  //       permission: 'Dashboard List',
  //       icon: <GridViewOutlinedIcon fontSize="inherit" />,
  //     });

  //     setList(tempList);
  //   }
  // }, [permissions, appItems?.employeeLimit, authState]);

  return (
    // <Drawer
    //   variant="permanent"
    //   PaperProps={{
    //     className: 'left-sidebar box-border w-64 border-r-0',
    //   }}
    // >
    //   <List disablePadding>
    //     <Toolbar
    //       className={
    //         userData?.tenantConfig?.logo || userData.isSuperAdmin === true
    //           ? 'mb-10'
    //           : 'my-3'
    //       }
    //     >
    //       <Stack
    //         className="h-[100%] w-full pl-4"
    //         direction="row"
    //         justifyContent="left"
    //       >
    //         {userData?.isSuperAdmin ? (
    //           <img
    //             className="mt-9 h-[29px] max-w-[150px]"
    //             src={assets.images.urAppLogoWhite}
    //             alt=""
    //           />
    //         ) : logo ? (
    //           <img
    //             className="mt-9 h-[29px] max-w-[150px]"
    //             src={logo}
    //             alt="logo"
    //           />
    //         ) : (
    //           <div className="flex w-full items-center justify-start rounded-2xl p-3 text-white">
    //             <img
    //               className="mt-2 max-w-[150px]"
    //               src={assets.images.urAppLogoWhite}
    //               alt="logo"
    //             />
    //           </div>
    //         )}
    //       </Stack>
    //     </Toolbar>

    //     <div className="flex w-full flex-col text-base ">
    //       {/* {SideBarMenu("", "Dashboard", <GridViewOutlinedIcon fontSize="inherit" />)} */}
    //       {list &&
    //         list?.map((link: any, index: number) => {
    //           return (
    //             <Fragment key={link.path}>
    //               {SideBarMenu(
    //                 link.path,
    //                 link.name,
    //                 link.icon,
    //                 link.childLinks,
    //                 index
    //               )}
    //             </Fragment>
    //           );
    //         })}
    //     </div>
    //     <div className="sidebar-footer-content mt-5">
    //       {!authState.user.isSuperAdmin && (
    //         <div className="share-via">
    //           <h6 className="heading">Share</h6>
    //           {appItems?.tenantConfig && (
    //             <div className="social-icons grid grid-cols-6">
    //               {appItems?.tenantConfig?.facebook !== 'undefined' &&
    //                 appItems?.tenantConfig?.facebook !== null &&
    //                 appItems?.tenantConfig?.facebook !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.facebook}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <FacebookIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //               {appItems?.tenantConfig?.twitter !== 'undefined' &&
    //                 appItems?.tenantConfig?.twitter !== null &&
    //                 appItems?.tenantConfig?.twitter !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.twitter}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <TwitterIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //               {appItems?.tenantConfig?.instagram !== 'undefined' &&
    //                 appItems?.tenantConfig?.instagram !== null &&
    //                 appItems?.tenantConfig?.instagram !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.instagram}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <InstagramIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //               {appItems?.tenantConfig?.whatsapp !== 'undefined' &&
    //                 appItems?.tenantConfig?.whatsapp !== null &&
    //                 appItems?.tenantConfig?.whatsapp !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.whatsapp}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <WhatsAppIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //               {appItems?.tenantConfig?.linkedin !== 'undefined' &&
    //                 appItems?.tenantConfig?.linkedin !== null &&
    //                 appItems?.tenantConfig?.linkedin !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.linkedin}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <LinkedInIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //               {appItems?.tenantConfig?.youtube !== 'undefined' &&
    //                 appItems?.tenantConfig?.youtube !== null &&
    //                 appItems?.tenantConfig?.youtube !== '' && (
    //                   <IconButton className="social-btn" onClick={() => null}>
    //                     <a
    //                       href={appItems?.tenantConfig?.youtube}
    //                       target="_blank"
    //                       rel="noreferrer"
    //                     >
    //                       <YouTubeIcon className="text-3xl" />
    //                     </a>
    //                   </IconButton>
    //                 )}
    //             </div>
    //           )}
    //           <hr className="mb-0" />
    //           {/* <NavLink className="link mb-1" to="#">
    //           Terms & Conditions
    //         </NavLink>
    //         <NavLink className="link" to="#">
    //           Privacy Policy
    //         </NavLink>
    //         <hr className="mt-2" /> */}
    //         </div>
    //       )}
    //       {/* {authState ? (
    //         <NavLink
    //           className="logout-link"
    //           to="/admin"
    //           onClick={() => logOut()}
    //         >
    //           <LogoutOutlinedIcon className="icon" />
    //           Logout
    //         </NavLink>
    //       ) : (
    //         ''
    //       )} */}
    //     </div>
    //   </List>
    // </Drawer>
    <div className="side-bar-menu relative">
      <div className="space-between fixed left-0 top-0 flex h-full w-full max-w-[100px] flex-grow flex-col bg-[#f5f5f5] p-2">
        <div className="mb-2 basis-[20%]">
          <div className="mx-auto max-w-[60px]">
            <img src={assets.images.logo} alt="logo" />
          </div>
        </div>
        <div className="basis-[60%] self-center">
          <div className="max-h-[470px] w-[70px] rounded-[45px] bg-[#C9C9C9] text-center">
            <NavLink to="/admin/dashboard/home" end>
              <Button className="btn-flips my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.slIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            <NavLink to="/admin/dashboard/projects" end>
              <Button className="btn-flips my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.projectIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            <NavLink to="/admin/dashboard/attachments" end>
              <Button className="btn-flips my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.photoIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            <NavLink to="/admin/dashboard/ne-users" end>
              <Button className="btn-flips my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.clipboardIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            <NavLink to="/admin/dashboard/ne-admin-users" end>
              <Button className="btn-flips my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.startegyIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            <NavLink to="/admin/dashboard/ne-role" end>
              <Button className="btn-flips my-[10px] h-[56px] min-w-[56px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.busnessIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="basis-[20%]">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button className="my-[10px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent p-0">
              <img
                src={assets.images.avatar1}
                alt="icon"
                className="h-full w-full max-w-full object-contain"
              />
            </Button>
            {authState ? (
              <Button
                onClick={() => {
                  logOut();
                  navigate('/admin');
                }}
                className="btn-flips my-[4px] h-[50px] min-w-[50px] rounded-[28px] bg-[#C9C9C9]"
              >
                <img
                  src={assets.images.logoutIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
