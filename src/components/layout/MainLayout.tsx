import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../common/Sidebar';
import TopBar from '../common/TopBar';

function MainLayout() {
  return (
    <Box className="flex">
      <TopBar />
      <Box component="nav" className="w-80 flex-shrink-0">
        <Sidebar />
      </Box>
      <Box
        component="main"
        className="min-h-screen w-full flex-grow bg-gray-50 p-3"
      >
        <div className="mt-16"> </div>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
