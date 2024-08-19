import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ActionMenu from '../../components/common/ActionMenu';
// import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
// import { useAppSelector } from '../../redux/redux-hooks';
// import appUserService from '../../services/adminapp/adminAppUser';
// import PermissionPopup from '../../utils/PermissionPopup';
// import { listingRolePermission } from '../../utils/helper';
// import { ALL_PERMISSIONS } from '../../utils/constants';
import SummaryPage from './summary/SummaryPage';
import SalaryPage from './salary/SalaryPage';
import UtilityPage from './utility/UtilityPage';
import MaintenancePage from './maintenance/MaintenancePage';

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
      <TopBar isNestedRoute title="Expenses" />
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
