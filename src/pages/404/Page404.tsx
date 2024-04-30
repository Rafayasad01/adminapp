import assets from '../../assets';
import CustomButton from '../../components/common/CustomButton';

function Page404({ error }: { error?: any }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F0F0F0]">
      <div className="container mx-auto flex items-center justify-between px-10">
        <div className="w-1/2">
          <img
            alt="speech-bubble"
            src={assets.images.speechBubble}
            className="mx-auto max-w-full object-contain"
          />
        </div>
        <div className="w-1/2">
          <div className="mb-[10px] text-[25px] font-semibold uppercase leading-[normal] text-secondary">
            Error Occured
          </div>
          <div className="mb-[30px] text-[18px] font-normal leading-[normal] text-secondary opacity-[0.3]">
            {error ? error.message : 'something went wrong'}
          </div>
          <CustomButton
            onclick={() => window.location.reload()}
            title="Reload"
            className="text-normal mr-5 w-[120px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
            buttonType="button"
          />
        </div>
      </div>
    </div>
  );
}

export default Page404;
