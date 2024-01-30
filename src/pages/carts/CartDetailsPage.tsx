import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import ProcessingIcon from '../../components/icons/ProcessingIcon';
import cartService from '../../services/adminapp/adminCarts';
import { CART_STATUS_NEW } from '../../utils/constants';

function CartDetailsPage() {
  const [viewData, setViewData] = useState<any>({});
  const [emptyVariable] = useState(null);
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const params = useParams();
  const id: any = params.cartId;
  useEffect(() => {
    cartService
      .viewService(id)
      .then((item) => {
        if (item) {
          setIsLoader(false);
          // console.log('item', item.data.data);
          setViewData(item.data.data);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="View Cart" />
      <div className="container py-3">
        <div className="flex-center flex justify-center">
          <div className="mb-auto min-h-[600px] w-[60%] rounded-lg bg-[#fff] shadow-lg">
            <div className="p-4">
              <div className="flex items-center">
                {viewData && viewData.status === CART_STATUS_NEW ? (
                  <div className="relative mr-2 inline-flex text-blue-500">
                    <CircularProgress
                      thickness={1.5}
                      className="z-10"
                      size="4rem"
                      variant="determinate"
                      value={50}
                      color="inherit"
                    />
                    <CircularProgress
                      thickness={1.5}
                      className="absolute z-0 text-neutral-200"
                      size="4rem"
                      variant="determinate"
                      value={100}
                      color="inherit"
                    />
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                      <AssignmentTurnedInOutlinedIcon className="text-xl" />
                    </div>
                  </div>
                ) : (
                  <div className="relative mr-2 inline-flex text-green-500">
                    <CircularProgress
                      thickness={1.5}
                      className="z-10"
                      size="4rem"
                      variant="determinate"
                      value={100}
                      color="inherit"
                    />
                    <CircularProgress
                      thickness={1.5}
                      className="absolute z-0 text-neutral-200"
                      size="4rem"
                      variant="determinate"
                      value={100}
                      color="inherit"
                    />
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                      <div className="text-xl">
                        <ProcessingIcon />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-open-sans text-xs font-normal text-neutral-900">
                      cart Id:&nbsp;
                    </span>
                    <span className="font-open-sans text-sm font-semibold text-neutral-900">
                      {params.cartId}
                    </span>
                  </div>
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {dayjs(viewData.updatedDate).isValid()
                      ? `${dayjs(viewData.updatedDate)?.format(
                          'ddd, MMM DD, YYYY | hh:mm:ssA'
                        )}`
                      : '----'}
                  </div>
                  <div
                    className={`font-open-sans text-sm font-semibold ${
                      viewData.status === CART_STATUS_NEW
                        ? 'text-blue-500'
                        : 'text-green-500'
                    }`}
                  >
                    {viewData.status}
                  </div>
                </div>
                <div className="flex-grow" />
              </div>
              <hr className="my-4 h-[1px] w-full bg-neutral-200" />
              <div className="grid grid-cols-2">
                <div className="flex flex-col">
                  <div className="font-open-sans text-sm font-semibold text-neutral-900">
                    Pick Up Time
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.pickupDateTime).isValid()
                        ? dayjs(viewData.pickupDateTime)?.format(
                            'ddd, MMM DD, YYYY'
                          )
                        : '----'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.pickupDateTime).isValid()
                        ? `
                      ${dayjs(viewData.pickupDateTime)?.format('HH:mm:ssA')} -
                      ${dayjs(viewData.pickupDateTime)
                        ?.add(1, 'hours')
                        .format('HH:mm:ssA')}
                      `
                        : '----'}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-open-sans text-sm font-semibold text-neutral-900">
                    Drop Off Time
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.dropDateTime).isValid()
                        ? dayjs(viewData.dropDateTime)?.format(
                            'ddd, MMM DD, YYYY'
                          )
                        : '----'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      {dayjs(viewData.dropDateTime).isValid()
                        ? `
                      ${dayjs(viewData.dropDateTime)?.format('HH:mm:ssA')} -
                      ${dayjs(viewData.dropDateTime)
                        ?.add(1, 'hours')
                        .format('HH:mm:ssA')}
                      `
                        : '----'}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              <div className="flex items-center">
                <LocationOnOutlinedIcon className="mr-2 text-xl text-neutral-900" />
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  {viewData.userAddress && viewData.userAddress.address
                    ? viewData.userAddress.address
                    : 'No Address'}
                </div>
              </div>
              <hr className="my-3 h-[1px] w-full bg-neutral-200" />
              {viewData.appUserCartItems &&
                viewData.appUserCartItems.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      {index > 0 && (
                        <hr className="my-2 h-[1px] w-full bg-neutral-200" />
                      )}
                      <div className="flex items-center">
                        <img
                          className="mr-2 aspect-square w-11 rounded-full"
                          src={item.icon}
                          alt=""
                        />
                        <div className="flex-grow font-open-sans text-xs font-semibold text-neutral-900">
                          {item.name}
                        </div>
                        <div className="mx-4 text-right font-open-sans text-xs font-normal text-neutral-500">
                          {item.quantity} Items
                        </div>
                        <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                          ${item.unitPrice}
                        </div>
                      </div>
                    </div>
                  );
                })}
              <hr className="my-2 h-[1px] w-full bg-neutral-200" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Total Amount
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    ${viewData.totalAmount}
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    Discount
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    $18.00
                  </div>
                </div> */}
                <div className="flex items-center justify-between">
                  <div className="font-open-sans text-sm font-normal text-neutral-500">
                    HST {viewData.gstPercentage}%
                  </div>
                  <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                    ${viewData.gstAmount}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-b-lg bg-neutral-300 py-2 px-4">
              <div className="font-open-sans text-sm font-semibold text-neutral-900">
                Grand Total
              </div>
              <div className="text-right font-open-sans text-sm font-semibold text-neutral-900">
                ${viewData.grandTotal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartDetailsPage;
