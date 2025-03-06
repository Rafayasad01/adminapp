import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
import EyeIcon from '../../components/icons/EyeIcon';

const PatientLogProfilePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('🚀 ~ PatientLogProfilePage ~ ̥:', state);

  return (
    <>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo data={state} />

        <div className="alder-content alder-patient-visit-logs mt-10 py-10">
          <div className="justify-between md:flex">
            <div className="">
              <h4 className="alder-content-title capitalize">patient Visits</h4>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate('../revisit')}
              className="mx-5 rounded-xl border-primary bg-background text-primary"
            >
              <AddIcon className="mr-2" />
              Create New Revisit{' '}
            </Button>
          </div>

          <div className="alder-revisit-table-container">
            <table>
              <thead className="capitalize">
                <tr>
                  <th className="font-an-gurmukhi text-secondary2">Visit</th>
                  <th className="font-an-gurmukhi text-secondary2">
                    Presenting complaint
                  </th>
                  <th className="font-an-gurmukhi text-secondary2">
                    Medical note
                  </th>
                  <th>{}</th>
                </tr>
              </thead>
              <tbody>
                {Array(2)
                  .fill(2)
                  .map((e, i) => (
                    <tr key={i}>
                      <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                        {faker.date.past({ years: 1 }).toDateString()}
                      </td>
                      <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                        Skin Condition
                      </td>
                      <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                        Skin Allergy Severe
                      </td>
                      <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                        <Button onClick={() => navigate('../visit-details')}>
                          <EyeIcon className="h-[25px]" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientLogProfilePage;
