import { Button, FormControl, FormGroup, Input } from '@mui/material';
import camera from '../../../assets/images/camera-dark.png';
import PatientScanCard from './PatientScanCard';

const PatientScan = () => {
  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-1 gap-5   md:grid-cols-3">
        <PatientScanCard />
        <PatientScanCard />
        <PatientScanCard />
      </div>
    </div>
  );
};

export default PatientScan;
