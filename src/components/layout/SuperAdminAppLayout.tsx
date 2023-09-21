/* eslint-disable prettier/prettier */
import { Navigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Sidebar from '../common/Sidebar';
import { useAppSelector } from '../../redux/redux-hooks';

function SuperAdminAppLayout() {
    const authState = useAppSelector((state) => state.authState);
    const dataRole = useSelector((state: any) => state.roleState.role.permissions);
    console.log("PERMIS222222222",dataRole);
    
    if ((authState.user && !authState.user.isSuperAdmin) || !authState.user) {
        return <Navigate to="/admin" />;
    }
    // if (!authState.user) {
    //     return <Navigate to="/admin" />;
    // }

    return (
        <Box className="flex">
            <Box component="nav" className="w-64 flex-shrink-0">
                    <Sidebar />
            </Box>
            <Box
                component="main"
                className="min-h-screen w-full flex-grow bg-gray-50 p-3"
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default SuperAdminAppLayout;