import React from 'react';
import assets from '../../assets';
import CustomButton from '../../components/common/CustomButton';

function Page404() {
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
          <div className="flex items-center justify-start">
            <CustomButton
              title="Home"
              className="text-normal mr-5 w-[120px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
              buttonType="button"
            />
            <CustomButton
              title="Back"
              className="text-normal mr-5 w-[120px] border-[1px] border-solid bg-white py-[14px] text-[14px] leading-[normal] text-black"
              buttonType="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page404;
