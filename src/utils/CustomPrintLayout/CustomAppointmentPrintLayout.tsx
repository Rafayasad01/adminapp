import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppointment';
import promiseHandler from '../helper';

interface Props {
  index: any;
  data: any;
  onPrintTrigger?: any;
  isPrintEnabled?: any;
  setPrintEnabled?: any;
}

const CustomPrintLayouts = forwardRef<any, any>((props: any, ref: any) => {
  // console.log("A1", props.dataId);
  const [detailItems, setDetaiItems] = useState<any>();
  const authState: any = useAppSelector((state: any) => state?.authState);
  useEffect(() => {
    const fetchData = async () => {
      const [res] = await promiseHandler(
        Service.VisitDetailById(props.dataId.id)
      );
      if (!res) {
        // console.log('err', err);
        return;
      }
      if (!res.data.success) {
        // console.log('err', res.data.message);
      }
      setDetaiItems(res?.data.data);
      setTimeout(() => props.handlePrint(), 0);
    };
    fetchData();
  }, []);

  const qrCodeValue = `Tracking Id: ${detailItems?.id} \n\nShop Name: ${authState?.user?.tenantName} \nShop Email: ${authState?.user?.username}`;

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
          <div className="print-row rowss">
            <div className="col-1">
              <span className="">
                <strong>Slip#: aaa0000000133</strong>
              </span>
            </div>
            <div className="col-2">
              <div className="print-single-row print-date date-right">
                {dayjs(detailItems?.createdDate).isValid()
                  ? dayjs(detailItems?.createdDate)?.format(
                      'YYYY-MM-DD hh:mm:ss'
                    )
                  : '--'}
              </div>
            </div>
          </div>
          <div className="print-line" />
          <div className="print-single-row">
            <div className="">
              <span>
                <strong>Appointee : {detailItems?.name}</strong>
              </span>
              <br />
            </div>
          </div>
          <div className="print-row rowss">
            <div className="col-1">
              <span className="">
                <strong>Services</strong>
              </span>
            </div>
            <div className="col-2">
              <span className="">
                <strong>Fees</strong>
              </span>
            </div>
          </div>
          <div className="print-row">
            <div className="col-1">
              <span>
                {detailItems?.appointmentService?.map(
                  (item: any, index: number) => {
                    return <span key={index}>{item.name}</span>;
                  }
                )}
              </span>
            </div>
            <div className="col-2">
              <span>
                {detailItems?.appointmentService?.map(
                  (item: any, index: number) => {
                    return <span key={index}> ${item.fees}</span>;
                  }
                )}
              </span>
            </div>
          </div>
          <div className="print-line straight" />
          {detailItems?.urgentFee > 0 && (
            <>
              <div className="print-row">
                <div className="col-1">
                  <span>Sub Total</span>
                </div>
                <div className="col-2">
                  <span>${detailItems?.subTotalAmount}</span>
                </div>
              </div>
              <div className="print-row">
                <div className="col-1">
                  <span>Urgent Fee</span>
                </div>
                <div className="col-2">
                  <span>${detailItems?.urgentFee}</span>
                </div>
              </div>
            </>
          )}
          <div className="print-row">
            <div className="col-1">
              <span>Total</span>
            </div>
            <div className="col-2">
              <span>${detailItems?.totalAmount}</span>
            </div>
          </div>
          <div className="print-row">
            <div className="col-1">
              <span>HST {detailItems?.gstPercentage}%</span>
            </div>
            <div className="col-2">
              <span>${detailItems?.gstAmount}</span>
            </div>
          </div>
          <div className="print-line straight" />
          <div className="print-row">
            <div className="col-1">
              <span>Grand Total</span>
            </div>
            <div className="col-2">
              <span>${detailItems?.grandTotal}</span>
            </div>
          </div>
          <div className="print-line" />
          <div className="print-banker">
            <ul>
              {/* <li><span>Bank Name: HBL</span></li>
                            <li><span>Account Number:000***********</span></li> */}
              <li>
                <span>Client : {detailItems?.appointmentProvider?.name}</span>
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

function CustomPrintLayout({
  index,
  data,
  isPrintEnabled,
  setPrintEnabled,
}: Props) {
  // console.log('datata==>', data);
  const ref = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () =>
      setPrintEnabled((prev: any) => {
        const previous = [...prev];

        previous[index] = false;
        return previous;
      }),
  });
  // console.log('prev', isPrintEnabled[index]);
  const trigger = () => {
    setPrintEnabled((prev: any) => {
      const previous = [...prev];
      previous[index] = true;
      return previous;
    });
  };
  // console.log('A2', index);

  // if (isPrintEnabled[index]) {
  //     return <CustomPrintLayouts ref={ref} dataItem={data} />
  // }

  return (
    <>
      {isPrintEnabled[index] ? (
        <CustomPrintLayouts handlePrint={handlePrint} ref={ref} dataId={data} />
      ) : null}
      <button onClick={trigger} className="printBtn">
        <PrintOutlinedIcon />
      </button>
    </>
  );
}

export default CustomPrintLayout;
