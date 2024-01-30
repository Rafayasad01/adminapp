import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import '../../assets/css/PopupStyle.css';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type Props = {
  timePickerLabel: string;
  timePickerSubLabel?: string;
  timePickerValue: dayjs.Dayjs | any;
  setTimePickerValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  id: string;
  errors?: any;
  index?: number;
  setError?: any;
  register?: any;
  setValue?: any;
  watch?: any;
};
function CustomTimePicker({
  timePickerLabel,
  timePickerSubLabel,
  setTimePickerValue,
  errors,
  setError,
  id,
  register,
  setValue,
  watch,
}: Props) {
  const [timePicker, setTimePicker] = useState<HTMLButtonElement | null>(null);
  // const buttonElement = useRef(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTimePicker(event.currentTarget);
    setError(id, {
      type: 'manual',
      message: '',
    });
  };
  const handleClose = () => {
    setTimePicker(null);
  };

  // console.log("timePickerValue", errors);

  const open = Boolean(timePicker);
  const idProp = open ? id : undefined;

  const handleChange = (value: dayjs.Dayjs | null) => {
    setValue(id, value);
    setTimePickerValue(value);
    handleClose();
  };

  return (
    <>
      <FormControl className="FormControl w-full" variant="standard">
        <label className="FormLabel font-bold">
          {timePickerLabel}{' '}
          {timePickerSubLabel ? (
            <span className="SubLabel text-xs">{timePickerSubLabel}</span>
          ) : (
            ''
          )}
        </label>
        <Input
          name={id}
          // ref={buttonElement}
          {...register(id, {
            required: `*Select ${timePickerLabel.toLocaleLowerCase()}`,
          })}
          className="FormInput rounded-md border-[2px] px-2"
          type="text"
          placeholder="HH:MM"
          value={
            (watch(id) && watch(id) !== null && watch(id)?.format('HH:mm A')) ||
            ''
          }
          onChange={() => null}
          id={id}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
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
        {errors && (
          <span style={{ fontSize: '12px', color: 'red' }} role="alert">
            {errors[id]?.message}
          </span>
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
              onAccept={handleChange}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default CustomTimePicker;
