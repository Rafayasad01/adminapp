import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { faker } from '@faker-js/faker';
import photo from '../../../../assets/images/profile-image.png';

const DetailsFieldComponent = ({ label = '', value = '' }) => {
  return (
    <div className="">
      <p className="text-sm text-[#A9A9A9]">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
};

const PatientProfileInfo = ({ showReset = false }) => {
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
          <img src={photo} alt="profile" className="w-[127px]" />
        </div>
        <div className="alder-profile-details flex w-full justify-between px-3 md:flex-col lg:flex-row lg:items-center">
          <DetailsFieldComponent label="MR#" value="607" />
          <DetailsFieldComponent label="Name" value={faker.person.fullName()} />
          <DetailsFieldComponent label="Name" value={faker.person.sex()} />
          <DetailsFieldComponent
            label="Age"
            value={faker.number.int({ min: 18, max: 150 }).toString()}
          />
          <DetailsFieldComponent label="Phone" value={faker.phone.number()} />
          <DetailsFieldComponent
            label="Address"
            value={faker.location.streetAddress()}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfileInfo;
