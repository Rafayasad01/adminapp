import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import assets from '../../../assets';
// import { useAppDispatch } from '../../../redux/redux-hooks';
import AlertBox from '../../../utils/Alert';

function NewPasswordPage() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const code = params.get('code');
  // const [, setShowPassword] = useState(false);
  // const [, setShowConfirmPassword] = useState(false);
  // const [password] = useState('');
  const [alertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity] = useState('');
  // const [, setIsLoader] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleClickShowConfirmPassword = () =>
  //   setShowConfirmPassword((show) => !show);

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  // const {
  //   setError,
  //   clearErrors,
  //   formState: { errors },
  // } = useForm<NewPassword>();

  // const onSubmit = (data: NewPassword) => {
  //   setIsLoader(true);
  //   if (data && data.password) {
  //     const newData = {
  //       password: data.password,
  //       code,
  //     };
  //     Service.createNewPassword(newData).then((item) => {
  //       if (item.data.success) {
  //         setIsLoader(false);
  //         const newUserData = item.data.data;
  //         dispatch(setRolePermissions(newUserData.role));
  //         delete newUserData.role;
  //         dispatch(login(newUserData));
  //         if (newUserData.isSuperAdmin) {
  //           navigate('../../../main');
  //         } else {
  //           navigate('../../../dashboard');
  //         }
  //       } else {
  //         setIsLoader(false);
  //         setAlertMsg(item.data.message);
  //         setAlertSeverity('error');
  //         setShowAlert(true);
  //       }
  //     });
  //   }
  // };

  // const validatePassword = (val: any) => {
  //   if (password !== val) {
  //     setError('confirmPassword', {
  //       message: 'Passwords do not match',
  //     });
  //   } else {
  //     clearErrors('confirmPassword');
  //   }
  // };

  return (
    <>
      {/* <div className="flex h-full w-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
            <img className="mt-4 mb-6" src={assets.images.logoBlack} alt="" />
            <div className="form-group w-full">
              <label htmlFor="password">New Password</label>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
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
                  className="input-with-icon after:border-b-secondary"
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
              <Button
                type="submit"
                className="w-full bg-neutral-900 px-16 text-gray-50"
                variant="contained"
                color="inherit"
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
      </div> */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
      "
      >
        <div className="mx-auto  flex w-full  items-start justify-around max-[1560px]:items-center">
          <div className="w-[30%] self-start px-[30px]">
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
              <img
                src={assets.images.urApplogo}
                alt="urlaundry"
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="pt-[100px]">
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
                          <IconButton aria-label="toggle password visibility" />
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
                          <IconButton aria-label="toggle password visibility" />
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
          <div className="w-[70%] px-3 py-2">
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              <img
                src={assets.images.forgotBg}
                alt="urlaundry"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
    </>
  );
}

export default NewPasswordPage;
