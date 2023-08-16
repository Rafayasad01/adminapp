import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/redux-hooks';

function SuperAdminAuthLayout() {
  const authState: any = useAppSelector((state) => state.authState);
  if (authState.user) {
    if (authState.user.isSuperAdmin) {
      return <Navigate to="../../../admin/main/dashboard" replace />;
    }
    return <Navigate to="../../../dashboard/home" replace />;
  }
  return (
    <div className="h-screen bg-super-admin-auth-background bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}

export default SuperAdminAuthLayout;
