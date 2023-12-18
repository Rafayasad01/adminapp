import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
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
};

function CustomDateTimePicker({
  value,
  isTrue,
  setValue,
  register,
  id,
  error,
  inputTitle,
  label,
  notRequired,
}: Props) {
  const handleChange = (date: any) => {
    setValue(id, date.format('YYYY-MM-DD'), { shouldValidate: true });
  };

  console.log('sAASA', isTrue, value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DemoItem label={inputTitle}>
          <DesktopDatePicker
            sx={{
              border: '1px solid #e5d3d3',
              padding: 'px',
              borderRadius: '5px',
              fontSize: '12px',
            }}
            onChange={handleChange}
          // defaultValue={dayjs('2022-04-17')}
          />
        </DemoItem>
      </DemoContainer>
      {isTrue && value === undefined && (
        <ErrorSpanBox error={`${inputTitle} is required`} />
      )}
    </LocalizationProvider>
  );
}

export default CustomDateTimePicker;
