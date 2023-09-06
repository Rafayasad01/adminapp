import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import dayjs from 'dayjs';
import assets from '../../../assets';
import TopBar from '../../../components/common/TopBar';

function SuperAdminSupportPage() {
  return (
    <>
      <TopBar title="Support" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-4 h-full w-full rounded-xl bg-gray-50 p-2">
          <div className="flex flex-col">
            <div className="py-2 font-open-sans text-xl font-semibold text-neutral-900">
              All Chats
            </div>
            <hr className="h-0.5 rounded-full bg-neutral-300" />
            <div className="flex items-center py-4">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.sudsLaundry}
                alt=""
              />
              <div className="flex-grow">
                <div className="text-ellipsis font-open-sans text-base font-semibold text-neutral-900">
                  Suds Laundry
                </div>
                <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-open-sans text-sm font-normal text-neutral-500">
                  Lorem ipsum Lorem ipsum Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Aspernatur, qui.
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-xs font-normal text-neutral-500">
                  {dayjs().format('HH:mm')}
                </div>
                <div>
                  <Badge
                    badgeContent={4}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        color: '#ffffff',
                        backgroundColor: '#EF4444',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="h-0.5 rounded-full bg-neutral-300" />
            <div className="flex items-center py-4">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.freshCleanLaundry}
                alt=""
              />
              <div className="flex-grow">
                <div className="text-ellipsis font-open-sans text-base font-semibold text-neutral-900">
                  Fresh N&apos; Clean Laundry
                </div>
                <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-open-sans text-sm font-normal text-neutral-500">
                  Lorem ipsum Lorem ipsum Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Aspernatur, qui.
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-xs font-normal text-neutral-500">
                  {dayjs().format('HH:mm')}
                </div>
                <div>
                  <Badge
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        color: '#ffffff',
                        backgroundColor: '#EF4444',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="h-0.5 rounded-full bg-neutral-300" />
            <div className="flex items-center py-4">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.soapyLaundry}
                alt=""
              />
              <div className="flex-grow">
                <div className="text-ellipsis font-open-sans text-base font-semibold text-neutral-900">
                  Soapy Suds Laundry
                </div>
                <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-open-sans text-sm font-normal text-neutral-500">
                  Lorem ipsum Lorem ipsum Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Aspernatur, qui.
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-xs font-normal text-neutral-500">
                  {dayjs().format('HH:mm')}
                </div>
                <div>
                  <Badge
                    badgeContent={2}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        color: '#ffffff',
                        backgroundColor: '#EF4444',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="h-0.5 rounded-full bg-neutral-300" />
            <div className="flex items-center py-4">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.spotlessLaundry}
                alt=""
              />
              <div className="flex-grow">
                <div className="text-ellipsis font-open-sans text-base font-semibold text-neutral-900">
                  Spotless Laundry
                </div>
                <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap font-open-sans text-sm font-normal text-neutral-500">
                  Lorem ipsum Lorem ipsum Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Aspernatur, qui.
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-xs font-normal text-neutral-500">
                  {dayjs().format('HH:mm')}
                </div>
                <div>
                  <Badge
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        color: '#ffffff',
                        backgroundColor: '#EF4444',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-span-8 min-h-[84vh] w-full rounded-xl bg-gray-50 py-2 px-4">
          <div className="flex items-center py-4">
            <img
              className="mr-2 aspect-square w-16 rounded-full"
              src={assets.tempImages.sudsLaundry}
              alt=""
            />
            <div className="flex-grow">
              <div className="flex items-center ">
                <div className="mr-2 font-open-sans text-xl font-semibold text-neutral-900">
                  Suds Laundry
                </div>
                <div className="h-4 w-4 rounded-full outline outline-2 outline-emerald-400" />
              </div>
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Online
              </div>
            </div>
            <img src={assets.images.imageIcon} alt="" />
          </div>
          <hr className="h-0.5 rounded-full bg-neutral-300" />
          <div className="py-2 text-center font-open-sans text-sm font-normal text-neutral-500">
            Yesterday, 23 Feb, 2023
          </div>

          {/* Chat */}

          <div className=" flex w-full flex-col gap-3">
            <div className="flex items-end">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.sudsLaundry}
                alt=""
              />
              <div className="max-w-sm rounded-xl rounded-bl-none bg-gray-50 p-2 outline outline-1 outline-neutral-500">
                <div className="flex flex-col">
                  <div className="text-sm font-normal text-neutral-900">
                    The storage is full we haven&apos;t the space for add more
                    clients kindly please exceed my limit 20 percent now.
                  </div>
                  <div className="self-end text-sm font-normal text-neutral-500">
                    10:27 PM
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end self-end">
              <div className="max-w-sm rounded-xl rounded-br-none bg-neutral-900 p-2">
                <div className="flex flex-col">
                  <div className="text-sm font-normal text-gray-50">
                    Yes we will do that you have to wait until it’s done okay ?
                  </div>
                  <div className="self-end text-sm font-normal text-neutral-400">
                    10:27 PM
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <img
                className="mr-2 aspect-square w-11 rounded-full"
                src={assets.tempImages.sudsLaundry}
                alt=""
              />
              <div className="max-w-sm rounded-xl rounded-bl-none bg-gray-50 p-2 outline outline-1 outline-neutral-500">
                <div className="flex flex-col">
                  <div className="text-sm font-normal text-neutral-900">
                    How much time or day it will take ???
                  </div>
                  <div className="self-end text-sm font-normal text-neutral-500">
                    11:27 PM
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end self-end">
              <div className="max-w-sm rounded-xl rounded-br-none bg-neutral-900 p-2">
                <div className="flex flex-col">
                  <div className="text-sm font-normal text-gray-50">
                    It will complete in maximum 2 days or maybe more than that
                    We&apos;ll let you know soon...
                  </div>
                  <div className="self-end text-sm font-normal text-neutral-400">
                    10:29 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-8 w-[48rem] rounded-lg p-2 outline outline-1 outline-neutral-500">
            <textarea
              className="w-full resize-none focus:outline-none"
              name="chat"
              id="chat"
            />
            <hr className="h-0.5 rounded-full bg-neutral-300" />
            <div className="flex items-center gap-2 pt-2">
              <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-neutral-300 ">
                <IconButton className="text-neutral-900">
                  <AddOutlinedIcon color="inherit" />
                </IconButton>
              </div>
              <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-neutral-300 ">
                <IconButton className="text-neutral-900">
                  <CameraAltOutlinedIcon color="inherit" />
                </IconButton>
              </div>
              <div className="flex-grow" />
              <div className="h-8 outline outline-1 outline-neutral-300" />
              <IconButton className="text-neutral-900">
                <SendOutlinedIcon color="inherit" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminSupportPage;
