import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAppSelector } from '../../redux/redux-hooks';

type CustomPrintLayoutsProps = {
  isPrintEnabled?: any;
  setPrintEnabled?: any;
};

const CustomPrintLayouts = forwardRef<any, any>(
  (props: CustomPrintLayoutsProps, ref: any) => {
    const authState: any = useAppSelector((state: any) => state?.authState);
    const qrCodeValue = `${authState?.user?.tenant}`;

    return (
      <div style={{ display: 'none' }}>
        <div ref={ref}>
          <div className="print-qr iv-padding">
            <div className="print-barccode flex w-full items-center justify-center text-center">
              <QRCodeSVG level="M" size={365} value={qrCodeValue} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

function CustomQRPrintLayout({
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
      {isPrintEnabled ? <CustomPrintLayouts ref={ref} /> : null}
      <button onClick={trigger} className="printBtn">
        <PrintOutlinedIcon className="mx-[1px]" />
        <span className="mx-2">Download QR-Code</span>
      </button>
    </div>
  );
}

export default CustomQRPrintLayout;
