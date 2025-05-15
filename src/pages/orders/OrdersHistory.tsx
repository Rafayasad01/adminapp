import React from 'react';

export default function OrdersHistory() {
  return <div>OrdersHistory</div>;
}

// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { AlertColor } from '@mui/material/Alert';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
// import TablePagination from '@mui/material/TablePagination';
// import debounce from '@mui/material/utils/debounce';
// import { useEffect, useState } from 'react';
// import Loader from '../../components/common/Loader';
// import { useLazyOrderListQuery } from '../../redux/features/orderStateSliceAPI';
// import { setItem } from '../../utils/local-storage';
// import OrdersTable from './OrdersHistoryTable';

// type OrdersHistoryProps = {
//   setAlertSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
//   setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
//   setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function OrdersHistory({
//   setAlertSeverity,
//   setAlertMessage,
//   setShowAlert,
// }: OrdersHistoryProps) {
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [offset, setOffset] = useState(0);
//   const [page, setPage] = useState(0);

//   const [trigger, orderList] = useLazyOrderListQuery();

//   const {
//     isLoading: isOrderListLoading,
//     error: orderListError,
//     data: orderListData,
//   } = orderList;

//   useEffect(() => {
//     const queryParams = {
//       search,
//       limit,
//       offset,
//     };
//     trigger(queryParams);
//   }, [search, limit, offset]);

//   useEffect(() => {
//     if (isOrderListLoading) {
//       return;
//     }
//     if (!orderListData) {
//       return;
//     }
//     if (!orderListData.success) {
//       setAlertSeverity('error');
//       setAlertMessage(orderListData.message);
//       setShowAlert(true);
//       return;
//     }
//     setItem('ORDER_ITEM', orderListData.data);
//   }, [orderList]);

//   if (orderList.status === 'uninitialized') {
//     return <div> </div>;
//   }

//   const onSearchChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => {
//     setPage(0);
//     setSearch(event.target.value);
//   };

//   const searchDelayed = debounce(onSearchChange, 250);

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
//     pageNumber: number
//   ) => {
//     setPage(pageNumber);
//     setOffset(() => pageNumber * limit);
//   };
//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setPage(0);
//     setLimit(Number(event.target.value));
//   };
//   return isOrderListLoading ? (
//     <Loader />
//   ) : (
//     <>
//       <div className="mb-3 items-center justify-between sm:flex">
//         <h4 className="page-heading">Order History</h4>
//         <FormControl className="search-orders">
//           <Input
//             className="field"
//             id="search"
//             type="text"
//             disableUnderline
//             defaultValue={search}
//             onChange={searchDelayed}
//             inputProps={{ placeholder: 'Search' }}
//             endAdornment={<SearchOutlinedIcon />}
//           />
//         </FormControl>
//       </div>
//       <div className="orders-card">
//         {orderListData?.data ? (
//           <OrdersTable orderListData={orderListData} />
//         ) : null}
//         <div>
//           {orderListData?.data ? (
//             <TablePagination
//               component="div"
//               count={orderListData.data.totalResults ?? 0}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={orderListData.data.perPage ?? 0}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrdersHistory;
