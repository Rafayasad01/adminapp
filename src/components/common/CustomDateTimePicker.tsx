import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import ErrorSpanBox from './ErrorSpanBox';

type CustomDateTimePickerProps = {
  defaultValue?: any;
  error?: any;
  id?: any;
  inputTitle?: string;
  isTrue?: boolean;
  label?: string;
  maxDate?: any;
  minDate?: any;
  notRequired?: boolean;
  register?: any;
  setValue?: any;
  value?: any;
};

function CustomDateTimePicker({
  defaultValue: _defaultValue,
  error: _error,
  id,
  inputTitle,
  isTrue,
  label: _label,
  maxDate,
  minDate: _minDate,
  notRequired: _notRequired,
  register: _register,
  setValue,
  value,
}: CustomDateTimePickerProps) {
  const handleChange = (date: any) => {
    console.log('daaa', date);
    setValue(id, date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label={inputTitle}>
        <DesktopDatePicker
          sx={{
            border: '1px solid',
            padding: '0px',
            margin: '0px',
            borderRadius: '5px',
            fontSize: '12px',
          }}
          className="border-secondary"
          value={dayjs(value)}
          onChange={handleChange}
          // minDate={dayjs(minDates)}
          maxDate={maxDate}
        />
      </DemoItem>
      {isTrue && value === undefined && (
        <ErrorSpanBox error={`${inputTitle} is required`} />
      )}
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
