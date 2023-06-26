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
import { Line } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { AnyObject } from 'chart.js/dist/types/basic';

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

function SuperAdminDashboardRevenueLineChart() {
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
        borderWidth: 1.5,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
        data: Array.from(Array(12).keys()).map(() =>
          Math.floor(20 + Math.random() * (600 - 20))
        ),
      },
      {
        backgroundColor: 'rgba(66, 131, 244, 0.3)',
        borderColor: '#4283F4',
        borderWidth: 1.5,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        data: Array.from(Array(12).keys()).map(() =>
          Math.floor(20 + Math.random() * (600 - 20))
        ),
      },
      {
        backgroundColor: 'rgba(195, 103, 241, 0.3)',
        borderColor: '#C367F1',
        borderWidth: 1.5,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        data: Array.from(Array(12).keys()).map(() =>
          Math.floor(20 + Math.random() * (600 - 20))
        ),
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
          display: true,
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
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
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
}

export default SuperAdminDashboardRevenueLineChart;
