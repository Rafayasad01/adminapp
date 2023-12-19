import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAppSelector } from '../../redux/redux-hooks';

interface Props {
  data: any;
  onPrintTrigger?: any;
  isPrintEnabled?: any;
  setPrintEnabled?: any;
}

const CustomPrintLayouts = forwardRef<any, any>((props: any, ref: any) => {
  // console.log("A1", props.dataId);
  const authState: any = useAppSelector((state: any) => state?.authState);
  const qrCodeValue = `Tracking Id: ${props?.data?.id} \n\nShop Name: ${authState?.user?.tenantName} \nShop Email: ${authState?.user?.username}`;

  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>
        <div className="print-area">
          <div className="print-logo">
            <img
              src={authState?.user?.tenantConfig?.logo}
              width="150"
              height="25"
              alt="logo"
            />
          </div>
          <div className="print-title">Your Order is Confirmed!</div>

          <div className="print-row rowss">
            <div className="col-1">
              <span className="">
                <strong>Order: {props?.data?.orderNumber}</strong>
              </span>
            </div>
            <div className="col-2">
              <div className="print-single-row print-date date-right">
                {dayjs(props?.data?.createdDate).isValid()
                  ? dayjs(props?.data?.createdDate)?.format(
                      'YYYY-MM-DD hh:mm:ss'
                    )
                  : '--'}
              </div>
            </div>
          </div>
          <div className="print-line" />
          <div className="print-single-row print-date">
            <table>
              <tr>
                <th>Items</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              {props?.data?.orderItems?.map((el: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{el.name}</td>
                    <td>{el.quantity}</td>
                    <td>{el.unitPrice}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="print-line straight" />
          <div className="print-row">
            <div className="col-1">
              <span>Total</span>
            </div>
            <div className="col-2">
              <span>${props?.data?.totalAmount}</span>
            </div>
          </div>
          <div className="print-row">
            <div className="col-1">
              <span>HST {props?.data?.gstPercentage}%</span>
            </div>
            <div className="col-2">
              <span>${props?.data?.gstAmount}</span>
            </div>
          </div>

          <div className="print-line straight" />
          <div className="print-row">
            <div className="col-1">
              <span>Grand Total</span>
            </div>
            <div className="col-2">
              <span>${props?.data?.grandTotal}</span>
            </div>
          </div>
          <div className="print-line" />
          <div className="print-banker">
            <ul>
              <li>
                <span>
                  Client Name : {props?.data?.user?.firstName}
                  {props?.data?.user?.lastName}
                </span>
              </li>
              <li>
                <span>Client Email : {props?.data?.user?.email}</span>
              </li>
              <li>
                <span>xxxxxxxxxxxxxxxxx</span>
              </li>
            </ul>
          </div>

          <div className="print-quote">Thank you</div>
          <div className="print-barccode flex w-full items-center justify-center text-center">
            <QRCodeSVG level="M" size={55} value={qrCodeValue} />
          </div>
        </div>
      </div>
    </div>
  );
});

function CustomOrderPrintLayoutCash({
  data,
  isPrintEnabled,
  setPrintEnabled,
}: Props) {
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
    <div className="flex items-center text-sm">
      {isPrintEnabled ? <CustomPrintLayouts ref={ref} data={data} /> : null}
      <button onClick={trigger} className="printBtn">
        <PrintOutlinedIcon className="mx-1" />
        <span className="mx-2"> Order Slip</span>
      </button>
    </div>
  );
}

export default CustomOrderPrintLayoutCash;
