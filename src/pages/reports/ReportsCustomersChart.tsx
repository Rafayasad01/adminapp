import {
  ArcElement,
  Chart,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  DoughnutController,
  DoughnutControllerChartOptions,
  ElementChartOptions,
  Legend,
  PluginChartOptions,
  ScaleChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Doughnut } from 'react-chartjs-2';

type DoughnutOptions =
  | _DeepPartialObject<
      CoreChartOptions<'doughnut'> &
        ElementChartOptions<'doughnut'> &
        PluginChartOptions<'doughnut'> &
        DatasetChartOptions<'doughnut'> &
        ScaleChartOptions<'doughnut'> &
        DoughnutControllerChartOptions
    >
  | undefined;
Chart.register(DoughnutController, ArcElement, Legend);
const options: DoughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  circumference: 180,
  rotation: 270,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'start',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
      },
    },
  },
};
const data: ChartData<'doughnut', number[], unknown> = {
  labels: [
    'Total Customers',
    'New Customer Orders',
    'Active Customers',
    'Inactive Customers',
  ],
  datasets: [
    {
      label: '',
      data: [300, 50, 100, 250],
      backgroundColor: ['#C367F1', '#4283F4', '#29CC97', '#FC0000'],
    },
  ],
};
function ReportsCustomersChart() {
  return <Doughnut options={options} data={data} height={280} />;
}

export default ReportsCustomersChart;
