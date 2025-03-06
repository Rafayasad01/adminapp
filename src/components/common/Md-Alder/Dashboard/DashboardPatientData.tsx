import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';
import photo from '../../../../assets/images/Photo.png';
import MoreHoriz from '../../../icons/MoreHoriz';

const DashboardPatientData = () => {
  return (
    <div className="px-5 py-2">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="p-2 font-an-gurmukhi text-lg font-medium">
            Patient Data
          </h1>
        </div>
        <div className="self-center">
          <Button
            variant="outlined"
            className="border-none p-3 text-background"
          >
            View all
          </Button>
        </div>
      </div>
      <div className="alder-patient-table">
        <table className="font-an-gurmukhi">
          <thead>
            <tr>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Patient name
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Date in
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Diagnostic
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Status
              </th>
              <th className="w-[30px] text-[#A9A9A9]">{}</th>
            </tr>
          </thead>
          <tbody className="text-[#A9A9A9]">
            {Array(4)
              .fill(4)
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="flex align-middle">
                        <img
                          src={photo}
                          alt=""
                          height={32}
                          width={32}
                          className="rounded-[8px] "
                        />
                        <span className="ml-4 self-center font-an-gurmukhi font-medium text-[#1E1C24]">
                          {faker.person.fullName().toString()}
                        </span>
                      </div>
                    </td>
                    <td className="font-an-gurmukhi text-secondary2">
                      {faker.date.past().toDateString()}
                    </td>
                    <td className="font-an-gurmukhi text-secondary2">
                      {faker.word.noun().toString()}
                    </td>
                    <td className="font-an-gurmukhi text-secondary2">
                      Incoming
                    </td>
                    <td>
                      <Button>
                        <MoreHoriz className="h-[25px]" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPatientData;
