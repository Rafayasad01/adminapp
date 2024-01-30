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
              className="after:border-b-secondary"
              id="email"
              type="email"
              name="email"
              onChange={(event) => {
                const emailRegex =
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (emailRegex.test(event.target.value)) {
                  setEmail(event.target.value);
                  setError('');
                } else {
                  setEmail(event.target.value);
                  setError('Invalid email format');
                }
              }}
              disableUnderline
            />
          </FormControl>
          {error && <p className="py-1 text-xs">{error}</p>}
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

export default ForgotPasswordPage;
