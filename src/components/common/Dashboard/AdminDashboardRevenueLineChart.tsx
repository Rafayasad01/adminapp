import {
  Chart as ChartJS,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  Plugin,
  PluginChartOptions,
  registerables,
  ScaleChartOptions,
} from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../../redux/redux-hooks';

ChartJS.register(...registerables);
type OptionType =
  | _DeepPartialObject<
      CoreChartOptions<'line'> &
        ElementChartOptions<'line'> &
        PluginChartOptions<'line'> &
        DatasetChartOptions<'line'> &
        ScaleChartOptions<'line'> &
        LineControllerChartOptions
    >
  | undefined;

const AdminDashboardRevenueLineChart = () => {
  const { sales } = useAppSelector((state) => state?.dashboardState);

  const CompletedStats = Array(12).fill(0);
  sales.completed?.forEach((stat) => {
    const monthIndex = parseInt(stat.month, 10) - 1;
    CompletedStats[monthIndex] = parseInt(stat.totalSales, 10);
  });

  const MissedStats = Array(12).fill(0);
  sales.missed?.forEach((stat) => {
    const monthIndex = parseInt(stat.month, 10) - 1;
    MissedStats[monthIndex] = parseInt(stat.totalSales, 10);
  });
  const CanceledStats = Array(12).fill(0);
  sales.canceled?.forEach((stat) => {
    const monthIndex = parseInt(stat.month, 10) - 1;
    CanceledStats[monthIndex] = parseInt(stat.totalSales, 10);
  });

  const data = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    datasets: [
      {
        backgroundColor: 'rgba(41, 204, 151, 0.3)',
        borderColor: '#29CC97',
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 0,
        pointHoverRadius: 8,
        tension: 1,
        cubicInterpolationMode: 'monotone' as const,
        data: CompletedStats,
      },
      {
        backgroundColor: 'rgba(66, 131, 244, 0.3)',
        borderColor: '#4283F4',
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 0,
        pointHoverRadius: 8,
        tension: 1,
        cubicInterpolationMode: 'monotone' as const,
        data: MissedStats,
      },
      {
        backgroundColor: 'rgba(195, 103, 241, 0.3)',
        borderColor: '#C367F1',
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 0,
        pointHoverRadius: 8,
        tension: 1,
        cubicInterpolationMode: 'monotone' as const,
        data: CanceledStats,
      },
    ],
  };
  const options: OptionType = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 10,
        },
        border: { dash: [8, 8] },
        grid: {
          drawTicks: false,
          display: false,
          color: (context) => {
            if (context.index === 0) {
              return '';
            }
            return '#E4E4E4';
          },
        },
      },
      y: {
        ticks: {
          padding: 10,
          stepSize: 100,
          callback(value: number | string) {
            if (typeof value === 'number') {
              if (value >= 1000) {
                return `${value / 1000}k`;
              }
              return value;
            }
            return value;
          },
        },
        beginAtZero: true,
        grid: {
          drawTicks: false,
          display: true,
          color: (context) => {
            if (context.index === 0) {
              return '';
            }
            return '#E4E4E4';
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };
  const plugins: Plugin<'line', AnyObject>[] | undefined = [
    {
      id: 'super-admin-dashboard-revenue-line-chart',
    },
  ];
  return (
    <div className="flex h-80 w-full">
      <Line data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default AdminDashboardRevenueLineChart;
