// import React, { useRef, Ref, forwardRef } from 'react';
// import ReactToPrint from 'react-to-print';
// import CustomButton from '../../../components/common/CustomButton';
// import AppointmentVisitDetailPage from './AppointmentVisitDetailPage';

// // interface Props {
// //   // Define the props for MyPrintComponents if needed
// // }

// const MyPrintCompon
// ents = forwardRef<any, any>((props, ref) => {
//   return (
//     <p>print</p>
//     // <div ref={ref}>
//     //   <div className="col-span-5 p-3">
//     //     <div className="">
//     //       <span className="font-open-sans text-xl font-bold text-[#252733]">
//     //         Patient Information
//     //       </span>
//     //     </div>
//     //     <div className="p-3">
//     //       <div className="flex w-[100%] items-center justify-between 2xl:w-[60%]">
//     //         <div className="my-4">
//     //           <span className="text-xl font-semibold uppercase">
//     //             list?.name
//     //           </span>
//     //         </div>
//     //         <div className="">
//     //           <span className="badge badge-success">Active</span>
//     //         </div>
//     //       </div>
//     //       <div className="">
//     //         <p className="text-sm font-semibold">Appointment Number</p>
//     //         <span className="text-sm">AHMED ALI</span>
//     //       </div>
//     //       <div className="my-2">
//     //         <p className="text-sm font-semibold">Appointment Time</p>
//     //         <span className="text-sm">2023-12-04</span>
//     //       </div>
//     //       <div className="my-2">
//     //         <p className="text-sm font-semibold">Appointment Date</p>
//     //         <span className="text-sm">2023-12-04</span>
//     //       </div>
//     //       <div className="my-2">
//     //         <p className="text-sm font-semibold">Patient Contact Number</p>
//     //         <span className="text-sm">342423432423</span>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// });

// function MyPrintComponent() {
//   const ref = useRef<any>(null);

//   return (
//     <>
//       <ReactToPrint
//         bodyClass="print-agreement"
//         content={() => ref.current}
//         trigger={() => <button type="button">print</button>}
//       />

//       <MyPrintComponents ref={ref} />
//     </>
//   );
// }

// export default MyPrintComponent;
function Print() {
  return <p>print</p>;
}

export default Print;
