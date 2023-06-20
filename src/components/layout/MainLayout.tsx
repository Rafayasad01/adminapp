/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../common/Sidebar';
import { useAppSelector } from '../../redux/redux-hooks';

function MainLayout() {
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.authState);
  useEffect(() => {
    if (authState.user && authState.user?.isSuperAdmin) {
      navigate("../admin/auth/login");
    } else if (authState.user == null) {
      navigate("../admin/auth/login");
    }
  }, []);
  return (
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
  );
}

export default MainLayout;
