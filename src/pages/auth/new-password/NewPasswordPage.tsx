import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import assets from '../../../assets';

import Service from '../../../services/adminapp/admin';
import { NewPassword } from '../../../interfaces/auth.interface';

function NewPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<NewPassword>();

  const onSubmit = (data: NewPassword) => {
    if (data && data.password) {
      const newData = {
        password: data.password,
        code,
      };
      Service.createNewPassword(newData).then((item) => {
        console.log('item:::::::::', item);
      });
    }
  };

  const validatePassword = (val: any) => {
    if (password !== val) {
      setError('confirmPassword', {
        message: 'Passwords do not match',
      });
    } else {
      clearErrors('confirmPassword');
    }
  };

  useEffect(() => {
    // navigate(`address/${actionMenuItemid}`);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
          <img className="mt-4 mb-6" src={assets.images.logoBlack} alt="" />
          <div className="form-group w-full">
            <label htmlFor="password">New Password</label>
            <FormControl className="m-1 w-full" variant="filled">
              <Input
                className="input-with-icon after:border-b-neutral-900"
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
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
                <span role="alert">{errors.password?.message}</span>
              )}
            </FormControl>
          </div>
          <div className="form-group w-full">
            <label htmlFor="password">Confirm Password</label>
            <FormControl className="m-1 w-full" variant="filled">
              <Input
                className="input-with-icon after:border-b-neutral-900"
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                })}
                onChange={(event: any) => {
                  validatePassword(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                disableUnderline
              />
              {errors.confirmPassword && (
                <span role="alert">{errors.confirmPassword?.message}</span>
              )}
            </FormControl>
          </div>
          <div className="py-6" />
          <div className="mt-8 w-full px-4">
            <Input
              type="submit"
              value="Save"
              className="btn btn-black-fill"
              sx={{
                padding: '0.375rem 2rem !important',
              }}
              disableUnderline
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPasswordPage;
