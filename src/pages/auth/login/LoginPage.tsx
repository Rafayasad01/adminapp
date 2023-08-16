import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import styles from '../../../assets/css/AuthPage.module.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const loginHandler = () => {
    navigate('/dashboard/home');
  };

  return (
    <div className={styles.bg}>
      <div className={styles.centerBox}>
        <img className={styles.logo} src={assets.images.logoBlack} alt="" />
        <div className={styles.midBox}>
          <div className="form-group">
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
          <div className="form-group">
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                disableUnderline
              />
            </FormControl>
          </div>
          <div className="form-group">
            <NavLink to="#" className={styles.forgotPassword}>
              Forget Password?
            </NavLink>
          </div>
        </div>
        <div className={`form-group ${styles.submitBtn}`}>
          <Button variant="contained" onClick={loginHandler}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
