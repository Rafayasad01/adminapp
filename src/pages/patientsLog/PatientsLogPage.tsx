import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, Pagination } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/Md-Alder/TopBar';
import photo from '../../assets/images/Photo.png';
import EyeIcon from '../../components/icons/EyeIcon';

const PatientsLogPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="Patient Logs" />
      <div className="mt-10 py-5 pr-5">
        <div className="alder-content">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="alder-content-title">Patient Data</h4>
            </div>
            <div>
              <Button
                onClick={() => navigate('create')}
                variant="contained"
                className="btn-black-fill btn-icon"
              >
                <AddOutlinedIcon /> Add New Patient
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>MR#</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Date in</th>
                  <th className="w-[30px]">{}</th>
                </tr>
              </thead>
              <tbody>
                {Array(10)
                  .fill(55)
                  .map((e, i) => (
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
                      <td>
                        {faker.number.int({ min: 600, max: 1000 }).toString()}
                      </td>
                      <td>
                        {faker.number.int({ min: 18, max: 60 }).toString()}
                      </td>
                      <td>{faker.phone.number()}</td>
                      <td>{faker.person.sex()}</td>
                      <td>{faker.date.past({ years: 1 }).toDateString()}</td>
                      <td>
                        <Button onClick={() => navigate('profile')}>
                          <EyeIcon className="h-[25px]" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <Pagination count={10} page={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsLogPage;
