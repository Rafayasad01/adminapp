import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const getCodeHandler = () => {
    if (email && error === '') {
      navigate('../otp-verification');
    }
  };

  return (
    // <div className="flex h-full w-full items-center justify-center">
    //   <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
    //     <img className="my-4" src={assets.images.logoBlack} alt="" />
    //     <div className="mb-4 w-2/3 text-center font-open-sans text-sm font-normal text-neutral-500">
    //       Enter registered email to receive password reset link
    //     </div>
    //     <div className="form-group w-full">
    //       <label htmlFor="email" className="font-sans">
    //         Email
    //       </label>
    //       <FormControl className="m-1 w-full" variant="standard">
    //         <Input
    //           className="after:border-b-neutral-900"
    //           id="email"
    //           type="email"
    //           name="email"
    //           onChange={(event) => {
    //             const emailRegex =
    //               /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //             if (emailRegex.test(event.target.value)) {
    //               setEmail(event.target.value);
    //               setError('');
    //             } else {
    //               setEmail(event.target.value);
    //               setError('Invalid email format');
    //             }
    //           }}
    //           disableUnderline
    //         />
    //       </FormControl>
    //       {error && <p className="py-1 text-xs">{error}</p>}
    //     </div>
    //     <div className="py-8" />
    //     <div className="mt-8 w-full px-4">
    //       <Button
    //         className=" w-full bg-neutral-900 px-16 text-gray-50"
    //         variant="contained"
    //         color="inherit"
    //         onClick={getCodeHandler}
    //       >
    //         Get Code
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
                  className="mb-1 text-[14px] font-normal leading-[normal] text-[#06152B]"
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

export default ForgotPasswordPage;
