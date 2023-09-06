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
import { Bar } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

ChartJS.register(...registerables);
type OptionType =
  | _DeepPartialObject<
      CoreChartOptions<'bar'> &
        ElementChartOptions<'bar'> &
        PluginChartOptions<'bar'> &
        DatasetChartOptions<'bar'> &
        ScaleChartOptions<'bar'> &
        BarControllerChartOptions
    >
  | undefined;

function SuperAdminShopDetailsTotalSaleBarChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 14,
        maxBarThickness: 14,
        minBarLength: 2,
        backgroundColor: '#bfdbfe',
        hoverBackgroundColor: '#3B82F6',
        borderRadius: 6,
        data: Array.from(Array(7).keys()).map(() =>
          Math.floor(20 + Math.random() * (80 - 20))
        ),
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
        grid: {
          display: false,
        },
      },
      y: {
        border: { dash: [8, 8] },
        grid: {
          drawTicks: false,
          display: true,
          color: (context) => {
            if (context.index === 0) {
              return '';
            }
            return '#E5E5E5';
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} height={140} />;
}

export default SuperAdminShopDetailsTotalSaleBarChart;
