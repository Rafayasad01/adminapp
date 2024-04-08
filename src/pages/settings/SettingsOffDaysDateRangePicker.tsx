import dayjs from 'dayjs';
import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from '../../interfaces/shop-schedule.interface';

interface SettingsOffDaysDateRangePickerProps {
  dateRange: DateRange[];
  setDateRange: React.Dispatch<React.SetStateAction<DateRange[]>>;
}

const SettingsOffDaysDateRangePicker: React.FC<
  SettingsOffDaysDateRangePickerProps
> = ({ dateRange, setDateRange }) => {
  const handleRangeChange = (ranges: any) => {
    const date = ranges.selection.startDate;
    const startDate = dayjs(date).toDate();
    // let endDate = dayjs(date).endOf('week').toDate();
    const endDate = ranges.selection.endDate;
    setDateRange((previousState) => {
      return [
        {
          startDate,
          endDate,
          key: 'selection',
        },
      ];
    });
  };

  return (
    <DateRangePicker
      ranges={dateRange}
      months={1}
      onChange={handleRangeChange}
      showPreview={false}
      direction="horizontal"
      staticRanges={[]}
      inputRanges={[]}
      showDateDisplay={false}
      color="#fff"
      displayMode="dateRange"
    />
  );
};

export default SettingsOffDaysDateRangePicker;
