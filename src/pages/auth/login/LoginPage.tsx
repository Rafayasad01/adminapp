import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import auth from '../../../services/adminapp/admin';
import system from '../../../services/superadmin/SystemConfig';
import { UserLogin } from '../../../interfaces/auth.interface';
import AlertBox from '../../../utils/Alert';
import { DEFAULT_THEME_COLORS, setToken } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import { login, setTenantConfig } from '../../../redux/features/authStateSlice';

import assets from '../../../assets';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';
import { setItemState, setLogo } from '../../../redux/features/appStateSlice';
import Loader from '../../../components/common/Loader';
import CustomButton from '../../../components/common/CustomButton';

// function LoginPage() {
//   const dispatch = useAppDispatch();
//   const tenantColors = useAppSelector((state) => state.authState);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [alertMsg, setAlertMsg] = useState('');
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertSeverity, setAlertSeverity] = useState('');
//   const [isLoader, setIsLoader] = useState(false);
//   const [isPageLoader, setIsPageLoader] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   console.log('tenantColors', tenantColors);

//   useEffect(() => {
//     setIsPageLoader(true);
//     // setIsPageLoader(true);
//     // let a = https://devadmin.urapptech.com/admin/auth/login
//     // const currentURL = (window.location.href).split('/')[2];
//     // console.log("currentURL", currentURL);
//     let url = 'devadminapp-development';
//     system
//       .getSystemConfig(url)
//       .then((res) => {
//         console.log("RES", res.data.data.theme);
//         setIsPageLoader(false);
//         if (res.data.success) {
//           dispatch(setTenantConfig(res.data.data.theme.value.themeColor));
//         } else {
//           dispatch(setTenantConfig(DEFAULT_THEME_COLORS));
//         }
//       })
//       .catch((err) => console.log('err', err.message));
//   }, []);

//   const loginHandler = async () => {
//     setIsLoader(true);
//     const userData: UserLogin = {
//       username: email,
//       password,
//     };
//     await auth
//       .loginService(userData)
//       .then((user) => {
//         if (user && user.data.success) {
//           setIsLoader(false);
//           const newUserData = user.data.data;
//           setToken(newUserData.token);
//           dispatch(setRolePermissions(newUserData.role));
//           delete newUserData.role;
//           dispatch(login(newUserData));
//           dispatch(setItemState(newUserData));
//           if (newUserData?.tenantConfig) {
//             dispatch(setLogo(user?.data?.data?.tenantConfig?.logo));
//           }
//           if (newUserData.isSuperAdmin) {
//             navigate('../../../main');
//           } else {
//             navigate('../../../dashboard');
//           }
//         } else {
//           setIsLoader(false);
//           setAlertMsg(user.data.message);
//           setAlertSeverity('error');
//           setShowAlert(true);
//         }
//       })
//       .catch((err) => {
//         setIsLoader(false);
//         setAlertMsg(err.message);
//         setAlertSeverity('error');
//         setShowAlert(true);
//       });
//   };

//   return isPageLoader ? (
//     <Loader />
//   ) : (
//     <>
//       {showAlert && (
//         <AlertBox
//           msg={alertMsg}
//           setSeverty={alertSeverity}
//           alertOpen={showAlert}
//           setAlertOpen={setShowAlert}
//         />
//       )}
//       <div className="flex h-full w-full items-center justify-center">
//         <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-[#fff] p-5">
//           <img className="my-4" src={assets.images.urApplogo} alt="" />
//           <div className="form-group w-full">
//             <label htmlFor="email" className="font-sans">
//               Email
//             </label>
//             <FormControl className="m-1 w-full" variant="standard">
//               <Input
//                 className="after:border-b-neutral-900"
//                 id="email"
//                 type="email"
//                 name="email"
//                 onChange={(event) => setEmail(event.target.value)}
//                 disableUnderline
//               />
//             </FormControl>
//           </div>
//           <div className="form-group w-full">
//             <label htmlFor="password">Password</label>
//             <FormControl className="m-1 w-full" variant="filled">
//               <Input
//                 className="input-with-icon after:border-b-neutral-900"
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 onChange={(event) => setPassword(event.target.value)}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                     >
//                       {showPassword ? (
//                         <VisibilityIcon />
//                       ) : (
//                         <VisibilityOffIcon />
//                       )}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 disableUnderline
//               />
//             </FormControl>
//           </div>
//           <div className="form-group self-end">
//             <NavLink
//               className="font-open-sans text-sm font-normal text-neutral-900"
//               to="../forgot-password"
//             >
//               Forget Password?
//             </NavLink>
//           </div>
//           <div className="mt-8 w-full px-4">
//             <Button
//               disabled={!!isLoader}
//               className="w-full bg-neutral-900 px-16 text-gray-50"
//               variant="contained"
//               color="inherit"
//               onClick={loginHandler}
//             >
//               {!isLoader ? (
//                 `Login`
//               ) : (
//                 <CircularProgress color="inherit" size={24} />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

const LoginPage = () => {
  return (
    <>
      {/* 404 page code start */}
      {/* <div className='w-full bg-[#F0F0F0] h-full flex justify-center items-center'>
                <div className='container flex justify-between items-center mx-auto px-10'>
                    <div className='w-[50%]'>
                        <img src={assets.images.speechBubble} className='max-w-full object-contain mx-auto' />
                    </div>
                    <div className='w-[50%]'>
                        <div className='text-[#1a1a1a] text-[25px] font-semibold uppercase leading-[normal] mb-[10px]'>
                            Looks like you’re lost
                        </div>
                        <div className='opacity-[0.3] text-[18px] text-[#1a1a1a] leading-[normal] font-normal mb-[30px]'>
                            The page you are looking for not available!
                        </div>

                    </div>
                </div>
            </div> */}
      {/* 404 page code end */}

      {/* Login screen start */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
      >
        <div className="h-full w-[40%] px-[30px]">
          <div className="w-full max-w-[200px] px-[25px] py-[40px]">
            <img src={assets.images.urApplogo} alt="urlaundry" />
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
                    className="border-1 border-solid border-[#949EAE]"
                    id="email"
                    type="email"
                    name="email"
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="form-group w-full">
                <label htmlFor="password">Password</label>
                <FormControl className="m-1 w-full" variant="filled">
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
                    id="password"
                    type=""
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility"></IconButton>
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
                  className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                  variant="contained"
                  color="inherit"
                  title="Login"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] p-3">
          <div className="mx-auto w-[800px] rounded-lg">
            <img
              src={assets.images.bgLogin}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      {/* Login screen end */}

      {/* forgot screen start */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
      >
        <div className="h-full w-[40%] px-[30px]">
          <div className="w-full max-w-[200px] px-[25px] py-[40px]">
            <img src={assets.images.urApplogo} alt="urlaundry" />
          </div>
          <div className="pt-[100px]">
            {/* <h1 className='text-[36px] text-black leading-[normal] font-bold capitalize mb-4 text-center'>log in</h1> */}
            <div className=" text-center">
              <img
                src={assets.images.envelopeMsg}
                alt="email"
                className="h-[100[px] mx-auto w-[100px]"
              />
            </div>
            <div className="mt-2 ">
              <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                Enter registered email
              </span>
              <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                to receive password reset link
              </span>
              <div className="form-group mt-[42px] w-full">
                <label
                  htmlFor="email"
                  className="mb-1 font-sans text-[14px] font-normal leading-[normal] text-[#06152B]"
                >
                  Email
                </label>
                <FormControl className="m-1 w-full" variant="standard">
                  <Input
                    className="border-1 border-solid border-[#949EAE]"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="haris@urlaundry.com"
                    disableUnderline
                  />
                </FormControl>
              </div>

              <div className="mt-[100px] w-full px-4 ">
                <Button
                  className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                  variant="contained"
                  color="inherit"
                  title="get code"
                >
                  Get Code
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] p-3">
          <div className="mx-auto w-[800px] rounded-lg">
            <img
              src={assets.images.forgotBg}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      {/* Forgot screen end */}

      {/* otp screen start */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
      >
        <div className="h-full w-[40%] px-[30px]">
          <div className="w-full max-w-[200px] px-[25px] py-[40px]">
            <img src={assets.images.urApplogo} alt="urlaundry" />
          </div>
          <div className="pt-[100px]">
            {/* <h1 className='text-[36px] text-black leading-[normal] font-bold capitalize mb-4 text-center'>log in</h1> */}
            <div className=" text-center">
              <img
                src={assets.images.otpMSg}
                alt="email"
                className="mx-auto h-[80px] w-[80px]"
              />
            </div>
            <div className="mt-2 ">
              <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                An 4 digit code has been sent to
              </span>
              <span className="block text-center text-[14px] font-medium leading-[normal] text-[#6A6A6A]">
                Vincent-bo@gmail.com
              </span>
              <div className="form-group mt-[42px] w-full text-center">
                {/* <label htmlFor="email" className="font-sans text-[14px] text-[#06152B] font-normal leading-[normal] mb-1">
             Email
             </label>
            <FormControl className="m-1 w-full" variant="standard">
              <Input
                className="border-[#949EAE] border-solid border-1"
                id="email"
                type="email"
                name="email"
                placeholder='haris@urlaundry.com'
                disableUnderline
              />
            </FormControl> */}
                <Input
                  type="text"
                  placeholder="3"
                  className="otp-v border-1 mr-[14px] h-[60px] w-[60px] rounded-[10px] border-solid border-[#949EAE] text-[36px] font-semibold leading-[normal] text-[#1a1a1a]"
                />
                <Input
                  type="text"
                  placeholder="3"
                  className="otp-v border-1 mr-[14px] h-[60px] w-[60px] rounded-[10px] border-solid border-[#949EAE] text-[36px] font-semibold leading-[normal] text-[#1a1a1a]"
                />
                <Input
                  type="text"
                  placeholder="3"
                  className="otp-v border-1 mr-[14px] h-[60px] w-[60px] rounded-[10px] border-solid border-[#949EAE] text-[36px] font-semibold leading-[normal] text-[#1a1a1a]"
                />
                <Input
                  type="text"
                  placeholder="3"
                  className="otp-v border-1 mr-2 h-[60px] w-[60px] rounded-[10px] border-solid border-[#949EAE] text-[36px] font-semibold leading-[normal] text-[#1a1a1a]"
                />
              </div>

              <div className="mt-[100px] w-full px-4 ">
                <Button
                  className="w-full rounded-[10px] bg-neutral-900 px-16 py-2 text-gray-50"
                  variant="contained"
                  color="inherit"
                  title="get code"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] p-3">
          <div className="mx-auto w-[800px] rounded-lg">
            <img
              src={assets.images.forgotBg}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      {/* otp  screen end */}

      {/* Create New screen start */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
      >
        <div className="h-full w-[40%] px-[30px]">
          <div className="w-full max-w-[200px] px-[25px] py-[40px]">
            <img src={assets.images.urApplogo} alt="urlaundry" />
          </div>
          <div className="pt-[150px]">
            <div className=" mb-[20px] text-center">
              <img
                src={assets.images.keyIcon}
                alt="email"
                className="mx-auto h-[80px] w-[80px]"
              />
            </div>
            <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
              Enter New Password
            </span>
            <div className="">
              <div className="form-group w-full">
                <label htmlFor="password">New Password</label>
                <FormControl className="m-1 w-full" variant="filled">
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
                    id="password"
                    type=""
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility"></IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
              </div>
              <div className="form-group w-full">
                <label htmlFor="password">Confirm Password</label>
                <FormControl className="m-1 w-full" variant="filled">
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
                    id="password"
                    type=""
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility"></IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
              </div>

              <div className="mt-8 w-full px-4">
                <Button
                  className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                  variant="contained"
                  color="inherit"
                  title="Login"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] p-3">
          <div className="mx-auto w-[800px] rounded-lg">
            <img
              src={assets.images.forgotBg}
              alt="urlaundry"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      {/* Create New screen end */}
    </>
  );
};

export default LoginPage;
