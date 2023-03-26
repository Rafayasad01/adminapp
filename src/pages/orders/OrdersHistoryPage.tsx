import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import dayjs from 'dayjs';
import TableRow from './TableRow';

type Row = {
  id: string;
  type:
    | 'PLACE_ORDER'
    | 'ORDER_PICKED'
    | 'OUT_FOR_DELIVERY'
    | 'CANCELLED'
    | 'DROP_OFF'
    | 'DELIVERED';
  date: Date;
  progress: number;
  item: number;
};
const rows: Row[] = [
  {
    id: 'EZ-45857',
    type: 'PLACE_ORDER',
    date: dayjs().add(1, 'day').toDate(),
    progress: 10,
    item: 3,
  },
  {
    id: 'EZ-45858',
    type: 'ORDER_PICKED',
    date: dayjs().add(2, 'day').toDate(),
    progress: 20,
    item: 5,
  },
  {
    id: 'EZ-45859',
    type: 'OUT_FOR_DELIVERY',
    date: dayjs().add(3, 'day').toDate(),
    progress: 30,
    item: 1,
  },
  {
    id: 'EZ-45860',
    type: 'CANCELLED',
    date: dayjs().add(4, 'day').toDate(),
    progress: 40,
    item: 3,
  },
  {
    id: 'EZ-45861',
    type: 'PLACE_ORDER',
    date: dayjs().add(5, 'day').toDate(),
    progress: 50,
    item: 12,
  },
  {
    id: 'EZ-45862',
    type: 'ORDER_PICKED',
    date: dayjs().add(6, 'day').toDate(),
    progress: 60,
    item: 3,
  },
  {
    id: 'EZ-45863',
    type: 'DROP_OFF',
    date: dayjs().add(7, 'day').toDate(),
    progress: 70,
    item: 1,
  },
  {
    id: 'EZ-45864',
    type: 'DELIVERED',
    date: dayjs().add(8, 'day').toDate(),
    progress: 80,
    item: 3,
  },
  {
    id: 'EZ-45865',
    type: 'PLACE_ORDER',
    date: dayjs().add(9, 'day').toDate(),
    progress: 90,
    item: 8,
  },
  {
    id: 'EZ-45866',
    type: 'ORDER_PICKED',
    date: dayjs().add(10, 'day').toDate(),
    progress: 100,
    item: 3,
  },
  {
    id: 'EZ-45867',
    type: 'PLACE_ORDER',
    date: dayjs().add(11, 'day').toDate(),
    progress: 10,
    item: 3,
  },
];

function OrdersPage() {
  return (
    <div className="container px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="font-open-sans text-2xl font-semibold text-neutral-900">
          Order History
        </div>
        <FormControl className="w-96 rounded-xl bg-gray-50 shadow-md">
          <Input
            className="m-0 px-3 py-2 font-open-sans text-base font-semibold text-neutral-900"
            id="search"
            type="text"
            disableUnderline
            inputProps={{ placeholder: 'Search' }}
            endAdornment={<SearchOutlinedIcon />}
          />
        </FormControl>
      </div>
      <div className="my-4 rounded-xl bg-gray-50 px-4 py-4 shadow-md">
        <table className="w-full table-auto">
          <thead className="">
            <tr className="h-10">
              <th className="text-start font-open-sans text-base font-semibold text-neutral-900">
                Order ID
              </th>
              <th className="text-start font-open-sans text-base font-semibold text-neutral-900">
                Date & Time
              </th>
              <th className="text-center font-open-sans text-base font-semibold text-neutral-900">
                Status
              </th>
              <th className="text-end font-open-sans text-base font-semibold text-neutral-900">
                Items
              </th>
              <th className="text-end font-open-sans text-base font-semibold text-neutral-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                type={row.type}
                date={row.date}
                progress={row.progress}
                item={row.item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
