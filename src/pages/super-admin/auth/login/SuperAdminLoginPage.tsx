import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import auth from '../../../../services/superadmin/SuperAdminAuth';
import { SuperadminUserLogin } from '../../../../interfaces/superadmin/auth.interface';
import AlertBox from '../../../../utils/Alert';
import { setToken } from '../../../../utils/constants';
import { useAppDispatch } from '../../../../redux/redux-hooks';
import { login } from '../../../../redux/features/authStateSlice';

import assets from '../../../../assets';

function SuperAdminLoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const loginHandler = async () => {
    const userData: SuperadminUserLogin = {
      username: email,
      password,
    };
    setIsLoader(true);
    const user: any = await auth.loginService(userData);
    if (user && user.data.success) {
      setIsLoader(false);
      console.log('superadmin', user.data.data);

      const newUserData = user.data.data;
      setToken(newUserData.token);
      dispatch(login(newUserData));
      if (newUserData.isSuperAdmin) {
        navigate('../../main');
      } else {
        navigate('../../../dashboard/home');
      }
    } else {
      setIsLoader(false);
      setAlertMsg(user.data.message);
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
          <img className="my-4" src={assets.images.logoBlack} alt="" />
          <div className="form-group w-full">
            <label htmlFor="email" className="font-sans">
              Email
            </label>
            <FormControl className="m-1 w-full" variant="standard">
              <Input
                className="after:border-b-neutral-900"
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
                className="input-with-icon after:border-b-neutral-900"
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
              className="w-full bg-neutral-900 px-16 text-gray-50"
              variant="contained"
              color="inherit"
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
    </>
  );
}

export default SuperAdminLoginPage;
