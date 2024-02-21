import Button from '@mui/material/Button';
import { useState } from 'react';
import OtpInput from 'react18-otp-input';
import assets from '../../../assets';
import Input from '@mui/material/Input';

function OTPVerificationPage() {
  const [OTP, setOTP] = useState('');
  const submitHandler = () => {};

  return (
    // <div className="flex h-full w-full items-center justify-center">
    //   <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
    //     <img className="my-4" src={assets.images.logoBlack} alt="" />
    //     <div className="my-4 mb-8 w-full text-center font-open-sans text-sm font-normal text-neutral-500">
    //       An 4 digit code has been sent to <br />
    //       <span className="font-medium text-neutral-900">
    //         Vincent-bo@gmail.com
    //       </span>
    //     </div>
    //     <OtpInput
    //       containerStyle="flex items-center gap-4"
    //       inputStyle={{
    //         width: '3.5rem',
    //         aspectRatio: '1/1',
    //         borderRadius: '0.75rem',
    //         outlineStyle: 'solid',
    //         outlineWidth: '2px',
    //         outlineColor: '#e5e5e5',
    //         fontFamily: 'Open Sans',
    //         fontSize: '1.25rem',
    //         lineHeight: '1.75rem',
    //         fontWeight: 600,
    //         color: '#18181b',
    //       }}
    //       focusStyle={{ outlineColor: '#18181b' }}
    //       numInputs={4}
    //       onChange={(value: string) => setOTP(value)}
    //       separator={<span> </span>}
    //       isInputNum
    //       shouldAutoFocus
    //       value={OTP}
    //     />
    //     <div className="py-6" />
    //     <div className="mt-8 w-full px-4">
    //       <Button
    //         className=" w-full bg-neutral-900 px-16 text-gray-50"
    //         variant="contained"
    //         color="inherit"
    //         onClick={submitHandler}
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //   </div>
    // </div>
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
  );
}

export default OTPVerificationPage;
