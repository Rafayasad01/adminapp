/* eslint-disable jsx-a11y/img-redundant-alt */
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import FastSpinner from '../../../components/common/CustomSpinner';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Notify from '../../../components/common/Notify';
import { UserLogin } from '../../../interfaces/auth.interface';
import { setItemState, setLogo } from '../../../redux/features/appSlice';
import { login, setShopAdminTenant } from '../../../redux/features/authSlice';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';
import { useAppDispatch } from '../../../redux/redux-hooks';
import authService from '../../../services/adminapp/admin';
import appUserService from '../../../services/adminapp/adminAppUser';
import { handleTitleText } from '../../../utils/constants';
import { setItem } from '../../../utils/storage';

interface LoginFields {
  email: string;
  password: string;
}

function LoginPage() {
  const dispatch = useAppDispatch();
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

  const handleAnonAppUser = (user: any) => {
    const anonIdentifier = user?.username?.split('@')[0];
    const payload = {
      identifier: `${anonIdentifier}@shop.com`,
      tenant: user?.tenant,
    };
    appUserService
      .appAnonymousLogin(payload)
      .then((res) => {
        if (res.data.success) {
          dispatch(login({ ...user, anonAppUser: res.data.data.id }));
        } else {
          showNotification(res.data.message, 'error');
        }
      })
      .catch((err) => {
        showNotification(err.message, 'error');
      });
  };

  const loginHandler = async (data: LoginFields) => {
    setIsLoader(true);
    const userData: UserLogin = {
      username: data.email.trim().replace(/\s+/g, ''),
      password: data.password,
    };
    await authService
      .loginService(userData)
      .then(async (user) => {
        if (user && user.data.success) {
          await handleAnonAppUser(user.data.data);
          const newUserData = user.data.data;
          setIsLoader(false);
          setItem('AUTH_TOKEN', newUserData.accessToken);
          setItem('REFRESH_TOKEN', newUserData.refreshToken);
          dispatch(setRolePermissions(newUserData.role));
          handleTitleText(newUserData.role.permissions);
          delete newUserData.role;
          dispatch(login(newUserData));
          dispatch(setItemState(newUserData));
          if (newUserData?.tenantConfig) {
            dispatch(setLogo(user?.data?.data?.tenantConfig?.logo));
          }
          if (newUserData?.userType === 'ShopUser') {
            dispatch(
              setShopAdminTenant({
                tenant: newUserData.tenant,
                tenantName: newUserData.tenantName,
                maxEmployeeLimit: newUserData.maxEmployeeLimit,
                branchLimit: newUserData.branchLimit,
              })
            );
          }
          navigate('../../../dashboard');
        } else {
          setIsLoader(false);
          showNotification(user.data.message, 'error');
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showNotification(err.message, 'error');
      });
  };

  return (
    <div className="flex  h-full w-full items-center justify-center bg-background">
      <div className="mx-auto  flex w-full  items-start justify-around max-[1560px]:items-center">
        <div className="w-[50%]  self-start px-[30px]">
          <div className="flex max-h-[29px] w-full max-w-[600px] items-center justify-start px-[25px] py-[40px]">
            <img
              src={assets.images.logo}
              alt="login-logo"
              className="mt-10 h-auto w-[60px] object-contain"
            />
          </div>
          <div className="xl:pt-[50px] 2xl:pt-[150px]">
            <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
              Welcome
            </h1>
            <form onSubmit={handleSubmit(loginHandler)}>
              <div className="px-[15%]">
                <div className="form-group w-full">
                  <p className="mb-1 font-sans text-[12px] font-normal leading-[normal] text-[#06152B]">
                    Email
                  </p>
                  <FormControl className="m-1 w-full " variant="standard">
                    <Input
                      className="border-1  border-solid border-secondary text-[11px]"
                      id="email"
                      placeholder="user@example.com"
                      type="email"
                      {...register('email', {
                        required: 'Please enter your email.',
                      })}
                      disableUnderline
                    />
                    {errors.email && (
                      <ErrorSpanBox error={errors.email?.message} />
                    )}
                  </FormControl>
                </div>
                <div className="form-group w-full">
                  <p className="mb-1 text-[12px]">Password</p>
                  <FormControl className="m-1 w-full" variant="filled">
                    <Input
                      className="input-with-icon text-[11px] after:border-b-secondary"
                      id="password"
                      placeholder="********"
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
                <div className="form-group self-end">
                  <NavLink
                    className="font-open-sans text-[11px] font-normal text-neutral-900 hover:underline"
                    to="../forgot-password"
                  >
                    Forget Password?
                  </NavLink>
                </div>
                <div className="mt-8 w-full px-4">
                  <Button
                    disabled={!!isLoader}
                    className="btn-black-fill w-full bg-primary px-16 py-2 text-gray-50"
                    variant="contained"
                    color="inherit"
                    title="Login"
                    type="submit"
                  >
                    {isLoader ? <FastSpinner /> : 'Login'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[50%] px-3 py-2">
          <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
            <div className="flex">
              <div className="relative min-h-[984px] w-[735px] flex-1 overflow-hidden">
                <img
                  src={assets.images.splash1}
                  alt="Image 1"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash2}
                  alt="Image 2"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash3}
                  alt="Image 3"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash4}
                  alt="Image 4"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash6}
                  alt="Image 6"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash7}
                  alt="Image 7"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash8}
                  alt="Image 8"
                  className="ne-fade-image absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
        {notification && (
          <Notify
            isOpen
            setIsOpen={hideNotification}
            displayMessage={notification}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
