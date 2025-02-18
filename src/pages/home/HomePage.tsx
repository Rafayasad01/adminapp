/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import assets from '../../assets';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import {
  // fetchDashboardSummary,
  setNotifyState,
} from '../../redux/features/dashboardSlice';
import dashboard from '../../services/adminapp/adminDashboard';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { formatCurrency } from '../../utils/helper';
import AdminTopCustomerList from '../../components/common/Dashboard/AdminTopCustomerList';
import CustomText from '../../components/common/CustomText';

interface Project {
  id: string;
  name: string;
  startDate: string;
  address: string | null;
  budget: number | null;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  supervisorName: string;
  clientName: string;
  client: string;
  endDate: string;
  type: string;
  constructionType: string;
  totalPaid: number | null;
  dueAmount: number | null;
  demolitionDays: string | null;
  constructionDays: string | null;
  finishingDays: string | null;
  bankDetails: string | null;
  termsConditions: string | null;
}

interface Payment {
  totalPaid: number;
  totalPaidCurrentMonth: number;
}

interface ActivityResponse {
  totalClients: number;
  totalProjects: number;
  totalActiveProjects: number;
  topActiveProjects: Project[];
  nearToCompleteProjects: Project[];
  payment: Payment;
}

function HomePage() {
  const [data, setData] = useState<ActivityResponse>();
  const {
    notify: isNotify,
    notifyMessage,
    loading: isLoader,
  } = useAppSelector((state) => state?.dashboardState);
  const dispatch = useAppDispatch();

  const showNotification = (_value: boolean) => {
    dispatch(setNotifyState(isNotify));
  };

  useEffect(() => {
    dashboard
      .getDashboardActivity()
      .then((item: any) => {
        setData(item.data.data);
      })
      .catch((e) => {
        console.log('e', e);
      });
  }, []);

  console.log('data', data);

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
      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="mt-2 grid grid-cols-12 gap-3">
          <div className="col-span-4 flex h-[209.05px] flex-row justify-between rounded-3xl bg-white px-7 py-5 shadow-lg">
            <div>
              <span className="block font-open-sans text-[40px] font-semibold text-primary">
                {data?.totalClients || 0}
              </span>
              <span className="font-open-sans text-[18px] font-semibold text-primary opacity-50">
                Total Client’s
              </span>
            </div>
            <div>
              <img
                src={assets.images.newEarthDashboardIconOne}
                alt="icon-one"
              />
            </div>
          </div>
          <div className="col-span-4 flex h-[209.05px] flex-row justify-between rounded-3xl bg-white px-7 py-5 shadow-lg">
            <div>
              <span className="block font-open-sans text-[40px] font-semibold text-primary">
                {data?.totalProjects || 0}
              </span>
              <span className="font-open-sans text-[18px] font-semibold text-primary opacity-50">
                Total Projects
              </span>
            </div>
            <div>
              <img
                src={assets.images.newEarthDashboardIconTwo}
                alt="icon-one"
              />
            </div>
          </div>
          <div className="col-span-4 flex h-[209.05px] flex-row justify-between rounded-3xl bg-white px-7 py-5 shadow-lg">
            <div>
              <span className="block font-open-sans text-[40px] font-semibold text-primary">
                {data?.totalActiveProjects || 0}
              </span>
              <span className="font-open-sans text-[18px] font-semibold text-primary opacity-50">
                Active Projects
              </span>
            </div>
            <div>
              <img
                src={assets.images.newEarthDashboardIconThree}
                alt="icon-one"
              />
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-3">
          <div className="col-span-8">
            <div className="rounded-3xl bg-white px-5 py-6 shadow-lg">
              <span className="heading-color mb-8 flex font-open-sans text-[24px] font-semibold text-primary">
                Project Update
              </span>
              <AdminTopCustomerList data={data?.nearToCompleteProjects || []} />
            </div>
            <div className="relative mt-4 flex h-[250px] w-full justify-between overflow-hidden rounded-3xl bg-white px-5 py-5 shadow-md">
              <div
                className="absolute inset-0 left-[50%] flex h-[250px] w-[51%] justify-end overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url('${assets.images.newEarthDashboardPaymentBg}')`,
                }}
              />
              <div className="grid w-full grid-cols-12">
                <div className="col-span-6">
                  <span className="heading-color flex font-open-sans text-[24px] font-semibold text-primary">
                    Payments
                  </span>
                  <div className="mt-16 flex items-center gap-1">
                    <span className="break-all text-[14px] font-semibold capitalize leading-normal text-secondary">
                      Total Received
                    </span>
                  </div>
                  <div className="max-w-[200px] text-[40px] font-bold leading-normal text-[#EB5A00]">
                    {
                      formatCurrency(data?.payment?.totalPaid || 0).split(
                        '.'
                      )[0]
                    }
                    .
                    <span className="text-secondary opacity-[0.5]">
                      {
                        formatCurrency(data?.payment?.totalPaid || 0).split(
                          '.'
                        )[1]
                      }
                    </span>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex justify-end">
                    <img src={assets.images.linkArrow} alt="link-arrow" />
                  </div>
                  <div className="">
                    <div className="mt-10 flex items-center">
                      <span className="break-all text-[14px] font-semibold capitalize leading-normal text-secondary">
                        Reached This Month
                      </span>
                    </div>
                    <div className="flex items-center justify-start text-[40px] font-bold leading-normal text-[#EB5A00]">
                      {
                        formatCurrency(
                          data?.payment?.totalPaidCurrentMonth || 0
                        ).split('.')[0]
                      }
                      .
                      <span className="text-secondary opacity-[0.5]">
                        {
                          formatCurrency(
                            data?.payment?.totalPaidCurrentMonth || 0
                          ).split('.')[1]
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 rounded-3xl bg-white px-5 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="heading-color flex font-open-sans text-[24px] font-semibold text-primary">
                Active Projects
              </span>
              <img src={assets.images.linkArrow} alt="link-arrow" />
            </div>
            <div className="h-[480px] overflow-auto">
              {data?.topActiveProjects?.length ? (
                data?.topActiveProjects?.map((x, i) => {
                  return (
                    <div className="flex items-center justify-start" key={i}>
                      <img
                        className="mb-5"
                        src={assets.images.orangeDot}
                        alt="orange-dot"
                      />
                      <div className="mx-5 my-2">
                        <span className="heading-color block font-open-sans text-[18px] font-semibold text-primary">
                          {x.name}
                        </span>
                        <span className="font-open-sans text-[14px] font-semibold text-primary opacity-50">
                          {x.client}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-[450px] items-center justify-center">
                  <CustomText bg="bg-[#FFF3ED]" text="No Records Found" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
