import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import cn from '../../utils/class-names';
import { ORDER_STATUSES } from '../../utils/constants';

type Props = {
  id: string;
  type: any;
  date: Date;
  progress: number;
  item: Array<any>;
  appOrderNumber: 'string';
};

function TableRow({ id, appOrderNumber, type, date, progress, item }: Props) {
  console.log('progress', progress);
  return (
    <tr>
      <td>
        <div className="flex items-center gap-x-10">
          {[...ORDER_STATUSES.values()].map(
            (status, index) =>
              type === status.status && (
                <div
                  className={cn('relative inline-flex', status.color)}
                  key={index}
                >
                  <CircularProgress
                    thickness={2}
                    className="z-10"
                    variant="determinate"
                    classes={{
                      colorPrimary: cn('relative inline-flex', status.color),
                    }}
                    value={ORDER_STATUSES.get(type)?.progress}
                    // color={getColorFromCode(status.color)}
                  />
                  <CircularProgress
                    thickness={2}
                    className="absolute z-0 text-neutral-200"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center text-lg',
                      status.color
                    )}
                  >
                    <CheckCircleOutlineOutlinedIcon />
                  </div>
                </div>
              )
          )}
          <NavLink to={id} className="order-id">
            {appOrderNumber}
          </NavLink>
        </div>
      </td>
      <td>{dayjs(date).format('HH:mm , DD-MM-YYYY')}</td>
      <td>
        <div
          className={cn(
            'inline-flex min-h-8 min-w-32 items-center text-xs font-semibold',
            ORDER_STATUSES.get(type)?.color
          )}
        >
          {ORDER_STATUSES.get(type)?.title}
        </div>
      </td>
      <td>{item} Items</td>
      <td>
        <NavLink
          to={id}
          className="rounded-md bg-[#4283f4] px-4 py-2 text-white"
        >
          Track Order
        </NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
