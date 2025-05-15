import TableRow from './TableRow';

function OrdersTable({ orderListData }: Record<string, any>) {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date & Time</th>
          <th>Status</th>
          <th>Items</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orderListData?.data &&
          orderListData.data.orders.map((row: any) => (
            <TableRow
              key={row.id}
              id={row.id}
              appOrderNumber={row.appOrderNumber}
              type={row.status}
              date={row.createdDate}
              progress={row.progress}
              item={row.items}
            />
          ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
