import { Button, FormControl, FormGroup, Input } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useCallback, useState } from 'react';
import camera from '../../../assets/images/camera-dark.png';
import PatientScanCard from './PatientScanCard';
import { PatientVisitScan } from '../../../interfaces/patient.interface';

const PatientScan = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<PatientVisitScan>();

  const [scanData, setScanData] = useState([
    { image: null, caption: '' },
    { image: null, caption: '' },
    { image: null, caption: '' },
  ]);

  const handleScanDataChange = useCallback(
    (index: number, data: { image: any; caption: string }) => {
      setScanData((prev) => {
        const updatedData = [...prev];
        updatedData[index] = data;
        setValue('scanMedia', updatedData);
        return updatedData;
      });
    },
    [setValue]
  );

  console.log('scanData', scanData);

  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3">
        <PatientScanCard index={0} callback={handleScanDataChange} />
        <PatientScanCard index={1} callback={handleScanDataChange} />
        <PatientScanCard index={2} callback={handleScanDataChange} />
      </div>
    </div>
  );
};

export default PatientScan;
