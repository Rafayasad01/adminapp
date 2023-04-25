/* eslint-disable prettier/prettier */
import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../common/Sidebar';
import { useAppSelector } from '../../redux/redux-hooks';

function MainLayout() {
  const authState = useAppSelector((state) => state.authState);
  return authState.isLoggedIn ? (
    <Box className="flex">
      <Box component="nav" className="w-64 flex-shrink-0">
        <Sidebar />
      </Box>
      <Box
        component="main"
        className="min-h-screen w-full flex-grow bg-gray-50 p-3"
      >
        {/* <div className="mt-16"> </div> */}
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default MainLayout;
