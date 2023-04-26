import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../../super-admin/common/SuperAdminSidebar';

function SuperAdminMainLayout() {
  return (
    <div className="flex">
      <nav className="w-64 flex-shrink-0">
        <SuperAdminSidebar />
      </nav>
      <main className="min-h-screen w-full flex-grow bg-neutral-200 p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default SuperAdminMainLayout;
