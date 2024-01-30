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

function ReportsMostOrderedChart() {
  const data = {
    labels: ['Pants', 'Frocks', 'Jeans', 'Shirts'],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 10,
        minBarLength: 2,
        backgroundColor: ['#F1D8FD', '#F1D8FD', '#F1D8FD', '#F1D8FD'],
        hoverBackgroundColor: '#F1D8FD',
        borderRadius: 12,
        data: [180, 400, 120, 200],
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

  return <Bar data={data} options={options} height={220} />;
}

export default ReportsMostOrderedChart;
