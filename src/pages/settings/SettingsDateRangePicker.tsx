import { endOfWeek, startOfWeek } from 'date-fns';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAppDispatch } from '../../redux/redux-hooks';
import { setScheduleMonthDateForWeek } from '../../redux/features/shopScheduleStateSlice';

type Props = {
  calendarStyle: string;
};

function SettingsDateRangePicker({ calendarStyle }: Props) {
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfWeek(new Date()), // start of the current week (Monday)
      endDate: endOfWeek(new Date()), // end of the current week (Sunday)
      key: 'selection',
    },
  ]);

  const handleRangeChange = (ranges: any) => {
    let date = ranges.selection.startDate;
    let startDate = dayjs(date).startOf('week').toDate();
    let endDate = dayjs(date).endOf('week').toDate();
    setDateRange((previousState) => {
      if (
        previousState[0].startDate.toISOString() === startDate.toISOString()
      ) {
        date = ranges.selection.endDate;
        startDate = dayjs(date).startOf('week').toDate();
        endDate = dayjs(date).endOf('week').toDate();
        dispatch(
          setScheduleMonthDateForWeek(dayjs(endDate).format('YYYY-MM-DD'))
        );
        return [
          {
            startDate,
            endDate,
            key: 'selection',
          },
        ];
      }
      dispatch(
        setScheduleMonthDateForWeek(dayjs(endDate).format('YYYY-MM-DD'))
      );

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
      className={calendarStyle}
      color="#fff"
      dragSelectionEnabled={false}
    />
  );
}

export default SettingsDateRangePicker;
