import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import EquipmentPurchasePage from './equipmentPurchase/EquipmentPurchasePage';
import MaintenancePage from './maintenance/MaintenancePage';
import OtherPage from './other/OtherPage';
import SalaryPage from './salary/SalaryPage';
import SummaryPage from './summary/SummaryPage';
import UtilityPage from './utility/UtilityPage';

function Expense() {
  //   const dataRole = useAppSelector(
  //     (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  //   );
  const [isNotify, setIsNotify] = React.useState(false);
  const [
    notifyMessage,
    // setNotifyMessage
  ] = React.useState({});
  const [selectedTab, setSelectedTab] = useState('SUMMARY');

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Expense" />
      <div className="container m-auto mt-5">
        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Summary" value="SUMMARY" />
              <Tab label="Salary" value="SALARY" />
              <Tab label="Utility" value="UTILITY" />
              <Tab label="Maintenance" value="MAINTENANCE" />
              <Tab label="Equipment Purchase" value="EQUIPMENT PURCHASE" />
              <Tab label="Other" value="OTHER" />
            </Tabs>
            {selectedTab === 'SUMMARY' && <SummaryPage />}
            {selectedTab === 'SALARY' && <SalaryPage />}
            {selectedTab === 'UTILITY' && <UtilityPage />}
            {selectedTab === 'MAINTENANCE' && <MaintenancePage />}
            {selectedTab === 'EQUIPMENT PURCHASE' && <EquipmentPurchasePage />}
            {selectedTab === 'OTHER' && <OtherPage />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
