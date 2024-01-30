import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionMenu from '../../components/common/ActionMenu';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppUser';
import PermissionPopup from '../../utils/PermissionPopup';
import { listingRolePermission } from '../../utils/helper';
import AppUserLoyaltyTab from './AppUserRewardHistoryTabs/AppUserLoyaltyTab';
import AppUserPromotionTab from './AppUserRewardHistoryTabs/AppUserPromotionTab';

function AppUserRewardHistory() {
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  // const navigate = useNavigate();
  const [list, setList] = useState<any>(null);
  // const [filteredWeekDays, setFilteredWeekDays] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  // const [total, setTotal] = useState(0);
  // const [list, setList] = useState<any>([]);
  // const [address, setAddress] = useState<string>('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this driver address ?'
  );
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [emptyVariable] = useState(null);

  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [selectedTab, setSelectedTab] = useState('PROMOTION HISTORY');

  const { userId } = useParams();

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const apiExecution = (service: any) => {
    service(userId, page, rowsPerPage)
      .then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: any) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    setList([]);
    setIsLoader(true);
    if (listingRolePermission(dataRole, 'Driver Address Detail')) {
      if (selectedTab === 'PROMOTION HISTORY') {
        apiExecution(Service.appUserVocuherHistoryList);
      } else {
        apiExecution(Service.appUserLoyaltyHistoryList);
      }
    } else {
      setIsLoader(false);
    }
  }, [emptyVariable, selectedTab]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Reward History" />
      <div className="container m-auto mt-5">
        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="promotion history" value="PROMOTION HISTORY" />
              <Tab label="loyalty history" value="LOYALTY HISTORY" />
            </Tabs>
            {selectedTab === 'PROMOTION HISTORY' && (
              <AppUserPromotionTab
                list={list}
                total={total}
                page={page}
                rowsPerPage={rowsPerPage}
                search={search}
                setSearch={setSearch}
                setList={setList}
                setPage={setPage}
                setTotal={setTotal}
                userId={userId}
                setRowsPerPage={setRowsPerPage}
              />
            )}
            {selectedTab === 'LOYALTY HISTORY' && (
              <AppUserLoyaltyTab
                list={list}
                total={total}
                page={page}
                rowsPerPage={rowsPerPage}
                search={search}
                setSearch={setSearch}
                setList={setList}
                setPage={setPage}
                setTotal={setTotal}
                setRowsPerPage={setRowsPerPage}
              />
              // <AppUserScheduleTabPage
              //   appUserId={userId}
              //   scheduleList={detail?.appDriverWorkingSchedule}
              //   filteredWeekdays={filteredWeekDays}
              // />
            )}
          </div>
        </div>
      </div>

      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={() => {}}
        />
      )}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={() => {}}
        />
      )}
    </>
  );
}

export default AppUserRewardHistory;
