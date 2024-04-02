import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import ErrorSpanBox from './ErrorSpanBox';

type CustomDateTimePickerProps = {
  register?: any;
  id?: any;
  error?: any;
  inputTitle?: string;
  // label?: string;
  // notRequired?: boolean;
  setValue?: any;
  isTrue?: boolean;
  value?: any;
  defaultValue?: any;
  minDate?: any;
};

function CustomDateTimePicker({
  register: _register,
  defaultValue,
  value,
  isTrue,
  setValue,
  id,
  inputTitle,
  minDate,
  error: _error,
}: CustomDateTimePickerProps) {
  const handleChange = (date: any) => {
    setValue(id, date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label={inputTitle}>
        <DesktopDatePicker
          sx={{
            border: '1px solid',
            padding: 'px',
            borderRadius: '5px',
            fontSize: '12px',
          }}
          className="border-secondary"
          value={dayjs(value)}
          onChange={handleChange}
          minDate={minDate}
          defaultValue={defaultValue}
        />
      </DemoItem>
      {isTrue && value === undefined && (
        <ErrorSpanBox error={`${inputTitle} is required`} />
      )}
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
