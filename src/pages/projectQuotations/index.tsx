import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import { ALL_PERMISSIONS } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import QuotationPage from './quotationSlips/QuotationSlipPage';
import TotalPaidPage from './totalPaidSlips/TotalPaidSlipPage';
import MaterailLaborPage from './materialAndLaborSlips/MaterailLaborSlipPage';

function ProjectQuotationsPage() {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [selectedTab, setSelectedTab] = useState('QUOTATIONS');

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.quotations.view)) {
      setSelectedTab('QUOTATIONS');
      return;
    }
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.quotations.view)) {
      setSelectedTab('TOTAL_PAID');
      return;
    }
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.quotations.view)) {
      setSelectedTab('MATERIAL_LABOR_PAID');
    }
  }, []);
  return (
    <>
      <TopBar title="Quotations" />
      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Project Quotations and Payments
              </span>
            </div>
          </div>
          <div>
            <Tabs
              className={`${
                listingRolePermission(dataRole, ALL_PERMISSIONS.quotations.view)
                  ? 'inline-block'
                  : 'hidden'
              } `}
              value={selectedTab}
              onChange={handleTabChange}
            >
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.quotations.view
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.quotations.view
                  )}
                  label="Project Quotations"
                  value="QUOTATIONS"
                />
              )}
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.quotations.view
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.quotations.view
                  )}
                  label="Billing"
                  value="TOTAL_PAID"
                />
              )}
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.quotations.view
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.quotations.view
                  )}
                  label="Payment"
                  value="MATERIAL_LABOR_PAID"
                />
              )}
            </Tabs>
            {selectedTab === 'QUOTATIONS' && <QuotationPage />}
            {selectedTab === 'TOTAL_PAID' && <TotalPaidPage />}
            {selectedTab === 'MATERIAL_LABOR_PAID' && <MaterailLaborPage />}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectQuotationsPage;
