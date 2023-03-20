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
import IconButton from '@mui/material/IconButton';

import assets from '../../assets';

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

function ReportsPage() {
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 h-96 rounded-lg bg-white shadow-lg">
          URApp
        </div>
        <div className="col-span-1 h-96 rounded-lg bg-white shadow-lg">
          URApp
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="h-80 rounded-lg bg-white shadow-lg">URApp</div>
        <div className="h-80 rounded-lg bg-white shadow-lg">URApp</div>
        <div className="h-80 rounded-lg bg-white shadow-lg">URApp</div>
      </div>
    </div>
  );
}

export default ReportsPage;
