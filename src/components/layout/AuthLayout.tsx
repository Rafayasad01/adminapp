/* eslint-disable prettier/prettier */
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';
import { NotificationProvider } from '../Contexts/NotificationContext';
import { getItem } from '../../utils/storage';

function AuthLayout() {
  const authToken = getItem('AUTH_TOKEN');
  const authState: any = useAppSelector((state) => state?.authState);
  console.log('🚀 ~ AuthLayout ~ authState:', authState, authToken);
  if (authState.user && authToken) {
    return <Navigate to="../../admin/dashboard" replace />;
  }
  // return <Navigate to="../../admin/auth" replace />;

  return (
    <div className="bg-super-admin-auth-background h-screen bg-[#f0f0f0]">
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </div>
  );
}

export default AuthLayout;
