/* eslint-disable import/order */
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';

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
