import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import {
  PatientVisitLabs,
  PatientVisitPrescription,
} from '../../../interfaces/patient.interface';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';

const PatientLabTest = () => {
  const {
    register,
    // handleSubmit,
    // setValue,
    control,
    watch,
    setValue,
    // reset,
    // setError,
    // clearErrors,
    formState: { errors },
  } = useFormContext<PatientVisitLabs>();
  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-12  gap-5">
        <Controller
          name="cbc"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="CBC"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="uce"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="UCE"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="lft"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="LFT"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="urineDr"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="URINE DR"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="biopsy"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="Biopsy"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="radiology"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="Radiology"
              />
            </FormGroup>
          )}
        />
        <div className="col-span-12">
          <FormGroup>
            <FormLabel className="mb-5 text-xl font-medium text-[#A9A9A9]">
              Others
            </FormLabel>
            <FormControl className="FormControl" variant="standard">
              <TextareaAutosize
                {...register('otherLabsDesc', {
                  pattern: PATTERN.CHAR_NUM_DASH,
                  validate: (value) => value.length <= 100,
                })}
                minRows={4}
                className="FormInput alder-form-control rounded-2xl"
                id="otherLabsDesc"
                name="otherLabsDesc"
                placeholder="Type here..."
              />
              {errors.otherLabsDesc?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.otherLabsDesc?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default PatientLabTest;
