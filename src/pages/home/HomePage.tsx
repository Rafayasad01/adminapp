/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminDashboardRevenueLineChart from '../../components/common/Dashboard/AdminDashboardRevenueLineChart';
import AdminDashboardTopServices from '../../components/common/Dashboard/AdminDashboardTopServices';
import AdminTopCustomerList from '../../components/common/Dashboard/AdminTopCustomerList';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import {
  fetchDashboardSummary,
  setNotifyState,
} from '../../redux/features/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import AppointmentsStatistics from './AppointmentsStatistics';

function HomePage() {
  const authState = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const {
    todayAppointments,
    totalAppointments,
    notify: isNotify,
    notifyMessage,
    loading: isLoader,
  } = useAppSelector((state) => state?.dashboardState);
  const dispatch = useAppDispatch();
  // const data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const showNotification = (_value: boolean) => {
    dispatch(setNotifyState(isNotify));
  };

  useEffect(() => {
    dispatch(fetchDashboardSummary(authState.user?.tenant || ''));
  }, []);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={showNotification}
        displayMessage={notifyMessage}
      />
      <TopBar title="Dashboard" />
      <div className="container m-auto mt-3">
        <div className="mt-2 grid flex-1 grid-cols-4 gap-3">
          <div
            onClick={() =>
              navigate(
                '/admin/dashboard/store-appointment/appointments/today/list'
              )
            }
          >
            <div className="flex h-24 flex-row justify-between rounded-3xl bg-white px-3 shadow-lg">
              <div className="... flex w-44 flex-col justify-evenly pl-3 text-left">
                <h2 className="heading-color font-open-sans text-2xl font-semibold">
                  {todayAppointments || '0'}
                </h2>
                <span className="text-color font-open-sans text-xs">
                  Today&apos;s Appointments
                </span>
              </div>
              <div className="flex w-20 flex-col items-center justify-around">
                <IconButton className="bg-primary p-3 hover:bg-primary ">
                  <TextSnippetIcon className=" text-white" />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              navigate('/admin/dashboard/store-appointment/appointments/list')
            }
          >
            <div className="flex h-24 flex-row justify-between rounded-3xl bg-white px-3 shadow-lg">
              <div className="flex w-44 flex-col justify-evenly pl-3  text-left">
                <h2 className="heading-color font-open-sans text-2xl font-semibold">
                  {totalAppointments || '0'}
                </h2>
                <span className="text-color font-open-sans text-xs">
                  Total appointment
                </span>
              </div>
              <div className="flex w-20 flex-col items-center justify-around">
                <IconButton className="bg-primary p-3">
                  <CalendarMonthIcon className=" text-white" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 ">
          <div className="flex flex-col rounded-3xl bg-white px-3 py-5 shadow-lg">
            <div className="flex justify-between px-3">
              <span className="heading-color flex font-open-sans text-xl font-semibold text-primary">
                Total Sales
              </span>
            </div>
            <div className="mt-6 flex px-3">
              {/* <TotalSaleChart /> */}
              <AdminDashboardRevenueLineChart />
            </div>
            <div className="mt-3 flex justify-center gap-4">
              <div className="flex items-center">
                <span className="mx-2 inline-block h-[20px] w-[20px] rounded bg-[#C367F1]" />
                Canceled
              </div>

              <div className="flex items-center">
                <span className="mx-2 inline-block h-[20px] w-[20px] rounded bg-[#4283F4]" />
                Missed
              </div>
              <div className="flex items-center">
                <span className="mx-2 inline-block h-[20px] w-[20px] rounded bg-[#29CC97]" />
                Completed
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-white px-3 py-5 shadow-lg">
            <div className="">
              <AppointmentsStatistics />
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-12 gap-3">
          <div className="col-span-8 rounded-3xl bg-white p-5 px-3 py-5 shadow-lg">
            <div className="flex justify-between">
              <span className="heading-color flex font-open-sans text-xl font-semibold text-primary">
                Customer Data
              </span>
            </div>
            <AdminTopCustomerList />
          </div>

          <div className="col-span-4 rounded-3xl bg-white p-5 px-3 py-5 shadow-lg ">
            <AdminDashboardTopServices />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
