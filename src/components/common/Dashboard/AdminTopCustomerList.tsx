import dayjs from 'dayjs';
import { useAppSelector } from '../../../redux/redux-hooks';

const AdminTopCustomerList = () => {
  const { customers } = useAppSelector((state) => state.dashboardState);
  return (
    <table>
      <thead>
        <tr>
          <th className="font-bold">Customer name</th>
          <th className="font-bold">Date in</th>
          <th className="font-bold">Service</th>
          <th className="font-bold">Status</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((x, index) => (
          <tr key={index}>
            <td className="font-bold capitalize text-primary">{x.name}</td>
            <td>{dayjs(x.dateIn).format('MMM D, YYYY')}</td>
            <td>{x.service}</td>
            <td
              className={
                x.status.toLocaleLowerCase() !== 'cancelled'
                  ? 'text-primary'
                  : ''
              }
            >
              {x.status.toLocaleUpperCase()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTopCustomerList;
