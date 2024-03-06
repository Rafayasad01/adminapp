import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import assets from '../../assets';
import CustomButton from '../../components/common/CustomButton';
import { useAppSelector } from '../../redux/redux-hooks';
import { BACK_TO_LOGIN } from '../../utils/constants';

function Page404() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const systemConfig = useAppSelector(
    (state: any) => state.authState.systemConfig
  );

  const handleBackButt = () => {
    if (state?.buttonname === BACK_TO_LOGIN) {
      navigate('../../../admin/auth/login', { replace: true });
    } else {
      navigate('../../dashboard', { replace: true });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
      <div className="container mx-auto flex items-center justify-between px-10">
        <div className="w-[50%]">
          <img
            alt="speech-bubble"
            src={assets.images.speechBubble}
            className="mx-auto max-w-full object-contain"
          />
        </div>
        <div className="w-[50%]">
          <div className="mb-[10px] text-[25px] font-semibold uppercase leading-[normal] text-secondary">
            Looks like you’re lost
          </div>
          <div className="mb-[30px] text-[18px] font-normal leading-[normal] text-secondary opacity-[0.3]">
            The page you are looking for not available!
          </div>
          {systemConfig !== null && (
            <div className="flex items-center justify-start">
              <CustomButton
                onclick={handleBackButt}
                title={state ? state?.buttonname && BACK_TO_LOGIN : `Home`}
                className="text-normal mr-5 w-[150px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
                buttonType="button"
              />
              {state?.buttonname !== BACK_TO_LOGIN && (
                <CustomButton
                  onclick={() => navigate(-1)}
                  title="Back"
                  className="text-normal mr-5 w-[120px] border-[1px] border-solid bg-white py-[14px] text-[14px] leading-[normal] text-black"
                  buttonType="button"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page404;
