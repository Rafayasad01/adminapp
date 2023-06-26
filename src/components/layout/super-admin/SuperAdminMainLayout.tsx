import { Navigate, Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../../super-admin/common/SuperAdminSidebar';
import { useAppSelector } from '../../../redux/redux-hooks';

function SuperAdminMainLayout() {
  const authState = useAppSelector((state: any) => state.authState);
  if (!authState.user) {
    return <Navigate to="../../../admin/auth/login" replace />
  }
  if (authState.user && !authState.user.isSuperAdmin) {
    return <Navigate to="../../../admin/auth/login" replace />
  }

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
