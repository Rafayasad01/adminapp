import {
  Chart as ChartJS,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  registerables,
  ScaleChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

ChartJS.register(...registerables);
type OptionType =
  | _DeepPartialObject<
      CoreChartOptions<'line'> &
        ElementChartOptions<'line'> &
        PluginChartOptions<'line'> &
        DatasetChartOptions<'line'> &
        ScaleChartOptions<any> &
        LineControllerChartOptions
    >
  | undefined;

function ReportsRevenueChart() {
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
        data: [20, 24, 18, 54, 45, 60],
      },
      {
        backgroundColor: 'rgba(66, 131, 244, 0.3)',
        borderColor: '#4283F4',
        borderWidth: 1.5,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        data: [28, 64, 37],
      },
      {
        backgroundColor: 'rgba(195, 103, 241, 0.3)',
        borderColor: '#C367F1',
        borderWidth: 1.5,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        data: [92, 44, 29],
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
        border: { dash: [8, 8] },
        grid: {
          drawTicks: false,
          display: true,
          color: (context: any) => {
            if (context.index === 0) {
              return '';
            }
            return '#E4E4E4';
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawTicks: false,
          display: true,
          color: (context: any) => {
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
    },
  };
  return <Line data={data} options={options} height={130} />;
}

export default ReportsRevenueChart;
