import assets from '../../../assets';
import TopBar from '../../../components/common/TopBar';

function SuperAdminDashboardPage() {
  return (
    <>
      <TopBar title="Dashboard" />
      <div className="coming-soon">
        <div className="content">
          <div className="icon">
            <img className="w-100" src={assets.images.comingSoonIcon} alt="" />
          </div>
          <h4 className="text">Coming Soon</h4>
        </div>
      </div>
      {/* <div className="container mt-3">
        <div className="mt-2 grid grid-cols-4 gap-3">
          <div className="flex h-24 flex-row rounded-lg bg-gray-50 shadow-lg">
            <div className="flex w-full flex-col justify-center pl-3">
              <h2 className="font-open-sans text-2xl font-semibold text-neutral-900">
                200
              </h2>
              <span className="font-open-sans text-xs text-neutral-500">
                Total Shops
              </span>
            </div>
            <div className="mr-3 flex w-20 flex-col items-center justify-around">
              <IconButton className="p-0">
                <div className="rounded-xl bg-neutral-200 p-3">
                  <img
                    className="aspect-square w-9"
                    src={assets.images.totalShopsIcon}
                    alt=""
                  />
                </div>
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row rounded-lg bg-gray-50 shadow-lg">
            <div className="flex w-full flex-col justify-center pl-3">
              <h2 className="font-open-sans text-2xl font-semibold text-neutral-900">
                160
              </h2>
              <span className="font-open-sans text-xs text-neutral-500">
                Active Shops
              </span>
            </div>
            <div className="mr-3 flex w-20 flex-col items-center justify-around">
              <IconButton className="p-0">
                <div className="rounded-xl bg-neutral-200 p-3">
                  <img
                    className="aspect-square w-9"
                    src={assets.images.activeShopsIcon}
                    alt=""
                  />
                </div>
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row rounded-lg bg-gray-50 shadow-lg">
            <div className="flex w-full flex-col justify-center pl-3">
              <h2 className="font-open-sans text-2xl font-semibold text-neutral-900">
                40
              </h2>
              <span className="font-open-sans text-xs text-neutral-500">
                Inactive Shops
              </span>
            </div>
            <div className="mr-3 flex w-20 flex-col items-center justify-around">
              <IconButton className="p-0">
                <div className="rounded-xl bg-neutral-200 p-3">
                  <img
                    className="aspect-square w-9"
                    src={assets.images.inactiveShopsIcon}
                    alt=""
                  />
                </div>
              </IconButton>
            </div>
          </div>
          <div className="flex h-24 flex-row rounded-lg bg-gray-50 shadow-lg">
            <div className="flex w-full flex-col justify-center pl-3">
              <h2 className="font-open-sans text-2xl font-semibold text-neutral-900">
                130
              </h2>
              <span className="font-open-sans text-xs text-neutral-500">
                Total Drivers
              </span>
            </div>
            <div className="mr-3 flex w-20 flex-col items-center justify-around">
              <IconButton className="p-0">
                <div className="rounded-xl bg-neutral-200 p-3">
                  <img
                    className="aspect-square w-9"
                    src={assets.images.totalDriversIcon}
                    alt=""
                  />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-3">
          <div className="col-span-8 h-full w-full rounded-xl bg-gray-50 p-2">
            <div className="mt-4 mb-2 flex items-center gap-2 px-3">
              <h2 className="font-open-sans text-2xl font-semibold text-neutral-900">
                Revenue
              </h2>
              <div className="flex-grow" />
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-purple-500">
                  &nbsp;
                </div>
                <div className="font-open-sans text-xs font-normal">
                  Total Revenue
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500">
                  &nbsp;
                </div>
                <div className="font-open-sans text-xs font-normal">
                  Acc To Service
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-blue-500">
                  &nbsp;
                </div>
                <div className="font-open-sans text-xs font-normal">
                  Acc To Service
                </div>
              </div>
              <Button
                variant="contained"
                className="h-8 bg-neutral-200 px-4 py-1 text-neutral-900 shadow-none"
              >
                Download
              </Button>
              <Select
                className="h-8 bg-neutral-200 px-2 text-neutral-900 shadow-none"
                labelId="month-select-label"
                id="month-select"
              >
                <MenuItem value="12 months">12 months</MenuItem>
              </Select>
            </div>

            <SuperAdminDashboardRevenueLineChart />
          </div>
          <div className="col-span-4 h-full w-full rounded-xl bg-gray-50 p-2">
            <div className="mt-4 mb-2 flex items-center gap-2 px-3">
              <h2 className="font-open-sans text-xl font-semibold text-neutral-900">
                New Shops
              </h2>
            </div>
            <div className="flex w-full justify-between px-3">
              <div className="font-open-sans text-sm font-semibold text-neutral-900">
                Shop
              </div>
              <div className="mb-5 font-open-sans text-sm font-semibold text-neutral-900">
                Date
              </div>
            </div>
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center">
                  <img
                    className="mr-2 aspect-square w-14 rounded-full object-contain"
                    src={assets.tempImages.freshCleanLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Fresh N&apos; Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      FCP002
                    </div>
                  </div>
                </div>
                <div className="font-open-sans text-sm font-normal text-neutral-900">
                  {dayjs().format('DD MMM, YYYY')}
                </div>
              </div>
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center">
                  <img
                    className="mr-2 aspect-square w-14 rounded-full object-contain"
                    src={assets.tempImages.spotlessLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Spotless Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      S0806
                    </div>
                  </div>
                </div>
                <div className="font-open-sans text-sm font-normal text-neutral-900">
                  {dayjs().format('DD MMM, YYYY')}
                </div>
              </div>
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center">
                  <img
                    className="mr-2 aspect-square w-14 rounded-full object-contain"
                    src={assets.tempImages.soapyLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Soapy Suds Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      SS007
                    </div>
                  </div>
                </div>
                <div className="font-open-sans text-sm font-normal text-neutral-900">
                  {dayjs().format('DD MMM, YYYY')}
                </div>
              </div>
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center">
                  <img
                    className="mr-2 aspect-square w-14 rounded-full object-contain"
                    src={assets.tempImages.sudsLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Suds Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      SL001
                    </div>
                  </div>
                </div>
                <div className="font-open-sans text-sm font-normal text-neutral-900">
                  {dayjs().format('DD MMM, YYYY')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-gray-50 p-2">
          <div className="px-3 font-open-sans text-xl font-semibold text-neutral-900">
            Top Shops
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="font-open-sans text-sm font-semibold">Shop</th>
                <th className="font-open-sans text-sm font-semibold">Phone</th>
                <th className="font-open-sans text-sm font-semibold">Email</th>
                <th className="font-open-sans text-sm font-semibold">
                  License Number
                </th>
                <th className="text-center font-open-sans text-sm font-semibold">
                  Status
                </th>
                <th className="text-end font-open-sans text-sm font-semibold">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex items-center">
                  <img
                    className="mr-2 aspect-square h-11 w-11 rounded-full object-contain"
                    src={assets.tempImages.sudsLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Suds Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      SL001
                    </div>
                  </div>
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  +1 1234 5678 900
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  sudslaundry@email.com
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  03 141 633
                </td>
                <td className="text-center">
                  <div className="rounded-3xl bg-emerald-300 py-1 font-open-sans text-xs font-bold text-gray-50">
                    Active
                  </div>
                </td>
                <td className="text-end font-open-sans text-sm font-normal text-neutral-900">
                  $600k
                </td>
              </tr>
              <tr>
                <td className="flex items-center">
                  <img
                    className="mr-2 aspect-square h-11 w-11 rounded-full object-contain"
                    src={assets.tempImages.freshCleanLaundry}
                    alt=""
                  />
                  <div>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Fresh N&apos; Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      FCP002
                    </div>
                  </div>
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  +1 504-202-0297
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  freshnclean@email.com
                </td>
                <td className="font-open-sans text-sm font-normal text-neutral-900">
                  82 908 852
                </td>
                <td className="text-center">
                  <div className="rounded-3xl bg-emerald-300 py-1 font-open-sans text-xs font-bold text-gray-50">
                    Active
                  </div>
                </td>
                <td className="text-end font-open-sans text-sm font-normal text-neutral-900">
                  $400k
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}

export default SuperAdminDashboardPage;
