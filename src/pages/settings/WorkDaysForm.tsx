import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';

import '../../assets/css/PopupStyle.css';
import TimePickerField from './TimePickerField';

type Props = {
  onlyweeksformat?: boolean;
  setWeekDays?: any;
};

function WorkDaysForm({ onlyweeksformat, setWeekDays }: Props) {
  const [shopInTime, setShopInTime] = useState<dayjs.Dayjs | null>(null);
  const [shopOutTime, setShopOutTime] = useState<dayjs.Dayjs | null>(null);
  const [pickupTime, setPickupTime] = useState<dayjs.Dayjs | null>(null);
  const [dropoffTime, setDropoffTime] = useState<dayjs.Dayjs | null>(null);
  const [devices, setDevices] = useState(() => []);

  const handleDevices = (
    event: React.MouseEvent<HTMLElement>,
    newDevices: any
  ) => {
    if (newDevices.length) {
      // console.log('devices', newDevices);
      setDevices(newDevices);
      setWeekDays(newDevices);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`${!onlyweeksformat && 'height-230'}`}>
        <div className="FormField">
          <ToggleButtonGroup
            value={devices}
            onChange={handleDevices}
            aria-label="device"
          >
            <ToggleButton
              className="CustomToggleBtn"
              value="Sunday"
              aria-label="Sun"
              disableRipple
            >
              Sun
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Monday"
              aria-label="Mon"
              disableRipple
            >
              Mon
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Tuesday"
              aria-label="Tue"
              disableRipple
            >
              Tue
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Wednesday"
              aria-label="Wed"
              disableRipple
            >
              Wed
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Thursday"
              aria-label="Thu"
              disableRipple
            >
              Thu
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Friday"
              aria-label="Fri"
              disableRipple
            >
              Fri
            </ToggleButton>
            <ToggleButton
              className="CustomToggleBtn"
              value="Saturday"
              aria-label="Sat"
              disableRipple
            >
              Sat
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {!onlyweeksformat && (
          <>
            <div className="FormFields">
              <TimePickerField
                timePickerLabel="Shop In Time"
                timePickerValue={shopInTime}
                setTimePickerValue={setShopInTime}
                id="shopInTimePicker"
              />
              <TimePickerField
                timePickerLabel="Shop Out Time"
                timePickerValue={shopOutTime}
                setTimePickerValue={setShopOutTime}
                id="shopOutTimePicker"
              />
            </div>
            <div className="FormFields">
              <TimePickerField
                timePickerLabel="Pickup Time"
                timePickerValue={pickupTime}
                setTimePickerValue={setPickupTime}
                id="pickupTimePicker"
              />
              <TimePickerField
                timePickerLabel="Dropoff Time"
                timePickerValue={dropoffTime}
                setTimePickerValue={setDropoffTime}
                id="dropoffTimePicker"
              />
            </div>
            <div className="FormField">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    icon={
                      <RadioButtonUncheckedOutlinedIcon
                        style={{ color: '#1D1D1D' }}
                      />
                    }
                    checkedIcon={
                      <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                    }
                  />
                }
                label="Apply on Month"
              />
            </div>
          </>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default WorkDaysForm;
