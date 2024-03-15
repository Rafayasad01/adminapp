import {
  Button,
  Divider,
  FormControl,
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

const PatientPrescription = () => {
  const [diagnose, setDiagnose] = useState('Select');
  const [startDuration, setStartDuration] = useState<dayjs.Dayjs | null>(null);
  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-12  gap-5">
        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Drug Nmae
          </FormLabel>
          <FormControl>
            <Input
              name="drug_name"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Dosage Form
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
            Strength
          </FormLabel>
          <FormControl>
            <Input
              name="strength"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Dose
          </FormLabel>
          <FormControl>
            <Input
              name="dose"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
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
        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Duration End
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

        <div className="col-span-12">
          <div className="flex justify-end">
            <Button className="btn-black-fill w-1/12">Save</Button>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      <div className="">
        <table>
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Drug Form</th>
              <th>Strength</th>
              <th>Dose</th>
              <th>Start</th>
              <th>End</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Move 021</td>
              <td>Cream</td>
              <td>2.5</td>
              <td>Twice a day</td>
              <td>05/04/2023</td>
              <td>05/04/2024</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>Move 021</td>
              <td>Cream</td>
              <td>2.5</td>
              <td>Twice a day</td>
              <td>05/04/2023</td>
              <td>05/04/2024</td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-span-12">
        <div className="flex justify-end">
          <Button
            variant="outlined"
            className="w-1/12 rounded-xl border-primary bg-white py-2 font-semibold text-primary"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescription;
