/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';

type CustomYearMonthPickerProps = {
  //   defaultValue?: any;
  //   error?: any;
  //   id?: any;
  //   inputTitle?: string;
  //   isTrue?: boolean;
  //   label?: string;
  //   maxDate?: any;
  //   minDate?: any;
  //   notRequired?: boolean;
  //   register?: any;
  setValue?: any;
  value?: any;
};

const YearMonthDatePicker = ({
  value,
  setValue,
}: CustomYearMonthPickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DatePicker
          sx={{
            padding: '2px',
            borderRadius: '5px',
            fontSize: '12px',
            // width: '15%',
          }}
          className="border-secondary"
          views={['year', 'month']}
          //   label="Year and Month"
          // minDate={new Date('2012-03-01')}
          // maxDate={new Date()}
          value={value ?? new Date()}
          onChange={(date) => setValue(date)}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default YearMonthDatePicker;
