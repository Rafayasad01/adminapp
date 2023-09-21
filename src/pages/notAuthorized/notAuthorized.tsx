import React from 'react';
import Box from '@mui/material/Box';
import TopBar from '../../components/common/TopBar';
import Sidebar from '../../components/common/Sidebar';

const notAuthorized = () => {
  return (
    <div className="flex">
      <div className="w-full pr-3">
        <TopBar />
        <div className="flex h-screen items-center justify-center">
          <p>Not Authorized</p>
        </div>
      </div>
    </div>
  );
};

export default notAuthorized;
