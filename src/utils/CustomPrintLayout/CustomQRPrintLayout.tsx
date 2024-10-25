import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { getItem } from '../storage';

type CustomPrintLayoutsProps = {
  isPrintEnabled?: any;
  setPrintEnabled?: any;
};

const CustomPrintLayouts = forwardRef<any, any>(
  (props: CustomPrintLayoutsProps, ref: any) => {
    const branchId: any = getItem('BRANCH_DATA');
    const qrCodeValue = `${branchId?.id}`;

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
