import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

import '../../assets/css/PopupStyle.css';
import CalendarIcon from '../../components/icons/CalendarIcon';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type Props = {
  datePickerLabel: string;
  datePickerValue: dayjs.Dayjs | null;
  setDatePickerValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  id: string;
};

function DatePickerField({
  datePickerLabel,
  datePickerValue,
  setDatePickerValue,
  id,
}: Props) {
  const [datePicker, setDatePicker] = useState<HTMLButtonElement | null>(null);
  // const currentDate = dayjs();
  // const formattedDate = currentDate.format('YYYY-MM-DD');
  const buttonElement = useRef(null);
  const handleClick = () => {
    setDatePicker(buttonElement.current);
  };
  const handleClose = () => {
    setDatePicker(null);
  };

  const open = Boolean(datePicker);
  const idProp = open ? id : undefined;

  const handleChange = (value: dayjs.Dayjs | null) => {
    setDatePickerValue(value);
    handleClose();
  };

  return (
    <>
      <FormControl className="FormControl" variant="standard">
        <label className="FormLabel">{datePickerLabel}</label>
        <Input
          ref={buttonElement}
          className="FormInput alder-form-control"
          type="text"
          placeholder="MM/DD/YYYY"
          value={datePickerValue?.format('MM/DD/YYYY') ?? ''}
          onChange={() => null}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                style={{ padding: 0 }}
              >
                {/* <CalendarTodayOutlinedIcon sx={{ color: '#1D1D1D' }} /> */}
                <CalendarIcon className="scale-125" />
              </IconButton>
            </InputAdornment>
          }
          disableUnderline
        />
      </FormControl>

      <Popover
        id={idProp}
        open={open}
        anchorEl={datePicker}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            onAccept={handleChange}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default DatePickerField;
