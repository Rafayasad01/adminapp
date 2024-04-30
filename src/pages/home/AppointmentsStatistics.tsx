import {
  BarControllerChartOptions,
  Chart as ChartJS,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  registerables,
  ScaleChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Bar } from 'react-chartjs-2';
import { memo, useEffect, useState } from 'react';
import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppSelector } from '../../redux/redux-hooks';

ChartJS.register(...registerables);
type OptionType =
  | _DeepPartialObject<
      CoreChartOptions<'bar'> &
        ElementChartOptions<'bar'> &
        PluginChartOptions<'bar'> &
        DatasetChartOptions<'bar'> &
        ScaleChartOptions<any> &
        BarControllerChartOptions
    >
  | undefined;

const AppointmentsStatistics = () => {
  const { completedAppointmentsStats, inCompletedAppointmentsStats } =
    useAppSelector((state) => state?.dashboardState);
  const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));
  const [statsConfig, setStatsConfig] = useState('1');

  const showCompletedAppointmentsStats = () => {
    const stats = Array(12).fill(0);
    completedAppointmentsStats?.forEach((stat) => {
      const monthIndex = parseInt(stat.month, 10) - 1;
      stats[monthIndex] = parseInt(stat.count, 10);
    });
    setMonthlyCounts(stats);
  };

  const showInCompletedAppointmentsStats = () => {
    const stats = Array(12).fill(0);

    inCompletedAppointmentsStats?.forEach((stat) => {
      const monthIndex = parseInt(stat.month, 10) - 1;
      stats[monthIndex] = parseInt(stat.count, 10);
    });
    setMonthlyCounts(stats);
  };

  useEffect(() => {
    showCompletedAppointmentsStats();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setStatsConfig(value);
    if (parseInt(value, 10) === 1) {
      showCompletedAppointmentsStats();
    } else {
      showInCompletedAppointmentsStats();
    }
  };

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 14,
        maxBarThickness: 14,
        minBarLength: 2,
        backgroundColor: '#1D4675',
        hoverBackgroundColor: '#1D4675',
        borderRadius: 6,
        data: monthlyCounts,
      },
    ],
  };
  const options: OptionType = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawTicks: false,
          display: false,
          color: (context: any) => {
            if (context.index === 0) {
              return '';
            }
            return '#E4E4E4';
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between px-4">
        <span className="heading-color mb-3 flex font-open-sans text-xl font-semibold text-primary">
          Appointment Statistics
        </span>
        <FormControl variant="standard">
          <Select
            disableUnderline
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            value={statsConfig}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
          >
            <MenuItem value={1}>Completed</MenuItem>
            <MenuItem value={2}>Incomplete</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider className="my-4" />
      <Bar data={data} options={options} height={140} />
    </>
  );
};

export default memo(AppointmentsStatistics);
