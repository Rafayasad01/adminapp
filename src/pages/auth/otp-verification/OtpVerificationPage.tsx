import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react18-otp-input';
import assets from '../../../assets';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import auth from '../../../services/adminapp/admin';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';

interface Pass {
  newPassword: string;
  reNewPassword: string;
}

function OTPVerificationPage() {
  const navigate = useNavigate();
  const systemConfig = useAppSelector(
    (state: any) => state.authState.systemConfig
  );
  const [OTP, setOTP] = useState('');
  const location = useLocation();
  const state = location.state;
  const [isLoader, setIsLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { notification, hideNotification, showNotification } =
    useNotification();
  // console.log("🚀 ~ OTPVerificationPage ~ OTP:", state)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () =>
    setShowNewPassword((newShow) => !newShow);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Pass>();

  const submitHandler = (data: Pass) => {
    setIsLoader(true);
    const newPassObj = {
      password: data.newPassword,
      email: state?.email,
      otp: OTP,
    };
    auth
      .newPasswordService(newPassObj)
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setTimeout(() => {
            showNotification(res.data.message, 'success');
            navigate('../login', { replace: true });
          }, 500);
        } else {
          setIsLoader(false);
          showNotification(res.data.message, 'error');
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        showNotification(err.message, 'error');
      });
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
        <div className="mx-auto  flex w-full  items-start justify-around max-[1560px]:items-center">
          <div className="w-[30%] self-start px-[30px]">
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
              <img
                src={systemConfig?.shopLogo ?? systemConfig?.shopName}
                alt="urlaundry"
                className="h-auto w-full object-contain"
              />
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
                <span className="block text-center text-[14px] font-semibold leading-[normal] text-[#6A6A6A]">
                  {state?.email}
                </span>
                <span className="mx-10 mt-2 block text-center text-[13px] font-normal leading-[normal] text-[#6A6A6A]">
                  Note : Please check your email for the OTP code and paste it
                  here; otherwise, it will expire within an hour.
                </span>
                <div className="mt-[42px] flex w-full items-center justify-center text-center">
                  <OtpInput
                    placeholder="1234"
                    className="mx-2"
                    containerStyle="otp-container"
                    inputStyle={{
                      width: '3rem',
                      aspectRatio: '1/1',
                      borderRadius: '0.625rem',
                      outlineStyle: 'solid',
                      outlineWidth: '1px',
                      outlineColor: '#E5E5E5',
                      fontFamily: 'Open Sans',
                      fontSize: '1.25rem',
                      lineHeight: '1.5rem',
                      fontWeight: 600,
                      color: '#000000',
                    }}
                    focusStyle={{ outlineColor: '#000000' }}
                    numInputs={4}
                    onChange={(value: string) => setOTP(value)}
                    separator={<span> </span>}
                    isInputNum
                    shouldAutoFocus
                    value={OTP}
                  />
                </div>
                {OTP?.length > 3 && (
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col">
                      <FormControl className="FormControl" variant="standard">
                        <div className="form-group mt-[42px] w-full">
                          <label
                            htmlFor="email"
                            className="mb-1 text-[14px] font-normal leading-[normal] text-[#06152B]"
                          >
                            New Password
                          </label>
                          <Input
                            style={{ paddingRight: '0' }}
                            className="FormInput"
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword', {
                              required: 'Password is required',
                              pattern: PATTERN.PASSWORD,
                              validate: (value) => value.length <= 150,
                            })}
                            endAdornment={
                              <InputAdornment position="end" className="mx-2">
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            disableUnderline
                          />
                          {errors.newPassword?.type === 'required' && (
                            <ErrorSpanBox error={errors.newPassword?.message} />
                          )}
                          {errors.newPassword?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {errors.newPassword?.type === 'validate' && (
                            <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                          )}
                        </div>
                      </FormControl>
                      <FormControl className="FormControl" variant="standard">
                        <div className="form-group mt-[2px] w-full">
                          <label
                            htmlFor="email"
                            className="mb-1 text-[14px] font-normal leading-[normal] text-[#06152B]"
                          >
                            Confirm New Password
                          </label>
                          <Input
                            style={{ paddingRight: '0' }}
                            className="FormInput"
                            id="reNewPassword"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            {...register('reNewPassword', {
                              required: 'Confirm Password is required',
                              pattern: PATTERN.PASSWORD,
                              validate: {
                                maxlength: (value) =>
                                  value.length <= 100 || MAX_LENGTH_EXCEEDED,
                                matchesPrevious: (value) =>
                                  value === watch('newPassword') ||
                                  'Passwords do not match',
                              },
                            })}
                            endAdornment={
                              <InputAdornment position="end" className="mx-2">
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            disableUnderline
                          />
                          {errors.reNewPassword?.type === 'required' && (
                            <ErrorSpanBox
                              error={errors.reNewPassword?.message}
                            />
                          )}
                          {errors.reNewPassword?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {(errors.reNewPassword?.type === 'matchesPrevious' ||
                            errors.reNewPassword?.type === 'maxlength') && (
                            <ErrorSpanBox
                              error={errors.reNewPassword?.message}
                            />
                          )}
                        </div>
                      </FormControl>
                    </div>
                    <div className="mt-[100px] w-full px-4 ">
                      <Button
                        className="w-full rounded-[10px] bg-neutral-900 px-16 py-2 text-gray-50"
                        variant="contained"
                        color="inherit"
                        title="Submit"
                        type="submit"
                      >
                        {isLoader ? (
                          <CircularProgress color="inherit" size={23} />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="w-[70%] px-3 py-2">
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              <img
                src={systemConfig?.logoffImage || assets.images.bgLogin}
                alt="urlaundry"
                className="h-full w-full object-contain"
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
    </>
  );
}

export default OTPVerificationPage;
