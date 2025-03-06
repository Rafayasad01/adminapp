/* eslint-disable react-hooks/exhaustive-deps */
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import { useNotification } from '../../components/Contexts/NotificationContext';
import ColorRowWithTooltips from '../../components/common/ColorRowWithTooltips';
import CustomButton from '../../components/common/CustomButton';
import Loader from '../../components/common/Loader';
import MapAddress from '../../components/common/MapAddress';
import Notify from '../../components/common/Notify';
import { setSystemConfig } from '../../redux/features/authStateSlice';
import { useAppSelector } from '../../redux/redux-hooks';
import system from '../../services/adminapp/SystemConfig';
import PermissionPopup from '../../utils/PermissionPopup';
import DragDropFile from './DragDropFile';

function SettingsConfig() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification, hideNotification, showNotification } =
    useNotification();
  const authState: any = useAppSelector((state) => state?.authState);
  const [data, setData] = useState<any>();
  const [allThemes, setAllThemes] = useState<any>([]);
  const [themeFile, setThemeFile] = useState<any>(null);
  const [themeSelectedImg, setThemeSelectedImg] = useState<any>(null);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  // const { notification, hideNotification, showNotification } = useNotification();
  const [address] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogItem, setDialogItem] = useState<any>({});

  // useEffect(() => {
  //   system
  //     .getSystemConfigByTenant(authState.user.tenant)
  //     .then((res) => {
  //       if (res.data.success) {
  //         setIsLoader(false);
  //         const temp = res.data.data.themes?.filter(
  //           (el: any) => el.id !== res.data.data.theme.id
  //         );
  //         setData({
  //           theme: res.data.data.theme,
  //           themes: temp,
  //           logo: res.data.data.logoffImage,
  //         });
  //         setAllThemes(res.data.data.themes);
  //         // console.log('ress', res.data.data);
  //       } else {
  //         setIsLoader(false);
  //         showNotification(res.data.message, 'error');
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       showNotification(err.message, 'error');
  //     });
  // }, []);

  // const clickHandler = () => {
  //   setIsLoader(true);
  //   const themeObj = {
  //     theme: dialogItem.id,
  //     updatedBy: authState?.user?.id,
  //   };
  //   // console.log('themeObj:::::::', themeObj);
  //   system
  //     .systemConfigColorChange(authState.user.tenant, themeObj)
  //     .then((res) => {
  //       if (res.data.success) {
  //         setIsLoader(false);
  //         const temp = allThemes.filter(
  //           (el: any) => el.id !== res.data.data.id
  //         );
  //         setData((prev: any) => {
  //           return {
  //             ...prev,
  //             theme: res.data.data,
  //             themes: temp,
  //           };
  //         });
  //         // dispatch(setTheme(res.data.data.value.themeColor));
  //       } else {
  //         setIsLoader(false);
  //         showNotification(res.data.message, 'error');
  //         // handleErrorMessage(res.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       showNotification(err.message, 'error');
  //       // handleErrorMessage(err.message);
  //     });
  // };

  // const layoutUpdateHandler = () => {
  //   setIsLoader(true);
  //   const formData = new FormData();
  //   if (themeFile !== null) formData.append('logoffImage', themeFile);
  //   system
  //     .systemConfigLayoutUpdate(authState.user.tenant, formData)
  //     .then((res) => {
  //       if (res.data.success) {
  //         const systemConfigData = {
  //           createdDate: res.data.data[0].createdDate,
  //           domain: res.data.data[0].domain,
  //           id: res.data.data[0].id,
  //           logoffImage: res.data.data[0].logoffImage,
  //           tenant: res.data.data[0].tenant,
  //         };
  //         setData((prev: any) => {
  //           return {
  //             ...prev,
  //             logo: res.data.data[0].logoffImage,
  //           };
  //         });
  //         dispatch(setSystemConfig(systemConfigData));
  //         setIsLoader(false);
  //       } else {
  //         setIsLoader(false);
  //         showNotification(res.data.message, 'error');
  //         // handleErrorMessage(res.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       showNotification(err.message, 'error');
  //       // handleErrorMessage(err.message);
  //     });
  // };

  // return isLoader ? (
  //   <Loader />
  // ) : (
  //   <>
  //     <Notify
  //       isOpen={isNotify}
  //       setIsOpen={setIsNotify}
  //       displayMessage={notifyMessage}
  //     />
  //     <div className="grid w-full grid-cols-12 gap-3">
  //       <div className="col-span-6 min-h-[500px] rounded-lg bg-white py-3 shadow-lg">
  //         <div className="custom-tab">
  //           <Tabs value="SYSTEM_CONFIGURATION" aria-label="basic tabs example">
  //             <Tab
  //               label="App Settings"
  //               value="APP_SETTINGS"
  //               onClick={() => navigate('../app')}
  //             />
  //             <Tab
  //               label="System Configuration"
  //               value="SYSTEM_CONFIGURATION"
  //               onClick={() => navigate('../config')}
  //             />
  //             {/* <Tab
  //               label="Shop Scheduling"
  //               value="SHOP_SCHEDULING"
  //               onClick={() => navigate('../shop')}
  //             /> */}
  //           </Tabs>
  //         </div>
  //         <div className="Content w-full px-4 py-5">
  //           <div>
  //             <span className="font-bold">Active Theme</span>
  //             <div className="m-3">
  //               <div>
  //                 <p className="font-semibold">Key</p>
  //                 <span className="">{data ? data?.theme?.key : ''}</span>
  //               </div>
  //               <div className="my-2">
  //                 <p className="mb-1 font-semibold">Theme Colors</p>
  //                 <ColorRowWithTooltips
  //                   colors={data ? data?.theme?.value?.themeColor : ''}
  //                 />
  //               </div>
  //               <div className="">
  //                 <p className="mb-1 font-semibold">Category Colors</p>
  //                 <ColorRowWithTooltips
  //                   colors={data ? data?.theme?.value?.categoryColor : ''}
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-4">
  //               <span className="font-bold">Avaiables Themes</span>
  //               <div className="m-3 flex">
  //                 {data &&
  //                   data?.themes?.map((item: any, index: number) => {
  //                     return (
  //                       <div
  //                         onClick={() => {
  //                           setDialogItem({
  //                             text: 'Are you sure you want to apply this theme',
  //                             desc: 'This changes will impect in all your mobile, web app and your administration side',
  //                             id: item.id,
  //                           });
  //                           setDialogOpen(true);
  //                         }}
  //                         key={index}
  //                         className="relative mr-3 flex h-10 w-10 cursor-pointer overflow-hidden rounded-full border shadow-slate-700"
  //                       >
  //                         <span
  //                           style={{
  //                             backgroundColor: item.value.themeColor.primary,
  //                           }}
  //                           className="block h-[100%] w-[100%]"
  //                         />
  //                         <span
  //                           style={{
  //                             backgroundColor: item.value.themeColor.background,
  //                           }}
  //                           className="block h-[100%] w-[100%]"
  //                         />
  //                       </div>
  //                     );
  //                   })}
  //               </div>
  //             </div>
  //             <div className="mt-5 rounded-lg border p-3">
  //               <div className="mb-3">
  //                 <span className="font-bold">Logoff Image</span>
  //               </div>
  //               <div className="grid grid-cols-12 items-center">
  //                 <div className="col-span-5">
  //                   <DragDropFile
  //                     setIsNotify={setIsNotify}
  //                     setNotifyMessage={setNotifyMessage}
  //                     setFile={setThemeFile}
  //                     setImg={setThemeSelectedImg}
  //                   />
  //                 </div>
  //                 {themeSelectedImg ? (
  //                   <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
  //                     <img
  //                       className="max-h-[150px] max-w-[220px] rounded-md"
  //                       src={themeSelectedImg}
  //                       alt="theme Logo"
  //                     />
  //                   </div>
  //                 ) : data?.logo ? (
  //                   <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
  //                     <img
  //                       className="max-h-[150px] max-w-[220px] rounded-md"
  //                       src={data?.logo}
  //                       alt="theme Logo"
  //                     />
  //                   </div>
  //                 ) : null}
  //               </div>
  //               <div className="mx-1">
  //                 <span className="text-xs">
  //                   Hint: Image should be 1080px by 1080px
  //                 </span>
  //                 <br />

  //                 <span className="text-xs">
  //                   Info: Small size Image may pixelate.
  //                 </span>
  //               </div>
  //               {themeSelectedImg && (
  //                 <div className="flex items-center justify-end">
  //                   <CustomButton
  //                     className="btn-black-fill w-32"
  //                     buttonType="button"
  //                     title="Update"
  //                     onclick={layoutUpdateHandler}
  //                   />
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-span-6 min-h-[500px] rounded-lg bg-white shadow-lg">
  //         {address ? (
  //           <MapAddress address={address} zoom={10} />
  //         ) : (
  //           <div className="no-map-location">
  //             <div className="content">
  //               <div className="icon">
  //                 <img
  //                   className="w-100"
  //                   src={assets.images.noMapLocation}
  //                   alt=""
  //                 />
  //               </div>
  //               <h4 className="text">Location not available</h4>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     {dialogOpen && (
  //       <PermissionPopup
  //         open={dialogOpen}
  //         setOpen={setDialogOpen}
  //         dialogText={dialogItem?.text}
  //         dialogDesc={dialogItem?.desc}
  //         callback={clickHandler}
  //       />
  //     )}
  //     {notification && (
  //       <Notify
  //         isOpen
  //         setIsOpen={hideNotification}
  //         displayMessage={notification}
  //       />
  //     )}
  //   </>
  // );
}

export default SettingsConfig;
