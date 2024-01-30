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

function TotalSaleChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 14,
        maxBarThickness: 14,
        minBarLength: 2,
        backgroundColor: 'rgba(66, 131, 244, 0.3)',
        hoverBackgroundColor: '#4283F4',
        borderRadius: 6,
        data: [5, 6, 7, 20, 24, 18, 14],
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

  return <Bar data={data} options={options} height={140} />;
}

export default TotalSaleChart;
