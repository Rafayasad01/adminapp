/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader';
import Loader2 from '../../components/common/Loader2';
import Notify from '../../components/common/Notify';
import { Setting } from '../../interfaces/app.interface';
import { setShopTenantState } from '../../redux/features/appStateSlice';
import ColorRowWithTooltips from '../../components/common/ColorRowWithTooltips';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/admin';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';
import DragDropFile from './DragDropFile';
import SocialLinksPopup from './SocialLinksPopup';

import { setSystemConfig } from '../../redux/features/authStateSlice';
import PermissionPopup from '../../utils/PermissionPopup';

type AssetsImages = keyof typeof assets.images;

const SocailLinks = ({ isOpen, setIsOpen, register }: any) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        className: 'Dialog app-dialog',
        style: { maxWidth: '40%', maxHeight: 'auto' },
      }}
    >
      <DialogContent className="Content">
        {/* <DialogHeader> */}
        <span className="mb-5 font-an-gurmukhi text-2xl">
          Add & Edit Socail Links
        </span>
        {/* <DialogTitle>Add & Edit Socail Links</DialogTitle> */}
        {/* </DialogHeader> */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="my-2 grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Facebook
              </span>
              <Input
                id="facebook"
                placeholder="https://www.facebook.com/"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.facebook')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Instagram
              </span>
              <Input
                id="instagram"
                placeholder="https://www.instagram.com/"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.instagram')}
              />
            </div>
            <div className="my-2 grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Twitter
              </span>
              <Input
                id="twitter"
                placeholder="https://www.twitter.com/"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.twitter')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Whats-app
              </span>
              <Input
                id="whatsapp"
                placeholder="+9234565432"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.whatsapp')}
              />
            </div>
            <div className="my-2 grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Linkedin
              </span>
              <Input
                id="linkedin"
                placeholder="https://www.linkedin.com/"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.linkedin')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-center font-an-gurmukhi">
                Youtube
              </span>
              <Input
                id="youtube"
                placeholder="https://www.youtube.com/"
                className="col-span-3 h-8 rounded bg-primary p-3 shadow outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-[1px]"
                {...register('media.youtube')}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function SettingsApp() {
  const { showMessage } = useSnackbar();
  const dispatch = useAppDispatch();
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [openSocialMediaPopup, setOpenSocialMediaPopup] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [detail, setDetail] = useState<any>();
  const [address, setAddress] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isMainLoader, setIsMainLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);
  const [settingData, setSettingData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogItem, setDialogItem] = useState<any>({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Setting>();

  const onSubmit = async (data: Setting) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    setIsMainLoader(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('desc', data.desc);
    formData.append('media', JSON.stringify(data.media));
    if (file) formData.append('logo', file);
    if (bannerFile) formData.append('banner', bannerFile);
    try {
      const settingSubmitData = await Service.updateService(formData);
      if (settingSubmitData.data.success) {
        setIsMainLoader(false);
        dispatch(setShopTenantState(settingSubmitData.data.data));
        dispatch(
          setSystemConfig({
            tenantLogo: settingSubmitData.data.data.logo,
            tenantBanner: settingSubmitData.data.data.banner,
          })
        );
        showMessage('Setting updated successfully', 'success');
      } else {
        setIsMainLoader(false);
        showMessage(settingSubmitData.data.message, 'error');
      }
    } catch (error: Error | any) {
      setIsMainLoader(false);
      showMessage(error.data.message, 'error');
    }
  };

  const fetchSetting = async () => {
    try {
      setIsLoader(true);
      const getSettingData = await Service.getService();
      if (getSettingData.data.success) {
        setIsLoader(false);
        setSettingData(getSettingData.data.data);
        setValue('name', getSettingData.data.data.name);
        setValue('address', getSettingData.data.data.address);
        setValue('desc', getSettingData.data.data.description);
        setValue('media', getSettingData.data.data.media);
        setValue('logo', getSettingData.data.data.logo);
        setValue('banner', getSettingData.data.data.banner);
      } else {
        setIsLoader(false);
        showMessage(getSettingData.data.message, 'error');
      }
    } catch (error: Error | any) {
      setIsLoader(false);
      showMessage(error.data.message, 'error');
      // console.log('error: ', error);
    }
  };

  const getAssignedTheme = () => {
    const assignedTheme = settingData?.assignThemes?.find(
      (x: any) => x.id === settingData.theme
    );
    return assignedTheme;
  };
  const handleSocialLinks = () => {
    const socialMediaMap = {
      facebook: <img src={assets.images.facebook} alt="fb-icon" />,
      instagram: <img src={assets.images.instagram} alt="insta-icon" />,
      twitter: <img src={assets.images.twitter} alt="twitter-icon" />,
      whatsapp: <img src={assets.images.whatsapp} alt="whatsapp-icon" />,
      linkedin: <img src={assets.images.linkedin} alt="linkedin-icon" />,
      youtube: <img src={assets.images.youtube} alt="youtube-icon" />,
    };
    const logosToShow = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, logo] of Object.entries(socialMediaMap)) {
      if (getValues(`media.${key}`)) {
        logosToShow.push(logo);
      }
    }
    if (logosToShow.length === 0) {
      return null;
    }
    return (
      <div className="mt-4 flex gap-2">
        {logosToShow?.map((logo, index) => (
          <span key={index} className="">
            {logo}
          </span>
        ))}
      </div>
    );
  };

  // const clickHandler = () => {
  //   setIsLoader(true);
  //   const themeObj = {
  //     theme: dialogItem.id,
  //     updatedBy: authState?.user?.id,
  //   };
  //   // console.log('themeObj:::::::', themeObj);
  //   Service.systemConfigColorChange(authState.user.tenant, themeObj)
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
  //         dispatch(setTheme(res.data.data.value.themeColor));
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

  useEffect(() => {
    fetchSetting();
  }, []);

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      {isOpen && (
        <SocailLinks
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          register={register}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-6 min-h-[500px] rounded-lg bg-white py-3 shadow-lg">
            <div className="Content w-full px-4 py-2">
              <div className="mb-1 text-base">
                <span className="font-an-gurmukhi text-secondary2">
                  Upload Shop Logo
                </span>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-5 mb-4">
                  <DragDropFile
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    setFile={setFile}
                    setImg={setSelectedImg}
                  />
                </div>
                {selectedImg ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={selectedImg}
                      alt="Shop Logo"
                    />
                  </div>
                ) : watch('logo') && watch('logo') ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={watch('logo')}
                      alt="Shop Logo"
                    />
                  </div>
                ) : null}
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="font-an-gurmukhi text-secondary2">
                    Address
                  </label>
                  <Input
                    className="rounded-lg border-[1px] border-secondary2 px-2 text-sm"
                    id="name"
                    placeholder="Update Name"
                    disableUnderline
                    {...register('name', {
                      pattern: PATTERN.ADDRESS_ONLY,
                      validate: (value) => value.length <= 100,
                      value: detail ? detail.name : '',
                    })}
                  />
                  {errors.name?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.name?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="font-an-gurmukhi text-secondary2">
                    Address
                  </label>
                  <Input
                    className="rounded-lg border-[1px] border-secondary2 px-2 text-sm"
                    id="address"
                    placeholder="Enter Address"
                    disableUnderline
                    {...register('address', {
                      pattern: PATTERN.ADDRESS_ONLY,
                      validate: (value) => value.length <= 250,
                      value: detail ? detail.address : '',
                    })}
                  />
                  {errors.address?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.address?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="font-an-gurmukhi text-secondary2">
                    Description{' '}
                    <span className="font-an-gurmukhi text-xs text-secondary2">
                      ( Write 01-350 Characters )
                    </span>
                  </label>
                  <TextField
                    className="border-2 font-dm-sans text-secondary2"
                    id="desc"
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder="Write Description"
                    {...register('desc', {
                      required: 'Description is required',
                      minLength: {
                        value: 1,
                        message: 'Minimum One Characters',
                      },
                      maxLength: {
                        value: 250,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
                </FormControl>
              </div>
              <div className="mt-5 flex items-center justify-start">
                <span className="font-an-gurmukhi text-secondary2">
                  Socail Links
                </span>
                <div className="mx-4">
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="outlined"
                    type="button"
                  >
                    Add & Edit
                  </Button>
                </div>
              </div>
              <div>{handleSocialLinks()}</div>
            </div>
          </div>
          <div className="col-span-6 min-h-[500px] rounded-lg bg-white shadow-lg">
            <div className="Content w-full px-4 py-5">
              <div className="mb-1 text-base">
                <span className="font-an-gurmukhi text-secondary2">
                  Upload Banner Logo
                </span>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-5 mb-4">
                  <DragDropFile
                    setIsNotify={setIsNotify}
                    setNotifyMessage={setNotifyMessage}
                    setFile={setFile}
                    setImg={setSelectedImg}
                  />
                </div>
                {selectedImg ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={selectedImg}
                      alt="Shop Logo"
                    />
                  </div>
                ) : watch('logo') && watch('logo') ? (
                  <div className="col-span-6 flex items-center xl:justify-center 2xl:justify-start">
                    <img
                      className="max-h-[100px] max-w-[150px] rounded-md"
                      src={watch('logo')}
                      alt="Shop Logo"
                    />
                  </div>
                ) : null}
              </div>
              <span className="font-bold">Active Theme</span>
              <div className="m-3">
                <div>
                  <p className="font-semibold">Key</p>
                  <span className="">
                    {getAssignedTheme() ? getAssignedTheme()?.key : ''}
                  </span>
                </div>
                <div className="my-2">
                  <p className="mb-1 font-semibold">Theme Colors</p>
                  <ColorRowWithTooltips
                    colors={
                      getAssignedTheme()
                        ? getAssignedTheme()?.value?.themeColor
                        : ''
                    }
                  />
                </div>
                <div className="">
                  <p className="mb-1 font-semibold">Category Colors</p>
                  <ColorRowWithTooltips
                    colors={
                      getAssignedTheme()
                        ? getAssignedTheme()?.value?.categoryColor
                        : ''
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-bold">Avaiables Themes</span>
                <div className="m-3 flex">
                  {settingData &&
                    settingData?.assignThemes
                      ?.filter((x: any) => x.id !== settingData?.theme)
                      ?.map((item: any, index: number) => {
                        return (
                          <div
                            onClick={() => {
                              setDialogItem({
                                text: 'Are you sure you want to apply this theme',
                                desc: 'This changes will impect in all your mobile, web app and your administration side',
                                id: item.id,
                              });
                              setDialogOpen(true);
                            }}
                            key={index}
                            className="relative mr-3 flex h-10 w-10 cursor-pointer overflow-hidden rounded-full border shadow-slate-700"
                          >
                            <span
                              style={{
                                backgroundColor: item.value.themeColor.primary,
                              }}
                              className="block h-[100%] w-[100%]"
                            />
                            <span
                              style={{
                                backgroundColor:
                                  item.value.themeColor.background,
                              }}
                              className="block h-[100%] w-[100%]"
                            />
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
            {/* {address ? (
              <MapAddress address={address} zoom={10} />
            ) : (
              <div className="no-map-location">
                <div className="content">
                  <div className="icon">
                    <img
                      className="w-100"
                      src={assets.images.noMapLocation}
                      alt=""
                    />
                  </div>
                  <h4 className="text">Location not available</h4>
                </div>
              </div>
            )} */}
            <div className="p-3">
              <Button
                type="submit"
                className="flex justify-self-end rounded-3xl bg-background text-primary"
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              >
                {isMainLoader ? <Loader2 minH="min-h-[26px]" /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {openSocialMediaPopup && (
        <SocialLinksPopup
          setIsLoader={setIsLoader}
          openDialog={openSocialMediaPopup}
          setOpenDialog={setOpenSocialMediaPopup}
          detail={detail}
          setDetail={setDetail}
        />
      )}
      {dialogOpen && (
        <PermissionPopup
          open={dialogOpen}
          setOpen={setDialogOpen}
          dialogText={dialogItem?.text}
          dialogDesc={dialogItem?.desc}
          // callback={clickHandler}
        />
      )}
    </div>
  );
}

export default SettingsApp;
