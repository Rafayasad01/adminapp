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
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import dxBarGauge from 'devextreme/viz/bar_gauge';
import DatePickerField from '../../vouchers/DatePickerField';
import { PatientVisitPrescription } from '../../../interfaces/patient.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { useSnackbar } from '../../../components/hooks/useSnackbar';
import CustomDropDown from '../../../components/common/CustomDropDown';

const PatientPrescription = () => {
  const { showMessage } = useSnackbar();
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
  } = useFormContext<PatientVisitPrescription>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'prescriptions', // This should match the parent's field name
  });

  const handlePrescriptions = () => {
    const obj = {
      drugName: watch('drugName'),
      dosageForm: watch('dosageForm'),
      strength: watch('strength'),
      dose: watch('dose'),
      presDurationStartTime: watch('presDurationStartTime'),
      presDurationEndTime: watch('presDurationEndTime'),
    };
    const check: boolean = fields?.some(
      (el: any) => el.drugName.trim() === watch('drugName').trim()
    );
    if (check) {
      showMessage('This drug is already exist', 'error', 'center');
      return;
    }

    if (
      watch('drugName') &&
      watch('dosageForm') &&
      watch('strength') &&
      watch('dose') &&
      watch('presDurationStartTime') &&
      watch('presDurationEndTime')
    ) {
      append(obj);
    } else {
      showMessage('All Fields are required', 'error', 'center');
    }
  };

  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-12  gap-5">
        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Drug Nmae
          </FormLabel>
          <FormControl className="FormControl" variant="standard">
            <Input
              {...register('drugName', {
                required: true,
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className="FormInput alder-form-control"
              id="drugName"
              name="drugName"
              placeholder="Type here"
              disableUnderline
            />
            {errors.drugName?.type === 'required' && (
              <ErrorSpanBox error="Drug name is required" />
            )}
            {errors.drugName?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.drugName?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Dosage Form
          </FormLabel>
          <FormControl className="FormControl w-full" variant="standard">
            <CustomDropDown
              // validateRequired
              id="dosageForm"
              control={control}
              error={errors}
              register={register}
              setValue={setValue}
              customHeight="alder-form-control"
              customClassInputTitle="font-semibold"
              // inputTitle="Barber Category"
              options={{
                roles: [
                  { id: 'skin peeling', name: 'Skin Peeling' },
                  { id: 'heart attack', name: 'Heart Attack' },
                ],
              }}
              defaultValue="Select Dosage"
            />
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Strength
          </FormLabel>
          <FormControl className="FormControl" variant="standard">
            <Input
              {...register('strength', {
                required: true,
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className="FormInput alder-form-control"
              id="strength"
              name="strength"
              placeholder="Type here"
              disableUnderline
            />
            {errors.strength?.type === 'required' && (
              <ErrorSpanBox error="Strength is required" />
            )}
            {errors.strength?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.strength?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
          {/* <FormControl>
            <Input
              name="strength"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl> */}
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Dose
          </FormLabel>
          <FormControl className="FormControl" variant="standard">
            <Input
              {...register('dose', {
                required: true,
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className="FormInput alder-form-control"
              id="dose"
              name="dose"
              placeholder="Type here"
              disableUnderline
            />
            {errors.dose?.type === 'required' && (
              <ErrorSpanBox error="Dose is required" />
            )}
            {errors.dose?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.dose?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
          {/* <FormControl>
            <Input
              name="dose"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl> */}
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Duration Start
          </FormLabel>
          <FormControl fullWidth variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="presDurationStartTime"
                control={control}
                // rules={{ required: 'End duration is required' }}
                render={({ field }) => (
                  <DatePickerField
                    id="presDurationStartTime"
                    datePickerLabel=""
                    datePickerValue={field.value}
                    setDatePickerValue={field.onChange}
                  />
                )}
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
              <Controller
                name="presDurationEndTime"
                control={control}
                // rules={{ required: 'End duration is required' }}
                render={({ field }) => (
                  <DatePickerField
                    id="presDurationEndTime"
                    datePickerLabel=""
                    datePickerValue={field.value}
                    setDatePickerValue={field.onChange}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </FormGroup>

        <div className="col-span-12">
          <div className="flex justify-end">
            <Button
              variant="outlined"
              className="rounded-xl border-background px-10 font-bold text-background"
              onClick={() => handlePrescriptions()}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      <div className="text-secondary2">
        {fields.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="text-secondary2">S.No#</th>
                <th className="w-[25%] text-secondary2">Drug Name</th>
                <th className="text-secondary2">Drug Form</th>
                <th className="text-secondary2">Strength</th>
                <th className="text-secondary2">Dose</th>
                <th className="text-secondary2">Start</th>
                <th className="text-secondary2">End</th>
                {/* <th className="text-secondary2">Document</th> */}
              </tr>
            </thead>
            <tbody>
              {fields?.map((item: any, index) => (
                <tr key={index}>
                  <td className="text-secondary2">{index + 1}</td>
                  <td className="text-secondary2">{item.drugName}</td>
                  <td className="text-secondary2">{item.dosageForm}</td>
                  <td className="text-secondary2">{item.strength}</td>
                  <td className="text-secondary2">{item.dose}</td>
                  <td className="text-secondary2">
                    {dayjs(item.presDurationStartTime).format('YYYY-MM-DD')}
                  </td>
                  <td className="text-secondary2">
                    {dayjs(item.presDurationEndTime).format('YYYY-MM-DD')}
                  </td>
                  <td className="text-secondary2">
                    <CancelIcon
                      className="cursor-pointer"
                      color="secondary"
                      onClick={() => remove(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center font-an-gurmukhi text-lg">
            Prescriptions is not added yet.
          </div>
        )}
      </div>
      {/* <div className="col-span-12">
        <div className="mt-5 flex justify-end">
          <Button variant="outlined" className="border-background">
            <span>Download</span>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default PatientPrescription;
