import { Outlet } from 'react-router-dom';

function SuperAdminAuthLayout() {
  return (
    <div className="h-screen bg-super-admin-auth-background bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}

export default SuperAdminAuthLayout;
