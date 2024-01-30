import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import '../../assets/css/PopupStyle.css';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

type Props = {
  colorPickerLabel: string;
  colorPickerValue: any;
  setColorPickerValue: React.Dispatch<React.SetStateAction<any>>;
  id: string;
};

function ColorPicker({
  colorPickerLabel,
  colorPickerValue,
  setColorPickerValue,
  id,
}: Props) {
  const [colorPicker, setColorPicker] = useState<HTMLButtonElement | null>(
    null
  );
  const buttonElement = useRef(null);

  const handleClose = () => {
    setColorPicker(null);
  };

  const open = Boolean(colorPicker);
  const idProp = open ? id : undefined;

  const handleClick = () => {
    setColorPicker(buttonElement.current);
  };

  const handleChangeComplete = (color: any) => {
    // console.log('color::::::', color);
    // console.log('event::::::', event);
    setColorPickerValue(color.hex);
    // handleClose();
  };

  return (
    <>
      <FormControl className="FormControl" variant="standard">
        <label className="FormLabel">{colorPickerLabel}</label>
        <IconButton
          ref={buttonElement}
          aria-label="toggle password visibility"
          onClick={handleClick}
          style={{
            padding: 0,
            width: '50px',
            height: '50px',
            margin: 0,
            justifyContent: 'flex-start',
          }}
          disableRipple
        >
          <span
            style={{ backgroundColor: colorPickerValue }}
            className="block h-[25px] w-[25px] rounded-full border border-foreground"
          />
          {/* <ColorLensOutlinedIcon
            style={{ fontSize: '40px', color: colorPickerValue }}
          /> */}
        </IconButton>
      </FormControl>
      <Popover
        id={idProp}
        open={open}
        anchorEl={colorPicker}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <SketchPicker
            color={colorPickerValue}
            onChangeComplete={handleChangeComplete}
          />
        </ThemeProvider>
      </Popover>
    </>
  );
}

export default ColorPicker;
