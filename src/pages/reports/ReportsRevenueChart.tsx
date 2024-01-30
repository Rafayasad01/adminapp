/* eslint-disable @typescript-eslint/naming-convention */
/* eslint no-underscore-dangle: 0 */
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

type pluginType = any | undefined;

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
      mode: 'index',
    },
  };
  const plugins: pluginType = [
    {
      afterDraw: (chart: any) => {
        if (chart.tooltip?._active?.length) {
          const { x } = chart.tooltip._active[0].element;
          const yAxis = chart.scales.y;
          const { ctx } = chart;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([5, 7]);
          ctx.moveTo(x, yAxis.top);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#C367F1';
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];
  return (
    <div className="flex h-[280px] w-full">
      <Line data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default ReportsRevenueChart;
