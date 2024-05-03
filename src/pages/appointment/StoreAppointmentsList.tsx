import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Divider,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import TopBar from '../../components/common/TopBar';
import { fetchAppointments } from '../../redux/features/AppointmentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

type QueryParams = {
  tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  status?: string | null;
};

const StoreAppointmentsList = ({ today = false }) => {
  const [startDate, setStartDate] = useState<string | null>(
    today
      ? dayjs().format('YYYY-MM-DD')
      : dayjs().startOf('month').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string | null>(
    dayjs().format('YYYY-MM-DD')
  );
  const {
    appointments,
    total_count: total,
    loading,
  } = useAppSelector((s) => s.appointmentState);
  const { user } = useAppSelector((s) => s.authState);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('All');

  const fetchAppointmentsData = () => {
    const formattedStartDate = startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : null;
    const formattedEndDate = endDate
      ? dayjs(endDate).format('YYYY-MM-DD')
      : null;

    const queryParams: QueryParams = {
      tenant: user?.tenant,
      page,
      size: rowsPerPage,
      search,
      status,
    };
    if (formattedStartDate) {
      queryParams.startDate = formattedStartDate;
    }
    if (formattedEndDate) {
      queryParams.endDate = formattedEndDate;
    }
    if (status === 'All') {
      delete queryParams.status;
    }

    dispatch(fetchAppointments(queryParams));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, [page, rowsPerPage]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <TopBar isNestedRoute title="Appointments" />
      <div className="cs-dialog container mx-auto mt-5 w-full rounded-lg bg-white px-4 py-5 shadow-lg">
        <div className="grid grid-cols-12">
          <div className="flex items-center md:col-span-12 md:mb-8 lg:col-span-4 lg:mb-0">
            <span className="font-open-sans text-xl font-semibold text-[#252733]">
              {today ? "Today's" : 'Total'} Appointments
            </span>
          </div>
          <div className="flex justify-end gap-3 md:col-span-12 lg:col-span-8 ">
            <TextField
              label="Start Date"
              className={`${today ? 'hidden ' : 'en-date'}`}
              sx={{ padding: 0 }}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              className={`${today ? 'hidden' : 'en-date'}`}
              sx={{ padding: 0 }}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className="en-search"
              label="Search"
              value={search}
              variant="outlined"
              sx={{ padding: 0 }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={status}
              className="h-[48px] w-[150px]"
              onChange={(e) => setStatus(e.target.value as string)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Incomplete">Incomplete</MenuItem>
            </Select>
            <Button
              variant="contained"
              className="btn-black-fill btn-icon"
              onClick={() => fetchAppointmentsData()}
            >
              <SearchIcon />
              {/* Search Appointments */}
            </Button>
          </div>
        </div>
        <Divider className="mt-4" />
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <table>
              <thead>
                <tr>
                  <th className="font-bold">Name</th>
                  <th className="font-bold">Email</th>
                  <th className="font-bold">Service</th>
                  <th className="font-bold">Phone</th>
                  <th className="font-bold">Time</th>
                  <th className="font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.map((x) => (
                  <tr key={x.id}>
                    <td className="font-bold capitalize text-primary">
                      {x.name}
                    </td>
                    <td>{x.email}</td>
                    <td>{x.service}</td>
                    <td>{x.phone}</td>
                    <td className="font-bold">
                      {dayjs(x.appointmentTime).format('MMM D, YYYY hh:mm A')}
                    </td>
                    <td>{x.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {appointments?.length < 1 ? (
              <CustomText noRoundedBorders text="No Records Found" />
            ) : null}
            <div className="mt-3 flex w-[100%] justify-center py-3">
              <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(StoreAppointmentsList);
