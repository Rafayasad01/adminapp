import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from './ErrorSpanBox';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type TimePickerProps = {
  disabled?: boolean;
  // errors?: any;
  id: string;
  isTrue?: boolean;
  // setError?: any;
  setTimePickerValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  timePickerLabel?: string;
  timePickerSubLabel?: string;
  timePickerValue?: dayjs.Dayjs | null;
  // minTime?: dayjs.Dayjs | undefined;
  // maxTime?: dayjs.Dayjs | undefined;
};
function TimePicker({
  disabled,
  // errors,
  id,
  isTrue,
  setTimePickerValue,
  timePickerLabel,
  timePickerSubLabel,
  timePickerValue,
}: // minTime,
// maxTime,
TimePickerProps) {
  const [timePicker, setTimePicker] = useState<HTMLButtonElement | null>(null);
  const buttonElement = useRef(null);
  const handleClick = () => {
    setTimePicker(buttonElement.current);
    // if (timePickerValue?.format('HH:MM A') !== null) {
    //     setError(id, {
    //         type: 'manual',
    //         message: '',
    //     });
    // }
  };
  const handleClose = () => {
    setTimePicker(null);
  };

  const open = Boolean(timePicker);
  const idProp = open ? id : undefined;

  const handleChange = (value: dayjs.Dayjs | null) => {
    setTimePickerValue(value);
    handleClose();
  };

  // console.log('minTime', minTime);
  // console.log('maxTime', maxTime);

  return (
    <>
      <FormControl className="FormControl" variant="standard">
        <label className="FormLabel">
          {timePickerLabel ?? ''}{' '}
          {timePickerSubLabel ? (
            <span className="SubLabel">{timePickerSubLabel}</span>
          ) : (
            ''
          )}
        </label>
        <Input
          disabled={disabled}
          ref={buttonElement}
          className="FormInput"
          type="text"
          placeholder="Select time"
          value={
            (timePickerValue &&
              dayjs(timePickerValue).isValid() &&
              dayjs(timePickerValue).format('hh:mm A')) ||
            ''
          }
          onChange={() => null}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={disabled}
                aria-label="toggle password visibility"
                onClick={handleClick}
                style={{ padding: 0 }}
              >
                <AccessTimeOutlinedIcon style={{ color: '#1D1D1D' }} />
              </IconButton>
            </InputAdornment>
          }
          disableUnderline
        />
        {isTrue && timePickerValue === null && (
          <ErrorSpanBox error={`${timePickerLabel} is required`} />
        )}
      </FormControl>

      <Popover
        id={idProp}
        open={open}
        anchorEl={timePicker}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
              displayStaticWrapperAs="desktop"
              defaultValue={dayjs('2023-01-01T00:00')}
              value={dayjs(timePickerValue) || null}
              onAccept={handleChange}
              // minTime={minTime}
              // maxTime={maxTime}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default TimePicker;
