import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { StaticTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

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
  timePickerValue: dayjs.Dayjs | null;
  setTimePickerValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  id: string;
};
function TimePickerField({
  timePickerLabel,
  timePickerValue,
  setTimePickerValue,
  id,
}: Props) {
  const [timePicker, setTimePicker] = useState<HTMLButtonElement | null>(null);
  const buttonElement = useRef(null);
  const handleClick = () => {
    setTimePicker(buttonElement.current);
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

  return (
    <>
      <FormControl className="FormControl" variant="standard">
        <label className="FormLabel">{timePickerLabel}</label>
        <Input
          ref={buttonElement}
          className="alder-form-control-date-picker border-[#F1F1F1]"
          type="text"
          placeholder="HH:MM A"
          value={timePickerValue?.format('HH:MM A') ?? ''}
          onChange={() => null}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                style={{ padding: 0 }}
              >
                <AccessTimeOutlinedIcon
                  style={{ color: 'var(--theme-primary)' }}
                />
              </IconButton>
            </InputAdornment>
          }
          disableUnderline
        />
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
          <StaticTimePicker
            displayStaticWrapperAs="desktop"
            defaultValue={dayjs('2022-04-17T15:30')}
            onAccept={handleChange}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default TimePickerField;
