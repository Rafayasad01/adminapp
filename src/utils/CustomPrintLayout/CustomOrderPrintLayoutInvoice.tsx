import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import assets from '../../assets';
import CustomText from '../../components/common/CustomText';

type CustomPrintLayoutsProps = {
  data: any;
  isPrintEnabled?: any;
  setPrintEnabled?: any;
};

const CustomPrintLayouts = forwardRef<any, CustomPrintLayoutsProps>(
  (
    {
      data,
      isPrintEnabled: _isPrintEnabled,
      setPrintEnabled: _setPrintEnabled,
    },
    ref: any
  ) => {
    return (
      <div style={{ display: 'none' }}>
        <div ref={ref}>
          <div className="print-invoice iv-padding container m-auto">
            <div className="w-full rounded-lg bg-white shadow-lg">
              <div className="flex justify-center px-[10px] py-3">
                <div className="c">
                  <span
                    className="font-open-sans text-2xl font-bold text-[#252733]"
                    style={{ fontSize: '24px' }}
                  >
                    Invoice Details
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 px-4 py-5">
                <div className="bor-right col-span-5 p-3">
                  <div className="">
                    <span className="font-open-sans text-xl font-bold text-[#252733]">
                      Client Information
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
                      <div className="my-4">
                        <span className="text-xl font-semibold uppercase">
                          {data?.user?.firstName} {data?.user?.lastName}
                        </span>
                      </div>
                      {/* {data?.paymentStatus && (
                        <div className="">
                          <span className="badge badge-success">
                            {data?.paymentStatus}
                          </span>
                        </div>
                      )} */}
                    </div>
                    <div className="">
                      <p className="text-sm font-semibold">Email</p>
                      <span className="text-sm">
                        {data?.user?.email ? data?.user?.email : '--'}
                      </span>
                    </div>
                    <div className="my-2">
                      <p className="text-sm font-semibold">Address</p>
                      <span className="text-sm">
                        {data?.userAddress?.address
                          ? data?.userAddress?.address
                          : '--'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 p-3">
                  <span className="font-open-sans text-xl font-bold text-[#252733]">
                    Order Information
                  </span>
                  <div className="p-3">
                    <div className="grid grid-cols-2 items-center">
                      <div className="my-4">
                        <span className="text-xl font-semibold uppercase">
                          {data?.orderNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="iv-mbot text-xl font-semibold">
                  Order Item Details
                </p>
                <table className="table-border table-auto">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data ? (
                      data?.orderItems?.map((item: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="avatar flex flex-row items-center">
                                <div className="">
                                  {item.icon !== 'null' ? (
                                    <img
                                      alt="avatarIcon"
                                      src={item.icon}
                                      height={45}
                                      width={45}
                                    />
                                  ) : (
                                    <img
                                      className="mr-2 aspect-square w-8 rounded-full"
                                      src={assets.images.noItems}
                                      alt="no-pic"
                                    />
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity ? item.quantity : '--'}</td>
                            <td>{item.unitPrice ? item.unitPrice : '--'}</td>
                          </tr>
                        );
                      })
                    ) : data?.orderItems?.length < 1 ? (
                      <CustomText noRoundedBorders text="No Records Found" />
                    ) : null}
                  </tbody>
                </table>
                <div className="custom--invoice mt-10 grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <div className="iv-tot-cost  iv-mtop  rounded-md">
                      <div className="mb-2 text-base font-bold uppercase">
                        Total Order Cost
                      </div>
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>Sub Total Amount :</span>
                        <span className="font-bold">
                          PKR {data?.totalAmount}
                        </span>
                      </div>
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>Voucher Discount :</span>
                        <span className="font-bold">PKR {data?.discount}</span>
                      </div>
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>loyalty Coins Discount :</span>
                        <span className="font-bold">
                          PKR {data?.discountLoyaltyCoins}
                        </span>
                      </div>
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>HST {data?.gstPercentage}% :</span>
                        <span className="font-bold">PKR {data?.gstAmount}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-lg font-medium">
                        <span>Grand Total Amount :</span>
                        <span className="font-bold">
                          PKR {data?.grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

function CustomOrderPrintLayoutSlip({
  data,
  isPrintEnabled,
  setPrintEnabled,
}: CustomPrintLayoutsProps) {
  const ref = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => setPrintEnabled(false),
  });
  const trigger = () => {
    setPrintEnabled(true);
    setTimeout(() => {
      handlePrint();
    }, 0);
  };

  return (
    <div className="text-sm">
      {isPrintEnabled ? <CustomPrintLayouts ref={ref} data={data} /> : null}
      <button onClick={trigger} className="printBtn">
        <DescriptionOutlinedIcon />
        <span className="mx-2">Invoice Report</span>
      </button>
    </div>
  );
}

export default CustomOrderPrintLayoutSlip;
