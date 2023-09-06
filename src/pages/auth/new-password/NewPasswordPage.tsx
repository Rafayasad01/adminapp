import { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import assets from '../../../assets';

function NewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const saveHandler = () => { };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
        <img className="mt-4 mb-6" src={assets.images.logoBlack} alt="" />

        <div className="form-group w-full">
          <label htmlFor="password">New Password</label>
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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
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
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
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
          </FormControl>
        </div>
        <div className="py-6" />
        <div className="mt-8 w-full px-4">
          <Button
            className=" w-full bg-neutral-900 px-16 text-gray-50"
            variant="contained"
            color="inherit"
            onClick={saveHandler}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordPage;
