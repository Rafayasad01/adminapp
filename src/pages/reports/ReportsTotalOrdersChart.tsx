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

// type pluginType = Plugin<'line', AnyObject>[] | undefined;

function ReportsTotalOrdersChart() {
  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
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
    maintainAspectRatio: false,
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

  // const plugins: pluginType = [
  //   {
  //     afterDraw: (chart: any, args: any, options: any) => {
  //       if (chart.tooltip?._active?.length) {
  //         console.log(chart, args, options);
  //         let lineAt = chart.config.options.lineAt;
  //         let ctxPlugin = chart.ctx;
  //         let xAxe = chart.tooltip.x;
  //         let yAxe = chart.tooltip.y;
  //         let y = chart.scales.y;
  //         ctxPlugin.strokeStyle = 'red';
  //         ctxPlugin.beginPath();
  //         lineAt = y.getPixelForValue(lineAt);
  //         ctxPlugin.moveTo(xAxe.left, lineAt);
  //         ctxPlugin.lineTo(xAxe.right, lineAt);
  //         ctxPlugin.stroke();
  //       }
  //     },
  //   },
  // ];

  return <Bar data={data} options={options} height={225} />;
}

export default ReportsTotalOrdersChart;
