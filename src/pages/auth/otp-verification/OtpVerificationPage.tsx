import Button from '@mui/material/Button';
import { useState } from 'react';
import OtpInput from 'react18-otp-input';
import assets from '../../../assets';

function OTPVerificationPage() {
  const [OTP, setOTP] = useState('');
  const submitHandler = () => {};

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
        <img className="my-4" src={assets.images.logoBlack} alt="" />
        <div className="my-4 mb-8 w-full text-center font-open-sans text-sm font-normal text-neutral-500">
          An 4 digit code has been sent to <br />
          <span className="font-medium text-neutral-900">
            Vincent-bo@gmail.com
          </span>
        </div>
        <OtpInput
          containerStyle="flex items-center gap-4"
          inputStyle={{
            width: '3.5rem',
            aspectRatio: '1/1',
            borderRadius: '0.75rem',
            outlineStyle: 'solid',
            outlineWidth: '2px',
            outlineColor: '#e5e5e5',
            fontFamily: 'Open Sans',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 600,
            color: '#18181b',
          }}
          focusStyle={{ outlineColor: '#18181b' }}
          numInputs={4}
          onChange={(value: string) => setOTP(value)}
          separator={<span> </span>}
          isInputNum
          shouldAutoFocus
          value={OTP}
        />
        <div className="py-6" />
        <div className="mt-8 w-full px-4">
          <Button
            className=" w-full bg-neutral-900 px-16 text-gray-50"
            variant="contained"
            color="inherit"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OTPVerificationPage;
