import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { faker } from '@faker-js/faker';
import photo from '../../../../assets/images/user.png';

const DetailsFieldComponent = ({ label = '', value = '' }) => {
  return (
    <div className="">
      <p className="text-sm text-[#A9A9A9]">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
};

const PatientProfileInfo = ({ showReset = false, data }: any) => {
  return (
    <div className="alder-content ">
      <div className="justify-between md:flex">
        <div className="">
          <h4 className="alder-content-title capitalize">profile info</h4>
        </div>
        {showReset && (
          <Button
            variant="outlined"
            className="mx-5 rounded-xl border-primary bg-white text-primary"
          >
            <RefreshIcon className="mr-3" />
            Reset{' '}
          </Button>
        )}
      </div>

      <div className="py-5 md:flex  ">
        <div className="alder-profile-pic flex justify-start sm:max-md:justify-center md:self-center ">
          <img
            src={data?.avatar || photo}
            alt="profile"
            className="w-[127px]"
          />
        </div>
        <div className="alder-profile-details flex w-full justify-between px-3 md:flex-col lg:flex-row lg:items-center">
          {/* <DetailsFieldComponent label="MR#" value="607" /> */}
          <DetailsFieldComponent label="Name" value={data?.name} />
          <DetailsFieldComponent label="Name" value={data?.gender} />
          <DetailsFieldComponent label="Age" value={data?.age || '--'} />
          <DetailsFieldComponent label="Phone" value={data?.phone} />
          <DetailsFieldComponent
            label="Address"
            value={data?.address || '--'}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfileInfo;
