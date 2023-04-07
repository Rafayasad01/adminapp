/* eslint-disable import/order */
import TopBar from '../../components/common/TopBar';
import { Outlet } from 'react-router-dom';

function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" />
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
}

export default SettingsPage;
