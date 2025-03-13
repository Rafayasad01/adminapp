import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { faker } from '@faker-js/faker';
import photo from '../../../../assets/images/user.png';

const DetailsFieldComponent = ({ label = '', value = '' }) => {
  return (
    <div className="">
      <p className="text-sm text-[#A9A9A9]">{label}</p>
      <p className="w-[75%] truncate text-xl">{value}</p>
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

      <div className="flex py-5">
        <div className="alder-profile-details grid grid-cols-12 justify-between px-5 lg:items-center">
          <div className="col-span-1">
            <img
              src={data?.avatar || photo}
              alt="profile"
              className="w-[120px]"
            />
          </div>
          {/* <DetailsFieldComponent label="MR#" value="607" /> */}
          <div className="col-span-3 px-6">
            <DetailsFieldComponent label="Name" value={data?.name} />
          </div>
          <div className="col-span-2">
            <DetailsFieldComponent label="Gender" value={data?.gender} />
          </div>
          <div className="col-span-2">
            <DetailsFieldComponent label="Age" value={data?.age || '--'} />
          </div>
          <div className="col-span-2">
            <DetailsFieldComponent label="Phone" value={data?.phone} />
          </div>
          <div className="col-span-2">
            <DetailsFieldComponent
              label="Address"
              value={data?.address || '--'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileInfo;
