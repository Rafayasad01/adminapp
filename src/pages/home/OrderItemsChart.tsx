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

function OrderItemsChart() {
  const data = {
    labels: ['', '', ''],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 20,
        maxBarThickness: 20,
        minBarLength: 2,
        backgroundColor: ['#29CC97', '#4283F4', '#C367F1'],
        hoverBackgroundColor: '#4283F4',
        borderRadius: 4,
        data: [20, 24, 18],
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
        angleLines: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        angleLines: {
          display: false,
        },
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

  return <Bar data={data} options={options} height={180} />;
}

export default OrderItemsChart;
