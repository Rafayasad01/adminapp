import OutboundIcon from '@mui/icons-material/Outbound';
import IconButton from '@mui/material/IconButton';

import { SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import TopBar from '../../components/common/TopBar';
import ReportsAverageOrderValueChart from './ReportsAverageOrderValueChart';
import ReportsCustomersChart from './ReportsCustomersChart';
import ReportsMostOrderedChart from './ReportsMostOrderedChart';
import ReportsRevenueChart from './ReportsRevenueChart';
import ReportsTotalOrdersChart from './ReportsTotalOrdersChart';

function ReportsPage() {
  const [year, setYear] = useState('12 months');
  const [month, setMonth] = useState('Month');

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  return (
    <div>
      <TopBar title="Reports" />
      <div className="report-page container mt-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 h-96 rounded-lg bg-white shadow-lg">
            <div className="mt-4 flex flex-row items-center justify-between justify-items-center px-3">
              <span className="mr-5 flex">Revenue</span>
              <div className="flex flex-row items-center justify-center gap-5 px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <span className="custom-circle color-purple">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Total Revenue
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <span className="custom-circle color-success">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Acc to service
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-3">
                  <span className="custom-circle color-primary">&nbsp;</span>
                  <span className="font-open-sans text-[10px] font-semibold">
                    Acc to service
                  </span>
                </div>
              </div>
              <Button variant="contained" className="download-btn p-0">
                Download
              </Button>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                onChange={handleYearChange}
              >
                <MenuItem value="12 months">12 months</MenuItem>
              </Select>
            </div>
            <hr
              className="divider horizontal"
              style={{ margin: '0.625rem 0' }}
            />
            <div className="mt-3 mb-5 flex w-full px-3">
              <ReportsRevenueChart />
            </div>
          </div>
          <div className="col-span-1 h-96 rounded-lg bg-white shadow-lg">
            <div className="mt-4 flex flex-col px-3">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="flex font-open-sans text-sm font-normal text-[#9291A5]">
                    Customers
                  </span>
                  <span className="flex font-open-sans text-xl font-normal text-[#1E1B39]">
                    15,654
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <span className="flex pr-2 font-open-sans text-base font-semibold text-secondary">
                      1.3%
                    </span>
                    <IconButton className="p-0">
                      <OutboundIcon className="text-[#29CC97]" />
                    </IconButton>
                  </div>
                </div>
              </div>
              <hr
                className="divider horizontal"
                style={{ margin: '0.625rem 0' }}
              />
              <div className="mt-3 flex px-3">
                <ReportsCustomersChart />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="h-80 rounded-lg bg-white shadow-lg">
            <div className="mt-4 flex flex-col px-3">
              <div className="flex items-center justify-between">
                <span className="flex font-open-sans text-2xl font-semibold text-secondary">
                  Most Ordered
                </span>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <MenuItem value="Month">Month</MenuItem>
                </Select>
              </div>
              <hr
                className="divider horizontal"
                style={{ margin: '0.625rem 0' }}
              />
              <div className="mt-2 flex w-full px-3">
                <ReportsMostOrderedChart />
              </div>
            </div>
          </div>
          <div className="h-80 rounded-lg bg-white shadow-lg">
            <div className="mt-4 flex flex-col px-3">
              <div className="flex items-center justify-between">
                <span className="flex font-open-sans text-xl font-semibold text-secondary">
                  Average Order Value
                </span>
                <Button variant="contained" className="download-btn p-0">
                  Download
                </Button>
              </div>
              <hr
                className="divider horizontal"
                style={{ margin: '0.625rem 0' }}
              />
              <div className="mt-2 flex w-full px-3">
                <ReportsAverageOrderValueChart />
              </div>
            </div>
          </div>
          <div className="h-80 rounded-lg bg-white shadow-lg">
            <div className="mt-4 flex flex-col px-3">
              <div className="flex items-center justify-between">
                <span className="flex font-open-sans text-sm font-normal text-[#9291A5]">
                  Total Orders
                </span>
                <Button variant="contained" className="download-btn p-0">
                  Download
                </Button>
              </div>
              <hr
                className="divider horizontal"
                style={{ margin: '0.625rem 0' }}
              />
              <div className="mt-2 flex w-full px-3">
                <ReportsTotalOrdersChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
