import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
import assets from '../../../../assets';
import SuperAdminShopDetailsTotalSaleBarChart from './SuperAdminShopDetailsTotalSaleBarChart';

function SuperAdminShopDetailsPage() {
  return (
    <>
      <SuperAdminTopBar isNestedRoute title="Shop Details" />
      <div className="grid w-full grid-cols-9 gap-3">
        <div className="col-span-3 w-full">
          <div className="rounded-lg bg-gray-50 p-2">
            <div className="flex">
              <img
                className="mr-4 aspect-square h-24 w-24 items-center rounded-full object-cover"
                src={assets.tempImages.freshCleanLaundry}
                alt=""
              />
              <div>
                <div className="font-open-sans text-xl font-semibold text-neutral-900">
                  UrLaundry
                </div>
                <div className="font-open-sans text-base font-semibold text-neutral-500">
                  481872
                </div>
                <div className="font-open-sans text-base font-semibold text-neutral-900">
                  Change Password
                </div>
              </div>
            </div>
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Email
            </div>
            <div className="font-open-sans text-base font-normal text-neutral-500">
              JohnSPhillips@dayrep.com
            </div>
            <div className="py-2" />
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Phone
            </div>
            <div className="font-open-sans text-base font-normal text-neutral-500">
              +1 218 319 7750
            </div>
            <div className="py-2" />
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Postal code
            </div>
            <div className="font-open-sans text-base font-normal text-neutral-500">
              00501
            </div>
            <div className="py-2" />
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Address 1
            </div>
            <div className="font-open-sans text-base font-normal text-neutral-500">
              1192 Ashmor DriveWadena, MN 56482
            </div>
            <div className="py-2" />
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Address 2
            </div>
            <div className="font-open-sans text-base font-normal text-neutral-500">
              1192 Ashmor DriveWadena, MN 56482
            </div>
            <div className="py-2" />
            <div className="font-open-sans text-lg font-semibold text-neutral-900">
              Social Links
            </div>
            <div className="my-2 flex gap-3">
              <img
                className="aspect-square w-9 object-contain"
                src={assets.images.facebook}
                alt=""
              />
              <img
                className="aspect-square w-9 object-contain"
                src={assets.images.instagram}
                alt=""
              />
              <img
                className="aspect-square w-9 object-contain"
                src={assets.images.twitter}
                alt=""
              />
              <img
                className="aspect-square w-9 object-contain"
                src={assets.images.whatsApp}
                alt=""
              />
              <IconButton className="aspect-square w-9 rounded-full bg-neutral-200 p-0 text-neutral-900 hover:!bg-neutral-200">
                <AddOutlinedIcon color="inherit" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="col-span-6 w-full">
          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4 w-full">
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="flex h-32 w-full flex-col p-2">
                  <div className="flex-grow self-start font-open-sans text-xl font-semibold text-neutral-900">
                    User Limit
                  </div>
                  <div className="self-end font-open-sans text-3xl font-semibold text-neutral-900">
                    144/150
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 w-full">
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="flex h-32 w-full flex-col p-2">
                  <div className="flex-grow self-start font-open-sans text-xl font-semibold text-neutral-900">
                    App Colors
                  </div>
                  <div className="self-end">
                    <div className="aspect-square w-8 rounded-full bg-neutral-900" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 w-full">
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="flex h-32 w-full flex-col p-2">
                  <div className="flex-grow self-start font-open-sans text-xl font-semibold text-neutral-900">
                    Status
                  </div>
                  <div className="self-end font-open-sans text-3xl font-semibold text-neutral-900">
                    Active
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 w-full">
              <div className="rounded-lg bg-gray-50 p-2">
                <SuperAdminShopDetailsTotalSaleBarChart />
              </div>
            </div>
            <div className="col-span-12 w-full">
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="px-4 py-2 font-open-sans text-xl font-semibold text-neutral-900">
                  Activity Logs
                </div>
                <table className="table-border table-auto">
                  <thead>
                    <tr>
                      <th className="font-open-sans text-sm font-semibold text-neutral-900">
                        Date & Time
                      </th>
                      <th className="font-open-sans text-sm font-semibold text-neutral-900">
                        User
                      </th>
                      <th className="font-open-sans text-sm font-semibold text-neutral-900">
                        Email
                      </th>
                      <th className="font-open-sans text-sm font-semibold text-neutral-900">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        {dayjs()
                          .add(6, 'hours')
                          .format('DD MMM, YYYY, HH:mm a')}
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Allie James
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        James.allie@gmail.com
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Change status to deactivate
                      </td>
                    </tr>
                    <tr>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        {dayjs()
                          .add(12, 'hours')
                          .format('DD MMM, YYYY, HH:mm a')}
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Christian Albert
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Christian_12@gmail.com
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        User Limit Extend
                      </td>
                    </tr>
                    <tr>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        {dayjs()
                          .add(18, 'hours')
                          .format('DD MMM, YYYY, HH:mm a')}
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Mark Spartan
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Mark.980@gmail.com
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Logo Uploaded
                      </td>
                    </tr>
                    <tr>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        {dayjs()
                          .add(24, 'hours')
                          .format('DD MMM, YYYY, HH:mm a')}
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Joe Steve
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Steve.joe56@gmail.com
                      </td>
                      <td className="font-open-sans text-sm font-normal text-neutral-900">
                        Logo Uploaded
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminShopDetailsPage;
