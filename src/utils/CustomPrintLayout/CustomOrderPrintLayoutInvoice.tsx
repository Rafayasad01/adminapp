import React, { useRef, Ref, forwardRef, useEffect, useState } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import dayjs from 'dayjs';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CustomButton from '../../components/common/CustomButton';
import AppointmentVisitDetailPage from '../../pages/appointment/visit/AppointmentVisitDetailPage';
import assets from '../../assets';
import Service from '../../services/adminapp/adminAppointment';
import promiseHandler from '../helper';
import { useAppSelector } from '../../redux/redux-hooks';
import CustomText from '../../components/common/CustomText';

interface Props {
  data: any;
  isPrintEnabled?: any;
  setPrintEnabled?: any;
}

const CustomPrintLayouts = forwardRef<any, any>((props: any, ref: any) => {
  // console.log("A1", props.dataId);
  const [detailItems, setDetaiItems] = useState<any>();
  const authState: any = useAppSelector((state: any) => state?.authState);
  const qrCodeValue = `Tracking Id: ${props?.data?.id}`;

  console.log('PROPS.DATA', props?.data);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const [res, err] = await promiseHandler(Service.VisitDetailById(props.dataId.id))
  //         if (!res) {
  //             console.log('err', err)
  //             return;
  //         }
  //         if (!res.data.success) {
  //             console.log('err', res.data.message)
  //         }
  //         setDetaiItems(res?.data.data)

  //         setTimeout(() => props.handlePrint(), 0)
  //     }
  //     fetchData();
  // }, []);

  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>
        <div className="print-invoice container m-auto mt-5 iv-padding">
          <div className="w-full rounded-lg bg-white shadow-lg">
            <div className="flex  px-[10px] py-3 justify-center">
              <div className='c'>
                <span
                  className="font-open-sans text-2xl font-bold text-[#252733]"
                  style={{ fontSize: '24px' }}
                >
                  Invoice Details
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 px-4 py-5">
              <div className="col-span-5 p-3 bor-right">
                <div className="">
                  <span className="font-open-sans text-xl font-bold text-[#252733]">
                    Client Information
                  </span>
                </div>
                <div className="p-3">
                  <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
                    <div className="my-4">
                      <span className="text-xl font-semibold uppercase">
                        {props?.data?.user?.firstName}{' '}
                        {props?.data?.user?.lastName}
                      </span>
                    </div>
                    {props?.data?.paymentStatus && (
                      <div className="">
                        <span className="badge badge-success">
                          {props?.data?.paymentStatus}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Email</p>
                    <span className="text-sm">
                      {props?.data?.user?.email
                        ? props?.data?.user?.email
                        : '--'}
                    </span>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold">Address</p>
                    <span className="text-sm">
                      {props?.data?.user?.userAddress?.address
                        ? props?.data?.user?.userAddress?.address
                        : '--'}
                    </span>
                  </div>
                  {/* <div className="my-2">
                                        <p className="text-sm font-semibold">
                                            Patient Contact Number
                                        </p>
                                        <span className="text-sm">
                                            {list?.phone ? list?.phone : '--'}
                                        </span>
                                    </div> */}
                </div>
              </div>
              {/* <div className="col-span-1 border-l-[1px] border-[#a6bac8]" /> */}
              <div className="col-span-6 p-3">
                <span className="font-open-sans text-xl font-bold text-[#252733]">
                  Order Information
                </span>
                <div className="p-3">
                  <div className="grid grid-cols-2 items-center">
                    <div className="my-4">
                      <span className="text-xl font-semibold uppercase">
                        {props?.data?.orderNumber}
                      </span>
                    </div>
                    <div className="iv-item-right">
                      <span className="badge badge-success">
                        {props?.data?.status}
                      </span>
                    </div>
                  </div>
                  {/* <div className='grid grid-cols-2 items-center'> */}
                  <div className="">
                    <p className="text-sm font-semibold">Pick-up Date Time</p>
                    <span className="text-sm">
                      {props?.data?.pickupDateTime
                        ? dayjs(props?.data?.pickupDateTime).isValid() &&
                          dayjs(props?.data?.pickupDateTime).format('hh:mm A')
                        : '--'}
                    </span>
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Drop-off Date Time</p>
                    <span className="text-sm">
                      {props?.data?.dropDateTime
                        ? dayjs(props?.data?.dropDateTime).isValid() &&
                          dayjs(props?.data?.dropDateTime).format('hh:mm A')
                        : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-xl font-semibold iv-mbot">Order Item Details</p>
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
                  {props?.data ? (
                    props?.data?.orderItems?.map((item: any, index: number) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="avatar flex flex-row items-center">
                              <div className="">
                                <img
                                  alt="avatarIcon"
                                  src={item.icon}
                                  height={45}
                                  width={45}
                                />
                              </div>
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.quantity ? item.quantity : '--'}</td>
                          <td>{item.unitPrice ? item.unitPrice : '--'}</td>
                        </tr>
                      );
                    })
                  ) : props?.data?.orderItems?.length < 1 ? (
                    <CustomText noroundedborders text="No Records Found" />
                  ) : null}
                </tbody>
              </table>
              <div className="mt-10 grid grid-cols-12 gap-4 custom--invoice">
              <div className="col-span-5 iv-mtop">
                  <div className="rounded-md iv-notes">
                    <div className="mb-2 text-base font-bold uppercase">
                      Notes 
                    </div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>Lorem ipsum content here</span>
                     
                    </div>
                   
                  </div>
                </div>
                <div className="col-span-6 ">
                  <div className="rounded-md  iv-tot-cost  iv-mtop">
                    <div className="mb-2 text-base font-bold uppercase">
                      Total Order Cost
                    </div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>Sub Total Amount :</span>
                      <span className="font-bold">
                        ${props?.data?.totalAmount}
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>HST Percentage :</span>
                      <span className="font-bold">
                        ${props?.data?.gstPercentage}%
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>GST Amount :</span>
                      <span className="font-bold">
                        ${props?.data?.gstAmount}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-lg font-medium">
                      <span>Grand Total Amount :</span>
                      <span className="font-bold">
                        ${props?.data?.grandTotal}
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
});

function CustomOrderPrintLayoutSlip({
  data,
  isPrintEnabled,
  setPrintEnabled,
}: Props) {
  console.log('DATAAAAAAAA', data);

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
