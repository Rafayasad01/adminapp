import React, { useRef, Ref, forwardRef } from 'react';
import ReactToPrint from 'react-to-print';
import CustomButton from '../../common/CustomButton';
import AppointmentVisitDetailPage from '../../../pages/appointment/visit/AppointmentVisitDetailPage';

interface Props {
    // Define the props for MyPrintComponents if needed
}

const CustomPrintLayout = forwardRef<any, any>((Props, ref) => {
    return (
        <div ref={ref}>
            <div className="print-area">
                <div className="print-logo">
                    <img src="img/logo.png" width="150" height="25" alt="logo" />
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
                    <img src="img/barcode.png" alt="barcode" width="178" height="47" />
                </div>
            </div>
        </div>
        // <div ref={ref}>
        //   <div className="col-span-5 p-3">
        //     <div className="">
        //       <span className="font-open-sans text-xl font-bold text-[#252733]">
        //         Patient Information
        //       </span>
        //     </div>
        //     <div className="p-3">
        //       <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
        //         <div className="my-4">
        //           <span className="text-xl font-semibold uppercase">
        //             list?.name
        //           </span>
        //         </div>
        //         <div className="">
        //           <span className="badge badge-success">Active</span>
        //         </div>
        //       </div>
        //       <div className="">
        //         <p className="text-sm font-semibold">Appointment Number</p>
        //         <span className="text-sm">AHMED ALI</span>
        //       </div>
        //       <div className="my-2">
        //         <p className="text-sm font-semibold">Appointment Time</p>
        //         <span className="text-sm">2023-12-04</span>
        //       </div>
        //       <div className="my-2">
        //         <p className="text-sm font-semibold">Appointment Date</p>
        //         <span className="text-sm">2023-12-04</span>
        //       </div>
        //       <div className="my-2">
        //         <p className="text-sm font-semibold">Patient Contact Number</p>
        //         <span className="text-sm">342423432423</span>
        //       </div>
        //     </div>
        //   </div>
        // </div>
    );
});

function MyPrintComponent() {
    const ref = useRef<any>(null);

    return (
        <>
            <ReactToPrint
                bodyClass="print-agreement"
                content={() => ref.current}
                trigger={() => <button type="button">print</button>}
            />

            <CustomPrintLayout ref={ref} />
        </>
    );
}

export default CustomPrintLayout;
