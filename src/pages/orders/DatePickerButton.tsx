import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type Props = {
  icon: JSX.Element;
  id: string;
  onChange: (value: dayjs.Dayjs | null) => void;
};
function DatePickerButton({ onChange, id, icon }: Props) {
  const [datePicker, setDatePicker] = useState<HTMLButtonElement | null>(null);
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
    onChange(value);
    handleClose();
  };

  return (
    <>
      <Button
        ref={buttonElement}
        className="m-0 border-none p-0 font-open-sans text-xs font-semibold text-neutral-900 hover:bg-transparent"
        variant="outlined"
        color="inherit"
        startIcon={icon}
        onClick={handleClick}
      />

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
          <StaticDateTimePicker
            displayStaticWrapperAs="desktop"
            defaultValue={dayjs('2022-04-17T15:30')}
            onAccept={handleChange}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default DatePickerButton;
