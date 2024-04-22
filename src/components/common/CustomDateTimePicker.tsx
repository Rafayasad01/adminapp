import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import ErrorSpanBox from './ErrorSpanBox';

type Props = {
  register?: any;
  id?: any;
  error?: any;
  inputTitle?: string;
  label?: string;
  notRequired?: boolean;
  setValue?: any;
  isTrue?: boolean;
  value?: any;
  defaultValue?: any;
  minDate?: any;
  maxDate?: any;
};

function CustomDateTimePicker({
  value,
  isTrue,
  setValue,
  id,
  inputTitle,
  minDate,
  maxDate,
}: Props) {
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
            padding: 'px',
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
