/* eslint-disable prefer-destructuring */
import {
  Chart as ChartJS,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  registerables,
  ScaleChartOptions,
  ScriptableContext,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Line } from 'react-chartjs-2';

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

function ReportsAverageOrderValueChart() {
  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        fill: 'start',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(85, 225, 180,0.4)');
          gradient.addColorStop(1, 'rgba(173, 252, 226,0)');
          gradient.addColorStop(1, 'rgba(227, 254, 245,0)');
          return gradient;
        },
        borderWidth: 2,
        data: [20, 24, 18, 54, 45, 60, 40],
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
    elements: {
      point: {
        radius: 0,
        hoverRadius: 8,
      },
    },
    indexAxis: 'x',
    scales: {
      x: {
        ticks: {
          padding: 10,
        },
        grid: {
          display: true,
          drawTicks: false,
          color: (context: any) => {
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
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
  };
  return <Line data={data} options={options} height={225} />;
}

export default ReportsAverageOrderValueChart;
