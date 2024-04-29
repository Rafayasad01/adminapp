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
import { memo } from 'react';
import { useAppSelector } from '../../../redux/redux-hooks';

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

const AdminDashboardTopServices = () => {
  const { services } = useAppSelector((state) => state?.dashboardState);

  const colors = ['#00E096', '#FFCF00', '#0095FF', '#C367F1'];

  const maxTotalAmount = Math.max(
    ...services.map((_x) => parseInt(_x.totalAmount || '0', 10) || 0)
  );
  const stepSize = Math.ceil(maxTotalAmount / 4);

  const data = {
    labels: services.map((x) => x.service),
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 50,
        minBarLength: 2,
        borderRadius: 10,
        backgroundColor: services.map(
          (_, index) => colors[index % colors.length]
        ),
        data: services.map((x) => x.totalAmount || 0),
      },
    ],
  };
  const options: OptionType = {
    responsive: true,
    indexAxis: 'x', // Set the index axis to 'y'
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
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
        ticks: {
          stepSize,
          callback(value: number | string) {
            if (typeof value === 'number') {
              if (value >= 1000) {
                return `${value / 1000}k`;
              }
              return value;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="mb-5 flex justify-between px-4">
        <span className="heading-color flex font-open-sans text-xl font-semibold text-primary">
          Most Ordered Services
        </span>
      </div>
      <Bar data={data} options={options} height={140} />
      <div className="mt-6 flex justify-center gap-4">
        {services.map((_, index) => (
          <div className="flex items-center" key={index}>
            <span
              style={{ backgroundColor: colors[index % colors.length] }}
              className="mx-2 inline-block h-[10px] w-[10px] rounded-full"
            />
            <span className="text-xs font-semibold">{_.service}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(AdminDashboardTopServices);
