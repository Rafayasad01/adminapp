import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import assets from '../../../assets';
import auth from '../../../services/adminapp/admin';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';
import Notify from '../../../components/common/Notify';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import { useAppSelector } from '../../../redux/redux-hooks';

interface Email {
  email: string;
}

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const systemConfig = useAppSelector(
    (state: any) => state.authState.systemConfig
  );
  // const [email, setEmail] = useState('');
  // const [error, setError] = useState('');

  // const getCodeHandler = () => {
  //   if (email && error === '') {
  //     navigate('../otp-verification');
  //   }
  // };
  const [isLoader, setIsLoader] = useState(false);
  const { notification, hideNotification, showNotification } =
    useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Email>();

  const sendEmail = async (data: Email) => {
    setIsLoader(true);
    auth
      .getOtpService(data)
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setTimeout(() => {
            showNotification(res.data.message, 'success');
            navigate('../otp-verification', { state: { email: data.email } });
          }, 500);
          // navigate('../otp-verification', { state: { email: data.email, message: res.data.message } })
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
                  src={assets.images.envelopeMsg}
                  alt="email"
                  className="h-[100[px] mx-auto w-[100px]"
                />
              </div>
              <form onSubmit={handleSubmit(sendEmail)}>
                <div className="mt-2 ">
                  <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                    Enter registered email
                  </span>
                  <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                    to receive OTP verification code
                  </span>
                  <div className="form-group mt-[42px] w-full">
                    <label
                      htmlFor="email"
                      className="mb-1 text-[14px] font-normal leading-[normal] text-[#06152B]"
                    >
                      Email
                    </label>
                    <FormControl className="m-1 w-full" variant="standard">
                      <Input
                        className="border-1 border-solid border-[#949EAE]"
                        {...register('email', {
                          required: true,
                          pattern: PATTERN.CHAR_NUM_DOT_AT,
                          validate: (value) => value.length <= 100,
                        })}
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        disableUnderline
                      />
                      {errors.email?.type === 'required' && (
                        <ErrorSpanBox error="Email is required" />
                      )}
                      {errors.email?.type === 'pattern' && (
                        <ErrorSpanBox error={INVALID_CHAR} />
                      )}
                      {errors.email?.type === 'validate' && (
                        <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                      )}
                    </FormControl>
                  </div>
                  <div className="w-full px-4 xl:mt-[60px] 2xl:mt-[100px] ">
                    <Button
                      disabled={isLoader}
                      className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                      variant="contained"
                      color="inherit"
                      title="get code"
                      type="submit"
                    >
                      {isLoader ? (
                        <CircularProgress color="inherit" size={23} />
                      ) : (
                        'Get Code'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
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

export default ForgotPasswordPage;
