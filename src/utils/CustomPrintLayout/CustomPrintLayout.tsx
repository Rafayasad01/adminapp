import React, { useRef, Ref, forwardRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import CustomButton from '../../components/common/CustomButton';
import AppointmentVisitDetailPage from '../../pages/appointment/visit/AppointmentVisitDetailPage';
import assets from '../../assets';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

interface Props {
    data: any;
    onPrintTrigger?: any;
    isPrintEnabled?: boolean;
    setPrintEnabled?: any;
}

const CustomPrintLayouts = forwardRef<any, any>((Props, ref) => {
    console.log("A1");
    return (
        <div style={{ display: "none" }}>
            <div ref={ref}>
                <div className="print-area">
                    <div className="print-logo">
                        <img src={assets.images.logoBlack} width="150" height="25" alt="logo" />
                    </div>
                    <div className="print-title">
                        Your Appointment is Confirmed!
                    </div>
                    <div className="print-line">
                    </div>
                    <div className="print-date">
                        16 May, 2023 at 2:00PM
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                <strong>Doctor</strong>
                            </span>
                        </div>
                        <div className="col-2">
                            <span> <strong>Visit fee</strong></span>
                        </div>
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <label>
                                David Jackman
                            </label>
                            <span>
                                <strong>(Cardiologist)</strong>
                            </span>
                        </div>
                        <div className="col-2">
                            <span>1500.0</span>
                        </div>
                    </div>
                    <div className="text-area">
                        <textarea placeholder="note to Doctor">
                        </textarea>
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                <strong>Tax</strong>
                            </span>
                        </div>
                        <div className="col-2">
                            <span> 500.0</span>
                        </div>
                    </div>
                    <div className="print-line straight">
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                <strong>Total Amount</strong>
                            </span>
                        </div>
                        <div className="col-2">
                            <span>2000.0</span>
                        </div>
                    </div>
                    <div className="print-line">
                    </div>
                    <div className="print-banker">
                        <ul>
                            <li><span>Bank Name: HBL</span></li>
                            <li><span>Account Number:000***********</span></li>
                            <li><span>Client: Eden Adams</span><label>Age:57</label></li>
                            <li><span>xxxxxxxxxxxxxxxxx</span></li>
                        </ul>

                    </div>

                    <div className="print-quote">
                        Thank you
                    </div>
                    <div className="print-barccode">
                        <img src={assets.images.logoBlack} alt="barcode" width="178" height="47" />
                        {/* <img src="img/barcode.png" alt="barcode" width="178" height="47" /> */}
                    </div>
                </div>
            </div>
        </div>

    );
});

function CustomPrintLayout({ data, isPrintEnabled, setPrintEnabled }: Props) {
    const ref = useRef<any>(null);
    const handlePrint = useReactToPrint({
        content: () =>
            ref.current
    })
    const trigger = () => {
        setPrintEnabled(true)
        setTimeout(() => { handlePrint() }, 0)
    }
    console.log("A2");

    console.log('isPrintEnabled', isPrintEnabled)
    return (
        <>
            {
                isPrintEnabled ? <CustomPrintLayouts ref={ref} /> : null
            }
            <button onClick={trigger}
                className='printBtn'><PrintOutlinedIcon /></button >
        </>
    );
}

export default CustomPrintLayout;
