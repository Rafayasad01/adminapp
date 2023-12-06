import React, { useRef, Ref, forwardRef, useEffect, useState } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import CustomButton from '../../components/common/CustomButton';
import AppointmentVisitDetailPage from '../../pages/appointment/visit/AppointmentVisitDetailPage';
import assets from '../../assets';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import dayjs from 'dayjs';
import Service from '../../services/adminapp/adminAppointment';
import promiseHandler from '../helper';
import Barcode from 'react-barcode';
import { useAppSelector } from '../../redux/redux-hooks';

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
            const [res, err] = await promiseHandler(Service.VisitDetailById(props.dataId.id))
            if (!res) {
                console.log('err', err)
                return;
            }
            if (!res.data.success) {
                console.log('err', res.data.message)
            }
            setDetaiItems(res?.data.data)

            setTimeout(() => props.handlePrint(), 0)
        }
        fetchData();
    }, []);


    return (
        <div style={{ display: "none" }}>
            <div ref={ref}>
                <div className="print-area">
                    <div className="print-logo">
                        <img src={authState?.user?.tenantConfig?.logo} width="150" height="25" alt="logo" />
                    </div>
                    <div className="print-title">
                        Your Order is Confirmed!
                    </div>
                   
                    <div className="print-row rowss">
                        <div className="col-1">
                            <span className=''><strong>Order: ORD0000000133</strong></span>
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
                    <div className="print-line">
                    </div>
                    <div className="print-single-row print-date">
                        <table>
                            <tr>
                                <th>Items</th>
                                <th>Qty</th>
                                <th>Tax</th>
                                <th>Price</th>
                            </tr>
                            <tr>
                                <td>Jacket</td>
                                <td>02</td>
                                <td>90</td>
                                <td>122</td>
                            </tr>
                            <tr>
                                <td>Blue Jeans</td>
                                <td>01</td>
                                <td>50</td>
                                <td>101</td>
                            </tr>
                        </table>
                    </div>
                 
                    <div className="print-line straight">
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                Total
                            </span>
                        </div>
                        <div className="col-2">
                            <span>${detailItems?.subTotalAmount}</span>
                        </div>
                    </div>
                    {detailItems?.urgentFee > 0 &&
                        <div className='print-row'>
                            <div className="col-1">
                                <span>Urgent Fee</span>
                            </div>
                            <div className="col-2">
                                <span>${detailItems?.urgentFee}</span>
                            </div>
                        </div>
                    }
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                HST {detailItems?.gstPercentage} %
                            </span>
                        </div>
                        <div className="col-2">
                            <span>${detailItems?.gstAmount}</span>
                        </div>
                    </div>

                    <div className="print-line straight">
                    </div>
                    <div className="print-row">
                        <div className="col-1">
                            <span>
                                Grand Total
                            </span>
                        </div>
                        <div className="col-2">
                            <span>${detailItems?.grandTotal}</span>
                        </div>
                    </div>
                    <div className="print-line">
                    </div>
                    <div className="print-banker">
                        <ul>
                            {/* <li><span>Bank Name: HBL</span></li>
                            <li><span>Account Number:000***********</span></li> */}
                            <li><span>Client : {detailItems?.appointmentProvider?.name}</span></li>
                            <li><span>xxxxxxxxxxxxxxxxx</span></li>
                        </ul>

                    </div>

                    <div className="print-quote">
                        Thank you
                    </div>
                    <div className="print-barccode flex justify-center items-center text-center w-full">
                        <Barcode value={"51102589"} textAlign="center" height={40} />
                        {/* <img src={assets.images.logoBlack} alt="barcode" width="178" height="47" /> */}
                        {/* <img src="img/barcode.png" alt="barcode" width="178" height="47" /> */}
                    </div>

                </div>
            </div>
        </div>

    );
});

function CustomOrderPrintLayoutCash({ index, data, isPrintEnabled, setPrintEnabled }: Props) {
    console.log("datata==>", data);
    const ref = useRef<any>(null);
    const handlePrint = useReactToPrint({
        content: () => ref.current,
        onAfterPrint: () => setPrintEnabled((prev: any) => {
            const previous = [...prev];

            previous[index] = false
            return previous;
        })
    })
    console.log("prev", isPrintEnabled[index]);
    const trigger = () => {
        setPrintEnabled((prev: any) => {
            const previous = [...prev];
            previous[index] = true
            return previous;
        })
    }
    console.log("A2", index);

    // if (isPrintEnabled[index]) {
    //     return <CustomPrintLayouts ref={ref} dataItem={data} />
    // }

    return (
        <>
            {
                isPrintEnabled[index] ? <CustomPrintLayouts handlePrint={handlePrint} ref={ref} dataId={data} /> : null
            }
            <button onClick={trigger}
                className='printBtn'><PrintOutlinedIcon /></button >
        </>
    );
}

export default CustomOrderPrintLayoutCash;
