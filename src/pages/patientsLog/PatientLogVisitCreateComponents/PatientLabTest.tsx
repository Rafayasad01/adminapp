import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';

const PatientLabTest = () => {
  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-12  gap-5">
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel control={<Checkbox />} label="CBC" />
        </FormGroup>
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel
            control={<Checkbox className="alder-checkbox" />}
            label="UCE"
          />
        </FormGroup>
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel
            control={<Checkbox className="alder-checkbox" />}
            label="LFT"
          />
        </FormGroup>
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel
            control={<Checkbox className="alder-checkbox" />}
            label="URINE DR"
          />
        </FormGroup>
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel
            control={<Checkbox className="alder-checkbox" />}
            label="Biopsy"
          />
        </FormGroup>
        <FormGroup className="col-span-12 md:col-span-2">
          <FormControlLabel
            control={<Checkbox className="alder-checkbox" />}
            label="Radiology"
          />
        </FormGroup>

        <div className="col-span-12">
          <FormGroup>
            <FormLabel className="mb-5 text-xl font-medium text-[#A9A9A9]">
              Others
            </FormLabel>
            <FormControl fullWidth variant="standard">
              <TextareaAutosize
                name="others"
                minRows={4}
                placeholder="Type here..."
                className="FormInput alder-form-control rounded-2xl"
              />
            </FormControl>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default PatientLabTest;
