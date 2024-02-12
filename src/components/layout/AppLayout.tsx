/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';
import { NotificationProvider } from '../Contexts/NotificationContext';
import Sidebar from '../common/Sidebar';

function AppLayout() {
  const systemConfig = useAppSelector(
    (state: any) => state.authState.systemConfig
  );
  const authState = useAppSelector((state) => state?.authState);
  if (!authState.user) {
    return <Navigate to="/admin" />;
  }
  // if (!authState.user) {
  //     return <Navigate to="/admin" />;
  // }

  return (
    <Box className="flex">
      {systemConfig !== null && (
        <Box component="nav" className="w-64 flex-shrink-0">
          <Sidebar />
        </Box>
      )}
      <Box
        component="main"
        className="min-h-screen w-full flex-grow bg-gray-50 p-3"
      >
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      </Box>
    </Box>
  );
}

export default AppLayout;
