import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Notify from '../../../components/common/Notify';
import { UserLogin } from '../../../interfaces/auth.interface';
import { setShopTenantState } from '../../../redux/features/appStateSlice';
// import { setItemState, setLogo } from '../../../redux/features/appStateSlice';
import {
  login,
  // setShopAdminTenant,
} from '../../../redux/features/authStateSlice';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import auth from '../../../services/adminapp/admin';
import { setItem } from '../../../utils/storage';
import { useSnackbar } from '../../../components/hooks/useSnackbar';

interface LoginFields {
  email: string;
  password: string;
}

function LoginPage() {
  const { showMessage } = useSnackbar();
  const dispatch = useAppDispatch();
  const systemConfig = useAppSelector(
    (state: any) => state.authState.systemConfig
  );
  const { notification, hideNotification, showNotification } =
    useNotification();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const loginHandler = async (data: LoginFields) => {
    setIsLoader(true);
    const userData: UserLogin = {
      identifier: data.email,
      password: data.password,
    };
    try {
      const user = await auth.loginService(userData);
      if (user.data.success) {
        setIsLoader(false);
        const { tenantConfig, ...rest } = user.data.data;
        dispatch(login(rest));
        dispatch(setShopTenantState(tenantConfig));
      } else {
        setIsLoader(false);
        showMessage(user.data.message, 'success');
      }
    } catch (err: Error | any) {
      setIsLoader(false);
      showMessage(err?.response?.data?.message, 'error');
    }

    // await auth
    //   .loginService(userData)
    //   .then(async (user) => {
    //     if (user && user.data.success) {
    //       const newUserData = user.data.data;
    //       setIsLoader(false);
    //       setItem('AUTH_TOKEN', newUserData.accessToken);
    //       setItem('REFRESH_TOKEN', newUserData.refreshToken);
    //       dispatch(setRolePermissions(newUserData.role));
    //       delete newUserData.role;
    //       dispatch(login(newUserData));
    //       dispatch(setItemState(newUserData));
    //       if (newUserData?.tenantConfig) {
    //         dispatch(setLogo(user?.data?.data?.tenantConfig?.logo));
    //       }
    //       // if (newUserData?.userType === 'ShopUser') {
    //       //   dispatch(
    //       //     setShopAdminTenant({
    //       //       tenant: newUserData.tenant,
    //       //       tenantName: newUserData.tenantName,
    //       //       maxEmployeeLimit: newUserData.maxEmployeeLimit,
    //       //       branchLimit: newUserData.branchLimit,
    //       //     })
    //       //   );
    //       // }
    //       navigate('../../../dashboard');
    //     } else {
    //       setIsLoader(false);
    //       showNotification(user.data.message, 'error');
    //       // setAlertMsg(user.data.message);
    //       // setAlertSeverity('error');
    //       // setShowAlert(true);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     showNotification(err.message, 'error');
    //     // setAlertMsg(err.message);
    //     // setAlertSeverity('error');
    //     // setShowAlert(true);
    //   });
  };

  return (
    <div className="relative h-full w-full bg-background">
      <div className="absolute top-[20px] left-[56px]">
        <img
          src={assets.images.loginVectorOne}
          alt="vector-one"
          className="h-[520px] object-contain 2xl:h-[800px]"
        />
      </div>
      <div className="absolute top-[0px] right-[0px]">
        <img
          src={assets.images.loginVectorTwo}
          alt="vector-one"
          className="h-[260px] object-contain"
        />
      </div>
      <div className="absolute bottom-[200px] right-[230px] 2xl:bottom-[450px]">
        <img
          src={assets.images.loginVectorFour}
          alt="vector-one"
          className="h-[70px] object-contain"
        />
      </div>
      <div className="absolute bottom-[55px] right-[100px]">
        <img
          src={assets.images.loginVectorFive}
          alt="vector-one"
          className="h-[100px] object-contain"
        />
      </div>
      <div className="absolute bottom-[0px] left-[0px]">
        <img
          src={assets.images.loginVectorThree}
          alt="vector-one"
          className="h-[100px] object-contain"
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          className="z-10 h-[480px] w-[473px] rounded-2xl bg-primary py-10 px-5"
          onSubmit={handleSubmit(loginHandler)}
        >
          <div className="">
            <div className="flex items-center justify-center">
              <img
                src={assets.images.mdalderIcon}
                alt="mdalder-icon"
                className="object-contain"
              />
            </div>
            <div className="form-group mt-5 w-full">
              <span className="my-2 block font-an-gurmukhi text-[16px] font-normal leading-[normal] text-secondary2">
                Email Address
              </span>
              <FormControl className="m-1 h-full w-full" variant="standard">
                <Input
                  className="h-[50px] text-secondary2"
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Please enter your email.',
                  })}
                  disableUnderline
                />
                {errors.email && <ErrorSpanBox error={errors.email?.message} />}
              </FormControl>
            </div>
            <div className="form-group w-full">
              <span className="my-2 block font-an-gurmukhi text-[16px] text-secondary2">
                Password
              </span>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  className="input-with-icon h-[50px] after:border-b-secondary"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Please enter your password.',
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
                {errors.password && (
                  <ErrorSpanBox error={errors.password?.message} />
                )}
              </FormControl>
            </div>
            <div className="form-group flex items-center justify-end self-end">
              <NavLink
                className="text-end font-open-sans text-sm font-normal text-background"
                to="../forgot-password"
              >
                Reset Password?
              </NavLink>
            </div>
            <div className="mt-8 w-full px-4">
              <Button
                disabled={!!isLoader}
                className="w-full rounded-2xl bg-background px-16 py-4 text-primary"
                variant="contained"
                color="inherit"
                title="Login"
                type="submit"
              >
                {!isLoader ? (
                  `Login`
                ) : (
                  <CircularProgress color="inherit" size={24} />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="flex  h-full w-full items-center justify-center bg-[#F0F0F0]">
  //     <div className="mx-auto  flex w-full  items-start justify-around max-[1560px]:items-center">
  //       {/* <div className="w-[30%]  self-start px-[30px]">
  //         <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
  //           <img
  //             src={systemConfig?.shopLogo ?? systemConfig?.shopName}
  //             alt="urlaundry"
  //             className="h-auto w-full object-contain"
  //           />
  //         </div>
  //         <div className="pt-[150px]">
  //           <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
  //             log in
  //           </h1>
  //           <form onSubmit={handleSubmit(loginHandler)}>
  //             <div className="">
  //               <div className="form-group w-full">
  //                 <label
  //                   htmlFor="email"
  //                   className="mb-1 font-sans text-[14px] font-normal leading-[normal] text-[#06152B]"
  //                 >
  //                   Email
  //                 </label>
  //                 <FormControl className="m-1 w-full" variant="standard">
  //                   <Input
  //                     className="border-1 border-solid border-secondary"
  //                     id="email"
  //                     type="email"
  //                     {...register('email', {
  //                       required: 'Please enter your email.',
  //                     })}
  //                     disableUnderline
  //                   />
  //                   {errors.email && (
  //                     <ErrorSpanBox error={errors.email?.message} />
  //                   )}
  //                 </FormControl>
  //               </div>
  //               <div className="form-group w-full">
  //                 <label htmlFor="password">Password</label>
  //                 <FormControl className="m-1 w-full" variant="filled">
  //                   <Input
  //                     className="input-with-icon after:border-b-secondary"
  //                     id="password"
  //                     type={showPassword ? 'text' : 'password'}
  //                     {...register('password', {
  //                       required: 'Please enter your password.',
  //                     })}
  //                     endAdornment={
  //                       <InputAdornment position="end">
  //                         <IconButton
  //                           aria-label="toggle password visibility"
  //                           onClick={handleClickShowPassword}
  //                           onMouseDown={handleMouseDownPassword}
  //                         >
  //                           {showPassword ? (
  //                             <VisibilityIcon />
  //                           ) : (
  //                             <VisibilityOffIcon />
  //                           )}
  //                         </IconButton>
  //                       </InputAdornment>
  //                     }
  //                     disableUnderline
  //                   />
  //                   {errors.password && (
  //                     <ErrorSpanBox error={errors.password?.message} />
  //                   )}
  //                 </FormControl>
  //               </div>
  //               <div className="form-group self-end">
  //                 <NavLink
  //                   className="font-open-sans text-sm font-normal text-neutral-900"
  //                   to="../forgot-password"
  //                 >
  //                   Forget Password?
  //                 </NavLink>
  //               </div>
  //               <div className="mt-8 w-full px-4">
  //                 <Button
  //                   disabled={!!isLoader}
  //                   className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
  //                   variant="contained"
  //                   color="inherit"
  //                   title="Login"
  //                   type="submit"
  //                 >
  //                   {!isLoader ? (
  //                     `Login`
  //                   ) : (
  //                     <CircularProgress color="inherit" size={24} />
  //                   )}
  //                 </Button>
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //       <div className="w-[70%] px-3 py-2">
  //         {/* <div className="mx-auto max-w-[800px] overflow-hidden rounded-lg flex justify-center items-center min-h-[800px] min-[1600px]:max-w-[934px] "> */}
  //       <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
  //         {systemConfig?.logoffImage ? (
  //           <img
  //             src={systemConfig?.logoffImage || assets.images.bgLogin}
  //             alt="urlaundry"
  //             className="h-full w-full object-contain"
  //           />
  //         ) : (
  //           <div className="flex flex-col items-center justify-center">
  //             <p className="text-xl font-semibold">Image is not uploaded yet</p>
  //             <span className="text-sm font-medium">
  //               Hint: You can upload under setting module from setting config
  //               tab
  //             </span>
  //           </div>
  //         )}
  //       </div>
  //       {/* </div> */}
  //       {/* {notification && (
  //         <Notify
  //           isOpen
  //           setIsOpen={hideNotification}
  //           displayMessage={notification}
  //         />
  //       )} */}
  //     </div>
  //   </div>
  // );
}

export default LoginPage;
