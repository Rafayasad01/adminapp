import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';
import photo from '../../../../assets/images/Photo.png';
import MoreHoriz from '../../../icons/MoreHoriz';

const DashboardPatientData = () => {
  return (
    <div className="px-5 py-2">
      <div className="flex w-full justify-between">
        <div>
          <h1 className=" p-2 text-lg font-medium">Patient Data</h1>
        </div>
        <div className="self-center">
          <Button variant="outlined" className="border-none p-3 text-primary">
            View all
          </Button>
        </div>
      </div>
      <div className="alder-patient-table">
        <table>
          <thead>
            <tr>
              <th>Patient name</th>
              <th>Date in</th>
              <th>Diagnostic</th>
              <th>Status</th>
              <th className="w-[30px]">{}</th>
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
                        <span className="ml-4 self-center font-medium text-[#1E1C24]">
                          {faker.person.fullName().toString()}
                        </span>
                      </div>
                    </td>
                    <td>{faker.date.past().toDateString()}</td>
                    <td>{faker.word.noun().toString()}</td>
                    <td className="text-primary">Incoming</td>
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
