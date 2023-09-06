/* eslint-disable prettier/prettier */
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';

function AuthLayout() {
  const authState: any = useAppSelector((state) => state.authState);
  if (authState.user) {
    if (authState.user.isSuperAdmin) {
      return <Navigate to="../../admin/main" replace />;
    }
    return <Navigate to="../../admin/dashboard" replace />;
  }
  return (
    <div className="h-screen bg-super-admin-auth-background bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
