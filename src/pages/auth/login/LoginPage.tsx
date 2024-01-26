import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLogin } from '../../../interfaces/auth.interface';
import {
  login,
  setSystemConfig,
  setTheme,
} from '../../../redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import auth from '../../../services/adminapp/admin';
import system from '../../../services/adminapp/SystemConfig';
import { setToken } from '../../../utils/constants';

import assets from '../../../assets';
import Loader from '../../../components/common/Loader';
import { setItemState, setLogo } from '../../../redux/features/appStateSlice';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';

function LoginPage() {
  const dispatch = useAppDispatch();
  const systemConfigData = useAppSelector(
    (state: any) => state.authState.systemConfig
  );

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isPageLoader, setIsPageLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // const { notification, hideNotification, showNotification } =
  //   useNotification();

  //   console.log('tenantColors', tenantColors);
  let url = 'development';

  useEffect(() => {
    setIsPageLoader(true);
    // setIsPageLoader(true);
    // let a = https://devadmin.urapptech.com/admin/auth/login
    // const currentURL = (window.location.href).split('/')[2];
    // console.log("currentURL", currentURL);
    system
      .getSystemConfig(url)
      .then((res) => {
        setIsPageLoader(false);
        if (res.data.success) {
          let systemConfigData = {
            createdDate: res.data.data.createdDate,
            domain: res.data.data.domain,
            id: res.data.data.id,
            logoffImage: res.data.data.logoffImage,
            tenant: res.data.data.tenant,
            shopName: res.data.data.tenantConfig.name,
            shopLogo: res.data.data.tenantConfig.logo,
          };
          dispatch(setTheme(res.data.data.theme.value.themeColor));
          dispatch(setSystemConfig(systemConfigData));
        } else {
          setIsPageLoader(false);
          // showNotification(res.data.message, 'error');
          console.log('404 page');
        }
      })
      .catch((err: Error) => {
        setIsPageLoader(false);
        // showNotification(err.message, 'error');
      });
  }, []);

  const loginHandler = async () => {
    setIsLoader(true);
    const userData: UserLogin = {
      username: email,
      password,
    };
    await auth
      .loginService(userData)
      .then(async (user) => {
        if (user && user.data.success) {
          const newUserData = user.data.data;
          setIsLoader(false);
          setToken(newUserData.token);
          dispatch(setRolePermissions(newUserData.role));
          delete newUserData.role;
          dispatch(login(newUserData));
          dispatch(setItemState(newUserData));
          if (newUserData?.tenantConfig) {
            dispatch(setLogo(user?.data?.data?.tenantConfig?.logo));
          }
          navigate('../../../dashboard');
        } else {
          setIsLoader(false);
          setAlertMsg(user.data.message);
          setAlertSeverity('error');
          setShowAlert(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setAlertMsg(err.message);
        setAlertSeverity('error');
        setShowAlert(true);
      });
  };

  return isPageLoader ? (
    <Loader />
  ) : (
    <div
      className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
    >
      <div className="h-full w-[40%] px-[30px]">
        <div className="w-full max-w-[150px] px-[25px] py-[40px]">
          <img
            src={systemConfigData?.shopLogo ?? systemConfigData?.shopName}
            alt="urlaundry"
          />
        </div>
        <div className="pt-[150px]">
          <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
            log in
          </h1>
          <div className="">
            <div className="form-group w-full">
              <label
                htmlFor="email"
                className="mb-1 font-sans text-[14px] font-normal leading-[normal] text-[#06152B]"
              >
                Email
              </label>
              <FormControl className="m-1 w-full" variant="standard">
                <Input
                  className="border-1 border-solid border-secondary"
                  id="email"
                  type="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  disableUnderline
                />
              </FormControl>
            </div>
            <div className="form-group w-full">
              <label htmlFor="password">Password</label>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
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
              </FormControl>
            </div>
            <div className="form-group self-end">
              <NavLink
                className="font-open-sans text-sm font-normal text-neutral-900"
                to="../forgot-password"
              >
                Forget Password?
              </NavLink>
            </div>
            <div className="mt-8 w-full px-4">
              <Button
                disabled={!!isLoader}
                className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                variant="contained"
                color="inherit"
                title="Login"
                onClick={loginHandler}
              >
                {!isLoader ? (
                  `Login`
                ) : (
                  <CircularProgress color="inherit" size={24} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] p-3">
        <div className="mx-auto w-[800px] rounded-lg">
          {systemConfigData?.logoffImage ? (
            <img
              src={systemConfigData?.logoffImage || assets.images.bgLogin}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-semibold">Image isn't uploaded yet</p>
              <span className="text-sm font-medium">
                Hint: You can upload under setting module from setting config
                tab
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
