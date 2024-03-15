import { Button, FormControl, TextareaAutosize } from '@mui/material';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
import Tabs, { Tab } from '../../components/common/Tab';
import PatientPresenting from './PatientLogVisitCreateComponents/PatientPresenting';
import PatientPrescription from './PatientLogVisitCreateComponents/PatientPrescription';
import PatientLabTest from './PatientLogVisitCreateComponents/PatientLabTest';
import PatientScan from './PatientLogVisitCreateComponents/PatientScan';
import EyeIcon from '../../components/icons/EyeIcon';

const PatientLogVisitCreatePage = () => {
  const tabs: Tab[] = [
    { label: 'Presenting Complaints' },
    { label: 'Prescription' },
    { label: 'Lab Test' },
    { label: 'Scan' },
    { label: 'Previous Visits' },
  ];
  return (
    <>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo />

        <div className="alder-content alder-patient-visit-logs mt-10 p-5">
          <div className="justify-between md:flex">
            <div className="">
              <h4 className="alder-content-title capitalize">
                description/medical note
              </h4>
            </div>
          </div>
          <FormControl className="mt-5 w-full" variant="standard">
            <TextareaAutosize
              className=" FormInput alder-form-control text-sm"
              placeholder="Type Here"
              minRows={4}
            />
          </FormControl>

          <div className="mt-8">
            <div className="flex justify-end">
              <Button className="btn-black-fill rounded-xl border-primary px-10 font-bold text-primary">
                Save{' '}
              </Button>
              <Button
                variant="outlined"
                className="mx-5 rounded-xl border-primary font-bold capitalize text-primary"
              >
                Save & Exit{' '}
              </Button>
            </div>
          </div>
        </div>

        <div className="alder-content alder-patient-info-tabs mt-10 p-5">
          <Tabs tabs={tabs}>
            <PatientPresenting />
            <PatientPrescription />
            <PatientLabTest />
            <PatientScan />
            <div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Visit</th>
                      <th>Medical note</th>
                      <th>{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>24, Apr, 2023</td>
                      <td>I have screen allergy for 2 - 3 months</td>
                      <td>
                        <Button>
                          <EyeIcon className="h-[25px]" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>24, Apr, 2023</td>
                      <td>I have screen allergy for 2 - 3 months</td>
                      <td>
                        <Button>
                          <EyeIcon className="h-[25px]" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PatientLogVisitCreatePage;
