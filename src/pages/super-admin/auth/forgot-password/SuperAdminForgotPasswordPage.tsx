import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import assets from '../../../../assets';

function SuperAdminForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const getCodeHandler = () => {
    navigate('../otp-verification');
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center rounded-xl bg-gray-50 p-5">
        <img className="my-4" src={assets.images.logoBlack} alt="" />
        <div className="mb-4 w-2/3 text-center font-open-sans text-sm font-normal text-neutral-500">
          Enter registered email to receive password reset link
        </div>
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
        <div className="py-8" />
        <div className="mt-8 w-full px-4">
          <Button
            className=" w-full bg-neutral-900 px-16 text-gray-50"
            variant="contained"
            color="inherit"
            onClick={getCodeHandler}
          >
            Get Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminForgotPasswordPage;
