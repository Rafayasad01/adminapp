import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import dayjs from 'dayjs';
import DatePickerField from '../../vouchers/DatePickerField';

const PatientPresenting = () => {
  const [diagnose, setDiagnose] = useState('Select');
  const [startDuration, setStartDuration] = useState<dayjs.Dayjs | null>(null);
  return (
    <div className="mt-3 grid grid-cols-12  gap-10">
      <FormGroup className="col-span-12 md:col-span-6">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Chief Presenting Complaints
        </FormLabel>
        <FormControl>
          <Input
            name="complaints"
            className="alder-form-control"
            placeholder="Type here"
            disableUnderline
          />
        </FormControl>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-6">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Type of complaint
        </FormLabel>
        <div className="grid w-52 grid-cols-2">
          <FormControlLabel control={<Checkbox />} label="New" />
          <FormControlLabel control={<Checkbox />} label="Remission" />
        </div>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-4">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Symptoms
        </FormLabel>
        <FormControl>
          <Input
            name="symptoms"
            className="alder-form-control"
            placeholder="Type here"
            disableUnderline
          />
        </FormControl>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-4">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Diagnose
        </FormLabel>
        <FormControl fullWidth variant="standard">
          <Select
            labelId="demo-simple-select-label"
            className=" alder-form-control text-gray-400"
            id="demo-simple-select"
            value={diagnose}
            variant="outlined"
            disableUnderline
            onChange={(e) => setDiagnose(e.target.value)}
          >
            <MenuItem value="Select" disabled>
              Select
            </MenuItem>
            <MenuItem value="Skin Peeling">Skin Peeling</MenuItem>
            <MenuItem value="Heart Attack">Heart Attack</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-4">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Differential Diagnosis
        </FormLabel>
        <FormControl fullWidth variant="standard">
          <Select
            labelId="demo-simple-select-label"
            className=" alder-form-control text-gray-400"
            id="demo-simple-select"
            value={diagnose}
            variant="outlined"
            disableUnderline
            onChange={(e) => setDiagnose(e.target.value)}
          >
            <MenuItem value="Select" disabled selected>
              Select
            </MenuItem>
            <MenuItem value="Skin Peeling">Skin Peeling</MenuItem>
            <MenuItem value="Heart Attack">Heart Attack</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-3">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Duration Start
        </FormLabel>
        <FormControl fullWidth variant="standard">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerField
              id="pickDtae"
              datePickerLabel=""
              setDatePickerValue={setStartDuration}
              datePickerValue={startDuration}
            />
          </LocalizationProvider>
        </FormControl>
      </FormGroup>

      <FormGroup className="col-span-12 md:col-span-3">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Duration Start
        </FormLabel>
        <FormControl fullWidth variant="standard">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerField
              id="endDtae"
              datePickerLabel=""
              setDatePickerValue={setStartDuration}
              datePickerValue={startDuration}
            />
          </LocalizationProvider>
        </FormControl>
      </FormGroup>
      <FormGroup className="col-span-12 md:col-span-6">
        <FormLabel className="mb-5 text-base font-medium text-black">
          Follow Up
        </FormLabel>
        <FormControl fullWidth variant="standard">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerField
              id="followup"
              datePickerLabel=""
              setDatePickerValue={setStartDuration}
              datePickerValue={startDuration}
            />
          </LocalizationProvider>
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default PatientPresenting;
