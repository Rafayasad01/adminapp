import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAppSelector } from '../../redux/redux-hooks';

type CustomPrintLayoutsProps = {
  data: any;
  // onPrintTrigger?: any;
  isPrintEnabled?: any;
  setPrintEnabled?: any;
};

const CustomPrintLayouts = forwardRef<any, any>(
  (props: CustomPrintLayoutsProps, ref: any) => {
    // console.log("A1", props.dataId);
    const authState: any = useAppSelector((state: any) => state?.authState);
    const qrCodeValue = `Tracking Code: ${props?.data?.code} \n\nShop Name: ${authState?.user?.tenantName} \nShop Email: ${authState?.user?.username}`;

    // console.log('🚀 ~ data:', props);
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
            <div className="print-title">Your Appointment is Confirmed!</div>

            {props?.data?.services?.map((item: any, index: number) => {
              return (
                <div key={index} className="print-row rowss">
                  <div className="col-1">
                    <span className="">
                      <strong>appointment No.: {item.appointmentNumber}</strong>
                    </span>
                  </div>
                  <div className="col-2">
                    <div className="print-single-row print-date date-right">
                      {dayjs(item.appointmentTime).isValid()
                        ? dayjs(item.appointmentTime)?.format(
                            'YYYY-MM-DD hh:mm:ss'
                          )
                        : '--'}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="print-line" />
            <div className="print-single-row print-date">
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Time</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.data?.services?.map((el: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{el.storeServiceCategoryItem.name}</td>
                        <td>{el.storeServiceCategoryItem.serviceTime}</td>
                        <td>{el.storeServiceCategoryItem.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="print-line straight" />
            <div className="print-row">
              <div className="col-1">
                <span>Total</span>
              </div>
              <div className="col-2">
                <span>PKR {props?.data?.totalAmount}</span>
              </div>
            </div>
            <div className="print-row">
              <div className="col-1">
                <span>HST {props?.data?.gstPercentage}%</span>
              </div>
              <div className="col-2">
                <span>PKR {props?.data?.gstAmount}</span>
              </div>
            </div>

            <div className="print-line straight" />
            <div className="print-row">
              <div className="col-1">
                <span>Grand Total</span>
              </div>
              <div className="col-2">
                <span>PKR {props?.data?.grandTotalAmount}</span>
              </div>
            </div>
            <div className="print-line" />
            <div className="print-banker">
              <ul>
                <li>
                  <span>Client Name : {props?.data?.name}</span>
                </li>
                <li>
                  <span>Client Email : {props?.data?.email}</span>
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
  }
);

function CustomAppointmentLayoutCash({
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
    <div className="flex items-center text-sm">
      {isPrintEnabled ? <CustomPrintLayouts ref={ref} data={data} /> : null}
      <div onClick={trigger} className="printBtn">
        <PrintOutlinedIcon className="mx-1" />
        {/* <span className="mx-2"> Order Sl</span> */}
      </div>
    </div>
  );
}

export default CustomAppointmentLayoutCash;
