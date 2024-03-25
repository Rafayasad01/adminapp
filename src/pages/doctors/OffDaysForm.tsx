import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

function OffDaysForm() {
  const [devices, setDevices] = useState(() => []);
  const handleDevices = (
    event: React.MouseEvent<HTMLElement>,
    newDevices: any
  ) => {
    if (newDevices.length) {
      setDevices(newDevices);
      // console.log(newDevices);
    }
  };
  return (
    <div className="height-230">
      <div className="FormField">
        <ToggleButtonGroup
          value={devices}
          onChange={handleDevices}
          aria-label="device"
        >
          <ToggleButton
            className="CustomToggleBtn"
            value="Sun"
            aria-label="Sun"
            disableRipple
          >
            Sun
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Mon"
            aria-label="Mon"
            disableRipple
          >
            Mon
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Tue"
            aria-label="Tue"
            disableRipple
          >
            Tue
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Wed"
            aria-label="Wed"
            disableRipple
          >
            Wed
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Thu"
            aria-label="Thu"
            disableRipple
          >
            Thu
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Fri"
            aria-label="Fri"
            disableRipple
          >
            Fri
          </ToggleButton>
          <ToggleButton
            className="CustomToggleBtn"
            value="Sat"
            aria-label="Sat"
            disableRipple
          >
            Sat
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="FormField">
        <FormControl className="FormControl" variant="standard">
          <label className="FormLabel">Events</label>
          <Input
            className="FormInput"
            id="name"
            value=""
            name="name"
            placeholder="Public Holiday"
            disableUnderline
          />
        </FormControl>
      </div>
      <div className="FormField">
        <FormControl className="FormControl" variant="standard">
          <label className="FormLabel">Comments</label>
          <Input
            className="FormInput"
            id="name"
            value=""
            name="name"
            placeholder="Write Here...."
            disableUnderline
          />
        </FormControl>
      </div>
    </div>
  );
}

export default OffDaysForm;
