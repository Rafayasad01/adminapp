/* eslint-disable import/order */
import { Outlet } from 'react-router-dom';
// import TopBar from '../../components/common/TopBar';
import TopBar from '../../components/common/Md-Alder/TopBar';

function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" />
      <div className="container mt-5 bg-primary p-3">
        <Outlet />
      </div>
    </>
  );
}

export default SettingsPage;
