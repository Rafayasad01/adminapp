import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import DatePickerField from '../../vouchers/DatePickerField';
import { PatientVisitComplaints } from '../../../interfaces/patient.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utils/constants';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { useSnackbar } from '../../../components/hooks/useSnackbar';
import CustomDropDown from '../../../components/common/CustomDropDown';

const PatientPresenting = ({ callback }: any) => {
  const { showMessage } = useSnackbar();
  const [diagnose, setDiagnose] = useState('Select');
  const [selectedType, setSelectedType] = useState('');
  const [startDuration, setStartDuration] = useState<dayjs.Dayjs | null>(null);
  const [endDuration, setEndDuration] = useState<dayjs.Dayjs | null>(null);
  const [followUpDuration, setFollowUpDuration] = useState<dayjs.Dayjs | null>(
    null
  );
  const [isLoader, setIsLoader] = useState(false);

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
  } = useFormContext<PatientVisitComplaints>();

  const handleCheckboxChange = (value: any) => {
    console.log('handleCheckboxChange', value);

    if (selectedType === value) {
      setSelectedType('');
      setValue('complaintType', '');
      setError('complaintType', {
        type: 'manual',
        message: 'Please select a complaint type.',
      });
    } else {
      setSelectedType(value);
      setValue('complaintType', value);
      clearErrors('complaintType');
    }
  };

  useEffect(() => {
    if (startDuration)
      setValue(
        'durationStartTime',
        dayjs(startDuration).format('YYYY-MM-DD HH:mm:ss')
      );
    if (endDuration)
      setValue(
        'durationEndTime',
        dayjs(endDuration).format('YYYY-MM-DD HH:mm:ss')
      );
    if (followUpDuration)
      setValue(
        'followupTime',
        dayjs(followUpDuration).format('YYYY-MM-DD HH:mm:ss')
      );
  }, [startDuration, endDuration, followUpDuration]);

  // const onSubmitHandler = (data: PatientVisitComplaints) => {
  //   console.log('data', data);

  //   // setIsLoader(true);
  //   // service
  //   //   .create(formData)
  //   //   .then((item) => {
  //   //     if (item.data.success) {
  //   //       showMessage(item.data.message, 'success');
  //   //       setIsLoader(false);
  //   //     } else {
  //   //       showMessage(item.data.message, 'error');
  //   //       setIsLoader(false);
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     showMessage(err.message, 'error');
  //   //   });
  // };
  return (
    // <form onSubmit={handleSubmit(onSubmitHandler)}>
    <>
      <div className="mt-3 grid grid-cols-12 gap-10">
        <FormGroup className="col-span-12 md:col-span-6">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Chief Presenting Complaints
          </FormLabel>
          <FormControl className="FormControl" variant="standard">
            <Input
              {...register('complaintName', {
                required: true,
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className="FormInput alder-form-control"
              id="complaintName"
              name="complaintName"
              placeholder="Type here"
              disableUnderline
            />
            {errors.complaintName?.type === 'required' && (
              <ErrorSpanBox error="Complaint is required" />
            )}
            {errors.complaintName?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.complaintName?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
          {/* <FormControl>
            <Input
              name="complaints"
              className="alder-form-control"
              placeholder="Type here"
              disableUnderline
            />
          </FormControl> */}
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-6">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Type of complaint
          </FormLabel>
          <div className="grid w-52 grid-cols-2">
            <Controller
              name="complaintType"
              control={control}
              rules={{ required: 'Please select a complaint type.' }}
              render={({ field }: any) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value === 'new'}
                        onChange={() => field.onChange('new')}
                      />
                    }
                    label="New"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value === 'remission'}
                        onChange={() => field.onChange('remission')}
                      />
                    }
                    label="Remission"
                  />
                </>
              )}
            />
          </div>
          {/* <div className="grid w-52 grid-cols-2">
            <FormControlLabel
              control={<Checkbox />}
              checked={selectedType === 'new'}
              onChange={() => handleCheckboxChange('new')}
              label="New"
            />
            <FormControlLabel
              control={<Checkbox />}
              onChange={() => handleCheckboxChange('remission')}
              checked={selectedType === 'remission'}
              label="Remission"
            />
          </div> */}
          {errors.complaintType && (
            <ErrorSpanBox error="Please select a complaint type." />
          )}
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Symptoms
          </FormLabel>
          <FormControl className="FormControl" variant="standard">
            <Input
              {...register('symptoms', {
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className="FormInput alder-form-control"
              id="symptoms"
              name="symptoms"
              placeholder="Type here"
              disableUnderline
            />
            {errors.symptoms?.type === 'pattern' && (
              <ErrorSpanBox error={INVALID_CHAR} />
            )}
            {errors.symptoms?.type === 'validate' && (
              <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
            )}
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Diagnose
          </FormLabel>
          <FormControl fullWidth variant="standard">
            <CustomDropDown
              // validateRequired
              id="diagnose"
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
            {/* <Select
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
            </Select> */}
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-4">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Differential Diagnosis
          </FormLabel>
          <FormControl fullWidth variant="standard">
            <CustomDropDown
              // validateRequired
              id="differentialDiagnose"
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
              defaultValue="Select Differential Dosage"
            />
            {/* <Select
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
            </Select> */}
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-3">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Duration Start
          </FormLabel>
          <FormControl fullWidth variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="durationStartTime"
                control={control}
                // rules={{ required: 'Start duration is required' }}
                render={({ field }) => (
                  <DatePickerField
                    id="durationStartTime"
                    datePickerLabel=""
                    datePickerValue={field.value}
                    setDatePickerValue={field.onChange}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </FormGroup>

        <FormGroup className="col-span-12 md:col-span-3">
          <FormLabel className="mb-5 text-base font-medium text-black">
            Duration End
          </FormLabel>
          <FormControl fullWidth variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="durationEndTime"
                control={control}
                // rules={{ required: 'End duration is required' }}
                render={({ field }) => (
                  <DatePickerField
                    id="durationEndTime"
                    datePickerLabel=""
                    datePickerValue={field.value}
                    setDatePickerValue={field.onChange}
                  />
                )}
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
              <Controller
                name="followupTime"
                control={control}
                // rules={{ required: 'followup Time is required' }}
                render={({ field }) => (
                  <DatePickerField
                    id="followupTime"
                    datePickerLabel=""
                    datePickerValue={field.value}
                    setDatePickerValue={field.onChange}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </FormGroup>
      </div>
      {/* <div className="mt-10 flex items-center justify-end"> */}
      {/* <button
          type="submit"
          className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary"
        >
          {isLoader ? (
            <CircularProgress size={20} className="text-foreground" />
          ) : (
            // <>
            <span className="">Save</span>
            // </>
          )}
        </button> */}
      {/* <Button
          variant="contained"
          type="submit"
          // onClick={() => navigate(`../revisit/${state.id}`)}
          className="nohover mt-10 rounded-xl border-primary bg-background text-primary"
        >
          Save Complaint
        </Button> */}
      {/* </div> */}
    </>
    // </form>
  );
};

export default PatientPresenting;
