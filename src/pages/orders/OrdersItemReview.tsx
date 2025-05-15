import React from 'react';

export default function OrdersItemReview() {
  return <div>OrdersItemReview</div>;
}

// import { AlertColor } from '@mui/material/Alert';
// import { useEffect, useState } from 'react';
// import Loader from '../../components/common/Loader';
// import {
//   useLazyOrderReviewItemsQuery,
//   useReviewItemMutation,
// } from '../../redux/features/orderStateSliceAPI';
// import { OrderReviewItem } from '../../types/order.types';
// import RatingCard from './RatingCard';

// type OrdersItemsReviewProps = {
//   setAlertSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
//   setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
//   setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function OrdersItemsReview({
//   setAlertSeverity,
//   setAlertMessage,
//   setShowAlert,
// }: OrdersItemsReviewProps) {
//   const [trigger, orderReviewItems] = useLazyOrderReviewItemsQuery();
//   const [reviewItem, reviewItemResponse] = useReviewItemMutation();
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);

//   useEffect(() => {
//     if (reviewItemResponse.data && reviewItemResponse.data.success) {
//       const params = {
//         page,
//         size,
//       };
//       trigger(params);
//     }
//   }, [reviewItemResponse]);

//   const handleSubmitReview = (
//     item: OrderReviewItem,
//     type: 'Completed' | 'Leave',
//     comment: string,
//     rating: number
//   ) => {
//     reviewItem({
//       appOrderItemId: item.id,
//       star: rating,
//       review: comment,
//       status: type,
//     });
//   };

//   useEffect(() => {
//     const params = {
//       page,
//       size,
//     };
//     trigger(params);
//   }, [page, size]);

//   const {
//     isLoading: isOrderReviewItemsLoading,
//     data: orderReviewItemsData,
//     error: orderReviewItemsError,
//   } = orderReviewItems;

//   useEffect(() => {
//     if (isOrderReviewItemsLoading) {
//       return;
//     }
//     if (orderReviewItemsError) {
//       setAlertSeverity('error');
//       setAlertMessage('Unknown Error Occurred');
//       setShowAlert(true);
//       return;
//     }
//     if (!orderReviewItemsData) {
//       return;
//     }
//     if (!orderReviewItemsData.success) {
//       setAlertSeverity('error');
//       setAlertMessage(orderReviewItemsData.message);
//       setShowAlert(true);
//     }
//   }, [orderReviewItems]);

//   if (isOrderReviewItemsLoading) {
//     return <Loader />;
//   }
//   if (!orderReviewItemsData) {
//     return <div>Error Occurred</div>;
//   }
//   if (!orderReviewItemsData.success) {
//     return <div>Error Occurred</div>;
//   }
//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//       {orderReviewItemsData.success &&
//         orderReviewItemsData.data.list.map((item) => (
//           <RatingCard
//             key={item.id}
//             data={item}
//             submitReview={handleSubmitReview}
//           />
//         ))}
//     </div>
//   );
// }

// export default OrdersItemsReview;
