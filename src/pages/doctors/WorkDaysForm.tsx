import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

function WorkDaysForm({ onlyweeksformat }: Props) {
  const [shopInTime, setShopInTime] = useState<dayjs.Dayjs | null>(null);
  const [shopOutTime, setShopOutTime] = useState<dayjs.Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`${!onlyweeksformat && 'height-230'}`}>
        {!onlyweeksformat && (
          <>
            <div className="FormFields">
              <TimePickerField
                timePickerLabel="In Time"
                timePickerValue={shopInTime}
                setTimePickerValue={setShopInTime}
                id="shopInTimePicker"
              />
              <TimePickerField
                timePickerLabel="Out Time"
                timePickerValue={shopOutTime}
                setTimePickerValue={setShopOutTime}
                id="shopOutTimePicker"
              />
            </div>
            <div className="FormField">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    icon={
                      <RadioButtonUncheckedOutlinedIcon
                        style={{ color: 'var(--theme-primary)' }}
                      />
                    }
                    checkedIcon={
                      <CheckCircleOutlinedIcon
                        style={{ color: 'var(--theme-primary)' }}
                      />
                    }
                  />
                }
                className="text-primary"
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
