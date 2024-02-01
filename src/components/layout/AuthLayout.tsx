/* eslint-disable prettier/prettier */
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';
import { NotificationProvider } from '../Contexts/NotificationContext';

function AuthLayout() {
  const authState: any = useAppSelector((state) => state?.authState);
  if (authState.user) return <Navigate to="../../admin/dashboard" replace />;
  return (
    <div className="bg-super-admin-auth-background h-screen bg-[#f0f0f0]">
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </div>
  );
}

export default AuthLayout;
